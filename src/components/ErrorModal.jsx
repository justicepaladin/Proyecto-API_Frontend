import { Box, Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useErrorHandler from "../hook/useErrorHandler";

export const ErrorModal = () => {
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const { showErrorHandler } = useErrorHandler()
    const { message } = useSelector((state) => state.errorHanlder)

    const handleCloseModal = () => {
        showErrorHandler("")
        setOpenErrorModal(false)
    }


    useEffect(() => {if(message != "") setOpenErrorModal(true)}, [message])
    
    return <>
        <Modal open={openErrorModal} onClose={handleCloseModal}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 300,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
                <Typography variant="h6" color="error">
                    Error
                </Typography>
                <Typography variant="body1">
                    {message}
                </Typography>
                <Button onClick={handleCloseModal} color="primary" variant="contained" sx={{ mt: 2 }}>
                    Cerrar
                </Button>
            </Box>
        </Modal>
    </>
}