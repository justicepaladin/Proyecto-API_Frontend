import React, { useState, useEffect } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { IoBagAddSharp } from 'react-icons/io5'
import './Products.css'
import { Nav } from '../Navigation/Nav'
import {
  listarProductosVistosRecientemente,
  marcarVisto,
} from '../api/products'
import { getProducts } from '../services/productoService'
import { useNavigate } from 'react-router-dom'




export const Products = () => {


  const [productosDestacados, setProductosDestacados] = useState([])
  const navigate = useNavigate()
  
  const productosVistosRecientemente = listarProductosVistosRecientemente(
    0,
    10,
  ).then((response) => {
    if (response.ok) {
      const { data } = response

      //setProductosVistosRecientes(data.pageItems)
      console.log(data.pageItems)
    }
  })

  const [filtroMarca, setFiltroMarca] = useState('')
  const [filtroEstilo, setFiltroEstilo] = useState('')
  const [filtroSegmento, setFiltroSegmento] = useState('')
  const [filtroDeporte, setFiltroDeporte] = useState('')
  const [productosVistos, setProductosVistos] = useState([])

  // Filtrar productos según la marca seleccionada
  const productosFiltrados = filtroMarca
    ? productosDestacados.filter((producto) => producto.marca === filtroMarca)
    : productosDestacados

  // Agrupar productos por marca
  const productosPorMarca = productosFiltrados.reduce((acc, producto) => {
    if (!acc[producto.marca]) {
      acc[producto.marca] = []
    }
    acc[producto.marca].push(producto)
    return acc
  }, {})

  // Función para agregar un producto a la lista de "Vistos Recientemente"
  const agregarProductoVisto = (producto) => {
    console.log(producto)
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


  const handleFetchProductos = async () => {
    // Crear un objeto de filtros basado en el estado
    const filtros = {
      marca: filtroMarca ? [filtroMarca] : ["Adidas", "Nike", "Vans", "DC", "Converse", "Reebok", "Puma"],
      estilo: filtroEstilo ? [filtroEstilo] : ["Elegante", "Casual"],
      segmento: filtroSegmento ? [filtroSegmento] : ["Niño", "Niña", "Hombre", "Mujer"],
      deporte: filtroDeporte ? [filtroDeporte] : ["Skateboarding", "Running"],
    };
  
    // Llamar a getProducts con los filtros
    getProducts(filtros).then(response => {
      setProductosDestacados(response.pageItems);
    });
  }
  

  // Recuperamos los productos vistos del localStorage al cargar el componente
  useEffect(() => {
    handleFetchProductos()
    const productosVistos =
      JSON.parse(localStorage.getItem('productosVistos')) || []
    setProductosVistos(productosVistos)
  }, [])


  const handleClickProducto = (producto) => {
    agregarProductoVisto(producto)
    navigate(`/product/${producto.id}`)
    
  }

  const ProductoMiniView = ({producto}) => {
    return <section className="card" key={producto.id} onClick={e => handleClickProducto(producto)}>
    <img
      src={producto.imagen}
      alt={producto.nombre}
      style={{height: "100px", width: "100%", objectFit: "contain"}}
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
          <del>${producto.precio + 100}</del> 
          ${producto.precio}
        </div>
      </section>
    </div>
  </section>
  }

  return (
    <>
      <Nav />

      {/* Filtro por marca */}
  
    {/* Filtro por marca */}
    <section className="filters-wrapper">
      <section className="filter-container">
        <label htmlFor="filter-marca">Filtrar por Marca:</label>
        <select
          id="filter-marca"
          value={filtroMarca}
          onChange={(e) => setFiltroMarca(e.target.value)}
        >
          <option value="">Todas las Marcas</option>
          <option value="Nike">Nike</option>
          <option value="Adidas">Adidas</option>
          <option value="DC">DC</option>
          <option value="Vans">Vans</option>
          <option value="Converse">Converse</option>
        </select>
      </section>

      <section className="filter-container">
        <label htmlFor="filter-estilo">Filtrar por Estilo:</label>
        <select
          id="filter-estilo"
          value={filtroEstilo}
          onChange={(e) => setFiltroEstilo(e.target.value)}
        >
          <option value="">Todos los Estilos</option>
          <option value="Elegante">Elegante</option>
          <option value="Casual">Casual</option>
        </select>
      </section>

      <section className="filter-container">
        <label htmlFor="filter-segmento">Filtrar por Segmento:</label>
        <select
          id="filter-segmento"
          value={filtroSegmento}
          onChange={(e) => setFiltroSegmento(e.target.value)}
        >
          <option value="">Todos los Segmentos</option>
          <option value="Niño">Niño</option>
          <option value="Niña">Niña</option>
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
        </select>
      </section>

      <section className="filter-container">
        <label htmlFor="filter-deporte">Filtrar por Deporte:</label>
        <select
          id="filter-deporte"
          value={filtroDeporte}
          onChange={(e) => setFiltroDeporte(e.target.value)}
        >
          <option value="">Todos los Deportes</option>
          <option value="Skateboarding">Skateboarding</option>
          <option value="Running">Running</option>
        </select>
      </section>
    </section>


      {/* Productos Vistos Recientemente */}
      <section className="recently-viewed">
        <h2>Vistos Recientemente</h2>
        <section className="card-container">
          {productosVistos.map((producto) => (
            <ProductoMiniView producto={producto}/>
          ))}
        </section>
      </section>

      {/* Productos por Marca */}
      <section className="card-container">
        {Object.keys(productosPorMarca).map((marca) => (
          <div key={marca}>
            <h2 className="marca-title">{marca}</h2>
            <section className="marca-productos">
              {productosPorMarca[marca].map((producto) => (
                <ProductoMiniView producto={producto}/>
              ))}
            </section>
          </div>
        ))}
      </section>
    </>
  )
}
