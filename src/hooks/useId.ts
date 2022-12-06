import {FirebaseError} from "firebase/app";
import {doc, DocumentData, getDoc, updateDoc} from "firebase/firestore";
import {useEffect, useState} from "react";
import {db} from "../../firebase";

export const useId = () => {
    const [id, setId] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<FirebaseError | null>(null);

    async function getId(nameId: string) {
        try {
            setIsLoading(true);
            const docRef = doc(db, "id", nameId);
            const docSnap = await getDoc(docRef);
            const docData = docSnap.data();
            setId(docData?.id);
        } catch (err) {
            setError(err as FirebaseError);
        } finally {
            setIsLoading(false);
        }
    }
    async function updateId(nameId: string) {
        try {
            setIsLoading(true);
            const docRef = doc(db, "id", nameId);
            const docSnap = await getDoc(docRef);
            const docData = docSnap.data();
            await updateDoc(docRef, {id: docData?.id + 1});
        } catch (err) {
            setError(err as FirebaseError);
        } finally {
            setIsLoading(false);
        }
    }
    return {getId,updateId, id, isLoading, error};
};
