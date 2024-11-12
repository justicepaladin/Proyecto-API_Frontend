import { ArrowBack, ArrowForward } from '@mui/icons-material'
import {
  Checkbox,
  Container,
  IconButton,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import CarruselProductosDestacados from '../components/CarruselProductosDestacados'
import CarruselProductosVistos from '../components/CarruselProductosVistos'
import FiltroCategorias from '../components/FiltroCategorias'
import { ProductoMiniView } from '../components/ProductosMiniView'
import { Nav } from '../Navigation/Nav'
import { getCategorias, getProducts } from '../services/productoService'
import './Products.css'

export const Products = () => {
  const [listaProductos, setListaProductos] = useState([])
  const [page, setPage] = useState(0)
  const [lastPage, setLastPage] = useState(0)
  const [tagsSeleccionados, setTagsSeleccionados] = useState([])
  const [tagsDisponibles, setTagDispoibles] = useState([])

  const handleFetchProductos = async (page, tags) => {
    getProducts(page, tags).then((response) => {
      setLastPage(response.lastPage)

      setListaProductos(response.pageItems)
    })
  }

  const handlePageChange = (value) => {
    let pageNew = page + value
    setPage(pageNew)
    handleFetchProductos(pageNew, tagsSeleccionados)
  }

  useEffect(() => {
    handleGetCategorias()
    handleFetchProductos(page, tagsSeleccionados)
  }, [])

  const handleGetCategorias = async () => {
    let response = await getCategorias()
    setTagDispoibles(response.data)
  }

  const handleSelectTag = (nuevosFiltros) => {
    setPage(0)
    setTagsSeleccionados(nuevosFiltros)
    handleFetchProductos(0, nuevosFiltros)
  }

  const Paginado = () => (
    <>
      <IconButton disabled={page == 0} onClick={(e) => handlePageChange(-1)}>
        <ArrowBack />
      </IconButton>
      <IconButton
        disabled={page == lastPage}
        onClick={(e) => handlePageChange(1)}
      >
        <ArrowForward />
      </IconButton>
      <Typography variant="subtitle1">Pagina: {page + 1}</Typography>
    </>
  )

  return (
    <>
      <Nav />

      <section className="recently-viewed">
        <h2>Vistos Recientemente</h2>
        <CarruselProductosVistos />
      </section>

      <section className="recently-viewed">
        <h2>Destacados</h2>
        <CarruselProductosDestacados />
      </section>

      <section className="recently-viewed">
        <h2>Productos</h2>
        <Container sx={{ display: 'flex', alignItems: 'start' }}>
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '20%',
            }}
          >
            <FiltroCategorias
              categorias={tagsDisponibles}
              onActualizarFiltros={handleSelectTag}
            />
          </Container>
          <Container sx={{ width: '100%' }}>
            <Paginado />
            <section className="card-container">
              {listaProductos.map((producto, idx) => (
                <ProductoMiniView key={idx} producto={producto} />
              ))}
            </section>
          </Container>
        </Container>
      </section>
    </>
  )
}
