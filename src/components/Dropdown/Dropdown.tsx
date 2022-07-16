import { useTransition } from "@react-spring/core";
import { animated } from "@react-spring/web";
import { HTMLAttributes, useEffect, useState } from "react";
import { getClassName } from "../../utils/classnames";
import { Intent, Variant } from "../types/types";
import styles from "./Dropdown.module.scss";
import Card from "../Cards/Card/Card"
import { InputText, InputTextProps } from "../Input/InputText";

interface DropdownProps<T> extends InputTextProps {
    items: T[]
    renderer: (item: T) => React.ReactNode
    stringRenderer: (item: T) => string
    selected: T
    setSelected: (t: T) => void
}

export function Dropdown<T>(properties: DropdownProps<T>) {
    const [open, setOpen] = useState(false)
    
    const {
        items,
        renderer,
        stringRenderer,
        selected,
        setSelected,
        ...props
    } = properties

    const transitions = useTransition(open, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        reverse: open,
        config: { duration: 75 }
    });

    useEffect(() => {
        console.log("ja!")
        setOpen(false)
    }, [selected])


    return <div>
        <InputText readOnly style={{cursor: "pointer"}} {...props}
            onClick={() => setOpen(!open)} value={stringRenderer(selected)} />
        {transitions((st, item) => item && <animated.div style={st} className={styles.options}>
            <Card style={{padding: 0}}><div className={styles.optionsContainer}>{items.map((i) => renderer(i))}</div></Card>
        </animated.div>)}
        <div className={styles.errorText}>
            {props.error}
        </div>
    </div>
}