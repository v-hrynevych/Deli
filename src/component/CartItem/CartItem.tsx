import styles from "./CartItem.module.scss";
import Image from "next/image";
import CartImg from "../../default/svg/modal-cart-dummy.svg";

export const CartItem = () => {
    return (
        <div className={styles.cart}>
            <Image width={240} height={240} src={CartImg} />
            <h4>The basket is empty</h4>
            <p>But it's never too late to fix it :)</p>
        </div>
    );
};
