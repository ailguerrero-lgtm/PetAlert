import { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import InteractiveCalendar from '../components/InteractiveCalendar';
import Footer from '../components/Footer';

// Mascotas del cliente
const myPets = [
  { id: 1, name: 'Max' },
  { id: 2, name: 'Luna' },
];

// Citas del cliente
const myAppointments = [
  {
    id: 1,
    pet: 'Max',
    date: '2026-05-25',
    time: '10:00 AM',
    type: 'Chequeo General',
    doctor: 'Dr. Juan Pérez',
    status: 'Confirmada',
  },
  {
    id: 2,
    pet: 'Luna',
    date: '2026-05-28',
    time: '3:00 PM',
    type: 'Vacunación',
    doctor: 'Dra. María González',
    status: 'Confirmada',
  },
  {
    id: 3,
    pet: 'Max',
    date: '2026-05-22',
    time: '11:00 AM',
    type: 'Control de Peso',
    doctor: 'Dr. Luis Martínez',
    status: 'Completada',
  },
];

// Disponibilidad del calendario
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

export default function ClientAppointments() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedDateForAppointment, setSelectedDateForAppointment] = useState('');

  const [formData, setFormData] = useState({
    petId: '',
    petName: '',
    date: '',
    time: '',
    reason: '',
  });

  const handleDateClick = (dateStr: string) => {
    setSelectedDateForAppointment(dateStr);
    setFormData((prev) => ({ ...prev, date: dateStr }));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFormData({
      petId: '',
      petName: '',
      date: '',
      time: '',
      reason: '',
    });
  };

  const handleSaveAppointment = () => {
    console.log('Guardando cita:', formData);
    handleCloseModal();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePetChange = (petId: string) => {
    const pet = myPets.find((p) => p.id.toString() === petId);
    setFormData((prev) => ({
      ...prev,
      petId,
      petName: pet?.name || '',
    }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar isAdmin={false} />

        <Box sx={{ flexGrow: 1, ml: '260px' }}>
          <Topbar userName="María López" userRole="Cliente" />

          <Container maxWidth="xl" sx={{ mt: 10, py: 4, mb: 4 }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1E293B' }}>
                Mis Citas
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
                      Mis Próximas Citas
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#2563EB' }}>
                      {myAppointments.filter((a) => a.status === 'Confirmada').length}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              {/* Appointments List */}
              <Grid item xs={12} md={8}>
                <Paper sx={{ borderRadius: 3, border: '1px solid #E2E8F0', p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Historial de Citas
                  </Typography>

                  {myAppointments.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                      <CalendarIcon size={48} color="#CBD5E1" style={{ marginBottom: 16 }} />
                      <Typography variant="body1" sx={{ color: '#64748B' }}>
                        No tienes citas registradas
                      </Typography>
                    </Box>
                  ) : (
                    myAppointments.map((appointment) => {
                      const isCompleted = appointment.status === 'Completada';
                      const StatusIcon = isCompleted ? CheckCircle : Clock;
                      const statusColor = isCompleted ? '#10B981' : '#2563EB';
                      const statusBg = isCompleted ? '#D1FAE5' : '#DBEAFE';

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
                                    bgcolor: statusBg,
                                    color: statusColor,
                                    fontWeight: 600,
                                  }}
                                />
                              </Box>
                              <Typography variant="body2" sx={{ color: '#64748B', mb: 2 }}>
                                {appointment.type}
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
                                <Grid item xs={12} sm={6}>
                                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                                    Veterinario
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {appointment.doctor}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                        </Box>
                      );
                    })
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>

      <Footer />

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
              <FormControl fullWidth>
                <InputLabel>Seleccionar Mascota</InputLabel>
                <Select
                  value={formData.petId}
                  label="Seleccionar Mascota"
                  onChange={(e) => handlePetChange(e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  {myPets.map((pet) => (
                    <MenuItem key={pet.id} value={pet.id}>
                      {pet.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
              <TextField
                label="Motivo de Consulta"
                fullWidth
                multiline
                rows={4}
                value={formData.reason}
                onChange={(e) => handleInputChange('reason', e.target.value)}
                variant="outlined"
                placeholder="Describe el motivo de la consulta..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
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
  );
}
