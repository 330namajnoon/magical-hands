import { configureStore } from "@reduxjs/toolkit";
import appReducer, { AppState } from "./Slices/AppSlice";
import reservationSlice, { ReservationState } from "./Slices/ReservationSlice";
import userSlice, { UserState } from "./Slices/UserSlice";
import adminSlice, { AdminState } from "./Slices/AdminSlice";

export type Store = {app: AppState, reservation: ReservationState, user: UserState, admin: AdminState};

const store = configureStore({
    reducer: {
        app: appReducer,
        reservation: reservationSlice,
        user: userSlice,
        admin: adminSlice
    },
})

export type AppDispach = typeof store.dispatch;
export default store;