import { apiSlice } from './apiSlice';



const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;


export const checkApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Google API: Claim check (text only, via GET)
    checkTextClaim: builder.query({
      query: (claimText) => {
        if (!claimText || typeof claimText !== 'string') {
          console.error("Invalid claim text passed:", claimText);
          return { url: "" };
        }

        // Directly use the claim text and encode it
        const encodedText = encodeURIComponent(claimText);

        return {
          url: `/claims:search?query=${encodedText}&key=${API_KEY}`,
        };
      },
    }),
  }),
});

export const {
  useLazyCheckTextClaimQuery,
} = checkApiSlice;
