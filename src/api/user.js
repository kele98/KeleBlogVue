import request from "@/api/request";

//用户登录
export function login(data) {
    return request({
        url: '/index/login',
        method: 'post',
        params: {
            username: data.username,
            password: data.password
        }
    })
}
export function signUp(data){
    return request({
        url: '/index/signUp',
        method: 'post',
        params: {
            username: data.username,
            password: data.password
        }
    })
}
export function updateUser(user){
    return request({
        url: '/sysUser',
        method: 'put',
        data: user

    })
}
export function info() {
    return request({
        url: '/index/info',
        method: 'get',
    })
}
