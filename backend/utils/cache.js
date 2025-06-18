const supabase = require('./supabaseClient');

exports.getFromCache = async (key) => {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('cache')
    .select('value')
    .eq('key', key)
    .gt('expires_at', now)
    .single();
  return data ? data.value : null;
};

exports.storeInCache = async (key, value, ttlMins = 60) => {
  const expires = new Date(Date.now() + ttlMins * 60000).toISOString();
  await supabase.from('cache').upsert([{ key, value, expires_at: expires }]);
};
