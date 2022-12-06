import {useEffect, useState} from "react";
import {onAuthStateChanged, User} from "firebase/auth";

import {auth} from "../../firebase";
import {useDispatch, useSelector} from "react-redux";
import {setActiveUser, userValue} from "src/store/userSlice";
import {FirebaseError} from "firebase/app";

export const useUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<FirebaseError | null>(null);

    const dispatch = useDispatch();
    const user = useSelector(userValue);
    async function authUser() {
        try {
            setIsLoading(true);
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    dispatch(
                        setActiveUser({
                            userName: user.displayName,
                            userEmail: user.email,
                            userId: user.uid,
                        }),
                    );
                }
            });
        } catch (err) {
            setError(err as FirebaseError);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        authUser();
    }, []);

    return {user, isLoading, error};
};
