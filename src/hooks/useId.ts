import {FirebaseError} from "firebase/app";
import {doc, DocumentData, getDoc, updateDoc} from "firebase/firestore";
import {resolve} from "path";
import {useEffect, useState} from "react";
import {db} from "../../firebase";

export const useId = (nameId: string) => {
    const [id, setId] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<FirebaseError | null>(null);

    async function getId() {
        try {
            setIsLoading(true);
            const docRef = doc(db, "id", nameId);
            const docSnap = await getDoc(docRef);
            const docData = docSnap.data();
            setId(parseInt(docData?.id));
        } catch (err) {
            setError(err as FirebaseError);
        } finally {
            setIsLoading(false);
        }
    }
    async function updateId() {
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
    useEffect(() => {
        getId();
    }, []);

    return {getId, updateId, id, isLoading, error};
};
