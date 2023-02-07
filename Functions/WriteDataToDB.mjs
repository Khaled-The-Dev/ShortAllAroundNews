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
const SUPABASEKEY = 'Sensetive info here'


const NewsApiKey = 'Api key'

const SUMMARIZEKEY = 'Api key'

const supabase = createClient(SUPBASEURL, SUPABASEKEY, options)

export const handler = schedule('@hourly', async (event, context) => {
   // Fetching data from news api
const NewsData = await fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news,abc-news,al-jazzera-english,cnn,cbc-news&apiKey=${NewsApiKey}`)
// Convert to json

const NewsDataRes = await NewsData.json()
// Looping through the response
NewsDataRes.articles.forEach(async item => {
  // creating a form data object

  const SummarizeFormData = new FormData()

  SummarizeFormData.append('key', SUMMARIZEKEY)
  SummarizeFormData.append('url', item.url)
  SummarizeFormData.append('sentences', 5)

  // creating a request body to summarize api

  const SummarizeReqOption = {
    method: 'POST',
    body: SummarizeFormData,
    redirect: 'follow'
  }

  // Post request to summarize api

  const SummarizeRequest = await fetch('https://api.meaningcloud.com/summarization-1.0', SummarizeReqOption)
  // covert to json
  const SummarizeJson = await SummarizeRequest.json()
  // looping through response
  console.log(SummarizeJson.summary);
  // creating a data object
  let SupabasePost
  // adding it to the database

  await supabase
    .from('News')
    .insert(
    {
      Title: item.title,
      Info: SummarizeJson.summary,
      ImageUrl: item.urlToImage,
      ImgAlt: item.description,
    }).then(() => {
      console.log('New Data Sent!');
    })
})
})