import ApiKeys from './ApiKeys.js'
import{createClient}from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'
const NewsSection=document.querySelector('#NewsSection')
const supabase=createClient(ApiKeys.SupabaseUrl,ApiKeys.SupabaseKey)
async function Init(){let{data:News,error}=await supabase.from('News').select('*').order('CreatedAt', {ascending:false})
News.forEach(data=>{let NewsTeller=document.createElement('article')
NewsTeller.id='NewsTeller'
NewsTeller.innerHTML=`
   <img width=100% src="${data.ImageUrl}" loading="lazy" alt="${data.ImgAlt}"></img>
  <h1 id="HeadLine">${data.Title}</h1>
 <p id="Info">${data.Info}</p>
 `
NewsSection.append(NewsTeller)})}
Init()