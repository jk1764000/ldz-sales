import request from '@/utils/request'

//单位列表
export function getActivityCompanyList(data) {
  return request({
    url: '/company/getCompanyList',
    method: 'get',
    data
  })
}
//新增单位
export function companyCreate(data) {
  return request({
    url: '/company/create',
    method: 'post',
    data
  })
}
//修改单位
export function companyUpdate(data) {
  return request({
    url: '/company/update',
    method: 'post',
    data
  })
}
//获取公司详情
export function companyDetail(data) {
  return request({
    url: '/company/detail',
    method: 'get',
    data
  })
}
//删除单位
export function companyDelete(data) {
  return request({
    url: '/company/delete',
    method: 'post',
    data
  })
}
//修改单位上下架状态
// export function companyStatus(data) {
//   return request({
//     url: '/company/status',
//     method: 'post',
//     data
//   })
// }

