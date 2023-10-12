import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithoutToken } from './baseQuery';

// Define a service using a base URL and expected endpoints
export const GreenNews = createApi({
  reducerPath: 'greenNews',
  baseQuery: baseQueryWithoutToken,
  endpoints: (builder) => ({
    getGreenNews: builder.query<any, void>({
      query: () => ({
        url: `/TreeInformations/GetGreenNewsletterManagement`,
        method: 'GET',
      }),
      transformResponse: (res: any) => {
        if (res.success === true) {
          return res.data;
        }
      },
    }),
    getTreePlantingSite: builder.query<any, void>({
      query: () => ({
        url: `TreeInformations/GetTreePlantingSite`,
        method: 'GET',
      }),
      transformResponse: (res: any) => {
        if (res.success === true) {
          return res.data;
        }
      },
    }),
    getDetailTreeSharing: builder.query<any, any>({
      query: (params: any) => ({
        url: `/TreeInformations/DetailTreeSharing?StringCode=${params.treeCode}`,
        method: 'GET',
      }),
      transformResponse: (res: any) => {
        if (res.success === true) {
          return res.data;
        }
      },
    }),
    getInfoTree: builder.query<any, any>({
      query: (params: any) => ({
        url: `/TreeInformations/GetInforTree?ProvinceCode=${params.provinceCode}&TreeName=${params.treeName}`,
        method: 'GET',
      }),
      transformResponse: (res: any) => {
        if (res.success === true) {
          return res.data;
        }
      },
    }),
    postCreateTreeInfo: builder.mutation<any, any>({
      query: (body: any) => ({
        url: '/TreeInformations/CreateTreeInFO',
        body,
        method: 'POST',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetGreenNewsQuery,
  useLazyGetGreenNewsQuery,
  usePostCreateTreeInfoMutation,
  useGetDetailTreeSharingQuery,
  useLazyGetTreePlantingSiteQuery,
  useLazyGetInfoTreeQuery,
  useLazyGetDetailTreeSharingQuery,
} = GreenNews;
