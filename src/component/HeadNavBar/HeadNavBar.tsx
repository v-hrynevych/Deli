import styles from "./HeadNavBar.module.scss";
import {HTMLAttributes} from "react"
interface HeadNavBarProps extends HTMLAttributes<HTMLDivElement> {

}

export const HeadNavBar = ({
  className,
  ...rest
}: HeadNavBarProps) => {

  return (
    <div {...rest} className={styles.container}>
      <nav>
        <ul>
          <li className={styles.logo}>
            <a href="">Ecom</a>
          </li>
          <li className={styles.catalog}>

          </li>
          <li className={styles.searchForm}>

          </li>
          <li>

          </li>
          <li>
            
          </li>
        </ul>
      </nav>
    </div>
  );
};
