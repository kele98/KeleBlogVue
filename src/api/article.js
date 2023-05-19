import request from "@/api/request";
export function saveArticle(data){
    return request({
        url: '/sysArticle',
        method: 'post',
        data: data
    })
}
export function uploadImage(data){
    return request({
        url: '/sysArticle/uploadImage',
        method: 'post',
        data: data
    })
}
export function updateArticle(data){
    return request({
        url: '/sysArticle',
        method: 'put',
        data: data
    })
}
export function deleteArticle(id){
    return request({
        url: '/sysArticle/'+id,
        method: 'delete',
    })
}
export function getArticle(id){
    return request({
        url: '/sysArticle/'+id,
        method: 'get',
    })
}
export function getAllArticle(index,size){
    return request({
        url: '/sysArticle',
        method: 'get',
        params:{"index":index,"size":size}
    })
}
