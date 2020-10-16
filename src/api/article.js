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

export const getArticleChannel = ()=>{
	return request({
		method:'GET',
		url:'/mp/v1_0/channels'
	})
}

export const publishArticle = (data, draft=false)=>{
	return request({
		method:'POST',
		url:'/mp/v1_0/articles',
		params:{
			draft
		},
		data

	})
}

export const deleteArticles = articleId => {
	return request({
		method:'DELETE',
		url:`/mp/v1_0/articles/${articleId}`
	})
}