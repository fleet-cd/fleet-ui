import styles from "./Dialog.module.scss";
import { animated, useTransition } from "@react-spring/web";
import Card from "../Cards/Card/Card";
import Button from "../Button/Button";
import ButtonSet from "../ButtonSet/ButtonSet";
import { Variant } from "../types/types";

interface ConfirmationDialogProps {
    open: boolean, 
    setOpen: (open: boolean) => void,
    title: string
    body: string
    confirmAction: () => void
    rejectAction: () => void
}

export function ConfirmationDialog(props: ConfirmationDialogProps) {
    const transitions = useTransition(props.open, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        reverse: props.open,
        config: { duration: 120 }
    });

    return transitions(
        (st, item) => item && <animated.div style={st} className={styles.dialogWrapper}>
            <div className={styles.dialog}>
                <div className={styles.dialogContent}>
                    <Card>
                        <div className={styles.dialogTitle}>
                            {props.title}
                        </div>
                        <div className={styles.dialogBody}>
                            {props.body}
                        </div>
                        <div className={styles.dialogActions}>
                            <ButtonSet>
                                <Button onClick={props.rejectAction} variant={Variant.CONTAINED}>Cancel</Button>
                                <Button onClick={props.confirmAction}>Ok</Button>
                            </ButtonSet>
                        </div>
                    </Card>
                </div>
            </div>
        </animated.div>
    );

}