import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { IconButton } from "../../components/IconButton/IconButton";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import { Column, Table } from "../../components/Table/Table";
import { CreatePermissionRequest, Permission } from "../../models/auth.model";
import AuthService from "../../services/auth.service";
import CreatePermissionDialog from "../CreatePermissionDialog/CreatePermissionDialog";


export default function PermissionsTable(
    props: {
        groupName: string,
        perms?: Permission[]
        onDelete?: (perm: Permission, idx: number) => void
        pull: () => void
    }
) {
    const [dialogOpen, setDialogOpen] = useState(false)
    const submit = (p: CreatePermissionRequest) => {
        AuthService.createPermission(props.groupName, p)
            .then(() => {
                enqueueSnackbar("Permission added!", { variant: "success" })
                props.pull()
            })
            .catch(() => enqueueSnackbar("Failed to add permission.", { variant: "error" }))
            .finally(() => setDialogOpen(false))
    }
    return <>
        <Table values={props.perms}>
            <Column key="namespace" title="Namespace" />
            <Column key="resourceType" title="Resource Type" />
            <Column key="actions" title="Actions" formatter={(p: Permission) => p.actions.toString()} />
            <Column key="commands" title={<IconButton icon={faAdd} onClick={() => setDialogOpen(true)} />} align="right" formatter={(p: Permission, idx: number) => {
                if (props.onDelete != null) {
                    return <IconButton icon={faTrash} onClick={() => {
                        if (props.onDelete != null) {
                            props.onDelete(p, idx)
                        }
                    }} />
                }
            }} />
        </Table>
        <CreatePermissionDialog open={dialogOpen} setOpen={setDialogOpen} submit={submit} />
    </>
}