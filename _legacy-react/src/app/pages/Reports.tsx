import { Box, Container, Paper, Typography, Grid, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, FileText, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const monthlyData = [
  { month: 'Ene', consultas: 120, emergencias: 25, vacunas: 45, cirugias: 8, ingresos: 15000 },
  { month: 'Feb', consultas: 135, emergencias: 30, vacunas: 52, cirugias: 12, ingresos: 18500 },
  { month: 'Mar', consultas: 145, emergencias: 28, vacunas: 48, cirugias: 10, ingresos: 17200 },
  { month: 'Abr', consultas: 160, emergencias: 35, vacunas: 60, cirugias: 15, ingresos: 21000 },
  { month: 'May', consultas: 155, emergencias: 32, vacunas: 55, cirugias: 13, ingresos: 19800 },
];

const speciesDistribution = [
  { name: 'Perros', value: 210, color: '#2563EB' },
  { name: 'Gatos', value: 145, color: '#10B981' },
  { name: 'Aves', value: 35, color: '#F59E0B' },
  { name: 'Conejos', value: 22, color: '#A855F7' },
  { name: 'Otros', value: 18, color: '#64748B' },
];

const topTreatments = [
  { name: 'Vacunación', count: 260, percentage: 35 },
  { name: 'Consulta General', count: 195, percentage: 26 },
  { name: 'Emergencias', count: 150, percentage: 20 },
  { name: 'Cirugías', count: 58, percentage: 8 },
  { name: 'Tratamientos', count: 82, percentage: 11 },
];

export default function Reports() {
  return (
    <Box sx={{ display: 'flex', bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      <Sidebar isAdmin={true} />

      <Box sx={{ flexGrow: 1, ml: '260px' }}>
        <Topbar userName="Dr. Juan Pérez" userRole="Veterinario Principal" />

        <Container maxWidth="xl" sx={{ mt: 10, py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1E293B' }}>
                Reportes y Estadísticas
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', mt: 1 }}>
                Análisis detallado del rendimiento de la clínica
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Período</InputLabel>
                <Select defaultValue="mes" label="Período">
                  <MenuItem value="semana">Esta Semana</MenuItem>
                  <MenuItem value="mes">Este Mes</MenuItem>
                  <MenuItem value="trimestre">Trimestre</MenuItem>
                  <MenuItem value="año">Año</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                startIcon={<Download size={20} />}
                sx={{
                  bgcolor: '#2563EB',
                  '&:hover': { bgcolor: '#1E40AF' },
                  px: 3,
                  fontWeight: 600,
                }}
              >
                Exportar PDF
              </Button>
            </Box>
          </Box>

          {/* Summary Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#64748B', mb: 1 }}>
                      Total Consultas
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#2563EB' }}>
                      715
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <TrendingUp size={16} color="#10B981" />
                      <Typography variant="caption" sx={{ color: '#10B981' }}>
                        +12% vs mes anterior
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ bgcolor: '#DBEAFE', p: 1.5, borderRadius: 2 }}>
                    <FileText size={24} color="#2563EB" />
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#64748B', mb: 1 }}>
                      Ingresos Totales
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#10B981' }}>
                      $91.5K
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <TrendingUp size={16} color="#10B981" />
                      <Typography variant="caption" sx={{ color: '#10B981' }}>
                        +18% vs mes anterior
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ bgcolor: '#D1FAE5', p: 1.5, borderRadius: 2 }}>
                    <DollarSign size={24} color="#10B981" />
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#64748B', mb: 1 }}>
                      Pacientes Activos
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#F59E0B' }}>
                      430
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <TrendingUp size={16} color="#10B981" />
                      <Typography variant="caption" sx={{ color: '#10B981' }}>
                        +8% vs mes anterior
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ bgcolor: '#FEF3C7', p: 1.5, borderRadius: 2 }}>
                    <Calendar size={24} color="#F59E0B" />
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#64748B', mb: 1 }}>
                      Tasa Satisfacción
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#A855F7' }}>
                      98%
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <TrendingUp size={16} color="#10B981" />
                      <Typography variant="caption" sx={{ color: '#10B981' }}>
                        +2% vs mes anterior
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ bgcolor: '#F3E8FF', p: 1.5, borderRadius: 2 }}>
                    <TrendingUp size={24} color="#A855F7" />
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Charts */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} lg={8}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Actividad Mensual
                </Typography>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="month" stroke="#64748B" />
                    <YAxis stroke="#64748B" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="consultas" fill="#2563EB" name="Consultas" />
                    <Bar dataKey="emergencias" fill="#EF4444" name="Emergencias" />
                    <Bar dataKey="vacunas" fill="#10B981" name="Vacunas" />
                    <Bar dataKey="cirugias" fill="#F59E0B" name="Cirugías" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Distribución por Especie
                </Typography>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={speciesDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {speciesDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>

          {/* Income Chart */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Ingresos Mensuales
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="month" stroke="#64748B" />
                    <YAxis stroke="#64748B" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="ingresos"
                      stroke="#10B981"
                      strokeWidth={3}
                      name="Ingresos ($)"
                      dot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>

          {/* Top Treatments */}
          <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Servicios Más Solicitados
            </Typography>
            <Box>
              {topTreatments.map((treatment, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {treatment.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>
                      {treatment.count} servicios ({treatment.percentage}%)
                    </Typography>
                  </Box>
                  <Box sx={{ width: '100%', bgcolor: '#E2E8F0', borderRadius: 1, height: 8 }}>
                    <Box
                      sx={{
                        width: `${treatment.percentage}%`,
                        bgcolor: '#2563EB',
                        borderRadius: 1,
                        height: '100%',
                        transition: 'width 0.5s ease',
                      }}
                    />
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
