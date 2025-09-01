import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, CircularProgress } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from "react-hook-form"
import { toast } from 'sonner'
import { Input } from '../Input'
import { SchemaLink } from '../../schemas/link';
import { createLink } from '../../services/link';

export function ModalCreateLink () {
  const queryClient = useQueryClient()
  const [open, setOpen] = React.useState(false)
  const { mutate, isPending } = useMutation({
    mutationFn: createLink,
    onSuccess: (link) => {
      queryClient.setQueryData(['links'], (oldData) => {
        if (oldData === null) return [link]
        return [link, ...oldData]
      })
      queryClient.invalidateQueries({ queryKey: ['dashboardSummary'], refetchType: 'all' })
      toast.success('Enlace creado exitosamente')
      handleClose()
    }
  })
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: zodResolver(SchemaLink)
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = handleSubmit(data => {
    mutate(data)
  })

  return (
    <React.Fragment>
      <button
        onClick={handleClickOpen}
        className='px-4 py-2 text-sm sm:text-base rounded-md font-semibold bg-sky-600 text-white hover:bg-sky-700 transition duration-300 ease-in-out cursor-pointer'
      >
        Crear Enlace
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth       
      >
        <DialogTitle sx={{ fontWeight: 'bold' }} id="alert-dialog-title">
          Crear Nuevo Enlace
        </DialogTitle>
        <DialogContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <Input 
            name='long_url'
            type='text' 
            title='Destino' 
            placeholder='https://ejemplo.com/mi-url-larga...'
            register={register}
            error={errors.long_url}
          />     
          <Input 
            name='name'
            type='text' 
            title='Título (opcional)' 
            register={register}
            error={errors.name}
          /> 
        <DialogActions>
          <button
            className='px-4 py-2 text-sm sm:text-base rounded-md font-semibold bg-zinc-500 text-white hover:bg-zinc-600 transition duration-300 ease-in-out cursor-pointer'
            onClick={handleClose}
            type='button'
          >
            Cerrar
          </button>
          <button
            disabled={isPending}
            className='px-4 py-2 w-20 sm:w-32 bg-sky-600 rounded-md font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center'
            type='submit'
          >
            {isPending ? <CircularProgress size={24} /> : 'Crear enlace'}
          </button>
        </DialogActions>
        </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}