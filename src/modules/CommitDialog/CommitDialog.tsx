import { useState } from "react";
import { InputText } from "../../components/Input/InputText";
import { Dialog } from "../../components/Dialog/Dialog";
import { Label } from "../../components/Label/Label";
import Button from "../../components/Button/Button";
import { Color, Variant } from "../../components/types/types";


const CommitDialog = (props: { open: boolean, setOpen: (b: boolean) => void, confirm: (x: string) => void }) => {
    const [name, setName] = useState<string>("")

    const submit = async () => {
        props.confirm(name)
    }

    return (
        <>
            <Dialog open={props.open} setOpen={props.setOpen} title="Propose Changes" width={400}>
                <div style={{ marginBottom: "16px" }}>
                    <Label label="Message">
                        <InputText value={name} onChange={(e) => setName(e.target.value)} fill placeholder="Message" />
                    </Label>
                </div>
                <Button style={{ marginTop: "16px" }} fill onClick={submit}>Save</Button>
                <Button onClick={() => props.setOpen(false)} variant={Variant.CONTAINED} color={Color.DANGER} style={{ marginTop: "16px" }} fill>Cancel</Button>
            </Dialog>
        </>
    );
};

export default CommitDialog;