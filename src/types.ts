// Define a estrutura de um objeto de agendamento
export interface Appointment {
    petName: string;
    ownerName: string;
    contact: string;
    service: string;
    date: string;
    time: string;
}

// Define os tipos dos elementos HTML
export interface FormElements {
    petName: HTMLInputElement | null;
    ownerName: HTMLInputElement | null;
    contact: HTMLInputElement | null;
    service: HTMLSelectElement | null;
    date: HTMLInputElement | null;
    time: HTMLInputElement | null;
}

// Define uma interface para o mapa de cores dos serviços
export interface ServiceColors {
    [key: string]: string;
}