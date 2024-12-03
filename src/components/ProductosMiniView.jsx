import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { marcarVisto } from '../services/productoService'

export const ProductoMiniView = ({ producto }) => {
  const navigate = useNavigate()

  const agregarProductoVisto = (producto) => {
    marcarVisto(producto.id)
  }

  const handleClickProducto = (producto) => {
    agregarProductoVisto(producto)
    navigate(`/product/${producto.id}`)
  }

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
        <p className="card-title">{producto.nombre}</p>
        <section className="card-reviews">
          {/* {[...Array(producto.rating)].map((_, index) => (
            <AiFillStar key={index} className="ratings-star" />
          ))}
          <span className="total-reviews"> {producto.rating}</span> */}
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
