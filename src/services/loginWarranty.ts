import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithoutToken } from './baseQuery';

// Define a service using a base URL and expected endpoints
export const LoginWarranty = createApi({
  reducerPath: 'LoginWarranty',
  baseQuery: baseQueryWithoutToken,
  endpoints: (builder) => ({
    postLoginToken: builder.mutation<any, any>({
      query: (body: any) => ({
        url: '/Auth/EW/Token',
        body,
        method: 'POST',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { usePostLoginTokenMutation } = LoginWarranty;
