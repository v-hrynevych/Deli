import {FormEventHandler, ReactElement} from "react";
import Link from "next/link";

import {Box, Button} from "../../../../component";

import styles from "./FormControl.module.css";

interface FormControlProps {
    onSubmit: () => void;
    children: ReactElement;
    title: string;
    subtitle: string;
    linkHref: string;
    linkTitle: string;
}

export const FormControl = ({
    onSubmit,
    title,
    subtitle,
    linkHref,
    linkTitle,
    children,
}: FormControlProps) => {
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <div className={styles.wrapper}>
            <Box height="auto" width="30rem">
                <form onSubmit={handleSubmit}>
                    <h2>{title}</h2>
                    <p className={styles.subtitle}>{subtitle}</p>
                    {children}
                    <div className={styles.flex}>
                        <Button
                            type="submit"
                            variant="primary"
                            onSubmit={handleSubmit}
                        >
                            Submit
                        </Button>
                        <Link href={linkHref}>
                            {linkTitle}
                        </Link>
                    </div>
                </form>
            </Box>
        </div>
    );
};
