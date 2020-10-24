import reqeust from '@/network/request'
export const getImages = (params) => {
	return reqeust({
		method:'GET',
		url:'/mp/v1_0/user/images',
		params
	})
}


export const colOrUnColImage = (imageId, collect) =>{
	return reqeust({
		method:'PUT',
		url:`/mp/v1_0/user/images/${imageId}`,
		data:{
			collect
		}
	})
}

export const deleteImg = image =>{
	return reqeust({
		method:'DELETE',
		url:`/mp/v1_0/user/images/${image.id}`
	})
}

export const uploadImage = data =>{
	return reqeust({
		method: 'POST',
		url: '/mp/v1_0/user/images',
		data
	})
}