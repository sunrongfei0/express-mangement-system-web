import request from "../request";

export function relevanceApi(data: object) {
    return request({
        url: 'association',
        method: 'post',
        data
    })
}

export function delrelevanceApi(id: number) {
    return request({
        url: `association/${id}`,
        method: 'delete'
    })
}