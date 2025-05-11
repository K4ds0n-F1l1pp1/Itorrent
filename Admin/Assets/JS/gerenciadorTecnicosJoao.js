// Dados de exemplo (16 técnicos)
const technicians = [
    {
        id: 1,
        nome: "João Silva",
        cpf: "123.456.789-00",
        telefone: "(47) 99999-9999",
        endereco: "Rua ABC, 123 - Centro, Chapecó/SC - CEP 89800-000",
        dataNasc: "01/01/1990",
        contaBancaria: "Banco XYZ - Ag 1234 - CC 56789-0",
        escolaridade: "Ensino Superior",
        email: "joao@email.com",
        login: "joao.silva",
        status: "inactive",
        partsRequests: [
            { id: 1, part: "Placa Mãe", quantity: 1, price: 450.00, status: "pending" },
            { id: 2, part: "Memória RAM 8GB", quantity: 2, price: 180.00, status: "pending" }
        ]
    },
    {
        id: 2,
        nome: "Maria Oliveira",
        cpf: "987.654.321-00",
        telefone: "(47) 98888-8888",
        endereco: "Av. Principal, 456 - Centro, Chapecó/SC - CEP 89800-000",
        dataNasc: "15/05/1985",
        contaBancaria: "Banco ABC - Ag 5678 - CC 12345-6",
        escolaridade: "Técnico em Informática",
        email: "maria@email.com",
        login: "maria.oliveira",
        status: "active",
        partsRequests: [
            { id: 3, part: "HD 1TB", quantity: 1, price: 250.00, status: "approved" }
        ]
    },
    {
        id: 3,
        nome: "Carlos Mendes",
        cpf: "456.789.123-00",
        telefone: "(47) 97777-7777",
        endereco: "Rua das Flores, 789 - Efapi, Chapecó/SC - CEP 89809-000",
        dataNasc: "22/11/1978",
        contaBancaria: "Banco DEF - Ag 9012 - CC 34567-8",
        escolaridade: "Ensino Médio",
        email: "carlos@email.com",
        login: "carlos.mendes",
        status: "suspended",
        partsRequests: []
    },
    {
        id: 4,
        nome: "Ana Santos",
        cpf: "789.123.456-00",
        telefone: "(47) 96666-6666",
        endereco: "Travessa dos Pássaros, 321 - Vila Real, Chapecó/SC - CEP 89802-000",
        dataNasc: "30/03/1992",
        contaBancaria: "Banco GHI - Ag 3456 - CC 78901-2",
        escolaridade: "Ensino Superior",
        email: "ana@email.com",
        login: "ana.santos",
        status: "active",
        partsRequests: [
            { id: 4, part: "Fonte 500W", quantity: 1, price: 220.00, status: "pending" }
        ]
    },
    {
        id: 5,
        nome: "Pedro Alves",
        cpf: "321.654.987-00",
        telefone: "(47) 95555-5555",
        endereco: "Rua dos Pinheiros, 654 - Santo Antônio, Chapecó/SC - CEP 89803-000",
        dataNasc: "12/07/1988",
        contaBancaria: "Banco JKL - Ag 7890 - CC 23456-7",
        escolaridade: "Técnico em Eletrônica",
        email: "pedro@email.com",
        login: "pedro.alves",
        status: "inactive",
        partsRequests: []
    },
    {
        id: 6,
        nome: "Juliana Costa",
        cpf: "654.321.987-00",
        telefone: "(47) 94444-4444",
        endereco: "Alameda das Árvores, 987 - Jardim Itália, Chapecó/SC - CEP 89805-000",
        dataNasc: "05/09/1995",
        contaBancaria: "Banco MNO - Ag 1234 - CC 56789-0",
        escolaridade: "Ensino Superior",
        email: "juliana@email.com",
        login: "juliana.costa",
        status: "active",
        partsRequests: [
            { id: 5, part: "Placa de Vídeo GTX 1660", quantity: 1, price: 1200.00, status: "rejected" }
        ]
    },
    {
        id: 7,
        nome: "Ricardo Nunes",
        cpf: "147.258.369-00",
        telefone: "(47) 93333-3333",
        endereco: "Rua das Pedras, 357 - São Pedro, Chapecó/SC - CEP 89806-000",
        dataNasc: "18/12/1980",
        contaBancaria: "Banco PQR - Ag 5678 - CC 12345-6",
        escolaridade: "Ensino Médio",
        email: "ricardo@email.com",
        login: "ricardo.nunes",
        status: "active",
        partsRequests: []
    },
    {
        id: 8,
        nome: "Fernanda Lima",
        cpf: "258.369.147-00",
        telefone: "(47) 92222-2222",
        endereco: "Avenida Central, 753 - Centro, Chapecó/SC - CEP 89800-000",
        dataNasc: "25/04/1993",
        contaBancaria: "Banco STU - Ag 9012 - CC 34567-8",
        escolaridade: "Técnico em Redes",
        email: "fernanda@email.com",
        login: "fernanda.lima",
        status: "active",
        partsRequests: [
            { id: 6, part: "SSD 240GB", quantity: 2, price: 180.00, status: "approved" },
            { id: 7, part: "Cooler para Processador", quantity: 1, price: 120.00, status: "pending" }
        ]
    },
    {
        id: 9,
        nome: "Gustavo Henrique",
        cpf: "369.147.258-00",
        telefone: "(47) 91111-1111",
        endereco: "Rua dos Coqueiros, 159 - Vila Rica, Chapecó/SC - CEP 89807-000",
        dataNasc: "08/10/1987",
        contaBancaria: "Banco VWX - Ag 3456 - CC 78901-2",
        escolaridade: "Ensino Superior",
        email: "gustavo@email.com",
        login: "gustavo.henrique",
        status: "suspended",
        partsRequests: []
    },
    {
        id: 10,
        nome: "Patrícia Souza",
        cpf: "951.753.864-00",
        telefone: "(47) 90000-0000",
        endereco: "Travessa das Flores, 486 - Efapi, Chapecó/SC - CEP 89809-000",
        dataNasc: "14/02/1991",
        contaBancaria: "Banco YZA - Ag 7890 - CC 23456-7",
        escolaridade: "Ensino Médio",
        email: "patricia@email.com",
        login: "patricia.souza",
        status: "active",
        partsRequests: []
    },
    {
        id: 11,
        nome: "Eduardo Pereira",
        cpf: "753.864.951-00",
        telefone: "(47) 98888-7777",
        endereco: "Alameda dos Ipês, 642 - Jardim América, Chapecó/SC - CEP 89808-000",
        dataNasc: "03/06/1983",
        contaBancaria: "Banco BCD - Ag 1234 - CC 56789-0",
        escolaridade: "Ensino Superior",
        email: "eduardo@email.com",
        login: "eduardo.pereira",
        status: "active",
        partsRequests: [
            { id: 8, part: "Monitor 24''", quantity: 1, price: 850.00, status: "pending" }
        ]
    },
    {
        id: 12,
        nome: "Camila Rocha",
        cpf: "864.951.753-00",
        telefone: "(47) 97777-8888",
        endereco: "Rua das Orquídeas, 321 - São Cristóvão, Chapecó/SC - CEP 89804-000",
        dataNasc: "19/08/1994",
        contaBancaria: "Banco EFG - Ag 5678 - CC 12345-6",
        escolaridade: "Técnico em Informática",
        email: "camila@email.com",
        login: "camila.rocha",
        status: "inactive",
        partsRequests: []
    },
    {
        id: 13,
        nome: "Marcos Vinícius",
        cpf: "159.357.486-00",
        telefone: "(47) 96666-5555",
        endereco: "Avenida das Palmeiras, 753 - Centro, Chapecó/SC - CEP 89800-000",
        dataNasc: "27/09/1989",
        contaBancaria: "Banco HIJ - Ag 9012 - CC 34567-8",
        escolaridade: "Ensino Médio",
        email: "marcos@email.com",
        login: "marcos.vinicius",
        status: "active",
        partsRequests: []
    },
    {
        id: 14,
        nome: "Luciana Ferreira",
        cpf: "357.486.159-00",
        telefone: "(47) 95555-4444",
        endereco: "Rua das Margaridas, 147 - Vila Real, Chapecó/SC - CEP 89802-000",
        dataNasc: "11/11/1996",
        contaBancaria: "Banco KLM - Ag 3456 - CC 78901-2",
        escolaridade: "Ensino Superior",
        email: "luciana@email.com",
        login: "luciana.ferreira",
        status: "active",
        partsRequests: [
            { id: 9, part: "Teclado Mecânico", quantity: 1, price: 200.00, status: "approved" },
            { id: 10, part: "Mouse Gamer", quantity: 1, price: 150.00, status: "approved" }
        ]
    },
    {
        id: 15,
        nome: "Roberto Carlos",
        cpf: "486.159.357-00",
        telefone: "(47) 94444-3333",
        endereco: "Travessa dos Lírios, 258 - São Pedro, Chapecó/SC - CEP 89806-000",
        dataNasc: "23/01/1975",
        contaBancaria: "Banco NOP - Ag 7890 - CC 23456-7",
        escolaridade: "Técnico em Eletrônica",
        email: "roberto@email.com",
        login: "roberto.carlos",
        status: "suspended",
        partsRequests: []
    },
    {
        id: 16,
        nome: "Amanda Santos",
        cpf: "654.987.321-00",
        telefone: "(47) 93333-2222",
        endereco: "Alameda das Rosas, 369 - Jardim Itália, Chapecó/SC - CEP 89805-000",
        dataNasc: "07/07/1990",
        contaBancaria: "Banco QRS - Ag 1234 - CC 56789-0",
        escolaridade: "Ensino Superior",
        email: "amanda@email.com",
        login: "amanda.santos",
        status: "active",
        partsRequests: [
            { id: 11, part: "Webcam Full HD", quantity: 1, price: 180.00, status: "pending" }
        ]
    }
];

let currentTechnicianId = null;
let currentPartsRequestId = null;

const tableBody = document.querySelector("#techniciansTable tbody");

technicians.forEach(tech => {
    const row = document.createElement("tr");

    let statusBadge = '';
    switch(tech.status) {
        case 'active':
            statusBadge = '<span class="status-badge" style="background-color: var(--verdeVivido); color: white;">Ativo</span>';
            break;
        case 'inactive':
            statusBadge = '<span class="status-badge" style="background-color: var(--cinzaForte); color: white;">Inativo</span>';
            break;
        case 'suspended':
            statusBadge = '<span class="status-badge" style="background-color: var(--red); color: red;">Suspenso</span>';
            break;
    }

    const pendingRequests = tech.partsRequests.filter(r => r.status === 'pending').length;
    const partsBadge = pendingRequests > 0 
        ? `<span class="status-badge status-pending">${pendingRequests} pendente(s)</span>`
        : '';
    
    row.innerHTML = `
        <td>${tech.nome}</td>
        <td>${tech.cpf}</td>
        <td>${tech.telefone}</td>
        <td>${tech.email}</td>
        <td>${tech.login}</td>
        <td>${statusBadge} ${partsBadge}</td>
        <td>
            <button class="action-btn edit-btn" onclick="openEditModal(${tech.id})">
                <i class="fas fa-edit"></i> Editar
            </button>
            <button class="action-btn fine-btn" onclick="openFineModal(${tech.id})">
                <i class="fas fa-money-bill-wave"></i> Multas
            </button>
            ${pendingRequests > 0 ? `
            <button class="action-btn approve-btn" onclick="openApprovalModal(${tech.id})">
                <i class="fas fa-check"></i> Peças
            </button>
            ` : ''}
        </td>
    `;
    
    tableBody.appendChild(row);
});

function openEditModal(techId) {
    currentTechnicianId = techId;
    const tech = technicians.find(t => t.id === techId);
    
    document.getElementById('editName').value = tech.nome;
    document.getElementById('editEmail').value = tech.email;
    document.getElementById('editPhone').value = tech.telefone;
    document.getElementById('editStatus').value = tech.status;
    
    document.getElementById('editModal').style.display = 'flex';
}

function openFineModal(techId) {
    currentTechnicianId = techId;
    document.getElementById('fineAmount').value = '';
    document.getElementById('fineReason').value = '';
    document.getElementById('fineModal').style.display = 'flex';
}

function openApprovalModal(techId) {
    currentTechnicianId = techId;
    const tech = technicians.find(t => t.id === techId);
    const pendingRequests = tech.partsRequests.filter(r => r.status === 'pending');
    
    if (pendingRequests.length === 0) {
        alert('Este técnico não tem pedidos pendentes!');
        return;
    }

    const partsList = document.getElementById('partsList');
    partsList.innerHTML = '';
    
    let total = 0;
    pendingRequests.forEach(part => {
        const li = document.createElement('li');
        li.innerHTML = `${part.part} - ${part.quantity}x - R$ ${part.price.toFixed(2)}`;
        partsList.appendChild(li);
        total += part.price * part.quantity;
    });
    
    document.getElementById('partsTotal').textContent = total.toFixed(2);
    document.getElementById('approvalDecision').value = '';
    document.getElementById('rejectionReasonGroup').style.display = 'none';
    document.getElementById('rejectionReason').value = '';
    
    document.getElementById('approvalModal').style.display = 'flex';
}

document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    });
});

document.addEventListener('keyup', function(e) {
    if (e.key === "Escape") {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }
});

document.getElementById('approvalDecision').addEventListener('change', function() {
    const rejectionGroup = document.getElementById('rejectionReasonGroup');
    rejectionGroup.style.display = this.value === 'reject' ? 'block' : 'none';
});

// Confirmar aplicação de multa
document.getElementById('confirmFine').addEventListener('click', function() {
    const amount = parseFloat(document.getElementById('fineAmount').value);
    const reason = document.getElementById('fineReason').value.trim();
    
    if (isNaN(amount)) {
        alert('Informe um valor válido para a multa!');
        return;
    }
    
    if (reason === '') {
        alert('Descreva o motivo da multa!');
        return;
    }

    alert(`Multa de R$ ${amount.toFixed(2)} aplicada ao técnico ${currentTechnicianId}.\nMotivo: ${reason}`);
    
    document.getElementById('fineModal').style.display = 'none';
});

document.getElementById('confirmApproval').addEventListener('click', function() {
    const decision = document.getElementById('approvalDecision').value;
    const reason = document.getElementById('rejectionReason').value.trim();
    
    if (decision === '') {
        alert('Selecione uma decisão!');
        return;
    }
    
    if (decision === 'reject' && reason === '') {
        alert('Informe o motivo da rejeição!');
        return;
    }

    const tech = technicians.find(t => t.id === currentTechnicianId);
    const decisionText = decision === 'approve' ? 'APROVADO' : 'REJEITADO';
    
    alert(`Pedido de peças do técnico ${tech.nome} foi ${decisionText}!\n${decision === 'reject' ? 'Motivo: ' + reason : ''}`);
    
    document.getElementById('approvalModal').style.display = 'none';
});

document.getElementById('saveChanges').addEventListener('click', function() {
    const name = document.getElementById('editName').value.trim();
    const email = document.getElementById('editEmail').value.trim();
    const phone = document.getElementById('editPhone').value.trim();
    const status = document.getElementById('editStatus').value;
    
    if (name === '' || email === '' || phone === '') {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }

    alert(`Dados do técnico ${currentTechnicianId} atualizados com sucesso!\nNovo status: ${status}`);
    
    document.getElementById('editModal').style.display = 'none';
});