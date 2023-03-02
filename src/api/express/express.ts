import request from "../request";

export function getUserListApi(params: object) {
    return request({
        url: 'express/getuserlist',
        method: 'get',
        params
    })
}

export function addExpressApi(data: object) {
    return request({
        url: 'express',
        method: 'post',
        data
    })
}

export function getExpressListApi(params: object) {
    return request({
        url: 'express',
        method: 'get',
        params
    })
}

export function getExpressApi(id: number) {
    return request({
        url: `express/${id}`,
        method: 'get'
    })
}

export function deleteExpressApi(id: number) {
    return request({
        url: `express/${id}`,
        method: 'delete'
    })
}
