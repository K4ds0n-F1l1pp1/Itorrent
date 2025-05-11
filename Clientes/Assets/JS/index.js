const mapa = L.map('mapa-tecnicos').setView([-23.5505, -46.6333], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapa);
        const tecnicos = [
            { nome: "João Silva", lat: -23.551, lng: -46.633, especialidade: "Eletricista", avaliacao: 4.5 },
            { nome: "Maria Santos", lat: -23.549, lng: -46.635, especialidade: "Encanadora", avaliacao: 4.8 },
            { nome: "Carlos Oliveira", lat: -23.553, lng: -46.630, especialidade: "TI", avaliacao: 4.3 },
            { nome: "Ana Pereira", lat: -23.548, lng: -46.632, especialidade: "Montadora", avaliacao: 4.7 }
        ];
        
        tecnicos.forEach(tecnico => {
            const icone = L.divIcon({
                html: `<div style="background-color: ${tecnico.avaliacao > 4.5 ? '#038C3E' : '#4AC8FF'}; 
                       color: white; 
                       width: 40px; 
                       height: 40px; 
                       border-radius: 50%; 
                       display: flex; 
                       align-items: center; 
                       justify-content: center;
                       border: 2px solid white;
                       box-shadow: 0 0 5px rgba(0,0,0,0.3);">
                       ${tecnico.nome.charAt(0)}
                      </div>`,
                className: '',
                iconSize: [40, 40]
            });
            
            const marcador = L.marker([tecnico.lat, tecnico.lng], { icon: icone }).addTo(mapa)
                .bindPopup(`<b>${tecnico.nome}</b><br>${tecnico.especialidade}<br>Avaliação: ${'★'.repeat(Math.floor(tecnico.avaliacao))}${'☆'.repeat(5 - Math.floor(tecnico.avaliacao))}`);
        });
        $('.item-menu').click(function() {
            $('.item-menu').removeClass('ativo');
            $(this).addClass('ativo');
            
            const pagina = $(this).find('span').text().toLowerCase().replace(' ', '-');
            $('.conteudo-principal > div').hide();
            
            if (pagina === 'início') {
                $('.pagina-inicio').show();
            } else if (pagina === 'novo-pedido') {
                $('.pagina-inicio').show();
                window.scrollTo(0, $('.secao-pedido').offset().top);
            } else if (pagina === 'acompanhar-serviços') {
                $('.pagina-acompanhamento').show();
            } else if (pagina === 'mapa-de-técnicos') {
                $('.pagina-inicio').show();
                window.scrollTo(0, $('.container-mapa').offset().top);
            } else if (pagina === 'chat') {
                $('.pagina-chat').show();
            } else if (pagina === 'meu-perfil') {
                $('.pagina-perfil').show();
            } else if (pagina === 'orçamentos') {
                $('#modalOrcamento').css('display', 'flex');
            }
        });

        $('#enviar-mensagem').click(function() {
            const mensagem = $('#mensagem-chat').val();
            if (mensagem.trim() !== '') {
                const agora = new Date();
                const hora = agora.getHours() + ':' + (agora.getMinutes() < 10 ? '0' : '') + agora.getMinutes();
                
                $('.mensagens-chat').append(`
                    <div class="mensagem mensagem-enviada">
                        <div class="info-mensagem">
                            <span>Você</span>
                            <span>${hora}</span>
                        </div>
                        <p>${mensagem}</p>
                    </div>
                `);
                
                $('#mensagem-chat').val('');
                $('.mensagens-chat').scrollTop($('.mensagens-chat')[0].scrollHeight);

                setTimeout(() => {
                    const respostas = [
                        "Entendido, vou verificar isso.",
                        "Pode me dar mais detalhes?",
                        "Já estou trabalhando nisso.",
                        "Preciso de mais algumas informações para prosseguir."
                    ];
                    const resposta = respostas[Math.floor(Math.random() * respostas.length)];
                    
                    $('.mensagens-chat').append(`
                        <div class="mensagem mensagem-recebida">
                            <div class="info-mensagem">
                                <span>Técnico João</span>
                                <span>${hora}</span>
                            </div>
                            <p>${resposta}</p>
                        </div>
                    `);
                    
                    $('.mensagens-chat').scrollTop($('.mensagens-chat')[0].scrollHeight);
                }, 1000 + Math.random() * 2000);
            }

            $('#mensagem-chat').keypress(function(e) {
                if (e.which == 13) {
                    $('#enviar-mensagem').click();
                }
            });

            $('.botao-fechar, .botao-cancelar').click(function() {
                $('#modalOrcamento').hide();
            });

            $('.botao-secundario').click(function() {
                $('#modalOrcamento').css('display', 'flex');
            });

            $(window).click(function(e) {
                if (e.target == $('#modalOrcamento')[0]) {
                    $('#modalOrcamento').hide();
                }
            });

            $('#formularioPerfil').submit(function(e) {
                e.preventDefault();
                alert('Perfil atualizado com sucesso!');
            });

            $('#formularioPedido').submit(function(e) {
                e.preventDefault();
                alert('Pedido enviado com sucesso! Os técnicos próximos serão notificados.');
                $('#formularioPedido')[0].reset();
            });
        });