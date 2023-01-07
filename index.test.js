import ApiKeys from './ApiKeys.js'
const NewsApiKey=ApiKeys.NewsApiKey
const SupabaseKey=ApiKeys.SupabaseKey
const SupabaseUrl=ApiKeys.SupabaseUrl
const options={db:{schema:'public',},auth:{autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0},global:{headers:{'x-my-custom-header':'ShortAllAroundNews'},},}
const NewsSection=document.querySelector('#NewsSection')
const Supabase=supabase.createClient(SupabaseUrl,SupabaseKey,options)
async function AddDataToDataBase(){}
async function Init(){let{data:News,error}=await Supabase.from('News').select('*').order('CreatedAt', {ascending: false})
News.forEach((data)=>{let NewsTeller=document.createElement('article')
NewsTeller.id='NewsTeller'
NewsTeller.innerHTML=`<div class="card w-full bg-base-100 shadow-xl"><figure><img src="${data.ImageUrl}" alt="${data.ImgAlt}" /></figure><div class="card-body"><h2 class="card-title">${data.Title}</h2><p>${data.Info}</p></div></div>`
NewsSection.append(NewsTeller)})}
Init()
try {
  /* code */
} catch (e) {}