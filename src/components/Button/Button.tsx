import React, { ButtonHTMLAttributes } from "react";
import { getClassName } from "../../utils/classnames";
import { Intent, Variant } from "../types/types";
import styles from "./Button.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { 
    variant?: Variant
    intent?: Intent
    fill?: boolean
} 

const Button = (props: ButtonProps) => {
    const {
        fill,
        ...rest
    } = props
    const classes = [styles.button];
    if (fill) {
        classes.push(styles.fill)
    }
    if (rest.variant != null && rest.variant !== Variant.STANDARD) {
        classes.push(styles[rest.variant]);
    }
    if (rest.intent != null && rest.intent !== Intent.PRIMARY) {
        classes.push(styles[rest.intent]);
    } else {
        classes.push(styles[Intent.PRIMARY]);
    }
    const className = getClassName(rest.className, [...classes]);
    return (
        <button {...rest} className={className}>{props.children}</button>
    );
};

export default Button;
