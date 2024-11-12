import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import IconButton from '@mui/material/IconButton'
import React from 'react'

const Favorito = ({ esFavorito, darQuitarFav }) => {
  const handleOnClick = () => {
    darQuitarFav()
  }

  return (
    <IconButton onClick={handleOnClick}>
      {esFavorito ? (
        <FavoriteIcon style={{ color: '#FF0000' }} />
      ) : (
        <FavoriteBorderIcon style={{ color: '#ccc' }} />
      )}
    </IconButton>
  )
}

export default Favorito
