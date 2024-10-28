import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        message: null,
        type: null,
        show: false
    },
    reducers: {
        showNotification: (state, { payload: { message, type } }) => ({ ...state, message, type, show: true }),
        cleanNotification: (state) => ({ ...state, message: null, type: null, show: false })
    },
})

// Action creators are generated for each case reducer function
export const { showNotification, cleanNotification } = notificationSlice.actions

export const notificationSelectors = {
    getNotificationData: (state) => ({ message: state.notification.message, type: state.notification.type }),
    mustShow: (state) => state.notification.show
}

export default notificationSlice.reducer

