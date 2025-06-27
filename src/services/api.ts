import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
;

export const api = createApi({
  reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL || 'https://lazyledger-backend.onrender.com/',
        prepareHeaders: (headers, {getState}) => {
        const state = getState() as { auth?: { token?: string } };
        const token = state.auth?.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
        },
    }),
    endpoints: (builder) => ({
        createRawRecord: builder.mutation({
            query: (record) => ({
                url: 'raw-records/create',
                method: 'POST',
                body: record,
            }),
        }),
        getTransactionsByUser: builder.query({
            query: (userId) => ({
                url: `transactions/user/${userId}`,
                method: 'GET',
            }),
        }),
        
        

        
        })
    })


export const {useCreateRawRecordMutation,useGetTransactionsByUserQuery} = api;