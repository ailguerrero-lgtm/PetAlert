import { Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface InteractiveCalendarProps {
  availability: Record<string, number>;
  onDateClick: (date: string) => void;
  selectedDate?: string;
}

export default function InteractiveCalendar({ availability, onDateClick, selectedDate }: InteractiveCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Días vacíos antes del primer día del mes
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDayClick = (day: number | null) => {
    if (!day) return;

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const date = new Date(year, month, day);
    const dateStr = date.toISOString().split('T')[0];

    const slots = availability[dateStr];
    if (slots && slots > 0) {
      onDateClick(dateStr);
    }
  };

  const getDateString = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    return new Date(year, month, day).toISOString().split('T')[0];
  };

  const days = getDaysInMonth(currentMonth);
  const today = new Date().toISOString().split('T')[0];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={handlePrevMonth} size="small">
          <ChevronLeft size={20} />
        </IconButton>
        <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Typography>
        <IconButton onClick={handleNextMonth} size="small">
          <ChevronRight size={20} />
        </IconButton>
      </Box>

      {/* Day names */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, mb: 1 }}>
        {dayNames.map((dayName) => (
          <Box
            key={dayName}
            sx={{
              textAlign: 'center',
              py: 1,
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#64748B',
            }}
          >
            {dayName}
          </Box>
        ))}
      </Box>

      {/* Days */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
        {days.map((day, index) => {
          if (!day) {
            return <Box key={`empty-${index}`} />;
          }

          const dateStr = getDateString(day);
          const slots = availability[dateStr] || 0;
          const hasAvailability = slots > 0;
          const isSelected = dateStr === selectedDate;
          const isToday = dateStr === today;

          return (
            <Box
              key={day}
              onClick={() => handleDayClick(day)}
              sx={{
                position: 'relative',
                aspectRatio: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                cursor: hasAvailability ? 'pointer' : 'not-allowed',
                bgcolor: isSelected ? '#2563EB' : isToday ? '#EFF6FF' : 'transparent',
                color: isSelected ? '#FFFFFF' : '#1E293B',
                fontWeight: isToday ? 700 : 500,
                fontSize: '0.875rem',
                transition: 'all 0.2s',
                border: isToday && !isSelected ? '2px solid #2563EB' : '1px solid transparent',
                opacity: hasAvailability ? 1 : 0.5,
                '&:hover': hasAvailability ? {
                  bgcolor: isSelected ? '#1E40AF' : '#F1F5F9',
                  transform: 'scale(1.05)',
                } : {},
              }}
            >
              <Typography sx={{ fontSize: '0.875rem', fontWeight: isToday ? 700 : 500 }}>
                {day}
              </Typography>

              {/* Indicador de disponibilidad */}
              {availability[dateStr] !== undefined && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 4,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: hasAvailability ? '#10B981' : '#EF4444',
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
