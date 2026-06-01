import { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Chip,
  Button,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { Calendar as CalendarIcon, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import InteractiveCalendar from '../components/InteractiveCalendar';

const appointments = [
  {
    id: 1,
    pet: 'Max',
    owner: 'María López',
    date: '2026-05-25',
    time: '10:00 AM',
    type: 'Chequeo General',
    doctor: 'Dr. Juan Pérez',
    status: 'Pendiente',
  },
  {
    id: 2,
    pet: 'Luna',
    owner: 'Carlos Ruiz',
    date: '2026-05-25',
    time: '11:30 AM',
    type: 'Vacunación',
    doctor: 'Dra. María González',
    status: 'Pendiente',
  },
  {
    id: 3,
    pet: 'Rocky',
    owner: 'Ana García',
    date: '2026-05-25',
    time: '2:00 PM',
    type: 'Control Post-operatorio',
    doctor: 'Dr. Luis Martínez',
    status: 'Completada',
  },
  {
    id: 4,
    pet: 'Bella',
    owner: 'Pedro Sánchez',
    date: '2026-05-25',
    time: '3:30 PM',
    type: 'Limpieza Dental',
    doctor: 'Dra. Ana García',
    status: 'Cancelada',
  },
  {
    id: 5,
    pet: 'Milo',
    owner: 'Laura Fernández',
    date: '2026-05-26',
    time: '9:00 AM',
    type: 'Primera Consulta',
    doctor: 'Dr. Juan Pérez',
    status: 'Pendiente',
  },
  {
    id: 6,
    pet: 'Simba',
    owner: 'Jorge Ramírez',
    date: '2026-05-23',
    time: '4:00 PM',
    type: 'Emergencia',
    doctor: 'Dra. María González',
    status: 'Emergencia',
  },
];

// Datos de disponibilidad del calendario (fecha: cupos disponibles)
const calendarAvailability: Record<string, number> = {
  '2026-05-25': 2,
  '2026-05-26': 5,
  '2026-05-27': 0,
  '2026-05-28': 3,
  '2026-05-29': 4,
  '2026-05-30': 1,
  '2026-05-31': 0,
  '2026-06-01': 6,
  '2026-06-02': 2,
};

export default function Appointments() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDateForAppointment, setSelectedDateForAppointment] = useState('');

  // Estado del formulario
  const [formData, setFormData] = useState({
    petName: '',
    owner: '',
    date: '',
    time: '',
    doctor: '',
    reason: '',
    status: 'Pendiente',
  });

  // Manejar clic en fecha del calendario
  const handleDateClick = (dateStr: string) => {
    setSelectedDateForAppointment(dateStr);
    setFormData((prev) => ({ ...prev, date: dateStr }));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFormData({
      petName: '',
      owner: '',
      date: '',
      time: '',
      doctor: '',
      reason: '',
      status: 'Pendiente',
    });
  };

  const handleSaveAppointment = () => {
    console.log('Guardando cita:', formData);
    // Aquí iría la lógica para guardar la cita
    handleCloseModal();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Pendiente':
        return { bg: '#DBEAFE', color: '#2563EB', icon: Clock };
      case 'Completada':
        return { bg: '#D1FAE5', color: '#10B981', icon: CheckCircle };
      case 'Cancelada':
        return { bg: '#FEE2E2', color: '#EF4444', icon: XCircle };
      case 'Emergencia':
        return { bg: '#FED7AA', color: '#F59E0B', icon: AlertCircle };
      default:
        return { bg: '#E2E8F0', color: '#64748B', icon: Clock };
    }
  };

  const filterAppointments = () => {
    switch (selectedTab) {
      case 0:
        return appointments;
      case 1:
        return appointments.filter((a) => a.status === 'Pendiente');
      case 2:
        return appointments.filter((a) => a.status === 'Completada');
      case 3:
        return appointments.filter((a) => a.status === 'Cancelada');
      default:
        return appointments;
    }
  };

  const filteredAppointments = filterAppointments();

  return (
    <Box sx={{ display: 'flex', bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      <Sidebar isAdmin={true} />

      <Box sx={{ flexGrow: 1, ml: '260px' }}>
        <Topbar userName="Dr. Juan Pérez" userRole="Veterinario Principal" />

        <Container maxWidth="xl" sx={{ mt: 10, py: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1E293B' }}>
              Gestión de Citas
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', mt: 1 }}>
              Haz clic en una fecha disponible del calendario para agendar una nueva cita
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* Calendar */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <CalendarIcon size={24} color="#2563EB" />
                  <Typography variant="h6" sx={{ ml: 2, fontWeight: 600 }}>
                    Calendario
                  </Typography>
                </Box>

                <InteractiveCalendar
                  availability={calendarAvailability}
                  onDateClick={handleDateClick}
                  selectedDate={selectedDateForAppointment}
                />

                <Box sx={{ mt: 3, p: 2, bgcolor: '#F8FAFC', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: '#10B981',
                        }}
                      />
                      <Typography variant="caption" sx={{ color: '#64748B' }}>
                        Disponible
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: '#EF4444',
                        }}
                      />
                      <Typography variant="caption" sx={{ color: '#64748B' }}>
                        Sin cupos
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ mt: 3, p: 2, bgcolor: '#EFF6FF', borderRadius: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#2563EB', mb: 1 }}>
                    Citas de Hoy
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#2563EB' }}>
                    {appointments.filter((a) => a.date === '2026-05-25').length}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Appointments List */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Box sx={{ borderBottom: '1px solid #E2E8F0', px: 3, pt: 2 }}>
                  <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
                    <Tab label="Todas" />
                    <Tab label="Pendientes" />
                    <Tab label="Completadas" />
                    <Tab label="Canceladas" />
                  </Tabs>
                </Box>

                <Box sx={{ p: 3 }}>
                  {filteredAppointments.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                      <CalendarIcon size={48} color="#CBD5E1" style={{ marginBottom: 16 }} />
                      <Typography variant="body1" sx={{ color: '#64748B' }}>
                        No hay citas en esta categoría
                      </Typography>
                    </Box>
                  ) : (
                    filteredAppointments.map((appointment) => {
                      const statusConfig = getStatusConfig(appointment.status);
                      const StatusIcon = statusConfig.icon;

                      return (
                        <Box
                          key={appointment.id}
                          sx={{
                            p: 3,
                            mb: 2,
                            borderRadius: 2,
                            border: '1px solid #E2E8F0',
                            transition: 'all 0.2s',
                            '&:hover': {
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                              borderColor: '#2563EB',
                            },
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                  {appointment.pet}
                                </Typography>
                                <Chip
                                  label={appointment.status}
                                  size="small"
                                  icon={<StatusIcon size={14} />}
                                  sx={{
                                    ml: 2,
                                    bgcolor: statusConfig.bg,
                                    color: statusConfig.color,
                                    fontWeight: 600,
                                  }}
                                />
                              </Box>
                              <Typography variant="body2" sx={{ color: '#64748B', mb: 2 }}>
                                Cliente: {appointment.owner}
                              </Typography>

                              <Grid container spacing={2}>
                                <Grid item xs={6} sm={3}>
                                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                                    Fecha
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {appointment.date}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                                    Hora
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {appointment.time}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                                    Tipo
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {appointment.type}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                                    Veterinario
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {appointment.doctor}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Box>

                            <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                              {appointment.status === 'Pendiente' && (
                                <>
                                  <Button variant="outlined" size="small" color="success">
                                    Completar
                                  </Button>
                                  <Button variant="outlined" size="small" color="error">
                                    Cancelar
                                  </Button>
                                </>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      );
                    })
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        {/* Modal para Nueva Cita */}
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: 700, fontSize: '1.5rem', color: '#1E293B', pb: 1 }}>
            Agendar Nueva Cita
          </DialogTitle>

          <DialogContent sx={{ pt: 3 }}>
            <Grid container spacing={2.5}>
              <Grid item xs={12}>
                <TextField
                  label="Nombre de la Mascota"
                  fullWidth
                  value={formData.petName}
                  onChange={(e) => handleInputChange('petName', e.target.value)}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Propietario"
                  fullWidth
                  value={formData.owner}
                  onChange={(e) => handleInputChange('owner', e.target.value)}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Fecha"
                  type="date"
                  fullWidth
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Hora"
                  type="time"
                  fullWidth
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Veterinario Asignado</InputLabel>
                  <Select
                    value={formData.doctor}
                    label="Veterinario Asignado"
                    onChange={(e) => handleInputChange('doctor', e.target.value)}
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="Dr. Juan Pérez">Dr. Juan Pérez</MenuItem>
                    <MenuItem value="Dra. María González">Dra. María González</MenuItem>
                    <MenuItem value="Dr. Luis Martínez">Dr. Luis Martínez</MenuItem>
                    <MenuItem value="Dra. Ana García">Dra. Ana García</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Motivo de Consulta"
                  fullWidth
                  multiline
                  rows={3}
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Estado de la Cita</InputLabel>
                  <Select
                    value={formData.status}
                    label="Estado de la Cita"
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="Pendiente">Pendiente</MenuItem>
                    <MenuItem value="Completada">Completada</MenuItem>
                    <MenuItem value="Cancelada">Cancelada</MenuItem>
                    <MenuItem value="Emergencia">Emergencia</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3, pt: 2, gap: 1 }}>
            <Button
              onClick={handleCloseModal}
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                fontWeight: 600,
                color: '#64748B',
                borderColor: '#E2E8F0',
                '&:hover': {
                  borderColor: '#CBD5E1',
                  bgcolor: '#F8FAFC',
                },
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSaveAppointment}
              variant="contained"
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                fontWeight: 600,
                bgcolor: '#2563EB',
                '&:hover': {
                  bgcolor: '#1E40AF',
                },
              }}
            >
              Guardar Cita
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
