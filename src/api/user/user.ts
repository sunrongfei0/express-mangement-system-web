import request from "../request";

// 获取用户列表
export function getUserListApi(data: object) {
    return request({
        url: 'user',
        method: 'get',
        data
    })
}