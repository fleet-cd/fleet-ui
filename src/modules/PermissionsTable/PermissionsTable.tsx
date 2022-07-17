import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../../components/IconButton/IconButton";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import { Column, Table } from "../../components/Table/Table";
import { Permission } from "../../models/auth.model";


export default function PermissionsTable(
    props: {
        perms?: Permission[]
        onDelete?: (perm: Permission) => void
    }
) {
    return <>
        {!props.perms || props.perms.length == 0 ? (
            <NoDataFound />
        ) : (
            <Table values={props.perms}>
                <Column key="name" title="Name" />
                <Column key="createdAt" title="Date Created" formatter={(val: Permission) => new Date(val.createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })} />
                <Column key="modifiedAt" title="Last Modified" formatter={(val: Permission) => new Date(val.modifiedAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })} />
                <Column key="actions" title="" formatter={(p: Permission) => {
                    if (props.onDelete != null) {
                        return <IconButton icon={faTrash} onClick={() => {
                            if (props.onDelete != null) {
                                props.onDelete(p)
                            }
                        }} />
                    }
                }} />
            </Table>
        )}
    </>
}