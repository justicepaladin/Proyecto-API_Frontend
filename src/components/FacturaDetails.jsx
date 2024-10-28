import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from '@mui/material'

export const FaturaDetails = ({factura}) => {
    return <Container>

        <Container sx={{display:"flex", flexDirection: 'row', justifyContent:"space-between"}}>
            <h6>Fecha compra: {factura.fechaCompra}</h6>
            <h6>Total: ${factura.total}</h6>
        </Container>

        <TableContainer>
            <Table>
            <TableHead>
                <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Descripcion</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Unidades</TableCell>
                <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {factura.items.map((item) => {
                return (
                    <TableRow key={item.idProducto}>
                    <TableCell>{item.idProducto}</TableCell>
                    <TableCell>{item.descripcion}</TableCell>
                    <TableCell>{item.precioUnidad}</TableCell>
                    <TableCell>{item.unidad}</TableCell>
                    </TableRow>
                )
                })}
            </TableBody>
            </Table>
        </TableContainer>
    </Container>
}