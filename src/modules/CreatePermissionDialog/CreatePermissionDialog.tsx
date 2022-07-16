import { useState } from "react";
import { InputText } from "../../components/Input/InputText";
import { Dialog } from "../../components/Dialog/Dialog";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { MenuItem } from "../../components/MenuItem/MenuItem";
import { Label } from "../../components/Label/Label";


const CreatePermissionDialog = (props: { open: boolean, setOpen: (b: boolean) => void }) => {
    const [action, setAction] = useState("VIEW")
    return (
        <>
            <Dialog open={props.open} setOpen={props.setOpen} title="Create Permission" width={400}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <Label label="Permission Name">
                        <InputText fill placeholder="Name" />
                    </Label>
                    <Label label="Action">
                        <Dropdown
                            items={["ALL", "VIEW", "EDIT", "CREATE", "DELETE"]}
                            selected={action}
                            setSelected={setAction}
                            renderer={(item) => <MenuItem onClick={() => setAction(item)}>{item}</MenuItem>}
                            stringRenderer={(item) => item}
                        />
                    </Label>
                </div>
            </Dialog>
        </>
    );
};

export default CreatePermissionDialog;