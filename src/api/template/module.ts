import { createApiModule } from '@/api/core/createModule'

export interface ExampleItem {
  id: string
  name: string
}

export const getExampleListApi = createApiModule<void, ExampleItem[]>({
  url: '/example/list',
  method: 'GET'
})

export const getExampleDetailApi = createApiModule<{ id: string }, ExampleItem>({
  url: params => `/example/${params.id}`,
  method: 'GET'
})
