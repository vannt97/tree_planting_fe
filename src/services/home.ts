import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithoutToken } from './baseQuery';
import { createSlice } from '@reduxjs/toolkit';

// Define a service using a base URL and expected endpoints
export const HomeAPI = createApi({
  reducerPath: 'HomeAPI',
  baseQuery: baseQueryWithoutToken,
  endpoints: (builder) => ({
    postLogin: builder.mutation<any, any>({
      query: (body: any) => ({
        url: '/Auth/TreeLogin',
        body,
        method: 'POST',
      }),
    }),
    getBanner: builder.query<any, void>({
      query: () => ({
        url: `/StaticPages/ImageTrial`,
        method: 'GET',
      }),
      transformResponse: (res: any) => {
        if (res.success === true) {
          return res.data;
        }
      },
    }),
    getImgPartners: builder.query<any, void>({
      query: () => ({
        url: `/StaticPages/ImagesLogo`,
        method: 'GET',
      }),
      transformResponse: (res: any) => {
        if (res.success === true) {
          return res.data;
        }
      },
    }),
    getTreePlantingSite: builder.query<any, any>({
      query: (params) => ({
        url: `/TreeInformations/GetTreePlantingSite`,
        method: 'GET',
      }),
      transformResponse: (res: any) => {
        if (res.success === true) {
          return res.data.data;
        }
      },
    }),
    getArrayTree: builder.query<any, any>({
      query: (params) => ({
        url: `/TreeInformations/DetailTreeFollowArrayCode?${params}`,
        method: 'GET',
      }),
      transformResponse: (res: any) => {
        if (res.success === true) {
          return res.data;
        }
      },
    }),
    getStoryAndHistory: builder.query<any, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `/TreeInformations/TreePlantingSite/${id}/GetStoryAndHistory`,
        method: 'GET',
      }),
      transformResponse: (res: any) => {
        if (res.success === true) {
          return res.data;
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const {
  usePostLoginMutation,
  useGetBannerQuery,
  useGetTreePlantingSiteQuery,
  useLazyGetArrayTreeQuery,
  useLazyGetStoryAndHistoryQuery,
  useGetImgPartnersQuery
} = HomeAPI;
