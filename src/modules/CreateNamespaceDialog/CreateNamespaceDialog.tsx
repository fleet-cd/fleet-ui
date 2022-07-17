import { useState } from "react";
import { InputText } from "../../components/Input/InputText";
import { Dialog } from "../../components/Dialog/Dialog";
import { Label } from "../../components/Label/Label";
import Button from "../../components/Button/Button";
import { Intent, Variant } from "../../components/types/types";
import { useSnackbar } from "notistack";
import OtherService from "../../services/other.service";


const CreateNamespaceDialog = (props: { open: boolean, setOpen: (b: boolean) => void }) => {
    const { enqueueSnackbar } = useSnackbar()
    const [name, setName] = useState<string>("")

    const [nameError, setNameError] = useState<string | undefined>()

    const submit = async () => {
        let hasError = false
        if (!name.match(/^[a-z0-9\\-]+$/)) {
            setNameError("Name must be alphanumeric characters and dashes")
            hasError = true
        }
        if (hasError) {
            return
        }
        setNameError(undefined)
        OtherService.createNamespace(
            name,
        )
            .then(() => {
                props.setOpen(false)
                enqueueSnackbar("Namespace created!", { variant: "success" })
            })
            .catch(() => {
                props.setOpen(false)
                enqueueSnackbar("Could not create Namespace.", { variant: "error" })
            })
    }

    return (
        <>
            <Dialog open={props.open} setOpen={props.setOpen} title="Create Namespace" width={400}>
                <div style={{ marginBottom: "16px" }}>
                    <Label label="Name">
                        <InputText value={name} onChange={(e) => setName(e.target.value)} error={nameError} fill placeholder="Name" />
                    </Label>
                </div>
                <Button style={{ marginTop: "16px" }} fill onClick={submit}>Save</Button>
                <Button onClick={() => props.setOpen(false)} variant={Variant.CONTAINED} intent={Intent.DANGER} style={{ marginTop: "16px" }} fill>Cancel</Button>
            </Dialog>
        </>
    );
};

export default CreateNamespaceDialog;