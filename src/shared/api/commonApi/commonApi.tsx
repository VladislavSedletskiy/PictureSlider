import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const commonApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "https://www.reddit.com/" }),
    reducerPath: "commonApi",
    endpoints: build => ({
        getCatsPosts: build.query({
            query: params => ({
                url: 'r/cats/.json',
                method: 'GET',
                params,
            }),
        }),
    }),
})

export const { useGetCatsPostsQuery } = commonApi
