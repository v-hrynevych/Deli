import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useCollection} from "src/hooks";

import {useStorage} from "src/hooks/useStorage";
import {userValue} from "src/store/userSlice";

export const Products = () => {
    const {userId} = useSelector(userValue);
    const {data} = useCollection("user", userId,);
    const {getFiles, files} = useStorage();

    // getFiles(userId,)

    return (
        <>
            {data &&
                data.map((item) => {
                    
                    
                    return <div></div>;
                })}
        </>
    );
};
