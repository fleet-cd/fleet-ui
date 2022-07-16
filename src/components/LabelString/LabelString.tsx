export function LabelString(props: { label: string, children: React.ReactNode }) {
    return <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
        <div style={{
            fontWeight: 400,
            color: "#6c757d",
            fontSize: "14px"
        }}>
            {props.label}
        </div>
        <div style={{fontWeight: 600, fontSize: "18px"}}>
            {props.children}
        </div>
    </div>;
}