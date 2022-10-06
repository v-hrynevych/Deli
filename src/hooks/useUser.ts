import {useState} from "react";
import {onAuthStateChanged, User} from "firebase/auth";

import {auth} from "../../firebase";
import {useDispatch} from "react-redux";
import {setActiveUser} from "src/store/userSlice";

export const useUser = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState<null | User>(null);

    onAuthStateChanged(auth, (user) => {
        if (user !== null) {
            dispatch(
                setActiveUser({
                    userName: user.displayName,
                    userEmail: user.email,
                }),
            );
            setUser(user);
        }
        if (user === null) {
            dispatch(
                setActiveUser({
                    userName: null,
                    userEmail: null,
                }),
            );
            setUser(null);
        }
    });
    return user;
};
