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
import { AiFillStar } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import CarruselProductosVistos from '../components/CarruselProductosVistos'
import CarruselProductosDestacados from '../components/CarruselProductosDestacados'
import { ProductoMiniView } from '../components/ProductosMiniView'
import { PRODUCTOS_VISTOS_ROWS_PER_PAGE } from '../constants'
import { Nav } from '../Navigation/Nav'
import {
  getCategorias,
  getProducts,
  marcarVisto,
  listarProductosVistosRecientemente,
} from '../services/productoService'
import './Products.css'

export const Products = () => {
  const [listaProductos, setListaProductos] = useState([])
  const [page, setPage] = useState(0)
  const [lastPage, setLastPage] = useState(0)
  const [tagsSeleccionados, setTagsSeleccionados] = useState([])
  const [tagsDisponibles, setTagDispoibles] = useState([])

  const [productosVistos, setProductosVistos] = useState([])
  const [pageProductosVistos, setPageProductosVistos] = useState(0)

  const navigate = useNavigate()

  // Función para agregar un producto a la lista de "Vistos Recientemente"
  const agregarProductoVisto = (producto) => {
    marcarVisto(producto.id)
  }

  const handleFetchProductos = async (page, tags) => {
    getProducts(page, tags).then((response) => {
      setLastPage(response.lastPage)
      // let categorias = response.pageItems.map(prod => prod.categorias.map(cat => cat.nombre))
      // const uniqueList = Array.from(new Set(categorias.flat()));

      // setTagDispoibles(uniqueList)

      setListaProductos(response.pageItems)
    })
  }

  const handleFetchProductosVistos = (page) => {
    listarProductosVistosRecientemente(
      page,
      PRODUCTOS_VISTOS_ROWS_PER_PAGE,
    ).then((productos) => {
      setProductosVistos(productos.pageItems)
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
    handleFetchProductosVistos(pageProductosVistos)
  }, [])

  const handleClickProducto = (producto) => {
    agregarProductoVisto(producto)
    navigate(`/product/${producto.id}`)
  }

  const handleGetCategorias = async () => {
    let response = await getCategorias()
    setTagDispoibles(response.data)
  }

  const handleSelectTag = (e) => {
    const newSelectedTags = e.target.value // Nuevo array de valores seleccionados

    setPage(0)

    setTagsSeleccionados(newSelectedTags)
    handleFetchProductos(0, newSelectedTags)
  }

  const nextPageProductosVistos = () =>
    setPageProductosVistos((prevPage) => prevPage + 1)
  const previousPageProductosVistos = () =>
    setPageProductosVistos((prevPage) => Math.max(prevPage - 1, 0))

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
        <Container
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <IconButton
            disabled={page == 0}
            onClick={(e) => handlePageChange(-1)}
          >
            <ArrowBack />
          </IconButton>
          <IconButton
            disabled={page == lastPage}
            onClick={(e) => handlePageChange(1)}
          >
            <ArrowForward />
          </IconButton>
          <Typography variant="subtitle1">Pagina: {page + 1}</Typography>

          <Select
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
          </Select>
        </Container>
        <section className="card-container">
          {listaProductos.map((producto, idx) => (
            <ProductoMiniView key={idx} producto={producto} />
          ))}
        </section>
      </section>
    </>
  )
}
