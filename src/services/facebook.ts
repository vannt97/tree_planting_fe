import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithoutToken, baseQueryFacebook } from './baseQuery';

// Define a service using a base URL and expected endpoints
export const Facebook = createApi({
  reducerPath: 'facebook',
  baseQuery: baseQueryFacebook,
  endpoints: (builder) => ({
    getTokenFacebook: builder.query<any, void>({
      query: () => ({
        url: `https://graph.facebook.com/oauth/access_token?client_id=780575253108431&client_secret=4ef21b137647b81a6297386a4ed8df63&grant_type=client_credentials`,
        method: 'GET',
      }),
    }),
    postFacebook: builder.mutation<any, any>({
        query: (body: any) => ({
          url: `https://graph.facebook.com/?id=${encodeURIComponent(body.url)}&scrape=true&access_token=${body.token}`,
          method: 'POST',
        }),
      }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLazyGetTokenFacebookQuery,
  usePostFacebookMutation
} = Facebook;
