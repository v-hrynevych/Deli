import {useEffect, useState} from "react";
interface WindowsSize {
    height: number;
    scrollPosition: number;
}
export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<WindowsSize>({
        height: 100,
        scrollPosition: 0,
    });
    const handleResize = () => {
        setWindowSize({
            height: document.documentElement.scrollHeight,
            scrollPosition:
                document.documentElement.scrollTop +
                window.innerHeight,
        });
    };
    useEffect(() => {
        window.addEventListener("scroll", handleResize);
        handleResize();
        return () => window.removeEventListener("scroll", handleResize);
    }, []);
    return windowSize;
};
