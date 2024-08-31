import type { Ticket } from "@repo/schemas/index";
import type { RootState } from "../store/global-store";
import type { PayloadAction, Slice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface TicketState {
    value?: Ticket;
}

const storedData = typeof window === "undefined" ? null : localStorage.getItem("ticket");

const initialState: TicketState = {
    value: storedData ? JSON.parse(storedData) : "",
};

export const ticketSlice: Slice<TicketState> = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        addTicket: (state, action: PayloadAction<Ticket>) => {
            localStorage.setItem("ticket", JSON.stringify(action.payload));
            state.value = action.payload;
        },
        getTicket: (state) => {
            state.value = storedData ? JSON.parse(storedData) : "";
        },
        removeTicket: (state) => {
            localStorage.removeItem("ticket");
            state.value = undefined;
        },
    },
});

export const { addTicket, getTicket, removeTicket } = ticketSlice.actions;

export const selectTicket = (state: RootState) => state.ticket.value;

export default ticketSlice.reducer;
