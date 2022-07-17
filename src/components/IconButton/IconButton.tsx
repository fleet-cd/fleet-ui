import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button, { ButtonProps } from "../Button/Button";

interface IconButtonProps extends ButtonProps {
    icon: IconProp
    size?: number
}

export function IconButton(props: IconButtonProps) {
    const size = props.size || 14;
    return <Button {...props} style={{ ...props.style, borderRadius: "1000px", verticalAlign: "middle", fontSize: `${size}px`, lineHeight: `${size}px`, padding: "8px" }}><FontAwesomeIcon icon={props.icon} width={size} height={size} /></Button>;
}
