import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { LOCAL_STORAGE_JWT } from '../constants'
import useNotification from '../hook/useNotification'
import { Products } from '../Products/Products'
import { CartPage } from './cart'
import { PerfilPage } from './perfil'

export const Main = () => {
  const navigate = useNavigate()
  const { jwt } = useSelector((state) => state.session)
  const { showNotification } = useNotification()
  console.log(jwt)
  useEffect(() => {
    if (!jwt) {
      showNotification('La sesión a expirado')
      return navigate('/login')
    }
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/profile" element={<PerfilPage />} />
    </Routes>
  )
}
