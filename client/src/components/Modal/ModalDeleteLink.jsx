import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, CircularProgress, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner'
import { deleteLink } from '../../services/link';
import { Delete } from '@mui/icons-material';

export function ModalDeleteLink ({ link }) {
  const queryClient = useQueryClient()
  const [open, setOpen] = React.useState(false)
  const { mutate, isPending } = useMutation({
    mutationFn: deleteLink,
    onSuccess: (id_link) => {
      queryClient.setQueryData(['links'], (oldData) => {
        return oldData.filter(link => link.id_link !== id_link)
      })
      queryClient.invalidateQueries({ queryKey: ['dashboardSummary'], refetchType: 'all' });
      toast.success('Enlace elminado exitosamente')
      handleClose()
    }
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    mutate({ id: link.id_link })
  }

  return (
    <React.Fragment>
        <MenuItem onClick={handleClickOpen} disableRipple>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Borrar</ListItemText>
        </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth       
      >
        <DialogTitle sx={{ fontWeight: 'bold' }} id="alert-dialog-title">
          Eliminar enlace
        </DialogTitle>
        <DialogContent>
          <p>Estas seguro que desea eliminar este enlace?</p>
          <DialogActions sx={{ p: 0, paddingTop: 2 }}>
            <button
              className='px-4 py-2 text-sm sm:text-base rounded-md font-semibold bg-zinc-500 text-white hover:bg-zinc-600 transition duration-300 ease-in-out cursor-pointer'
              onClick={handleClose}
              type='button'
            >
              Cerrar
            </button>
            <button
              onClick={handleDelete}
              disabled={isPending}
              className='px-4 py-2 w-20 sm:w-24 bg-red-600 rounded-md font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center'
              type='submit'
            >
              {isPending ? <CircularProgress size={24} /> : 'Eliminar'}
            </button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}