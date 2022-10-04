import { FirebaseError } from "firebase/app";
import { DocumentData } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../firebase";

export const useCollection = (name: string) => {
    const [data, setData] = useState<{} | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<FirebaseError | null>(null);

    const collectionName = collection(db, name);

    async function getData() {
        try {
            setIsLoading(true);
            const res = await getDocs(collectionName);
            res.forEach((item) => {
                setData((prevState) => ({
                    ...prevState,
                    [item.id]: [item.data()],
                }));
            });
        } catch (err) {
            setError(err as FirebaseError);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getData();
    }, []);
    return { data, isLoading, error };
};
