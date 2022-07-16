import React from "react";

interface ColProps { size?: number, children: React.ReactNode }

export const Col = ({size = 12, children = []}: ColProps) => {
    return <div style={{flexGrow: 1, flexBasis: `${size/12*100}%`}}>
        {children}
    </div>;
};
