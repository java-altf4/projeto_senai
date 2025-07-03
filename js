// Banco de dados simulado
const database = {
  currentUser: {
    id: 'usr-001',
    name: 'Administrador',
    email: 'admin@empresa.com',
    department: 'admin',
    role: 'admin',
    avatar: 'https://placehold.co/100?text=AD'
  },

  users: [
    {
      id: 'usr-001',
      name: 'Administrador',
      email: 'admin@empresa.com',
      department: 'admin',
      role: 'admin',
      avatar: 'https://placehold.co/100?text=AD'
    },
    {
      id: 'usr-002',
      name: 'João Silva',
      email: 'joao.silva@empresa.com',
      department: 'automation',
      role: 'manager',
      avatar: 'https://placehold.co/100?text=JS'
    },
    {
      id: 'usr-003',
      name: 'Maria Souza',
      email: 'maria.souza@empresa.com',
      department: 'it',
      role: 'technician',
      avatar: 'https://placehold.co/100?text=MS'
    },
    {
      id: 'usr-004',
      name: 'Carlos Andrade',
      email: 'carlos.andrade@empresa.com',
      department: 'admin',
      role: 'assistant',
      avatar: 'https://placehold.co/100?text=CA'
    },
    {
      id: 'usr-005',
      name: 'Ana Costa',
      email: 'ana.costa@empresa.com',
      department: 'it',
      role: 'manager',
      avatar: 'https://placehold.co/100?text=AC'
    }
  ],

  departments: [
    { id: 'automation', name: 'Automação', color: '#4361ee' },
    { id: 'admin', name: 'Administrativo', color: '#3a0ca3' },
    { id: 'it', name: 'Tecnologia', color: '#7209b7' }
  ],

  tickets: [
    {
      id: 'HD-00042',
      subject: 'Problema no robô da linha 3',
      description: 'O robô apresenta erro ao manusear peças maiores',
      department: 'automation',
      requester: 'usr-002',
      assignee: 'usr-001',
      priority: 'high',
      status: 'open',
      createdAt: new Date('2023-06-15T10:30:00'),
      updatedAt: new Date('2023-06-15T10:30:00'),
      messages: []
    },
    {
      id: 'HD-00041',
      subject: 'Impressora não funciona',
      description: 'A impressora do setor financeiro não está respondendo',
      department: 'admin',
      requester: 'usr-004',
      assignee: 'usr-003',
      priority: 'medium',
      status: 'in_progress',
      createdAt: new Date('2023-06-14T15:45:00'),
      updatedAt: new Date('2023-06-15T09:20:00'),
      messages: [
        {
          id: 'msg-001',
          sender: 'usr-003',
          content: 'Já verifiquei a conexão da impressora. Parece ser problema no driver.',
          sentAt: new Date('2023-06-14T16:30:00')
        }
      ]
    },
    {
      id: 'HD-00040',
      subject: 'Acesso ao sistema ERP',
      description: 'Não consigo acessar o sistema ERP com minhas credenciais',
      department: 'it',
      requester: 'usr-004',
      assignee: 'usr-005',
      priority: 'critical',
      status: 'resolved',
      createdAt: new Date('2023-06-13T08:15:00'),
      updatedAt: new Date('2023-06-14T11:10:00'),
      messages: [
        {
          id: 'msg-002',
          sender: 'usr-005',
          content: 'Seu acesso foi redefinido. Por favor, tente novamente com a senha temporária.',
          sentAt: new Date('2023-06-13T10:45:00')
        },
        {
          id: 'msg-003',
          sender: 'usr-004',
          content: 'Funcionou, obrigado!',
          sentAt: new Date('2023-06-14T11:10:00')
        }
      ]
    }
  ],

  conversations: [
    {
      id: 'conv-001',
      participants: ['usr-001', 'usr-002'],
      lastMessage: {
        sender: 'usr-002',
        content: 'Podemos marcar uma reunião para amanhã?',
        sentAt: new Date('2023-06-15T14:25:00')
      },
      unread: true
    },
    {
      id: 'conv-002',
      participants: ['usr-001', 'usr-003'],
      lastMessage: {
        sender: 'usr-001',
        content: 'A impressora já está funcionando?',
        sentAt: new Date('2023-06-15T09:30:00')
      },
      unread: false
    },
    {
      id: 'conv-003',
      participants: ['usr-001', 'usr-005'],
      lastMessage: {
        sender: 'usr-005',
        content: 'Relatório mensal enviado para sua análise',
        sentAt: new Date('2023-06-14T16:45:00')
      },
      unread: false
    }
  ]
};

// Estado da aplicação
const state = {
  currentTab: 'dashboard',
  currentDepartment: null,
  currentConversation: null,
  ticketsPerPage: 10,
  currentPage: 1,
  ticketsFilter: {},
  robots: [
    { id: 'rb-001', name: 'Robô AX-101', location: 'Linha de Produção 1', status: 'active', lastMaintenance: '2023-06-10' },
    { id: 'rb-002', name: 'Robô AX-102', location: 'Linha de Produção 2', status: 'active', lastMaintenance: '2023-06-12' },
    { id: 'rb-003', name: 'Robô AX-103', location: 'Linha de Produção 3', status: 'maintenance', lastMaintenance: '2023-06-15' },
    { id: 'rb-004', name: 'Robô AX-201', location: 'Armazenamento', status: 'inactive', lastMaintenance: '2023-05-28' }
  ]
};

// Utilitários
function formatDate(date) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleString('pt-BR', options);
}

function getDepartmentInfo(departmentId) {
  return database.departments.find(dept => dept.id === departmentId) || { name: 'Desconhecido', color: '#666' };
}

function getUserInfo(userId) {
  return database.users.find(user => user.id === userId) || { name: 'Usuário Desconhecido', email: '' };
}

function getPriorityColor(priority) {
  const colors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800'
  };
  return colors[priority] || 'bg-gray-100 text-gray-800';
}

function getStatusColor(status) {
  const colors = {
    open: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    resolved: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

function getStatusText(status) {
  const texts = {
    open: 'Aberto',
    in_progress: 'Em Andamento',
    resolved: 'Resolvido',
    closed: 'Fechado'
  };
  return texts[status] || status;
}

function getPriorityText(priority) {
  const texts = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta',
    critical: 'Crítica'
  };
  return texts[priority] || priority;
}

// Controle de abas e navegação
function setupNavigation() {
  // Alternar entre abas
  document.getElementById('dashboard-tab').addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('dashboard');
  });
  
  document.getElementById('tickets-tab').addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('tickets');
  });
  
  document.getElementById('chat-tab').addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('chat');
  });
  
  // Departamentos
  document.getElementById('automation-tab').addEventListener('click', (e) => {
    e.preventDefault();
    state.currentDepartment = 'automation';
    switchTab('automation');
  });
  
  document.getElementById('admin-tab').addEventListener('click', (e) => {
    e.preventDefault();
    state.currentDepartment = 'admin';
    switchTab('automation');
  });
  
  document.getElementById('it-tab').addEventListener('click', (e) => {
    e.preventDefault();
    state.currentDepartment = 'it';
    switchTab('automation');
  });
  
  // Menu mobile
  document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    document.querySelector('.md\\:flex.md\\:w-64').classList.toggle('hidden');
  });
}

function switchTab(tabName) {
  state.currentTab = tabName;
  document.getElementById('header-title').textContent = getTabTitle(tabName);
  
  // Esconder todas as views
  document.querySelectorAll('main > div').forEach(div => {
    div.classList.add('hidden');
  });
  
  // Mostrar a view ativa
  const activeView = document.getElementById(`${tabName}-view`);
  if (activeView) {
    activeView.classList.remove('hidden');
  }
  
  // Atualizar o menu ativo
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('text-white', 'bg-blue-600');
    link.classList.add('text-gray-700', 'hover:bg-gray-100');
  });
  
  const activeLink = document.getElementById(`${tabName}-tab`);
  if (activeLink) {
    activeLink.classList.remove('text-gray-700', 'hover:bg-gray-100');
    activeLink.classList.add('text-white', 'bg-blue-600');
  }
  
  // Carregar o conteúdo específico da aba
  switch(tabName) {
    case 'dashboard':
      loadDashboard();
      break;
    case 'tickets':
      loadTickets();
      break;
    case 'chat':
      loadConversations();
      break;
    case 'automation':
      loadDepartmentView();
      break;
  }
}

function getTabTitle(tabName) {
  const titles = {
    dashboard: 'Dashboard',
    tickets: 'Gerenciamento de Chamados',
    chat: 'Chat',
    automation: 'Departamento de Automação',
    admin: 'Departamento Administrativo',
    it: 'Departamento de Tecnologia'
  };
  return titles[tabName] || 'Dashboard';
}

// Dashboard
function loadDashboard() {
  // Atualizar contadores
  const openTickets = database.tickets.filter(t => t.status === 'open').length;
  const inProgressTickets = database.tickets.filter(t => t.status === 'in_progress').length;
  const resolvedToday = database.tickets.filter(t => 
    t.status === 'resolved' && new Date(t.updatedAt).toDateString() === new Date().toDateString()
  ).length;
  const recurrentTickets = database.tickets.filter(t => t.status === 'closed' && 
    database.tickets.some(ot => ot.requester === t.requester && ot.id !== t.id)
  ).length;
  
  document.getElementById('open-tickets-count').textContent = openTickets;
  document.getElementById('in-progress-tickets-count').textContent = inProgressTickets;
  document.getElementById('resolved-today-tickets-count').textContent = resolvedToday;
  document.getElementById('recurrent-tickets-count').textContent = recurrentTickets;
  
  // Carregar gráfico
  loadChart();
  
  // Carregar chamados recentes
  loadRecentTickets();
}

function loadChart() {
  const ctx = document.getElementById('departments-chart');
  
  // Contar tickets por departamento
  const departmentCounts = {};
  database.departments.forEach(dept => {
    departmentCounts[dept.id] = database.tickets.filter(t => t.department === dept.id).length;
  });
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: database.departments.map(dept => dept.name),
      datasets: [{
        data: database.departments.map(dept => departmentCounts[dept.id]),
        backgroundColor: database.departments.map(dept => dept.color),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        }
      }
    }
  });
}

function loadRecentTickets() {
  const container = document.getElementById('recent-tickets-list');
  container.innerHTML = '';
  
  // Ordenar tickets por data (mais recente primeiro)
  const sortedTickets = [...database.tickets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  // Pegar os 3 mais recentes
  const recentTickets = sortedTickets.slice(0, 3);
  
  recentTickets.forEach(ticket => {
    const deptInfo = getDepartmentInfo(ticket.department);
    const ticketElement = document.createElement('div');
    ticketElement.className = 'flex items-start justify-between';
    ticketElement.innerHTML = `
      <div>
        <p class="text-sm font-medium text-gray-900">${ticket.id} - ${ticket.subject}</p>
        <p class="text-xs text-gray-500">${deptInfo.name} · ${getStatusText(ticket.status)}</p>
      </div>
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}">
        ${getPriorityText(ticket.priority)}
      </span>
    `;
    container.appendChild(ticketElement);
  });
}

// Gerenciamento de Tickets
function loadTickets() {
  // Configurar filtros
  setupFilters();
  
  // Configurar paginação
  setupPagination();
  
  // Carregar tickets
  filterTickets();
}

function setupFilters() {
  document.getElementById('apply-filters').addEventListener('click', () => {
    state.ticketsFilter = {
      search: document.getElementById('search').value.toLowerCase(),
      department: document.getElementById('department-filter').value,
      status: document.getElementById('status-filter').value,
      priority: document.getElementById('priority-filter').value
    };
    state.currentPage = 1;
    filterTickets();
  });
  
  document.getElementById('reset-filters').addEventListener('click', () => {
    document.getElementById('search').value = '';
    document.getElementById('department-filter').value = '';
    document.getElementById('status-filter').value = '';
    document.getElementById('priority-filter').value = '';
    state.ticketsFilter = {};
    state.currentPage = 1;
    filterTickets();
  });
  
  // Novo ticket
  document.getElementById('new-ticket-btn').addEventListener('click', () => {
    openNewTicketModal();
  });
}

function filterTickets() {
  let filteredTickets = [...database.tickets];
  
  // Aplicar filtros
  if (state.ticketsFilter.search) {
    filteredTickets = filteredTickets.filter(ticket => 
      ticket.id.toLowerCase().includes(state.ticketsFilter.search) || 
      ticket.subject.toLowerCase().includes(state.ticketsFilter.search)
    );
  }
  
  if (state.ticketsFilter.department) {
    filteredTickets = filteredTickets.filter(ticket => ticket.department === state.ticketsFilter.department);
  }
  
  if (state.ticketsFilter.status) {
    filteredTickets = filteredTickets.filter(ticket => ticket.status === state.ticketsFilter.status);
  }
  
  if (state.ticketsFilter.priority) {
    filteredTickets = filteredTickets.filter(ticket => ticket.priority === state.ticketsFilter.priority);
  }
  
  // Ordenar por data (mais recente primeiro)
  filteredTickets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  renderTickets(filteredTickets);
}

function renderTickets(tickets) {
  const tbody = document.getElementById('tickets-table-body');
  tbody.innerHTML = '';
  
  // Calcular paginação
  const totalPages = Math.ceil(tickets.length / state.ticketsPerPage);
  const startIndex = (state.currentPage - 1) * state.ticketsPerPage;
  const endIndex = Math.min(startIndex + state.ticketsPerPage, tickets.length);
  const paginatedTickets = tickets.slice(startIndex, endIndex);
  
  // Atualizar UI de paginação
  updatePaginationUI(tickets.length, totalPages);
  
  // Renderizar tickets
  paginatedTickets.forEach(ticket => {
    const deptInfo = getDepartmentInfo(ticket.department);
    const requester = getUserInfo(ticket.requester);
    const assignee = getUserInfo(ticket.assignee);
    
    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-50';
    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${ticket.id}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${ticket.subject}</td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full badge-${ticket.department}">
          ${deptInfo.name}
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(ticket.priority)}">
          ${getPriorityText(ticket.priority)}
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ticket.status)}">
          ${getStatusText(ticket.status)}
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${formatDate(ticket.createdAt)}</td>
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button class="text-blue-600 hover:text-blue-900 mr-3 view-ticket" data-id="${ticket.id}">Ver</button>
        <button class="text-indigo-600 hover:text-indigo-900 edit-ticket" data-id="${ticket.id}">Editar</button>
      </td>
    `;
    tbody.appendChild(row);
  });
  
  // Configurar eventos dos botões
  document.querySelectorAll('.view-ticket').forEach(btn => {
    btn.addEventListener('click', () => viewTicket(btn.dataset.id));
  });
  
  document.querySelectorAll('.edit-ticket').forEach(btn => {
    btn.addEventListener('click', () => editTicket(btn.dataset.id));
  });
}

function setupPagination() {
  document.getElementById('first-page').addEventListener('click', () => {
    state.currentPage = 1;
    filterTickets();
  });
  
  document.getElementById('prev-page').addEventListener('click', () => {
    if (state.currentPage > 1) {
      state.currentPage--;
      filterTickets();
    }
  });
  
  document.getElementById('next-page').addEventListener('click', () => {
    const totalTickets = database.tickets.length;
    const totalPages = Math.ceil(totalTickets / state.ticketsPerPage);
    if (state.currentPage < totalPages) {
      state.currentPage++;
      filterTickets();
    }
  });
  
  document.getElementById('last-page').addEventListener('click', () => {
    const totalTickets = database.tickets.length;
    const totalPages = Math.ceil(totalTickets / state.ticketsPerPage);
    state.currentPage = totalPages;
    filterTickets();
  });
  
  // Mobile
  document.getElementById('mobile-prev-page').addEventListener('click', () => {
    if (state.currentPage > 1) {
      state.currentPage--;
      filterTickets();
    }
  });
  
  document.getElementById('mobile-next-page').addEventListener('click', () => {
    const totalTickets = database.tickets.length;
    const totalPages = Math.ceil(totalTickets / state.ticketsPerPage);
    if (state.currentPage < totalPages) {
      state.currentPage++;
      filterTickets();
    }
  });
}

function updatePaginationUI(totalTickets, totalPages) {
  document.getElementById('total-tickets').textContent = totalTickets;
  document.getElementById('pagination-from').textContent = ((state.currentPage - 1) * state.ticketsPerPage) + 1;
  document.getElementById('pagination-to').textContent = Math.min(state.currentPage * state.ticketsPerPage, totalTickets);
  
  // Atualizar números das páginas
  const pageNumbersContainer = document.getElementById('page-numbers');
  pageNumbersContainer.innerHTML = '';
  
  const maxVisiblePages = 5;
  let startPage = Math.max(1, state.currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.className = `relative inline-flex items-center px-4 py-2 border text-sm font-medium ${i === state.currentPage ? 'bg-blue-50 border-blue-500 text-blue-600 z-10' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`;
    pageBtn.textContent = i;
    pageBtn.addEventListener('click', () => {
      state.currentPage = i;
      filterTickets();
    });
    pageNumbersContainer.appendChild(pageBtn);
  }
  
  // Desabilitar/ativar botões
  document.getElementById('first-page').disabled = state.currentPage === 1;
  document.getElementById('prev-page').disabled = state.currentPage === 1;
  document.getElementById('next-page').disabled = state.currentPage === totalPages;
  document.getElementById('last-page').disabled = state.currentPage === totalPages;
}

function openNewTicketModal() {
  const modal = document.getElementById('new-ticket-modal');
  modal.classList.remove('hidden');
  
  // Configurar fechamento do modal
  document.getElementById('close-ticket-modal').addEventListener('click', () => {
    modal.classList.add('hidden');
  });
  
  // Configurar envio do formulário
  document.getElementById('new-ticket-form').addEventListener('submit', (e) => {
    e.preventDefault();
    createNewTicket();
  });
}

function createNewTicket() {
  const subject = document.getElementById('ticket-subject').value;
  const department = document.getElementById('ticket-department').value;
  
  if (!subject || !department) {
    alert('Por favor, preencha todos os campos obrigatórios');
    return;
  }
  
  // Criar novo ticket (simulado)
  const newId = `HD-${(database.tickets.length + 10001).toString().slice(1)}`;
  const now = new Date();
  
  const newTicket = {
    id: newId,
    subject: subject,
    description: 'Descrição do problema a ser detalhado...',
    department: department,
    requester: database.currentUser.id,
    assignee: '',
    priority: 'medium',
    status: 'open',
    createdAt: now,
    updatedAt: now,
    messages: []
  };
  
  database.tickets.unshift(newTicket);
  
  // Fechar modal e atualizar lista
  document.getElementById('new-ticket-modal').classList.add('hidden');
  document.getElementById('new-ticket-form').reset();
  
  if (state.currentTab === 'tickets') {
    state.currentPage = 1;
    filterTickets();
  } else {
    switchTab('tickets');
  }
}

function viewTicket(ticketId) {
  const ticket = database.tickets.find(t => t.id === ticketId);
  if (!ticket) return;
  
  const deptInfo = getDepartmentInfo(ticket.department);
  const requester = getUserInfo(ticket.requester);
  const assignee = getUserInfo(ticket.assignee);
  
  alert(`Visualizando chamado ${ticket.id}\n
Assunto: ${ticket.subject}\n
Departamento: ${deptInfo.name}\n
Solicitante: ${requester.name}\n
Responsável: ${assignee.name || 'Não atribuído'}\n
Status: ${getStatusText(ticket.status)}\n
Prioridade: ${getPriorityText(ticket.priority)}\n
Descrição: ${ticket.description}\n
Criado em: ${formatDate(ticket.createdAt)}\n
Atualizado em: ${formatDate(ticket.updatedAt)}`);
}

function editTicket(ticketId) {
  const ticket = database.tickets.find(t => t.id === ticketId);
  if (!ticket) return;
  
  alert(`Edição do chamado ${ticket.id}\n(Funcionalidade completa seria implementada aqui)`);
}

// Chat
function loadConversations() {
  const container = document.getElementById('conversations-list');
  container.innerHTML = '';
  
  database.conversations.forEach(conv => {
    const otherParticipantId = conv.participants.find(p => p !== database.currentUser.id);
    const participant = getUserInfo(otherParticipantId);
    const lastMsg = conv.lastMessage;
    const sender = getUserInfo(lastMsg.sender);
    
    const convEl = document.createElement('div');
    convEl.className = `p-4 hover:bg-gray-50 cursor-pointer ${conv.id === state.currentConversation ? 'bg-blue-50' : ''} ${conv.unread ? 'font-semibold' : ''}`;
    convEl.dataset.conversationId = conv.id;
    convEl.innerHTML = `
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <div class="rounded-full h-10 w-10 bg-gray-200 flex items-center justify-center overflow-hidden">
            <span class="text-gray-600 text-sm">${participant.name.split(' ').map(n => n[0]).join('').toUpperCase()}</span>
          </div>
        </div>
        <div class="ml-3 flex-1 overflow-hidden">
          <div class="flex items-center justify-between">
            <p class="text-sm ${conv.unread ? 'text-gray-900' : 'text-gray-700'} truncate">${participant.name}</p>
            <p class="text-xs ${conv.unread ? 'text-gray-900' : 'text-gray-500'}">${formatDate(lastMsg.sentAt).split(' ')[0]}</p>
          </div>
          <p class="text-xs ${conv.unread ? 'text-gray-800' : 'text-gray-500'} truncate">${sender.name.split(' ')[0]}: ${lastMsg.content}</p>
        </div>
      </div>
    `;
    
    convEl.addEventListener('click', () => openConversation(conv.id));
    container.appendChild(convEl);
  });
}

function openConversation(conversationId) {
  const conversation = database.conversations.find(c => c.id === conversationId);
  if (!conversation) return;
  
  state.currentConversation = conversationId;
  
  // Marcar como lido
  conversation.unread = false;
  
  // Atualizar lista de conversas
  loadConversations();
  
  // Mostrar área de mensagens
  document.getElementById('no-chat-selected').classList.add('hidden');
  document.getElementById('chat-messages').classList.remove('hidden');
  document.getElementById('message-input-container').classList.remove('hidden');
  
  // Ativar botões de chamada
  document.getElementById('voice-call-btn').disabled = false;
  document.getElementById('video-call-btn').disabled = false;
  document.getElementById('attach-file-btn').disabled = false;
  
  // Carregar informações do chat
  const otherParticipantId = conversation.participants.find(p => p !== database.currentUser.id);
  const participant = getUserInfo(otherParticipantId);
  
  document.getElementById('chat-title').textContent = participant.name;
  document.getElementById('chat-status').textContent = 'Online';
  
  // Carregar mensagens (simulado - na realidade buscaria do ticket ou conversa)
  loadMessages(conversationId);
  
  // Configurar envio de mensagens
  document.getElementById('send-message-btn').addEventListener('click', sendMessage);
}

function loadMessages(conversationId) {
  const container = document.getElementById('chat-messages');
  container.innerHTML = '';
  
  // Simulando mensagens - na prática viria do banco de dados
  const messages = [
    {
      id: 'msg-001',
      sender: database.currentUser.id,
      content: 'Olá, tudo bem?',
      sentAt: new Date('2023-06-15T10:30:00')
    },
    {
      id: 'msg-002',
      sender: database.conversations.find(c => c.id === conversationId).participants.find(p => p !== database.currentUser.id),
      content: 'Tudo sim, e com você?',
      sentAt: new Date('2023-06-15T10:32:00')
    },
    {
      id: 'msg-003',
      sender: database.currentUser.id,
      content: 'Aqui também, obrigado! Como está aquele problema com o sistema?',
      sentAt: new Date('2023-06-15T10:33:00')
    }
  ];
  
  messages.forEach(msg => {
    const isCurrentUser = msg.sender === database.currentUser.id;
    const sender = getUserInfo(msg.sender);
    
    const msgEl = document.createElement('div');
    msgEl.className = `flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`;
    msgEl.innerHTML = `
      <div class="flex max-w-xs lg:max-w-md ${isCurrentUser ? 'bg-blue-100' : 'bg-gray-200'} rounded-lg px-4 py-2 ${isCurrentUser ? 'rounded-tr-none' : 'rounded-tl-none'}">
        <div class="${isCurrentUser ? 'hidden' : 'flex-shrink-0 mr-2'}">
          <div class="rounded-full h-8 w-8 bg-gray-300 flex items-center justify-center overflow-hidden">
            <span class="text-gray-600 text-xs">${sender.name.split(' ').map(n => n[0]).join('').toUpperCase()}</span>
          </div>
        </div>
        <div>
          <p class="${isCurrentUser ? 'text-blue-800' : 'text-gray-800'}">${msg.content}</p>
          <p class="text-xs ${isCurrentUser ? 'text-blue-600' : 'text-gray-500'} text-right mt-1">${formatDate(msg.sentAt).split(' ')[1]}</p>
        </div>
      </div>
    `;
    container.appendChild(msgEl);
  });
  
  // Rolagem automática para a última mensagem
  container.scrollTop = container.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById('message-input');
  const message = input.value.trim();
  if (!message) return;
  
  // Simular envio de mensagem
  const newMsg = {
    id: `msg-${Date.now()}`,
    sender: database.currentUser.id,
    content: message,
    sentAt: new Date()
  };
  
  // Adicionar à "conversa" (simulado)
  const conversation = database.conversations.find(c => c.id === state.currentConversation);
  if (conversation) {
    conversation.lastMessage = {
      sender: database.currentUser.id,
      content: message,
      sentAt: new Date()
    };
  }
  
  // Adicionar à visualização
  const container = document.getElementById('chat-messages');
  const msgEl = document.createElement('div');
  msgEl.className = 'flex justify-end';
  msgEl.innerHTML = `
    <div class="flex max-w-xs lg:max-w-md bg-blue-100 rounded-lg px-4 py-2 rounded-tr-none">
      <div>
        <p class="text-blue-800">${message}</p>
        <p class="text-xs text-blue-600 text-right mt-1">${formatDate(newMsg.sentAt).split(' ')[1]}</p>
      </div>
    </div>
  `;
  container.appendChild(msgEl);
  
  // Limpar input e rolar para baixo
  input.value = '';
  container.scrollTop = container.scrollHeight;
  
  // Simular resposta após 1-3 segundos
  if (Math.random() > 0.3) {
    setTimeout(() => {
      const otherParticipant = conversation.participants.find(p => p !== database.currentUser.id);
      const responses = [
        'Entendi, vou verificar isso.',
        'Pode me enviar mais detalhes?',
        'Já estou trabalhando nisso.',
        'Problema resolvido!',
        'Preciso confirmar com a equipe.',
        'Você pode tentar reiniciar o sistema?'
      ];
      const response = responses[Math.floor(Math.random() * responses.length)];
      
      const replyMsg = {
        id: `msg-${Date.now()}`,
        sender: otherParticipant,
        content: response,
        sentAt: new Date()
      };
      
      conversation.lastMessage = {
        sender: otherParticipant,
        content: response,
        sentAt: new Date()
      };
      
      const replyEl = document.createElement('div');
      replyEl.className = 'flex justify-start';
      const participant = getUserInfo(otherParticipant);
      
      replyEl.innerHTML = `
        <div class="flex max-w-xs lg:max-w-md bg-gray-200 rounded-lg px-4 py-2 rounded-tl-none">
          <div class="flex-shrink-0 mr-2">
            <div class="rounded-full h-8 w-8 bg-gray-300 flex items-center justify-center overflow-hidden">
              <span class="text-gray-600 text-xs">${participant.name.split(' ').map(n => n[0]).join('').toUpperCase()}</span>
            </div>
          </div>
          <div>
            <p class="text-gray-800">${response}</p>
            <p class="text-xs text-gray-500 text-right mt-1">${formatDate(replyMsg.sentAt).split(' ')[1]}</p>
          </div>
        </div>
      `;
      
      container.appendChild(replyEl);
      container.scrollTop = container.scrollHeight;
      
      // Atualizar lista de conversas
      loadConversations();
    }, 1000 + Math.random() * 2000);
  }
}

// Departamento específico (Automação)
function loadDepartmentView() {
  if (state.currentDepartment === 'automation') {
    document.getElementById('active-robots').textContent = 
      state.robots.filter(r => r.status === 'active').length;
    document.getElementById('maintenance-robots').textContent = 
      state.robots.filter(r => r.status === 'maintenance').length;
    document.getElementById('inactive-robots').textContent = 
      state.robots.filter(r => r.status === 'inactive').length;
    
    renderRobotsTable();
  } else if (state.currentDepartment === 'it') {
    // Implementar visualização para TI se necessário
  } else if (state.currentDepartment === 'admin') {
    // Implementar visualização para Admin se necessário
  }
}

function renderRobotsTable() {
  const tbody = document.getElementById('robots-table-body');
  tbody.innerHTML = '';
  
  state.robots.forEach(robot => {
    const statusColor = robot.status === 'active' ? 'bg-green-100 text-green-800' :
                       robot.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                       'bg-red-100 text-red-800';
    const statusText = robot.status === 'active' ? 'Ativo' :
                      robot.status === 'maintenance' ? 'Manutenção' : 'Inativo';
    
    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-50';
    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${robot.name}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${robot.location}</td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}">
          ${statusText}
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${robot.lastMaintenance}</td>
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button class="text-blue-600 hover:text-blue-900">Detalhes</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Inicialização
function init() {
  // Carregar informações do usuário atual
  document.getElementById('current-user-name').textContent = database.currentUser.name;
  document.getElementById('current-user-email').textContent = database.currentUser.email;
  
  // Configurar navegação
  setupNavigation();
  
  // Carregar a aba inicial
  switchTab('dashboard');
  
  // Configurar chat
  document.getElementById('message-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  
  // Configurar botões de chamada (simulado)
  document.getElementById('voice-call-btn').addEventListener('click', () => {
    alert('Chamada de voz iniciada');
  });
  
  document.getElementById('video-call-btn').addEventListener('click', () => {
    alert('Chamada de vídeo iniciada');
  });
  
  document.getElementById('attach-file-btn').addEventListener('click', () => {
    alert('Seletor de arquivos aberto');
  });
}

// Iniciar a aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', init);
