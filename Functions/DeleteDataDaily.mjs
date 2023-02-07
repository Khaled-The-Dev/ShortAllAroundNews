import { schedule } from'@netlify/functions'

// modify the build command to 'cd Functions && npm init -y && npm install @netlify/function @supabase'

import { createClient } from '@supabase/supabase-js'

import fetch from 'node-fetch';
import FormData from 'form-data'
let NetlifyData
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

const SUPBASEURL = 'SUPBASEURL'  
const SUPABASEKEY = 'SUPABASEKEY'


const NewsApiKey = 'NewsApiKey'

const SUMMARIZEKEY = 'SUMMARIZEKEY'

const supabase = createClient(SUPBASEURL, SUPABASEKEY, options)

export const handler = schedule('@weekly', async (event, context) => {
   const {data: DeletedRow, error} = await supabase.from('News').delete().neq('id', 0)
})