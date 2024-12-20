import { Preview } from '@mui/icons-material'
import {
  Box,
  Container,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import { useEffect, useState } from 'react'
import user_default_img from '../assets/user_default.png'
import { FaturaDetails } from '../components/FacturaDetails'
import useErrorHandler from '../hook/useErrorHandler'
import { Nav } from '../Navigation/Nav'
import { getFacturas } from '../services/facturaService'
import { getProfile } from '../services/profileService'

/**
 *
 *Mi Perfil:
 *● El usuario, una vez que se encuentre autenticado, podrá ingresar a la sección “Mi perfil”, el cual se ingresa en todo momento y desde cualquier lugar del sitio. Dicho módulo se compone de:
 *    o Datos del usuario: (Nombre, apellido, mail)
 *    o Los checkout que realizó en el sitio, informando el carrito que compro y la fecha
 *    de transacción (transacciones exitosas)
 */

export const PerfilPage = () => {
  const [profileData, setProfileData] = useState({ nombre: '', email: '' })
  const [facturas, setFacturas] = useState(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [openFacturaView, setOpenFacturaView] = useState(false)
  const [factura, setFactura] = useState()

  const { showErrorHandler } = useErrorHandler()

  const handleFetchProfile = async () => {
    let user = await getProfile().catch((e) =>
      showErrorHandler(e.response?.data?.message ?? e.message),
    )
    setProfileData(user)
  }

  const handleFetchFacturas = async () => {
    let facturas = await getFacturas(page, rowsPerPage).catch((e) =>
      showErrorHandler(e.response?.data?.message ?? e.message),
    )

    setFacturas(facturas)
  }

  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(value.target.value)
    setPage(0)
    handleFetchFacturas()
  }

  const handleChangePage = (value) => {
    setPage(value)
  }

  const handleOpenFacturaView = (factura) => {
    setOpenFacturaView(true)
    setFactura(factura)
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'rgb(255, 255, 255)',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  }

  useEffect(() => {
    handleFetchProfile()
    handleFetchFacturas()
  }, [])

  useEffect(() => {
    handleFetchFacturas()
  }, [page, rowsPerPage])

  return (
    <>
      <Nav></Nav>
      <Container
        sx={{
          backgroundColor: 'whitesmoke',
          display: 'flex',
          borderRadius: '1rem',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '1rem',
          width: '30rem',
        }}
      >
        <Box
          component={'img'}
          src={user_default_img}
          sx={{
            borderRadius: '25px',
            height: '10vh',
          }}
        />
        <Container
          sx={{
            flexDirection: 'column',
            textAlign: 'start',
          }}
        >
          <p>
            Nombre: {profileData.nombre} {profileData.apellido}
          </p>
          <p>Email: {profileData.email}</p>
        </Container>
      </Container>

      <Container sx={{ marginTop: '2rem' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Monto</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {facturas?.pageItems.map((factura) => {
                return (
                  <TableRow key={factura.id}>
                    <TableCell>{factura.id}</TableCell>
                    <TableCell>{factura.fechaCompra}</TableCell>
                    <TableCell>${factura.total}</TableCell>
                    <TableCell>
                      <IconButton
                        title="Ver detalle"
                        onClick={(e) => handleOpenFacturaView(factura)}
                      >
                        <Preview />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          labelRowsPerPage="Resultados por pagina: "
          labelDisplayedRows={(paginationInfo) =>
            console.log(paginationInfo) ||
            `Pagina ${facturas?.currentPage + 1} de ${
              facturas?.lastPage + 1
            }, Total de facturas: ${paginationInfo.count}`
          }
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={facturas?.totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, page) => handleChangePage(page)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>

      {factura ? (
        <Modal
          open={openFacturaView}
          onClose={(e) => setOpenFacturaView(false)}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: '70vw' }}>
            <h2 id="parent-modal-title">Detalle de factura</h2>
            <FaturaDetails factura={factura} />
          </Box>
        </Modal>
      ) : (
        <></>
      )}
    </>
  )
}
