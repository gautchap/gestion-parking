import { configureStore } from "@reduxjs/toolkit";
import ticketReducer from "../reducer/ticketSlice";
import parkingReducer from "../reducer/parkingSlice";

export const globalStore = configureStore({
    reducer: { ticket: ticketReducer, parking: parkingReducer },
});

export type RootState = ReturnType<typeof globalStore.getState>;
export type AppDispatch = typeof globalStore.dispatch;
