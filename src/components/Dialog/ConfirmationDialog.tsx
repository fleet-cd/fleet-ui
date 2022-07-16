import styles from "./Dialog.module.scss";
import Button from "../Button/Button";
import ButtonSet from "../ButtonSet/ButtonSet";
import { Variant } from "../types/types";
import { Dialog } from "./Dialog";

interface ConfirmationDialogProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    title: string
    body: string
    confirmAction: () => void
    rejectAction: () => void
}

export function ConfirmationDialog(props: ConfirmationDialogProps) {
    return <Dialog open={props.open} setOpen={props.setOpen} title={props.title} footer={<ButtonSet>
        <Button onClick={props.rejectAction} variant={Variant.CONTAINED}>Cancel</Button>
        <Button onClick={props.confirmAction}>Ok</Button>
    </ButtonSet>}>
        {props.body}
        <div className={styles.dialogActions}>
            
        </div>
    </Dialog>


}