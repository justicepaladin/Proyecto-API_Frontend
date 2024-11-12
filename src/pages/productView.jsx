import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Favorito from '../components/Favorito'
import SelectorTalle from '../components/SelectorTalles'
import useNotification from '../hook/useNotification'
import { Nav } from '../Navigation/Nav'
import { darQuitarFav, getProductById } from '../services/productoService'
import { agregarItem } from '../store/carritoReducer'

export const ProductView = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [producto, setProducto] = useState()
  const [stockSeleccionado, setStockSeleccionado] = useState()
  const { showNotification } = useNotification()

  const handleSeleccionarStock = (s) => {
    if (s === stockSeleccionado) {
      setStockSeleccionado(null)
    } else {
      setStockSeleccionado(s)
    }
  }

  const handleAgregarCarrito = () => {
    const productoCarrito = {
      stockProductoId: stockSeleccionado.id,
      nombre: producto?.nombre,
      talle: stockSeleccionado?.talle,
      imagen: producto?.imagen,
      precio: producto?.precio,
      cantidad: 1,
      maxCantidad: stockSeleccionado.cantidad,
    }
    dispatch(agregarItem(productoCarrito))
    showNotification('Agregado al carrito correctamente', 'success')
  }

  const handleDarQuitarFav = () => {
    darQuitarFav(producto.id).then(() => {
      handleFetchProducto()
    })
  }

  const handleFetchProducto = async () => {
    getProductById(id).then(setProducto)
  }

  useEffect(() => {
    handleFetchProducto()
  }, [])

  return (
    <>
      <Nav />

      {producto ? (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Card>
            <Grid container spacing={2}>
              <Grid
                xs={12}
                md={4}
                size={12}
                pt={3}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <CardMedia
                  component="img"
                  image={producto?.imagen}
                  alt={producto?.nombre}
                  sx={{
                    height: '200px',
                    width: '100%',
                    objectFit: 'contain',
                    borderRadius: 1,
                    objectPosition: 'center',
                  }}
                />
              </Grid>

              <Grid xs={12} md={8} size={12}>
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Box display="flex" justifyContent="center">
                    <Typography variant="h4" gutterBottom>
                      {producto?.nombre}
                    </Typography>
                    <Favorito
                      esFavorito={producto.favorito}
                      darQuitarFav={handleDarQuitarFav}
                    />
                  </Box>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {producto?.descripcion}
                  </Typography>
                  <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
                    ${producto?.precio.toFixed(2)}
                  </Typography>

                  <Box>
                    <Typography variant="h6" textAlign="center">
                      Categorías
                    </Typography>
                    <List dense>
                      {producto?.categorias.map((categoria) => (
                        <ListItem
                          key={categoria.id}
                          sx={{ justifyContent: 'center' }}
                        >
                          <ListItemText
                            sx={{ textAlign: 'start' }}
                            primary={`${categoria.nombreGrupo}: ${categoria.nombre}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  <Container>
                    <Typography variant="h6" gutterBottom>
                      Stock Disponible
                    </Typography>
                    <Container
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: '10px',
                      }}
                    >
                      <SelectorTalle
                        stock={producto?.stock}
                        stockSeleccionado={stockSeleccionado}
                        handleSeleccionarStock={handleSeleccionarStock}
                      />
                      <Button
                        variant="contained"
                        onClick={handleAgregarCarrito}
                        disabled={
                          stockSeleccionado
                            ? stockSeleccionado?.cantidad == 0
                              ? true
                              : false
                            : true
                        }
                      >
                        Agregar al carrito
                      </Button>
                    </Container>
                  </Container>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Container>
      ) : (
        <CircularProgress />
      )}
    </>
  )
}
