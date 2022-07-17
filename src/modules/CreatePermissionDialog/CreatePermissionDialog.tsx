import { useState } from "react";
import { InputText } from "../../components/Input/InputText";
import { Dialog } from "../../components/Dialog/Dialog";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { MenuItem } from "../../components/MenuItem/MenuItem";
import { Label } from "../../components/Label/Label";
import Button from "../../components/Button/Button";
import { Intent, Variant } from "../../components/types/types";
import AuthService from "../../services/auth.service";
import { useSnackbar } from "notistack";
import NamespaceSelect from "../NamespaceSelect/NamespaceSelect";
import { Namespace } from "../../models/namespace.model";


const CreatePermissionDialog = (props: { open: boolean, setOpen: (b: boolean) => void }) => {
    const { enqueueSnackbar } = useSnackbar()
    const [actions, setActions] = useState(["VIEW"])
    const [resource, setResource] = useState("ALL")
    const [namespace, setNamespace] = useState<Namespace>({ name: "*", createdAt: "", modifiedAt: "" })
    const [name, setName] = useState<string>("")

    const [nameError, setNameError] = useState<string | undefined>()

    const setInnerAction = (idx: number, value: string) => {
        const copy = [...actions]
        copy[idx] = value
        setActions(copy)
    }

    const removeInnerAction = (idx: number) => {
        const copy = [...actions]
        copy.splice(idx, 1)
        setActions(copy)
    }

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
        AuthService.createPermission({
            name,
            namespace: namespace.name,
            actions: actions.map(a => a.toLowerCase()),
            resourceType: resource.toLowerCase()
        })
            .then(() => {
                props.setOpen(false)
                enqueueSnackbar("Permission created!", { variant: "success" })
            })
            .catch(() => {
                props.setOpen(false)
                enqueueSnackbar("Could not create permission.", { variant: "error" })
            })
    }

    return (
        <>
            <Dialog open={props.open} setOpen={props.setOpen} title="Create Permission" width={400}>
                <div style={{ marginBottom: "16px", display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <Label label="Permission Name">
                        <InputText value={name} onChange={(e) => setName(e.target.value)} error={nameError} fill placeholder="Name" />
                    </Label>
                    <Label label="Resource">
                        <Dropdown
                            items={[
                                "ALL",
                                "SHIP",
                                "PRODUCT",
                                "CARGO",
                                "USER",
                                "GROUP",
                                "PERMISSION"
                            ]}
                            selected={resource}
                            renderer={(item) => <MenuItem onClick={() => setResource(item)}>{item}</MenuItem>}
                            stringRenderer={(item) => item}
                        />
                    </Label>
                </div>
                <div style={{ marginBottom: "16px" }}>
                    <Label label="Namespace">
                        <NamespaceSelect allowAll selected={namespace} setSelected={setNamespace} />
                    </Label>
                </div>
                <div style={{ marginBottom: "16px" }}>
                    <Label label="Actions">
                        <Dropdown
                            items={["ALL", "VIEW", "EDIT", "CREATE", "DELETE"]}
                            selected={actions[0]}
                            renderer={(item) => <MenuItem onClick={() => setInnerAction(0, item)}>{item}</MenuItem>}
                            stringRenderer={(item) => item}
                        />
                    </Label>
                    {actions.map((i, idx) => {
                        if (idx === 0) {
                            return;
                        }
                        return <div key={idx} style={{ marginTop: "16px", display: "flex", alignItems: "center", width: "100%", gap: "8px" }}>
                            <Dropdown
                                fill
                                items={["ALL", "VIEW", "EDIT", "CREATE", "DELETE"]}
                                selected={i}
                                renderer={(item) => <MenuItem onClick={() => setInnerAction(idx, item)}>{item}</MenuItem>}
                                stringRenderer={(item) => item}
                            />
                            <Button onClick={() => removeInnerAction(idx)}>Remove</Button>
                        </div>
                    })}
                    <Button disabled={actions.length === 4} variant={Variant.CONTAINED} onClick={() => setActions([...actions, "VIEW"])} style={{ marginTop: "16px" }} fill>Add</Button>
                    <Button style={{ marginTop: "16px" }} fill onClick={submit}>Save</Button>
                    <Button onClick={() => props.setOpen(false)} variant={Variant.CONTAINED} intent={Intent.DANGER} style={{ marginTop: "16px" }} fill>Cancel</Button>
                </div>
            </Dialog>
        </>
    );
};

export default CreatePermissionDialog;