import request from "../request";


export function getHelpListApi(params: object) {
    return request({
        url: 'helpget',
        method: 'get',
        params
    })
}

export function editHelpApi(id: number) {
    return request({
        url: `helpget/${id}`,
        method: 'put'
    })
}