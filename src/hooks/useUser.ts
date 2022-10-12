import {useState} from "react";
import {onAuthStateChanged, User} from "firebase/auth";

import {auth} from "../../firebase";
import {useDispatch, useSelector} from "react-redux";
import {setActiveUser, userValue} from "src/store/userSlice";

export const useUser = () => {
    const dispatch = useDispatch();
    const user = useSelector(userValue);
    onAuthStateChanged(auth, (user) => {
        if (user !== null) {
            dispatch(
                setActiveUser({
                    userName: user.displayName,
                    userEmail: user.email,
                }),
            );
        }
        if (user === null) {
            dispatch(
                setActiveUser({
                    userName: null,
                    userEmail: null,
                }),
            );
        }
    });
    return user;
};
