import {db} from "../../firebase";
import {FirebaseError} from "firebase/app";
import {
    collection,
    query,
    getDocs,
    DocumentData,
    limit,
    startAfter,
    onSnapshot,
    QuerySnapshot,
} from "firebase/firestore";
import {useEffect, useState} from "react";

export const useQueryDocLimit = <T>(nameCollection: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [queryError, setError] = useState<FirebaseError | null>(null);
    const [data, setData] = useState<Array<T>>([]);
    const [lastQueryRef, setQueryRef] = useState<DocumentData>();
    const [isEmpty, setIsEmpty] = useState(false);
    async function queryLimit(queryLimit: number = 50, prevRef?: DocumentData) {
        try {
            const collectionRef = collection(db, nameCollection);
            const queryRef = prevRef
                ? query(collectionRef, startAfter(prevRef), limit(queryLimit))
                : query(collectionRef, limit(queryLimit));

            const querySnapshot = await getDocs(queryRef);
            onSnapshot(queryRef, (snapshot: QuerySnapshot<T>) => {
                return setData(
                    snapshot.docs.map((doc) => {
                        return {
                            ...doc.data(),
                        };
                    }),
                );
            });

            setIsEmpty(querySnapshot.empty);
            setQueryRef(querySnapshot.docs[querySnapshot.docs.length - 1]);
        } catch (error) {
            setError(error as FirebaseError);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        queryLimit();
    }, []);
    return {queryLimit, isEmpty, lastQueryRef, data, isLoading, queryError};
};
