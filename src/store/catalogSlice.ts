import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "src/store";

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
            href: "alcohol",
            icon: "faMartiniGlassCitrus",
            name: " Alcoholic drinks and products",
        },
        {href: "appliances", icon: "faBlenderPhone", name: " Appliances"},
        {href: "children", icon: "faChildren", name: "Children's products"},
        {href: "clothes", icon: "faShirt", name: "Clothes, shoes and jewelry"},
        {
            href: "cottage-garden",
            icon: "faHouse",
            name: "Cottage, garden and vegetable garden",
        },
        {href: "discounts", icon: "faTag", name: "Cycle discounts up to 40%"},
        {
            href: "business-services",
            icon: "faBarcode",
            name: "Goods for business and services",
        },
        {href: "game", icon: "faGamepad", name: "Goods for gamers"},
        {href: "household", icon: "faChair", name: "Household products"},
        {href: "computers", icon: "faLaptop", name: "Laptops and computers"},
        {href: "pet", icon: "faPaw", name: "Pet supplies"},
        {href: "plumbing", icon: "faToilet", name: "Plumbing and repair"},
        {
            href: "smartphones-electronics",
            icon: "faMobileScreenButton",
            name: "Smartphones, TV and electronics",
        },
        {href: "sports", icon: "faDumbbell", name: "Sports and hobbies"},
        {href: "auto", icon: "faToolbox", name: "Tools and auto products"},
        {href: "beauty", icon: "faNotesMedical", name: "beauty and health"},
        {href: "office", icon: "faPaperclip", name: "office, school, books"},
    ],
};

export const catalogSlice = createSlice({
    name: "catalog",
    initialState,
    reducers: {
        setCatalogItem(state, {payload}) {
            state.catalog = payload.catalog;
        },
    },
});

// Action creators are generated for each case reducer function
export const {setCatalogItem} = catalogSlice.actions;
export const catalogValue = (state: RootState) => state.catalog;
export default catalogSlice.reducer;
