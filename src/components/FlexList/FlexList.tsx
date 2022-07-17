import React from "react";

export function FlexList(props: { children?: React.ReactNode[], style?: React.CSSProperties, gap: number, justify?: "right" | "left" | "center" }) {
    return <div style={{ ...props.style, display: "flex", flexWrap: "wrap", justifyContent: props.justify, gap: `${props.gap}px` }}>
        {props.children?.map((c, i) => <div key={i}>{c}</div>)}
    </div>;
}