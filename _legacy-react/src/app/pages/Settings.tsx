import { useState } from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Grid, Switch, FormControlLabel, Divider, Avatar } from '@mui/material';
import { Save, Bell, Lock, User, Building, Palette } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    emergencias: true,
    citas: true,
    reportes: false,
  });

  return (
    <Box sx={{ display: 'flex', bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      <Sidebar isAdmin={true} />

      <Box sx={{ flexGrow: 1, ml: '260px' }}>
        <Topbar userName="Dr. Juan Pérez" userRole="Veterinario Principal" />

        <Container maxWidth="lg" sx={{ mt: 10, py: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1E293B', mb: 4 }}>
            Configuración
          </Typography>

          <Grid container spacing={3}>
            {/* Profile Settings */}
            <Grid item xs={12}>
              <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <User size={24} color="#2563EB" />
                  <Typography variant="h6" sx={{ ml: 2, fontWeight: 600 }}>
                    Perfil Personal
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Avatar
                        sx={{
                          width: 120,
                          height: 120,
                          bgcolor: '#2563EB',
                          fontSize: '2.5rem',
                          mx: 'auto',
                          mb: 2,
                        }}
                      >
                        JP
                      </Avatar>
                      <Button variant="outlined" size="small">
                        Cambiar Foto
                      </Button>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={9}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Nombre" defaultValue="Dr. Juan Pérez" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Correo Electrónico" defaultValue="juan.perez@petalert.com" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Teléfono" defaultValue="+1 234-567-8901" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Especialidad" defaultValue="Cirugía General" />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Biografía"
                          multiline
                          rows={3}
                          defaultValue="Veterinario con 10 años de experiencia en cirugía general y emergencias."
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                  <Button
                    variant="contained"
                    startIcon={<Save size={18} />}
                    sx={{
                      bgcolor: '#2563EB',
                      '&:hover': { bgcolor: '#1E40AF' },
                      px: 3,
                      fontWeight: 600,
                    }}
                  >
                    Guardar Cambios
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Clinic Settings */}
            <Grid item xs={12}>
              <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Building size={24} color="#2563EB" />
                  <Typography variant="h6" sx={{ ml: 2, fontWeight: 600 }}>
                    Información de la Clínica
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Nombre de la Clínica" defaultValue="Clínica Veterinaria PetAlert" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Teléfono Principal" defaultValue="+1 800-PET-ALERT" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Dirección"
                      defaultValue="123 Calle Principal, Ciudad, País"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Horario de Atención" defaultValue="Lun-Vie: 8AM - 8PM" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Email de Contacto" defaultValue="info@petalert.com" />
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                  <Button
                    variant="contained"
                    startIcon={<Save size={18} />}
                    sx={{
                      bgcolor: '#2563EB',
                      '&:hover': { bgcolor: '#1E40AF' },
                      px: 3,
                      fontWeight: 600,
                    }}
                  >
                    Guardar Cambios
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Notifications */}
            <Grid item xs={12}>
              <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Bell size={24} color="#2563EB" />
                  <Typography variant="h6" sx={{ ml: 2, fontWeight: 600 }}>
                    Notificaciones
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.email}
                        onChange={(e) =>
                          setNotifications({ ...notifications, email: e.target.checked })
                        }
                      />
                    }
                    label="Notificaciones por correo electrónico"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.sms}
                        onChange={(e) =>
                          setNotifications({ ...notifications, sms: e.target.checked })
                        }
                      />
                    }
                    label="Notificaciones por SMS"
                  />

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748B' }}>
                    Tipos de Notificaciones
                  </Typography>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.emergencias}
                        onChange={(e) =>
                          setNotifications({ ...notifications, emergencias: e.target.checked })
                        }
                      />
                    }
                    label="Alertas de emergencias"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.citas}
                        onChange={(e) =>
                          setNotifications({ ...notifications, citas: e.target.checked })
                        }
                      />
                    }
                    label="Recordatorios de citas"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.reportes}
                        onChange={(e) =>
                          setNotifications({ ...notifications, reportes: e.target.checked })
                        }
                      />
                    }
                    label="Reportes semanales"
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                  <Button
                    variant="contained"
                    startIcon={<Save size={18} />}
                    sx={{
                      bgcolor: '#2563EB',
                      '&:hover': { bgcolor: '#1E40AF' },
                      px: 3,
                      fontWeight: 600,
                    }}
                  >
                    Guardar Preferencias
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Security */}
            <Grid item xs={12}>
              <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Lock size={24} color="#2563EB" />
                  <Typography variant="h6" sx={{ ml: 2, fontWeight: 600 }}>
                    Seguridad
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Contraseña Actual"
                      placeholder="Ingresa tu contraseña actual"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Nueva Contraseña"
                      placeholder="Ingresa nueva contraseña"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Confirmar Contraseña"
                      placeholder="Confirma tu nueva contraseña"
                    />
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                  <Button
                    variant="contained"
                    startIcon={<Lock size={18} />}
                    sx={{
                      bgcolor: '#2563EB',
                      '&:hover': { bgcolor: '#1E40AF' },
                      px: 3,
                      fontWeight: 600,
                    }}
                  >
                    Cambiar Contraseña
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Theme */}
            <Grid item xs={12}>
              <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Palette size={24} color="#2563EB" />
                  <Typography variant="h6" sx={{ ml: 2, fontWeight: 600 }}>
                    Apariencia
                  </Typography>
                </Box>

                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Modo oscuro"
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                  <Button
                    variant="contained"
                    startIcon={<Save size={18} />}
                    sx={{
                      bgcolor: '#2563EB',
                      '&:hover': { bgcolor: '#1E40AF' },
                      px: 3,
                      fontWeight: 600,
                    }}
                  >
                    Guardar Preferencias
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
