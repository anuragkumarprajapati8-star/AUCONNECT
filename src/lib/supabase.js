import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dfzbzdjgeqihhvqtcmfx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmemJ6ZGpnZXFpaGh2cXRjbWZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNjA0NTQsImV4cCI6MjA4ODczNjQ1NH0.q_dpGEnqAQhisYCCemikZstKqQIWAjkfSrhzVD7S_dA";

export const supabase = createClient(supabaseUrl, supabaseKey);
