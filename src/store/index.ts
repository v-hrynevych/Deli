import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import cabinetSlice from "./cabinetSlice";
import catalogSlice from "./catalogSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        cabinet: cabinetSlice,
        catalog: catalogSlice,
    },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
