import React from "react";

export function FlexList(props: {children?: React.ReactNode[], style?: React.CSSProperties, gap: number}) {
    return <div style={{...props.style, display: "flex", flexWrap: "wrap" }}>
        {props.children?.map((c, i) => <div style={{marginRight: i != props.children?.length ? `${props.gap}px` : 0}} key={i}>{c}</div>)}
    </div>;
}