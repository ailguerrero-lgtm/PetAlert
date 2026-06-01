import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Container, Typography, Button, Paper, TextField, Select, MenuItem, FormControl, InputLabel, IconButton } from '@mui/material';
import { Heart, Shield, Clock, Instagram } from 'lucide-react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function LandingPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('cliente');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userType === 'veterinario') {
      navigate('/admin');
    } else {
      navigate('/client');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F8FAFC' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
          color: 'white',
          pt: 8,
          pb: 12,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
              <Heart size={48} fill="white" />
            </Box>
            <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              PetAlert
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.95, fontWeight: 300 }}>
              Atención veterinaria rápida, inteligente y segura para tus mascotas
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{
                  bgcolor: 'white',
                  color: '#2563EB',
                  '&:hover': { bgcolor: '#F1F5F9' },
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                }}
              >
                Comenzar
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                }}
              >
                Siguiente
              </Button>
            </Box>
          </Box>

          {/* Hero Image */}
          <Box
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1654895716780-b4664497420d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwY2xpbmljJTIwbW9kZXJuJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3Nzk1Njk5OTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Veterinary Clinic"
              style={{ width: '100%', display: 'block' }}
            />
          </Box>
        </Container>
      </Box>

      {/* About Section */}
      <Box id="about-section" sx={{ py: 10, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 2, fontWeight: 700, color: '#1E293B' }}>
            ¿Quiénes somos?
          </Typography>
          <Typography variant="h6" sx={{ textAlign: 'center', mb: 6, color: '#64748B', maxWidth: 800, mx: 'auto', lineHeight: 1.8 }}>
            PetAlert es una plataforma inteligente diseñada para ayudar a clínicas veterinarias a gestionar emergencias,
            citas e historiales médicos de mascotas de forma rápida y organizada.
          </Typography>

          {/* Features Grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4, mt: 8 }}>
            <Paper elevation={0} sx={{ p: 4, textAlign: 'center', border: '1px solid #E2E8F0', borderRadius: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Box sx={{ bgcolor: '#DBEAFE', p: 2, borderRadius: '50%' }}>
                  <Clock size={32} color="#2563EB" />
                </Box>
              </Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Atención Rápida
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B' }}>
                Sistema de emergencias que prioriza casos urgentes para atención inmediata
              </Typography>
            </Paper>

            <Paper elevation={0} sx={{ p: 4, textAlign: 'center', border: '1px solid #E2E8F0', borderRadius: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Box sx={{ bgcolor: '#D1FAE5', p: 2, borderRadius: '50%' }}>
                  <Heart size={32} color="#10B981" />
                </Box>
              </Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Cuidado Integral
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B' }}>
                Historial médico completo y seguimiento personalizado para cada mascota
              </Typography>
            </Paper>

            <Paper elevation={0} sx={{ p: 4, textAlign: 'center', border: '1px solid #E2E8F0', borderRadius: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Box sx={{ bgcolor: '#DBEAFE', p: 2, borderRadius: '50%' }}>
                  <Shield size={32} color="#2563EB" />
                </Box>
              </Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Seguridad Total
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B' }}>
                Información protegida y accesible solo para veterinarios autorizados
              </Typography>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* Auth Section */}
      <Box id="auth-section" sx={{ py: 10, bgcolor: '#F8FAFC' }}>
        <Container maxWidth="md">
          <Paper
            elevation={3}
            sx={{
              p: 5,
              borderRadius: 4,
              maxWidth: 500,
              mx: 'auto',
            }}
          >
            <Typography variant="h4" sx={{ textAlign: 'center', mb: 1, fontWeight: 700, color: '#1E293B' }}>
              {isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', mb: 4, color: '#64748B' }}>
              Accede a tu plataforma veterinaria
            </Typography>

            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Correo electrónico"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 3 }}
                required
              />

              <TextField
                fullWidth
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 3 }}
                required
              />

              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel>Tipo de Usuario</InputLabel>
                <Select
                  value={userType}
                  label="Tipo de Usuario"
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <MenuItem value="veterinario">Veterinario</MenuItem>
                  <MenuItem value="cliente">Cliente</MenuItem>
                </Select>
              </FormControl>

              <Button
                fullWidth
                variant="contained"
                type="submit"
                size="large"
                sx={{
                  bgcolor: '#2563EB',
                  py: 1.5,
                  fontWeight: 600,
                  '&:hover': { bgcolor: '#1E40AF' },
                }}
              >
                {isRegister ? 'Registrarse' : 'Ingresar'}
              </Button>

              <Button
                fullWidth
                onClick={() => setIsRegister(!isRegister)}
                sx={{ mt: 2, color: '#64748B' }}
              >
                {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#1E293B', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 6 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Heart size={32} fill="white" />
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 700 }}>
                  PetAlert
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 3, opacity: 0.8 }}>
                Sistema inteligente de gestión veterinaria para el cuidado profesional de tus mascotas.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton
                  sx={{ bgcolor: '#334155', color: 'white', '&:hover': { bgcolor: '#475569' } }}
                  href="https://instagram.com"
                  target="_blank"
                >
                  <Instagram size={20} />
                </IconButton>
                <IconButton
                  sx={{ bgcolor: '#10B981', color: 'white', '&:hover': { bgcolor: '#059669' } }}
                  href="https://wa.me/1234567890"
                  target="_blank"
                >
                  <WhatsAppIcon />
                </IconButton>
              </Box>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Horarios de Atención
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
                Lunes a Viernes: 8:00 AM - 8:00 PM
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
                Sábados: 9:00 AM - 6:00 PM
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
                Domingos: 10:00 AM - 2:00 PM
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, color: '#EF4444', fontWeight: 600 }}>
                Emergencias 24/7
              </Typography>
            </Box>
          </Box>

          <Box sx={{ borderTop: '1px solid #334155', mt: 6, pt: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              © 2026 PetAlert. Todos los derechos reservados.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
