import { API_ENDPOINTS } from ".././constants";
import { Photo } from "../models/Photo";
import { rootApiSlice } from "../redux/root.api.slice";

const getRequiredData = (photo: Photo) => ({
    id: photo.id,
    alt_description: photo.alt_description,
    urls: {
        regular: photo.urls.regular,
    },
    user: photo.user,
    created_at: photo.created_at,
    likes: photo.likes
})

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
                transformResponse: (response: { results: Photo[] }) => response.results.map(getRequiredData),
            }),
            getImageDetails: build.query<Photo, string>({
                query: (id) => ({
                    url: `${API_ENDPOINTS.getPhotoDetails}/${id}`,
                }),
                transformResponse: (response: Photo) => getRequiredData(response),
            }),
        }),
        overrideExisting: false
    })

export const { useGetSearchedImagesQuery, useGetImageDetailsQuery } = photoApiSlice;