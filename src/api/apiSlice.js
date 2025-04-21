import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BACKEND_BASE_URL
    : 'http://localhost:5000';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Check', 'Feedback', 'Report'],
  endpoints: (builder) => ({}),
});

export default apiSlice.reducer;
