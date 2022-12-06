import {FirebaseError} from "firebase/app";
import {ref, listAll, uploadBytes, getDownloadURL} from "firebase/storage";
import {storage} from "../../firebase";

import {useState} from "react";

interface PostFileProp {
    listFiles: Array<File | null>;
    user: string | null;
}
interface getFileProp {
    userId: string | null;
    prodItem: string;
}
export const useStorage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [fileError, setError] = useState<FirebaseError | null>(null);
    const [fileUrlArr, setFileUrlArr] = useState<string[]>([]);

    async function postFiles({listFiles, user}: PostFileProp) {
        try {
            setIsLoading(true);
            await Promise.all(
                listFiles.map(async (el) => {
                    const imgRef = ref(
                        storage,
                        `user/${user}/photo/${el!.name}`,
                    );
                    await uploadBytes(imgRef, el!);
                    const url = await getDownloadURL(imgRef);

                    fileUrlArr.push(url);
                }),
            );
        } catch (err) {
            setError(err as FirebaseError);
        } finally {
            setIsLoading(false);
        }
    }
    async function getFiles({userId, prodItem}: getFileProp) {
        try {
            const listRef = ref(storage, `user/${userId}/products/${prodItem}`);
            const res = await listAll(listRef);
        } catch (error) {
        } finally {
        }
    }
    return {postFiles, getFiles, fileUrlArr, isLoading, fileError};
};
