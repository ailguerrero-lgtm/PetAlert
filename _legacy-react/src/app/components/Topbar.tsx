import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AppBar, Toolbar, Box, IconButton, Badge, TextField, InputAdornment, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import { Search, Bell, LogOut, User } from 'lucide-react';

interface TopbarProps {
  userName?: string;
  userRole?: string;
}

export default function Topbar({ userName = 'Dr. Juan Pérez', userRole = 'Veterinario' }: TopbarProps) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: 'white',
        borderBottom: '1px solid #E2E8F0',
        left: 260,
        width: 'calc(100% - 260px)',
      }}
    >
      <Toolbar>
        <TextField
          placeholder="Buscar mascotas, clientes, citas..."
          size="small"
          sx={{
            width: 400,
            '& .MuiOutlinedInput-root': {
              bgcolor: '#F8FAFC',
              borderRadius: 2,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} color="#64748B" />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ flexGrow: 1 }} />

        <IconButton sx={{ mr: 2 }}>
          <Badge badgeContent={3} color="error">
            <Bell size={20} color="#64748B" />
          </Badge>
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleMenu}>
          <Avatar sx={{ bgcolor: '#2563EB', width: 36, height: 36, mr: 1.5 }}>
            {userName.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ color: '#1E293B', fontWeight: 600 }}>
              {userName}
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              {userRole}
            </Typography>
          </Box>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleClose}>
            <User size={18} style={{ marginRight: 8 }} />
            Mi Perfil
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogOut size={18} style={{ marginRight: 8 }} />
            Cerrar Sesión
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
