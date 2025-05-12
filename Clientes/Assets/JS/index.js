const mapa = L.map('mapa-tecnicos').setView([-27.0969, -52.6178], 15);
        
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapa);
const tecnicos = [
    { nome: "João Silva", lat: -27.095, lng: -52.618, especialidade: "Desenvolvedor BackEnd", avaliacao: 4.5 },
    { nome: "Maria Santos", lat: -27.098, lng: -52.620, especialidade: "Técnica em Informática", avaliacao: 4.8 },
    { nome: "Carlos Oliveira", lat: -27.097, lng: -52.615, especialidade: "TI", avaliacao: 4.3 },
    { nome: "Ana Pereira", lat: -27.094, lng: -52.616, especialidade: "Analista", avaliacao: 4.7 }
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

// Dados de serviços (simulando banco de dados)
const servicos = [
    {
        id: 1,
        tecnico: "Técnico João",
        avatar: "TJ",
        servico: "Troca de fiação elétrica",
        data: "15/06/2023",
        local: "Rua Exemplo, 123 - Centro",
        descricao: "Substituição completa da fiação da sala, instalação de novas tomadas e verificação do quadro de distribuição.",
        pecas: "- 3 tomadas 20A<br>- 10m de fio 2.5mm<br>- Caixa de junção",
        valor: "R$ 350,00",
        status: "andamento",
        mensagens: [
            { remetente: "tecnico", texto: "Bom dia! Estou a caminho do local do serviço, devo chegar em 15 minutos.", hora: "10:30 AM" },
            { remetente: "cliente", texto: "Ótimo, estarei esperando. O portão já está aberto.", hora: "10:32 AM" },
            { remetente: "tecnico", texto: "Cheguei no local. Pode me informar onde exatamente está o problema?", hora: "10:45 AM" }
        ]
    },
    {
        id: 2,
        tecnico: "Técnico João",
        avatar: "TJ",
        servico: "Conexão de API",
        data: "10/03/2025",
        local: "Rua Exemplo, 123 - Centro",
        descricao: "Conexão com o frontEnd, necesitando fazer validações de envio.",
        pecas: "Mão-de-obra",
        valor: "Aguardando orçamento",
        status: "pendente",
        mensagens: [
            { remetente: "tecnico", texto: "Olá, estou analisando o problema na API.", hora: "09:15 AM" },
            { remetente: "tecnico", texto: "Preciso de mais algumas informações para prosseguir com o orçamento.", hora: "09:20 AM" }
        ]
    }
];

let servicoAtual = null;

function abrirModalDetalhes(servicoId) {
    servicoAtual = servicos.find(s => s.id === servicoId);
    
    if (servicoAtual) {
        $('#detalhe-tecnico').text(servicoAtual.tecnico);
        $('#detalhe-servico').text(servicoAtual.servico);
        $('#detalhe-data').text(servicoAtual.data);
        $('#detalhe-local').text(servicoAtual.local);
        $('#detalhe-descricao').text(servicoAtual.descricao);
        $('#detalhe-pecas').html(servicoAtual.pecas);
        $('#detalhe-valor').text(servicoAtual.valor);
        
        $('#modalDetalhes').css('display', 'flex');
    }
}

function abrirModalChat(servicoId) {
    servicoAtual = servicos.find(s => s.id === servicoId);
    
    if (servicoAtual) {
        $('#chat-tecnico-nome').text(servicoAtual.tecnico);
        $('#chat-avatar').text(servicoAtual.avatar);

        $('#chat-mensagens').empty();
        servicoAtual.mensagens.forEach(msg => {
            const classe = msg.remetente === 'cliente' ? 'mensagem-enviada' : 'mensagem-recebida';
            const remetente = msg.remetente === 'cliente' ? 'Você' : servicoAtual.tecnico.split(' ')[1];
            
            $('#chat-mensagens').append(`
                <div class="mensagem ${classe}">
                    <div class="info-mensagem">
                        <span>${remetente}</span>
                        <span>${msg.hora}</span>
                    </div>
                    <p>${msg.texto}</p>
                </div>
            `);
        });

        $('#chat-mensagens').scrollTop($('#chat-mensagens')[0].scrollHeight);
        
        $('#modalChat').css('display', 'flex');
    }
}

$(document).on('click', '.botao-secundario', function() {
    const servicoId = $(this).closest('.cartao-servico').index() + 1;
    abrirModalDetalhes(servicoId);
});

$(document).on('click', '.botao-primario', function() {
    const servicoId = $(this).closest('.cartao-servico').index() + 1;
    abrirModalChat(servicoId);
});

$('#chat-enviar-mensagem').click(function() {
    const mensagem = $('#chat-input-mensagem').val().trim();
    if (mensagem && servicoAtual) {
        const agora = new Date();
        const hora = agora.getHours() + ':' + (agora.getMinutes() < 10 ? '0' : '') + agora.getMinutes();

        $('#chat-mensagens').append(`
            <div class="mensagem mensagem-enviada">
                <div class="info-mensagem">
                    <span>Você</span>
                    <span>${hora}</span>
                </div>
                <p>${mensagem}</p>
            </div>
        `);

        servicoAtual.mensagens.push({
            remetente: 'cliente',
            texto: mensagem,
            hora: hora
        });
        
        $('#chat-input-mensagem').val('');
        $('#chat-mensagens').scrollTop($('#chat-mensagens')[0].scrollHeight);

        setTimeout(() => {
            const respostas = [
                "Entendido, vou verificar isso.",
                "Pode me dar mais detalhes?",
                "Já estou trabalhando nisso.",
                "Preciso de mais algumas informações para prosseguir.",
                "Ótimo, obrigado pela informação!",
                "Vou resolver isso o mais rápido possível."
            ];
            const resposta = respostas[Math.floor(Math.random() * respostas.length)];
            
            $('#chat-mensagens').append(`
                <div class="mensagem mensagem-recebida">
                    <div class="info-mensagem">
                        <span>${servicoAtual.tecnico.split(' ')[1]}</span>
                        <span>${hora}</span>
                    </div>
                    <p>${resposta}</p>
                </div>
            `);

            servicoAtual.mensagens.push({
                remetente: 'tecnico',
                texto: resposta,
                hora: hora
            });
            
            $('#chat-mensagens').scrollTop($('#chat-mensagens')[0].scrollHeight);
        }, 1000 + Math.random() * 2000);
    }
});

$('#chat-input-mensagem').keypress(function(e) {
    if (e.which == 13) {
        $('#chat-enviar-mensagem').click();
    }
});

$('#aprovar-servico').click(function() {
    if (servicoAtual) {
        alert(`Serviço "${servicoAtual.servico}" aprovado com sucesso!`);
        $('#modalDetalhes').hide();
    }
});

$('#recusar-servico').click(function() {
    if (servicoAtual) {
        const motivo = prompt("Por favor, informe o motivo da recusa:");
        if (motivo !== null) {
            alert(`Serviço "${servicoAtual.servico}" recusado. Motivo: ${motivo}`);
            $('#modalDetalhes').hide();
        }
    }
});

$(window).click(function(e) {
    if (e.target === $('#modalDetalhes')[0]) {
        $('#modalDetalhes').hide();
    }
    if (e.target === $('#modalChat')[0]) {
        $('#modalChat').hide();
    }
});

$('.botao-fechar').click(function() {
    $(this).closest('.modal').hide();
});

let servicoss = [
    {
        id: 1,
        tecnico: "Técnico João",
        avatar: "TJ",
        servico: "Troca de fiação elétrica",
        data: "15/06/2023",
        local: "Rua Exemplo, 123 - Centro",
        descricao: "Substituição completa da fiação da sala, instalação de novas tomadas e verificação do quadro de distribuição.",
        pecas: "- 3 tomadas 20A<br>- 10m de fio 2.5mm<br>- Caixa de junção",
        valor: "R$ 350,00",
        status: "andamento",
        mensagens: [
            { remetente: "tecnico", texto: "Bom dia! Estou a caminho do local do serviço, devo chegar em 15 minutos.", hora: "10:30 AM" },
            { remetente: "cliente", texto: "Ótimo, estarei esperando. O portão já está aberto.", hora: "10:32 AM" },
            { remetente: "tecnico", texto: "Cheguei no local. Pode me informar onde exatamente está o problema?", hora: "10:45 AM" }
        ]
    },
    {
        id: 2,
        tecnico: "Técnico João",
        avatar: "TJ",
        servico: "Conexão de API",
        data: "10/03/2025",
        local: "Rua Exemplo, 123 - Centro",
        descricao: "Conexão com o frontEnd, necesitando fazer validações de envio.",
        pecas: "Mão-de-obra",
        valor: "Aguardando orçamento",
        status: "pendente",
        mensagens: [
            { remetente: "tecnico", texto: "Olá, estou analisando o problema no banheiro.", hora: "09:15 AM" },
            { remetente: "tecnico", texto: "Preciso de mais algumas informações para prosseguir com o orçamento.", hora: "09:20 AM" }
        ]
    }
];

function createService(newService) {
    const id = servicoss.length > 0 ? Math.max(...servicoss.map(s => s.id)) + 1 : 1;
    newService.id = id;
    servicoss.push(newService);
    return newService;
}

function readServices() {
    return servicoss;
}

function readServiceById(id) {
    return servicoss.find(s => s.id === id);
}

function updateService(id, updatedService) {
    const index = servicoss.findIndex(s => s.id === id);
    if (index !== -1) {
        servicoss[index] = { ...servicoss[index], ...updatedService };
        return servicoss[index];
    }
    return null;
}

function deleteService(id) {
    servicoss = servicoss.filter(s => s.id !== id);
    return true;
}

function renderServices() {
    const servicesContainer = $('.lista-servicos');
    servicesContainer.empty();

    servicoss.forEach(service => {
        const statusClass = `status-${service.status}`;
        const statusText = service.status === 'andamento' ? 'EM ANDAMENTO' : 
                         service.status === 'pendente' ? 'PENDENTE' : 'CONCLUÍDO';

        const serviceCard = `
        <div class="cartao-servico" data-id="${service.id}">
            <div class="cabecalho-cartao">
                <div class="info-tecnico">
                    <div class="avatar-tecnico">${service.avatar}</div>
                    <div>
                        <h3>${service.tecnico}</h3>
                        <p>${service.servico}</p>
                    </div>
                </div>
                <span class="status-servico ${statusClass}">${statusText}</span>
            </div>
            
            <div class="detalhes-servico">
                <div class="linha-detalhe">
                    <span class="rotulo-detalhe">Data:</span>
                    <span class="valor-detalhe">${service.data}</span>
                </div>
                <div class="linha-detalhe">
                    <span class="rotulo-detalhe">Local:</span>
                    <span class="valor-detalhe">${service.local}</span>
                </div>
                <div class="linha-detalhe">
                    <span class="rotulo-detalhe">Valor:</span>
                    <span class="valor-detalhe">${service.valor}</span>
                </div>
            </div>
            
            <div class="acoes-servico">
                <button class="botao-acao botao-editar">Editar</button>
                <button class="botao-acao botao-chat">Chat</button>
                <button class="botao-acao botao-excluir">Excluir</button>
            </div>
        </div>
        `;
        
        servicesContainer.append(serviceCard);
    });
}

function openEditModal(id) {
    const service = readServiceById(id);
    if (!service) return;

    $('#edit-id').val(service.id);
    $('#edit-tecnico').val(service.tecnico);
    $('#edit-servico').val(service.servico);
    $('#edit-data').val(service.data);
    $('#edit-local').val(service.local);
    $('#edit-descricao').val(service.descricao);
    $('#edit-pecas').val(service.pecas.replace(/<br>/g, '\n'));
    $('#edit-valor').val(service.valor);
    $('#edit-status').val(service.status);

    $('#modalEditar').css('display', 'flex');
}

$(document).ready(function() {
    renderServices();

    $('#novo-servico').click(function() {
        $('#edit-id').val('');
        $('#modalEditar').css('display', 'flex');
    });

    $('#salvar-servico').click(function() {
        const id = $('#edit-id').val();
        const serviceData = {
            tecnico: $('#edit-tecnico').val(),
            avatar: "TJ",
            servico: $('#edit-servico').val(),
            data: $('#edit-data').val(),
            local: $('#edit-local').val(),
            descricao: $('#edit-descricao').val(),
            pecas: $('#edit-pecas').val().replace(/\n/g, '<br>'),
            valor: $('#edit-valor').val(),
            status: $('#edit-status').val(),
            mensagens: id ? readServiceById(parseInt(id)).mensagens : []
        };

        if (id) {
            updateService(parseInt(id), serviceData);
        } else {
            createService(serviceData);
        }

        $('#modalEditar').hide();
        renderServices();
    });

    $(document).on('click', '.botao-editar', function() {
        const id = $(this).closest('.cartao-servico').data('id');
        openEditModal(id);
    });

    $(document).on('click', '.botao-excluir', function() {
        const id = $(this).closest('.cartao-servico').data('id');
        if (confirm('Tem certeza que deseja excluir este serviço?')) {
            deleteService(id);
            renderServices();
        }
    });

    $('.fechar-modal').click(function() {
        $(this).closest('.modal').hide();
    });
});

let pedidosCliente = [];

// Função para renderizar os pedidos na tabela
function renderizarPedidos() {
    const tbody = document.getElementById('lista-pedidos-cliente');
    tbody.innerHTML = '';

    pedidosCliente.forEach((pedido, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${pedido.servico}</td>
            <td>${pedido.data}</td>
            <td>${pedido.local}</td>
            <td><span class="status-${pedido.status}">${formatarStatus(pedido.status)}</span></td>
            <td>
                <div class="botoes-acao">
                    <button class="botao-tabela botao-editar" data-index="${index}">Editar</button>
                    <button class="botao-tabela botao-excluir" data-index="${index}">Excluir</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Adiciona eventos aos botões
    document.querySelectorAll('.botao-editar').forEach(btn => {
        btn.addEventListener('click', (e) => editarPedido(e.target.dataset.index));
    });

    document.querySelectorAll('.botao-excluir').forEach(btn => {
        btn.addEventListener('click', (e) => excluirPedido(e.target.dataset.index));
    });
}

// Função para formatar o status
function formatarStatus(status) {
    const statusMap = {
        'pendente': 'Pendente',
        'andamento': 'Em Andamento',
        'concluido': 'Concluído'
    };
    return statusMap[status] || status;
}

// Função para editar um pedido
function editarPedido(index) {
    const pedido = pedidosCliente[index];
    const form = document.getElementById('formularioPedido');
    
    // Preenche o formulário com os dados do pedido
    document.getElementById('tipo-servico').value = pedido.servico;
    document.getElementById('prazo-servico').value = pedido.data;
    document.getElementById('motivo-servico').value = pedido.motivo;
    document.getElementById('detalhes-servico').value = pedido.descricao;
    
    // Rola até o formulário
    window.scrollTo(0, document.querySelector('.secao-pedido').offsetTop);

    pedidosCliente.splice(index, 1);
    renderizarPedidos();
}

function excluirPedido(index) {
    if (confirm('Tem certeza que deseja excluir este pedido?')) {
        pedidosCliente.splice(index, 1);
        renderizarPedidos();
    }
}

document.getElementById('formularioPedido').addEventListener('submit', function(e) {
    e.preventDefault();

    const novoPedido = {
        servico: document.getElementById('tipo-servico').value,
        data: document.getElementById('prazo-servico').value,
        local: 'Meu Endereço',
        motivo: document.getElementById('motivo-servico').value,
        descricao: document.getElementById('detalhes-servico').value,
        status: 'pendente'
    };

    pedidosCliente.push(novoPedido);

    renderizarPedidos();

    this.reset();

    alert('Pedido criado com sucesso!');

    document.querySelectorAll('.item-menu')[2].click();
});

document.addEventListener('DOMContentLoaded', renderizarPedidos);