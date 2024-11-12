import { createTheme, ThemeProvider } from '@mui/material'
import 'bootstrap/dist/css/bootstrap.min.css'
import { StrictMode } from 'react'
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
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </>,
)
