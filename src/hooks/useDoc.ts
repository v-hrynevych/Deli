import { db } from "../../firebase";
import { FirebaseError } from "firebase/app";
import { doc, setDoc } from "firebase/firestore";

import { useState } from "react";
interface PostDataProps {
    products: {};
}

export const useDoc = (collection: string, nameDoc: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<FirebaseError | null>(null);

    const collectionName = doc(db, collection, nameDoc);
    async function postDoc(product: PostDataProps) {
        try {
            setIsLoading(true);
            await setDoc(collectionName, product, { merge: true });
        } catch (err) {
            setError(err as FirebaseError);
        } finally {
            setIsLoading(false);
        }
    }
    return { postDoc, isLoading, error };
};
