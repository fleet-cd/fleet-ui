/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Dialog } from "../../components/Dialog/Dialog";
import { Label } from "../../components/Label/Label";
import Button from "../../components/Button/Button";
import { Intent, Variant } from "../../components/types/types";
import { useSnackbar } from "notistack";
import { Group } from "../../models/auth.model";
import AuthService from "../../services/auth.service";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { MenuItem } from "../../components/MenuItem/MenuItem";


const AddGroupDialog = (props: { open: boolean, setOpen: (b: boolean) => void, confirm: (g?: Group) => void }) => {
    const { enqueueSnackbar } = useSnackbar()
    const [groups, setGroups] = useState<Group[] | undefined>();
    const [group, setGroup] = useState<Group | undefined>();
    useEffect(() => {
        AuthService.listGroups()
            .then((r) => setGroups(r.data))
            .catch(() => {
                enqueueSnackbar("Failed to fetch groups. Please try again.", { variant: "error" })
                props.setOpen(false)
            })
    }, [])

    return (
        <>
            <Dialog open={props.open} setOpen={props.setOpen} title="Create Namespace" width={400}>
                <div style={{ marginBottom: "16px" }}>
                    <Label label="Group">
                        <Dropdown
                            selected={group}
                            items={groups}
                            renderer={(item) => <MenuItem onClick={() => setGroup(item)}>{item.name}</MenuItem>}
                            stringRenderer={(item) => item.name}
                            fill
                        />
                    </Label>
                </div>
                <Button style={{ marginTop: "16px" }} fill onClick={() => props.confirm(group)}>Save</Button>
                <Button onClick={() => props.setOpen(false)} variant={Variant.CONTAINED} intent={Intent.DANGER} style={{ marginTop: "16px" }} fill>Cancel</Button>
            </Dialog>
        </>
    );
};

export default AddGroupDialog;