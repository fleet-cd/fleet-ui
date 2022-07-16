import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    label: string
}

export function Label(props: LabelProps) {
    return <label {...props}>
        <div style={{marginBottom: "4px"}}>{props.label}</div>
        {props.children}
    </label>
}