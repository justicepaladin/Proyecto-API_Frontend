import { Alert, Snackbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import useNotification from '../hook/useNotification'

const Notification = () => {
  const dispatch = useDispatch()
  const { message, type, show } = useSelector((state) => state.notification)
  const { cleanNotification } = useNotification()

  const handleClose = () => {
    cleanNotification()
  }

  return (
    <Snackbar
      open={show}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      {message && (
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      )}
    </Snackbar>
  )
}

export default Notification
