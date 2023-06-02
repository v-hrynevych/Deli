import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";

interface initState {
    catalog: Array<objInitState> | null;
}
interface objInitState {
    href: string;
    icon: string;
    name: string;
}

const initialState: initState = {
    catalog: [
        {
            href: "mcdonny",
            icon: "faM",
            name: "Mc Donny",
        },
        { href: "cfk", icon: "faK", name: "CFK" },
        { href: "sushi", icon: "faS", name: "Sushi" },
        {
            href: "pizza",
            icon: "faPizzaSlice",
            name: "Pizza",
        },
        {
            href: "bobking",
            icon: "faBurger",
            name: "Bob King",
        },
        { href: "etc", icon: "faEllipsisH", name: "Etc" },
    ],
};

export const catalogSlice = createSlice({
    name: "catalog",
    initialState,
    reducers: {
        setCatalogItem(state, { payload }) {
            state.catalog = payload.catalog;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setCatalogItem } = catalogSlice.actions;
export const catalogValue = (state: RootState) => state.catalog;
export default catalogSlice.reducer;
