import { useLazyGetTreeCodeQuery } from 'src/services/warranty';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryQuizGame } from './baseQuery';

export const QuizAPI = createApi({
  reducerPath: 'QuizAPI',
  baseQuery: baseQueryQuizGame,
  endpoints: (builder) => ({
    registerPlayer: builder.mutation<any, { fullName: string; phoneNumber: string; email: string }>(
      {
        query: (body) => ({
          url: `/QuestionGames/RegisterPlayer`,
          body,
          method: 'POST',
        }),
      }
    ),
    gamePlay: builder.mutation<any, { playerId: string }>({
      query: (body) => ({
        url: `/QuestionGames/GamePlay`,
        body,
        method: 'POST',
      }),
    }),
    answerQuestion: builder.mutation<
      any,
      { playerQuestionId: string; playerQuestionGroupId: string; playerAnswerId: string }
    >({
      query: (body) => ({
        url: `/QuestionGames/GamePlay/Answer`,
        body,
        method: 'POST',
      }),
    }),
    getQuestion: builder.query<any, { PlayerQuestionId: string }>({
      query: (body) => ({
        url: `/QuestionGames/GamePlay/Question/${body.PlayerQuestionId}`,
        method: 'GET',
      }),
      transformResponse: (res: any) => {
        if (res.success === true) {
          return res.data;
        }
      },
    }),
    getResult: builder.query<any, { PlayerQuestionGroupId: string }>({
      query: ({ PlayerQuestionGroupId }) => ({
        url: `/QuestionGames/Result/${PlayerQuestionGroupId}`,
        method: 'GET',
      }),
    }),
    sendOtp: builder.query<any, { PhoneNumber: string }>({
      query: (params) => ({
        url: `/SMS/OTP`,
        params,
        method: 'GET',
      }),
    }),
    verifyOtp: builder.query<any, { PhoneNumber: string; OTP: string }>({
      query: (params) => ({
        url: `/SMS/VerifyOTP`,
        params,
        method: 'GET',
      }),
    }),
    createTreeCode: builder.query<any, { playerQuestionGroupId: string }>({
      query: (body) => ({
        url: `/QuestionGames/CodeTree/${body.playerQuestionGroupId}`,
        method: 'GET',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const {
  useRegisterPlayerMutation,
  useGamePlayMutation,
  useAnswerQuestionMutation,
  useGetQuestionQuery,
  useGetResultQuery,
  useLazySendOtpQuery,
  useLazyVerifyOtpQuery,
  useLazyCreateTreeCodeQuery,
} = QuizAPI;
