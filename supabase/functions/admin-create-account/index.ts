import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-api-version',
  'Access-Control-Max-Age': '86400',
};
const reply = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, 'Content-Type': 'application/json' },
});
const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });
  if (request.method !== 'POST') return reply({ error: 'Method not allowed' }, 405);
  try {
    const url = Deno.env.get('SUPABASE_URL');
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const authorization = request.headers.get('Authorization');
    if (!url || !anonKey || !serviceKey) return reply({ error: 'Edge Function environment is incomplete' }, 500);
    if (!authorization) return reply({ error: 'Authentication required' }, 401);

    const callerClient = createClient(url, anonKey, { global: { headers: { Authorization: authorization } } });
    const { data: { user: caller }, error: authError } = await callerClient.auth.getUser();
    if (authError || !caller) return reply({ error: 'Invalid or expired session' }, 401);
    const { data: callerProfile, error: profileLookupError } = await callerClient.from('profiles').select('role,account_status').eq('id', caller.id).single();
    if (profileLookupError || callerProfile?.role !== 'master_admin' || callerProfile.account_status !== 'active') return reply({ error: 'Active Master Admin access required' }, 403);

    const body = await request.json();
    const { accountType, email, password, fullName, phone, companyName, city, state, organizationName, organizationType, verificationStatus = 'verified' } = body;
    if (!['buyer', 'industry_member'].includes(accountType)) return reply({ error: 'Invalid account type', code: 'INVALID_ACCOUNT_TYPE' }, 400);
    if (!email || !password || !fullName) return reply({ error: 'Email, password and full name are required', code: 'MISSING_REQUIRED_FIELDS' }, 400);
    if (password.length < 8) return reply({ error: 'Password must contain at least 8 characters', code: 'WEAK_PASSWORD' }, 400);
    if (accountType === 'industry_member' && !organizationName) return reply({ error: 'Organization name is required', code: 'MISSING_ORGANIZATION' }, 400);

    const admin = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
    const { data: created, error: createError } = await admin.auth.admin.createUser({ email: email.trim().toLowerCase(), password, email_confirm: true, user_metadata: { full_name: fullName } });
    if (createError) return reply({ error: createError.message, code: createError.code || 'AUTH_CREATE_FAILED' }, createError.status || 400);
    const userId = created.user.id;
    try {
      const role = accountType === 'buyer' ? 'user' : 'industry_member';
      const buyerStatus = accountType === 'buyer' ? verificationStatus : 'verified';
      const { error: profileError } = await admin.from('profiles').upsert({ id: userId, full_name: fullName, email: email.trim().toLowerCase(), phone: phone || null, company_name: companyName || organizationName || null, city: city || null, state: state || null, role, account_status: 'active', buyer_verification_status: buyerStatus, buyer_verified_by: buyerStatus === 'verified' ? caller.id : null, buyer_verified_at: buyerStatus === 'verified' ? new Date().toISOString() : null });
      if (profileError) throw profileError;
      if (accountType === 'industry_member') {
        const memberStatus = ['pending', 'under_review', 'verified'].includes(verificationStatus) ? verificationStatus : 'pending';
        const { error: memberError } = await admin.from('industry_members').insert({ user_id: userId, organization_name: organizationName, slug: `${slugify(organizationName)}-${userId.slice(0, 6)}`, organization_type: organizationType || null, business_email: email.trim().toLowerCase(), business_phone: phone || null, city: city || null, state: state || null, verification_status: memberStatus, verified_by: memberStatus === 'verified' ? caller.id : null, verified_at: memberStatus === 'verified' ? new Date().toISOString() : null, is_active: true });
        if (memberError) throw memberError;
      }
      await admin.from('audit_logs').insert({ actor_user_id: caller.id, actor_role: 'master_admin', action: `admin_created_${accountType}`, entity_type: 'profile', entity_id: userId, new_values: { email, full_name: fullName, role, verification_status: verificationStatus } });
      return reply({ success: true, user: { id: userId, email, role } }, 201);
    } catch (error) {
      await admin.auth.admin.deleteUser(userId);
      throw error;
    }
  } catch (error) {
    return reply({ error: error instanceof Error ? error.message : 'Unable to create account' }, 500);
  }
});
