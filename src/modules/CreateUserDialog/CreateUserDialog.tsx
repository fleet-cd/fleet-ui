import { useState } from "react";
import { InputText } from "../../components/Input/InputText";
import { Dialog } from "../../components/Dialog/Dialog";
import { Label } from "../../components/Label/Label";
import Button from "../../components/Button/Button";
import { Intent, Variant } from "../../components/types/types";


const CreateUserDialog = (props: { open: boolean, setOpen: (b: boolean) => void }) => {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [nameError, setNameError] = useState<string | undefined>()
    const [emailError, setEmailError] = useState<string | undefined>()
    const [passwordError, setPasswordError] = useState<string | undefined>()

    const submit = async () => {
        let hasError = false
        if (name === "") {
            setNameError("Must provide name")
            hasError = true
        }
        if (email === "") {
            setEmailError("Must provide email")
            hasError = true
        }
        if (password === "") {
            setNameError("Must provide password")
            hasError = true
        }
        if (hasError) {
            return
        }
        setNameError(undefined)
        setEmailError(undefined)
        setPasswordError(undefined)

    }

    return (
        <>
            <Dialog open={props.open} setOpen={props.setOpen} title="Create User" width={400}>
                <Label label="Name">
                    <InputText value={name} onChange={(e) => setName(e.target.value)} error={nameError} fill placeholder="Name" />
                </Label>
                <div style={{ marginBottom: "16px" }}>
                    <Label label="Email">
                        <InputText value={email} onChange={(e) => setEmail(e.target.value)} error={emailError} fill placeholder="Email" />
                    </Label>
                </div>
                <div style={{ marginBottom: "16px" }}>
                    <Label label="Password">
                        <InputText value={password} onChange={(e) => setPassword(e.target.value)} error={passwordError} fill placeholder="Password" type="password" />
                    </Label>
                </div>
                <Button style={{ marginTop: "16px" }} fill onClick={submit}>Save</Button>
                <Button onClick={() => props.setOpen(false)} variant={Variant.CONTAINED} intent={Intent.DANGER} style={{ marginTop: "16px" }} fill>Cancel</Button>
            </Dialog>
        </>
    );
};

export default CreateUserDialog;