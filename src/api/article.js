import request from '@/network/request.js'

export const getArticles = params =>{
	return request(
		{
			method:'GET',
			url:'/mp/v1_0/articles',
			params
		}
	)
}