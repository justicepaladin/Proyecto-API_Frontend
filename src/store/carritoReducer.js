import { createSlice } from "@reduxjs/toolkit";

export const carritoSlice = createSlice({
    name: "carrito",
    initialState: {
        items: []
    },
    reducers:{
        agregarItem: (state, action) => {
            let item = action.payload
            state.items.unshift(item)
        },
        eliminarItem: (state, action) => {
            let deleteId = action.payload
            state.items = state.items.filter(item => item.stockProductoId != deleteId)
        },
        modificarCantidad:(state, action) => {
            let modItem = action.payload

            
            state.items = state.items.map(item => item.stockProductoId == modItem.stockProductoId ? modItem : item)
            
        },
    }
})


export const carritoSelector =  {
    getCarrito: (state) => state.carrito.test
}


export const {agregarItem, modificarCantidad, eliminarItem} = carritoSlice.actions

export default carritoSlice.reducer