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
    isAvailable: boolean | "R";
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
    adminHours: {
        date: string;
        hours: AdminHour[];
    };
    adminPromission: boolean;
}

export const getAdminReservationsByDate = createAsyncThunk<AdminReservationData[], { startDate: string, endDate: string }>("admin/getAdminReservationsByDate",
    async (data) => {
        const response = await axios.get(`${serverURL}/adminReservations?startDate=${data.startDate}&endDate=${data.endDate}`);
        return JSON.parse(response.data.data);
    }
)

export const getAdminHoursByDate = createAsyncThunk<{date: string, hours: AdminHour[]}, string>("admin/getAdminHoursByDate",
    async (date) => {
        const response = await axios.get(`${serverURL}/adminHours/${date}`);
        return JSON.parse(response.data.data);
    }
)

export const saveAdminHoursByDate = createAsyncThunk<{date: string, hours: AdminHour[]}, {date: string, hours: AdminHour[]}>("admin/saveAdminHoursByDate",
    async (hours) => {
        const formData = new FormData();
        console.log({date: hours.date, hours: hours.hours.filter((h => h.isAvailable))})
        formData.append("hours", JSON.stringify({date: hours.date, hours: hours.hours.filter((h => h.isAvailable))}));
        const response = await axios.post(`${serverURL}/adminHours`, formData);
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
    adminHours: {
        date: dateToString(getDate(0)),
        hours: [],
    },
    dateInputsValue: {
        startDate: dateToString(getDate(0)),
        endDate: dateToString(getDate(30)),
        calendar: dateToString(getDate(0)),
    },
    adminPromission: false
}

const createAdminHours = (renge: number = 15, availabledHours: {date: string, hours: AdminHour[]}): {date: string, hours: AdminHour[]} => {
    const hours: AdminHour[] = [];
    const date: string = availabledHours.date;
    for (let index = 0; index < 24; index++) {
        for (let index1 = 0; index1 < 60; index1++) {
            if (index1 % renge === 0) {
                const hour = index < 10 ? `0${index}` : `${index}`;
                const minutes = index1 < 10 ? `0${index1}` : `${index1}`;
                const hourToString = `${hour}:${minutes}`;
                const hourFinded = availabledHours.hours.find(ah => ah.hour === hourToString);
                hours.push({ hour: hourToString, isAvailable: hourFinded ? hourFinded.isAvailable : false});
            }
        }
    }
    return {date, hours};
}

const adminSlice = createSlice({
    name: "AdminSlice",
    initialState,
    reducers: {
        setDateInputsValue: (state, action: PayloadAction<{ key: keyof DateInputsValue, value: string }>) => {
            state.dateInputsValue[action.payload.key] = action.payload.value;
        },
        setIsAvailableHour: (state, action: PayloadAction<{ hours: number[], isAvailable: boolean | null }>) => {
            action.payload.hours.forEach(n => {
                if (action.payload.isAvailable === null)
                    state.adminHours.hours[n].isAvailable = !state.adminHours.hours[n].isAvailable;
                else
                    state.adminHours.hours[n].isAvailable = action.payload.isAvailable;
            })
        },
        setAdminPromission: (state, action: PayloadAction<boolean>) => {
            state.adminPromission = action.payload;
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
                state.adminHours = createAdminHours(15, action.payload);
            })
            .addCase(getAdminHoursByDate.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.code;
            })
        builder
            .addCase(saveAdminHoursByDate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveAdminHoursByDate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.adminHours = createAdminHours(15, action.payload);
            })
            .addCase(saveAdminHoursByDate.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.code;
            })
    }
});

export const { setDateInputsValue, setIsAvailableHour, setAdminPromission } = adminSlice.actions;
export default adminSlice.reducer;