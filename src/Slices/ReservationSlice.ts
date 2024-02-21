import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverURL } from "../config";
import emailjs from "@emailjs/browser";

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
    lastReservation: Reservation | null;
}

export type ReservationForm = {
    name: string;
    lastName1: string;
    lastName2: string;
    email: string;
    phoneNumber: string;
    date: string;
}

const initialState: ReservationState = {
    loading: false,
    error: null,
    reservatonesBySelectedDate: null,
    
    lastReservation: null,
}

export const getReservationesByDate = createAsyncThunk<ReservationTime[], string>("reservationes/getReservationesByDate",
    async (date) => {
        const response = await axios.get(`${serverURL}/reservationes/${date}`);
        return JSON.parse(response.data.data);
    }
)

export const sendReservationRequest = createAsyncThunk<Reservation, ReservationForm>("reservation/sendReservationRequest",
    async (reservationForm) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(reservationForm));
        const response = await axios.post(`${serverURL}/reservation`, formData);
        return JSON.parse(response.data.data);
    }
)

const reservationSlice = createSlice({
    name: "reservationSlice",
    initialState,
    reducers: {

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
                const {name, lastName1, lastName2, email, startTime, date} = action.payload as any;
                state.loading = false;
                state.lastReservation = action.payload;
                if (state.lastReservation) {
                    emailjs.send("service_1nbwmi8", "template_l889pzm", {
                        from_name: "Magical Hands",
                        to_name: `${name} ${lastName1} ${lastName2}`,
                        message: `Tu cita se ha realizado correctamente para el dia ${date} a las ${startTime}`,
                        reply_to: email
                    }, {publicKey: "H66sPlZP-6b8E53Oc"}).then(res => {
                        console.log("sended");
                    }).catch(error => {
                        console.log(error);
                    })
                }

            })
            .addCase(sendReservationRequest.rejected, (state, action) => {
                state.loading = false;
                console.log(action.error.code);
            })
    }
})

export default reservationSlice.reducer;