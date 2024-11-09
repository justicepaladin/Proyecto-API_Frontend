import React, { useState, useEffect } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { IoBagAddSharp } from 'react-icons/io5'
import './Products.css'
import { Nav } from '../Navigation/Nav'
import {
  listarProductosVistosRecientemente,
  marcarVisto,
} from '../api/products'

export const Products = () => {
  const productosDestacados = [
    {
      id: 1,
      nombre: 'Zapatilla Air Max',
      marca: 'Nike',
      precioOriginal: 300,
      precioDescuento: 200,
      imagen: 'https://m.media-amazon.com/images/I/71E75yRwCDL._AC_UY575_.jpg',
      rating: 4,
    },
    {
      id: 2,
      nombre: 'Zapatilla UltraBoost',
      marca: 'Adidas',
      precioOriginal: 150,
      precioDescuento: 100,
      imagen: 'https://m.media-amazon.com/images/I/71E75yRwCDL._AC_UY575_.jpg',
      rating: 5,
    },
    // Agrega más productos con diferentes marcas
  ]

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

  // Recuperamos los productos vistos del localStorage al cargar el componente
  useEffect(() => {
    const productosVistos =
      JSON.parse(localStorage.getItem('productosVistos')) || []
    setProductosVistos(productosVistos)
  }, [])

  return (
    <>
      <Nav />

      {/* Filtro por marca */}
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
          {/* Agrega más opciones de marca según los productos disponibles */}
        </select>
      </section>

      {/* Productos Vistos Recientemente */}
      <section className="recently-viewed">
        <h2>Vistos Recientemente</h2>
        <section className="card-container">
          {productosVistos.map((producto) => (
            <section className="card" key={producto.id}>
              <img
                src={producto.imagen}
                alt={producto.nombre}
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
                    <del>${producto.precioOriginal}</del> $
                    {producto.precioDescuento}
                  </div>
                  <div className="bag">
                    <IoBagAddSharp className="bag-icon" />
                  </div>
                </section>
              </div>
            </section>
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
                <section
                  className="card"
                  key={producto.id}
                  onClick={() => agregarProductoVisto(producto)} // Agregar producto a los vistos al hacer clic
                >
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
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
                        <del>${producto.precioOriginal}</del> $
                        {producto.precioDescuento}
                      </div>
                      <div className="bag">
                        <IoBagAddSharp className="bag-icon" />
                      </div>
                    </section>
                  </div>
                </section>
              ))}
            </section>
          </div>
        ))}
      </section>
    </>
  )
}
