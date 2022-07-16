import React from "react";

interface RowProps { gutter?: string, children: React.ReactNode }

export const Row = ({gutter = "8px", children = []}: RowProps) => {
    return <div style={{display: "flex", alignItems: "center", gap: gutter}}>
        {children}
    </div>;
};
