import {useState} from "react";
import {useRouter} from "next/router";
import {
    createUserWithEmailAndPassword,
    AuthError,
    UserCredential,
} from "firebase/auth";

import {auth} from "../../../../firebase";

interface UseSignUpArgs {
    redirectUrl?: string;
}

export const useSignUp = (args?: UseSignUpArgs) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<AuthError | null>(null);
    const [userCredential, setNewUser] = useState<UserCredential>();
    const router = useRouter();

    const signUp = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            await createUserWithEmailAndPassword(auth, email, password).then(
                (userCredential) => {
                    setNewUser(userCredential);

                    if (args?.redirectUrl !== undefined && error === null) {
                        router.push(args.redirectUrl);
                    }
                },
            );
        } catch (err) {
            setError(err as AuthError);
        } finally {
            setIsLoading(false);
        }
    };

    return {signUp, userCredential, isLoading, error};
};
