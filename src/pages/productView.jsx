import { Autocomplete, Box, Button, Card, CardContent, CardMedia, CircularProgress, Container, List, ListItem, ListItemText, TextField, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { agregarItem } from "../store/carritoReducer";
import { Nav } from "../Navigation/Nav";
import { getProductById } from "../services/productoService";
import useNotification from "../hook/useNotification";



export const ProductView = () => {

    const dispatch = useDispatch()
    const {id} = useParams()
    const [producto, setProducto] = useState()
    const [stockSeleccionado, setStockSeleccionado] = useState()
    const { showNotification } = useNotification()

    const handleSelectTalle =  (e) => {
        setStockSeleccionado(e)
    }


    const handleAgregarCarrito = () => {

        const productoCarrito = {
            stockProductoId: stockSeleccionado.id,
            nombre: producto?.nombre,
            talle: stockSeleccionado?.talle,
            imagen: producto?.imagen,
            precio: producto?.precio,
            cantidad: 1
        }
        dispatch(agregarItem(productoCarrito))
        showNotification("Agregado al carrito correctamente", 'success')
    }


    const handleFetchProducto = async () => {
        getProductById(id).then(setProducto)
    }


    useEffect(() => {
        handleFetchProducto()
    }, [])

    return <>
        <Nav/>

        {producto ? 
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Card>
            <Grid container spacing={2}>
                <Grid xs={12} md={4} size={12} sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                
                <CardMedia
                    component="img"
                    image={producto?.imagen}
                    alt={producto?.nombre}
                    sx={{ height: "300px", width: "100%", objectFit: "contain", borderRadius: 1, objectPosition: "center"}}
                />
                </Grid>

                <Grid xs={12} md={8} size={12}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                    {producto?.nombre}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                    {producto?.descripcion}
                    </Typography>
                    <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
                    ${producto?.precio.toFixed(2)}
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                    Categorías
                    </Typography>
                    <List dense>
                    {producto?.categorias.map((categoria) => (
                        <ListItem key={categoria.id} sx={{justifyContent: "center"}}>
                        <ListItemText sx={{textAlign:"center"}} primary={`${categoria.nombreGrupo}: ${categoria.nombre}`} />
                        </ListItem>
                    ))}
                    </List>

                    <Container>
                        <Typography variant="h6" gutterBottom>
                        Stock Disponible
                        </Typography>
                        <Container sx={{display:"flex", flexDirection: "row", justifyContent: "center"}}>
                            <Autocomplete options={producto?.stock}
                                sx={{width: "15rem"}}
                                getOptionLabel={option => `${option.talle}` }
                                onChange={(e, val) => handleSelectTalle(val)}
                                renderInput={params => {
                                    return <>
                                        <TextField {...params} label="Talle"/>
                                    </>}}
                                renderOption={(props, option) => {
                                    const { key, ...optionProps } = props;
                                    return (
                                    <Box
                                        key={key}
                                        // component="li"
                                        sx={{ width: "20rem" }}
                                        {...optionProps}
                                    >
                                        {option.talle}, {option.cantidad} Disponible
                                    </Box>
                                    );
                                }}
                            />
                            <Button variant="contained" 
                                onClick={handleAgregarCarrito}
                                disabled={stockSeleccionado ? (stockSeleccionado?.cantidad == 0 ? true : false) : true}
                                >Agregar al carrito</Button>
                        </Container>
                    </Container>
                </CardContent>
                </Grid>
            </Grid>
            </Card>
        </Container>
        : <CircularProgress/>}
    </>
}