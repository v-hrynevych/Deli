import {ButtonIcon} from "src/component/ButtonIcon";
import {useLocalStorage} from "src/hooks";
interface WishIconProps {
    id: number;
}
export const WishIcon = ({id}: WishIconProps) => {
    const [wish, setWish] = useLocalStorage<Array<number>>("wish", []);
    const addWish = () => {
        if (wish.includes(id)) return wish;
        setWish([...wish, id]);
    };

    const removeWish = () => {
        const index = wish.indexOf(id);
        if (index > -1) {
            setWish(
                wish.filter((item) => {
                    return item !== id;
                }),
            );
        }
    };
    return (
        <>
            {wish.includes(id) ? (
                <ButtonIcon
                    title="Remove from the wish list"
                    onClick={removeWish}
                    icon="faHeart"
                    color="#FBC75C"
                />
            ) : (
                <ButtonIcon
                    title="Add to wish list "
                    onClick={addWish}
                    icon="faHeart"
                    color="#dfdede"
                />
            )}
        </>
    );
};
