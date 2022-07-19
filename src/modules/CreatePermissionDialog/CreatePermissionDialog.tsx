import { useState } from "react";
import { Dialog } from "../../components/Dialog/Dialog";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { MenuItem } from "../../components/MenuItem/MenuItem";
import { Label } from "../../components/Label/Label";
import Button from "../../components/Button/Button";
import { Color, Variant } from "../../components/types/types";
import NamespaceSelect from "../NamespaceSelect/NamespaceSelect";
import { Namespace } from "../../models/namespace.model";
import { CreatePermissionRequest } from "../../models/auth.model";


const CreatePermissionDialog = (props: { open: boolean, setOpen: (b: boolean) => void, submit: (p: CreatePermissionRequest) => void }) => {
    const [actions, setActions] = useState(["VIEW"])
    const [resource, setResource] = useState("*")
    const [namespace, setNamespace] = useState<Namespace>({ name: "*", createdAt: "", modifiedAt: "" })

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

    return (
        <>
            <Dialog open={props.open} setOpen={props.setOpen} title="Create Permission" width={400}>
                <div style={{ marginBottom: "16px", display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <Label label="Resource" style={{ width: "100%" }}>
                        <Dropdown
                            fill
                            items={[
                                "*",
                                "ship",
                                "product",
                                "cargo",
                                "user",
                                "group",
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
                            items={["*", "view", "edit", "create", "delete"]}
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
                                items={["*", "view", "edit", "create", "delete"]}
                                selected={i}
                                renderer={(item) => <MenuItem onClick={() => setInnerAction(idx, item)}>{item}</MenuItem>}
                                stringRenderer={(item) => item}
                            />
                            <Button onClick={() => removeInnerAction(idx)}>Remove</Button>
                        </div>
                    })}
                    <Button disabled={actions.length === 4} variant={Variant.CONTAINED} onClick={() => setActions([...actions, "VIEW"])} style={{ marginTop: "16px" }} fill>Add</Button>
                    <Button style={{ marginTop: "16px" }} fill onClick={() => props.submit({
                        namespace: namespace.name,
                        actions: actions,
                        resourceType: resource,
                    })}>Save</Button>
                    <Button onClick={() => props.setOpen(false)} variant={Variant.CONTAINED} color={Color.DANGER} style={{ marginTop: "16px" }} fill>Cancel</Button>
                </div>
            </Dialog>
        </>
    );
};

export default CreatePermissionDialog;