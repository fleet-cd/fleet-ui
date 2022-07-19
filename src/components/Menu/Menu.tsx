import { useTransition } from "@react-spring/core"
import { animated } from "@react-spring/web"
import { useState } from "react"
import styles from "./Menu.module.scss"
import Card from "../Cards/Card/Card"
import Button, { ButtonProps } from "../Button/Button"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface MenuProps extends Omit<ButtonProps, "title"> {
    title: React.ReactNode
    rightIcon?: IconDefinition
}

export function Menu(properties: MenuProps) {
    const [open, setOpen] = useState(false)

    const { children, title, rightIcon, ...props } = properties

    const transitions = useTransition(open, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        reverse: open,
        config: { duration: 75 },
    })

    return (
        <div className={props.fill ? styles.fill : ""}>
            <Button
                style={{ cursor: "pointer" }}
                {...props}
                onClick={() => setOpen(!open)}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ flexGrow: 1 }}>
                        {title}
                    </div>
                    {rightIcon ? <FontAwesomeIcon style={{ marginLeft: "16px" }} icon={rightIcon} width={14} height={14} /> : ""}
                </div>
            </Button>
            {transitions(
                (st, item) =>
                    item && (
                        <animated.div style={st} className={styles.options}>
                            <Card onClick={() => setOpen(false)} style={{ padding: 0 }}>
                                <div className={styles.optionsContainer}>
                                    {children}
                                </div>
                            </Card>
                        </animated.div>
                    )
            )
            }
        </div>
    )
}
