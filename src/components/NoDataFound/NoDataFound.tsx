import { Typography } from '@mui/material'
import { Box } from '@mui/system';

const NoDataFound = () => {
    return (
        <Box sx={{display: "flex", alignItems: "center", width: "100%", flexDirection: "column", my: 4}}>
            <Typography variant="h5">
                No Data Found
            </Typography>
        </Box>
    )
}

export default NoDataFound
