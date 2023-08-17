// 菜单管理模块相关的接口
import request from '@/utils/request'
import type { PermissionResponseData, MenuParams } from './type'

enum API {
  // 获取全部菜单与按钮的数据
  ALL_PERMISSION_URL = '/admin/acl/permission',
  // 给某一级菜单新增一个子菜单
  ADD_MENU_URL = '/admin/acl/permission/save',
  // 更新某一个已有的菜单
  UPDATE_URL = '/admin/acl/permission/update',
  // 删除已有的菜单
  DELETE_MENU_URL = '/admin/acl/permission/remove/',
}

// 获取全部菜单与按钮的数据
export const reqAllPermission = () => {
  return request.get<any, PermissionResponseData>(API.ALL_PERMISSION_URL)
}

// 添加与更新菜单的方法
export const reqAddOrUpdateMenu = (data: MenuParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_URL, data)
  } else {
    return request.post<any, any>(API.ADD_MENU_URL, data)
  }
}

// 删除某一个已有的菜单
export const reqRemoveMenu = (id: number) => {
  return request.delete<any, any>(API.DELETE_MENU_URL + id)
}
