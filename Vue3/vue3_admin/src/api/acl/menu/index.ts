// 菜单管理模块相关的接口
import request from '@/utils/request'
import type { PermissionResponseData } from './type'

enum API {
  // 获取全部菜单与按钮的数据
  ALL_PERMISSION_URL = '/admin/acl/permission',
}

// 获取全部菜单与按钮的数据
export const reqAllPermission = () => {
  return request.get<any, PermissionResponseData>(API.ALL_PERMISSION_URL)
}
