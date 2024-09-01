import type { Parking } from "@repo/schemas/index";
import type { RootState } from "../store/global-store";
import type { PayloadAction, Slice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface ParkingState {
    value?: Parking;
}

const initialState: ParkingState = {
    value: undefined,
};

export const parkingSlice: Slice<ParkingState> = createSlice({
    name: "parking",
    initialState,
    reducers: {
        addParking: (state, action: PayloadAction<Parking>) => {
            state.value = action.payload;
        },
    },
});

export const { addParking } = parkingSlice.actions;

export const selectParking = (state: RootState) => state.parking.value;

export default parkingSlice.reducer;
