import {db} from "../../firebase";
import {FirebaseError} from "firebase/app";
import {
    collection,
    query,
    where,
    getDocs,
    DocumentData,
    limit,
} from "firebase/firestore";
import {useState} from "react";

export const useQueryDocLimit = (nameCollection: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [queryError, setError] = useState<FirebaseError | null>(null);
    const [data, setData] = useState<DocumentData>();

    async function queryLimit(queryLimit: number = 50) {
        try {
            const collectionRef = collection(db, nameCollection);
            const queryRef = query(collectionRef, limit(queryLimit));
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

    return {queryLimit, data, isLoading, queryError};
};
