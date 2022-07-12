import { ReactNode } from "react"
import { Box } from "@mui/system"
import AppBar from "../AppBar/AppBar"

function Page(props: { children: ReactNode }) {
    return <>
        <AppBar />
        <Box sx={{ padding: 2 }}>
            {props.children}
        </Box>
    </>
}

export default Page
