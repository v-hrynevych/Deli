import {useState} from "react";
import {doc, deleteDoc} from "firebase/firestore";
import {FirebaseError} from "firebase/app";
import {db} from "../../firebase";

export const useDeleteDoc = () => {
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [error, setError] = useState<FirebaseError | null>(null);

    async function deleteDocument(path: string) {
        try {
            setIsDeleteLoading(true);
            await deleteDoc(doc(db, path));
        } catch (err) {
            setError(err as FirebaseError);
        } finally {
            setIsDeleteLoading(false);
        }
    }

    return {deleteDocument, isDeleteLoading, error};
};
