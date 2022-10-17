import {createSlice} from "@reduxjs/toolkit";
import {useCollection} from "src/hooks";
import {RootState} from "src/store";

interface catalogState {
    catalog: Array<{}> | null;
}

const initialState: catalogState = {
    catalog: [
        {
            href: "alcohol",
            icon: "faMartiniGlassCitrus",
            name: " Alcoholic drinks and products",
        },
        {
            icon: "faBlenderPhone",
            name: " Appliances",
        },
        {icon: "faChildren", name: "Children's products"},
        {icon: "faShirt", name: "Clothes, shoes and jewelry"},
        {icon: "faHouse", name: "Cottage, garden and vegetable garden"},
        {icon: "faTag", name: "Cycle discounts up to 40%"},
        {icon: "faBarcode", name: "Goods for business and services"},
        {icon: "faGamepad", name: "Goods for gamers"},
        {icon: "faChair", name: "Household products"},
        {icon: "faLaptop", name: "Laptops and computers"},
        {icon: "faPaw", name: "Pet supplies"},
        {icon: "faToilet", name: "Plumbing and repair"},
        {icon: "faMobileScreenButton", name: "Smartphones, TV and electronics"},
        {icon: "faDumbbell", name: "Sports and hobbies"},
        {icon: "faToolbox", name: "Tools and auto products"},
        {icon: "faNotesMedical", name: "beauty and health"},
        {icon: "faPaperclip", name: "office, school, books"},
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
