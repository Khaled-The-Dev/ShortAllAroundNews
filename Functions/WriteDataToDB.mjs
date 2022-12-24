import { schedule } from'@netlify/functions'

// modify the build command to 'cd Functions && npm init -y && npm install @netlify/function @supabase'

import { createClient } from '@supabase/supabase-js'

import fetch from 'node-fetch';
let NetlifyData

const NewsApiKey = '4b37e040fd5244e7be79bbe50eeb16a8'

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
const SUMMARIZEKEY =  '54987bd37799c5b589185817cee5c705'
const supabase = createClient(SUPBASEURL, SUPABASEKEY, options)

export const handler = schedule("@hourly" ,async (event, context) => {
   const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news,abc-news,al-jazeera-english,cbc-news,cnn&apiKey=${NewsApiKey}`)
   const data = await response.json()
     data.articles.forEach(async (data) => {
    //  console.log(data.url);
    
const formdata = new FormData();
formdata.append("key", process.env.SUMMARIZEKEY);
formdata.append("url", `${data.url}`);
formdata.append("sentences", 5);
const requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};
   const Response = await fetch(`http://api.meaningcloud.com/summarization-1.0`, requestOptions)
   const info = await Response.json()
          NetlifyData = {
           Title: data.title,
           Info: info.summary
          }
         let Data = {
           Title: data.title,
           ImageUrl: data.urlToImage,
           Info: info.summary
         }
         
let { item, error } = supabase
  .from('News')
  .insert([
     Data
  ])
       })
     
     console.log(data);
    return {
        statusCode: 200,
        body: JSON.stringify({
          data: NetlifyData,
        })
    }
})

