import { useEffect, useState } from "react"
import { Nav } from "../Navigation/Nav"
import { getProductsFavoritos } from "../services/productoService"
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import {
  Container,
  IconButton,
  Typography,
} from '@mui/material'
import { ProductoMiniView } from "../components/ProductosMiniView"
import useErrorHandler from "../hook/useErrorHandler"

export const Favoritos = () => {
    const [listaProductos, setListaProductos] = useState([])
    const [page, setPage] = useState(0)
    const [lastPage, setLastPage] = useState(0)
    const { showErrorHandler } = useErrorHandler()

    const handleFetchProductos = async (page) => {
        getProductsFavoritos(page).then((response) => {
            setLastPage(response.lastPage)

            setListaProductos(response.pageItems)
        }).catch(e => showErrorHandler(e.response?.data?.message ?? e.message))
    }

    const handlePageChange = (value) => {

        
        let pageNew = page + value
        setPage(pageNew)
        handleFetchProductos(pageNew)
    }

    useEffect(() => {
        handleFetchProductos(page)
    }, [])


    const Paginado = () => (
        <>
          <IconButton disabled={page == 0} onClick={(e) => handlePageChange(-1)}>
            <ArrowBack />
          </IconButton>
          <IconButton
            disabled={page == lastPage}
            onClick={(e) => handlePageChange(1)}
          >
            <ArrowForward />
          </IconButton>
          <Typography variant="subtitle1">Pagina: {page + 1}</Typography>
        </>
      )

    return <>
        <Nav/>

        <section className="recently-viewed">
            <h2>Productos Favoritos</h2>
            <Container sx={{ display: 'flex', alignItems: 'start' }}>
            <Container
                sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '20%',
                }}
            >
                
            </Container>
            <Container sx={{ width: '100%' }}>
                <Paginado />
                <section className="card-container">
                {listaProductos.map((producto, idx) => (
                    <ProductoMiniView key={idx} producto={producto} />
                ))}
                </section>
            </Container>
            </Container>
        </section>
    </>
}