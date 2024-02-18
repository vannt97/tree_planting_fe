import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithoutToken } from './baseQuery';
import { LIMIT } from 'src/constant/common';

export const GalleryApi = createApi({
  reducerPath: 'GalleryApi',
  baseQuery: baseQueryWithoutToken,
  endpoints: (builder) => {
    return {
      getCompositions: builder.query<any, { page: string }>({
        query: (params) => {
          return {
            url: `/Compositions?Page=${params.page}&Limit=${LIMIT}&OrderBy=2`,
            method: 'GET',
          };
        },
        transformResponse: (res: any) => {
          if (res.success) {
            return res.data;
          }
        },
      }),
    };
  },
});

export const { useLazyGetCompositionsQuery } = GalleryApi;
