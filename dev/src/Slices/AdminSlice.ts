import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverURL } from "../config";
import { dateToString } from "../Utils/dateToString";

export type AdminReservationData = {
    client_id: number;
    date: string;
    email: string;
    endTime: string
    lastName1: string;
    lastName2: string;
    name: string;
    phoneNumber: string;
    serviceId: string;
    serviceName: string;
    serviceTitle: string;
    startTime: string;
}

export type DateInputsValue = {
    startDate: string;
    endDate: string;
}

export type AdminState = {
    isLoading: boolean;
    error: any;
    reservations: AdminReservationData[];
    dateInputsValue: DateInputsValue;
}

export const getAdminReservationsByDate = createAsyncThunk<AdminReservationData[], { startDate: string, endDate: string }>("admin/getAdminReservationsByDate",
    async (data) => {
        const response = await axios.get(`${serverURL}/adminReservations?startDate=${data.startDate}&endDate=${data.endDate}`);
        return JSON.parse(response.data.data);
    }
)

const getDate = (value: number) => {
    let date = new Date();
    date.setDate(date.getDate() + value);
    return date;
}

const initialState: AdminState = {
    isLoading: false,
    error: null,
    reservations: [],
    dateInputsValue: {
        startDate: dateToString(getDate(0)),
        endDate: dateToString(getDate(30)),
    }
}

const adminSlice = createSlice({
    name: "AdminSlice",
    initialState,
    reducers: {
        setDateInputsValue: (state, action: PayloadAction<{ key: keyof DateInputsValue, value: string }>) => {
            state.dateInputsValue[action.payload.key] = action.payload.value;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAdminReservationsByDate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAdminReservationsByDate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reservations = action.payload;
            })
            .addCase(getAdminReservationsByDate.rejected, (state, acrion) => {
                state.isLoading = false;
                state.error = acrion.error.code;
            })
    }
});

export const { setDateInputsValue } = adminSlice.actions;
export default adminSlice.reducer;