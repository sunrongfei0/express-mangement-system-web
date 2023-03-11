import request from "../request";

export function insertlibrary(expressid: number) {
    return request({
        url: `delivery/${expressid}`,
        method: 'post'
    })
}

export function getDeliveryListApi(params: object) {
    return request({
        url: 'delivery',
        method: 'get',
        params
    })
}

export function editDeliveryApi(id: number, operation: number) {
    return request({
        url: `delivery/${id}/${operation}`,
        method: 'put'
    })
}