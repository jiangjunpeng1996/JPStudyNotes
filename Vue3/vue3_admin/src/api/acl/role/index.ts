// 角色模块相关接口
import request from '@/utils/request'
import type { RoleResponseData } from './type'

// 枚举地址
enum API {
  // 获取全部职位
  ALL_ROLE_URL = '/admin/acl/role/',
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
