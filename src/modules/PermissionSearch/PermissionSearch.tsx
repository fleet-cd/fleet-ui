import { useEffect, useState } from "react";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import Card from "../../components/Cards/Card/Card";
import { InputText } from "../../components/Input/InputText";
import Button from "../../components/Button/Button";
import { Column as Col, Table } from "../../components/Table/Table";
import { Permission } from "../../models/auth.model";
import AuthService from "../../services/auth.service";
import { Variant } from "../../components/types/types";
import CreatePermissionDialog from "../CreatePermissionDialog/CreatePermissionDialog";


const PermissionSearch = () => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [perms, setPerms] = useState<Permission[] | null>([]);
    const [sort, setSort] = useState("-name");
    useEffect(() => {
        AuthService.listPermissions().then(r => {
            const items = r.data.length ? r.data : [];
            setPerms(items);
        });
    }, [sort, dialogOpen]);
    
    return (
        <>
            <Card style={{ width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ flexGrow: 1 }} className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText placeholder="Search" style={{ width: "100%", borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
                    </span>
                    <Button className="search-btn" style={{ padding: "16px 12px", borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>Search</Button>
                    <Button onClick={() => setDialogOpen(true)} variant={Variant.CONTAINED} style={{ marginLeft: "16px", padding: "16px 12px" }}>Create Permission</Button>
                </div>
            </Card>
            <Card style={{ width: "100%", marginTop: "8px" }}>
                {!perms || perms.length == 0 ? (
                    <NoDataFound />
                ) : (
                    <Table values={perms} sortDirection={sort[0] === "-" ? -1 : 1} sortCol={sort.substring(1)} setSort={(col, dir) => setSort(`${dir === -1 ? "-" : "+"}${col}`)}>
                        <Col key="name" title="Name" sortable />
                        <Col key="createdAt" title="Date Created" sortable formatter={(val: Permission) => new Date(val.createdAt).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })} />
                        <Col key="modifiedAt" title="Last Modified" sortable formatter={(val: Permission) => new Date(val.modifiedAt).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })} />
                    </Table>
                )}
            </Card>
            <CreatePermissionDialog open={dialogOpen} setOpen={setDialogOpen} />
        </>
    );
};

export default PermissionSearch;