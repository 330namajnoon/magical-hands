import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverURL } from "../config";
import { encode } from "../Utils/createTokenBase"
import emailjs from "@emailjs/browser"

export type ReservationTime = {
    startTime: string;
    endTime: string;
}

export type Reservation = {
    client_id: number;
    date: string;
    startTime: string;
    endTime: string;
}

export type ReservationState = {
    loading: boolean;
    error: any;
    reservatonesBySelectedDate: ReservationTime[] | null;
    lastReservation: ReservationForm | null;
    spriteSession: any;
    currentStatus: string;
    availableHours: string[];
}

export type ReservationForm = {
    name: string;
    lastName1: string;
    lastName2: string;
    email: string;
    phoneNumber: string;
    date: string;
    startTime: string;
    endTime: string;
    serviceId: string;
}

export type EmailData = {
    name: string;
    lastName1: string;
    lastName2: string;
    date: string;
    startTime: string;
    duration: string;
    service: string;
    email: string;
}

export const reservationStatuses = {
    RESERVATION_FORM: "reservation_form",
    SENDED_STRIPE_SESSION: "sended_stripe_session",
    SENDED_RESERVATION_REQUEST: "sended_reservation_request",
    SENDED_EMAIL: "sended_email",
}

const initialState: ReservationState = {
    loading: false,
    error: null,
    reservatonesBySelectedDate: null,
    spriteSession: null,
    lastReservation: null,
    currentStatus: reservationStatuses.RESERVATION_FORM,
    availableHours: [],
}

export const getReservationesByDate = createAsyncThunk<ReservationTime[], string>("reservationes/getReservationesByDate",
    async (date) => {
        const response = await axios.get(`${serverURL}/reservationes/${date}`);
        return JSON.parse(response.data.data);
    }
)

export const getAvailableHoursByDate = createAsyncThunk<string[], string>("reservation/getAvailableHoursByDate",
    async (date) => {
        const response = await axios.get(`${serverURL}/availableHours/${date}`);
        return response.data.data;
    }
);

export const sendReservationRequest = createAsyncThunk<ReservationForm, ReservationForm>("reservation/sendReservationRequest",
    async (reservationForm) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(reservationForm));
        const response = await axios.post(`${serverURL}/reservation`, formData);
        return JSON.parse(response.data.data);
    }
)

export const sendReservationInfoEmail = createAsyncThunk<number, EmailData>("reservation/sendReservationInfoEmail",
    async (emaildata) => {
        const response = await emailjs.send("service_1nbwmi8", "template_l889pzm", {
            from_name: "MAGICAL HANDS 362",
            to_name: `${emaildata.name} ${emaildata.lastName1} ${emaildata.lastName2}`,
            message: {
                date: emaildata.date,
                startTime: emaildata.startTime,
                duration: emaildata.duration,
                service: emaildata.service
            },
            email: emaildata.email,
        }, { publicKey: "H66sPlZP-6b8E53Oc" });
        return response.status
    }
)

export const getStripeSession = createAsyncThunk<any, { email: string, price: number, service: string, description: string, successURL: string, cancelURL: string }>("reservation/getStripeSession",
    async (data) => {
        const response = await axios.get(`${serverURL}/stripeSession/${encode(JSON.stringify({ email: data.email, price: data.price * 100, service: data.service, description: data.description, successURL: data.successURL, cancelURL: data.cancelURL}))}`);
        return response.data.data
    }
)

const reservationSlice = createSlice({
    name: "reservationSlice",
    initialState,
    reducers: {
        setLastReservation: (state, action) => {
            state.lastReservation = action.payload;
        },
        setCurrentStatus: (state, action) => {
            state.currentStatus = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReservationesByDate.pending, (state) => {
                state.loading = true;
            })
            .addCase(getReservationesByDate.fulfilled, (state, action) => {
                state.loading = false;
                state.reservatonesBySelectedDate = action.payload;
            })
            .addCase(getReservationesByDate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.code;
            })

        builder
            .addCase(sendReservationRequest.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendReservationRequest.fulfilled, (state, action) => {
                state.lastReservation = action.payload;
                localStorage.setItem("user", encode(JSON.stringify(action.payload)));
                state.currentStatus = reservationStatuses.SENDED_RESERVATION_REQUEST;
                state.loading = false;

            })
            .addCase(sendReservationRequest.rejected, (state) => {
                state.loading = false;
            })

        builder
            .addCase(sendReservationInfoEmail.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendReservationInfoEmail.fulfilled, (state) => {
                state.loading = false;
                state.currentStatus = reservationStatuses.SENDED_EMAIL;
            })
            .addCase(sendReservationInfoEmail.rejected, (state) => {
                state.loading = false;
            })

        builder
            .addCase(getStripeSession.pending, (state) => {
                state.loading = true;
            })
            .addCase(getStripeSession.fulfilled, (state, action) => {
                state.loading = false;
                state.spriteSession = action.payload;
                state.currentStatus = reservationStatuses.SENDED_STRIPE_SESSION;
            })
            .addCase(getStripeSession.rejected, (state, action) => {
                //state.loading = false;
                state.error = action.error.code;
            })
        builder
            .addCase(getAvailableHoursByDate.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAvailableHoursByDate.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload)
                state.availableHours = action.payload;
            })
            .addCase(getAvailableHoursByDate.rejected, (state, action) => {
                state.error = action.error.code;
                state.loading = false;
            })
    }
})

export const { setLastReservation, setCurrentStatus } = reservationSlice.actions;
export default reservationSlice.reducer;