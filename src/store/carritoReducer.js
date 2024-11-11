import { createSlice } from "@reduxjs/toolkit";

export const carritoSlice = createSlice({
    name: "carrito",
    initialState: {
        items: []
    },
    reducers:{
        agregarItem: (state, action) => {
            let item = action.payload

            if(!state.items.find(i => i.stockProductoId == item.stockProductoId)){
                state.items.unshift(item)
            }
        },
        eliminarItem: (state, action) => {
            let deleteId = action.payload
            state.items = state.items.filter(item => item.stockProductoId != deleteId)
        },
        modificarCantidad:(state, action) => {
            let modItem = action.payload
            state.items = state.items.map(item => item.stockProductoId == modItem.stockProductoId ? modItem : item)
            
        }, 
        purgeItems: (state) => {
            state.items = []
        }
    }
})


export const carritoSelector =  {
    getCarrito: (state) => state.carrito.test
}


export const {agregarItem, modificarCantidad, eliminarItem, purgeItems} = carritoSlice.actions

export default carritoSlice.reducer