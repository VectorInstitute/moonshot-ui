import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const host = process.env.MOONSHOT_API_URL || 'http://localhost';
const port = parseInt(process.env.PORT || '3000', 10);

const statusApi = createApi({
  reducerPath: 'statusApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${host}:${port}` }),
  endpoints: (builder) => ({
    getAllStatus: builder.query<TestStatuses, void>({
      query: () => 'api/v1/status',
    }),
  }),
});

const { useGetAllStatusQuery } = statusApi;

export { statusApi, useGetAllStatusQuery };
