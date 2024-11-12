import { Add, Delete, Remove } from '@mui/icons-material'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  Typography,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { eliminarItem, modificarCantidad } from '../store/carritoReducer'

export const ItemCarrito = ({ item }) => {
  const dispatch = useDispatch()

  const handleModificarCantidad = (item, mod) => {
    let modItem = { ...item, cantidad: item.cantidad + mod }
    if (modItem.cantidad == 0) {
      handleEliminarItem()
    } else {
      dispatch(modificarCantidad(modItem))
    }
  }

  const handleEliminarItem = () => {
    dispatch(eliminarItem(item.stockProductoId))
  }

  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'row',
        padding: '1rem',
        position: 'relative',
        margin: '.4rem',
      }}
    >
      <IconButton
        title="Eliminar"
        onClick={handleEliminarItem}
        style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
      >
        <Delete color="error" />
      </IconButton>

      <CardMedia
        component="img"
        style={{ width: '25%', height: 'auto', objectFit: 'cover' }}
        image={item.imagen}
      />

      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          paddingLeft: '1rem',
        }}
      >
        <Typography>{item.nombre}</Typography>
        <Typography>Talle: {item.talle}</Typography>
        <Typography>Precio por unidad: {item.precio}</Typography>

        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 'auto',
          }}
        >
          <Typography>Cantidad:</Typography>
          {console.log(item)}
          <IconButton
            onClick={() => handleModificarCantidad(item, -1)}
            disabled={item.cantidad === 1}
          >
            <Remove />
          </IconButton>

          <Typography
            style={{ padding: '0.5rem', textAlign: 'center', width: '2rem' }}
          >
            {item.cantidad}
          </Typography>

          <IconButton
            onClick={() => handleModificarCantidad(item, 1)}
            disabled={item.cantidad >= item.maxCantidad}
          >
            <Add />
          </IconButton>
        </Box>
      </Box>
    </Card>
  )
}
