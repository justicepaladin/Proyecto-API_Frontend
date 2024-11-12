import React from 'react'
import { PRODUCTOS_VISTOS_ROWS_PER_PAGE } from '../constants'
import { listarProductosVistosRecientemente } from '../services/productoService'
import CarruselProductos from './CarruselProductos'

const CarruselProductosVistos = () => {
  const listarProductos = (currentPage) =>
    listarProductosVistosRecientemente(
      currentPage,
      PRODUCTOS_VISTOS_ROWS_PER_PAGE,
    )

  return <CarruselProductos listarProductos={listarProductos} />
}

export default CarruselProductosVistos