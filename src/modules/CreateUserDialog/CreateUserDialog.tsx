import { useState } from "react";
import { InputText } from "../../components/Input/InputText";
import { Dialog } from "../../components/Dialog/Dialog";
import { Label } from "../../components/Label/Label";
import Button from "../../components/Button/Button";
import { Color, Variant } from "../../components/types/types";
import UserService from "../../services/user.service";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";


const CreateUserDialog = (props: { open: boolean, setOpen: (b: boolean) => void }) => {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
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
        UserService.createUser({
            name,
            email,
            password
        })
            .then((r) => {
                enqueueSnackbar("User created!", { variant: "success" })
                router.push(`/resources/users/${r.data.frn}`)
            })
            .catch(() => enqueueSnackbar("User creation failed. Please try again.", { variant: "error" }))
            .finally(() => props.setOpen(false))
    }

    return (
        <>
            <Dialog open={props.open} setOpen={props.setOpen} title="Create User" width={400}>
                <div style={{ marginBottom: "16px" }}>
                    <Label label="Name">
                        <InputText value={name} onChange={(e) => setName(e.target.value)} error={nameError} fill placeholder="Name" />
                    </Label>
                </div>
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
                <Button onClick={() => props.setOpen(false)} variant={Variant.CONTAINED} color={Color.DANGER} style={{ marginTop: "16px" }} fill>Cancel</Button>
            </Dialog>
        </>
    );
};

export default CreateUserDialog;