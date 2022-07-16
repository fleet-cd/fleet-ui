import { useRouter } from "next/router";
import React from "react";
import Card from "../../../components/Cards/Card/Card";
import { FlexList } from "../../../components/FlexList/FlexList";
import { Ship } from "../../../models/ship.model";
import ShipService from "../../../services/ship.service";
import { LabelString } from "../../../components/LabelString/LabelString";
import Tag from "../../../components/Tag/Tag";
import Button from "../../../components/Button/Button";
import { Intent, Variant } from "../../../components/types/types";
import { ConfirmationDialog } from "../../../components/Dialog/ConfirmationDialog";
import Skeleton from "../../../components/Skeleton/Skeleton";


const Ship = () => {
    const router = useRouter();
    const { frn } = router.query;
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [ship, setShip] = React.useState<Ship | undefined>();
    React.useEffect(() => {
        if (frn) {
            ShipService.getShip(frn.toString()).then(r => {
                setShip(r.data);
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
        });
    };

    const rejectAction = () => {
        setDialogOpen(false);
    };


    return <div>
        <Card button={<Button variant={Variant.CONTAINED} intent={Intent.DANGER} onClick={confirm}>Delete</Button>} title={`${ship?.namespace}/${ship?.name}` || <Skeleton />} subTitle={ship?.frn || <Skeleton />}>
            <FlexList gap={24}>
                <LabelString label="Date Created">
                    {ship && `${new Date(ship?.modifiedAt).toLocaleTimeString()} ${new Date(ship?.createdAt).toLocaleDateString()}` || <Skeleton />}
                </LabelString>
                <LabelString label="Last Modified">
                    {ship && `${new Date(ship?.modifiedAt).toLocaleTimeString()} ${new Date(ship?.modifiedAt).toLocaleDateString()}` || <Skeleton />}
                </LabelString>
            </FlexList>
            <FlexList gap={8} style={{ marginTop: "8px" }}>
                {ship?.tags.map(t => <Tag key={t}>{t}</Tag>)}
            </FlexList>
        </Card>
        <ConfirmationDialog
            title="Are you sure you want to continue?" 
            body="This action is irreversable" 
            open={dialogOpen} 
            setOpen={setDialogOpen}
            confirmAction={confirmAction}
            rejectAction={rejectAction}
        />
    </div>;
};

export default Ship;