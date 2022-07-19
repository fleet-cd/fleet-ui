/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Dialog } from "../../components/Dialog/Dialog";
import { Label } from "../../components/Label/Label";
import Button from "../../components/Button/Button";
import { Color, Variant } from "../../components/types/types";
import { useSnackbar } from "notistack";
import { InputText } from "../../components/Input/InputText";
import ProductService from "../../services/product.service";
import Editor from "@monaco-editor/react";
import yaml from 'js-yaml'
import Card from "../../components/Cards/Card/Card";
import FileDragDrop from "../../components/FileDragDrop/FileDragDrop";


const UploadDialog = (props: { open: boolean, setOpen: (b: boolean) => void, productFrn: string, highestVersion: string }) => {


    const { enqueueSnackbar } = useSnackbar()
    const [version, setVersion] = useState<string>("0.0.0")

    useEffect(() => {
        const verionExtract = /^(\d+\.\d+.\d+).*$/.exec(props.highestVersion)
        let ver = "0.0.0"
        if (verionExtract) {
            ver = verionExtract[0]
        }
        const versionSplit = ver.split(".")
        versionSplit[1] = (parseInt(versionSplit[1], 10) + 1).toString()
        setVersion(versionSplit.join("."))
    }, [props.highestVersion])


    const [selectedArtifact, setSelectedArtifact] = useState<File | undefined>()
    const [deps, setDeps] = useState<string>(`# define dependencies
    # example:
    # MY-PRODUCT-NAME:
    #   minVersion: 0.1.0 (OPTIONAL)
    #   maxVersion: 1.0.0 (OPTIONAL)
`);

    const submit = () => {
        const data = yaml.load(deps) as { [x: string]: { minVersion?: string, maxVersion?: string } }
        ProductService.createVersion(props.productFrn, {
            version,
            dependencies: data
        })
            .then((r) => {
                if (selectedArtifact) {
                    ProductService.uploadVersionArtifact(props.productFrn, r.data.frn, selectedArtifact)
                        .then(() => enqueueSnackbar(`Version ${version} created!`, { variant: "success" }))
                        .catch(() => enqueueSnackbar(`Artifact file upload failed.`, { variant: "error" }))
                        .finally(() => props.setOpen(false))
                } else {
                    enqueueSnackbar(`Version ${version} created!`, { variant: "success" })
                    props.setOpen(false)
                }
            })
            .catch(() => enqueueSnackbar(`Creating version ${version} failed.`, { variant: "error" }))

    }

    return (
        <>
            <Dialog open={props.open} setOpen={props.setOpen} title="Create Namespace" width={600}>
                <div style={{ marginBottom: "16px" }}>
                    <Label label="Version (Autofilled, please verify)">
                        <InputText placeholder="0.0.0" value={version} onChange={(e) => setVersion(e.target.value)} />
                    </Label>
                </div>
                <div style={{ marginBottom: "16px" }}>
                    <Label label="Dependencies">
                        <Editor
                            height="200px"
                            theme="vs-dark"
                            language="yaml"
                            value={deps}
                            onChange={(v) => setDeps(v ? v : "")}
                        />
                    </Label>
                </div>
                <Card>
                    <FileDragDrop file={selectedArtifact} setFile={setSelectedArtifact} />
                </Card>
                <Button style={{ marginTop: "16px" }} fill onClick={submit}>Save</Button>
                <Button onClick={() => props.setOpen(false)} variant={Variant.CONTAINED} color={Color.DANGER} style={{ marginTop: "16px" }} fill>Cancel</Button>
            </Dialog>
        </>
    );
};

export default UploadDialog;