import { createTheme, ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.jsx'
import './index.css'
import storePersistor from './store/store'
const { store, persistor } = storePersistor()

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
})

createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </LocalizationProvider>
      </PersistGate>
    </Provider>
  </>,
)
