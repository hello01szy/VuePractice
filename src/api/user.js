import request from '../network/request'
export const login = (url, data) => {
    return request({
        method:'POST',
        url,
        data
    })
}

export const getProfile = () => {
    const user = JSON.parse(window.localStorage.getItem('data'));
    return request({
        method:'GET',
        url:'/mp/v1_0/user/profile'
    })
}