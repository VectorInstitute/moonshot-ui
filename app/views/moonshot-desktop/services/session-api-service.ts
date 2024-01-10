import { handleResponseBody } from '@/app/lib/http-requests';
import { ErrorWithMessage } from '../../../lib/error-utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const host = process.env.MOONSHOT_API_URL || 'http://localhost';
const port = parseInt(process.env.PORT || '3000', 10);
const basePath = '/api/v1/sessions';

async function createSession(
  name: string,
  description: string,
  endpoints: string[]
): Promise<ApiResult<Session> | ErrorWithMessage> {
  const response = await fetch(`${host}:${port}${basePath}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      description: description,
      endpoints: endpoints,
    }),
  });
  const sessionData = await handleResponseBody<Session>(response);
  return sessionData;
}

const sessionApi = createApi({
  reducerPath: 'sessionApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${host}:${port}` }),
  endpoints: (builder) => ({
    getAllSessions: builder.query<Session[], void>({
      query: () => ({ url: 'api/v1/sessions' }),
    }),
    getSession: builder.query<Session, Session>({
      query: ({ session_id }) => ({ url: `api/v1/sessions/${session_id}` }),
    }),
  }),
});

const { useGetAllSessionsQuery, useGetSessionQuery, useLazyGetSessionQuery } = sessionApi;

export {
  createSession,
  sessionApi,
  useGetAllSessionsQuery,
  useGetSessionQuery,
  useLazyGetSessionQuery,
};
