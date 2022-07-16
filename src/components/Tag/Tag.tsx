import React, { HTMLAttributes } from "react";
import styles from "./Tag.module.scss";

interface TagProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode,
}

const Tag = (props: TagProps) => {
    return (
        <div className={styles.tag} {...props}>
            {props.children}
        </div>
    );
};

export default Tag;
