import { useEffect, useState } from "react";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import Card from "../../components/Cards/Card/Card";
import { InputText } from "../../components/Input/InputText";
import Button from "../../components/Button/Button";
import { Column as Col, Table } from "../../components/Table/Table";
import { Group } from "../../models/auth.model";
import AuthService from "../../services/auth.service";
import { Variant } from "../../components/types/types";


const GroupSearch = () => {
    const [groups, setGroups] = useState<Group[] | null>([]);
    const [sort, setSort] = useState("-name");
    useEffect(() => {
        AuthService.listGroups().then(r => {
            const items = r.data.length ? r.data : [];
            setGroups(items);
        });
    }, [sort]);
    
    return (
        <>
            <Card style={{ width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ flexGrow: 1 }} className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText placeholder="Search" style={{ width: "100%", borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
                    </span>
                    <Button className="search-btn" style={{ padding: "16px 12px", borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>Search</Button>
                    <Button variant={Variant.CONTAINED} style={{ marginLeft: "16px", padding: "16px 12px" }}>Create Group</Button>
                </div>
            </Card>
            <Card style={{ width: "100%", marginTop: "8px" }}>
                {!groups || groups.length == 0 ? (
                    <NoDataFound />
                ) : (
                    <Table values={groups} sortDirection={sort[0] === "-" ? -1 : 1} sortCol={sort.substring(1)} setSort={(col, dir) => setSort(`${dir === -1 ? "-" : "+"}${col}`)}>
                        <Col key="name" title="Name" sortable />
                        <Col key="createdAt" title="Date Created" sortable formatter={(val: Group) => new Date(val.createdAt).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })} />
                        <Col key="modifiedAt" title="Last Modified" sortable formatter={(val: Group) => new Date(val.modifiedAt).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })} />
                    </Table>
                )}
            </Card>
        </>
    );
};

export default GroupSearch;