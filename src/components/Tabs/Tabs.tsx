import { useState } from "react";
import Button from "../Button/Button";
import ButtonSet from "../ButtonSet/ButtonSet";
import { Variant } from "../types/types";

export default function Tabs(props: { children: JSX.Element[] }) {
    const [active, setActive] = useState(props.children[0])
    return <div style={{maxWidth: "100%"}}>
        <ButtonSet style={{marginBottom: "8px"}}>
            {props.children.map(c => <Button onClick={() => setActive(c)} key={c.key} variant={active.key === c.key ? Variant.STANDARD : Variant.TEXT}>{c.props.name}</Button>)}
        </ButtonSet>
        <div>
            {active.props.children}
        </div>
    </div>
}