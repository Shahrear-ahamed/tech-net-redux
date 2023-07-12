import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/',
  }),
  tagTypes: ['comments'],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => '/products',
    }),
    singleProduct: builder.query({
      query: (id) => `/product/${id}`,
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comments'],
    }),
    getComments: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comments'],
    }),
  }),
});

export const {
  useGetProductQuery,
  useSingleProductQuery,
  usePostCommentMutation,
  useGetCommentsQuery,
} = productsApi;
