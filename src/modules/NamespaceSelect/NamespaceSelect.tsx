import { Namespace } from "../../models/namespace.model"
import { useState, useEffect } from "react"
import OtherService from "../../services/other.service"
import { useSnackbar } from "notistack"
import { Dropdown } from "../../components/Dropdown/Dropdown"
import { MenuItem } from "../../components/MenuItem/MenuItem"

export default function NamespaceSelect(props: { selected: Namespace, setSelected: (n: Namespace) => void, allowAll?: boolean }) {
    const [namespaces, setNamespaces] = useState<Namespace[]>([{ name: "*", createdAt: "", modifiedAt: "" }])
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        OtherService.listNamespaces()
            .then(r => {
                if (props.allowAll) {
                    setNamespaces([{ name: "*", createdAt: "", modifiedAt: "" }, ...r.data])
                } else {
                    setNamespaces(r.data)
                }
            })
            .catch(() => enqueueSnackbar("Could not load namespaces.", { variant: "error" }))
    }, [])

    return <Dropdown
        items={namespaces}
        selected={props.selected}
        renderer={(item) => <MenuItem onClick={() => props.setSelected(item)}>{item.name}</MenuItem>}
        stringRenderer={(item) => item.name}
    />
}