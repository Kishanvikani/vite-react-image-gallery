import { createSlice } from "@reduxjs/toolkit";
import { photoApiSlice } from "../api/photo.api.slice";
import { Photo } from "../models/Photo";
import { RootState } from "../redux/store";

interface PhotoState {
    photos: Photo[]
}

const initialState: PhotoState = {
    photos: [],
}

const photoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {
        resetPhotos: (state) => {
            state.photos = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(photoApiSlice.endpoints.getSearchedImages.matchFulfilled, (state, action) => {
                state.photos = [...state.photos, ...action.payload];
            })
    }
})

export const { resetPhotos } = photoSlice.actions;

export const getAllPhotos = (state: RootState) => state.photo.photos;

export default photoSlice.reducer;