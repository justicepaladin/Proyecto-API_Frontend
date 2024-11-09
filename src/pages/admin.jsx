import { useState, useEffect } from 'react';
import 
{
    Box,
    Button,
    Container,
    IconButton,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    List,
    ListItem,
    ListItemText
} 
from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { getProducts , addProduct , editProduct , deleteProduct } from '../services/productoService';
import { Preview } from '@mui/icons-material';

export const ProductDashboard = () => {
    const [products, setProducts] = useState([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [stockModalOpen, setStockModalOpen] = useState(false);
    const [selectedProductStock, setSelectedProductStock] = useState(null);
    // Manejo del stock en los modals, descomentar esto si funciona
    const [stock, setStock] = useState([]);

    // Obtener la lista de productos usando el servicio
    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            // Hay que manejar el error para mostrarle un mensaje al usuario
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Manejo del stock en los modals, descomentar esto si funciona
    const handleStockChange = (index, field, value) => {
        const updatedStock = [...stock];
        updatedStock[index][field] = value;
        setStock(updatedStock);
    };

    const addStockRow = () => {
        setStock([...stock, { id: Date.now(), talle: '', cantidad: 0 }]);
    };

    const removeStockRow = (index) => {
        setStock(stock.filter((_, i) => i !== index));
    };

    // Agregar un nuevo producto
    const handleAddProduct = async (newProduct) => {
        try {
            const data = await addProduct(newProduct);
            setProducts([...products, data]);
            setOpenAddModal(false);
            setStock([]);
        } catch (error) {
            console.error('Error al agregar el producto:', error);
            // Manejar el error
        }
    };

    // Editar un producto existente
    const handleEditProduct = async (updatedProduct) => {
        try {
            const data = await editProduct(updatedProduct);
            setProducts(products.map(p => (p.id === data.id ? data : p)));
            setOpenEditModal(false);
            setSelectedProduct(null);
            setStock([]);
        } catch (error) {
            console.error('Error al editar el producto:', error);
            // Manejar el error
        }
    };

    // Eliminar un producto
    const handleDeleteProduct = async (productId) => {
        try {
            await deleteProduct(productId);
            setProducts(products.filter(p => p.id !== productId));
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            // Manejar el error
        }
    };

    // mostrar stock del producto
    const handleOpenStockModal = (product) => {
        setSelectedProductStock(product);
        setStockModalOpen(true);
    };

    return (
        <Container>
            <h1>Dashboard de Productos</h1>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenAddModal(true)}>
                Agregar Producto
            </Button>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.nombre}</TableCell>
                                <TableCell>{product.descripcion}</TableCell>
                                <TableCell>{product.precio}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpenStockModal(product)}>
                                        <Preview />
                                    </IconButton>
                                </TableCell>

                                <TableCell>
                                    <IconButton onClick={() => { setSelectedProduct(product); setOpenEditModal(true); }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteProduct(product.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal para agregar producto */}
            <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <h2>Agregar Producto</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const newProduct = {
                            nombre: e.target.nombre.value,
                            descripcion: e.target.descripcion.value,
                            precio: parseFloat(e.target.precio.value),
                            stock: stock,
                        };
                        handleAddProduct(newProduct);
                    }}>
                        <TextField label="Nombre" name="nombre" fullWidth margin="normal" />
                        <TextField label="Descripción" name="descripcion" fullWidth margin="normal" />
                        <TextField label="Precio" name="precio" type="number" fullWidth margin="normal" />
                        {/* Manejo del stock en los modals, descomentar esto si funciona */}
                        <h3>Stock</h3>
                        {stock.map((item, index) => (
                            <Box key={item.id} display="flex" alignItems="center" mb={2}>
                                <TextField
                                    label="Talle"
                                    type="number"
                                    value={item.talle}
                                    onChange={(e) => handleStockChange(index, 'talle', e.target.value)}
                                    sx={{ marginRight: 2 }}
                                />
                                <TextField
                                    label="Cantidad"
                                    type="number"
                                    value={item.cantidad}
                                    onChange={(e) => handleStockChange(index, 'cantidad', e.target.value)}
                                    sx={{ marginRight: 2 }}
                                />
                                <Button onClick={() => removeStockRow(index)} color="error">Eliminar</Button>
                            </Box>
                        ))}
                        <Button onClick={addStockRow} color="primary">Agregar Stock</Button>
                        <Button type="submit" variant="contained">
                            Guardar
                        </Button>
                    </form>
                </Box>
            </Modal>

            {/* Modal para editar producto */}
            <Modal open={openEditModal} onClose={() => { setOpenEditModal(false); setSelectedProduct(null); }}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <h2>Editar Producto</h2>
                    {selectedProduct && (
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const updatedProduct = {
                                id: selectedProduct.id,
                                nombre: e.target.nombre.value,
                                descripcion: e.target.descripcion.value,
                                precio: parseFloat(e.target.precio.value),
                                stock: stock, // Usamos el estado `stock` que contiene las modificaciones
                            };
                            handleEditProduct(updatedProduct);
                        }}>
                            <TextField label="Nombre" name="nombre" fullWidth margin="normal" defaultValue={selectedProduct.nombre} />
                            <TextField label="Descripción" name="descripcion" fullWidth margin="normal" defaultValue={selectedProduct.descripcion} />
                            <TextField label="Precio" name="precio" type="number" fullWidth margin="normal" defaultValue={selectedProduct.precio} />
                            {/* <TextField label="Stock" name="stock" type="number" fullWidth margin="normal" defaultValue={selectedProduct.stock} /> */}
                            {/* Manejo del stock en los modals, descomentar esto si funciona */}
                            <h3>Stock</h3>
                            {stock.map((item, index) => (
                                <Box key={item.id} display="flex" alignItems="center" mb={2}>
                                    <TextField
                                        label="Talle"
                                        type="number"
                                        value={item.talle}
                                        onChange={(e) => handleStockChange(index, 'talle', e.target.value)}
                                        sx={{ marginRight: 2 }}
                                    />
                                    <TextField
                                        label="Cantidad"
                                        type="number"
                                        value={item.cantidad}
                                        onChange={(e) => handleStockChange(index, 'cantidad', e.target.value)}
                                        sx={{ marginRight: 2 }}
                                    />
                                    <Button onClick={() => removeStockRow(index)} color="error">Eliminar</Button>
                                </Box>
                            ))}
                            <Button onClick={addStockRow} color="primary">Agregar Stock</Button>
                            <Button type="submit" variant="contained">
                                Guardar
                            </Button>
                        </form>
                    )}
                </Box>
            </Modal>
            {/* Modal para ver stock del producto*/}
            <Modal open={stockModalOpen} onClose={() => setStockModalOpen(false)}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p:4,
                }}>
                    <h2>Stock de {selectedProductStock ? selectedProductStock.nombre : ''}</h2>
                    {selectedProductStock && (
                        <List>
                            {selectedProductStock.stock.map((item) => (
                                <ListItem key={item.id}>
                                    <ListItemText primary={`Talle: ${item.talle}, Cantidad: ${item.cantidad}`} />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
            </Modal>
        </Container>
    );
};

