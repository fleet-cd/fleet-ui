import { useRouter } from "next/router";
import React from "react";
import { FlexList } from "../../../components/FlexList/FlexList";
import { Ship } from "../../../models/ship.model";
import ShipService from "../../../services/ship.service";
import Tag from "../../../components/Tag/Tag";
import Button from "../../../components/Button/Button";
import { Intent, Variant } from "../../../components/types/types";
import { ConfirmationDialog } from "../../../components/Dialog/ConfirmationDialog";
import ResourceTitleCard from "../../../modules/ResourceTitleCard/ResourceTitleCard";
import { enqueueSnackbar } from "notistack";


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
        })
            .catch(() => enqueueSnackbar("Could not delete ship. Please contact your system administrator.", { variant: "error" }))
            .finally(() => setDialogOpen(false))
    };

    const rejectAction = () => {
        setDialogOpen(false);
    };


    return <div>
        <ResourceTitleCard
            hasFrn
            name={`${ship?.namespace}/${ship?.name}`}
            frn={ship?.frn}
            modifiedAt={ship?.modifiedAt}
            createdAt={ship?.createdAt}
            actions={<Button variant={Variant.CONTAINED} intent={Intent.DANGER} onClick={confirm}>Delete</Button>}
        >
            <FlexList gap={8}>
                {ship?.tags.map(t => <Tag key={t}>{t}</Tag>)}
            </FlexList>
        </ResourceTitleCard>
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