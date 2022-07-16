import type { NextPage } from "next";
import { useEffect, useState } from "react";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import { Ship } from "../../models/ship.model";
import ShipService from "../../services/ship.service";
import Card from "../../components/Cards/Card/Card";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../../components/IconButton/IconButton";
import { useRouter } from "next/router";
import { InputText } from "../../components/Input/InputText";
import Button from "../../components/Button/Button";
import { Column as Col, Table } from "../../components/Table/Table";


const Ships: NextPage = () => {
    const [ships, setShips] = useState<Ship[] | null>([]);
    const [sort, setSort] = useState("-createdAt");
    const router = useRouter();
    useEffect(() => {
        ShipService.listShips(0, 0, sort).then(r => {
            const items = r.data.items.length ? r.data.items : [];
            setShips(items);
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
                </div>
            </Card>
            <Card style={{ width: "100%", marginTop: "8px" }}>
                {!ships || ships.length == 0 ? (
                    <NoDataFound />
                ) : (
                    <Table values={ships} sortDirection={sort[0] === "-" ? -1 : 1} sortCol={sort.substring(1)} setSort={(col, dir) => setSort(`${dir === -1 ? "-" : "+"}${col}`)}>
                        <Col key="name" title="Name" sortable />
                        <Col key="namespace" title="Namespace" sortable/>
                        <Col key="createdAt" title="Date Created" sortable formatter={(val: Ship) => new Date(val.createdAt).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })} />
                        <Col key="modifiedAt" title="Last Modified" sortable formatter={(val: Ship) => new Date(val.modifiedAt).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })} />
                        <Col key="action" formatter={(val: Ship) => <IconButton icon={faArrowUpRightFromSquare} onClick={() => router.push(`/resources/ships/${val.frn}`)} />} />
                    </Table>
                )}
            </Card>
        </>
    );
};

export default Ships;