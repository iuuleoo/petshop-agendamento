// Espera o conteúdo da página carregar completamente
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os elementos do DOM
    const appointmentForm = document.getElementById('appointment-form');
    const appointmentsList = document.getElementById('appointments-list');

    // Adiciona um "ouvinte" para o evento de envio do formulário
    appointmentForm.addEventListener('submit', (event) => {
        // Previne o comportamento padrão do formulário (que é recarregar a página)
        event.preventDefault();

        // Captura os valores dos campos do formulário
        const petName = document.getElementById('pet-name').value;
        const ownerName = document.getElementById('owner-name').value;
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        // Validação simples (pode ser melhorada)
        if (!petName || !ownerName || !service || !date || !time) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        // Cria o elemento HTML para o novo agendamento
        const appointmentCard = document.createElement('div');
        appointmentCard.classList.add('appointment-card');
        
        // Formata a data para o padrão brasileiro
        const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('pt-BR');

        // Adiciona todos os valores capturados ao cartão de agendamento
        appointmentCard.innerHTML = `
            <p><strong>Pet:</strong> ${petName}</p>
            <p><strong>Tutor:</strong> ${ownerName}</p>
            <p><strong>Serviço:</strong> ${service}</p>
            <p><strong>Data:</strong> ${formattedDate}</p>
            <p><strong>Hora:</strong> ${time}</p>
        `;

        // Adiciona o novo card à lista de agendamentos
        appointmentsList.appendChild(appointmentCard);

        // Limpa o formulário após o envio
        appointmentForm.reset();
    });
});