import { CSSProperties, HTMLAttributes } from "react";

import styles from "./Box.module.css";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
}

export const Box = ({
  width = "100%",
  height = "100%",
  className,
  children,
  ...rest
}: BoxProps) => {
  const boxCss = {
    "--jobie-box-width": width,
    "--jobie-box-height": height,
  } as CSSProperties;

  return (
    <div {...rest} className={styles.box} style={boxCss}>
      {children}
    </div>
  );
};
