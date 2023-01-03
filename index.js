import ApiKeys from './ApiKeys.js'
import{createClient}from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'
const NewsApiKey=ApiKeys.NewsApiKey
const SupabaseKey=ApiKeys.SupabaseKey
const SupabaseUrl=ApiKeys.SupabaseUrl
const options={db:{schema:'public',},auth:{autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0},global:{headers:{'x-my-custom-header':'ShortAllAroundNews'},},}
const NewsSection=document.querySelector('#NewsSection')
const supabase=createClient(SupabaseUrl,SupabaseKey,options)
async function AddDataToDataBase(){}
async function Init(){let{data:News,error}=await supabase.from('News').select('*').order('CreatedAt', {ascending: false})
News.forEach((data)=>{let NewsTeller=document.createElement('article')
NewsTeller.id='NewsTeller'
NewsTeller.innerHTML=`
   <img src="${data.ImageUrl}" width=100% height=400 loading="lazy" alt="${data.ImgAlt}"></img>
  <h1 id="HeadLine">${data.Title}</h1>
 <p id="Info">${data.Info}</p>
 `
NewsSection.append(NewsTeller)})}
Init()