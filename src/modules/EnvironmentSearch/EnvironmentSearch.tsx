import { useEffect, useState } from "react";
import Card from "../../components/Cards/Card/Card";
import { Column as Col, Table } from "../../components/Table/Table";
import { Group } from "../../models/auth.model";
import SystemService from "../../services/system.service";
import { Environment } from "../../models/system.model";
import { IconButton } from "../../components/IconButton/IconButton";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import CreateEnvironmentDialog from "../CreateEnvironmentDialog/CreateEnvironmentDialog";


const EnvironmentSearch = () => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [envs, setEnvs] = useState<Environment[] | undefined>([]);
    const [sort, setSort] = useState("+name")
    useEffect(() => {
        SystemService.listEnvs(sort).then(r => {
            const items = r.data.length ? r.data : [];
            setEnvs(items);
        });
    }, [dialogOpen, sort]);

    return (
        <>
            <Card style={{ width: "100%", marginTop: "8px" }}>
                <Table values={envs} sortDirection={sort[0] === "-" ? -1 : 1} sortCol={sort.substring(1)} setSort={(col, dir) => setSort(`${dir === -1 ? "-" : "+"}${col}`)}>
                    <Col key="name" title="Name" sortable />
                    <Col key="image" title="Image" sortable />
                    <Col key="createdAt" sortable title="Date Created" formatter={(val: Group) => new Date(val.createdAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })} />
                    <Col key="modifiedAt" sortable title="Last Modified" formatter={(val: Group) => new Date(val.modifiedAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })} />
                    <Col key="action" align="right" title={<IconButton onClick={() => setDialogOpen(true)} icon={faAdd} />} />
                </Table>
            </Card>
            <CreateEnvironmentDialog open={dialogOpen} setOpen={setDialogOpen} />
        </>
    );
};

export default EnvironmentSearch;