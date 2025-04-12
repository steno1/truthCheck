// src/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://your-api-url.com' }), // replace with  real API
  tagTypes: ['Check', 'Feedback', 'Report'],
  endpoints: (builder) => ({}),
});

export default apiSlice.reducer;



