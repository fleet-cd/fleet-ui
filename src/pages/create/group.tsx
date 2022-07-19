import type { NextPage } from "next";
import Card from "../../components/Cards/Card/Card";
import Button from "../../components/Button/Button";
import { Label } from "../../components/Label/Label";
import { InputText } from "../../components/Input/InputText";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { CreatePermissionRequest, Permission } from "../../models/auth.model";
import AuthService from "../../services/auth.service";
import { IconButton } from "../../components/IconButton/IconButton";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Column, Table } from "../../components/Table/Table";
import CreatePermissionDialog from "../../modules/CreatePermissionDialog/CreatePermissionDialog";
import { useRouter } from "next/router";


const Group: NextPage = () => {
    const router = useRouter()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [permissions, setPermissions] = useState<CreatePermissionRequest[]>([])
    const { enqueueSnackbar } = useSnackbar();
    const [name, setName] = useState<string>("")

    const [nameError, setNameError] = useState<string | undefined>()

    const addToList = (value: CreatePermissionRequest) => {
        const copy = [...permissions]
        copy.push(value)
        setPermissions(copy)
        setDialogOpen(false)
    }

    const submit = () => {
        let hasError = false
        if (permissions.length === 0) {
            enqueueSnackbar("Must include permissions", { variant: "error" })
            hasError = true
        }
        if (!name.match(/^[a-z0-9\\-]+$/)) {
            setNameError("Name must be alphanumeric characters and dashes")
            hasError = true
        }
        if (hasError) {
            return
        }
        setNameError(undefined)
        AuthService.createGroup({
            name,
            permissions: permissions
        })
            .then((r) => { enqueueSnackbar("Group created!", { variant: "success" }); router.push(`/resources/groups/${r.data.name}`) })
            .catch(() => enqueueSnackbar("Group creation failed. Please try again.", { variant: "error" }))
    }


    return (
        <>
            <Card title="Create Group">
                <Label label="Group Name" style={{ flexGrow: 1 }}>
                    <InputText error={nameError} fill placeholder="Group Name" onChange={(e) => setName(e.target.value)} value={name || ""} required />
                </Label>
            </Card>
            <Card title="Permissions" style={{ marginTop: '16px' }}>
                <Table values={permissions}>
                    <Column key="namespace" title="Namespace" />
                    <Column key="resourceType" title="Resource Type" />
                    <Column key="actions" title="Actions" formatter={(v: Permission) => v.actions.toString()} />
                    <Column align="right" key="actions" title={<IconButton icon={faPlus} onClick={() => setDialogOpen(true)} />} formatter={(v: Permission, idx: number) => <IconButton icon={faTrash} onClick={() => {
                        const copy = [...permissions]
                        copy.splice(idx, 1)
                        setPermissions(copy)
                    }} />} />
                </Table>
            </Card>
            <Card style={{ marginTop: '16px' }}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={submit}>Save</Button>
                </div>
            </Card>
            <CreatePermissionDialog open={dialogOpen} setOpen={setDialogOpen} submit={addToList} />
        </>
    );
};

export default Group;