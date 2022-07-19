import React, { ButtonHTMLAttributes } from "react";
import { getClassName } from "../../utils/classnames";
import { Color, Variant } from "../types/types";
import styles from "./Button.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant
    color?: Color
    fill?: boolean
}

const Button = (props: ButtonProps) => {
    const {
        fill,
        color,
        ...rest
    } = props
    const classes = [styles.button];
    if (fill) {
        classes.push(styles.fill)
    }
    if (rest.variant != null && rest.variant !== Variant.STANDARD) {
        classes.push(styles[rest.variant]);
    }
    if (color != null && color !== Color.PRIMARY) {
        classes.push(styles[color]);
    } else {
        classes.push(styles[Color.PRIMARY]);
    }
    const className = getClassName(rest.className, [...classes]);
    return (
        <button {...rest} className={className}>{props.children}</button>
    );
};

export default Button;
