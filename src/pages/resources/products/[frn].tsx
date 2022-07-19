import { useRouter } from "next/router";
import React from "react";
import { Color } from "../../../components/types/types";
import { ConfirmationDialog } from "../../../components/Dialog/ConfirmationDialog";
import { Toolbar } from "../../../layout/Toolbar/Toolbar";
import { IconButton } from "../../../components/IconButton/IconButton";
import { faCaretLeft, faCaretRight, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import ResourceContainer from "../../../modules/ResourceContainer/ResourceContainer";
import Tabs from "../../../components/Tabs/Tabs";
import Tab from "../../../components/Tabs/Tab";
import { Product, Version } from "../../../models/product.model";
import ProductService from "../../../services/product.service";
import { LabelString } from "../../../components/LabelString/LabelString";
import Skeleton from "react-loading-skeleton";
import { FlexList } from "../../../components/FlexList/FlexList";
import Card from "../../../components/Cards/Card/Card";
import { Column, Table } from "../../../components/Table/Table";
import UploadDialog from "../../../modules/UploadDialog/UploadDialog";
import { semverSortVersions } from "../../../utils/versions";


const Product = () => {
    const router = useRouter();
    const { frn } = router.query;
    const [selectedTab, setSelectedTab] = React.useState("overview")
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [uploadOpen, setUploadOpen] = React.useState(false);
    const [product, setProduct] = React.useState<Product | undefined>();
    const [versions, setVersions] = React.useState<Version[]>([]);
    React.useEffect(() => {
        if (frn) {
            ProductService.getProduct(frn.toString(), true).then(r => {
                setProduct(r.data.product);
                setVersions(semverSortVersions(r.data.versions))
            });
        }
    }, [frn, uploadOpen]);


    const confirm = () => {
        setDialogOpen(true);
    };

    const confirmAction = () => {
        if (!frn) {
            return;
        }
    };

    const rejectAction = () => {
        setDialogOpen(false);
    };


    return <>
        <ResourceContainer
            hasFrn
            open={sidebarOpen}
            name={product?.name}
            frn={product?.frn}
            createdAt={product?.createdAt}
            modifiedAt={product?.modifiedAt}
            actions={<IconButton icon={faTrash} color={Color.DANGER} onClick={confirm} />}
            more={<FlexList gap={24} style={{ marginTop: "24px" }}>
                <LabelString label="Environment">{product ? product.environment.name : <Skeleton />}</LabelString>
                <LabelString label="Image">{product ? product.environment.image : <Skeleton />}</LabelString>
            </FlexList>}
        >
            <Toolbar
                style={{ marginBottom: "8px" }}
                leftItems={<Tabs selected={selectedTab} setSelected={setSelectedTab}>
                    <Tab name="Overview" key="overview" />
                    <Tab name="Versions" key="versions" />
                </Tabs>}
                rightItems={<>
                    <IconButton icon={sidebarOpen ? faCaretRight : faCaretLeft} onClick={() => setSidebarOpen(!sidebarOpen)} />
                </>}
            />
            {selectedTab === "versions" &&
                <Card title="Versions">
                    <Table values={versions}>
                        <Column key="version" title="Version" />
                        <Column key="createdAt" title="Date Created" formatter={(val: Version) => new Date(val.createdAt).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })} />
                        <Column key="modifiedAt" title="Last Modified" formatter={(val: Version) => new Date(val.modifiedAt).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })} />
                        <Column key="hasArtifact" title="Has Artifact?" formatter={(val: Version) => (val.artifactLocation !== "").toString()} />
                        <Column align="right" key="action" title={<IconButton icon={faUpload} onClick={() => setUploadOpen(true)} />} />
                    </Table>
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
        <UploadDialog
            highestVersion={versions[0] ? versions[0].version : "0.0.0"}
            productFrn={frn ? frn.toString() : ""}
            open={uploadOpen}
            setOpen={setUploadOpen}
        />

    </>
};

export default Product;