import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithoutToken } from './baseQuery';

// Define a service using a base URL and expected endpoints
export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: baseQueryWithoutToken,
  endpoints: (builder) => ({
    postLogin: builder.mutation<any, any>({
      query: (body: any) => ({
        url: '/Auth/LearnerLogin',
        body,
        method: 'POST',
      }),
    }),
    getVideo: builder.query<any, any>({
      query: (body) => ({
        url: `/TreeInformations/GetVideo`,
        method: 'GET',
      }),
    }),
    loginForPgManageOtp: builder.mutation<any, { userName: string; password: string }>({
      query: (body: any) => ({
        url: '/Auth/PortalLogin',
        body,
        method: 'POST',
      }),
    }),
    verifyTOTPQuizgame: builder.query<any, { OTP: string }>({
      query: (params) => ({
        url: `/QuestionGames/VerifyOTPPG`,
        params,
        method: 'GET',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  usePostLoginMutation,
  useGetVideoQuery,
  useLoginForPgManageOtpMutation,
  useLazyVerifyTOTPQuizgameQuery,
} = AuthApi;
