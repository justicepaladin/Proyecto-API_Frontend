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
      // let categorias = response.pageItems.map(prod => prod.categorias.map(cat => cat.nombre))
      // const uniqueList = Array.from(new Set(categorias.flat()));

      // setTagDispoibles(uniqueList)

      setListaProductos(response.pageItems)
    })
  }

  const handlePageChange = (value) => {
    let pageNew = page + value
    setPage(pageNew)
    handleFetchProductos(pageNew)
  }

  useEffect(() => {
    handleGetCategorias()
    handleFetchProductos(page)
  }, [])

  const handleGetCategorias = async () => {
    let response = await getCategorias()
    setTagDispoibles(response.data)
  }

  const handleSelectTag = (nuevosFiltros) => {
    setPage(0)
    console.log(nuevosFiltros)
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
        {/* Productos Vistos Recientemente */}
        <CarruselProductosDestacados />
      </section>

      {/* Productos por Marca */}
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

            {/*<Select
            sx={{ marginX: '.5rem' }}
            labelId="demo-multiple-checkbox-label"
            label="filtros"
            id="demo-multiple-checkbox"
            multiple
            value={tagsSeleccionados}
            onChange={(e) => handleSelectTag(e)}
            input={<OutlinedInput label="Tag" />}
            renderValue={(e) => 'Filtro aplicado'}
            // MenuProps={MenuProps}
          >
            {tagsDisponibles.map((tag) => (
              <MenuItem key={tag.id} value={tag}>
                <Checkbox
                  checked={
                    tagsSeleccionados.find((e) => e.id == tag.id) ? true : false
                  }
                />
                <ListItemText primary={tag.nombre} />
              </MenuItem>
            ))}
                </Select>*/}
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
