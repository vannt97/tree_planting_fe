import { TOKEN_MANAGE_OTP, TOKEN_QUIZ_GAME } from './../constant/common';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQueryWithToken = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_DOMAIN_API}/api`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('USER_TOKEN');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithTokenFo = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_DOMAIN_API}/api`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('access_token_fo');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithoutToken = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_DOMAIN_API}/api`,
});

export const baseQueryClientToken = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_DOMAIN_API_WARRANTY}:${process.env.NEXT_PUBLIC_WARRANTY_PORT_TOKEN}`,
  prepareHeaders: (headers) => {
    headers.set('Authorization', `Basic ZVdhcnJhbnR5OmVXYXJyYW50eQ==`);
    return headers;
  },
});

export const baseQueryClient = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_DOMAIN_API_WARRANTY}:${process.env.NEXT_PUBLIC_WARRANTY_PORT}/api/v1`,
  prepareHeaders: (headers) => {
    headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return headers;
  },
});

export const baseQueryPGManageOtp = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_DOMAIN_API}/api`,
  prepareHeaders: (headers) => {
    headers.set('Authorization', `Bearer ${sessionStorage.getItem(TOKEN_MANAGE_OTP)}`);
    return headers;
  },
});

//config redirect /quiz when status return 401

export const baseQueryQuizGame = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_DOMAIN_API}/api`,
  prepareHeaders: (headers) => {
    headers.set('accessToken', `${sessionStorage.getItem(TOKEN_QUIZ_GAME)}`);
    return headers;
  },
  fetchFn(input: any, init: any) {
    return fetch(input, init).then((response: any) => {
      if (response.status === 401) {
        window.location.href = '/quiz';
      }
      return response;
    });
  },
});

export const baseQueryFacebook = fetchBaseQuery({
  baseUrl: ``,
});
