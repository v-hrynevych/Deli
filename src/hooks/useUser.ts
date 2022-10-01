import {useState} from "react";
import {onAuthStateChanged, User} from "firebase/auth";

import {auth} from "../../firebase";
import {useDispatch} from "react-redux";
import {setActiveUser} from "src/store/userSlice";

interface userProp {
    displayName: User | string;
    email: User | string;
}
export const useUser = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState();
    onAuthStateChanged(auth, (user) => {
        dispatch(
            setActiveUser({
                userName: user!.displayName,
                userEmail: user!.email,
            }),
        );
        setUser;
    });

    return user;
};
