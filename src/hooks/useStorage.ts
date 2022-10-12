import { FirebaseError } from "firebase/app";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";

import { useState } from "react";

export const useStorage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<FirebaseError | null>(null);

    async function postFiles(listFiles: [], user: string, nameFolder: string) {
        try {
            setIsLoading(true);
            await Promise.all(
                listFiles.map((el: any) => {
                    const imgRef = ref(
                        storage,
                        `user/${user}/${nameFolder}/${el.name}`
                    );
                    return uploadBytes(imgRef, el);
                })
            );
        } catch (err) {
            setError(err as FirebaseError);
        } finally {
            setIsLoading(false);
        }
    }
    return { postFiles, isLoading, error };
};
