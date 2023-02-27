import request from "../request";

// 获取用户列表数据
export function getUserListApi(params: object) {
    return request({
        url: 'user',
        method: 'get',
        params
    })
}

// 新增用户信息
export function addUserApi(data: object) {
    return request({
        url: 'user',
        method: 'post',
        data
    })
}

// 根据ID获取用户详情信息
export function getUserApi(id: number) {
    return request({
        url: `user/${id}`,
        method: 'get'
    })
}

// 更新用户信息
export function editUserApi(data: object) {
    return request({
        url: 'user',
        method: 'put',
        data
    })
}

// 删除用户信息
export function deleteUserApi(id: number) {
    return request({
        url: `user/${id}`,
        method: 'delete',
    })
}