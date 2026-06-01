import { useState } from 'react';
import { Box, Container, Paper, Typography, Chip, Button, TextField, InputAdornment, Grid, Avatar } from '@mui/material';
import { Search, FileText, Pill, Syringe, Stethoscope, AlertCircle, Calendar, Download } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const medicalRecords = [
  {
    id: 1,
    date: '2026-05-20',
    type: 'Consulta General',
    pet: 'Max',
    doctor: 'Dr. Juan Pérez',
    diagnosis: 'Chequeo de rutina - Estado de salud óptimo',
    treatment: 'Ninguno',
    medications: [],
    notes: 'Mascota saludable. Peso adecuado. Recomendaciones de dieta mantenidas.',
  },
  {
    id: 2,
    date: '2026-05-15',
    type: 'Vacunación',
    pet: 'Luna',
    doctor: 'Dra. María González',
    diagnosis: 'Aplicación de vacuna antirrábica anual',
    treatment: 'Vacuna antirrábica',
    medications: ['Vacuna Rabia - 1ml'],
    notes: 'Próxima vacuna en mayo 2027. Sin reacciones adversas.',
  },
  {
    id: 3,
    date: '2026-05-10',
    type: 'Emergencia',
    pet: 'Rocky',
    doctor: 'Dr. Luis Martínez',
    diagnosis: 'Fractura en pata trasera derecha',
    treatment: 'Cirugía de reducción y fijación',
    medications: ['Tramadol 50mg', 'Antibiótico - Cefalexina 500mg'],
    notes: 'Cirugía exitosa. Reposo absoluto por 6 semanas. Control en 10 días.',
  },
  {
    id: 4,
    date: '2026-05-05',
    type: 'Tratamiento',
    pet: 'Bella',
    doctor: 'Dra. Ana García',
    diagnosis: 'Infección en oído izquierdo',
    treatment: 'Limpieza profunda y medicación tópica',
    medications: ['Gotas óticas antibióticas', 'Antiinflamatorio oral'],
    notes: 'Aplicar gotas 2 veces al día por 10 días. Control en 1 semana.',
  },
  {
    id: 5,
    date: '2026-04-28',
    type: 'Consulta Especializada',
    pet: 'Milo',
    doctor: 'Dr. Juan Pérez',
    diagnosis: 'Problemas dermatológicos - Alergias alimentarias',
    treatment: 'Cambio de dieta y tratamiento tópico',
    medications: ['Shampoo medicado', 'Antihistamínico'],
    notes: 'Dieta hipoalergénica estricta. Eliminar pollo y cereales.',
  },
];

export default function MedicalHistory() {
  const [searchTerm, setSearchTerm] = useState('');

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'Consulta General':
        return { bg: '#DBEAFE', color: '#2563EB', icon: Stethoscope };
      case 'Vacunación':
        return { bg: '#D1FAE5', color: '#10B981', icon: Syringe };
      case 'Emergencia':
        return { bg: '#FEE2E2', color: '#EF4444', icon: AlertCircle };
      case 'Tratamiento':
        return { bg: '#FED7AA', color: '#F59E0B', icon: Pill };
      case 'Consulta Especializada':
        return { bg: '#E9D5FF', color: '#A855F7', icon: FileText };
      default:
        return { bg: '#E2E8F0', color: '#64748B', icon: FileText };
    }
  };

  const filteredRecords = medicalRecords.filter(
    (record) =>
      record.pet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase())
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
                Historial Médico
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', mt: 1 }}>
                Registro completo de consultas, tratamientos y medicamentos
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Download size={20} />}
              sx={{
                bgcolor: '#2563EB',
                '&:hover': { bgcolor: '#1E40AF' },
                px: 3,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              Exportar Historial
            </Button>
          </Box>

          {/* Search */}
          <Paper sx={{ p: 2, mb: 4, borderRadius: 3, border: '1px solid #E2E8F0' }}>
            <TextField
              fullWidth
              placeholder="Buscar por mascota, diagnóstico o veterinario..."
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

          {/* Timeline */}
          <Box sx={{ position: 'relative' }}>
            {/* Timeline Line */}
            <Box
              sx={{
                position: 'absolute',
                left: 20,
                top: 0,
                bottom: 0,
                width: 2,
                bgcolor: '#E2E8F0',
              }}
            />

            {filteredRecords.map((record, index) => {
              const typeConfig = getTypeConfig(record.type);
              const TypeIcon = typeConfig.icon;

              return (
                <Box key={record.id} sx={{ position: 'relative', mb: 4 }}>
                  {/* Timeline Dot */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 8,
                      top: 30,
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: typeConfig.bg,
                      border: `3px solid ${typeConfig.color}`,
                      zIndex: 1,
                    }}
                  />

                  <Paper
                    sx={{
                      ml: 8,
                      p: 3,
                      borderRadius: 3,
                      border: '1px solid #E2E8F0',
                      transition: 'all 0.2s',
                      '&:hover': {
                        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Box sx={{ bgcolor: typeConfig.bg, p: 1.5, borderRadius: 2, mr: 2 }}>
                            <TypeIcon size={24} color={typeConfig.color} />
                          </Box>
                          <Box>
                            <Chip
                              label={record.type}
                              size="small"
                              sx={{
                                bgcolor: typeConfig.bg,
                                color: typeConfig.color,
                                fontWeight: 600,
                              }}
                            />
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Calendar size={16} color="#64748B" />
                          <Typography variant="body2" sx={{ color: '#64748B' }}>
                            {record.date}
                          </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                          {record.pet}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748B' }}>
                          {record.doctor}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={9}>
                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
                          Diagnóstico
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748B', mb: 3 }}>
                          {record.diagnosis}
                        </Typography>

                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                              Tratamiento
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#64748B' }}>
                              {record.treatment}
                            </Typography>
                          </Grid>

                          {record.medications.length > 0 && (
                            <Grid item xs={12} sm={6}>
                              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                                Medicamentos
                              </Typography>
                              {record.medications.map((med, idx) => (
                                <Chip
                                  key={idx}
                                  label={med}
                                  size="small"
                                  sx={{
                                    mr: 1,
                                    mb: 1,
                                    bgcolor: '#F1F5F9',
                                    color: '#475569',
                                  }}
                                />
                              ))}
                            </Grid>
                          )}

                          <Grid item xs={12}>
                            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                              Observaciones
                            </Typography>
                            <Box
                              sx={{
                                p: 2,
                                bgcolor: '#F8FAFC',
                                borderRadius: 2,
                                borderLeft: '3px solid #2563EB',
                              }}
                            >
                              <Typography variant="body2" sx={{ color: '#475569' }}>
                                {record.notes}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
