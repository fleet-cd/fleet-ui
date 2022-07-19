import type { NextPage } from "next";
import Card from "../../components/Cards/Card/Card";
import Button from "../../components/Button/Button";
import { Label } from "../../components/Label/Label";
import { InputText } from "../../components/Input/InputText";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import NamespaceSelect from "../../modules/NamespaceSelect/NamespaceSelect";
import { DEFAULT_NAMESPACE, Namespace } from "../../models/namespace.model";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { MenuItem } from "../../components/MenuItem/MenuItem";
import { Environment } from "../../models/system.model";
import SystemService from "../../services/system.service";
import ProductService from "../../services/product.service";

const PRODUCT_TYPES = [
    "SERVICE",
]

const Product: NextPage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const [name, setName] = useState<string>("")
    const [envs, setEnvs] = useState<Environment[] | undefined>()
    const [selectedEnv, setSelectedEnv] = useState<Environment | undefined>()
    const [namespace, setNamespace] = useState<Namespace>(DEFAULT_NAMESPACE)
    const [productType, setProductType] = useState<string>("SERVICE")

    const [nameError, setNameError] = useState<string | undefined>()

    useEffect(() => {
        SystemService.listEnvs("+name")
            .then(r => setEnvs(r.data))
            .catch(() => enqueueSnackbar("Could not fetch environments", { variant: "error" }))
    }, [])

    return (
        <>
            <Card title="Create Product">
                <div style={{ width: "100%", display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "8px" }}>
                    <Label label="Name" style={{ flexGrow: 1 }}>
                        <InputText error={nameError} fill placeholder="Name" onChange={(e) => setName(e.target.value)} value={name || ""} required />
                    </Label>
                    <Label label="Namespace" style={{ flexGrow: 1 }} >
                        <NamespaceSelect fill selected={namespace} setSelected={setNamespace} />
                    </Label>
                </div>
                <Label label="Product Type" style={{ marginBottom: "8px" }}>
                    <Dropdown
                        style={{ marginBottom: "8px" }}
                        items={PRODUCT_TYPES}
                        selected={productType}
                        renderer={(item) => <MenuItem onClick={() => setProductType(item)}>{item}</MenuItem>}
                        stringRenderer={(item) => item}
                    />
                </Label>
                {productType === "SERVICE" &&
                    <Label label="Environment" style={{ marginBottom: "8px" }}>
                        <Dropdown
                            style={{ marginBottom: "8px" }}
                            items={envs}
                            selected={selectedEnv}
                            renderer={(item) => <MenuItem onClick={() => setSelectedEnv(item)}>{item.name}</MenuItem>}
                            stringRenderer={(item) => item.name}
                        />
                    </Label>
                }
                <Button style={{ marginTop: "8px" }} onClick={() => {
                    let hasError = false
                    if (!name.match(/^[a-z0-9\\-]+$/)) {
                        setNameError("Name must be alphanumeric characters and dashes")
                        hasError = true
                    }
                    if (!selectedEnv) {
                        enqueueSnackbar("Must select environment.", { variant: "success" })
                        return
                    }
                    if (hasError) {
                        return
                    }
                    setNameError(undefined)
                    ProductService.createProduct({
                        name: name,
                        namespace: namespace.name,
                        environment: selectedEnv
                    })
                        .then(r => {
                            enqueueSnackbar("Successfully created product.", { variant: "success" })
                            router.push(`/resources/products/${r.data.frn}`);
                        })
                        .catch(() => enqueueSnackbar("Product creation failed. Please try again.", { variant: "error" }))
                }}>
                    Create
                </Button>
            </Card>
        </>
    );
};

export default Product;