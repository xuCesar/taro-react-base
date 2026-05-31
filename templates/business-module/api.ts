import { createApiModule } from '@/api/core/createModule'

export interface __PascalModule__Item {
  id: string
  name: string
}

export interface __PascalModule__ListParams {
  keyword?: string
  page?: number
  pageSize?: number
}

export interface __PascalModule__ListResponse {
  list: __PascalModule__Item[]
  total: number
}

export interface Create__PascalModule__Params {
  name: string
}

export const get__PascalModule__ListApi = createApiModule<__PascalModule__ListParams, __PascalModule__ListResponse>({
  url: '/__kebabModule__/list',
  method: 'GET',
  getData: params => params
})

export const get__PascalModule__DetailApi = createApiModule<{ id: string }, __PascalModule__Item>({
  url: params => `/__kebabModule__/${params.id}`,
  method: 'GET'
})

export const create__PascalModule__Api = createApiModule<Create__PascalModule__Params, __PascalModule__Item>({
  url: '/__kebabModule__',
  method: 'POST'
})
