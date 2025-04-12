
import { apiSlice } from './apiSlice';

export const checkApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Text Claim Check
    checkTextClaim: builder.mutation({
      query: (claim) => ({
        url: '/api/check/text',
        method: 'POST',
        body: claim,
      }),
    }),

    // Image Claim Check
    checkImageClaim: builder.mutation({
      query: (formData) => ({
        url: '/api/check/image',
        method: 'POST',
        body: formData,
      }),
    }),

    // Get Recent Checks
    getRecentChecks: builder.query({
      query: () => '/api/check/recent',
      providesTags: ['Check'],
    }),

    // Submit Feedback
    submitFeedback: builder.mutation({
      query: (feedback) => ({
        url: '/api/feedback',
        method: 'POST',
        body: feedback,
      }),
    }),

    // Report False Claim
    reportClaim: builder.mutation({
      query: (reportData) => ({
        url: '/api/report',
        method: 'POST',
        body: reportData,
      }),
    }),

    // Get Supported Languages
    getLanguages: builder.query({
      query: () => '/api/languages',
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
