import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'
const SupabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbHF4YXdhamhoemJwaG5jdmJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjcxMjY5OTAsImV4cCI6MTk4MjcwMjk5MH0.gn_2JOlY9aj4EED2MfD_9honCPzqJGxqkwbq8RBIOWI'
const SupabaseUrl = 'https://cslqxawajhhzbphncvbp.supabase.co'
const options = {
  db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: { 'x-my-custom-header': 'ShortAllAroundNews' },
  },
}

const supabase = createClient(SupabaseUrl, SupabaseKey, options)

async function Init() {
let { data: News, error } = await supabase
  .from('News')
  .select('*')
  console.log(News[1]);
}
Init()
