import axios from 'axios'
import JSONbig from 'json-bigint'
import router from '@/router'
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
				router.push('/login');
		}
		return config;
})

axios__instance.interceptors.response.use(response => {
	return response
},
//接口错误状态处理，也就是说无响应时的处理
error => {
	if(error.response && error.response.status === 401){
		window.localStorage.removeItem('data');
		router.push('/');
	}
	return Promise.reject(error.response.status) // 返回接口返回的错误信息
})
export default axios__instance