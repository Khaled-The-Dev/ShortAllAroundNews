//Todo: Try And make so that summarize api requests only happen for new Database items And Create Another table to store unsumorized text and summarize then add it to news table

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
    
}

async function Init() {
let { data: News, error } = await supabase
  .from('News')
  .select('*')
  .order('CreatedAt')
  News.forEach((data) => {
    // future me (use document.createElement) and the apeend it to body
  let NewsTeller = document.createElement('div')
  NewsTeller.id = 'NewsTeller'
  NewsTeller.innerHTML = `
   <div class="ImgDiv" style="background-image: url(${data.ImageUrl});"></div>
  <h1 id="HeadLine">${data.Title}</h1>
 <p id="Info">${data.Info}</p>
 `
 //console.log(NewsTeller);
 NewsSection.append(NewsTeller)
 setTimeout(() => {
 NewsTeller.scrollIntoView({behavior: 'smooth'})}, 300)
})
}
Init()
AddDataToDataBase()
