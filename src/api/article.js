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

export const queryArticles = articleId => {
	return request({
		method:'GET',
		url:`/mp/v1_0/articles/${articleId}`
	})
}

export const updateArticle = (articleId, data, draft=false)=>{
	return request({
		method:'PUT',
		url:`/mp/v1_0/articles/${articleId}`,
		params:{
			draft
		},
		data
	})
}

export const updateArticleComment = (articleId, allowComment) =>{
	return request({
		method:'PUT',
		url:'/mp/v1_0/comments/status',
		params:{
			article_id:articleId
		},
		data:{
			allow_comment:allowComment
		}
	})
}