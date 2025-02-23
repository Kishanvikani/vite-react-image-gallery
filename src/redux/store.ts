import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import photoSlice from '../feature/photo.slice';
import { rootApiSlice } from './root.api.slice';

const reducer = combineReducers({
    photo: photoSlice,
    [rootApiSlice.reducerPath]: rootApiSlice.reducer,
})

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rootApiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector