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
    price: string;
    time: string;
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
    translations: {
        lng: string;
        resources: any | null;
    };
}

const initialState: AppState = {
    error: null,
    isLoading: false,
    categories: [],
    services: [],
    servicesSearched: [],
    selectedService: null,
    translations: {
        lng: "es",
        resources: null
    },
}

export const getServices = createAsyncThunk<Service[]>(
    "app/getServices",
    async () => {
        const response = await axios.get(`${serverURL}/services`);
        return JSON.parse(response.data.data);
    }
);

export const updateServiceById = createAsyncThunk<Service[], {status: "UPDATE" | "DELETE", service: Service, file?: File}>("app/updateServiceById",
    async (props) => {
        const dataForm = new FormData();
        dataForm.append("status", props.status);
        dataForm.append("service",JSON.stringify(props.service));
        props.file && dataForm.append("file", props.file);
        const response = await axios.post(`${serverURL}/services`, dataForm);
        return response.data.data
    }
)

export const updateCategories = createAsyncThunk<Category[],{status: "CREATE" | "DELETE", value: string | null}>("app/updateCategories",
    async (props) => {
        const formData = new FormData();
        formData.append("status", props.status);
        formData.append("value", props.value ? props.value : "");
        const response = await axios.post(`${serverURL}/update_categories`, formData);
        return response.data.data
    }
)

export const createNewService = createAsyncThunk<Service[]>("app/createNewService",
    async () => {
        const response = await axios.get(`${serverURL}/create_new_service`);
        return response.data.data
    }
)

export const getCategories = createAsyncThunk<Category[]>(
    "app/getCategories",
    async () => {
        const response = await axios.get(`${serverURL}/categories`);
        return JSON.parse(response.data.data);
    }
)

export const getTranslations = createAsyncThunk<any>("app/getTranslations",
    async () => {
        const response = await axios.get(`${serverURL}/translations`);
        return response.data.data;
    }
)


const appSlice = createSlice({
    name: "AppSlice",
    initialState,
    reducers: {
        searchForServices: (state, action: PayloadAction<string | null>) => {
            const fuse = new Fuse(
                state.services,
                {
                    keys: ["category", "title", "description"]
                }
            );
            if (action.payload) {
                const result = fuse.search<Service>(action.payload);
                state.servicesSearched = result.map(res => res.item);
            } else {
                state.servicesSearched = state.services;
            }
        },
        setSelectedService: (state, action: PayloadAction<string | null | undefined>) => {
            state.selectedService = state.services.find(s => s.id === action.payload);
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
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
        builder
            .addCase(getTranslations.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTranslations.fulfilled, (state, acion) => {
                state.isLoading = false;
                state.translations.resources = acion.payload;
            })
            .addCase(getTranslations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.code;
            })
        builder
            .addCase(updateServiceById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateServiceById.fulfilled, (state, acion) => {
                state.isLoading = false;
                state.services = acion.payload;
                state.servicesSearched = acion.payload;
            })
            .addCase(updateServiceById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.code;
            })
        builder
            .addCase(createNewService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNewService.fulfilled, (state, acion) => {
                state.isLoading = false;
                state.services = acion.payload;
            })
            .addCase(createNewService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.code;
            })
        builder
            .addCase(updateCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCategories.fulfilled, (state, acion) => {
                state.isLoading = false;
                state.categories = acion.payload;
            })
            .addCase(updateCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.code;
            })
    })
});

export const { searchForServices, setSelectedService, setLoading } = appSlice.actions;

export default appSlice.reducer;