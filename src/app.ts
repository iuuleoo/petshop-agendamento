import { Appointment } from './types';

// Função para validar se a data e hora são futuras
function isFutureDateTime(date: string, time: string): boolean {
    const selectedDateTime = new Date(`${date}T${time}`);
    const currentDateTime = new Date();
    return selectedDateTime > currentDateTime;
}

// Função para formatar a data
function formatBrazilianDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const appointmentForm = document.getElementById('appointment-form') as HTMLFormElement;
    const appointmentsList = document.getElementById('appointments-list') as HTMLDivElement;

    appointmentForm.addEventListener('submit', (event: Event) => {
        event.preventDefault();

        const petName = (document.getElementById('pet-name') as HTMLInputElement).value;
        const ownerName = (document.getElementById('owner-name') as HTMLInputElement).value;
        const contact = (document.getElementById('contact') as HTMLInputElement).value;
        const service = (document.getElementById('service') as HTMLSelectElement).value;
        const date = (document.getElementById('date') as HTMLInputElement).value;
        const time = (document.getElementById('time') as HTMLInputElement).value;

        if (!petName || !ownerName || !contact || !service || !date || !time) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        if (!isFutureDateTime(date, time)) {
            alert('Por favor, selecione uma data e hora futuras!');
            return;
        }

        const newAppointment: Appointment = {
            petName,
            ownerName,
            contact,
            service,
            date,
            time
        };

        const appointmentCard = document.createElement('div');
        appointmentCard.classList.add('appointment-card');
        
        appointmentCard.innerHTML = `
            <p><strong>Pet:</strong> ${newAppointment.petName}</p>
            <p><strong>Tutor:</strong> ${newAppointment.ownerName}</p>
            <p><strong>Contato:</strong> ${newAppointment.contact}</p>
            <p><strong>Serviço:</strong> ${newAppointment.service}</p>
            <p><strong>Data:</strong> ${formatBrazilianDate(newAppointment.date)}</p>
            <p><strong>Hora:</strong> ${newAppointment.time}</p>
        `;

        appointmentsList.appendChild(appointmentCard);
        appointmentForm.reset();
    });
});