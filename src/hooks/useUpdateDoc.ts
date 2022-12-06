import {FirebaseError} from "firebase/app";
import {db} from "../../firebase";
import {doc, updateDoc} from "firebase/firestore";
import {useState} from "react";
interface updateDocProps {
    updateObj: {};
    nameDoc: string;
}
export const useUpdateDoc = (collection: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [updateError, setError] = useState<FirebaseError | null>(null);

    async function updateDocument({updateObj, nameDoc}: updateDocProps) {
        try {
            setIsLoading(true);
            const docRef = doc(db, collection, nameDoc);
            await updateDoc(docRef, updateObj);
        } catch (err) {
            setError(err as FirebaseError);
        } finally {
            setIsLoading(false);
        }
    }
    return {updateDocument, isLoading, updateError};
};
