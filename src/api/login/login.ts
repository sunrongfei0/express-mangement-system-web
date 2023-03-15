import request from "../request";

export function loginApi(data: object) {
    return request({
        url: 'login',
        method: 'post',
        data
    })
}

export function loginOutApi() {
    return request({
        url: 'logOut'
    })
}

export function validateTokenApi() {
    return request({
        url: 'validateToken',
        method: 'get'
    })
}