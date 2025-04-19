import { apiSlice } from './apiSlice';

export const checkApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkTextClaim: builder.mutation({
      query: (claimText) => {
        if (!claimText || typeof claimText !== 'string') {
          console.error("Invalid claim text passed:", claimText);
          return { url: "", method: "POST", body: {} };
        }

        return {
          url: '/api/check/text',
          method: 'POST',
          body: { text: claimText },
        };
      },
    }),
  }),
});

export const { useCheckTextClaimMutation } = checkApiSlice;
