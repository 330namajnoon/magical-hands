import { configureStore } from "@reduxjs/toolkit";
import appReducer, { AppState } from "./Slices/AppSlice";
import reservationSlice, { ReservationState } from "./Slices/ReservationSlice";
import userSlice, { UserState } from "./Slices/UserSlice";

export type Store = {app: AppState, reservation: ReservationState, user: UserState};

const store = configureStore({
    reducer: {
        app: appReducer,
        reservation: reservationSlice,
        user: userSlice,
    },
})

export type AppDispach = typeof store.dispatch;
export default store;