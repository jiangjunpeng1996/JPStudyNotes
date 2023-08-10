// 品牌管理模块接口
import request from '@/utils/request'
import type { TradeMarkResponseData } from './type'
// 品牌管理模块接口地址
enum API {
  // 获取已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
}

/**
 * 获取已有品牌的接口方法
 * @param page 获取第几页，默认第一页
 * @param limit 获取几个已有品牌的数据
 */
export const reqHasTradeMark = (page: number, limit: number) => {
  return request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
}
