import { useRouter } from "next/router";
import React, { useCallback } from "react";
import ResourceTitleCard from "../../../modules/ResourceTitleCard/ResourceTitleCard";
import AuthService from "../../../services/auth.service";
import { Group, Permission } from "../../../models/auth.model";
import Card from "../../../components/Cards/Card/Card"
import PermissionsTable from "../../../modules/PermissionsTable/PermissionsTable";
import { useSnackbar } from "notistack";


const Group = () => {
    const router = useRouter();
    const { groupName } = router.query;
    const [group, setGroup] = React.useState<Group | undefined>();
    const { enqueueSnackbar } = useSnackbar();

    const pull = useCallback(() => {
        if (groupName) {
            AuthService.getGroup(groupName.toString()).then(r => {
                setGroup(r.data);
            });
        }
    }, [groupName])

    React.useEffect(() => {
        pull()
    }, [pull]);

    const removePerm = (perm: Permission, idx: number) => {
        if (!group) {
            return
        }
        AuthService.removePermissionFromGroup(group.name, idx)
            .then(() => enqueueSnackbar("Permission removed!", { variant: "success" }))
            .catch(() => enqueueSnackbar("Permission removal failed. Please try again.", { variant: "error" }))
            .finally(pull)
    }

    return <div>
        <ResourceTitleCard
            name={group?.name}
            modifiedAt={group?.modifiedAt}
            createdAt={group?.createdAt}
        />
        <Card title="Permissions" style={{ marginTop: "8px" }}>
            <PermissionsTable pull={pull} groupName={groupName ? groupName.toString() : ""} perms={group?.permissions} onDelete={removePerm} />
        </Card>
    </div>;
};

export default Group;