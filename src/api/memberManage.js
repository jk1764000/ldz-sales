import request from '@/utils/request'

export function getUserPageList(data) {
  return request({
    url: '/user/getUserPageList',
    method: 'get',
    data
  })
}
