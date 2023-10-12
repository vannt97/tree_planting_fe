import { Warranty as WarrantyI } from './../models/warranty';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithoutToken } from './baseQuery';

// Define a service using a base URL and expected endpoints
export const Warranty = createApi({
  reducerPath: 'Warranty',
  baseQuery: baseQueryWithoutToken,
  endpoints: (builder) => ({
    postWarranty: builder.mutation<any, WarrantyI>({
      query: (body: WarrantyI) => ({
        url: '/Auth/EW/WarrantyRegister',
        body,
        method: 'POST',
      }),
    }),
    getTreeCode: builder.query<any, any>({
      query: (params: any) => ({
        url: `/Auth/EW/GetTreeCode?phoneNumber=${params?.phoneNumber}&modelName=${params?.modelName}&engineNo=${params?.engineNo}`,
        method: 'GET',
      }),
    }),
    getTreeHistory: builder.query<
      {
        treeCode: string;
        customerTel: string;
        customerName: string;
        provinceName: string;
        treeType: string;
        id: number;
      }[],
      { phoneNumber: string; publicCode: string }
    >({
      query: (params: any) => ({
        url: `/Auth/EW/GetTree?phoneNumber=${params?.phoneNumber}&treeCode=${params?.publicCode}`,
        method: 'GET',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  usePostWarrantyMutation,
  useLazyGetTreeCodeQuery,
  useGetTreeHistoryQuery,
  useLazyGetTreeHistoryQuery,
} = Warranty;
