const map = L.map('technicians-map').setView([-23.5505, -46.6333], 12);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const technicians = [
            { name: "João Silva", lat: -23.551, lng: -46.633, specialty: "Eletricista" },
            { name: "Maria Andrade", lat: -23.549, lng: -46.635, specialty: "Encanadora" },
            { name: "Carlos Souza", lat: -23.553, lng: -46.630, specialty: "Técnico de TI" },
            { name: "Ana Santos", lat: -23.548, lng: -46.632, specialty: "Montadora" }
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

        $('#technicianForm').submit(function(e) {
            e.preventDefault();
            alert('Técnico cadastrado com sucesso!');
            $('#addTechnicianModal').hide();
        });

        $('.chat-input button').click(function() {
            const message = $('.chat-input input').val();
            if (message.trim() !== '') {
                const now = new Date();
                const timeString = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
                
                $('.chat-messages').append(`
                    <div class="message sent">
                        <div class="message-info">
                            <span>Você</span>
                            <span>${timeString}</span>
                        </div>
                        <p>${message}</p>
                    </div>
                `);
                
                $('.chat-input input').val('');
                $('.chat-messages').scrollTop($('.chat-messages')[0].scrollHeight);
            }
        });

        $('.chat-input input').keypress(function(e) {
            if (e.which == 13) {
                $('.chat-input button').click();
            }
        });