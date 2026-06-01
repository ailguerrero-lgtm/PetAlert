import { Box, Container, Grid, Paper, Typography, Chip, LinearProgress } from '@mui/material';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, Heart, Calendar, Syringe, TrendingUp, Activity } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const emergenciesData = [
  { month: 'Ene', emergencias: 12, consultas: 45 },
  { month: 'Feb', emergencias: 18, consultas: 52 },
  { month: 'Mar', emergencias: 15, consultas: 48 },
  { month: 'Abr', emergencias: 22, consultas: 60 },
  { month: 'May', emergencias: 20, consultas: 55 },
];

const speciesData = [
  { name: 'Perros', value: 65, color: '#2563EB' },
  { name: 'Gatos', value: 28, color: '#10B981' },
  { name: 'Otros', value: 7, color: '#F59E0B' },
];

const recentEmergencies = [
  { id: 1, pet: 'Max', owner: 'María López', condition: 'Fractura', priority: 'Alta', time: '10:30 AM' },
  { id: 2, pet: 'Luna', owner: 'Carlos Ruiz', condition: 'Intoxicación', priority: 'Crítica', time: '11:15 AM' },
  { id: 3, pet: 'Rocky', owner: 'Ana García', condition: 'Fiebre alta', priority: 'Media', time: '12:00 PM' },
  { id: 4, pet: 'Milo', owner: 'Pedro Sánchez', condition: 'Vómitos', priority: 'Media', time: '2:30 PM' },
];

export default function AdminDashboard() {
  return (
    <Box sx={{ display: 'flex', bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      <Sidebar isAdmin={true} />

      <Box sx={{ flexGrow: 1, ml: '260px' }}>
        <Topbar userName="Dr. Juan Pérez" userRole="Veterinario Principal" />

        <Container maxWidth="xl" sx={{ mt: 10, py: 4 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: '#1E293B' }}>
            Panel de Control
          </Typography>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#64748B', mb: 1 }}>
                      Emergencias Activas
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#EF4444' }}>
                      8
                    </Typography>
                  </Box>
                  <Box sx={{ bgcolor: '#FEE2E2', p: 1.5, borderRadius: 2 }}>
                    <AlertCircle size={24} color="#EF4444" />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingUp size={16} color="#EF4444" />
                  <Typography variant="caption" sx={{ color: '#64748B' }}>
                    +2 desde ayer
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#64748B', mb: 1 }}>
                      Mascotas Registradas
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#2563EB' }}>
                      324
                    </Typography>
                  </Box>
                  <Box sx={{ bgcolor: '#DBEAFE', p: 1.5, borderRadius: 2 }}>
                    <Heart size={24} color="#2563EB" />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingUp size={16} color="#10B981" />
                  <Typography variant="caption" sx={{ color: '#64748B' }}>
                    +12 este mes
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#64748B', mb: 1 }}>
                      Citas del Día
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#10B981' }}>
                      15
                    </Typography>
                  </Box>
                  <Box sx={{ bgcolor: '#D1FAE5', p: 1.5, borderRadius: 2 }}>
                    <Calendar size={24} color="#10B981" />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Activity size={16} color="#64748B" />
                  <Typography variant="caption" sx={{ color: '#64748B' }}>
                    8 completadas
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#64748B', mb: 1 }}>
                      Vacunas Pendientes
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#F59E0B' }}>
                      23
                    </Typography>
                  </Box>
                  <Box sx={{ bgcolor: '#FEF3C7', p: 1.5, borderRadius: 2 }}>
                    <Syringe size={24} color="#F59E0B" />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AlertCircle size={16} color="#F59E0B" />
                  <Typography variant="caption" sx={{ color: '#64748B' }}>
                    Requieren atención
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Charts */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Estadísticas Mensuales
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={emergenciesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="month" stroke="#64748B" />
                    <YAxis stroke="#64748B" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="emergencias" stroke="#EF4444" strokeWidth={2} name="Emergencias" />
                    <Line type="monotone" dataKey="consultas" stroke="#2563EB" strokeWidth={2} name="Consultas" />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Distribución por Especie
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={speciesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {speciesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>

          {/* Recent Emergencies */}
          <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Emergencias Recientes
            </Typography>
            <Box>
              {recentEmergencies.map((emergency) => (
                <Box
                  key={emergency.id}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '&:hover': { bgcolor: '#F8FAFC' },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {emergency.pet}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748B' }}>
                        Dueño: {emergency.owner}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>
                      {emergency.condition}
                    </Typography>
                    <Chip
                      label={emergency.priority}
                      size="small"
                      sx={{
                        bgcolor: emergency.priority === 'Crítica' ? '#FEE2E2' : emergency.priority === 'Alta' ? '#FED7AA' : '#DBEAFE',
                        color: emergency.priority === 'Crítica' ? '#EF4444' : emergency.priority === 'Alta' ? '#F59E0B' : '#2563EB',
                        fontWeight: 600,
                      }}
                    />
                    <Typography variant="caption" sx={{ color: '#64748B', minWidth: 70 }}>
                      {emergency.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
