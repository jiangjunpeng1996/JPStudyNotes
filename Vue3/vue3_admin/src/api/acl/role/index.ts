// 角色模块相关接口
import request from '@/utils/request'
import type { RoleResponseData, RoleData } from './type'

// 枚举地址
enum API {
  // 获取全部职位
  ALL_ROLE_URL = '/admin/acl/role/',
  // 添加一个职位
  ADD_ROLE_URL = '/admin/acl/role/save',
  // 更新已有的职位
  UPDATE_ROLE_URL = '/admin/acl/role/update',
}

// 获取全部角色
export const reqAllRoleList = (
  page: number,
  limit: number,
  roleName: string,
) => {
  return request.get<any, RoleResponseData>(
    API.ALL_ROLE_URL + `${page}/${limit}/?roleName=${roleName}`,
  )
}

// 添加职位与更新已有职位
export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_ROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADD_ROLE_URL, data)
  }
}
