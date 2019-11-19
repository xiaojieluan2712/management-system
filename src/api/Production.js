import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/pro/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle() {
  return request({
    url: '/pro/detail',
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/pro/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/pro/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/pro/update',
    method: 'post',
    data
  })
}
