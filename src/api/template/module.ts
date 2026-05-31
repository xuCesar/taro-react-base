import { createApiModule } from '@/api/core/createModule'

export interface ExampleItem {
  id: string
  name: string
}

export interface ExampleListParams {
  keyword?: string
  page?: number
  pageSize?: number
}

export interface ExampleListResponse {
  list: ExampleItem[]
  total: number
}

export interface CreateExampleParams {
  name: string
}

export const getExampleListApi = createApiModule<ExampleListParams, ExampleListResponse>({
  url: '/example/list',
  method: 'GET',
  getData: params => params
})

export const getExampleDetailApi = createApiModule<{ id: string }, ExampleItem>({
  url: params => `/example/${params.id}`,
  method: 'GET'
})

export const createExampleApi = createApiModule<CreateExampleParams, ExampleItem>({
  url: '/example',
  method: 'POST'
})
