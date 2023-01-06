window.onload = () => {
   let googleAdsScript = document.createElement('script')
   googleAdsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6142119155221792'
   googleAdsScript.async = true
   googleAdsScript.crossOrigin = 'anonymous'
   document.head.append(googleAdsScript)
}
import ApiKeys from './ApiKeys.js'
import{createClient}from './supabase.js'
const NewsSection=document.querySelector('#NewsSection')
const supabase=createClient(ApiKeys.SupabaseUrl,ApiKeys.SupabaseKey)
async function Init(){let{data:News,error}=await supabase.from('News').select('*').order('CreatedAt', {ascending:false})
News.forEach(data=>{let NewsTeller=document.createElement('article')
NewsTeller.id='NewsTeller'
NewsTeller.innerHTML=`
   <img src="${data.ImageUrl}" width=100% height=400 loading="lazy" alt="${data.ImgAlt}"></img>
  <h1 id="HeadLine">${data.Title}</h1>
 <p id="Info">${data.Info}</p>
 `
NewsSection.append(NewsTeller)})}
Init()