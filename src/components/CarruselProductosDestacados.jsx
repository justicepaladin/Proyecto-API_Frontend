import React from 'react'
import { PRODUCTOS_DESTACADOS_ROWS_PER_PAGE } from '../constants'
import { listaProductosDestacados } from '../services/productoService'
import CarruselProductos from './CarruselProductos'

const CarruselProductosDestacados = () => {
  const listarProductos = (currentPage) =>
    listaProductosDestacados(currentPage, PRODUCTOS_DESTACADOS_ROWS_PER_PAGE)

  return <CarruselProductos listarProductos={listarProductos} />
}

export default CarruselProductosDestacados
