import type { NextPage } from "next";
import Card from "../../components/Cards/Card/Card";
import Button from "../../components/Button/Button";
import { Label } from "../../components/Label/Label";
import { InputText } from "../../components/Input/InputText";
import { useState } from "react";
import ShipService from "../../services/ship.service";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";


const Ship: NextPage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const [name, setName] = useState<string>("")
    const [namespace, setNamespace] = useState<string>("default")

    const [nameError, setNameError] = useState<string | undefined>()
    const [namespaceError, setNamespaceError] = useState<string | undefined>()

    return (
        <>
            <Card title="Create Ship">
                <div style={{ width: "100%", display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <Label label="Name" style={{ flexGrow: 1 }}>
                        <InputText error={nameError} fill placeholder="Name" onChange={(e) => setName(e.target.value)} value={name || ""} required />
                    </Label>
                    <Label label="Namespace" style={{ flexGrow: 1 }} >
                        <InputText error={namespaceError} fill placeholder="Namespace" onChange={(e) => setNamespace(e.target.value)} value={namespace || ""} />
                    </Label>
                </div>
                <Button onClick={() => {
                    let hasError = false
                    if (!name.match(/^[a-z0-9\\-]+$/)) {
                        setNameError("Name must be alphanumeric characters and dashes")
                        hasError = true
                    }
                    if (!namespace.match(/^[a-z0-9\\-]+$/)) {
                        setNamespaceError("Namespace must be alphanumeric characters and dashes")
                        hasError = true
                    }
                    if (hasError) {
                        return
                    }
                    setNameError(undefined)
                    setNamespaceError(undefined)
                    ShipService.createShip({
                        name: name,
                        namespace: namespace,
                        tags: []
                    })
                        .then(r => {
                            enqueueSnackbar("Successfully created ship.", { variant: "success" })
                            router.push(`/resources/ships/${r.data.frn}`);
                        })
                        .catch(() => enqueueSnackbar("Ship creation failed. Please try again.", { variant: "error" }))
                }}>
                    Create
                </Button>
            </Card>
        </>
    );
};

export default Ship;