import styles from "./Dialog.module.scss";
import { animated, useTransition } from "@react-spring/web";
import Card from "../Cards/Card/Card";
import { useEffect } from "react";

interface DialogProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    title: string
    children: React.ReactNode
    footer?: React.ReactNode
    width?: number
    height?: number
}

export function Dialog(props: DialogProps) {
    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                props.setOpen(false)
            }
        }
        window.addEventListener("keydown", close)
        return () => window.removeEventListener("keydown", close)
    }, [])

    const transitions = useTransition(props.open, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        reverse: props.open,
        config: { duration: 120 }
    });

    return transitions(
        (st, item) => item && <animated.div style={{ ...st }} className={styles.dialogWrapper} onClick={() => props.setOpen(false)}>
            <div className={styles.dialog}>
                <div className={styles.dialogContent}>
                    <Card style={{ width: props.width ? `${props.width}px` : "", height: props.height ? `${props.height}px` : "" }} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.dialogTitle}>
                            {props.title}
                        </div>
                        <div className={styles.dialogBody}>
                            {props.children}
                        </div>
                        <div className={styles.dialogActions}>
                            {props.footer}
                        </div>
                    </Card>
                </div>
            </div>
        </animated.div>
    );

}