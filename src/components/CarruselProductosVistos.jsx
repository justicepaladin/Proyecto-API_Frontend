import React from 'react'
import { PRODUCTOS_VISTOS_ROWS_PER_PAGE } from '../constants'
import { listarProductosVistosRecientemente } from '../services/productoService'
import CarruselProductos from './CarruselProductos'
import useErrorHandler from '../hook/useErrorHandler'

const CarruselProductosVistos = () => {

  const {showErrorHandler} = useErrorHandler()
  const listarProductos = (currentPage) =>
    listarProductosVistosRecientemente(
      currentPage,
      PRODUCTOS_VISTOS_ROWS_PER_PAGE,
    ).catch(e => showErrorHandler(e.message))

  return <CarruselProductos listarProductos={listarProductos} />
}

export default CarruselProductosVistos
