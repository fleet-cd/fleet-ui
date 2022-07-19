

export function Toolbar(props: {
    rightItems?: React.ReactNode
    leftItems?: React.ReactNode
    style?: React.CSSProperties
}) {
    return <div style={{ ...props.style, display: "flex", alignItems: "center", gap: "8px" }}>
        <div>{props.leftItems}</div>
        <div style={{ flexGrow: 1 }} />
        {props.rightItems}
    </div>
}