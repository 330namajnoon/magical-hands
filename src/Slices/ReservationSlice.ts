import { createSlice } from "@reduxjs/toolkit";
import { Service } from "./AppSlice";

export type ReservationState = {
    selectedService: Service | undefined | null;
}

const initialState: ReservationState = {
    selectedService: null,
}

const reservationSlice = createSlice({
    name: "reservationSlice",
    initialState,
    reducers: {
        
    }
})

export default reservationSlice.reducer;