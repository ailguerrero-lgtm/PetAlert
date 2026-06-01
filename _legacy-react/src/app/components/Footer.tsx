import { Box, Container, Typography, IconButton } from '@mui/material';
import { Heart } from 'lucide-react';
import { Instagram } from 'lucide-react';

// WhatsApp Icon Component
function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#1E293B', color: 'white', py: 6, mt: 'auto' }}>
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
  );
}
