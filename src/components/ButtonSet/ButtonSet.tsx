import React from "react";
import styles from "./ButtonSet.module.scss";

const ButtonSet = (props: { style?: React.CSSProperties, children: React.ReactNode }) => {
    return (
        <div className={styles["button-set"]} style={props.style}>
            {props.children}
        </div>
    );
};

export default ButtonSet;
