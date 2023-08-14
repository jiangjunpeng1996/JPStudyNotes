// 用户管理模块相关接口
import request from '@/utils/request'
import type { UserResponseData } from './type'

enum API {
  // 获取全部已有用户账号信息
  ALL_USER_URL = '/admin/acl/user/',
}

// 获取用户账号信息的接口
export const reqUserInfo = (page: number, limit: number) => {
  return request.get<any, UserResponseData>(
    API.ALL_USER_URL + `${page}/${limit}`,
  )
}
