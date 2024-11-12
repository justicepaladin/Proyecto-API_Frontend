import React, { useEffect, useState } from 'react'
import { ProductoMiniView } from './ProductosMiniView'

const CarruselProductos = ({ listarProductos }) => {
  const [items, setItems] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [lastPage, setLastPage] = useState(0)

  useEffect(() => {
    listarProductos(currentPage)
      .then((data) => {
        setItems(data.pageItems)
        setLastPage(data.lastPage)
      })
      .catch((error) => console.error('Error al cargar los items:', error))
  }, [currentPage])

  const nextPage = () => {
    if (currentPage != lastPage) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))
    }
  }

  if (items.length === 0)
    return (
      <div style={{ padding: '20px', color: '#888', fontSize: '18px' }}>
        <p>No hay datos disponibles para mostrar</p>
      </div>
    )

  return (
    <div
      style={{
        display: 'flex',
        width: '80%',
        margin: 'auto',
        overflow: 'hidden',
        padding: '20px',
        alignItems: 'center',
      }}
    >
      <button
        onClick={previousPage}
        disabled={currentPage === 0}
        style={{
          height: '40px',
          width: '40px',
          background: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          borderRadius: '50%',
          opacity: currentPage === 0 ? 0.3 : 1,
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 19L8 12L15 5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          transition: 'transform 0.5s ease-in-out',
          alignItems: 'center',
          paddingLeft: '10px',
          paddingRight: '10px',
        }}
      >
        {items.map((item) => (
          <ProductoMiniView producto={item} key={item.id} />
        ))}
      </div>
      <button
        onClick={nextPage}
        style={{
          height: '40px',
          width: '40px',
          background: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          borderRadius: '50%',
          opacity: currentPage === lastPage ? 0.3 : 1,
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 5L16 12L9 19"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}

export default CarruselProductos
