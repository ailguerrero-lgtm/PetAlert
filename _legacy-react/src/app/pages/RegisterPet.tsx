import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Container, Paper, Typography, TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel, IconButton } from '@mui/material';
import { ArrowLeft, Upload, Save, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

export default function RegisterPet() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    sex: '',
    weight: '',
    vaccines: '',
    allergies: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Guardar mascota
    navigate('/client');
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar isAdmin={false} />

        <Box sx={{ flexGrow: 1, ml: '260px' }}>
          <Topbar userName="María López" userRole="Cliente" />

        <Container maxWidth="md" sx={{ mt: 10, py: 4 }}>
          <Button
            startIcon={<ArrowLeft size={20} />}
            onClick={() => navigate('/client')}
            sx={{ mb: 3, color: '#64748B' }}
          >
            Volver
          </Button>

          <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid #E2E8F0' }}>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 700, color: '#1E293B' }}>
              Registrar Nueva Mascota
            </Typography>
            <Typography variant="body2" sx={{ mb: 4, color: '#64748B' }}>
              Completa la información de tu mascota para crear su perfil médico
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Photo Upload */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      border: '2px dashed #CBD5E1',
                      borderRadius: 3,
                      p: 4,
                      textAlign: 'center',
                      cursor: 'pointer',
                      '&:hover': { borderColor: '#2563EB', bgcolor: '#F8FAFC' },
                    }}
                  >
                    <Upload size={48} color="#64748B" style={{ marginBottom: 16 }} />
                    <Typography variant="body1" sx={{ color: '#64748B', mb: 1 }}>
                      Subir fotografía de tu mascota
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                      PNG, JPG hasta 5MB
                    </Typography>
                  </Box>
                </Grid>

                {/* Basic Info */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Especie</InputLabel>
                    <Select
                      value={formData.species}
                      label="Especie"
                      onChange={(e) => handleChange('species', e.target.value)}
                    >
                      <MenuItem value="perro">Perro</MenuItem>
                      <MenuItem value="gato">Gato</MenuItem>
                      <MenuItem value="ave">Ave</MenuItem>
                      <MenuItem value="conejo">Conejo</MenuItem>
                      <MenuItem value="otro">Otro</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Raza"
                    value={formData.breed}
                    onChange={(e) => handleChange('breed', e.target.value)}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Edad"
                    value={formData.age}
                    onChange={(e) => handleChange('age', e.target.value)}
                    placeholder="Ej: 3 años"
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Sexo</InputLabel>
                    <Select
                      value={formData.sex}
                      label="Sexo"
                      onChange={(e) => handleChange('sex', e.target.value)}
                    >
                      <MenuItem value="macho">Macho</MenuItem>
                      <MenuItem value="hembra">Hembra</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Peso"
                    value={formData.weight}
                    onChange={(e) => handleChange('weight', e.target.value)}
                    placeholder="Ej: 15 kg"
                    required
                  />
                </Grid>

                {/* Medical Info */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Vacunas Aplicadas"
                    value={formData.vaccines}
                    onChange={(e) => handleChange('vaccines', e.target.value)}
                    multiline
                    rows={3}
                    placeholder="Lista de vacunas que tiene tu mascota..."
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Alergias o Condiciones Médicas"
                    value={formData.allergies}
                    onChange={(e) => handleChange('allergies', e.target.value)}
                    multiline
                    rows={3}
                    placeholder="Describe cualquier alergia o condición médica conocida..."
                  />
                </Grid>

                {/* Actions */}
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/client')}
                      startIcon={<X size={18} />}
                      sx={{ px: 3, py: 1.5 }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<Save size={18} />}
                      sx={{
                        bgcolor: '#2563EB',
                        '&:hover': { bgcolor: '#1E40AF' },
                        px: 3,
                        py: 1.5,
                        fontWeight: 600,
                      }}
                    >
                      Guardar Mascota
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
