import {db} from "../../firebase";
import {FirebaseError} from "firebase/app";
import {doc, DocumentData, getDoc, setDoc} from "firebase/firestore";

import {useState} from "react";
interface PostDataProps {
    products: {};
    nameDoc: string;
}

export const useDoc = (collection: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<FirebaseError | null>(null);
    const [data, setData] = useState<DocumentData | undefined>(undefined);
    async function postDoc({products, nameDoc}: PostDataProps) {
        try {
            const collectionName = doc(db, collection, nameDoc);
            setIsLoading(true);
            await setDoc(collectionName, products, {merge: true});
        } catch (err) {
            setError(err as FirebaseError);
        } finally {
            setIsLoading(false);
        }
    }
    async function getDocument(nameDoc: string) {
        try {
            const collectionName = doc(db, collection, nameDoc);
            setIsLoading(true);
            const document = await getDoc(collectionName);
            const data = document.data();

            setData(data);

            return data;
        } catch (err) {
            setError(err as FirebaseError);
        } finally {
            setIsLoading(false);
        }
    }
    return {postDoc, data, getDocument, isLoading, error};
};
