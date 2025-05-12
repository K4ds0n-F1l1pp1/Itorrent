let pedidosDisponiveis = [
    {
        id: 1,
        cliente: "Cliente Exemplo",
        avatar: "CE",
        servico: "Manutenção de Computador",
        descricao: "Computador não liga e faz barulho estranho",
        prazo: "20/06/2023",
        distancia: "2km",
        status: "disponivel"
    },
    {
        id: 2,
        cliente: "Maria Silva",
        avatar: "MS",
        servico: "Configuração de Rede",
        descricao: "Preciso configurar rede Wi-Fi e cabeada em pequeno escritório",
        prazo: "25/06/2023",
        distancia: "5km",
        status: "disponivel"
    }
];

let meusServicos = [
    {
        id: 3,
        cliente: "Cliente Exemplo",
        avatar: "CE",
        servico: "Manutenção de Computador",
        descricao: "Substituição da fonte e limpeza interna",
        prazo: "20/06/2023",
        distancia: "2km",
        orcamento: "R$ 250,00",
        status: "andamento"
    },
    {
        id: 4,
        cliente: "Ana Souza",
        avatar: "AS",
        servico: "Troca de HD por SSD",
        descricao: "Migração de sistema e dados para novo SSD",
        prazo: "22/06/2023",
        distancia: "3km",
        orcamento: "R$ 400,00",
        status: "pendente"
    }
];

let pedidoSelecionado = null;

// Função para renderizar pedidos disponíveis
function renderizarPedidosDisponiveis() {
    const secaoPedidos = $('.secao-pedidos:first');
    secaoPedidos.empty();

    pedidosDisponiveis.forEach(pedido => {
        if (pedido.status === "disponivel") {
            secaoPedidos.append(`
                <div class="cartao-pedido" data-id="${pedido.id}">
                    <div class="cabecalho-cartao">
                        <div class="info-cliente">
                            <div class="avatar-cliente">${pedido.avatar}</div>
                            <div>
                                <h3>${pedido.cliente}</h3>
                                <p>${pedido.distancia} de distância</p>
                            </div>
                        </div>
                        <span class="status-pedido status-disponivel">DISPONÍVEL</span>
                    </div>
                    
                    <div class="detalhes-pedido">
                        <div class="linha-detalhe">
                            <span class="rotulo-detalhe">Serviço:</span>
                            <span class="valor-detalhe">${pedido.servico}</span>
                        </div>
                        <div class="linha-detalhe">
                            <span class="rotulo-detalhe">Descrição:</span>
                            <span class="valor-detalhe">${pedido.descricao}</span>
                        </div>
                        <div class="linha-detalhe">
                            <span class="rotulo-detalhe">Prazo:</span>
                            <span class="valor-detalhe">${pedido.prazo}</span>
                        </div>
                    </div>
                    
                    <div class="acoes-pedido">
                        <button class="botao-acao botao-secundario btn-detalhes">Detalhes</button>
                        <button class="botao-acao botao-primario btn-aceitar">Aceitar</button>
                    </div>
                </div>
            `);
        }
    });

    // Adiciona eventos aos botões
    $('.btn-detalhes').click(function() {
        const id = $(this).closest('.cartao-pedido').data('id');
        mostrarDetalhesPedido(id);
    });

    $('.btn-aceitar').click(function() {
        const id = $(this).closest('.cartao-pedido').data('id');
        aceitarPedido(id);
    });
}

// Função para renderizar meus serviços
function renderizarMeusServicos() {
    const secaoServicos = $('.secao-pedidos:last');
    secaoServicos.empty();

    meusServicos.forEach(servico => {
        let statusText = "";
        let statusClass = "";
        
        if (servico.status === "andamento") {
            statusText = "EM ANDAMENTO";
            statusClass = "status-andamento";
        } else if (servico.status === "pendente") {
            statusText = "AGUARDANDO PEÇAS";
            statusClass = "status-pendente";
        }
        
        secaoServicos.append(`
            <div class="cartao-pedido" data-id="${servico.id}">
                <div class="cabecalho-cartao">
                    <div class="info-cliente">
                        <div class="avatar-cliente">${servico.avatar}</div>
                        <div>
                            <h3>${servico.cliente}</h3>
                            <p>${servico.distancia} de distância</p>
                        </div>
                    </div>
                    <span class="status-pedido ${statusClass}">${statusText}</span>
                </div>
                
                <div class="detalhes-pedido">
                    <div class="linha-detalhe">
                        <span class="rotulo-detalhe">Serviço:</span>
                        <span class="valor-detalhe">${servico.servico}</span>
                    </div>
                    <div class="linha-detalhe">
                        <span class="rotulo-detalhe">Orçamento:</span>
                        <span class="valor-detalhe">${servico.orcamento}</span>
                    </div>
                    <div class="linha-detalhe">
                        <span class="rotulo-detalhe">Prazo:</span>
                        <span class="valor-detalhe">${servico.prazo}</span>
                    </div>
                </div>
                
                <div class="acoes-pedido">
                    <button class="botao-acao botao-secundario btn-acompanhar">Acompanhar</button>
                    <button class="botao-acao botao-primario btn-chat">Chat</button>
                </div>
            </div>
        `);
    });

    // Adiciona eventos aos botões
    $('.btn-acompanhar').click(function() {
        $('.pagina-inicio').hide();
        $('.pagina-acompanhamento').show();
    });
}

// Função para mostrar detalhes do pedido
function mostrarDetalhesPedido(id) {
    const pedido = pedidosDisponiveis.find(p => p.id === id);
    if (!pedido) return;

    pedidoSelecionado = pedido;
    
    $('#detalhe-cliente').text(pedido.cliente);
    $('#detalhe-servico').text(pedido.servico);
    $('#detalhe-descricao').text(pedido.descricao);
    $('#detalhe-prazo').text(pedido.prazo);
    $('#detalhe-distancia').text(pedido.distancia);
    
    $('#modalDetalhesPedido').css('display', 'flex');
}

// Função para aceitar pedido
function aceitarPedido(id) {
    const pedidoIndex = pedidosDisponiveis.findIndex(p => p.id === id);
    if (pedidoIndex === -1) return;

    const pedido = pedidosDisponiveis[pedidoIndex];
    
    // Remove dos pedidos disponíveis
    pedidosDisponiveis.splice(pedidoIndex, 1);
    
    // Adiciona aos meus serviços
    meusServicos.push({
        ...pedido,
        orcamento: "Aguardando orçamento",
        status: "pendente"
    });
    
    renderizarPedidosDisponiveis();
    renderizarMeusServicos();
    $('#modalDetalhesPedido').hide();
    alert('Pedido aceito com sucesso!');
}

// Função para negar pedido
function negarPedido() {
    if (!pedidoSelecionado) return;
    
    const pedidoIndex = pedidosDisponiveis.findIndex(p => p.id === pedidoSelecionado.id);
    if (pedidoIndex === -1) return;

    // Remove dos pedidos disponíveis
    pedidosDisponiveis.splice(pedidoIndex, 1);
    
    renderizarPedidosDisponiveis();
    $('#modalDetalhesPedido').hide();
    alert('Pedido recusado com sucesso!');
}

// Inicialização
$(document).ready(function() {
    renderizarPedidosDisponiveis();
    renderizarMeusServicos();
});

// Eventos do menu
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

// Botão "Voltar" no acompanhamento
$('.voltar-servicos').click(function() {
    $('.pagina-acompanhamento').hide();
    $('.pagina-inicio').show();
});

// Botão "Atualizar Progresso" no acompanhamento
$('.botao-primario:contains("Atualizar Progresso")').click(function() {
    $('#modalAtualizacaoEtapa').css('display', 'flex');
});

// Botões do modal de detalhes
$('#aceitar-pedido').click(function() {
    if (pedidoSelecionado) {
        aceitarPedido(pedidoSelecionado.id);
    }
});

$('#negar-pedido').click(function() {
    negarPedido();
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

let orcamentos = [];

// Dados de exemplo (clientes disponíveis)
const clientesDisponiveis = [
    { id: 1, nome: "Cliente Exemplo", avatar: "CE" },
    { id: 2, nome: "Maria Silva", avatar: "MS" },
    { id: 3, nome: "Ana Souza", avatar: "AS" }
];

// Função para renderizar os orçamentos
function renderizarOrcamentos() {
    const listaOrcamentos = $('#lista-orcamentos');
    listaOrcamentos.empty();

    orcamentos.forEach((orcamento, index) => {
        const cliente = clientesDisponiveis.find(c => c.id === orcamento.clienteId) || { nome: "Cliente Desconhecido" };
        
        listaOrcamentos.append(`
            <div class="cartao-orcamento" data-index="${index}">
                <div class="cabecalho-orcamento">
                    <span class="cliente-orcamento">${cliente.nome}</span>
                    <span class="data-orcamento">${orcamento.data}</span>
                </div>
                <div class="detalhes-orcamento">
                    <div>
                        <span>Valor:</span>
                        <span>R$ ${orcamento.valor}</span>
                    </div>
                    <div>
                        <span>Status:</span>
                        <span>${formatarStatus(orcamento.status)}</span>
                    </div>
                </div>
                <div class="acoes-orcamento">
                    <button class="botao-acao botao-editar-orcamento">Editar</button>
                    <button class="botao-acao botao-excluir-orcamento">Excluir</button>
                </div>
            </div>
        `);
    });

    // Adiciona eventos aos botões
    $('.botao-editar-orcamento').click(function() {
        const index = $(this).closest('.cartao-orcamento').data('index');
        abrirModalOrcamentoParaEdicao(index);
    });

    $('.botao-excluir-orcamento').click(function() {
        const index = $(this).closest('.cartao-orcamento').data('index');
        excluirOrcamento(index);
    });
}

// Função para formatar o status
function formatarStatus(status) {
    const statusMap = {
        'pendente': 'Pendente',
        'aprovado': 'Aprovado',
        'recusado': 'Recusado'
    };
    return statusMap[status] || status;
}

// Função para abrir modal de orçamento para edição
function abrirModalOrcamentoParaEdicao(index) {
    const orcamento = orcamentos[index];
    
    // Preenche o formulário com os dados do orçamento
    $('#pecas-necessarias').val(orcamento.pecas);
    $('#descricao-servico').val(orcamento.descricao);
    $('#valor-servico').val(orcamento.valor.replace('R$ ', ''));
    $('#tempo-servico').val(orcamento.tempo);
    $('#notas-servico').val(orcamento.notas);
    $('#cliente-orcamento').val(orcamento.clienteId);
    
    // Armazena o índice do orçamento que está sendo editado
    $('#modalOrcamentoTecnico').data('edit-index', index);
    
    // Abre o modal
    $('#modalOrcamentoTecnico').css('display', 'flex');
    $('#modalListaOrcamentos').hide();
}

// Função para excluir orçamento
function excluirOrcamento(index) {
    if (confirm('Tem certeza que deseja excluir este orçamento?')) {
        orcamentos.splice(index, 1);
        renderizarOrcamentos();
        alert('Orçamento excluído com sucesso!');
    }
}

// Atualizar o modal de orçamento para incluir seleção de cliente
$(document).ready(function() {
    // Adiciona campo de seleção de cliente ao modal de orçamento
    $('#modalOrcamentoTecnico .cabecalho-modal').after(`
        <div class="grupo-formulario-perfil">
            <label for="cliente-orcamento">Cliente</label>
            <select id="cliente-orcamento" required>
                ${clientesDisponiveis.map(cliente => 
                    `<option value="${cliente.id}">${cliente.nome}</option>`
                ).join('')}
            </select>
        </div>
    `);

    // Inicializa com alguns orçamentos de exemplo
    orcamentos = [
        {
            clienteId: 1,
            data: '15/06/2023',
            pecas: 'Fonte ATX 500W\nHDMI 2.0 2m',
            descricao: 'Substituição da fonte e instalação de novo cabo HDMI',
            valor: '175.00',
            tempo: '2 horas',
            notas: 'Necessário agendar horário para a visita',
            status: 'pendente'
        },
        {
            clienteId: 2,
            data: '10/06/2023',
            pecs: 'Mão de obra',
            descricao: 'Configuração de rede Wi-Fi e cabeada',
            valor: '300.00',
            tempo: '1 dia',
            notas: 'Trazer equipamento próprio para testes',
            status: 'aprovado'
        }
    ];
});

// Eventos do menu
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
        $('#modalListaOrcamentos').css('display', 'flex');
        renderizarOrcamentos();
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

// Botão "Novo Orçamento"
$('#novo-orcamento').click(function() {
    $('#modalOrcamentoTecnico').data('edit-index', null);
    $('#modalOrcamentoTecnico').find('input, textarea, select').val('');
    $('#modalOrcamentoTecnico').css('display', 'flex');
    $('#modalListaOrcamentos').hide();
});

// Formulário de orçamento
$('#modalOrcamentoTecnico .botao-confirmar').click(function() {
    const editIndex = $('#modalOrcamentoTecnico').data('edit-index');
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    
    const novoOrcamento = {
        clienteId: parseInt($('#cliente-orcamento').val()),
        data: dataAtual,
        pecas: $('#pecas-necessarias').val(),
        descricao: $('#descricao-servico').val(),
        valor: $('#valor-servico').val(),
        tempo: $('#tempo-servico').val(),
        notas: $('#notas-servico').val(),
        status: 'pendente'
    };

    if (editIndex !== null && editIndex !== undefined) {
        // Editar orçamento existente
        orcamentos[editIndex] = novoOrcamento;
    } else {
        // Adicionar novo orçamento
        orcamentos.push(novoOrcamento);
    }

    $('#modalOrcamentoTecnico').hide();
    $('#modalListaOrcamentos').css('display', 'flex');
    renderizarOrcamentos();
    alert('Orçamento salvo com sucesso!');
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
    $('#modalOrcamentoTecnico').data('edit-index', null);
    $('#modalOrcamentoTecnico').find('input, textarea, select').val('');
    
    // Preenche automaticamente o cliente baseado no pedido
    const clienteNome = $(this).closest('.cartao-pedido').find('.info-cliente h3').text();
    const cliente = clientesDisponiveis.find(c => c.nome === clienteNome);
    if (cliente) {
        $('#cliente-orcamento').val(cliente.id);
    }
    
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

// Adicione estas funções no arquivo index.js

function reportarProblema() {
    const tipoProblema = $('#tipo-problema').val();
    const descricao = $('#descricao-problema').val();
    const solucao = $('#solucao-sugerida').val();
    
    if (!descricao) {
        alert('Por favor, descreva o problema encontrado.');
        return;
    }

    console.log('Problema reportado:', {
        tipo: tipoProblema,
        descricao: descricao,
        solucaoSugerida: solucao
    });
    
    alert('Problema reportado com sucesso! A equipe será notificada.');
    $('#modalReportarProblema').hide();
}

// Função para atualizar etapa do serviço
function atualizarEtapaServico() {
    const etapa = $('#etapa-servico').val();
    const status = $('#status-etapa').val();
    const descricao = $('#descricao-etapa').val();
    
    if (!descricao) {
        alert('Por favor, descreva o progresso atual do serviço.');
        return;
    }
    
    // Aqui você pode adicionar a lógica para atualizar no servidor
    console.log('Etapa atualizada:', {
        etapa: etapa,
        status: status,
        descricao: descricao
    });
    
    alert('Progresso atualizado com sucesso! O cliente será notificado.');
    $('#modalAtualizacaoEtapa').hide();
    
    const etapaElement = $(`.etapa .titulo-etapa:contains(${etapa})`).closest('.etapa');
    if (etapaElement.length) {
        etapaElement.find('.status-etapa')
            .removeClass('status-concluido status-pendente status-andamento')
            .addClass(`status-${status}`)
            .text(status.toUpperCase());
        
        if (descricao) {
            etapaElement.find('.conteudo-etapa p').text(descricao);
        }
    }
}
$('.btn-reportar-problema').click(function() {
    $('#modalReportarProblema').css('display', 'flex');
});

$('#enviar-problema').click(reportarProblema);

$('#modalAtualizacaoEtapa .botao-confirmar').click(atualizarEtapaServico);

$('.btn-atualizar-progresso').click(function() {
    $('#modalAtualizacaoEtapa').css('display', 'flex');
});

$('.btn-detalhes-pecas').click(function() {
    $('#modalPedidoPecas').css('display', 'flex');
});

$('.btn-atualizar-etapa').click(function() {
    const etapa = $(this).closest('.etapa').find('.titulo-etapa').text();
    $('#etapa-servico').val(etapa.toLowerCase().replace(' ', '-'));
    $('#modalAtualizacaoEtapa').css('display', 'flex');
});