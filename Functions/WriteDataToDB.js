const { schedule } = require('@netlify/functions')

require('dotenv').config()


const NewsApiKey = process.env.NEWSAPIKEY
const handler = async function(event, context) {
     fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news,abc-news,al-jazeera-english,cbc-news,cnn&apiKey=${NewsApiKey}`)
   .then(res => res.json())
   .then(data => {
     console.log(data);
     data.articles.forEach((data) => {
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
    return {
        statusCode: 200,
    };
};

module.exports.handler = schedule("@hourly", handler);
