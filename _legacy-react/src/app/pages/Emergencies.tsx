import { Box, Container, Paper, Typography, Grid, Chip, Button, TextField, InputAdornment } from '@mui/material';
import { AlertCircle, Search, Heart, Clock, Activity, Phone } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const emergencies = [
  {
    id: 1,
    pet: 'Luna',
    owner: 'Carlos Ruiz',
    species: 'Gato',
    condition: 'Intoxicación alimentaria',
    symptoms: ['Vómitos', 'Letargia', 'Deshidratación'],
    priority: 'Crítica',
    time: '11:15 AM',
    status: 'En atención',
    room: 'Sala 2',
    doctor: 'Dr. Juan Pérez',
  },
  {
    id: 2,
    pet: 'Max',
    owner: 'María López',
    species: 'Perro',
    condition: 'Fractura en pata trasera',
    symptoms: ['Dolor agudo', 'Imposibilidad de caminar', 'Inflamación'],
    priority: 'Alta',
    time: '10:30 AM',
    status: 'En espera',
    room: 'Sala 1',
    doctor: 'Dra. Ana García',
  },
  {
    id: 3,
    pet: 'Rocky',
    owner: 'Pedro Sánchez',
    species: 'Perro',
    condition: 'Fiebre alta persistente',
    symptoms: ['Temperatura 40°C', 'Debilidad', 'Falta de apetito'],
    priority: 'Media',
    time: '12:00 PM',
    status: 'Evaluación',
    room: 'Sala 3',
    doctor: 'Dr. Luis Martínez',
  },
  {
    id: 4,
    pet: 'Milo',
    owner: 'Ana Rodríguez',
    species: 'Perro',
    condition: 'Vómitos frecuentes',
    symptoms: ['Vómitos', 'Malestar general'],
    priority: 'Media',
    time: '2:30 PM',
    status: 'En espera',
    room: '-',
    doctor: '-',
  },
];

const recommendations = [
  { priority: 'Crítica', action: 'Atención inmediata - Estabilizar paciente', color: '#EF4444', icon: AlertCircle },
  { priority: 'Alta', action: 'Atención urgente - Máximo 15 minutos', color: '#F59E0B', icon: Clock },
  { priority: 'Media', action: 'Evaluación necesaria - Máximo 30 minutos', color: '#2563EB', icon: Activity },
];

export default function Emergencies() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Crítica':
        return { bg: '#FEE2E2', text: '#EF4444' };
      case 'Alta':
        return { bg: '#FED7AA', text: '#F59E0B' };
      case 'Media':
        return { bg: '#DBEAFE', text: '#2563EB' };
      default:
        return { bg: '#E2E8F0', text: '#64748B' };
    }
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      <Sidebar isAdmin={true} />

      <Box sx={{ flexGrow: 1, ml: '260px' }}>
        <Topbar userName="Dr. Juan Pérez" userRole="Veterinario Principal" />

        <Container maxWidth="xl" sx={{ mt: 10, py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1E293B' }}>
                Centro de Emergencias
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', mt: 1 }}>
                Sistema de priorización y atención inmediata
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AlertCircle size={20} />}
              sx={{
                bgcolor: '#EF4444',
                '&:hover': { bgcolor: '#DC2626' },
                px: 3,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              Nueva Emergencia
            </Button>
          </Box>

          {/* Search */}
          <Paper sx={{ p: 2, mb: 4, borderRadius: 3, border: '1px solid #E2E8F0' }}>
            <TextField
              fullWidth
              placeholder="Buscar por mascota, dueño o condición..."
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

          {/* Priority Guidelines */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {recommendations.map((rec) => (
              <Grid item xs={12} md={4} key={rec.priority}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: '2px solid',
                    borderColor: rec.color,
                    bgcolor: `${rec.color}10`,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <rec.icon size={24} color={rec.color} />
                    <Typography variant="h6" sx={{ ml: 2, fontWeight: 600, color: rec.color }}>
                      {rec.priority}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#1E293B' }}>
                    {rec.action}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Emergencies List */}
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Casos Activos ({emergencies.length})
          </Typography>

          <Grid container spacing={3}>
            {emergencies.map((emergency) => {
              const colors = getPriorityColor(emergency.priority);
              return (
                <Grid item xs={12} key={emergency.id}>
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      border: '2px solid',
                      borderColor: colors.text,
                      borderLeft: `6px solid ${colors.text}`,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Heart size={24} color={colors.text} fill={colors.bg} />
                          <Box sx={{ ml: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                              {emergency.pet}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#64748B' }}>
                              {emergency.species} • Dueño: {emergency.owner}
                            </Typography>
                          </Box>
                        </Box>
                        <Chip
                          label={emergency.priority}
                          sx={{
                            bgcolor: colors.bg,
                            color: colors.text,
                            fontWeight: 700,
                            fontSize: '0.85rem',
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} md={5}>
                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                          {emergency.condition}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748B', mb: 2 }}>
                          Síntomas:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {emergency.symptoms.map((symptom, index) => (
                            <Chip
                              key={index}
                              label={symptom}
                              size="small"
                              sx={{ bgcolor: '#F1F5F9', color: '#475569' }}
                            />
                          ))}
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 1 }}>
                            Hora de ingreso
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                            {emergency.time}
                          </Typography>
                          <Chip
                            label={emergency.status}
                            sx={{
                              bgcolor: emergency.status === 'En atención' ? '#D1FAE5' : '#FEF3C7',
                              color: emergency.status === 'En atención' ? '#10B981' : '#F59E0B',
                              fontWeight: 600,
                              mb: 1,
                            }}
                          />
                          {emergency.room !== '-' && (
                            <Typography variant="body2" sx={{ color: '#64748B', mt: 1 }}>
                              📍 {emergency.room}
                            </Typography>
                          )}
                          {emergency.doctor !== '-' && (
                            <Typography variant="body2" sx={{ color: '#64748B' }}>
                              👨‍⚕️ {emergency.doctor}
                            </Typography>
                          )}
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Phone size={16} />}
                            sx={{ mt: 2 }}
                          >
                            Contactar
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
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
