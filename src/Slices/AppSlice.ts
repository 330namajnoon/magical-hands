import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverURL } from "../config";
import Fuse from "fuse.js";

export type Service = {
    id: string;
    name: string;
    title: string;
    imageURL: string;
    description: string;
    price: number;
    category: string[];
}

export type Category = {
    id: string;
    name: string;
}

export type AppState = {
    error: any;
    isLoading: boolean;
    categories: Category[];
    services: Service[];
    servicesSearched: Service[];
    selectedService: Service | undefined | null;
}

const initialState: AppState = {
    error: null,
    isLoading: false,
    categories: [],
    services: [],
    servicesSearched: [],
    selectedService: null,
}

export const getServices = createAsyncThunk<Service[]>(
    "app/getServices",
    async () => {
        const response = await axios.get(`${serverURL}/services`);
        return JSON.parse(response.data.data);
    }
);

export const getCategories = createAsyncThunk<Category[]>(
    "app/getCategories",
    async () => {
        const response = await axios.get(`${serverURL}/categories`);
        return JSON.parse(response.data.data);
    }
)


const appSlice = createSlice({
    name: "AppSlice",
    initialState,
    reducers: {
        searchForServices: (state, action: PayloadAction<string>) => {
            const fuse = new Fuse(
                state.services,
                {
                    keys: ["category", "title", "description"]
                }
            );
            const result = fuse.search<Service>(action.payload);
            state.servicesSearched = result.map(res => res.item);
        },
        setSelectedService: (state, action: PayloadAction<string | null | undefined>) => {
            state.selectedService = state.services.find(s => s.id === action.payload);
        },
    },
    extraReducers: (builder => {
        // Get Services
        builder
            .addCase(getServices.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getServices.fulfilled, (state, action) => {
                state.services = action.payload;
                state.isLoading = false;
            })
            .addCase(getServices.rejected, (state, action) => {
                state.error = action.error.code;
                state.isLoading = false;
            });
        // Get Categories
        builder
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategories.fulfilled, (state, acion) => {
                state.isLoading = false;
                state.categories = acion.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.code;
            })
    })
});

export const { searchForServices, setSelectedService } = appSlice.actions;

export default appSlice.reducer;