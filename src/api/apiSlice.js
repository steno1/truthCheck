import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

export const apiSlice = createApi({
  reducerPath: 'api', 
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Check', 'Feedback', 'Report'],
  endpoints: (builder) => ({}),
});

export default apiSlice;
