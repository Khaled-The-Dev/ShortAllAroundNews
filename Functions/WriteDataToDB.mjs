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

const SUPBASEURL = 'https://cslqxawajhhzbphncvbp.supabase.co'  
const SUPABASEKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbHF4YXdhamhoemJwaG5jdmJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjcxMjY5OTAsImV4cCI6MTk4MjcwMjk5MH0.gn_2JOlY9aj4EED2MfD_9honCPzqJGxqkwbq8RBIOWI'


const NewsApiKey = '4b37e040fd5244e7be79bbe50eeb16a8'

const SUMMARIZEKEY = '54987bd37799c5b589185817cee5c705'

const supabase = createClient(SUPBASEURL, SUPABASEKEY, options)

export const handler = schedule('@hourly', async (event, context) => {
   // Fetching data from news api
   
   const NewsData = await fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news,abc-news,al-jazzera-english,cnn,cbc-news&apiKey=${NewsApiKey}`)
   // Convert to json
   
   const NewsDataRes = await NewsData.json()
   // Looping through the response
   NewsDataRes.forEach(async item => {
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
     
     const SummarizeRequest = await fetch('https://api.meaningcloud/summarization-1.0', SummarizeReqOption)
     // covert to json
     const SummarizeJson = await SummarizeRequest.json()
     // looping through response
     
     SummarizeJson.forEach(async (SummaryItem) => {
       // creating a data object
         let SupabasePost = {
           Title: item.title,
           Info: SummaryItem.summary,
           ImageUrl: item.urlToImage,
           ImgAlt: item.descreption
         }
         // adding it to the database
         
           const { error } = await supabase
             .from('News')
             .insert([
                SupabasePost
               ])

     })
   })
})