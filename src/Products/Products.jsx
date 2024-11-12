import React, { useState, useEffect } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { IoBagAddSharp } from 'react-icons/io5'
import './Products.css'
import { Nav } from '../Navigation/Nav'
import {
  listarProductosVistosRecientemente,
  marcarVisto,
} from '../api/products'
import { getCategorias, getProducts } from '../services/productoService'
import { useNavigate } from 'react-router-dom'
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
import { ArrowBack, ArrowForward } from '@mui/icons-material'

export const Products = () => {
  const [listaProductos, setListaProductos] = useState([])
  const [page, setPage] = useState(0)
  const [lastPage, setLastPage] = useState(0)
  const [tagsSeleccionados, setTagsSeleccionados] = useState([])
  const [tagsDisponibles, setTagDispoibles] = useState([])
  const navigate = useNavigate()

  const [productosVistos, setProductosVistos] = useState([])

  // Función para agregar un producto a la lista de "Vistos Recientemente"
  const agregarProductoVisto = (producto) => {
    marcarVisto(producto.id)

    const productosVistos =
      JSON.parse(localStorage.getItem('productosVistos')) || []

    // Si el producto ya está en la lista, lo removemos y lo agregamos al final
    const index = productosVistos.findIndex((p) => p.id === producto.id)
    if (index !== -1) {
      productosVistos.splice(index, 1)
    }

    // Agregar el nuevo producto al inicio de la lista
    productosVistos.unshift(producto)

    // Limitamos el número de productos vistos a 5 (por ejemplo)
    if (productosVistos.length > 5) {
      productosVistos.pop()
    }

    // Guardamos la lista en el localStorage
    localStorage.setItem('productosVistos', JSON.stringify(productosVistos))

    // Actualizamos el estado
    setProductosVistos(productosVistos)
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

  const handlePageChange = (value) => {
    let pageNew = page + value
    setPage(pageNew)
    handleFetchProductos(pageNew)
  }

  // Recuperamos los productos vistos del localStorage al cargar el componente
  useEffect(() => {
    handleGetCategorias()
    handleFetchProductos(page)
    const productosVistos =
      JSON.parse(localStorage.getItem('productosVistos')) || []
    setProductosVistos(productosVistos)
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

  const ProductoMiniView = ({ producto }) => {
    return (
      <section
        className="card"
        key={producto.id}
        onClick={(e) => handleClickProducto(producto)}
      >
        <img
          src={producto.imagen}
          alt={producto.nombre}
          style={{ height: '100px', width: '100%', objectFit: 'contain' }}
          className="card-img"
        />
        <div className="card-details">
          <h3 className="card-title">{producto.nombre}</h3>
          <section className="card-reviews">
            {[...Array(producto.rating)].map((_, index) => (
              <AiFillStar key={index} className="ratings-star" />
            ))}
            <span className="total-reviews"> {producto.rating}</span>
          </section>
          <section className="card-price">
            <div className="price">
              <del>${producto.precio + 100}</del>${producto.precio}
            </div>
          </section>
        </div>
      </section>
    )
  }

  return (
    <>
      <Nav />

      {/* Productos Vistos Recientemente */}
      <section className="recently-viewed">
        <h2>Vistos Recientemente</h2>
        <section className="card-container">
          {productosVistos.map((producto, idx) => (
            <ProductoMiniView key={idx} producto={producto} />
          ))}
        </section>
      </section>

      {/* Productos por Marca */}
      <section className="recently-viewed">
        <h2>Productos:</h2>
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
