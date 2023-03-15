import request from "../request";


export function getAnnListApi(params: object) {
    return request({
        url: 'announcement',
        method: 'get',
        params
    })
}

export function addAnnApi(data: object) {
    return request({
        url: 'announcement',
        method: 'post',
        data
    })
}

export function editAnnApi(data: object) {
    return request({
        url: 'announcement',
        method: 'put',
        data
    })
}

export function getAnnApi(id: number) {
    return request({
        url: `announcement/${id}`,
        method: 'get'
    })
}

export function deleteAnnApi(id: number) {
    return request({
        url: `announcement/${id}`,
        method: 'delete'
    })
}

export function publishAnnApi(id: number) {
    return request({
        url: `announcement/publish/${id}`,
        method: 'post'
    })
}