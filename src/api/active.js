import request from '@/utils/request'

//活动列表
export function getActivityInfoList(data) {
  return request({
    url: '/activity/info/getActivityInfoList',
    method: 'get',
    data
  })
}
//创建活动
export function activityInfoCreate(data) {
  return request({
    url: '/activity/info/create',
    method: 'post',
    data
  })
}
//获取活动详情
export function activityInfoDetail(data) {
  return request({
    url: '/activity/info/detail',
    method: 'get',
    data
  })
}

//编辑活动
export function activityInfoUpdate(data) {
  return request({
    url: '/activity/info/update',
    method: 'post',
    data
  })
}

//删除活动
export function activityInfoDelete(data) {
  return request({
    url: '/activity/info/delete',
    method: 'post',
    data
  })
}
//活动上下架
export function activityInfoStatus(data) {
  return request({
    url: '/activity/info/status',
    method: 'post',
    data
  })
}
export function activityHomescreenSave(data) {
  return request({
    url: '/activity/homescreen/save',
    method: 'post',
    data
  })
}
//活动内容
export function activityContentCreate(data) {
  return request({
    url: '/activity/content/create',
    method: 'post',
    data
  })
}

//往期活动列表

export function getActivityPastList(data) {
  return request({
    url: '/activity/past/getActivityPastList',
    method: 'get',
    data
  })
}
//删除往期活动

export function pastDelete(data) {
  return request({
    url: '/activity/past/delete',
    method: 'post',
    data
  })
}
//新增往期活动

export function pastCreate(data) {
  return request({
    url: '/activity/past/create',
    method: 'post',
    data
  })
}
//修改往期活动
export function pastUpdate(data) {
  return request({
    url: '/activity/past/update',
    method: 'post',
    data
  })
}
//往期活动详情
export function pastDetail(data) {
  return request({
    url: '/activity/past/detail',
    method: 'get',
    data
  })
}
//活动单位列表
export function companyGetActivityCompanyList(data) {
  return request({
    url: '/activity/company/getActivityCompanyList',
    method: 'get',
    data
  })
}
//添加单位活动

export function activityCompanyAdd(data) {
  return request({
    url: '/activity/company/add',
    method: 'post',
    data
  })
}
//公司是否接入活动

export function companyDelete(data) {
  return request({
    url: '/activity/company/delete',
    method: 'post',
    data
  })
}
//活动单位详情

export function companyDetail(data) {
  return request({
    url: '/activity/company/detail',
    method: 'get',
    data
  })
}
//编辑单位活动
export function companyUpdate(data) {
  return request({
    url: '/activity/company/update',
    method: 'post',
    data
  })
}

//获取榜单
export function getActivityPublishList(data) {
  return request({
    url: '/activity/publish/getActivityPublishList',
    method: 'get',
    data
  })
}
//获取榜单公司列表

export function getActivitySubPublishList(data) {
  return request({
    url: '/activity/subPublish/getActivitySubPublishList',
    method: 'get',
    data
  })
}
//删除子榜单公司

export function subPublishDelete(data) {
  return request({
    url: '/activity/subPublish/delete',
    method: 'post',
    data
  })
}
//子榜单添加单位

export function subPublishCreate(data) {
  return request({
    url: '/activity/subPublish/add',
    method: 'post',
    data
  })
}
export function contentDetail(data) {
  return request({
    url: '/activity/content/detail',
    method: 'get',
    data
  })
}
export function contentUpdate(data) {
  return request({
    url: '/activity/content/update',
    method: 'post',
    data
  })
}

export function companyVoteScore(data) {
  return request({
    url: '/activity/company/voteScore',
    method: 'post',
    data
  })
}
//公布榜单
export function publishPublished(data) {
  return request({
    url: '/activity/publish/published',
    method: 'post',
    data
  })
}
//修改排名

export function subPublishUpdate(data) {
  return request({
    url: '/activity/subPublish/update',
    method: 'post',
    data
  })
}



