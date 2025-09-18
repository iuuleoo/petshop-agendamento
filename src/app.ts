// Importa as interfaces que definimos no arquivo types.ts
import { Appointment, FormElements, ServiceColors } from './types';

// Mapeia os serviços às cores
const serviceColors: ServiceColors = {
    'Banho': '#87CEEB', // Azul claro
    'Banho e Tosa': '#8A2BE2', // Azul violeta
    'Consulta Veterinária': '#32CD32', // Verde
    'Vacinação': '#FF6347', // Vermelho-tomate
};

// Função para validar se a data e hora são futuras
function isFutureDateTime(date: string, time: string): boolean {
    const selectedDateTime = new Date(`${date}T${time}`);
    const currentDateTime = new Date();
    return selectedDateTime > currentDateTime;
}

// Função para formatar a data para o padrão brasileiro (DD/MM/AAAA)
function formatBrazilianDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
}

// Função que cria e adiciona o cartão de agendamento na página com cores dinâmicas
function displayAppointment(appointment: Appointment, container: HTMLDivElement): void {
    const appointmentCard = document.createElement('div');
    appointmentCard.classList.add('appointment-card');
    
    // Define a cor da borda esquerda com base no serviço
    appointmentCard.style.borderLeftColor = serviceColors[appointment.service] || '#2B88D8';

    appointmentCard.innerHTML = `
        <p><strong>Pet:</strong> ${appointment.petName}</p>
        <p><strong>Tutor:</strong> ${appointment.ownerName}</p>
        <p><strong>Contato:</strong> ${appointment.contact}</p>
        <p><strong>Serviço:</strong> ${appointment.service}</p>
        <p><strong>Data:</strong> ${formatBrazilianDate(appointment.date)}</p>
        <p><strong>Hora:</strong> ${appointment.time}</p>
    `;

    container.appendChild(appointmentCard);
}

// Lógica principal
document.addEventListener('DOMContentLoaded', () => {
    const appointmentForm = document.getElementById('appointment-form') as HTMLFormElement;
    const appointmentsList = document.getElementById('appointments-list') as HTMLDivElement;
    
    appointmentForm.addEventListener('submit', (event: Event) => {
        event.preventDefault();

        // Mapeia os elementos do formulário e tipa-os
        const formElements: FormElements = {
            petName: document.getElementById('pet-name') as HTMLInputElement,
            ownerName: document.getElementById('owner-name') as HTMLInputElement,
            contact: document.getElementById('contact') as HTMLInputElement,
            service: document.getElementById('service') as HTMLSelectElement,
            date: document.getElementById('date') as HTMLInputElement,
            time: document.getElementById('time') as HTMLInputElement,
        };

        const newAppointment: Appointment = {
            petName: formElements.petName.value,
            ownerName: formElements.ownerName.value,
            contact: formElements.contact.value,
            service: formElements.service.value,
            date: formElements.date.value,
            time: formElements.time.value,
        };
        
        // Validação usando os dados tipados
        if (!newAppointment.petName || !newAppointment.ownerName || !newAppointment.contact || 
            !newAppointment.service || !newAppointment.date || !newAppointment.time) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        if (!isFutureDateTime(newAppointment.date, newAppointment.time)) {
            alert('Por favor, selecione uma data e hora futuras!');
            return;
        }

        displayAppointment(newAppointment, appointmentsList);
        appointmentForm.reset();
    });
});