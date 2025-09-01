import * as React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle, Slide, IconButton, DialogActions } from "@mui/material"
import { Logout } from "@mui/icons-material"
import { useAuth } from '../../hooks/useAuth';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function ModalLogout() {
  const [open, setOpen] = React.useState(false)
  const { isPendingLogout, mutateLogout } = useAuth()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}>
        <Logout  />
      </IconButton>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        maxWidth="xs"
        fullWidth
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
      <DialogTitle fontWeight={'bold'}>
        Cerrar sesión
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estas seguro que desea cerrar la sesión?
        </DialogContentText>
        <DialogActions sx={{ p: 0, mt: 3 }}>
           <button
            className='px-4 py-2 text-sm sm:text-base rounded-md font-semibold bg-zinc-500 text-white hover:bg-zinc-600 transition duration-300 ease-in-out cursor-pointer'
            onClick={handleClose}
          >
            Cancelar
          </button>
          <button
            disabled={isPendingLogout}
            onClick={mutateLogout}
            className='px-4 py-2 text-sm sm:text-base bg-red-600 rounded-md font-semibold disabled:opacity-60 disabled:cursor-not-allowed hover:bg-red-700 transition duration-300 ease-in-out cursor-pointer'
          >
            Cerrar sesión
          </button>
        </DialogActions>
      </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
