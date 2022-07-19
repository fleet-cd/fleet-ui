import type { NextPage } from "next";
import Card from "../../components/Cards/Card/Card";
import Button from "../../components/Button/Button";
import { Label } from "../../components/Label/Label";
import { InputText } from "../../components/Input/InputText";
import { useState } from "react";
import ShipService from "../../services/ship.service";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import NamespaceSelect from "../../modules/NamespaceSelect/NamespaceSelect";
import { DEFAULT_NAMESPACE, Namespace } from "../../models/namespace.model";


const Ship: NextPage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const [name, setName] = useState<string>("")
    const [namespace, setNamespace] = useState<Namespace>(DEFAULT_NAMESPACE)
    const [repoOwner, setRepoOwner] = useState<string>("")
    const [repo, setRepo] = useState<string>("")

    const [nameError, setNameError] = useState<string | undefined>()

    return (
        <>
            <Card title="Create Ship">
                <div style={{ width: "100%", display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <Label label="Name" style={{ flexGrow: 1 }}>
                        <InputText error={nameError} fill placeholder="Name" onChange={(e) => setName(e.target.value)} value={name || ""} required />
                    </Label>
                    <Label label="Namespace" style={{ flexGrow: 1 }} >
                        <NamespaceSelect fill selected={namespace} setSelected={setNamespace} />
                    </Label>
                </div>
                <div style={{ width: "100%", display: "flex", alignItems: "flex-start", gap: "16px", margin: "16px 0" }}>
                    <Label label="Repo Owner" style={{ flexGrow: 1 }}>
                        <InputText fill placeholder="Repo Owner" onChange={(e) => setRepoOwner(e.target.value)} value={repoOwner || ""} required />
                    </Label>
                    <Label label="Repo" style={{ flexGrow: 1 }} >
                        <InputText fill placeholder="Repo" onChange={(e) => setRepo(e.target.value)} value={repo || ""} required />
                    </Label>
                </div>
                <Button onClick={() => {
                    let hasError = false
                    if (!name.match(/^[a-z0-9\\-]+$/)) {
                        setNameError("Name must be alphanumeric characters and dashes")
                        hasError = true
                    }
                    if (hasError) {
                        return
                    }
                    setNameError(undefined)
                    ShipService.createShip({
                        name: name,
                        namespace: namespace.name,
                        tags: [],
                        source: {
                            repo,
                            owner: repoOwner
                        }
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