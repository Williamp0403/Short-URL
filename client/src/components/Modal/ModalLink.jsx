import * as React from 'react';
import { Link } from "react-router-dom"
import { Dialog, DialogContent, DialogContentText, DialogTitle, Slide, Typography, Box } from "@mui/material"
import { CheckCircleOutline, LinkOutlined } from "@mui/icons-material"
import { ButtonCopy } from "../Button/ButtonCopy"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function ModalLink ({ open, setOpen, link = '' }) {

  const short_url = `${import.meta.env.VITE_BACKEND_URL + link}`

  return (
    <Dialog
      open={open}
      slots={{
        transition: Transition,
      }}
      maxWidth="xs"
      fullWidth
      keepMounted
      onClose={() => setOpen(false)}
      aria-describedby="alert-dialog-slide-description"
    >
    <DialogTitle>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={1.5}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#86efac',
            borderRadius: '50%',
            p: 1.2
          }}
        >
          <CheckCircleOutline fontSize='large' sx={{ color: '#16a34a' }} />
        </Box>
        <Typography variant="h6" align="center">
          Enlace creado con éxito
        </Typography>
      </Box>
    </DialogTitle>

      <DialogContent>
        <DialogContentText textAlign={'center'} mb={1}>
          Tu nuevo enlace corto ya está activo y listo para compartir.
        </DialogContentText>
        <div className='flex flex-col gap-y-4 items-center'>
          <a  
            href={short_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xl font-bold text-sky-600 hover:underline truncate"
          >
            {short_url}
          </a>
          <div className='flex space-x-4'>
            <ButtonCopy text={short_url}/>
            <Link to='/links'>
              <button className='flex items-center gap-x-2 p-2 rounded border border-sky-600 text-sky-600 text-sm font-semibold cursor-pointer'>
                <LinkOutlined/>
                Ver enlaces
              </button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
