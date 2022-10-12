import {useState} from "react";
import {useRouter} from "next/router";
import {FirebaseError} from "firebase/app";
import {signInWithEmailAndPassword, User} from "firebase/auth";

import {useDispatch} from "react-redux";
import {setActiveUser} from "src/store/userSlice";
import {auth} from "../../../../firebase";

type SignInFunction = (email: string, password: string) => void;

interface UseSignInArgs {
    redirectUrl?: string;
}

export const useSignIn = (args?: UseSignInArgs) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<FirebaseError | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const dispatch = useDispatch();

    const router = useRouter();
    const signIn: SignInFunction = async (email, password) => {
        try {
            setIsLoading(true);
            const {user} = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            setUser(user);
            dispatch(
                setActiveUser({
                    userName: user.displayName,
                    userEmail: user.email,
                }),
            );
            if (user !== null) {
                router.push("/");
            }
        } catch (err) {
            setError(err as FirebaseError);
        } finally {
            setIsLoading(true);
        }
    };

    return {signIn, user, isLoading, error};
};
