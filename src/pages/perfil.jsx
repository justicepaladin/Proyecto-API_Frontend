import { Box, Button, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material"
import CreateIcon from '@mui/icons-material/Create';
import user_default_img from "../assets/user_default.png"
import { useEffect, useState } from "react";
import { getProfile } from "../services/profileService";
import { getFacturas } from "../services/facturaService";
import { Preview, Visibility } from "@mui/icons-material";

/**
 * 
 *Mi Perfil:
 *● El usuario, una vez que se encuentre autenticado, podrá ingresar a la sección “Mi perfil”, el cual se ingresa en todo momento y desde cualquier lugar del sitio. Dicho módulo se compone de:
 *    o Datos del usuario: (Nombre, apellido, mail)
 *    o Los checkout que realizó en el sitio, informando el carrito que compro y la fecha
 *    de transacción (transacciones exitosas)
 */

export const PerfilPage = () => {
    const [profileData, setProfileData] = useState({nombre: "", email: ""})
    const [facturas, setFacturas] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)


    const handleFetchProfile = async () => {
        let user = await getProfile()
        setProfileData(user)
    }

    const handleFetchFacturas = async () => {
        let facturas = await getFacturas(page, rowsPerPage)
        setFacturas(facturas)
    }

    const handleChangeRowsPerPage = (value) => {
        setRowsPerPage(value.target.value)
    }

    const handleChangePage = (value) => {
        setPage(value.target.value)
    }

    useEffect(() => {
        handleFetchProfile()
        handleFetchFacturas()
    }, [])
    return <>

        
        <Container sx={{
            backgroundColor: "whitesmoke",
            display: "flex",
            borderRadius: "1rem",
            flexDirection: "row",
            alignItems: "center",
            padding: "1rem",
            width: "30rem"

        }}>
            <Box
                component={"img"}
                src={user_default_img}
                sx={{
                    borderRadius: "25px",
                    height: "10vh"
                }}
            />
            <Container sx={{
                flexDirection: "column",
                textAlign: "start",
            }}>
                <p>Nombre: {profileData.nombre}</p>
                <p>Email: {profileData.email}</p>
                
            </Container>

            <IconButton title="Editar informacion">
                <CreateIcon/>
            </IconButton>

        </Container>


        <Container sx={{marginTop: "2rem"}}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Vendedor</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Monto</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {facturas.map(factura => {
                            return <TableRow key={factura.id}>
                                <TableCell>{factura.id}</TableCell>
                                <TableCell>{factura.vendedor}</TableCell>
                                <TableCell>{factura.fechaCompra}</TableCell>
                                <TableCell>{factura.total}</TableCell>
                                <TableCell>
                                    <IconButton title="Ver detalle">
                                        <Preview/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={facturas.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
        </Container>
    </>
}