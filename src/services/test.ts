import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithoutToken } from './baseQuery'

// Define a service using a base URL and expected endpoints
export const todoAPI = createApi({
  reducerPath: 'todoAPI',
  baseQuery: baseQueryWithoutToken,
  endpoints: (builder) => ({
    // params đầu tiên là type of response nhận về
    // params thứ 2 là type of request gửi lên
    // nếu k gửi lên gì hết =>  void
    // get là query
    getTodo: builder.query<any, void>({
      query: (body: any) => ({
        url: '/todos/1',
        body,
        method: 'GET',
      }),
    }),
    // post, put, delete là mutation
    postTodo: builder.mutation<any, any>({
      query: (body: any) => ({
        url: '/todos/1',
        body,
        method: 'POST',
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTodoQuery, usePostTodoMutation } = todoAPI
