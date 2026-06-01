import { useNavigate, useLocation } from 'react-router';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import { Home, Heart, AlertCircle, FileText, Calendar, Bell, BarChart3, Users, Settings } from 'lucide-react';

interface SidebarProps {
  isAdmin?: boolean;
}

export default function Sidebar({ isAdmin = true }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const adminMenuItems = [
    { text: 'Inicio', icon: <Home size={20} />, path: '/admin' },
    { text: 'Mascotas', icon: <Heart size={20} />, path: '/admin/pets' },
    { text: 'Emergencias', icon: <AlertCircle size={20} />, path: '/admin/emergencies' },
    { text: 'Historial Médico', icon: <FileText size={20} />, path: '/admin/medical-history' },
    { text: 'Citas', icon: <Calendar size={20} />, path: '/admin/appointments' },
    { text: 'Reportes', icon: <BarChart3 size={20} />, path: '/admin/reports' },
    { text: 'Usuarios', icon: <Users size={20} />, path: '/admin/users' },
    { text: 'Configuración', icon: <Settings size={20} />, path: '/admin/settings' },
  ];

  const clientMenuItems = [
    { text: 'Inicio', icon: <Home size={20} />, path: '/client' },
    { text: 'Mis Mascotas', icon: <Heart size={20} />, path: '/client' },
    { text: 'Citas', icon: <Calendar size={20} />, path: '/client/appointments' },
    { text: 'Historial Médico', icon: <FileText size={20} />, path: '/client/medical-history' },
    { text: 'Alertas', icon: <Bell size={20} />, path: '/client' },
  ];

  const menuItems = isAdmin ? adminMenuItems : clientMenuItems;

  return (
    <Box
      sx={{
        width: 260,
        bgcolor: 'white',
        borderRight: '1px solid #E2E8F0',
        height: '100vh',
        position: 'fixed',
        overflowY: 'auto',
      }}
    >
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
        <Heart size={32} color="#2563EB" fill="#2563EB" />
        <Typography variant="h6" sx={{ ml: 2, fontWeight: 700, color: '#2563EB' }}>
          PetAlert
        </Typography>
      </Box>

      <Divider />

      <List sx={{ px: 2, py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  bgcolor: '#EFF6FF',
                  color: '#2563EB',
                  '&:hover': {
                    bgcolor: '#DBEAFE',
                  },
                },
                '&:hover': {
                  bgcolor: '#F8FAFC',
                },
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? '#2563EB' : '#64748B', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                  fontWeight: location.pathname === item.path ? 600 : 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
