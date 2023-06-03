import { db } from "../../firebase";
import { FirebaseError } from "firebase/app";
import {
    collection,
    query,
    getDocs,
    orderBy,
    endAt,
    startAt,
    DocumentData,
    where,
    limit,
} from "firebase/firestore";
import { useEffect, useState } from "react";

type QueryOperator =
    | "<"
    | "<="
    | "=="
    | ">"
    | ">="
    | "!="
    | "array-contains"
    | "array-contains-any"
    | "in"
    | "not-in";

interface QueryFilterProps {
    filterField: string;
    value?: string | string[] | number | number[] | null;
    queryOperator: QueryOperator;
    orderLimit?: number;
}
interface QueryDualFilterProps extends QueryFilterProps {
    secondFilterField: string;
    secondQueryOperator: QueryOperator;
    secondValue: string | string[] | number | number[] | null;
}
interface SearchFilterProps {
    value?: string | string[];
    filterField: string;
}

export const useQueryFilter = <T>(nameCollection: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [queryError, setError] = useState<FirebaseError | null>(null);
    const [data, setData] = useState<DocumentData | Array<T>>();

    async function queryFilter({
        filterField,
        queryOperator,
        value,
        orderLimit = 10,
    }: QueryFilterProps) {
        try {
            const collectionRef = collection(db, nameCollection);
            const filter = where(filterField, queryOperator, value);
            const queryRef = query(collectionRef, filter, limit(orderLimit));
            const querySnapshot = await getDocs(queryRef);
            const resDate: DocumentData = [];
            querySnapshot.forEach((item) => {
                resDate.push(item.data());
            });
            setData(resDate);
        } catch (error) {
            setError(error as FirebaseError);
        } finally {
            setIsLoading(false);
        }
    }

    async function queryDualFilter({
        filterField,
        queryOperator,
        secondQueryOperator,
        value,
        orderLimit = 10,
        secondFilterField,
        secondValue,
    }: QueryDualFilterProps) {
        try {
            const collectionRef = collection(db, nameCollection);
            const filter = where(filterField, queryOperator, value);
            const secondFilter = where(
                secondFilterField,
                secondQueryOperator,
                secondValue
            );
            const queryRef = query(
                collectionRef,
                filter,
                secondFilter,
                limit(orderLimit)
            );
            const querySnapshot = await getDocs(queryRef);
            const resDate: DocumentData = [];
            querySnapshot.forEach((item) => {
                resDate.push(item.data());
            });
            setData(resDate);
        } catch (error) {
            setError(error as FirebaseError);
        } finally {
            setIsLoading(false);
        }
    }
    async function searchFilter({ filterField, value }: SearchFilterProps) {
        try {
            const collectionRef = collection(db, nameCollection);
            const queryRef = query(
                collectionRef,
                orderBy(filterField),
                startAt(value),
                endAt(value + "\uf8ff")
            );

            const querySnapshot = await getDocs(queryRef);

            const resDate: DocumentData = [];
            querySnapshot.forEach((item) => {
                resDate.push(item.data());
            });
            setData(resDate);
        } catch (error) {
            setError(error as FirebaseError);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        searchFilter,
        queryFilter,
        queryDualFilter,
        data,
        isLoading,
        queryError,
        setData,
    };
};
