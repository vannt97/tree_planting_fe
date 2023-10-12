import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithToken } from './baseQuery';

// Define a service using a base URL and expected endpoints
export const TreeAPI = createApi({
  reducerPath: 'TreeAPI',
  baseQuery: baseQueryWithToken,
  endpoints: (builder) => ({
    getMyGarden: builder.query<any, any>({
      query: (params) => ({
        url: `/TreeInformations/GetYourGarden`,
        method: 'GET',
      }),
      transformResponse: (res: any) => {
        if (res.success === true) {
          return res.data;
        }
      },
    }),
    getTrackMyTree: builder.query<any, any>({
      query: (params) => ({
        url: `/TreeInformations/TrackYourTree?StringCode=${params.stringCode}`,
        method: 'GET',
      }),
      transformResponse: (res: any) => {
        if (res.success === true) {
          return res.data;
        }
      },
    }),
    updateTreeName: builder.mutation<any, { id: string; treeName: string }>({
      query: ({ id, treeName }) => ({
        url: `/TreeInformations/UpdateTreeNameFO?Id=${id}&TreeName=${treeName}`,
        body: { id, treeName },
        method: 'PUT',
      }),
    }),
    getCampaignIsRunning: builder.query<any, { publicCode: string }>({
      query: (params) => ({
        url: `/TreeInformations/CampaignIsRunning`,
        params,
        method: 'GET',
      }),
      transformResponse: (res: any) => {
        if (res.success === true) {
          return res.data;
        } else {
          return res;
        }
      },
    }),
    postSaveHistory: builder.mutation<any, any>({
      query: (body) => ({
        url: `/TreeInformations/SaveHistoryRotation`,
        body,
        method: 'POST',
      }),
      transformResponse: (res: any) => {
        if (res.success === true) {
          return res.data;
        } else {
          return {};
        }
      },
    }),
    putReadyToPlay: builder.mutation<any, any>({
      query: (body) => ({
        url: `/TreeInformations/UpdateReadyToPlay`,
        body,
        method: 'PUT',
      }),
      transformResponse: (res: any) => {
        if (res.success === true) {
          return res.data;
        } else {
          return res;
        }
      },
    }),
    updateTotalShare: builder.mutation<any, any>({
      query: (body) => ({
        url: `/TreeInformations/UpdateTotalShare`,
        body,
        method: 'PUT',
      }),
      transformResponse: (res: any) => {
        if (res.success === true) {
          return res.data;
        } else {
          return {};
        }
      },
    }),
    pushRotationLuck: builder.mutation<any, any>({
      query: (body) => ({
        url: `/TreeInformations/PushRotationLuck?PublicCode=${body.publicCode}`,
        body,
        method: 'POST',
      }),
      transformResponse: (res: any) => {
        if (res.success === true) {
          return res.data;
        } else {
          return {};
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetMyGardenQuery,
  useLazyGetTrackMyTreeQuery,
  useGetTrackMyTreeQuery,
  useUpdateTreeNameMutation,
  useGetCampaignIsRunningQuery,
  useLazyGetCampaignIsRunningQuery,
  usePostSaveHistoryMutation,
  usePutReadyToPlayMutation,
  useUpdateTotalShareMutation,
  usePushRotationLuckMutation,
} = TreeAPI;

const TreeSlice = createSlice({
  name: 'TreeSlice',
  initialState: {
    gardenData: {},
    provinces: {
      provinceId: '',
      isShow: '',
    },
    storyAndHistory: null,
  },
  reducers: {
    getGardenData(state, action) {
      state.gardenData = action.payload;
    },
    getProvinceID(state, action) {
      state.provinces = action.payload;
    },
    getHistoryAndStory(state, action) {
      state.storyAndHistory = action.payload;
    },
  },
});
export const { getGardenData, getProvinceID, getHistoryAndStory } = TreeSlice.actions;
export default TreeSlice.reducer;
