export const ok = (data) => ({ data: data ?? null, error: null, success: true });
export const fail = (error) => ({ data: null, error: error?.message || String(error || 'Unexpected error'), success: false });
