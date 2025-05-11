document.addEventListener('DOMContentLoaded', function() {
    // Dados de exemplo (substituir por dados reais ou conexão com backend)
    let parts = [
        {
            id: 1,
            patrimonio: "NF-2023-001",
            nome: "Placa Mãe ASUS",
            marca: "ASUS",
            modelo: "PRIME B450M-A",
            dataCompra: "2023-05-15",
            valor: 450.00,
            status: "available"
        },
        {
            id: 2,
            patrimonio: "NF-2023-002",
            nome: "Memória RAM 8GB",
            marca: "Kingston",
            modelo: "FURY Beast DDR4",
            dataCompra: "2023-05-20",
            valor: 180.00,
            status: "in_use"
        }
    ];

    const partsTable = document.querySelector("#partsTable tbody");
    const addPartBtn = document.getElementById("addPart");
    const partModal = document.getElementById("partModal");
    const savePartBtn = document.getElementById("savePart");
    const modalTitle = document.getElementById("modalTitle");
    let currentPartId = null;

    function init() {
        renderPartsTable();
        setupEventListeners();
    }
    function renderPartsTable() {
        partsTable.innerHTML = "";
        
        parts.forEach(part => {
            const row = document.createElement("tr");
            row.dataset.id = part.id;
            
            row.innerHTML = `
                <td>${part.patrimonio}</td>
                <td>${part.nome}</td>
                <td>${part.marca}</td>
                <td>${part.modelo}</td>
                <td>${formatDate(part.dataCompra)}</td>
                <td>R$ ${part.valor.toFixed(2)}</td>
                <td>${createStatusBadge(part.status)}</td>
                <td>
                    <button class="action-btn edit-btn" data-id="${part.id}">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="action-btn delete-btn" data-id="${part.id}">
                        <i class="fas fa-trash"></i> Excluir
                    </button>
                </td>
            `;
            
            partsTable.appendChild(row);
        });
    }

    function createStatusBadge(status) {
        const statusMap = {
            available: { text: "Disponível", class: "status-available" },
            in_use: { text: "No Cliente", class: "status-in_use" },
            maintenance: { text: "Manutenção", class: "status-maintenance" },
            discarded: { text: "Descartada", class: "status-discarded" }
        };
        
        return `<span class="status-badge ${statusMap[status].class}">${statusMap[status].text}</span>`;
    }

    function formatDate(dateString) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    }

    function setupEventListeners() {
        addPartBtn.addEventListener("click", () => {
            currentPartId = null;
            modalTitle.textContent = "Nova Peça";
            resetForm();
            partModal.style.display = "flex";
        });

        document.querySelectorAll(".close-modal").forEach(btn => {
            btn.addEventListener("click", () => {
                partModal.style.display = "none";
            });
        });

        savePartBtn.addEventListener("click", savePart);

        partsTable.addEventListener("click", (e) => {
            const editBtn = e.target.closest(".edit-btn");
            const deleteBtn = e.target.closest(".delete-btn");
            
            if (editBtn) {
                editPart(parseInt(editBtn.dataset.id));
            }
            
            if (deleteBtn) {
                deletePart(parseInt(deleteBtn.dataset.id));
            }
        });
    }

    function editPart(id) {
        const part = parts.find(p => p.id === id);
        if (!part) return;
        
        currentPartId = id;
        modalTitle.textContent = "Editar Peça";

        document.getElementById("partNumber").value = part.patrimonio;
        document.getElementById("partName").value = part.nome;
        document.getElementById("partBrand").value = part.marca;
        document.getElementById("partModel").value = part.modelo;
        document.getElementById("partDate").value = part.dataCompra;
        document.getElementById("partValue").value = part.valor;
        document.getElementById("partStatus").value = part.status;
        
        partModal.style.display = "flex";
    }

    // Excluir peça
    function deletePart(id) {
        if (confirm("Tem certeza que deseja excluir esta peça?")) {
            parts = parts.filter(p => p.id !== id);
            renderPartsTable();
        }
    }

    // Salvar peça (nova ou existente)
    function savePart() {
        // Validar campos obrigatórios
        const patrimonio = document.getElementById("partNumber").value.trim();
        const nome = document.getElementById("partName").value.trim();
        const marca = document.getElementById("partBrand").value.trim();
        const dataCompra = document.getElementById("partDate").value;
        const valor = parseFloat(document.getElementById("partValue").value);
        
        if (!patrimonio || !nome || !marca || !dataCompra || isNaN(valor)) {
            alert("Preencha todos os campos obrigatórios!");
            return;
        }
        
        const partData = {
            patrimonio,
            nome,
            marca,
            modelo: document.getElementById("partModel").value.trim(),
            dataCompra,
            valor,
            status: document.getElementById("partStatus").value
        };
        
        if (currentPartId) {
            const index = parts.findIndex(p => p.id === currentPartId);
            if (index !== -1) {
                parts[index] = { ...parts[index], ...partData };
            }
        } else {
            const newId = parts.length > 0 ? Math.max(...parts.map(p => p.id)) + 1 : 1;
            parts.push({ id: newId, ...partData });
        }
        
        renderPartsTable();
        partModal.style.display = "none";
    }

    function resetForm() {
        document.getElementById("partNumber").value = "";
        document.getElementById("partName").value = "";
        document.getElementById("partBrand").value = "";
        document.getElementById("partModel").value = "";
        document.getElementById("partDate").value = "";
        document.getElementById("partValue").value = "";
        document.getElementById("partStatus").value = "available";
    }

    init();
});