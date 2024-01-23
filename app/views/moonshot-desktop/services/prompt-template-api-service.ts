import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const host = process.env.MOONSHOT_API_URL || 'http://localhost';
const port = parseInt(process.env.PORT || '3000', 10);

const promptTemplateApi = createApi({
  reducerPath: 'promptTemplateApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${host}:${port}` }),
  endpoints: (builder) => ({
    getPromptTemplates: builder.query<PromptTemplate[], void>({
      query: () => 'api/v1/prompt_templates',
    }),
    usePromptTemplate: builder.mutation<PromptTemplate, { templateName: string }>({
      query: ({ templateName }) => ({
        url: `api/v1/prompt_templates/${templateName}`,
        method: 'PUT',
      }),
    }),
  }),
});

const { useUsePromptTemplateMutation, useLazyGetPromptTemplatesQuery, useGetPromptTemplatesQuery } =
  promptTemplateApi;

export {
  promptTemplateApi,
  useLazyGetPromptTemplatesQuery,
  useUsePromptTemplateMutation,
  useGetPromptTemplatesQuery,
};
