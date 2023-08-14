// SKU管理模块相关的接口
import request from '@/utils/request'
import { SkuResponseData } from './type'

enum API {
  // 获取已有的SKU商品的数据
  SKU_URL = '/admin/product/list/',
}

export const reqSkuList = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)
