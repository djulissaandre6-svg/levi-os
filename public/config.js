// Levi OS — connection settings. You paste two values here once (see SETUP.md, step 4).
// Both are SAFE to be public: the "anon" key can't read anything without your login.
// NEVER paste the "service_role" key or your Anthropic key in this file.
window.LEVI_CONFIG = {
  SUPABASE_URL: "https://mvulmqtucwfkodpohnqs.supabase.co",       // e.g. https://abcdxyz.supabase.co
  SUPABASE_ANON_KEY: "sb_publishable_Cl9HzVnxkHJoKRjRnAoKBg_InpyCLG2",  // the long "anon public" key
  FUNCTIONS_BASE: "",     // leave empty when the site and functions are on the same Netlify site
};
