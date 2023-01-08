import {FirebaseError} from "firebase/app";
import {collection, DocumentData, getDocs} from "firebase/firestore";
import {useEffect, useState} from "react";
import {db} from "../../firebase";

type Data = DocumentData | null;
export const useCollection = () => {
    const [collectionData, setCollectionData] = useState<Data>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const [error, setError] = useState<FirebaseError | null>(null);

    async function getData(path: string) {
        try {
            setIsLoading(true);
            const collectionName = collection(db, path);
            const res = await getDocs(collectionName);
            if (res.empty) return null;
            const resDate: Data = [];
            res.forEach((item) => {
                resDate.push(item.data());
            });
            setCollectionData(resDate);
            setIsSuccess(true);
        } catch (err) {
            setError(err as FirebaseError);
        } finally {
            setIsLoading(false);
        }
    }
    return {getData, isSuccess, collectionData, isLoading, error};
};
