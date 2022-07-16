import { InputHTMLAttributes } from "react";
import { getClassName } from "../../utils/classnames";
import { Intent, Variant } from "../types/types";
import styles from "./InputText.module.scss";

export interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: Variant,
    intent?: Intent,
    fill?: boolean
    error?: string
}

export function InputText(props: InputTextProps) {
    const {
        fill,
        ...rest
    } = props
    const classes = [styles.inputText];
    if (props.intent != null && props.intent !== Intent.PRIMARY) {
        classes.push(styles[props.intent]);
    } else {
        classes.push(styles[Intent.PRIMARY]);
    }
    if (props.variant != null && props.variant !== Variant.STANDARD) {
        classes.push(styles[props.variant]);
    }
    if (props.error) {
        classes.push(styles.error)
    }
    const className = getClassName(props.className, [...classes]);

    return <div className={`${styles.inputGroup} ${fill ? styles.fill : ""}`}>
        <input {...rest}
            className={className}>
            {props.children}
        </input>
        <div className={styles.errorText}>
            {props.error}
        </div>
    </div>
}