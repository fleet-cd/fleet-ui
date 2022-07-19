import { useRouter } from "next/router";
import React from "react";
import { GetCargoResponse, Ship } from "../../../models/ship.model";
import ShipService from "../../../services/ship.service";
import { Color } from "../../../components/types/types";
import { ConfirmationDialog } from "../../../components/Dialog/ConfirmationDialog";
import { enqueueSnackbar } from "notistack";
import { Toolbar } from "../../../layout/Toolbar/Toolbar";
import { IconButton } from "../../../components/IconButton/IconButton";
import Button from "../../../components/Button/Button";
import { faCaretDown, faCaretLeft, faCaretRight, faPlusMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import ResourceContainer from "../../../modules/ResourceContainer/ResourceContainer";
import Tabs from "../../../components/Tabs/Tabs";
import Tab from "../../../components/Tabs/Tab";
import Card, { CardTitle } from "../../../components/Cards/Card/Card";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Editor, { DiffEditor } from "@monaco-editor/react";
import CommitDialog from "../../../modules/CommitDialog/CommitDialog";
import CargoTable from "../../../modules/CargoTable/CargoTable";
import { Menu } from "../../../components/Menu/Menu";
import { MenuItem } from "../../../components/MenuItem/MenuItem";


const Ship = () => {
    const router = useRouter();
    const { frn } = router.query;
    const [selectedTab, setSelectedTab] = React.useState("overview")
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [commitDialogOpen, setCommitDialogOpen] = React.useState(false);
    const [showDiff, setShowDiff] = React.useState(false);
    const [hasModification, setHasModification] = React.useState(false);
    const [ship, setShip] = React.useState<Ship | undefined>();
    const [cargo, setCargo] = React.useState<GetCargoResponse | undefined>();
    const [config, setConfig] = React.useState("")
    const [originalConfig, setOriginalConfig] = React.useState("")
    React.useEffect(() => {
        if (frn) {
            ShipService.getShip(frn.toString()).then(r => {
                setShip(r.data);
            });
            ShipService.getShipConfig(frn.toString()).then(r => {
                setConfig(r.data.body);
                setOriginalConfig(r.data.body);
            });
            ShipService.getShipCargo(frn.toString()).then(r => {
                setCargo(r.data);
            });
        }
    }, [frn]);


    const confirm = () => {
        setDialogOpen(true);
    };

    const confirmAction = () => {
        if (!frn) {
            return;
        }
        ShipService.deleteShip(frn.toString()).then(() => {
            router.push("/search/ships");
        })
            .catch(() => enqueueSnackbar("Could not delete ship. Please contact your system administrator.", { variant: "error" }))
            .finally(() => setDialogOpen(false))
    };

    const rejectAction = () => {
        setDialogOpen(false);
    };

    const githubUrl = ship ? `https://github.com/${ship.source.owner}/${ship.source.repo}` : "https://github.com"


    return <>
        <ResourceContainer
            hasFrn
            open={sidebarOpen}
            name={ship?.name}
            frn={ship?.frn}
            createdAt={ship?.createdAt}
            modifiedAt={ship?.modifiedAt}
            actions={<IconButton icon={faTrash} color={Color.DANGER} onClick={confirm} />}
        >
            <Toolbar
                leftItems={<Tabs selected={selectedTab} setSelected={setSelectedTab}>
                    <Tab name="Overview" key="overview" />
                    <Tab name="Cargo" key="cargo" />
                    <Tab name="Config" key="config" />
                </Tabs>}
                rightItems={<>
                    <Menu color={Color.BLUE} rightIcon={faCaretDown} title="Actions">
                        <MenuItem onClick={() => router.push(`/install/${frn}`)}>Install Product</MenuItem>
                    </Menu>
                    <IconButton color={Color.BLUE} icon={faGithub} onClick={() => window.open(githubUrl, "_blank")} />
                    <IconButton icon={sidebarOpen ? faCaretRight : faCaretLeft} onClick={() => setSidebarOpen(!sidebarOpen)} />
                </>}
            />
            {selectedTab === "config" &&
                <Card style={{ marginTop: "8px", height: "500px" }}>
                    <Toolbar
                        style={{ marginBottom: "8px" }}
                        leftItems={<>
                            <CardTitle style={{ marginBottom: 0 }} title={"Configuration"} />
                        </>}
                        rightItems={<>
                            <IconButton color={Color.BLUE} icon={faPlusMinus} onClick={() => setShowDiff(!showDiff)} disabled={!hasModification} />
                            <Button onClick={() => setCommitDialogOpen(true)} disabled={!hasModification}>Propose Changes</Button>
                            <Button color={Color.DANGER} onClick={() => { setConfig(originalConfig); setShowDiff(false); setHasModification(false) }} disabled={!hasModification}>Revert</Button>
                        </>} />
                    {!showDiff ? (
                        <Editor
                            theme="vs-dark"
                            height="calc(100% - 40px)"
                            defaultLanguage="yaml"
                            value={config}
                            onChange={(s) => {
                                setConfig(s != null ? s : "")
                                setHasModification(true)
                            }}
                        />
                    ) : (
                        <DiffEditor
                            theme="vs-dark"
                            height="calc(100% - 38px)"
                            original={originalConfig}
                            modified={config}
                        />
                    )}
                </Card>
            }
            {selectedTab === "cargo" &&
                <Card title="Cargo" style={{ marginTop: "8px" }}>
                    <CargoTable cargo={cargo?.cargo} products={cargo?.products} />
                </Card>
            }
        </ResourceContainer>
        <ConfirmationDialog
            title="Are you sure you want to continue?"
            body="This action is irreversable"
            open={dialogOpen}
            setOpen={setDialogOpen}
            confirmAction={confirmAction}
            rejectAction={rejectAction}
        />
        <CommitDialog
            open={commitDialogOpen}
            setOpen={setCommitDialogOpen}
            confirm={() => setCommitDialogOpen(false)}
        />

    </>
};

export default Ship;