import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Modal,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { agregarItem, purgeItems } from '../store/carritoReducer'
import { ItemCarrito } from '../components/ItemCarrito'
import { efectuarCompra } from '../services/facturaService'
import { Nav } from '../Navigation/Nav'
import useErrorHandler from '../hook/useErrorHandler'

export const CartPage = () => {
  const exampleItem = {
    nombre: 'Adidas FFF',
    talle: 42,
    imagen: 'https://m.media-amazon.com/images/I/71E75yRwCDL._AC_UY575_.jpg',
    stockProductoId: 2,
    precio: '99.99',
    cantidad: 2,
  }

  const dispatch = useDispatch()
  const carrito = useSelector((state) => state.carrito.items)
  const [loading, setLoading] = useState(false)
  const [checkoutStatus, setCheckoutStatus] = useState()
  const { showErrorHandler } = useErrorHandler()

  useEffect(() => {}, [])

  const handleDoCheckout = async () => {
    setLoading(true)
    let response = await efectuarCompra(carrito).catch((e) => {showErrorHandler(e.response?.data?.message ?? e.message)})

    setLoading(false)
    if (response?.status == 201) {
      setCheckoutStatus('Compra realizada con exito!')
      dispatch(purgeItems())
    }
  }

  return (
    <>
      <Nav />

      <Typography variant="h4">Tu carrito</Typography>
      {carrito?.map((item, idx) => (
        <ItemCarrito key={idx} item={item} />
      ))}

      <Typography>
        Total: $
        {carrito.length > 0
          ? carrito
              .reduce((acumulador, producto) => {
                const precioTotalProducto =
                  parseFloat(producto.precio) * producto.cantidad
                return acumulador + precioTotalProducto
              }, 0)
              .toFixed(2)
          : 0}
      </Typography>

      <Button
        variant="contained"
        onClick={handleDoCheckout}
        disabled={carrito.length == 0}
      >
        Comprar
      </Button>
      {loading ? (
        <Backdrop
          open={loading}
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        >
          <CircularProgress />
        </Backdrop>
      ) : (
        <></>
      )}

      <Modal
        open={checkoutStatus ? true : false}
        onClose={(e) => setCheckoutStatus(null)}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-titulo" variant="h6" component="h2">
            Compra
          </Typography>
          <Typography id="modal-descripcion" sx={{ mt: 2 }}>
            {checkoutStatus}
          </Typography>
        </Box>
      </Modal>
    </>
  )
}
