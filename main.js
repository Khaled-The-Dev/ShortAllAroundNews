import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'
// Variables

//NewsApi variables
const NewsApiKey = '4b37e040fd5244e7be79bbe50eeb16a8'



// Supabase Installation Variables
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
// DOM Elements

const NewsSection = document.querySelector('#NewsSection')

const supabase = createClient(SupabaseUrl, SupabaseKey, options)
// functions


//Pls try data.articles.foreach() Ok



async function AddDataToDataBase() {
    fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${NewsApiKey}`)
   .then(res => res.json())
   .then(data => {
     data.articles.forEach((data) => {
    //  console.log(data.url);
    
const formdata = new FormData();
formdata.append("key", "54987bd37799c5b589185817cee5c705");
formdata.append("url", `${data.url}`);
formdata.append("sentences", "5");
const requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};
       fetch(`http://api.meaningcloud.com/summarization-1.0`, requestOptions)
       .then(Response => Response.json())
       .then(info => {
 await supabase
  .from('News')
  .insert([
    { Title: data.title },
    { Info: info.summary },
    { ImageUrl: data.urlToImage }
  ])

        console.log(info, data);
       })
     })
   })
}

async function Init() {
let { data: News, error } = await supabase
  .from('News')
  .select('*')
  console.log(News)
  News.forEach((data) => {
    // future me (use document.createElement) and the apeend it to body
  let NewsTeller = document.createElement('div')
  NewsTeller.id = 'NewsTeller'
  NewsTeller.style.backgroundImage = `url(${data.ImageUrl})`
  NewsTeller.style.backgroundSize = 'cover'
  NewsTeller.innerHTML = `
  <h1 id="HeadLine">${data.Title}</h1>
 <p id="Info">${data.Info}</p>
 `
 //console.log(NewsTeller);
 NewsSection.append(NewsTeller)
})
}
Init()
AddDataToDataBase()
