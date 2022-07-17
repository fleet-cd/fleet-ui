import { useRouter } from "next/router";
import React, { useCallback } from "react";
import ResourceTitleCard from "../../../modules/ResourceTitleCard/ResourceTitleCard";
import { Group, User } from "../../../models/auth.model";
import Card from "../../../components/Cards/Card/Card"
import { enqueueSnackbar } from "notistack";
import UserService from "../../../services/user.service";
import QuickTable from "../../../modules/QuickTable/PermissionsTable";
import { FlexList } from "../../../components/FlexList/FlexList";
import { IconButton } from "../../../components/IconButton/IconButton";
import { faAdd, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddGroupDialog from "../../../modules/AddGroupDialog/AddGroupDialog";


const User = () => {
    const router = useRouter();
    const { userFrn } = router.query;
    const [addGroupOpen, setAddGroupOpen] = React.useState(false);
    const [user, setUser] = React.useState<User | undefined>();

    const pull = useCallback(() => {
        if (userFrn) {
            UserService.getUser(userFrn.toString()).then(r => {
                setUser(r.data);
            });
        }
    }, [userFrn])

    React.useEffect(() => {
        pull()
    }, [pull]);

    const goToGroup = (p: string) => {
        router.push(`/resources/groups/${p}`)
    }

    const removeGroup = (p: string) => {
        if (!user) {
            return
        }
        UserService.removeGroup(user.frn, p)
            .then(() => enqueueSnackbar("Group removed!", { variant: "success" }))
            .catch(() => enqueueSnackbar("Group removal failed. Please try again.", { variant: "error" }))
            .finally(pull)
    }

    const addGroup = (p?: Group) => {
        if (!user) {
            return
        }
        if (!p) {
            return
        }
        UserService.addGroup(user.frn, p.name)
            .then(() => enqueueSnackbar("Group added!", { variant: "success" }))
            .catch(() => enqueueSnackbar("Group addition failed. Please try again.", { variant: "error" }))
            .finally(() => {
                pull()
                setAddGroupOpen(false)
            })
    }

    return <div>
        <ResourceTitleCard
            name={user?.name}
            modifiedAt={user?.modifiedAt}
            createdAt={user?.createdAt}
        />
        <Card title="Groups" style={{ marginTop: "8px" }}>
            <QuickTable
                items={user?.groups}
                cols={
                    [
                        { key: "name", title: "Name", formatter: (i: string) => i },
                        {
                            key: "actions", align: "right", title: <IconButton icon={faAdd} onClick={() => setAddGroupOpen(true)} />, formatter: (name: string) => <>
                                <FlexList justify="right" gap={16}>
                                    <IconButton icon={faEye} onClick={() => goToGroup(name)} />
                                    <IconButton icon={faTrash} onClick={() => removeGroup(name)} />
                                </FlexList>
                            </>
                        }
                    ]
                }
            />
        </Card>
        <AddGroupDialog open={addGroupOpen} setOpen={setAddGroupOpen} confirm={addGroup} />
    </div>;
};

export default User;