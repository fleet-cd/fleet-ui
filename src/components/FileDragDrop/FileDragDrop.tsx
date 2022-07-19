import React from "react";

export default function FileDragDrop(props: {
    style?: React.CSSProperties
    file?: File
    setFile: (f: File) => void
}) {
    const [_, setDragActive] = React.useState(false);

    // handle drag events
    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            props.setFile(e.dataTransfer.files[0])
        }
    };
    return <div style={{}}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} onSubmit={(e) => e.preventDefault()}>
            <div style={{ marginTop: "10px" }}>
                Drop File Here
            </div>
            <div style={{ marginBottom: "10px" }}>
                {props.file ? `Selected file: ${props.file.name}` : "Selected file: none"}
            </div>
        </div>
    </div>
}