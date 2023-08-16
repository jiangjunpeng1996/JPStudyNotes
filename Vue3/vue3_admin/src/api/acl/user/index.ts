// 用户管理模块相关接口
import request from '@/utils/request'
import type {
  UserResponseData,
  User,
  AllRoleResponseData,
  SetRoleData,
} from './type'

enum API {
  // 获取全部已有用户账号信息
  ALL_USER_URL = '/admin/acl/user/',
  // 添加一个新用户
  ADD_USER_URL = '/admin/acl/user/save',
  // 更新已有的用户
  UPDATE_USER_URL = '/admin/acl/user/update',
  // 获取全部职位，当前账号拥有的职位接口
  ALL_ROLE_URL = '/admin/acl/user/toAssign/',
  // 给已有的用户分配角色
  SET_ROLE_URL = '/admin/acl/user/doAssignRole',
  // 删除某一个账号
  DELETE_USER_URL = '/admin/acl/user/remove/',
  // 批量删除
  DELETE_ALL_USER_URL = '/admin/acl/user/batchRemove',
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

// 获取全部职位以及包含当前用户的已有的职位
export const reqAllRole = (userId: number) => {
  return request.get<any, AllRoleResponseData>(API.ALL_ROLE_URL + userId)
}

// 分配职位
export const reqSetUserRole = (data: SetRoleData) => {
  return request.post<any, any>(API.SET_ROLE_URL, data)
}

// 删除某一个账号的信息
export const reqRemoveUser = (userId: number) => {
  return request.delete<any, any>(API.DELETE_USER_URL + userId)
}

// 批量删除
export const reqSelectUser = (idList: number[]) => {
  return request.delete(API.DELETE_ALL_USER_URL, { data: idList })
}
