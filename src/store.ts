import { configureStore } from "@reduxjs/toolkit";
import appReducer, { AppState } from "./Slices/AppSlice";
import reservationSlice, { ReservationState } from "./Slices/ReservationSlice";

export type Store = {app: AppState, reservation: ReservationState};

const store = configureStore({
    reducer: {
        app: appReducer,
        reservation: reservationSlice,
    }
})

export type AppDispach = typeof store.dispatch;
export default store;