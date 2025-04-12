import { apiSlice } from './apiSlice';

export const checkApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkTextClaim: builder.mutation({
      query: (claim) => ({
        url: '/check',  
        method: 'POST',
        body: claim,
      }),
    }),

    checkImageClaim: builder.mutation({
      query: (formData) => ({
        url: '/check/image', 
        method: 'POST',
        body: formData,
      }),
    }),

    getRecentChecks: builder.query({
      query: () => '/check/recent', 
      providesTags: ['Check'],
    }),

    submitFeedback: builder.mutation({
      query: (feedback) => ({
        url: '/feedback',
        method: 'POST',
        body: feedback,
      }),
    }),

    reportClaim: builder.mutation({
      query: (reportData) => ({
        url: '/report',
        method: 'POST',
        body: reportData,
      }),
    }),

    getLanguages: builder.query({
      query: () => '/languages', 
    }),
  }),
});

export const {
  useCheckTextClaimMutation,
  useCheckImageClaimMutation,
  useGetRecentChecksQuery,
  useSubmitFeedbackMutation,
  useReportClaimMutation,
  useGetLanguagesQuery,
} = checkApiSlice;
