import { auth } from "../../../../firebase";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { setActiveUser } from "src/store/userSlice";

export const useSignOut = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<FirebaseError | null>(null);

    const dispatch = useDispatch();
    const signOutUser = async () => {
        try {
            setIsLoading(true);
            await signOut(auth);
            dispatch(
                setActiveUser({
                    userName: null,
                    userEmail: null,
                })
            );
        } catch (err) {
            setError(err as FirebaseError);
        } finally {
            setIsLoading(true);
        }
    };
    return { signOutUser, isLoading, error };
};
