// Define a estrutura de um objeto de agendamento
export interface Appointment {
    petName: string;
    ownerName: string;
    contact: string;
    service: string;
    date: string;
    time: string;
}

// Define os tipos dos elementos HTML para garantir que o TypeScript entenda
export interface FormElements {
    petName: HTMLInputElement;
    ownerName: HTMLInputElement;
    contact: HTMLInputElement;
    service: HTMLSelectElement;
    date: HTMLInputElement;
    time: HTMLInputElement;
}

// Define uma interface para o mapa de cores dos serviços
export interface ServiceColors {
    [key: string]: string; // A chave é uma string e o valor é uma string
}