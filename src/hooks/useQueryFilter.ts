import {db} from "../../firebase";
import {FirebaseError} from "firebase/app";
import {
    collection,
    query,
    getDocs,
    DocumentData,
    where,
} from "firebase/firestore";
import {useState} from "react";

interface PostDataProps {
    filterField: string;
    value?: string | string[] | number | number[] | null;
}
export const useQueryFilter = (nameCollection: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [queryError, setError] = useState<FirebaseError | null>(null);
    const [data, setData] = useState<DocumentData>();

    async function queryFilter({filterField, value}: PostDataProps) {
        try {
            const collectionRef = collection(db, nameCollection);
            const filter = Array.isArray(value)
                ? where(filterField, "in", value)
                : where(filterField, "==", value);
            const queryRef = query(collectionRef, filter);
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

    return {queryFilter, data, isLoading, queryError};
};
