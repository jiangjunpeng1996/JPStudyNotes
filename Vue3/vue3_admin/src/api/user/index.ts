// 统一管理用户相关的接口
import request from '@/utils/request'
// 项目用户相关的请求地址
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

// 用户登录接口
export const reqLogin = (data: any) => {
  return request.post<any, any>(API.LOGIN_URL, data)
}

// 获取用户信息接口
export const reqUserInfo = () => {
  return request.get<any, any>(API.USERINFO_URL)
}

// 退出登录
export const reqLogOut = () => {
  request.post<any, any>(API.LOGOUT_URL)
}
