// 用户管理模块相关接口
import request from '@/utils/request'
import type { UserResponseData, User } from './type'

enum API {
  // 获取全部已有用户账号信息
  ALL_USER_URL = '/admin/acl/user/',
  // 添加一个新用户
  ADD_USER_URL = '/admin/acl/user/save',
  // 更新已有的用户
  UPDATE_USER_URL = '/admin/acl/user/update',
}

// 获取用户账号信息的接口
export const reqUserInfo = (page: number, limit: number) => {
  return request.get<any, UserResponseData>(
    API.ALL_USER_URL + `${page}/${limit}`,
  )
}

// 添加一个新用户/更新已有的用户的接口
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_USER_URL, data)
  } else {
    return request.post<any, any>(API.ADD_USER_URL, data)
  }
}
