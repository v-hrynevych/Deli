import {db} from "../../firebase";
import {FirebaseError} from "firebase/app";
import {doc, setDoc} from "firebase/firestore";

import {useState} from "react";
interface PostDataProps {
    data: {};
}

export const useDoc = (collection: string, nameDoc: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<FirebaseError | null>(null);

    const collectionName = doc(db, collection, nameDoc);
    async function PostDoc({data}: PostDataProps) {
        try {
            setIsLoading(true);
            await setDoc(collectionName, data);
        } catch (err) {
            setError(err as FirebaseError);
        } finally {
            setIsLoading(false);
        }
    }
    return {PostDoc, isLoading, error};
};
