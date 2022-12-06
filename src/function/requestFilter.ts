import {map} from "@firebase/util";
import {where} from "firebase/firestore";

export const requestFilter = (
    filterField: string,
    value: number[] | string[] | number | string,
) => {
    if (Array.isArray(value)) {
        return arrFilter(filterField, value);
    } else {
        return whereConstructor(filterField, value);
    }
};

const arrFilter = (filterField: string, value: string[] | number[]) => {
    return value.map((el) => whereConstructor(filterField, el));
};

const whereConstructor = (filterField: string, value: string | number) => {
    return where(filterField, "==", value);
};
