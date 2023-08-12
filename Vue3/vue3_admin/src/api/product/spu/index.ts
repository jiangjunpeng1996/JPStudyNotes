// SPU管理模块相关的接口
import request from '@/utils/request'
import type { HasSpuResponseData } from './type'

enum API {
  // 获取已有的SPU的数据
  HAS_SPU_URL = '/admin/product/',
}

// 获取某一个三级分类下已有的SPU数据
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: string | number,
) => {
  return request.get<any, HasSpuResponseData>(
    API.HAS_SPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )
}
