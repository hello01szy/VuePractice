import axios from 'axios'
import JSONbig from 'json-bigint'
const axios__instance = axios.create({
		baseURL:'http://ttapi.research.itcast.cn/',
		transformResponse:[function(data){
				try{
					return JSONbig.parse(data)
				}catch(e){
					return data;
				}
		}]
})
axios__instance.interceptors.request.use(config=>{
		let user = JSON.parse(window.localStorage.getItem('data'));
		if(user){
				config.headers.Authorization = `Bearer ${user.token}`
		}
		return config;
})
export default axios__instance