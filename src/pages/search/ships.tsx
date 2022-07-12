import { Search } from '@mui/icons-material'
import { Card, IconButton, InputAdornment, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import NoDataFound from '../../components/NoDataFound/NoDataFound'
import LaunchIcon from '@mui/icons-material/Launch';
import { Ship } from '../../models/ship.model'
import ShipService from '../../services/ship.service'

const Ships: NextPage = () => {
    const [ships, setShips] = useState<Ship[] | null>([])
    useEffect(() => {
        ShipService.listShips(0, 50).then(r => {
            const items = r.data.items.length ? r.data.items : []
            setShips(items)
        })
    }, [])
    return (
        <>
            <TextField variant="outlined" sx={{ mb: 2 }} fullWidth InputProps={{
                endAdornment:
                    <InputAdornment position="end">
                        <Search />
                    </InputAdornment>
            }} />
            <Card>
                {!ships || ships.length == 0 ? (
                    <NoDataFound />
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>FRN</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Namespace</TableCell>
                                <TableCell align="right">Date Created</TableCell>
                                <TableCell align="right">Last Modified</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ships.map(s => <TableRow key={s.frn}>
                                <TableCell>{s.frn}</TableCell>
                                <TableCell align="right">{s.name}</TableCell>
                                <TableCell align="right">{s.namespace}</TableCell>
                                <TableCell align="right">{s.modifiedAt.toString()}</TableCell>
                                <TableCell align="right">{s.createdAt.toString()}</TableCell>
                                <TableCell align="right"><IconButton><LaunchIcon sx={{fontSize: 20}} /></IconButton></TableCell>
                            </TableRow>)}
                        </TableBody>
                    </Table>
                )}
            </Card>
        </>
    )
}

export default Ships