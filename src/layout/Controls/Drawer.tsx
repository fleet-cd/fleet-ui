import { AppBar as AB, IconButton, Toolbar, Tooltip, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { Availability, Health } from "../../models/health.model"
import HealthService from "../../services/health.service"
import CircleIcon from '@mui/icons-material/Circle';
import MenuIcon from '@mui/icons-material/Menu';
import { green, grey, red } from '@mui/material/colors';
import Link from "next/link"
import { useRouter } from "next/router"


function Drawer() {
    const [health, setHealth] = useState<Health | null>(null)
    useEffect(() => {
        HealthService.health().then(r => {
            setHealth(r.data)
        })
    }, [])
    const router = useRouter()
    if (router.pathname.includes("/login")) {
        return null
    }

    const getColor = () => {
        if (!health) {
            return grey[400]
        }
        if (health.status === Availability.AVAILABLE) {
            return green[400]
        } else {
            return red[400]
        }
    }

    return <Box sx={{ flexGrow: 1 }}>
        <AB position="static">
            <Toolbar sx={{mr: 2}}>
                <IconButton sx={{color: "white", mr: 2}}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link href="/">
                        Fleet
                </Link>
                </Typography>
                <Tooltip title={health ? `Status: ${health.status}` : "Loading Status"}>
                    <CircleIcon sx={{color: getColor(), fontSize: 16}}/>
                </Tooltip>
            </Toolbar>
        </AB>
    </Box>
}

export default Drawer
