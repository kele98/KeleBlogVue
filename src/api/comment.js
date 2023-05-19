import request from "@/api/request";

export function getComments(id){
    return request({
        url: '/sysComment/'+id,
        method: 'get',
    })
}
export function addComments(data){
    return request({
        url: '/sysComment',
        method: 'post',
        data:data
    })
}
export function delComments(id){
    return request({
        url: '/sysComment/'+id,
        method: 'delete',
    })
}
