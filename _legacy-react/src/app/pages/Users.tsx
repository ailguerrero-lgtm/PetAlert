import { useState } from 'react';
import { Box, Container, Paper, Typography, Grid, Button, TextField, InputAdornment, Chip, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Search, Plus, Users as UsersIcon, Mail, Phone, Shield } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const users = [
  {
    id: 1,
    name: 'Dr. Juan Pérez',
    email: 'juan.perez@petalert.com',
    phone: '+1 234-567-8901',
    role: 'Veterinario',
    specialty: 'Cirugía General',
    status: 'Activo',
    patients: 45,
  },
  {
    id: 2,
    name: 'Dra. María González',
    email: 'maria.gonzalez@petalert.com',
    phone: '+1 234-567-8902',
    role: 'Veterinario',
    specialty: 'Medicina Interna',
    status: 'Activo',
    patients: 38,
  },
  {
    id: 3,
    name: 'Dr. Luis Martínez',
    email: 'luis.martinez@petalert.com',
    phone: '+1 234-567-8903',
    role: 'Veterinario',
    specialty: 'Emergencias',
    status: 'Activo',
    patients: 52,
  },
  {
    id: 4,
    name: 'Dra. Ana García',
    email: 'ana.garcia@petalert.com',
    phone: '+1 234-567-8904',
    role: 'Veterinario',
    specialty: 'Dermatología',
    status: 'Activo',
    patients: 28,
  },
  {
    id: 5,
    name: 'María López',
    email: 'maria.lopez@email.com',
    phone: '+1 234-567-8905',
    role: 'Cliente',
    specialty: '-',
    status: 'Activo',
    patients: 2,
  },
  {
    id: 6,
    name: 'Carlos Ruiz',
    email: 'carlos.ruiz@email.com',
    phone: '+1 234-567-8906',
    role: 'Cliente',
    specialty: '-',
    status: 'Activo',
    patients: 1,
  },
  {
    id: 7,
    name: 'Ana Rodríguez',
    email: 'ana.rodriguez@email.com',
    phone: '+1 234-567-8907',
    role: 'Cliente',
    specialty: '-',
    status: 'Activo',
    patients: 3,
  },
  {
    id: 8,
    name: 'Pedro Sánchez',
    email: 'pedro.sanchez@email.com',
    phone: '+1 234-567-8908',
    role: 'Cliente',
    specialty: '-',
    status: 'Inactivo',
    patients: 1,
  },
];

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'Veterinario' | 'Cliente'>('all');

  const getRoleColor = (role: string) => {
    return role === 'Veterinario'
      ? { bg: '#DBEAFE', color: '#2563EB' }
      : { bg: '#D1FAE5', color: '#10B981' };
  };

  const getStatusColor = (status: string) => {
    return status === 'Activo'
      ? { bg: '#D1FAE5', color: '#10B981' }
      : { bg: '#FEE2E2', color: '#EF4444' };
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const veterinarios = users.filter((u) => u.role === 'Veterinario').length;
  const clientes = users.filter((u) => u.role === 'Cliente').length;

  return (
    <Box sx={{ display: 'flex', bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      <Sidebar isAdmin={true} />

      <Box sx={{ flexGrow: 1, ml: '260px' }}>
        <Topbar userName="Dr. Juan Pérez" userRole="Veterinario Principal" />

        <Container maxWidth="xl" sx={{ mt: 10, py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1E293B' }}>
                Gestión de Usuarios
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', mt: 1 }}>
                Administra veterinarios y clientes de la plataforma
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Plus size={20} />}
              sx={{
                bgcolor: '#2563EB',
                '&:hover': { bgcolor: '#1E40AF' },
                px: 3,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              Nuevo Usuario
            </Button>
          </Box>

          {/* Stats */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={4}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid #E2E8F0',
                  textAlign: 'center',
                  cursor: 'pointer',
                  bgcolor: filterRole === 'all' ? '#EFF6FF' : 'white',
                  transition: 'all 0.2s',
                  '&:hover': { bgcolor: '#F8FAFC' },
                }}
                onClick={() => setFilterRole('all')}
              >
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#2563EB', mb: 1 }}>
                  {users.length}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B' }}>
                  Total Usuarios
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid #E2E8F0',
                  textAlign: 'center',
                  cursor: 'pointer',
                  bgcolor: filterRole === 'Veterinario' ? '#EFF6FF' : 'white',
                  transition: 'all 0.2s',
                  '&:hover': { bgcolor: '#F8FAFC' },
                }}
                onClick={() => setFilterRole('Veterinario')}
              >
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#2563EB', mb: 1 }}>
                  {veterinarios}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B' }}>
                  Veterinarios
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid #E2E8F0',
                  textAlign: 'center',
                  cursor: 'pointer',
                  bgcolor: filterRole === 'Cliente' ? '#EFF6FF' : 'white',
                  transition: 'all 0.2s',
                  '&:hover': { bgcolor: '#F8FAFC' },
                }}
                onClick={() => setFilterRole('Cliente')}
              >
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#10B981', mb: 1 }}>
                  {clientes}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B' }}>
                  Clientes
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Search */}
          <Paper sx={{ p: 2, mb: 4, borderRadius: 3, border: '1px solid #E2E8F0' }}>
            <TextField
              fullWidth
              placeholder="Buscar por nombre o correo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} color="#64748B" />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { border: 'none' } }}
            />
          </Paper>

          {/* Users Table */}
          <TableContainer component={Paper} sx={{ borderRadius: 3, border: '1px solid #E2E8F0' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F8FAFC' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Usuario</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Contacto</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Rol</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Especialidad</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Mascotas</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Estado</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => {
                  const roleColor = getRoleColor(user.role);
                  const statusColor = getStatusColor(user.status);
                  return (
                    <TableRow key={user.id} sx={{ '&:hover': { bgcolor: '#F8FAFC' } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: roleColor.color }}>
                            {user.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {user.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#64748B' }}>
                              ID: {user.id}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Mail size={14} color="#64748B" />
                            <Typography variant="caption" sx={{ color: '#64748B' }}>
                              {user.email}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Phone size={14} color="#64748B" />
                            <Typography variant="caption" sx={{ color: '#64748B' }}>
                              {user.phone}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.role}
                          size="small"
                          icon={user.role === 'Veterinario' ? <Shield size={14} /> : <UsersIcon size={14} />}
                          sx={{
                            bgcolor: roleColor.bg,
                            color: roleColor.color,
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {user.specialty}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {user.patients}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.status}
                          size="small"
                          sx={{
                            bgcolor: statusColor.bg,
                            color: statusColor.color,
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button size="small" variant="outlined">
                            Ver
                          </Button>
                          <Button size="small" variant="outlined" color="error">
                            Editar
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </Box>
  );
}
