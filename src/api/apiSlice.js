
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://factcheck-877d.onrender.com/api' }), 
  tagTypes: ['Check', 'Feedback', 'Report'],
  endpoints: (builder) => ({}),
});

export default apiSlice.reducer;
