import { useState } from 'react';
import { Box, Container, Paper, Typography, Grid, Button, TextField, InputAdornment, Chip, Avatar } from '@mui/material';
import { Search, Plus, Heart, Calendar, Syringe } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const pets = [
  {
    id: 1,
    name: 'Max',
    species: 'Perro',
    breed: 'Golden Retriever',
    age: '3 años',
    owner: 'María López',
    status: 'Saludable',
    lastVisit: '2026-05-20',
    nextVaccine: '2026-06-15',
    image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBoYXBweXxlbnwxfHx8fDE3Nzk1Njk5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    name: 'Luna',
    species: 'Gato',
    breed: 'Persa',
    age: '2 años',
    owner: 'Carlos Ruiz',
    status: 'En Tratamiento',
    lastVisit: '2026-05-22',
    nextVaccine: '2026-05-28',
    image: 'https://images.unsplash.com/photo-1559624989-7b9303bd9792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcGV0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc5NTY5OTk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    name: 'Rocky',
    species: 'Perro',
    breed: 'Bulldog',
    age: '5 años',
    owner: 'Ana García',
    status: 'Recuperación',
    lastVisit: '2026-05-10',
    nextVaccine: '2026-07-01',
    image: 'https://images.unsplash.com/photo-1630438994394-3deff7a591bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMHZldGVyaW5hcmlhbnxlbnwxfHx8fDE3Nzk0MDI5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    name: 'Bella',
    species: 'Perro',
    breed: 'Pastor Alemán',
    age: '4 años',
    owner: 'Pedro Sánchez',
    status: 'Saludable',
    lastVisit: '2026-05-18',
    nextVaccine: '2026-08-15',
    image: 'https://images.unsplash.com/photo-1630438994394-3deff7a591bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMHZldGVyaW5hcmlhbnxlbnwxfHx8fDE3Nzk0MDI5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 5,
    name: 'Milo',
    species: 'Gato',
    breed: 'Siamés',
    age: '1 año',
    owner: 'Laura Fernández',
    status: 'Saludable',
    lastVisit: '2026-05-15',
    nextVaccine: '2026-06-20',
    image: 'https://images.unsplash.com/photo-1559624989-7b9303bd9792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcGV0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc5NTY5OTk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 6,
    name: 'Simba',
    species: 'Gato',
    breed: 'Maine Coon',
    age: '3 años',
    owner: 'Jorge Ramírez',
    status: 'Control Pendiente',
    lastVisit: '2026-04-28',
    nextVaccine: '2026-05-30',
    image: 'https://images.unsplash.com/photo-1559624989-7b9303bd9792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcGV0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc5NTY5OTk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export default function Pets() {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Saludable':
        return { bg: '#D1FAE5', color: '#10B981' };
      case 'En Tratamiento':
        return { bg: '#FED7AA', color: '#F59E0B' };
      case 'Recuperación':
        return { bg: '#DBEAFE', color: '#2563EB' };
      case 'Control Pendiente':
        return { bg: '#FEF3C7', color: '#F59E0B' };
      default:
        return { bg: '#E2E8F0', color: '#64748B' };
    }
  };

  const filteredPets = pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      <Sidebar isAdmin={true} />

      <Box sx={{ flexGrow: 1, ml: '260px' }}>
        <Topbar userName="Dr. Juan Pérez" userRole="Veterinario Principal" />

        <Container maxWidth="xl" sx={{ mt: 10, py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1E293B' }}>
                Registro de Mascotas
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', mt: 1 }}>
                Gestiona el perfil de todos los pacientes
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
              Registrar Mascota
            </Button>
          </Box>

          {/* Search */}
          <Paper sx={{ p: 2, mb: 4, borderRadius: 3, border: '1px solid #E2E8F0' }}>
            <TextField
              fullWidth
              placeholder="Buscar por nombre, dueño o raza..."
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

          {/* Stats */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0', textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#2563EB', mb: 1 }}>
                  {pets.length}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B' }}>
                  Total Mascotas
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0', textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#10B981', mb: 1 }}>
                  {pets.filter((p) => p.status === 'Saludable').length}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B' }}>
                  Saludables
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0', textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#F59E0B', mb: 1 }}>
                  {pets.filter((p) => p.status === 'En Tratamiento').length}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B' }}>
                  En Tratamiento
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0', textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#2563EB', mb: 1 }}>
                  {pets.filter((p) => p.status === 'Recuperación').length}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B' }}>
                  En Recuperación
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Pets Grid */}
          <Grid container spacing={3}>
            {filteredPets.map((pet) => {
              const statusColor = getStatusColor(pet.status);
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={pet.id}>
                  <Paper
                    sx={{
                      borderRadius: 3,
                      overflow: 'hidden',
                      border: '1px solid #E2E8F0',
                      transition: 'all 0.2s',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                      <img
                        src={pet.image}
                        alt={pet.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <Chip
                        label={pet.status}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          bgcolor: statusColor.bg,
                          color: statusColor.color,
                          fontWeight: 600,
                        }}
                      />
                    </Box>

                    <Box sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {pet.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748B', mb: 2 }}>
                        {pet.breed} • {pet.age}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Heart size={16} color="#64748B" />
                        <Typography variant="caption" sx={{ color: '#64748B' }}>
                          Dueño: {pet.owner}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Calendar size={16} color="#64748B" />
                        <Typography variant="caption" sx={{ color: '#64748B' }}>
                          Última visita: {pet.lastVisit}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Syringe size={16} color="#64748B" />
                        <Typography variant="caption" sx={{ color: '#64748B' }}>
                          Próxima vacuna: {pet.nextVaccine}
                        </Typography>
                      </Box>

                      <Button
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={{ mt: 2 }}
                      >
                        Ver Perfil Completo
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
