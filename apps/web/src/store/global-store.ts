import { configureStore } from "@reduxjs/toolkit";

export const globalStore = configureStore({
    reducer: {},
});

export type RootState = ReturnType<typeof globalStore.getState>;
export type AppDispatch = typeof globalStore.dispatch;
