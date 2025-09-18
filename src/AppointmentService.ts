import { Appointment, ServiceColors } from './types';

export class AppointmentService {
    private appointmentsList: HTMLDivElement;
    private serviceColors: ServiceColors;

    constructor(appointmentsListId: string, colors: ServiceColors) {
        const listElement = document.getElementById(appointmentsListId);
        if (!listElement) {
            throw new Error(`Element with id "${appointmentsListId}" not found.`);
        }
        this.appointmentsList = listElement as HTMLDivElement;
        this.serviceColors = colors;
        this.loadAppointments(); // Adiciona essa linha
    }

    public isFutureDateTime(date: string, time: string): boolean {
        const selectedDateTime = new Date(`${date}T${time}`);
        const currentDateTime = new Date();
        return selectedDateTime > currentDateTime;
    }

    private formatBrazilianDate(date: string): string {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    }

    public displayAppointment(appointment: Appointment): void {
        const appointmentCard = document.createElement('div');
        appointmentCard.classList.add('appointment-card');
        
        appointmentCard.style.borderLeftColor = this.serviceColors[appointment.service] || '#2B88D8';

        appointmentCard.innerHTML = `
            <p><strong>Pet:</strong> ${appointment.petName}</p>
            <p><strong>Tutor:</strong> ${appointment.ownerName}</p>
            <p><strong>Contato:</strong> ${appointment.contact}</p>
            <p><strong>Serviço:</strong> ${appointment.service}</p>
            <p><strong>Data:</strong> ${this.formatBrazilianDate(appointment.date)}</p>
            <p><strong>Hora:</strong> ${appointment.time}</p>
        `;

        this.appointmentsList.appendChild(appointmentCard);
    }
    
    // Novo método para salvar os agendamentos no localStorage
    private saveAppointments(appointments: Appointment[]): void {
        localStorage.setItem('appointments', JSON.stringify(appointments));
    }
    
    // Novo método para carregar os agendamentos do localStorage
    private loadAppointments(): void {
        const storedAppointments = localStorage.getItem('appointments');
        if (storedAppointments) {
            const appointments: Appointment[] = JSON.parse(storedAppointments);
            appointments.forEach(appointment => this.displayAppointment(appointment));
        }
    }
}