/* eslint-disable prefer-const */
import React, { InputHTMLAttributes } from "react";
import { getClassName } from "../../utils/classnames";
import { Color, Variant } from "../types/types";
import styles from "./InputText.module.scss";

export interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: Variant,
    Color?: Color,
    fill?: boolean
    error?: string
}

// eslint-disable-next-line react/display-name
export const InputText = React.forwardRef((props: InputTextProps, ref: React.LegacyRef<HTMLInputElement>) => {
    let {
        fill,
        color,
        onChange,
        ...rest
    } = props
    const classes = [styles.inputText];
    if (color != null && color !== Color.PRIMARY) {
        classes.push(styles[color]);
    } else {
        classes.push(styles[Color.PRIMARY]);
    }
    if (props.variant != null && props.variant !== Variant.STANDARD) {
        classes.push(styles[props.variant]);
    }
    if (props.error) {
        classes.push(styles.error)
    }
    const className = getClassName(props.className, [...classes]);


    return <div className={`${styles.inputGroup} ${fill ? styles.fill : ""}`} ref={ref}>
        <input {...rest}
            onChange={onChange}
            className={className}>
            {props.children}
        </input>
        <div className={styles.errorText}>
            {props.error}
        </div>
    </div>
})