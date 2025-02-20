import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const axiosBaseQuery = ({ baseUrl }: { baseUrl: string } = { baseUrl: "" }): BaseQueryFn<{
    url: string
    method?: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
    headers?: AxiosRequestConfig['headers']
    responseType?: AxiosRequestConfig['responseType']
    withCredentials?: boolean,
}> => async ({ url = "", method = 'GET', data, params, responseType, withCredentials }) => {
    try {
        // Check for token here if not then throw some error or feedback
        const result = await axios({
            url: baseUrl + url || url,
            method,
            headers: {
                Authorization: `Client-ID ${import.meta.env.VITE_ACCESS_KEY}`
            },
            data,
            params,
            responseType,
            withCredentials
        })
        console.log(result)
        return { data: result.data }
    } catch (err) {
        const error = err as AxiosError
        return {
            error: {
                status: error.response?.status,
                data: error.response?.data || error.message
            }
        }
    }
}