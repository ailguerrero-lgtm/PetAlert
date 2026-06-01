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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import {
  FileText,
  Download,
  Calendar,
  Syringe,
  Pill,
  Activity,
  ChevronDown,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

// Mascotas del cliente
const myPets = [
  { id: 1, name: 'Max', species: 'Perro', breed: 'Golden Retriever' },
  { id: 2, name: 'Luna', species: 'Gato', breed: 'Persa' },
];

// Historial médico de ejemplo
const medicalHistory = {
  1: {
    // Max
    consultations: [
      {
        id: 1,
        date: '2026-05-15',
        type: 'Chequeo General',
        doctor: 'Dr. Juan Pérez',
        diagnosis: 'Estado de salud óptimo',
        observations: 'Paciente en excelentes condiciones. Peso adecuado. Sin anomalías detectadas.',
      },
      {
        id: 2,
        date: '2026-04-10',
        type: 'Control Post-Vacunación',
        doctor: 'Dra. María González',
        diagnosis: 'Sin reacciones adversas',
        observations: 'Evolución favorable después de la vacunación antirrábica.',
      },
    ],
    vaccines: [
      {
        id: 1,
        name: 'Vacuna Antirrábica',
        date: '2026-04-05',
        nextDate: '2027-04-05',
        lot: 'VAC-2026-1234',
      },
      {
        id: 2,
        name: 'Vacuna Séxtuple',
        date: '2026-01-15',
        nextDate: '2027-01-15',
        lot: 'VAC-2026-5678',
      },
    ],
    treatments: [
      {
        id: 1,
        name: 'Desparasitación Interna',
        startDate: '2026-03-20',
        duration: '1 dosis',
        status: 'Completado',
      },
    ],
    medications: [
      {
        id: 1,
        name: 'Ivermectina',
        dose: '1 comprimido',
        frequency: 'Dosis única',
        date: '2026-03-20',
      },
    ],
  },
  2: {
    // Luna
    consultations: [
      {
        id: 1,
        date: '2026-05-20',
        type: 'Consulta General',
        doctor: 'Dr. Luis Martínez',
        diagnosis: 'Control de rutina',
        observations: 'Paciente con buen estado general. Se recomienda vacunación próxima.',
      },
    ],
    vaccines: [
      {
        id: 1,
        name: 'Vacuna Triple Felina',
        date: '2026-02-10',
        nextDate: '2027-02-10',
        lot: 'VAC-2026-9012',
      },
    ],
    treatments: [],
    medications: [],
  },
};

export default function ClientMedicalHistory() {
  const [selectedPet, setSelectedPet] = useState(0);

  const currentPet = myPets[selectedPet];
  const currentHistory = medicalHistory[currentPet.id as keyof typeof medicalHistory];

  const handleDownloadPDF = () => {
    console.log(`Descargando historial médico de ${currentPet.name}...`);
    // Aquí iría la lógica para generar y descargar el PDF
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar isAdmin={false} />

        <Box sx={{ flexGrow: 1, ml: '260px' }}>
          <Topbar userName="María López" userRole="Cliente" />

          <Container maxWidth="xl" sx={{ mt: 10, py: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1E293B' }}>
                  Historial Médico
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B', mt: 1 }}>
                  Visualiza el historial médico completo de tus mascotas
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<Download size={20} />}
                onClick={handleDownloadPDF}
                sx={{
                  bgcolor: '#2563EB',
                  '&:hover': { bgcolor: '#1E40AF' },
                  px: 3,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                }}
              >
                Descargar PDF
              </Button>
            </Box>

            {/* Pet Selector */}
            <Paper sx={{ mb: 3, borderRadius: 3, border: '1px solid #E2E8F0' }}>
              <Tabs
                value={selectedPet}
                onChange={(_, newValue) => setSelectedPet(newValue)}
                sx={{ px: 2 }}
              >
                {myPets.map((pet, index) => (
                  <Tab
                    key={pet.id}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ fontWeight: 600 }}>{pet.name}</Typography>
                        <Typography variant="caption" sx={{ color: '#64748B' }}>
                          {pet.species}
                        </Typography>
                      </Box>
                    }
                  />
                ))}
              </Tabs>
            </Paper>

            <Grid container spacing={3}>
              {/* Consultas */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0', height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Calendar size={24} color="#2563EB" />
                    <Typography variant="h6" sx={{ ml: 2, fontWeight: 600 }}>
                      Consultas
                    </Typography>
                    <Chip
                      label={currentHistory.consultations.length}
                      size="small"
                      sx={{ ml: 'auto', bgcolor: '#EFF6FF', color: '#2563EB', fontWeight: 600 }}
                    />
                  </Box>

                  {currentHistory.consultations.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Calendar size={48} color="#CBD5E1" style={{ marginBottom: 16 }} />
                      <Typography variant="body2" sx={{ color: '#64748B' }}>
                        No hay consultas registradas
                      </Typography>
                    </Box>
                  ) : (
                    currentHistory.consultations.map((consultation) => (
                      <Accordion
                        key={consultation.id}
                        sx={{
                          mb: 2,
                          borderRadius: 2,
                          border: '1px solid #E2E8F0',
                          '&:before': { display: 'none' },
                          boxShadow: 'none',
                        }}
                      >
                        <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {consultation.type}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#64748B' }}>
                              {consultation.date} • {consultation.doctor}
                            </Typography>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Divider sx={{ mb: 2 }} />
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                              Diagnóstico
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                              {consultation.diagnosis}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                              Observaciones
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                              {consultation.observations}
                            </Typography>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    ))
                  )}
                </Paper>
              </Grid>

              {/* Vacunas */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0', height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Syringe size={24} color="#10B981" />
                    <Typography variant="h6" sx={{ ml: 2, fontWeight: 600 }}>
                      Vacunas
                    </Typography>
                    <Chip
                      label={currentHistory.vaccines.length}
                      size="small"
                      sx={{ ml: 'auto', bgcolor: '#D1FAE5', color: '#10B981', fontWeight: 600 }}
                    />
                  </Box>

                  {currentHistory.vaccines.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Syringe size={48} color="#CBD5E1" style={{ marginBottom: 16 }} />
                      <Typography variant="body2" sx={{ color: '#64748B' }}>
                        No hay vacunas registradas
                      </Typography>
                    </Box>
                  ) : (
                    currentHistory.vaccines.map((vaccine) => (
                      <Box
                        key={vaccine.id}
                        sx={{
                          p: 2.5,
                          mb: 2,
                          borderRadius: 2,
                          border: '1px solid #E2E8F0',
                          bgcolor: '#FAFAFA',
                        }}
                      >
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                          {vaccine.name}
                        </Typography>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                              Fecha Aplicación
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {vaccine.date}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                              Próxima Dosis
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#10B981' }}>
                              {vaccine.nextDate}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                              Lote
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {vaccine.lot}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    ))
                  )}
                </Paper>
              </Grid>

              {/* Tratamientos */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0', height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Activity size={24} color="#F59E0B" />
                    <Typography variant="h6" sx={{ ml: 2, fontWeight: 600 }}>
                      Tratamientos
                    </Typography>
                    <Chip
                      label={currentHistory.treatments.length}
                      size="small"
                      sx={{ ml: 'auto', bgcolor: '#FEF3C7', color: '#F59E0B', fontWeight: 600 }}
                    />
                  </Box>

                  {currentHistory.treatments.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Activity size={48} color="#CBD5E1" style={{ marginBottom: 16 }} />
                      <Typography variant="body2" sx={{ color: '#64748B' }}>
                        No hay tratamientos registrados
                      </Typography>
                    </Box>
                  ) : (
                    currentHistory.treatments.map((treatment) => (
                      <Box
                        key={treatment.id}
                        sx={{
                          p: 2.5,
                          mb: 2,
                          borderRadius: 2,
                          border: '1px solid #E2E8F0',
                          bgcolor: '#FAFAFA',
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {treatment.name}
                          </Typography>
                          <Chip
                            label={treatment.status}
                            size="small"
                            sx={{
                              bgcolor: treatment.status === 'Completado' ? '#D1FAE5' : '#FEF3C7',
                              color: treatment.status === 'Completado' ? '#10B981' : '#F59E0B',
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                        <Typography variant="body2" sx={{ color: '#64748B', mb: 1 }}>
                          Inicio: {treatment.startDate}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748B' }}>
                          Duración: {treatment.duration}
                        </Typography>
                      </Box>
                    ))
                  )}
                </Paper>
              </Grid>

              {/* Medicamentos */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0', height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Pill size={24} color="#EC4899" />
                    <Typography variant="h6" sx={{ ml: 2, fontWeight: 600 }}>
                      Medicamentos
                    </Typography>
                    <Chip
                      label={currentHistory.medications.length}
                      size="small"
                      sx={{ ml: 'auto', bgcolor: '#FCE7F3', color: '#EC4899', fontWeight: 600 }}
                    />
                  </Box>

                  {currentHistory.medications.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Pill size={48} color="#CBD5E1" style={{ marginBottom: 16 }} />
                      <Typography variant="body2" sx={{ color: '#64748B' }}>
                        No hay medicamentos registrados
                      </Typography>
                    </Box>
                  ) : (
                    currentHistory.medications.map((medication) => (
                      <Box
                        key={medication.id}
                        sx={{
                          p: 2.5,
                          mb: 2,
                          borderRadius: 2,
                          border: '1px solid #E2E8F0',
                          bgcolor: '#FAFAFA',
                        }}
                      >
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                          {medication.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748B', mb: 0.5 }}>
                          Dosis: {medication.dose}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748B', mb: 0.5 }}>
                          Frecuencia: {medication.frequency}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748B' }}>
                          Fecha: {medication.date}
                        </Typography>
                      </Box>
                    ))
                  )}
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
