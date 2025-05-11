const map = L.map('technicians-map').setView([-27.0969, -52.6178], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const technicians = [
    { name: "João Silva", lat: -27.095, lng: -52.618, specialty: "Eletricista" },
    { name: "Maria Andrade", lat: -27.098, lng: -52.620, specialty: "Encanadora" },
    { name: "Carlos Souza", lat: -27.097, lng: -52.615, specialty: "Técnico de TI" },
    { name: "Ana Santos", lat: -27.094, lng: -52.616, specialty: "Montadora" }
];

technicians.forEach(tech => {
    const marker = L.marker([tech.lat, tech.lng]).addTo(map)
        .bindPopup(`<b>${tech.name}</b><br>${tech.specialty}`);
});

$('.nav-item:nth-child(3)').click(function() {
    $('#addTechnicianModal').css('display', 'flex');
});

$('.close-modal').click(function() {
    $('#addTechnicianModal').hide();
});

$(window).click(function(e) {
    if (e.target == $('#addTechnicianModal')[0]) {
        $('#addTechnicianModal').hide();
    }
});

$(document).keyup(function(e) {
    if (e.key === "Escape") {
        $('#addTechnicianModal').hide();
    }
});

// ===== FORMULÁRIO DE TÉCNICOS ===== //
$('#technicianForm').submit(function(e) {
    e.preventDefault();

    const name = $('#techName').val().trim();
    const specialty = $('#techSpecialty').val().trim();
    const lat = parseFloat($('#techLat').val());
    const lng = parseFloat($('#techLng').val());

    if (!name || !specialty || isNaN(lat) || isNaN(lng)) {
        alert('Preencha todos os campos corretamente!');
        return;
    }

    const newTech = { name, specialty, lat, lng };
    addTechnicianToMap(newTech);

    saveTechnicianToLocalStorage(newTech);

    alert('Técnico cadastrado com sucesso!');
    $('#technicianForm')[0].reset();
    $('#addTechnicianModal').hide();
});

function addTechnicianToMap(tech) {
    L.marker([tech.lat, tech.lng])
        .addTo(map)
        .bindPopup(`<b>${tech.name}</b><br>${tech.specialty}`);
}

function saveTechnicianToLocalStorage(tech) {
    const technicians = JSON.parse(localStorage.getItem('technicians') || '[]');
    technicians.push(tech);
    localStorage.setItem('technicians', JSON.stringify(technicians));
}

// ===== CHAT ===== //
$('.chat-input button').click(sendMessage);
$('.chat-input input').keypress(function(e) {
    if (e.which == 13) sendMessage();
});

function sendMessage() {
    const input = $('.chat-input input');
    const message = input.val().trim();
    
    if (!message) return;

    appendMessage(message, 'sent', 'Você');
    input.val('');

    setTimeout(() => {
        const responses = [
            "Entendido, como posso ajudar?",
            "Vou verificar isso para você.",
            "Ótimo, estamos analisando sua solicitação."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        appendMessage(randomResponse, 'received', 'Suporte');
    }, 1000);
}

function appendMessage(text, type, sender) {
    const now = new Date();
    const timeString = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    
    $('.chat-messages').append(`
        <div class="message ${type}">
            <div class="message-info">
                <span>${sender}</span>
                <span>${timeString}</span>
            </div>
            <p>${text}</p>
        </div>
    `);

    $('.chat-messages').scrollTop($('.chat-messages')[0].scrollHeight);
}