import * as React from 'react';
import { useNavigate } from 'react-router-dom'
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { MoreVert, Edit, LinkOutlined } from '@mui/icons-material'
import { ModalDeleteLink } from './Modal/ModalDeleteLink';

export function Dropdown({ link }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickRedirect = () => {
    navigate(`/links/${link.id_link}`)
  }

  return (
    <div>
      <IconButton
        sx={{ p: '5px' }}
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              minWidth: '20ch',
            },
          },
          list: {
            'aria-labelledby': 'long-button',
          },
        }}
      >
        <MenuItem onClick={handleClickRedirect}>
          <ListItemIcon>
            <LinkOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>Detalles del enlace</ListItemText>
        </MenuItem>
        <ModalDeleteLink link={link}/>
      </Menu>
    </div>
  );
}
