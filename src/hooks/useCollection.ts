import {FirebaseError} from "firebase/app";
import {collection, getDocs} from "firebase/firestore";
import {useState, useLayoutEffect} from "react";
import {db} from "../../firebase";

type Data = Array<{}> | null;
export const useCollection = (name: string, userId: string | null) => {
    const [data, setData] = useState<Data>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<FirebaseError | null>(null);

    const collectionName = collection(db, name);
    async function getData() {
        try {
            setIsLoading(true);
            const res = await getDocs(collectionName);
            const resDate: Data = [];
            res.forEach((item) => {
                if (item.id === userId) {
                    resDate.push(item.data());
                }
            });
            setData(resDate);
        } catch (err) {
            setError(err as FirebaseError);
        } finally {
            setIsLoading(false);
        }
    }
    useLayoutEffect(() => {
        getData();
    }, []);
    return {data, isLoading, error};
};
