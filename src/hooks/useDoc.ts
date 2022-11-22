import {db} from "../../firebase";
import {FirebaseError} from "firebase/app";
import {doc, setDoc} from "firebase/firestore";

import {useState} from "react";
interface PostDataProps {
    products: {};
    nameDoc: string;
}

export const useDoc = (collection: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<FirebaseError | null>(null);

    async function postDoc({products, nameDoc}: PostDataProps) {
        const collectionName = doc(db, collection, nameDoc);
        try {
            setIsLoading(true);
            await setDoc(collectionName, products, {merge: true});
        } catch (err) {
            setError(err as FirebaseError);
        } finally {
            setIsLoading(false);
        }
    }
    return {postDoc, isLoading, error};
};
