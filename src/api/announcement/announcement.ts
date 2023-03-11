import request from "../request";


export function getAnnListApi(params: object) {
    return request({
        url: 'announcement',
        method: 'get',
        params
    })
}

export function editAnnApi(data:object) {
    return request({
        url: 'announcement',
        method: 'post',
        data
    })
}