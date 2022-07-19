import { useState } from "react";
import Button from "../Button/Button";
import ButtonSet from "../ButtonSet/ButtonSet";
import { Variant } from "../types/types";

export default function Tabs(props: {
    selected?: string
    setSelected?: (k: string) => void
    children: JSX.Element[]
}) {
    const [active, setActive] = useState(props.children[0])
    let controlled = false
    if (props.selected && props.setSelected) {
        controlled = true
    }

    const isSelected = (k: string) => {
        if (controlled) {
            if (props.selected === k) {
                return true
            }
            return false
        }
        return active.key === k
    }

    const setSelected = (k: JSX.Element) => {
        if (controlled && props.setSelected) {
            const key = k.key != null ? k.key.toString() : ""
            props.setSelected(key)
        } else {
            setActive(k)
        }
    }

    return <div style={{ maxWidth: "100%" }}>
        <ButtonSet>
            {props.children.map(c =>
                <Button onClick={() => setSelected(c)} key={c.key} variant={isSelected(c.key != null ? c.key.toString() : "") ? Variant.STANDARD : Variant.TEXT}>
                    {c.props.name}
                </Button>)}
        </ButtonSet>
        {!controlled && <div>
            {active.props.children}
        </div>}
    </div>
}