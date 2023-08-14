// SKU管理模块相关的接口
import request from '@/utils/request'
import { SkuResponseData } from './type'

enum API {
  // 获取已有的SKU商品的数据
  SKU_URL = '/admin/product/list/',
  // 商品上架
  SALE_URL = '/admin/product/onSale/',
  // 商品下架
  CANCEL_SALE_URL = '/admin/product/cancelSale/',
  // 获取商品详情
  SKU_INFO_URL = '/admin/product/getSkuInfo/',
}

// 获取商品SKU的接口
export const reqSkuList = (page: number, limit: number) => {
  return request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)
}

// 已有商品上架的请求
export const reqSaleSku = (skuId: number) => {
  return request.get<any, any>(API.SALE_URL + skuId)
}

// 已有商品下架的请求
export const reqCancelSale = (skuId: number) => {
  return request.get<any, any>(API.CANCEL_SALE_URL + skuId)
}

// 获取商品详情
export const reqSkuInfo = (skuId: number) => {
  return request.get<any, SkuInfoData>(API.SKU_INFO_URL + skuId)
}
