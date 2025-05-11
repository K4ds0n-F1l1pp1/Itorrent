document.addEventListener('DOMContentLoaded', function() {
    // Dados de exemplo para os relatórios
    const sampleTechnicians = [
        {
            id: 1,
            nome: "João da Silva",
            servicos: 15,
            avaliacao: 4.7,
            pecas: 23,
            valorPecas: 2875.50,
            ganhoTotal: 5875.50,
            comentarios: 12
        },
        {
            id: 2,
            nome: "Maria Oliveira",
            servicos: 12,
            avaliacao: 4.9,
            pecas: 18,
            valorPecas: 2150.00,
            ganhoTotal: 4650.00,
            comentarios: 10
        },
        {
            id: 3,
            nome: "Carlos Mendes",
            servicos: 8,
            avaliacao: 4.2,
            pecas: 10,
            valorPecas: 1200.75,
            ganhoTotal: 2800.75,
            comentarios: 6
        },
        {
            id: 4,
            nome: "Ana Paula Santos",
            servicos: 20,
            avaliacao: 4.8,
            pecas: 35,
            valorPecas: 4200.00,
            ganhoTotal: 8200.00,
            comentarios: 18
        }
    ];

    const sampleParts = [
        {
            peca: "Placa Mãe ASUS",
            quantidade: 5,
            valorUnitario: 450.00,
            patrimonios: "PAT-001, PAT-005, PAT-010",
            tecnicos: "João, Maria"
        },
        {
            peca: "Memória RAM 8GB",
            quantidade: 12,
            valorUnitario: 220.00,
            patrimonios: "PAT-002, PAT-003, PAT-007",
            tecnicos: "Carlos, Ana"
        },
        {
            peca: "HD SSD 500GB",
            quantidade: 8,
            valorUnitario: 280.00,
            patrimonios: "PAT-004, PAT-008",
            tecnicos: "João, Carlos"
        },
        {
            peca: "Fonte 500W",
            quantidade: 6,
            valorUnitario: 180.00,
            patrimonios: "PAT-006, PAT-009",
            tecnicos: "Maria, Ana"
        }
    ];

    // Elementos do DOM
    const reportType = document.getElementById('reportType');
    const dateRange = document.getElementById('dateRange');
    const customDates = document.querySelector('.custom-dates');
    const generateBtn = document.getElementById('generateReport');
    const reportSections = document.querySelectorAll('.report-section');

    // Inicializa a página
    initPage();

    // Funções
    function initPage() {
        // Mostra o relatório mensal por padrão
        showReport('monthly');
        
        // Preenche as tabelas com dados de exemplo
        populateEvaluationsTable();
        populateTechniciansReport();
        populatePartsReport();
        
        // Adiciona eventos
        setupEventListeners();
    }

    function setupEventListeners() {
        // Mostrar/ocultar datas personalizadas
        dateRange.addEventListener('change', function() {
            customDates.style.display = this.value === 'custom' ? 'flex' : 'none';
        });

        // Mudar relatório quando o tipo é alterado
        reportType.addEventListener('change', function() {
            showReport(this.value);
        });

        // Botão gerar relatório
        generateBtn.addEventListener('click', function() {
            alert('Relatório gerado com sucesso para o período selecionado!');
        });

        // Fechar modais
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.modal').forEach(modal => {
                    modal.style.display = 'none';
                });
            });
        });

        // Abrir modal de detalhes ao clicar em botões
        document.addEventListener('click', function(e) {
            if (e.target.closest('.details-btn')) {
                document.getElementById('evaluationModal').style.display = 'flex';
            }
        });
    }

    function showReport(reportId) {
        reportSections.forEach(section => {
            section.classList.remove('active');
        });
        
        document.getElementById(`${reportId}Report`).classList.add('active');
    }

    function populateEvaluationsTable() {
        const tbody = document.querySelector('#evaluationsTable tbody');
        tbody.innerHTML = '';
        
        sampleTechnicians.forEach(tech => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${tech.nome}</td>
                <td>${tech.servicos}</td>
                <td>
                    <div class="rating">
                        <span>${tech.avaliacao.toFixed(1)}</span>
                        <div class="stars">
                            ${renderStars(tech.avaliacao)}
                        </div>
                    </div>
                </td>
                <td>${tech.comentarios} comentários</td>
                <td>
                    <button class="action-btn details-btn">
                        <i class="fas fa-eye"></i> Ver
                    </button>
                </td>
            `;
            
            tbody.appendChild(row);
        });
    }

    function populateTechniciansReport() {
        const tbody = document.querySelector('#techniciansReportTable tbody');
        tbody.innerHTML = '';
        
        sampleTechnicians.forEach(tech => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${tech.nome}</td>
                <td>${tech.servicos}</td>
                <td>${tech.pecas}</td>
                <td>R$ ${tech.valorPecas.toFixed(2)}</td>
                <td>R$ ${tech.ganhoTotal.toFixed(2)}</td>
                <td>${tech.avaliacao.toFixed(1)}</td>
            `;
            
            tbody.appendChild(row);
        });
    }

    function populatePartsReport() {
        const tbody = document.querySelector('#partsReportTable tbody');
        tbody.innerHTML = '';
        
        sampleParts.forEach(part => {
            const totalValue = part.quantidade * part.valorUnitario;
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${part.peca}</td>
                <td>${part.quantidade}</td>
                <td>R$ ${part.valorUnitario.toFixed(2)}</td>
                <td>R$ ${totalValue.toFixed(2)}</td>
                <td>${part.patrimonios}</td>
                <td>${part.tecnicos}</td>
            `;
            
            tbody.appendChild(row);
        });
    }

    function renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }
});