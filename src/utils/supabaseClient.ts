import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://khmvsbutfvpdzaucbyhl.supabase.co/";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtobXZzYnV0ZnZwZHphdWNieWhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1OTI5ODgsImV4cCI6MjA1OTE2ODk4OH0.UlWOeBnN3dSYX-qzb-YAibaL_3q7mV_5MsVFFM5vKVk";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
