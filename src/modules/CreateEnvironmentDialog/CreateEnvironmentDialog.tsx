import { useState } from "react";
import { InputText } from "../../components/Input/InputText";
import { Dialog } from "../../components/Dialog/Dialog";
import { Label } from "../../components/Label/Label";
import Button from "../../components/Button/Button";
import { Color, Variant } from "../../components/types/types";
import { useSnackbar } from "notistack";
import SystemService from "../../services/system.service";


const CreateEnvironmentDialog = (props: { open: boolean, setOpen: (b: boolean) => void }) => {
    const { enqueueSnackbar } = useSnackbar()
    const [name, setName] = useState<string>("")
    const [image, setImage] = useState<string>("")

    const [nameError, setNameError] = useState<string | undefined>()
    const [imageError, setImageError] = useState<string | undefined>()

    const submit = async () => {
        let hasError = false
        if (!name.match(/^[a-z0-9\\-]+$/)) {
            setNameError("Name must be alphanumeric characters and dashes")
            hasError = true
        }
        if (image === "") {
            setImageError("Must provide image")
            hasError = true
        }
        if (hasError) {
            return
        }
        setNameError(undefined)
        setImageError(undefined)
        SystemService.createEnv(
            {
                name, image
            },
        )
            .then(() => {
                props.setOpen(false)
                enqueueSnackbar("Environment created!", { variant: "success" })
            })
            .catch(() => {
                props.setOpen(false)
                enqueueSnackbar("Could not create Environment.", { variant: "error" })
            })
    }

    return (
        <>
            <Dialog open={props.open} setOpen={props.setOpen} title="Create Environment" width={400}>
                <div style={{ marginBottom: "16px" }}>
                    <Label label="Name">
                        <InputText value={name} onChange={(e) => setName(e.target.value)} error={nameError} fill placeholder="Name" />
                    </Label>
                </div>
                <div style={{ marginBottom: "16px" }}>
                    <Label label="Image">
                        <InputText value={image} onChange={(e) => setImage(e.target.value)} error={imageError} fill placeholder="Name" />
                    </Label>
                </div>
                <Button style={{ marginTop: "16px" }} fill onClick={submit}>Save</Button>
                <Button onClick={() => props.setOpen(false)} variant={Variant.CONTAINED} color={Color.DANGER} style={{ marginTop: "16px" }} fill>Cancel</Button>
            </Dialog>
        </>
    );
};

export default CreateEnvironmentDialog;