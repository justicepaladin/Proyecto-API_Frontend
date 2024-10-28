import { createSlice } from '@reduxjs/toolkit'

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        jwt: null,
    },
    reducers: {
        loginSuccess: (state, { payload: { jwtToken } }) => ({ ...state, jwt: jwtToken }),
        cleanSession: (state) => ({ ...state, jwt: null })
    },
})

// Action creators are generated for each case reducer function
export const { loginSuccess, cleanSession } = sessionSlice.actions

export const sessionSelectors = {
    getJwt: (state) => state.session.jwt
}

export default sessionSlice.reducer

