import type { NextPage } from "next";
import Card from "../../components/Cards/Card/Card";
import Button from "../../components/Button/Button";
import { Label } from "../../components/Label/Label";
import { InputText } from "../../components/Input/InputText";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { Permission } from "../../models/auth.model";
import AuthService from "../../services/auth.service";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { MenuItem } from "../../components/MenuItem/MenuItem";
import { IconButton } from "../../components/IconButton/IconButton";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Column, Table } from "../../components/Table/Table";


const Group: NextPage = () => {
    const [selected, setSelected] = useState<Permission | undefined>()
    const [permissions, setPermissions] = useState<Permission[]>([])
    const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([])
    useEffect(() => {
        AuthService.listPermissions().then(r => {
            setPermissions(r.data)
        })
    }, [])
    const { enqueueSnackbar } = useSnackbar();
    const [name, setName] = useState<string>("")

    const [nameError, setNameError] = useState<string | undefined>()

    const addToList = (value: Permission) => {
        const copy = [...selectedPermissions]
        copy.push(value)
        setSelectedPermissions(copy)
        setSelected(undefined)
        setPermissions(permissions.filter(p => p.frn != value.frn))
    }

    const submit = () => {
        let hasError = false
        if (selectedPermissions.length === 0) {
            enqueueSnackbar("Must select permissions", { variant: "error" })
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
            permissions: selectedPermissions.map(p => p.frn)
        })
            .then(() => enqueueSnackbar("Group created!", { variant: "success" }))
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
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: '16px' }}>
                    <div style={{ whiteSpace: "nowrap" }}>Add Permission</div>
                    <Dropdown
                        fill
                        items={permissions}
                        selected={selected}
                        renderer={(item) => <MenuItem onClick={() => setSelected(item)}>{item.name}</MenuItem>}
                        stringRenderer={(item) => item.name}
                    />
                    <IconButton icon={faAdd} onClick={() => selected ? addToList(selected) : null} />
                </div>
                <Table values={selectedPermissions}>
                    <Column key="name" title="Name" />
                    <Column key="namespace" title="Namespace" />
                    <Column key="resourceType" title="Resource Type" />
                    <Column key="actions" title="Actions" formatter={(v: Permission) => v.actions.toString()} />
                    <Column key="actions" title="" formatter={(v: Permission, idx: number) => <IconButton icon={faTrash} onClick={() => {
                        setPermissions([...permissions, v])
                        const copy = [...selectedPermissions]
                        copy.splice(idx, 1)
                        setSelectedPermissions(copy)
                    }} />} />
                </Table>
            </Card>
            <Card style={{ marginTop: '16px' }}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={submit}>Save</Button>
                </div>
            </Card>
        </>
    );
};

export default Group;