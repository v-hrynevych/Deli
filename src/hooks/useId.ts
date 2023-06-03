import { FirebaseError } from "firebase/app";
import {
    doc,
    DocumentData,
    setDoc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import { resolve } from "path";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

export const useId = (nameId: string) => {
    const [id, setId] = useState<number | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<FirebaseError | null>(null);

    async function getId() {
        try {
            setIsLoading(true);
            const docRef = doc(db, "id", nameId);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                await setDoc(docRef, { id: 1 });
                const docSnap = await getDoc(docRef);
                const docData = docSnap.data();
                setId(docData?.id);
                return;
            }
            const docData = docSnap.data();
            setId(docData?.id);
        } catch (err) {
            setError(err as FirebaseError);
        } finally {
            setIsLoading(false);
        }
    }
    async function createId() {
        try {
            setIsLoading(true);
            const docRef = doc(db, "id", nameId);
            await setDoc(docRef, { id: 1 });
            setId(1);
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
            await updateDoc(docRef, { id: docData?.id + 1 })
                .then(() => {
                    if (id) {
                        setId(id + 1);
                    }
                })
                .catch((error) => {
                    setError(error);
                });
        } catch (err) {
            setError(err as FirebaseError);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getId();
    }, []);

    return { getId, updateId, id, isLoading, error, createId };
};
