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
    price: number;
}

export type AdminHour = {
    hour: string;
    isAvailable: boolean;
}

export type DateInputsValue = {
    startDate: string;
    endDate: string;
    calendar: string
}

export type AdminState = {
    isLoading: boolean;
    error: any;
    reservations: AdminReservationData[];
    dateInputsValue: DateInputsValue;
    adminHours: AdminHour[];
}

export const getAdminReservationsByDate = createAsyncThunk<AdminReservationData[], { startDate: string, endDate: string }>("admin/getAdminReservationsByDate",
    async (data) => {
        const response = await axios.get(`${serverURL}/adminReservations?startDate=${data.startDate}&endDate=${data.endDate}`);
        return JSON.parse(response.data.data);
    }
)

export const getAdminHoursByDate = createAsyncThunk<AdminHour[], string>("admin/getAdminHoursByDate",
    async (date) => {
        const response = await axios.get(`${serverURL}/adminHours/${date}`);
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
    adminHours: [],
    dateInputsValue: {
        startDate: dateToString(getDate(0)),
        endDate: dateToString(getDate(30)),
        calendar: dateToString(getDate(0)),
    }
}

const createAdminHours = (renge: number = 15): AdminHour[] => {
    const hours: AdminHour[] = [];
    for (let index = 0; index < 24 ; index++) {
        for (let index1 = 0; index1 < 60; index1++) {
            if (index1 % renge === 0) {
                const hour = index < 10 ? `0${index}` : `${index}`;
                const minutes = index1 < 10 ? `0${index1}` : `${index1}`;
                hours.push({hour: `${hour}:${minutes}`, isAvailable: false});
            }
        }
    }
    return hours;
}

const adminSlice = createSlice({
    name: "AdminSlice",
    initialState,
    reducers: {
        setDateInputsValue: (state, action: PayloadAction<{ key: keyof DateInputsValue, value: string }>) => {
            state.dateInputsValue[action.payload.key] = action.payload.value;
        },
        setIsAvailableHour: (state, action: PayloadAction<number[]>) => {
            action.payload.forEach(n => {
                state.adminHours[n].isAvailable = !state.adminHours[n].isAvailable
            })
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
            builder
            .addCase(getAdminHoursByDate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAdminHoursByDate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.adminHours = action.payload.length > 0 ? action.payload : createAdminHours();
            })
            .addCase(getAdminHoursByDate.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.code;
            })
    }
});

export const { setDateInputsValue, setIsAvailableHour } = adminSlice.actions;
export default adminSlice.reducer;