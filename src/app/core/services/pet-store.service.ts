import { Injectable, signal } from '@angular/core';

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  sex: string;
  weight: string;
  owner: string;      // Añadido para que coincida con tu HTML
  lastVisit: string;  // Añadido para que coincida con tu HTML
  vaccines?: string;
  allergies?: string;
  image: string;
  status: string;
  nextVaccine: string;
}

export interface Appointment {
  id: string;
  pet: string;
  type: string;
  date: string;
  time: string;
  doctor: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class PetStoreService {
  
  private petsList = signal<Pet[]>([
    {
      id: '1',
      name: 'Max',
      species: 'Perro',
      breed: 'Golden Retriever',
      age: '3 años',
      sex: 'macho',
      weight: '32 kg',
      owner: 'María López',
      lastVisit: '10 May 2026',
      image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400',
      status: 'Saludable',
      nextVaccine: '15 Jun 2026'
    },
    {
      id: '2',
      name: 'Luna',
      species: 'Gato',
      breed: 'Persa',
      age: '2 años',
      sex: 'hembra',
      weight: '4 kg',
      owner: 'Carlos Ruiz',
      lastVisit: '12 May 2026',
      image: 'https://images.unsplash.com/photo-1559624989-7b9303bd9792?w=400',
      status: 'Control Pendiente',
      nextVaccine: '28 May 2026'
    }
  ]);

  private appointmentsList = signal<Appointment[]>([
    { id: '1', pet: 'Max', date: '25 May 2026', time: '10:00 AM', type: 'Chequeo General', doctor: 'Dr. Juan Pérez', status: 'Confirmada' },
    { id: '2', pet: 'Luna', date: '28 May 2026', time: '3:00 PM', type: 'Vacunación', doctor: 'Dra. María González', status: 'Confirmada' }
  ]);

  public pets = this.petsList.asReadonly();
  public appointments = this.appointmentsList.asReadonly();

  // Método actualizado para aceptar los nuevos campos obligatorios
  addPet(newPet: Omit<Pet, 'id' | 'status' | 'nextVaccine' | 'image' | 'lastVisit'>) {
    const pet: Pet = {
      ...newPet,
      id: Date.now().toString(),
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400',
      status: 'Saludable',
      lastVisit: new Date().toLocaleDateString(),
      nextVaccine: 'Por programar'
    };
    this.petsList.update(current => [...current, pet]);
  }

  addAppointment(newAppointment: Omit<Appointment, 'id' | 'status'>) {
    const appointment: Appointment = {
      ...newAppointment,
      id: Date.now().toString(),
      status: 'Confirmada'
    };
    this.appointmentsList.update(current => [...current, appointment]);
  }

  downloadMedicalHistoryPDF(petName: string) {
    alert(`Generando historial de ${petName}...`);
    // Lógica original de descarga mantenida
  }
}