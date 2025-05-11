$('.item-menu').click(function() {
    $('.item-menu').removeClass('ativo');
    $(this).addClass('ativo');
    
    const pagina = $(this).find('span').text().toLowerCase().replace(' ', '-');
    $('.conteudo-principal > div').hide();
    
    if (pagina === 'início') {
        $('.pagina-inicio').show();
    } else if (pagina === 'pedidos-disponíveis') {
        $('.pagina-inicio').show();
        window.scrollTo(0, $('.secao-pedidos:first').offset().top);
    } else if (pagina === 'meus-serviços') {
        $('.pagina-inicio').show();
        window.scrollTo(0, $('.secao-pedidos:last').offset().top);
    } else if (pagina === 'orçamentos') {
        $('#modalOrcamentoTecnico').css('display', 'flex');
    } else if (pagina === 'chat') {
        $('.pagina-chat').show();
    } else if (pagina === 'pedir-peças') {
        $('#modalPedidoPecas').css('display', 'flex');
    } else if (pagina === 'meu-perfil') {
        $('.pagina-perfil').show();
    } else if (pagina === 'multas') {
        alert("Você tem 1 multa pendente:\n\nMotivo: Atraso na entrega do serviço #1234\nValor: R$ 50,00\nStatus: Pendente de pagamento");
    }
});

// Botão "Acompanhar" nos serviços
$('.botao-secundario:contains("Acompanhar")').click(function() {
    $('.pagina-inicio').hide();
    $('.pagina-acompanhamento').show();
});

// Botão "Voltar" no acompanhamento
$('.voltar-servicos').click(function() {
    $('.pagina-acompanhamento').hide();
    $('.pagina-inicio').show();
});

// Botão "Atualizar Progresso" no acompanhamento
$('.botao-primario:contains("Atualizar Progresso")').click(function() {
    $('#modalAtualizacaoEtapa').css('display', 'flex');
});

// Chat do técnico
$('#enviar-mensagem-tecnico').click(function() {
    const mensagem = $('#mensagem-chat-tecnico').val();
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
        
        $('#mensagem-chat-tecnico').val('');
        $('.mensagens-chat').scrollTop($('.mensagens-chat')[0].scrollHeight);
        
        // Simular resposta do cliente
        setTimeout(() => {
            const respostas = [
                "Entendido, obrigado pela informação.",
                "Posso confirmar isso amanhã?",
                "Preciso pensar sobre essa solução.",
                "Ok, pode prosseguir com o serviço."
            ];
            const resposta = respostas[Math.floor(Math.random() * respostas.length)];
            
            $('.mensagens-chat').append(`
                <div class="mensagem mensagem-recebida">
                    <div class="info-mensagem">
                        <span>Cliente Exemplo</span>
                        <span>${hora}</span>
                    </div>
                    <p>${resposta}</p>
                </div>
            `);
            
            $('.mensagens-chat').scrollTop($('.mensagens-chat')[0].scrollHeight);
        }, 1000 + Math.random() * 2000);
    }
});

// Enviar mensagem com Enter
$('#mensagem-chat-tecnico').keypress(function(e) {
    if (e.which == 13) {
        $('#enviar-mensagem-tecnico').click();
    }
});

// Fechar modais
$('.botao-fechar, .botao-cancelar').click(function() {
    $('.modal').hide();
});

// Mostrar modal de orçamento ao clicar em "Aceitar" pedido
$('.botao-primario:contains("Aceitar")').click(function() {
    $('#modalOrcamentoTecnico').css('display', 'flex');
});

// Mostrar modal de pedido de peças
$('.botao-secundario:contains("Pedir Peças")').click(function() {
    $('#modalPedidoPecas').css('display', 'flex');
});

// Fechar modal ao clicar fora
$(window).click(function(e) {
    if ($(e.target).hasClass('modal')) {
        $('.modal').hide();
    }
});

// Formulário de perfil
$('#formularioPerfilTecnico').submit(function(e) {
    e.preventDefault();
    alert('Sua solicitação de atualização de perfil foi enviada para aprovação do administrador.');
});

// Formulário de orçamento
$('#modalOrcamentoTecnico .botao-confirmar').click(function() {
    alert('Orçamento enviado com sucesso! Aguarde a aprovação do cliente.');
    $('#modalOrcamentoTecnico').hide();
});

// Formulário de pedido de peças
$('#modalPedidoPecas .botao-confirmar').click(function() {
    alert('Pedido de peças enviado para aprovação do cliente.');
    $('#modalPedidoPecas').hide();
});

// Formulário de atualização de etapa
$('#modalAtualizacaoEtapa .botao-confirmar').click(function() {
    alert('Progresso atualizado com sucesso! O cliente será notificado.');
    $('#modalAtualizacaoEtapa').hide();
});

// Adicionar nova peça
$('.botao-adicionar').click(function() {
    $('.lista-pecas').append(`
        <div class="item-peca">
            <input type="text" placeholder="Nome da peça">
            <input type="number" placeholder="Qtd." value="1">
            <input type="text" placeholder="Preço unitário">
        </div>
    `);
});