import { Appointment, FormElements } from './types';
import { AppointmentService } from './AppointmentService';

const serviceColors = {
    'Banho': '#87CEEB',
    'Banho e Tosa': '#8A2BE2',
    'Consulta Veterinária': '#32CD32',
    'Vacinação': '#FF6347',
};

// Array para armazenar os agendamentos
const appointments: Appointment[] = [];

// Lógica principal
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('appointment-form') as HTMLFormElement;
    
    const appointmentService = new AppointmentService('appointments-list', serviceColors);
    
    form.addEventListener('submit', (event: Event) => {
        event.preventDefault();

        const formElements: FormElements = {
            petName: document.getElementById('pet-name') as HTMLInputElement,
            ownerName: document.getElementById('owner-name') as HTMLInputElement,
            contact: document.getElementById('contact') as HTMLInputElement,
            service: document.getElementById('service') as HTMLSelectElement,
            date: document.getElementById('date') as HTMLInputElement,
            time: document.getElementById('time') as HTMLInputElement,
        };

        if (!formElements.petName || !formElements.ownerName || !formElements.contact || !formElements.service || !formElements.date || !formElements.time) {
            console.error('Um ou mais elementos do formulário não foram encontrados.');
            return;
        }

        const newAppointment: Appointment = {
            petName: formElements.petName.value,
            ownerName: formElements.ownerName.value,
            contact: formElements.contact.value,
            service: formElements.service.value,
            date: formElements.date.value,
            time: formElements.time.value,
        };
        
        if (!newAppointment.petName || !newAppointment.ownerName || !newAppointment.contact || 
            !newAppointment.service || !newAppointment.date || !newAppointment.time) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        if (!appointmentService.isFutureDateTime(newAppointment.date, newAppointment.time)) {
            alert('Por favor, selecione uma data e hora futuras!');
            return;
        }
        
        // Adiciona o novo agendamento ao array e salva
        appointments.push(newAppointment);
        // Chama o método para salvar os dados
        localStorage.setItem('appointments', JSON.stringify(appointments));

        appointmentService.displayAppointment(newAppointment);
        form.reset();
    });
});