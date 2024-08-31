import { configureStore } from "@reduxjs/toolkit";
import ticketReducer from "../reducer/ticketSlice";

export const globalStore = configureStore({
    reducer: { ticket: ticketReducer },
});

export type RootState = ReturnType<typeof globalStore.getState>;
export type AppDispatch = typeof globalStore.dispatch;
