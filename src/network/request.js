import axios from 'axios'

const axios__instance = axios.create({
    baseURL:'http://ttapi.research.itcast.cn/'
})
axios__instance.interceptors.request.use(config=>{
    let user = JSON.parse(window.localStorage.getItem('data'));
    if(user){
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config;
})
export default axios__instance