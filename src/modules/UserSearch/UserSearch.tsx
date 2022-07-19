import { useEffect, useState } from "react";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import Card from "../../components/Cards/Card/Card";
import { InputText } from "../../components/Input/InputText";
import Button from "../../components/Button/Button";
import { Column as Col, Table } from "../../components/Table/Table";
import { User } from "../../models/auth.model";
import UserService from "../../services/user.service";
import { Variant } from "../../components/types/types";
import CreateUserDialog from "../CreateUserDialog/CreateUserDialog";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../../components/IconButton/IconButton";
import { useRouter } from "next/router";


const UserSearch = () => {
    const router = useRouter()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [users, setUsers] = useState<User[] | null>([]);
    const [sort, setSort] = useState("+name");
    useEffect(() => {
        UserService.listUsers(0, 0, sort).then(r => {
            const items = r.data.items.length ? r.data.items : [];
            setUsers(items);
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
                    <Button onClick={() => setDialogOpen(true)} variant={Variant.CONTAINED} style={{ marginLeft: "16px", padding: "16px 12px" }}>Create User</Button>
                </div>
            </Card>
            <Card style={{ width: "100%", marginTop: "8px" }}>
                {!users || users.length == 0 ? (
                    <NoDataFound />
                ) : (
                    <Table values={users} sortDirection={sort[0] === "-" ? -1 : 1} sortCol={sort.substring(1)} setSort={(col, dir) => setSort(`${dir === -1 ? "-" : "+"}${col}`)}>
                        <Col key="name" title="Name" sortable />
                        <Col key="email" title="Email" sortable />
                        <Col key="createdAt" title="Date Created" sortable formatter={(val: User) => new Date(val.createdAt).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })} />
                        <Col key="modifiedAt" title="Last Modified" sortable formatter={(val: User) => new Date(val.modifiedAt).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })} />
                        <Col align="right" key="actions" title="" formatter={(u: User) => <IconButton icon={faUser} onClick={() => router.push(`/resources/users/${u.frn}`)} />} />
                    </Table>
                )}
            </Card>
            <CreateUserDialog open={dialogOpen} setOpen={setDialogOpen} />
        </>
    );
};

export default UserSearch;