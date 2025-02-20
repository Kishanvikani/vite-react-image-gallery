import { API_ENDPOINTS } from ".././constants";
import { Photo } from "../models/Photo";
import { rootApiSlice } from "../redux/root.api.slice";

export const photoApiSlice = rootApiSlice
    .enhanceEndpoints({ addTagTypes: ['PHOTO'] })
    .injectEndpoints({
        endpoints: (build) => ({
            getSearchedImages: build.query<Photo[], { page: number, searchTerm: string }>({
                query: ({ page, searchTerm }) => ({
                    url: API_ENDPOINTS.searchImages,
                    params: {
                        page,
                        query: searchTerm,
                        per_page: 20
                    }
                }),
                transformResponse: (response: { results: Photo[] }) => response.results.map((photo) => {
                    return {
                        id: photo.id,
                        alt_description: photo.alt_description,
                        urls: {
                            small: photo.urls.small + 'h=200',
                            regular: photo.urls.regular,
                        },
                        user: photo.user,
                        created_at: photo.created_at,
                        likes: photo.likes
                    }
                }),
            }),
            getImageDetails: build.query<Photo, string>({
                query: (id) => ({
                    url: `${API_ENDPOINTS.getPhotoDetails}/${id}`,
                }),
                transformResponse: (response: Photo) => {
                    return {
                        id: response.id,
                        alt_description: response.alt_description,
                        urls: {
                            small: response.urls.small + 'h=200',
                            regular: response.urls.regular,
                        },
                        user: response.user,
                        created_at: response.created_at,
                        likes: response.likes
                    }
                }
            }),
        }),
        overrideExisting: false
    })

export const { useGetSearchedImagesQuery, useGetImageDetailsQuery } = photoApiSlice;