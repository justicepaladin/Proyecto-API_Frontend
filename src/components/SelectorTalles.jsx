import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

const SelectorTalle = ({
  stock = [],
  stockSeleccionado,
  handleSeleccionarStock,
}) => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        {stock.map((stock) => (
          <Button
            key={stock.talle}
            variant={
              stockSeleccionado?.id === stock.id ? 'contained' : 'outlined'
            }
            onClick={() => handleSeleccionarStock(stock)}
            disabled={stock.cantidad === 0}
            sx={{
              minWidth: '60px',
              minHeight: '40px',
              borderColor: '#BDBDBD',
              color: stockSeleccionado?.id === stock.id ? 'white' : 'black',
              borderRadius: '8px',
              padding: '8px',
              textTransform: 'none',
            }}
          >
            <Box display="flex" flexDirection="column">
              {stock.talle} AR
              <Typography fontSize={10}>
                {stock.cantidad} Disponibles
              </Typography>
            </Box>
          </Button>
        ))}
      </Box>
    </Box>
  )
}

export default SelectorTalle
