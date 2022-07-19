import { useTransition } from "@react-spring/core"
import { animated } from "@react-spring/web"
import { useEffect, useState } from "react"
import styles from "./Dropdown.module.scss"
import Card from "../Cards/Card/Card"
import { InputText, InputTextProps } from "../Input/InputText"
import { MenuItem } from "../MenuItem/MenuItem"
import useMeasure from "react-use-measure"

interface DropdownProps<T> extends InputTextProps {
    items?: T[]
    renderer: (item: T, index: number) => React.ReactNode
    stringRenderer: (item: T) => string
    selected?: T
}

export function Dropdown<T>(properties: DropdownProps<T>) {
    const [open, setOpen] = useState(false)

    const { items, renderer, stringRenderer, selected, ...props } = properties

    const transitions = useTransition(open, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        reverse: open,
        config: { duration: 75 },
    })

    useEffect(() => {
        setOpen(false)
    }, [selected])
    const sel2 = selected != null ? stringRenderer(selected) : "Select"
    // const actualItems = items != null ? items : []
    const [ref, bounds] = useMeasure()
    return (
        <div className={props.fill ? styles.fill : ""}>
            <InputText
                ref={ref}
                readOnly
                style={{ cursor: "pointer" }}
                {...props}
                onClick={() => setOpen(!open)}
                value={sel2}
            />
            {transitions(
                (st, item) =>
                    item && (
                        <animated.div style={st} className={styles.options}>
                            <Card style={{ padding: 0 }}>
                                <div style={{ width: bounds.width }} className={styles.optionsContainer}>
                                    {items != null && items.length !== 0 ? (
                                        items.map((i, idx) => renderer(i, idx))
                                    ) : (
                                        <MenuItem>No Data</MenuItem>
                                    )}
                                </div>
                            </Card>
                        </animated.div>
                    )
            )}
            <div className={styles.errorText}>{props.error}</div>
        </div>
    )
}
