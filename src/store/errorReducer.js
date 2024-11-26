import { createSlice } from '@reduxjs/toolkit'

export const errorSlice = createSlice({
    name: 'errorHandler',
    initialState: {
        message: "",
    },
    reducers: {
        showError: (state, { payload: { message } }) => ({ ...state, message}),
    },
})

// Action creators are generated for each case reducer function
export const { showError } = errorSlice.actions



export default errorSlice.reducer