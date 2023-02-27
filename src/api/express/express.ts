import request from "../request";

export function getUserListApi(params: object) {
    return request({
        url: 'express',
        method: 'get',
        params
    })
}
