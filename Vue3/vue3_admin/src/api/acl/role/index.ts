// 角色模块相关接口
import request from '@/utils/request'
import type { RoleResponseData, RoleData, MenuResponseData } from './type'

// 枚举地址
enum API {
  // 获取全部职位
  ALL_ROLE_URL = '/admin/acl/role/',
  // 添加一个职位
  ADD_ROLE_URL = '/admin/acl/role/save',
  // 更新已有的职位
  UPDATE_ROLE_URL = '/admin/acl/role/update',
  // 获取全部的菜单与按钮的数据
  ALL_PERMISSION_URL = '/admin/acl/permission/toAssign/',
  // 给响应的职位分配权限
  SET_PERMISSION_URL = '/admin/acl/permission/doAssign/?',
  // 删除已有的职位
  REMOVE_ROLE_URL = '/admin/acl/role/remove/',
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

// 获取全部菜单与按钮权限的数据
export const reqAllMenuList = (roleId: number) => {
  return request.get<any, MenuResponseData>(API.ALL_PERMISSION_URL + roleId)
}

// 给相应的职位下发权限
export const reqSetPermission = (roleId: number, permissionId: number[]) => {
  return request.post<any, any>(
    API.SET_PERMISSION_URL + `roleId=${roleId}&permissionId=${permissionId}`,
  )
}

// 删除已有的职位
export const reqRemoveRole = (roleId: number) => {
  return request.delete<any, any>(API.REMOVE_ROLE_URL + roleId)
}
