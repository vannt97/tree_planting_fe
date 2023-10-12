import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryPGManageOtp } from './baseQuery';
``
export const QuizManageAPI = createApi({
  reducerPath: 'QuizManageAPI',
  baseQuery: baseQueryPGManageOtp,
  endpoints: (builder) => ({
    getOtpforPG: builder.query<any, any>({
      query: () => ({
        url: `/QuestionGames/OTPPG`,
        method: 'GET',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const { useGetOtpforPGQuery } = QuizManageAPI;
