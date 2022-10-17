import {FirebaseError} from "firebase/app";
import {ref, listAll, uploadBytes} from "firebase/storage";
import {storage} from "../../firebase";

import {useState} from "react";

interface PostFileProp {
    listFiles: Array<File | null>;
    user: string;
    nameFolder: string;
}
interface getFileProp {
    userId: string | null;
    prodItem: string
}
export const useStorage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<FirebaseError | null>(null);
    const [files, setFiles] = useState<string[]>([]);
    async function postFiles({listFiles, user, nameFolder}: PostFileProp) {
        try {
            setIsLoading(true);
            await Promise.all(
                listFiles.map((el) => {
                    const imgRef = ref(
                        storage,
                        `user/${user}/${nameFolder}/${el!.name}`,
                    );
                    return uploadBytes(imgRef, el!);
                }),
            );
        } catch (err) {
            setError(err as FirebaseError);
        } finally {
            setIsLoading(false);
        }
    }
    async function getFiles({userId,prodItem}: getFileProp) {
        try {
            const listRef = ref(storage, `user/${userId}/products/${prodItem}`);
            const res = await listAll(listRef);
            console.log(res);
        } catch (error) {
        } finally {
        }
    }
    return {postFiles, getFiles, files, isLoading, error};
};
