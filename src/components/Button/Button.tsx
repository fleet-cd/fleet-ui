import React, { ButtonHTMLAttributes } from "react";
import { getClassName } from "../../utils/classnames";
import { Intent, Variant } from "../types/types";
import styles from "./Button.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { 
    variant?: Variant
    intent?: Intent
} 

const Button = (props: ButtonProps) => {
    const classes = [styles.button];
    if (props.variant != null && props.variant !== Variant.STANDARD) {
        classes.push(styles[props.variant]);
    }
    if (props.intent != null && props.intent !== Intent.PRIMARY) {
        classes.push(styles[props.intent]);
    } else {
        classes.push(styles[Intent.PRIMARY]);
    }
    const className = getClassName(props.className, [...classes]);
    return (
        <button {...props} className={className}>{props.children}</button>
    );
};

export default Button;
