import {db} from "../../firebase";
import {FirebaseError} from "firebase/app";
import {doc, DocumentData, getDoc, setDoc} from "firebase/firestore";

import {useState} from "react";
interface PostDataProps {
    documentItem: {};
    path: string;
    subCollection?: string;
}

export const useDoc = (collection: string) => {
    const [isLoadingDoc, setIsLoading] = useState(false);
    const [isSendDocumentSuccess, setIsSendDocumentSuccess] = useState(false);
    const [docError, setError] = useState<FirebaseError | null>(null);
    const [dataDoc, setData] = useState<DocumentData | undefined>(undefined);

    async function postDoc({documentItem, path, subCollection}: PostDataProps) {
        try {
            setIsLoading(true);
            const collectionName = subCollection
                ? doc(db, collection, path, subCollection)
                : doc(db, collection, path);
            await setDoc(collectionName, documentItem, {merge: true});
            setIsSendDocumentSuccess(true);
        } catch (err) {
            setError(err as FirebaseError);
        } finally {
            setIsLoading(false);
        }
    }
    async function getDocument(nameDoc: string) {
        try {
            setIsLoading(true);
            const collectionName = doc(db, collection, nameDoc);
            const document = await getDoc(collectionName);
            const data = document.data();
            setData(data);
        } catch (err) {
            setError(err as FirebaseError);
        } finally {
            setIsLoading(false);
        }
    }
    return {
        postDoc,
        dataDoc,
        getDocument,
        isSendDocumentSuccess,
        isLoadingDoc,
        docError,
    };
};
