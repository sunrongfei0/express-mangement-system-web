import request from "../request";


export function getSendListApi(params: object) {
    return request({
        url: 'send',
        method: 'get',
        params
    })
}

export function getSendApi(id: number) {
    return request({
        url: `send/${id}`,
        method: 'get',
    })
}

export function editSendApi(data: object,op:number) {
    return request({
        url: `send/${op}`,
        method: 'put',
        data
    })
}

export function paySendApi(id:number) {
    return request({
        url: `send/pay/${id}`,
        method: 'put'
    })
}

export function addSendApi(data: object) {
    return request({
        url: 'send',
        method: 'post',
        data
    })
}

export function getMyInfoApi() {
    return request({
        url: 'send/myinfo',
        method: 'get'
    })
}