import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lhlrfrzuqtgeceelbzau.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxobHJmcnp1cXRnZWNlZWxiemF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NjgzOTIsImV4cCI6MjA4ODU0NDM5Mn0.PDfhrThbsQ7JCsMqpBeYdb_cN6Adgmd5-Go5511QgVU';

export const supabase = createClient(supabaseUrl, supabaseKey);