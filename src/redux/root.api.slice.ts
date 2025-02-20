import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./base.query";

export const rootApiSlice = createApi({
    reducerPath: 'rootApiSlice',
    baseQuery: axiosBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
    }),
    endpoints: () => ({}),
})

