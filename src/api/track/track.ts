import request from "../request";


export function getTrackListApi(params: object) {
    return request({
        url: 'track',
        method: 'get',
        params
    })
}

export function getTrackApi(expressno: string) {
    return request({
        url: `track/${expressno}`,
        method: 'get'
    })
}

export function getDetailApi(expressno: string) {
    return request({
        url: `track/detail/${expressno}`,
        method: 'get'
    })
}