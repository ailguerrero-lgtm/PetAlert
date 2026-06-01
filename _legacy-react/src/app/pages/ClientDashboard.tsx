import { useNavigate } from 'react-router';
import { Box, Container, Grid, Paper, Typography, Button, Chip, Avatar, LinearProgress } from '@mui/material';
import { Plus, Calendar, Syringe, AlertCircle, FileText, Heart } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

const myPets = [
  {
    id: 1,
    name: 'Max',
    species: 'Perro',
    breed: 'Golden Retriever',
    age: '3 años',
    image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBoYXBweXxlbnwxfHx8fDE3Nzk1Njk5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Saludable',
    nextVaccine: '15 Jun 2026',
  },
  {
    id: 2,
    name: 'Luna',
    species: 'Gato',
    breed: 'Persa',
    age: '2 años',
    image: 'https://images.unsplash.com/photo-1559624989-7b9303bd9792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcGV0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc5NTY5OTk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Control Pendiente',
    nextVaccine: '28 May 2026',
  },
];

const upcomingAppointments = [
  { id: 1, pet: 'Max', date: '25 May 2026', time: '10:00 AM', type: 'Chequeo General', doctor: 'Dr. Juan Pérez' },
  { id: 2, pet: 'Luna', date: '28 May 2026', time: '3:00 PM', type: 'Vacunación', doctor: 'Dra. María González' },
];

const alerts = [
  { id: 1, message: 'Vacuna de Luna próxima a vencer', priority: 'Alta', date: '3 días' },
  { id: 2, message: 'Recordatorio: Desparasitación de Max', priority: 'Media', date: '1 semana' },
];

export default function ClientDashboard() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar isAdmin={false} />

        <Box sx={{ flexGrow: 1, ml: '260px' }}>
          <Topbar userName="María López" userRole="Cliente" />

        <Container maxWidth="xl" sx={{ mt: 10, py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1E293B' }}>
              Mis Mascotas
            </Typography>
            <Button
              variant="contained"
              startIcon={<Plus size={20} />}
              onClick={() => navigate('/client/register-pet')}
              sx={{
                bgcolor: '#2563EB',
                '&:hover': { bgcolor: '#1E40AF' },
                px: 3,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 2,
              }}
            >
              Agregar Mascota
            </Button>
          </Box>

          {/* Pets Grid */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {myPets.map((pet) => (
              <Grid item xs={12} sm={6} md={4} key={pet.id}>
                <Paper
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: '1px solid #E2E8F0',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
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
                        bgcolor: pet.status === 'Saludable' ? '#D1FAE5' : '#FED7AA',
                        color: pet.status === 'Saludable' ? '#10B981' : '#F59E0B',
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      {pet.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B', mb: 1 }}>
                      {pet.breed} • {pet.age}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                      <Syringe size={16} color="#64748B" />
                      <Typography variant="caption" sx={{ color: '#64748B' }}>
                        Próxima vacuna: {pet.nextVaccine}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}

            {/* Add Pet Card */}
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                onClick={() => navigate('/client/register-pet')}
                sx={{
                  borderRadius: 3,
                  border: '2px dashed #CBD5E1',
                  height: '100%',
                  minHeight: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: '#2563EB',
                    bgcolor: '#F8FAFC',
                  },
                }}
              >
                <Box sx={{ bgcolor: '#EFF6FF', p: 3, borderRadius: '50%', mb: 2 }}>
                  <Plus size={32} color="#2563EB" />
                </Box>
                <Typography variant="h6" sx={{ color: '#2563EB', fontWeight: 600 }}>
                  Agregar Mascota
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Appointments & Alerts */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Calendar size={24} color="#2563EB" />
                  <Typography variant="h6" sx={{ ml: 2, fontWeight: 600 }}>
                    Próximas Citas
                  </Typography>
                </Box>
                <Box>
                  {upcomingAppointments.map((appointment) => (
                    <Box
                      key={appointment.id}
                      sx={{
                        p: 3,
                        mb: 2,
                        borderRadius: 2,
                        border: '1px solid #E2E8F0',
                        '&:hover': { bgcolor: '#F8FAFC' },
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {appointment.pet}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#64748B' }}>
                            {appointment.type}
                          </Typography>
                        </Box>
                        <Chip
                          label="Confirmada"
                          size="small"
                          sx={{ bgcolor: '#D1FAE5', color: '#10B981', fontWeight: 600 }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', gap: 3 }}>
                        <Typography variant="body2" sx={{ color: '#64748B' }}>
                          📅 {appointment.date}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748B' }}>
                          🕐 {appointment.time}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748B' }}>
                          👨‍⚕️ {appointment.doctor}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={5}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <AlertCircle size={24} color="#F59E0B" />
                  <Typography variant="h6" sx={{ ml: 2, fontWeight: 600 }}>
                    Alertas
                  </Typography>
                </Box>
                <Box>
                  {alerts.map((alert) => (
                    <Box
                      key={alert.id}
                      sx={{
                        p: 2,
                        mb: 2,
                        borderRadius: 2,
                        bgcolor: alert.priority === 'Alta' ? '#FEF3C7' : '#DBEAFE',
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {alert.message}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748B' }}>
                        En {alert.date}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>

              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <FileText size={24} color="#2563EB" />
                  <Typography variant="h6" sx={{ ml: 2, fontWeight: 600 }}>
                    Acceso Rápido
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate('/client/medical-history')}
                    sx={{ justifyContent: 'flex-start', py: 1.5 }}
                  >
                    <FileText size={18} style={{ marginRight: 8 }} />
                    Historial Médico
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate('/client/appointments')}
                    sx={{ justifyContent: 'flex-start', py: 1.5 }}
                  >
                    <Calendar size={18} style={{ marginRight: 8 }} />
                    Agendar Cita
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
