import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

const FiltroCategorias = ({ categorias = [], onActualizarFiltros }) => {
  const [filtrosSeleccionados, setFiltrosSeleccionados] = useState([])

  // Agrupa las categorías por `nombreGrupo`
  const categoriasAgrupadas = categorias.reduce((acc, categoria) => {
    const { idGrupo, nombreGrupo, nombre } = categoria
    if (!acc[idGrupo]) {
      acc[idGrupo] = { nombreGrupo, opciones: [] }
    }
    acc[idGrupo].opciones.push({ nombre, id: categoria.id, idGrupo })
    return acc
  }, {})

  const handleAgregarFiltro = (nuevoFiltro) => {
    const nuevosFiltrosSeleccionados = [...filtrosSeleccionados, nuevoFiltro]
    setFiltrosSeleccionados(nuevosFiltrosSeleccionados)
    onActualizarFiltros(nuevosFiltrosSeleccionados)
  }

  const handleEliminarFiltro = (id) => {
    const nuevosFiltrosSeleccionados = filtrosSeleccionados.filter(
      (filtro) => filtro.id !== id,
    )
    setFiltrosSeleccionados(nuevosFiltrosSeleccionados)
    onActualizarFiltros(nuevosFiltrosSeleccionados)
  }

  return (
    <Box sx={{ width: '250px', padding: '16px', backgroundColor: '#f5f5f5' }}>
      {/* Lista de filtros */}
      {Object.entries(categoriasAgrupadas).map(
        ([idGrupo, grupo]) =>
          filtrosSeleccionados.every((f) => f.idGrupo != idGrupo) && (
            <Box key={grupo.nombreGrupo} sx={{ marginBottom: '16px' }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 'bold', textAlign: 'start' }}
              >
                {grupo.nombreGrupo}
              </Typography>
              <Box>
                {grupo.opciones.map((opcion) => (
                  <Box
                    key={opcion.id}
                    onClick={() => handleAgregarFiltro(opcion)}
                    sx={{
                      cursor: 'pointer',
                      color: 'black',
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '4px',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    {opcion.nombre}
                  </Box>
                ))}
              </Box>
            </Box>
          ),
      )}

      {/* Filtros seleccionados */}
      <Box
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: '16px' }}
      >
        {filtrosSeleccionados.map((filtro) => (
          <Chip
            key={filtro.nombre}
            label={filtro.nombre}
            onDelete={() => handleEliminarFiltro(filtro.id)}
            sx={{
              backgroundColor: '#e0e0e0',
              color: 'black',
              fontWeight: 'bold',
              '& .MuiChip-deleteIcon': { color: 'gray' },
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

export default FiltroCategorias
