import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/transaction/list',
    method: 'get',
    params: query
  })
}
export function updateArticle(data) {
  return request({
    url: '/transaction/update',
    method: 'post',
    data
  })
}
