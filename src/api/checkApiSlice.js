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

    // New endpoint for image claim verification
    checkImageClaim: builder.mutation({
      query: (imageFile) => {
        if (!imageFile || !(imageFile instanceof File)) {
          console.error("Invalid image file passed:", imageFile);
          return { url: "", method: "POST", body: {} };
        }

        const formData = new FormData();
        formData.append('image', imageFile);

        return {
          url: '/api/check/image',
          method: 'POST',
          body: formData,
        };
      },
    }),

  
    getRecentChecks: builder.query({
      query: () => ({
        url: '/api/check/recent',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCheckTextClaimMutation,
  useCheckImageClaimMutation,
  useGetRecentChecksQuery, 
} = checkApiSlice;
