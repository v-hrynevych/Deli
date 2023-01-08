import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import cabinetSlice from "./cabinetSlice";
import catalogSlice from "./catalogSlice";
import cartSlice from "./cartSlice";
import wishListSlice from "./wishListSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        cabinet: cabinetSlice,
        catalog: catalogSlice,
        cart: cartSlice,
        wishList: wishListSlice,
    },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
