const { schedule } = require('@netlify/functions')

import ApiKeys2 from './ApiKeys2.js'

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'


const NewsApiKey = ApiKeys2.NewsApiKey

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
const supabase = createClient(ApiKeys2.SupabaseUrl, ApiKeys2.SupabaseKey, options)

const handler = async function(event, context) {
    try {fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news,abc-news,al-jazeera-english,cbc-news,cnn&apiKey=${NewsApiKey}`)
   .then(res => res.json())
   .then(data => {
     console.log(data);
     data.articles.forEach((data) => {
    //  console.log(data.url);
    
const formdata = new FormData();
formdata.append("key", ApiKeys2.SummarizeKey);
formdata.append("url", `${data.url}`);
formdata.append("sentences", 5);
const requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};
       fetch(`http://api.meaningcloud.com/summarization-1.0`, requestOptions)
       .then(Response => Response.json())
       .then(async (info) =>  {
         let Data = {
           Title: data.title,
           ImageUrl: data.urlToImage,
           Info: info.summary
         }
         
 let { item, error } = supabase
  .from('News')
  .insert([
     Data
  ]).then(() => {
  })
       })
     })
   })
      
    } catch (err) {
      return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
        })
      }
      document.write(err.message)
    }
     
    return {
        statusCode: 200,
    };
};

module.exports.handler = schedule("@hourly", handler);
