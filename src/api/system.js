import request from "@/api/request";

//用户登录
export function getSystemData() {
    return request({
        url: '/monitor/server/info',
        method: 'get',
    })
}
