document.addEventListener('DOMContentLoaded', function() {
    const admins = [
        {
            id: 1,
            nome: "Amanda Mendes",
            email: "amanda.mendes@empresa.com",
            status: "online",
            acesso: "regional",
            tecnicos: ["João Silva", "Maria Oliveira", "Carlos Mendes", "Ana Santos"],
            ultimoAcesso: "Hoje, 09:45"
        },
        {
            id: 2,
            nome: "Bruno Costa",
            email: "bruno.costa@empresa.com",
            status: "online",
            acesso: "super",
            tecnicos: ["Pedro Alves", "Lucia Ferreira", "Marcos Rocha"],
            ultimoAcesso: "Hoje, 10:15"
        },
        {
            id: 3,
            nome: "Carla Dias",
            email: "carla.dias@empresa.com",
            status: "offline",
            acesso: "support",
            tecnicos: ["Juliana Alves", "Fernando Lima"],
            ultimoAcesso: "Ontem, 17:30"
        },
        {
            id: 4,
            nome: "Daniel Oliveira",
            email: "daniel.oliveira@empresa.com",
            status: "online",
            acesso: "regional",
            tecnicos: ["Patricia Gomes", "Ricardo Nunes", "Gustavo Henrique"],
            ultimoAcesso: "Hoje, 11:20"
        },
        {
            id: 5,
            nome: "Elaine Santos",
            email: "elaine.santos@empresa.com",
            status: "offline",
            acesso: "support",
            tecnicos: ["Roberto Martins", "Beatriz Castro"],
            ultimoAcesso: "Ontem, 16:45"
        },
        {
            id: 6,
            nome: "Felipe Rocha",
            email: "felipe.rocha@empresa.com",
            status: "online",
            acesso: "super",
            tecnicos: ["Camila Ribeiro", "João Silva", "Ana Santos"],
            ultimoAcesso: "Hoje, 08:30"
        }
    ];

    const statusFilter = document.getElementById('statusFilter');
    const accessFilter = document.getElementById('accessFilter');
    const applyBtn = document.getElementById('applyFilters');
    const adminsTable = document.querySelector('#adminsTable tbody');
    const searchInput = document.querySelector('.search-box input');

    // Inicializa a página
    populateAdminsTable(admins);

    applyBtn.addEventListener('click', filterAdmins);
    searchInput.addEventListener('input', searchAdmins);

    // Abrir modal ao clicar em Ver
    document.addEventListener('click', function(e) {
        if (e.target.closest('.view-btn')) {
            const adminId = parseInt(e.target.closest('tr').getAttribute('data-id'));
            const admin = admins.find(a => a.id === adminId);
            showAdminDetails(admin);
        }
    });

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById('adminModal').style.display = 'none';
        });
    });

    function populateAdminsTable(data) {
        adminsTable.innerHTML = '';
        
        data.forEach(admin => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', admin.id);
            
            row.innerHTML = `
                <td>
                    <div class="admin-cell">
                        <div class="admin-avatar">${getInitials(admin.nome)}</div>
                        <div>
                            <div>${admin.nome}</div>
                            <small>${admin.email}</small>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="status-badge status-${admin.status}">
                        ${admin.status === 'online' ? 'Online' : 'Offline'}
                    </span>
                </td>
                <td>
                    <span class="access-badge access-${admin.acesso}">
                        ${getAccessLevel(admin.acesso)}
                    </span>
                </td>
                <td class="techs-assisted">
                    ${admin.tecnicos.map(tech => `<span>${tech}</span>`).join('')}
                </td>
                <td>${admin.ultimoAcesso}</td>
                <td>
                    <button class="action-btn view-btn">
                        <i class="fas fa-eye"></i> Ver
                    </button>
                    <button class="action-btn edit-btn">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                </td>
            `;
            
            adminsTable.appendChild(row);
        });
    }

    function filterAdmins() {
        const status = statusFilter.value;
        const access = accessFilter.value;
        
        let filtered = admins;
        
        if (status !== 'all') {
            filtered = filtered.filter(admin => admin.status === status);
        }
        
        if (access !== 'all') {
            filtered = filtered.filter(admin => admin.acesso === access);
        }
        
        populateAdminsTable(filtered);
    }

    function searchAdmins() {
        const term = searchInput.value.toLowerCase();
        
        if (term === '') {
            populateAdminsTable(admins);
            return;
        }
        
        const filtered = admins.filter(admin => 
            admin.nome.toLowerCase().includes(term) || 
            admin.email.toLowerCase().includes(term)
        );
        
        populateAdminsTable(filtered);
    }

    function showAdminDetails(admin) {
        const modal = document.getElementById('adminModal');
        const nameElement = document.getElementById('adminName');
        const emailElement = document.getElementById('adminEmail');
        const statusBadge = modal.querySelector('.status-badge');
        const accessBadge = modal.querySelector('.access-badge');
        const techsList = modal.querySelector('.techs-list');

        nameElement.textContent = admin.nome;
        emailElement.textContent = admin.email;

        statusBadge.className = 'status-badge';
        statusBadge.classList.add(`status-${admin.status}`);
        statusBadge.textContent = admin.status === 'online' ? 'Online' : 'Offline';

        accessBadge.className = 'access-badge';
        accessBadge.classList.add(`access-${admin.acesso}`);
        accessBadge.textContent = getAccessLevel(admin.acesso);

        techsList.innerHTML = admin.tecnicos
            .map(tech => `<li>${tech} (1x esta semana)</li>`)
            .join('');

        const avatar = modal.querySelector('.admin-avatar');
        avatar.textContent = getInitials(admin.nome);

        modal.style.display = 'flex';
    }

    function getInitials(name) {
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    }

    function getAccessLevel(access) {
        const levels = {
            'super': 'Super Admin',
            'regional': 'Admin Regional',
            'support': 'Suporte'
        };
        return levels[access] || access;
    }

    const editModal = document.getElementById('editAdminModal');
    const editForm = document.getElementById('editAdminForm');
    const editNome = document.getElementById('editNome');
    const editEmail = document.getElementById('editEmail');
    const editStatus = document.getElementById('editStatus');
    const editAcesso = document.getElementById('editAcesso');
    const editTecnicos = document.getElementById('editTecnicos');
    let currentEditId = null;

    populateAdminsTable(admins);
    setupEventListeners();

    function setupEventListeners() {
        applyBtn.addEventListener('click', filterAdmins);
        searchInput.addEventListener('input', searchAdmins);

        document.addEventListener('click', function(e) {
            if (e.target.closest('.view-btn')) {
                const adminId = parseInt(e.target.closest('tr').getAttribute('data-id'));
                const admin = admins.find(a => a.id === adminId);
                showAdminDetails(admin);
            }
            
            if (e.target.closest('.edit-btn')) {
                const adminId = parseInt(e.target.closest('tr').getAttribute('data-id'));
                const admin = admins.find(a => a.id === adminId);
                openEditModal(admin);
            }
        });

        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.modal').forEach(modal => {
                    modal.style.display = 'none';
                });
            });
        });

        // Salvar edição
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveAdminEdit();
        });
    }

    function populateAdminsTable(data) {
        adminsTable.innerHTML = '';
        
        data.forEach(admin => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', admin.id);
            
            row.innerHTML = `
                <td>
                    <div class="admin-cell">
                        <div class="admin-avatar">${getInitials(admin.nome)}</div>
                        <div>
                            <div>${admin.nome}</div>
                            <small>${admin.email}</small>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="status-badge status-${admin.status}">
                        ${admin.status === 'online' ? 'Online' : 'Offline'}
                    </span>
                </td>
                <td>
                    <span class="access-badge access-${admin.acesso}">
                        ${getAccessLevel(admin.acesso)}
                    </span>
                </td>
                <td class="techs-assisted">
                    ${admin.tecnicos.map(tech => `<span>${tech}</span>`).join('')}
                </td>
                <td>${admin.ultimoAcesso}</td>
                <td>
                    <button class="action-btn view-btn">
                        <i class="fas fa-eye"></i> Ver
                    </button>
                    <button class="action-btn edit-btn">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                </td>
            `;
            
            adminsTable.appendChild(row);
        });
    }

    function openEditModal(admin) {
        currentEditId = admin.id;

        editNome.value = admin.nome;
        editEmail.value = admin.email;
        editStatus.value = admin.status;
        editAcesso.value = admin.acesso;
        editTecnicos.value = admin.tecnicos.join(', ');

        editModal.style.display = 'flex';
    }

    function saveAdminEdit() {
        if (!editNome.value || !editEmail.value) {
            alert('Nome e e-mail são obrigatórios!');
            return;
        }

        const adminIndex = admins.findIndex(a => a.id === currentEditId);
        
        if (adminIndex === -1) {
            alert('Administrador não encontrado!');
            return;
        }

        admins[adminIndex] = {
            ...admins[adminIndex],
            nome: editNome.value,
            email: editEmail.value,
            status: editStatus.value,
            acesso: editAcesso.value,
            tecnicos: editTecnicos.value.split(',').map(t => t.trim()).filter(t => t)
        };

        populateAdminsTable(admins);

        editModal.style.display = 'none';

        alert('Administrador atualizado com sucesso!');
    }
});