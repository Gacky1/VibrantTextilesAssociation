import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [memberProfile, setMemberProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (authUser) => {
    if (!authUser) {
      setProfile(null); setMemberProfile(null); setLoading(false); return;
    }
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', authUser.id).maybeSingle();
      if (error) throw error;
      setProfile(data);
      if (data?.role === 'industry_member') {
        const { data: member, error: memberError } = await supabase.from('industry_members').select('*').eq('user_id', authUser.id).maybeSingle();
        if (memberError) throw memberError;
        setMemberProfile(member);
      } else setMemberProfile(null);
    } catch (error) {
      console.error('Unable to load account profile', error);
      setProfile(null); setMemberProfile(null);
    } finally { setLoading(false); }
  }, []);

  const signIn = useCallback(async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { data: null, profile: null, error };
      const { data: signedInProfile, error: profileError } = await supabase
        .from('profiles').select('*').eq('id', data.user.id).maybeSingle();
      if (profileError) return { data, profile: null, error: profileError };
      await loadProfile(data.user);
      return { data, profile: signedInProfile, error: null };
    } catch (error) {
      return { data: null, profile: null, error };
    }
  }, [loadProfile]);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      const nextUser = data.session?.user ?? null;
      setUser(nextUser); loadProfile(nextUser);
    }).catch(() => mounted && setLoading(false));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUser = session?.user ?? null;
      setUser(nextUser); setLoading(true); loadProfile(nextUser);
    });
    return () => { mounted = false; subscription.unsubscribe(); };
  }, [loadProfile]);

  const value = useMemo(() => ({
    user, profile, role: profile?.role ?? null, accountStatus: profile?.account_status ?? null,
    memberProfile, memberVerificationStatus: memberProfile?.verification_status ?? null, loading,
    signIn,
    signUp: (email, password, fullName) => supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } }),
    signOut: () => supabase.auth.signOut(), refreshProfile: () => loadProfile(user),
    hasRole: (...roles) => roles.includes(profile?.role),
    isMasterAdmin: profile?.role === 'master_admin',
    isIndustryMember: profile?.role === 'industry_member',
    isVerifiedIndustryMember: profile?.role === 'industry_member' && memberProfile?.verification_status === 'verified',
  }), [user, profile, memberProfile, loading, loadProfile, signIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used within AuthProvider');
  return value;
}
