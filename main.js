//Todo: Try And make so that summarize api requests only happen for new Database items And Create Another table to store unsumorized text and summarize then add it to news table
javascript:(function () { var script = document.createElement('script'); script.src="//cdn.jsdelivr.net/npm/eruda"; document.body.appendChild(script); script.onload = function () { eruda.init() } })();

require('dotenv').config()


import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'
// Variables

//NewsApi variables
const NewsApiKey = process.env.NEWSAPIKEY



// Supabase Installation Variables
const SupabaseKey = process.env.SUPABASEKEY
const SupabaseUrl = process.env.SUPABASEURL
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
