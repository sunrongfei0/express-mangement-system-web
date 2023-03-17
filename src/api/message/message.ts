import request from "../request";


export function getMsgListApi(params: object) {
    return request({
        url: 'message',
        method: 'get',
        params
    })
}

export function getDetailApi(id: number) {
    return request({
        url: `message/${id}`,
        method: 'get'
    })
}

export function showMessageApi() {
    return request({
        url: 'message/show',
        method: 'get'
    })
}