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

export const handler = schedule("@hourly" ,async (event, context) => {
  fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news,abc-news,al-jazeera-english,cbc-news,cnn&apiKey=${NewsApiKey}`)
    .then(resp => resp.json())
    .then((item) => {
      for(let i = 0; i < item.articles.length; i++) {
    //  console.log(data.url);
    
const formdata = new FormData();
formdata.append("key", SUMMARIZEKEY);
console.log(item.articles[i].url);
formdata.append("url", `${item.articles[i].url}`);
formdata.append("sentences", 5);
const requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};
setTimeout(() => {
  fetch(`https://api.meaningcloud.com/summarization-1.0`, requestOptions)
   .then(res => res.json())
   .then((info) => {
       let PostData = {
         Title: item[i].title,
         Info: info.summary,
         ImageUrl: item[i].urlToImage,
         ImgAlt: item[i]. description
       }
       let { data, error } = await supabase
  .from('News')
  .insert([
     PostData
  ])
  .then(() => {
     console.log('Insterted Data');
    })
  })
},5000)
}
})
  return {
    statusCode: 200
  }
})