// Mock Data
const MOCK_DATA = {
    accessNodes: [
        { id: 1, name: 'Home Storage Cluster A', vpp: 'State Grid VPP', status: 'online', type: 'MANTA', inverters: 5, invertersOnline: 5, invertersOffline: 0, batteries: 10, batteriesOnline: 9, batteriesOffline: 1, ip: '192.168.1.100' },
        { id: 2, name: 'Industrial Park Zone 1', vpp: 'State Grid VPP', status: 'offline', type: 'CLOUD', inverters: 20, invertersOnline: 20, invertersOffline: 0, batteries: 40, batteriesOnline: 0, batteriesOffline: 40, vendor: 'Sungrow', appKey: 'manta_app_123', appAccess: 'sec_8f92a3c7d1e5' },
        { id: 3, name: 'Solar Farm Alpha', vpp: 'Local Energy VPP', status: 'online', type: 'MANTA', inverters: 50, invertersOnline: 48, invertersOffline: 2, batteries: 0, batteriesOnline: 0, batteriesOffline: 0, ip: '10.0.0.5' },
    ],
    vpps: [
        { id: 1, name: 'State Grid VPP', description: 'Primary grid balancing pool', capacity: '2.5 MWh', devices: 45 },
        { id: 2, name: 'Local Energy VPP', description: 'Community solar sharing', capacity: '800 kWh', devices: 12 },
    ],
    assignedDevices: [
         { id: 201, sn: 'INV-2023-099', vendor: 'Huawei', type: 'Inverter', status: 'online', vppId: 1, capacity: 50, userName: 'John Doe', phone: '+1 555-0101', email: 'john@example.com', address: '123 Solar St' },
         { id: 202, sn: 'BAT-2023-100', vendor: 'Tesla', type: 'Battery', status: 'online', vppId: 1, capacity: 100, userName: 'Jane Smith', phone: '+1 555-0102', email: 'jane@example.com', address: '456 Battery Ln' },
         { id: 203, sn: 'INV-2023-101', vendor: 'Sungrow', type: 'Inverter', status: 'offline', vppId: 2, capacity: 60, userName: 'Bob Brown', phone: '+1 555-0103', email: 'bob@example.com', address: '789 Power Ave' },
    ],
    devices: [
        { id: 101, sn: 'INV-2024-001', vendor: 'Sungrow', type: 'Inverter', status: 'online', capacity: 50, userName: 'Alice Green', phone: '+1 555-0201', email: 'alice@example.com', address: '321 Green Way' },
        { id: 102, sn: 'BAT-2024-002', vendor: 'CATL', type: 'Battery', status: 'online', capacity: 200, userName: 'Charlie Black', phone: '+1 555-0202', email: 'charlie@example.com', address: '654 Energy Blvd' },
        { id: 103, sn: 'INV-2024-003', vendor: 'Huawei', type: 'Inverter', status: 'offline', capacity: 45, userName: 'David White', phone: '+1 555-0203', email: 'david@example.com', address: '987 Volt Rd' },
        { id: 104, sn: 'BAT-2024-004', vendor: 'BYD', type: 'Battery', status: 'online', capacity: 150, userName: 'Eva Blue', phone: '+1 555-0204', email: 'eva@example.com', address: '147 Ampere Ct' },
        { id: 105, sn: 'INV-2024-005', vendor: 'Sungrow', type: 'Inverter', status: 'online', capacity: 55, userName: 'Frank Red', phone: '+1 555-0205', email: 'frank@example.com', address: '258 Ohm Pl' },
    ]
};

// State
const state = {
    currentView: 'dashboard',
    dashboardFilter: 'ALL',
    nodes: [...MOCK_DATA.accessNodes],
    vpps: [...MOCK_DATA.vpps],
    selectedVppId: MOCK_DATA.vpps[0].id,
    detailsTab: 'Inverters', // Inverters or Batteries
    vppDeviceTab: 'assigned', // assigned or discovery
    assignedSearchQuery: '',
    discoverySearchQuery: '',
    detailsSearchQuery: '',
    selectedNodeId: null,
    isSuperAdmin: true, // Default to true to simulate an admin user
};

// App Object
const app = {
    init() {
        this.navigate('dashboard');
        this.setupGlobalListeners();
    },

    formatSensitive(text) {
        if (state.isSuperAdmin) return text || '-';
        if (!text || text === '-') return '-';
        return '******';
    },

    setupGlobalListeners() {
        // Close modal on backdrop click
        document.getElementById('modal-backdrop').addEventListener('click', () => {
            if (!state.modalPreventClose) this.closeModal();
        });
        // Close drawer on backdrop click
        document.getElementById('drawer-backdrop').addEventListener('click', () => this.closeDrawer());
    },

    navigate(viewName, params = {}) {
        state.currentView = viewName;
        if (viewName === 'details') {
            state.detailsTab = 'Inverters'; // Reset tab on navigation
            state.detailsSearchQuery = ''; // Reset search query
            state.selectedNodeId = params.id;
        }
        
        // Update Sidebar
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        if (viewName === 'dashboard' || viewName === 'details') {
            document.getElementById('nav-dashboard').classList.add('active');
        } else {
            const navItem = document.getElementById(`nav-${viewName}`);
            if (navItem) navItem.classList.add('active');
        }

        // Update Header
        const titles = {
            'dashboard': 'Data Access',
            'vpp': 'VPP Management',
            'details': 'Access Details'
        };
        document.getElementById('page-title').textContent = titles[viewName] || 'Dashboard';

        // Render Content
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = ''; // Clear current content
        contentArea.classList.remove('fade-in');
        void contentArea.offsetWidth; // Trigger reflow
        contentArea.classList.add('fade-in');

        if (viewName === 'dashboard') {
            this.renderDashboard(contentArea);
        } else if (viewName === 'vpp') {
            this.renderVPP(contentArea);
        } else if (viewName === 'details') {
            this.renderDetails(contentArea, params.id);
        }

        lucide.createIcons();
    },

    // ==========================================
    // RENDERERS
    // ==========================================

    renderDashboard(container) {
        container.innerHTML = ''; // Clear container first if not cleared by caller, though navigate clears it.
        
        // Action Bar
        const actionBar = document.createElement('div');
        actionBar.className = 'flex flex-col gap-6 mb-8';
        
        const filterBtnClass = (type) => 
            state.dashboardFilter === type 
                ? 'px-4 py-2 rounded-lg text-sm font-medium bg-brand text-white shadow-lg shadow-brand/20 transition-all flex items-center gap-2' 
                : 'px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2';

        actionBar.innerHTML = `
            <div>
                <h1 class="text-3xl font-bold text-white tracking-tight mb-1">Access Points</h1>
            </div>
            
            <div class="flex justify-between items-center">
                <!-- Filter Group -->
                <div class="bg-surface-dark/50 backdrop-blur-md p-1 rounded-lg border border-white/10 flex">
                    <button onclick="app.setDashboardFilter('ALL')" class="${filterBtnClass('ALL')}">
                        <i data-lucide="layout-grid" class="w-4 h-4"></i>
                        <span>All</span>
                    </button>
                    <button onclick="app.setDashboardFilter('CLOUD')" class="${filterBtnClass('CLOUD')}">
                        <i data-lucide="cloud" class="w-4 h-4"></i>
                        <span>Cloud</span>
                    </button>
                    <button onclick="app.setDashboardFilter('MANTA')" class="${filterBtnClass('MANTA')}">
                        <i data-lucide="server" class="w-4 h-4"></i>
                        <span>Manta</span>
                    </button>
                </div>

                <button onclick="app.openCreateModal()" class="flex items-center gap-2 bg-brand hover:bg-brand-light text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-brand/20 hover:shadow-brand/40 active:scale-95 border border-brand-light/20">
                    <i data-lucide="plus" class="w-5 h-5"></i>
                    <span>New</span>
                </button>
            </div>
        `;
        container.appendChild(actionBar);

        // Filter Nodes
        const filteredNodes = state.nodes.filter(node => 
            state.dashboardFilter === 'ALL' || node.type === state.dashboardFilter
        );

        // Grid
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6';
        
        if (filteredNodes.length === 0) {
            grid.className = 'flex flex-col items-center justify-center py-20 text-slate-500 col-span-full';
            grid.innerHTML = `
                <i data-lucide="inbox" class="w-12 h-12 mb-4 opacity-50"></i>
                <p>No access points found for this filter.</p>
            `;
        }
        
        filteredNodes.forEach(node => {
            const isOnline = node.status === 'online';
            const vendorName = node.type === 'MANTA' ? 'OSW' : (node.vendor || 'Unknown');
            let iconName = 'cloud';
            const vLower = vendorName.toLowerCase();
            if (vLower.includes('osw')) iconName = 'server';
            else if (vLower.includes('sungrow')) iconName = 'sun';
            else if (vLower.includes('huawei')) iconName = 'hexagon';
            else if (vLower.includes('tesla')) iconName = 'zap';
            else if (vLower.includes('byd')) iconName = 'battery';
            else if (vLower.includes('catl')) iconName = 'battery-charging';

            const card = document.createElement('div');
            card.className = 'glass-panel rounded-xl p-6 hover:border-brand/50 transition-colors group relative overflow-hidden cursor-pointer';
            card.onclick = (e) => {
                // Prevent navigation if clicking on specific interactive elements if needed
                app.navigate('details', { id: node.id });
            };
            
            card.innerHTML = `
                <div class="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                    <i data-lucide="${iconName}" class="w-24 h-24"></i>
                </div>
                
                <div class="flex justify-between items-start mb-4 relative z-10 pointer-events-none">
                    <div class="flex items-center gap-3">
                        <div class="flex flex-col items-center gap-1 min-w-[3.5rem]">
                            <div class="p-2.5 rounded-lg ${node.type === 'MANTA' ? 'bg-brand/20 text-brand-light' : 'bg-purple-500/20 text-purple-400'}">
                                <i data-lucide="${iconName}" class="w-6 h-6"></i>
                            </div>
                            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">${vendorName}</span>
                        </div>
                        <div>
                            <h3 class="font-semibold text-lg text-white leading-tight">${node.name}</h3>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4 mt-6 relative z-10 pointer-events-none">
                    <div class="bg-surface-dark/50 rounded-lg p-3 border border-white/5">
                        <div class="flex justify-between items-start mb-2">
                            <p class="text-xs text-slate-500">Inverters</p>
                            <span class="text-xs font-mono text-white bg-white/5 px-1.5 py-0.5 rounded">${node.inverters}</span>
                        </div>
                        <div class="space-y-1 pt-1 border-t border-white/5">
                            <div class="flex justify-between items-center">
                                <div class="flex items-center gap-1.5">
                                    <div class="w-1.5 h-1.5 rounded-full bg-success"></div>
                                    <span class="text-slate-500 text-[10px]">Online</span>
                                </div>
                                <span class="text-slate-300 font-mono text-[10px]">${node.invertersOnline}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <div class="flex items-center gap-1.5">
                                    <div class="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                                    <span class="text-slate-500 text-[10px]">Offline</span>
                                </div>
                                <span class="text-slate-300 font-mono text-[10px]">${node.invertersOffline}</span>
                            </div>
                        </div>
                    </div>
                    <div class="bg-surface-dark/50 rounded-lg p-3 border border-white/5">
                        <div class="flex justify-between items-start mb-2">
                            <p class="text-xs text-slate-500">Batteries</p>
                            <span class="text-xs font-mono text-white bg-white/5 px-1.5 py-0.5 rounded">${node.batteries}</span>
                        </div>
                         <div class="space-y-1 pt-1 border-t border-white/5">
                            <div class="flex justify-between items-center">
                                <div class="flex items-center gap-1.5">
                                    <div class="w-1.5 h-1.5 rounded-full bg-success"></div>
                                    <span class="text-slate-500 text-[10px]">Online</span>
                                </div>
                                <span class="text-slate-300 font-mono text-[10px]">${node.batteriesOnline}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <div class="flex items-center gap-1.5">
                                    <div class="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                                    <span class="text-slate-500 text-[10px]">Offline</span>
                                </div>
                                <span class="text-slate-300 font-mono text-[10px]">${node.batteriesOffline}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-6 pt-4 border-t border-white/5 flex justify-between items-center relative z-10 pointer-events-none">
                    <button onclick="event.stopPropagation(); app.toggleNodeStatus(${node.id})" class="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${isOnline ? 'bg-success/10 border-success/20 text-success hover:bg-success/20' : 'bg-slate-700/50 border-slate-600 text-slate-400 hover:bg-slate-700'}">
                        <span class="w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-success animate-pulse' : 'bg-slate-400'}"></span>
                        ${isOnline ? 'Enabled' : 'Disabled'}
                    </button>
                    <button class="text-sm text-brand-light hover:text-white font-medium transition-colors flex items-center gap-1">
                        Details <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });

        container.appendChild(grid);
    },

    renderDetails(container, nodeId) {
        container.innerHTML = ''; // Clear container
        const node = state.nodes.find(n => n.id == nodeId);
        if (!node) return this.navigate('dashboard');

        // Back button + Header
        const header = document.createElement('div');
        header.className = 'flex items-center gap-4 mb-8';
        header.innerHTML = `
            <button onclick="app.navigate('dashboard')" class="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
                <i data-lucide="arrow-left" class="w-6 h-6"></i>
            </button>
            <div>
                <h1 class="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    ${node.name}
                    <span class="text-xs px-2 py-0.5 rounded border border-white/10 text-slate-400 font-normal">${node.type}</span>
                </h1>

            </div>
        `;
        container.appendChild(header);

        // Content Grid
        const content = document.createElement('div');
        content.className = 'flex flex-col gap-8';

        // Top: Info & Config (Full Width)
        const infoPanel = document.createElement('div');
        infoPanel.className = 'glass-panel p-6 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-8';
        
        let sensitiveInfoHTML = '';
        if (node.type === 'CLOUD') {
            sensitiveInfoHTML = `
                <div>
                    <h3 class="text-sm font-semibold text-white mb-3">Cloud Credentials</h3>
                    <div class="space-y-3">
                        <div>
                            <label class="text-xs text-slate-500 uppercase">Authorization Method</label>
                            <div class="text-sm text-slate-300">${node.authMethod === 'oauth' ? 'Single Authorization' : 'Batch Authorization'}</div>
                        </div>
                        <div>
                            <label class="text-xs text-slate-500 uppercase">App Key</label>
                            <div class="font-mono text-sm text-slate-300">${node.appKey || 'N/A'}</div>
                        </div>
                        <div>
                            <label class="text-xs text-slate-500 uppercase">App Access</label>
                            <div class="flex items-center gap-2">
                                <div class="font-mono text-sm text-slate-300 bg-surface-dark px-2 py-1 rounded w-full" id="secret-${node.id}">••••••••••••••••</div>
                                <button onclick="app.toggleSecret('${node.id}', '${node.appAccess}')" class="p-1 hover:text-white text-slate-400 transition-colors">
                                    <i data-lucide="eye" class="w-4 h-4"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
             sensitiveInfoHTML = `
                <div>
                    <h3 class="text-sm font-semibold text-white mb-3">Connection Info</h3>
                    <div class="space-y-3">
                        <div>
                            <label class="text-xs text-slate-500 uppercase">Authorization Method</label>
                            <div class="text-sm text-slate-300">Local Connection</div>
                        </div>
                        <div>
                            <label class="text-xs text-slate-500 uppercase">IP Address</label>
                            <div class="font-mono text-sm text-slate-300">${node.ip}</div>
                        </div>
                        <div>
                            <label class="text-xs text-slate-500 uppercase">Port</label>
                            <div class="font-mono text-sm text-slate-300">8080</div>
                        </div>
                    </div>
                </div>
            `;
        }

        infoPanel.innerHTML = `
            ${sensitiveInfoHTML}
            <div>
                <h3 class="text-sm font-semibold text-white mb-3">General Info</h3>
                <div class="space-y-3">
                    <div class="flex justify-between items-center border-b border-white/5 pb-2">
                        <span class="text-slate-400 text-sm">Vendor</span>
                        <span class="text-white font-mono text-sm">${node.vendor || 'Manta Native'}</span>
                    </div>
                    <div class="flex justify-between items-center border-b border-white/5 pb-2">
                        <span class="text-slate-400 text-sm">Device Count</span>
                        <span class="text-white font-mono text-sm">${node.inverters + node.batteries}</span>
                    </div>
                    <div class="flex justify-between items-center pt-1">
                        <span class="text-slate-400 text-sm">Last Sync</span>
                        <span class="text-white font-mono text-sm">${new Date().toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                </div>
            </div>
        `;

        // Bottom: Tabs & Chart
        const mainPanel = document.createElement('div');
        mainPanel.className = 'space-y-6';

        // Mock Data for Tabs - Dynamic generation based on node counts, merging with real added devices
        const generateDevices = (type, count) => {
            const nodeVendor = node.type === 'MANTA' ? 'OSW' : (node.vendor || 'Unknown');
            
            // Find real assigned devices that match this node's vendor
            const realDevices = MOCK_DATA.assignedDevices
                .filter(d => {
                    const deviceVendor = d.vendor === 'OSW' ? 'OSW' : d.vendor;
                    const targetVendor = nodeVendor === 'OSW' ? 'OSW' : nodeVendor;
                    return deviceVendor === targetVendor && d.type === type;
                })
                .map(d => ({
                    sn: d.sn,
                    model: d.type === 'Inverter' ? 'SG-5K-D' : 'LFP-10K', // Default model if missing
                    status: d.status,
                    capacity: d.capacity || (d.type === 'Inverter' ? 50 : 100),
                    userName: d.userName || '-',
                    phone: d.phone || '-',
                    email: d.email || '-',
                    address: d.address || '-',
                    data: d.type === 'Inverter' ? 
                        { Voltage: (220 + Math.random()*5).toFixed(1) + ' V', Current: (10 + Math.random()*10).toFixed(1) + ' A', Frequency: '50.02 Hz', Temp: (30 + Math.random()*15).toFixed(0) + ' °C', Power: (3 + Math.random()*2).toFixed(1) + ' kW' } :
                        { Voltage: '51.2 V', Current: (20 + Math.random()*30).toFixed(1) + ' A', SOC: Math.floor(60 + Math.random()*40) + '%', Temp: (25 + Math.random()*10).toFixed(0) + ' °C', Power: (1 + Math.random()*2).toFixed(1) + ' kW' }
                }));

            // Calculate how many mocks needed
            const mockCount = Math.max(0, count - realDevices.length);

            const mocks = Array.from({length: mockCount}, (_, i) => ({
                sn: `${type === 'Inverter' ? 'INV' : 'BAT'}-${String(i+1).padStart(3, '0')}`,
                model: type === 'Inverter' ? 'SG-5K-D' : 'LFP-10K',
                status: Math.random() > 0.1 ? 'online' : 'offline',
                capacity: type === 'Inverter' ? 50 : 200,
                userName: `User ${i+1}`,
                phone: `+1 555-01${String(i+1).padStart(2, '0')}`,
                email: `user${i+1}@example.com`,
                address: `${100 + i} Main St, City`,
                data: type === 'Inverter' ? 
                    { Voltage: (220 + Math.random()*5).toFixed(1) + ' V', Current: (10 + Math.random()*10).toFixed(1) + ' A', Frequency: '50.02 Hz', Temp: (30 + Math.random()*15).toFixed(0) + ' °C', Power: (3 + Math.random()*2).toFixed(1) + ' kW' } :
                    { Voltage: '51.2 V', Current: (20 + Math.random()*30).toFixed(1) + ' A', SOC: Math.floor(60 + Math.random()*40) + '%', Temp: (25 + Math.random()*10).toFixed(0) + ' °C', Power: (1 + Math.random()*2).toFixed(1) + ' kW' }
            }));
            
            return [...realDevices, ...mocks];
        };

        const DEVICE_LIST = {
            'Inverters': generateDevices('Inverter', node.inverters || 2),
            'Batteries': generateDevices('Battery', node.batteries || 2)
        };
        
        // VPP Data Preparation
        const vppData = state.vpps.filter(v => v.name === node.vpp);
        
        const currentList = (DEVICE_LIST[state.detailsTab] || []).filter(dev => {
            if (!state.detailsSearchQuery) return true;
            const q = state.detailsSearchQuery.toLowerCase();
            return (dev.sn && dev.sn.toLowerCase().includes(q)) ||
                   (dev.model && dev.model.toLowerCase().includes(q)) ||
                   (dev.userName && dev.userName.toLowerCase().includes(q)) ||
                   (dev.phone && dev.phone.toLowerCase().includes(q)) ||
                   (dev.email && dev.email.toLowerCase().includes(q)) ||
                   (dev.address && dev.address.toLowerCase().includes(q));
        });

        const headers = state.detailsTab === 'Inverters' 
            ? ['Voltage', 'Current', 'Frequency', 'Temp', 'Power']
            : ['Voltage', 'Current', 'SOC', 'Temp', 'Power'];
        
        const isVppTab = state.detailsTab === 'VPP';

        mainPanel.innerHTML = `
            <div class="flex justify-between items-end border-b border-white/10 pb-1">
                <div class="flex gap-4">
                    <button onclick="app.setDetailsTab('Inverters', ${nodeId})" class="px-4 py-2 transition-colors ${state.detailsTab === 'Inverters' ? 'text-brand-light border-b-2 border-brand font-medium' : 'text-slate-400 hover:text-white'}">Inverters</button>
                    <button onclick="app.setDetailsTab('Batteries', ${nodeId})" class="px-4 py-2 transition-colors ${state.detailsTab === 'Batteries' ? 'text-brand-light border-b-2 border-brand font-medium' : 'text-slate-400 hover:text-white'}">Batteries</button>
                </div>
                <div class="relative mb-2">
                    <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"></i>
                    <input 
                        type="text" 
                        id="details-search-input"
                        placeholder="Search devices..." 
                        value="${state.detailsSearchQuery || ''}"
                        oninput="app.setDetailsSearch(this.value)"
                        class="bg-surface-dark border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-brand/50 w-64 transition-colors"
                    >
                </div>
            </div>
            
            <div class="glass-panel p-6 rounded-xl">
                 <h3 class="font-bold text-white mb-4">Device List</h3>
                 <table class="w-full text-left text-sm">
                    <thead>
                        <tr class="text-slate-500 border-b border-white/5">
                            <th class="pb-3 font-medium">SN</th>
                            <th class="pb-3 font-medium">Model</th>
                            <th class="pb-3 font-medium">Status</th>
                            <th class="pb-3 font-medium">Capacity</th>
                            <th class="pb-3 font-medium">User Name</th>
                            <th class="pb-3 font-medium">Phone</th>
                            <th class="pb-3 font-medium">Email</th>
                            <th class="pb-3 font-medium">Address</th>
                            ${headers.map(h => `<th class="pb-3 font-medium text-right">${h}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody class="text-slate-300">
                        ${currentList.map(dev => `
                        <tr class="border-b border-white/5 last:border-0 group hover:bg-white/5 transition-colors">
                            <td class="py-3 font-mono">${dev.sn}</td>
                            <td class="py-3">${dev.model}</td>
                            <td class="py-3 ${dev.status === 'online' ? 'text-success' : 'text-slate-500'}">${dev.status === 'online' ? 'Online' : 'Offline'}</td>
                            <td class="py-3 text-slate-400">${dev.capacity} kW</td>
                            <td class="py-3">${app.formatSensitive(dev.userName)}</td>
                            <td class="py-3 font-mono text-xs text-slate-400">${app.formatSensitive(dev.phone)}</td>
                            <td class="py-3 text-xs text-slate-400">${app.formatSensitive(dev.email)}</td>
                            <td class="py-3 text-xs text-slate-400" title="${app.formatSensitive(dev.address)}">${app.formatSensitive(dev.address).length > 10 ? app.formatSensitive(dev.address).substring(0, 10) + '...' : app.formatSensitive(dev.address)}</td>
                            ${headers.map(h => `
                                <td class="py-3 text-right font-mono cursor-pointer text-brand-light hover:text-white hover:underline transition-all ${h === 'Power' ? 'font-bold' : ''}" onclick="app.openDeviceDataModal('${dev.sn}', '${h}')">${dev.data[h]}</td>
                            `).join('')}
                        </tr>
                        `).join('')}
                    </tbody>
                 </table>
            </div>
        `;

        content.appendChild(infoPanel);
        content.appendChild(mainPanel);
        container.appendChild(content);


    },

    renderVPP(container) {
        // Layout: Left (VPP List) | Right (Device Discovery)
        container.className = "flex-1 flex gap-8 h-full overflow-hidden p-8";
        
        const selectedVpp = state.vpps.find(v => v.id === state.selectedVppId) || state.vpps[0];
        const assignedDevices = MOCK_DATA.assignedDevices
            .filter(d => d.vppId === selectedVpp.id)
            .filter(d => {
                if (!state.assignedSearchQuery) return true;
                const q = state.assignedSearchQuery.toLowerCase();
                return (d.sn && d.sn.toLowerCase().includes(q)) ||
                       (d.vendor && d.vendor.toLowerCase().includes(q)) ||
                       (d.type && d.type.toLowerCase().includes(q)) ||
                       (d.userName && d.userName.toLowerCase().includes(q)) ||
                       (d.phone && d.phone.toLowerCase().includes(q)) ||
                       (d.email && d.email.toLowerCase().includes(q)) ||
                       (d.address && d.address.toLowerCase().includes(q));
            });

        container.innerHTML = `
            <!-- Left Column: VPP List -->
            <div class="w-1/3 flex flex-col gap-4 slide-up" style="animation-delay: 0.1s;">
                <div class="flex justify-between items-center bg-surface-dark/30 p-2 rounded-xl border border-white/5 h-[58px]">
                    <h2 class="text-xl font-bold text-white pl-2">VPP List</h2>
                    <button onclick="app.openVPPDrawer()" class="flex items-center gap-2 bg-brand hover:bg-brand-light text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-brand/20 hover:shadow-brand/40 active:scale-95 border border-brand-light/20">
                        <i data-lucide="plus" class="w-4 h-4"></i>
                        <span>New</span>
                    </button>
                </div>
                
                <div class="flex-1 overflow-y-auto pr-2 space-y-4">
                    ${state.vpps.map((vpp) => {
                        const isSelected = vpp.id === state.selectedVppId;
                        const vppDevices = MOCK_DATA.assignedDevices.filter(d => d.vppId === vpp.id);
                        
                        const invs = vppDevices.filter(d => d.type === 'Inverter');
                        const bats = vppDevices.filter(d => d.type === 'Battery');
                        
                        const stats = {
                            inv: {
                                total: invs.length,
                                online: invs.filter(d => d.status === 'online').length,
                                offline: invs.filter(d => d.status === 'offline').length,
                                cap: invs.reduce((sum, d) => sum + (d.capacity || 0), 0),
                                onlineCap: invs.filter(d => d.status === 'online').reduce((sum, d) => sum + (d.capacity || 0), 0),
                                offlineCap: invs.filter(d => d.status === 'offline').reduce((sum, d) => sum + (d.capacity || 0), 0)
                            },
                            bat: {
                                total: bats.length,
                                online: bats.filter(d => d.status === 'online').length,
                                offline: bats.filter(d => d.status === 'offline').length,
                                cap: bats.reduce((sum, d) => sum + (d.capacity || 0), 0),
                                onlineCap: bats.filter(d => d.status === 'online').reduce((sum, d) => sum + (d.capacity || 0), 0),
                                offlineCap: bats.filter(d => d.status === 'offline').reduce((sum, d) => sum + (d.capacity || 0), 0)
                            }
                        };

                        // VPP Card Template
                        return `
                        <div onclick="app.selectVPP(${vpp.id})" class="group glass-panel p-4 rounded-xl cursor-pointer border-l-4 ${isSelected ? 'border-l-brand bg-white/5' : 'border-l-transparent hover:border-l-slate-500 hover:bg-white/5'} transition-all duration-300 relative">
                            <!-- Header Section -->
                            <div class="flex justify-between items-start mb-3">
                                <div>
                                    <div class="flex items-center gap-2 mb-1">
                                        <h3 class="font-bold text-white group-hover:text-brand-light transition-colors">${vpp.name}</h3>
                                        ${isSelected ? '<span class="flex h-2 w-2 rounded-full bg-brand"></span>' : ''}
                                    </div>
                                    <p class="text-xs text-slate-400 line-clamp-1">${vpp.description}</p>
                                </div>
                                <div class="opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    <button onclick="event.stopPropagation(); app.openVPPDrawer(${vpp.id})" class="px-2 py-1 rounded bg-surface-dark border border-white/10 hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-white transition-colors shadow-lg flex items-center gap-1">
                                        <i data-lucide="edit-2" class="w-3 h-3"></i>
                                        <span>Edit</span>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Stats Grid -->
                            <div class="grid grid-cols-2 gap-3 text-xs">
                                <!-- Inverters Panel -->
                                <div class="bg-surface-dark/40 rounded-lg p-2 border border-white/5 group-hover:border-white/10 transition-colors">
                                    <div class="flex items-center gap-1.5 text-slate-300 font-medium mb-2 pb-2 border-b border-white/5">
                                        <i data-lucide="zap" class="w-3 h-3 text-brand"></i>
                                        <span>Inverters</span>
                                    </div>
                                    <div class="space-y-1.5">
                                        <div class="flex justify-between items-center">
                                            <span class="text-slate-500">Total</span>
                                            <span class="text-slate-200 font-mono text-[11px]">${stats.inv.total} <span class="text-slate-600">|</span> ${stats.inv.cap}kW</span>
                                        </div>
                                        <div class="space-y-1 pt-1 border-t border-white/5">
                                            <div class="flex justify-between items-center">
                                                <div class="flex items-center gap-1.5">
                                                    <div class="w-1.5 h-1.5 rounded-full bg-success"></div>
                                                    <span class="text-slate-500 text-[10px]">Online</span>
                                                </div>
                                                <span class="text-slate-300 font-mono text-[10px]">${stats.inv.online} <span class="text-slate-600">/</span> ${stats.inv.onlineCap}kW</span>
                                            </div>
                                            <div class="flex justify-between items-center">
                                                <div class="flex items-center gap-1.5">
                                                    <div class="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                                                    <span class="text-slate-500 text-[10px]">Offline</span>
                                                </div>
                                                <span class="text-slate-300 font-mono text-[10px]">${stats.inv.offline} <span class="text-slate-600">/</span> ${stats.inv.offlineCap}kW</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Batteries Panel -->
                                <div class="bg-surface-dark/40 rounded-lg p-2 border border-white/5 group-hover:border-white/10 transition-colors">
                                    <div class="flex items-center gap-1.5 text-slate-300 font-medium mb-2 pb-2 border-b border-white/5">
                                        <i data-lucide="battery" class="w-3 h-3 text-blue-400"></i>
                                        <span>Batteries</span>
                                    </div>
                                    <div class="space-y-1.5">
                                        <div class="flex justify-between items-center">
                                            <span class="text-slate-500">Total</span>
                                            <span class="text-slate-200 font-mono text-[11px]">${stats.bat.total} <span class="text-slate-600">|</span> ${stats.bat.cap}kWh</span>
                                        </div>
                                        <div class="space-y-1 pt-1 border-t border-white/5">
                                            <div class="flex justify-between items-center">
                                                <div class="flex items-center gap-1.5">
                                                    <div class="w-1.5 h-1.5 rounded-full bg-success"></div>
                                                    <span class="text-slate-500 text-[10px]">Online</span>
                                                </div>
                                                <span class="text-slate-300 font-mono text-[10px]">${stats.bat.online} <span class="text-slate-600">/</span> ${stats.bat.onlineCap}kWh</span>
                                            </div>
                                            <div class="flex justify-between items-center">
                                                <div class="flex items-center gap-1.5">
                                                    <div class="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                                                    <span class="text-slate-500 text-[10px]">Offline</span>
                                                </div>
                                                <span class="text-slate-300 font-mono text-[10px]">${stats.bat.offline} <span class="text-slate-600">/</span> ${stats.bat.offlineCap}kWh</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `}).join('')}
                </div>
            </div>

            <!-- Right Column: Device Management -->
            <div class="flex-1 flex flex-col gap-4 slide-up" style="animation-delay: 0.2s;">
                
                <!-- Tab Switcher & Header -->
                <div class="flex justify-between items-center bg-surface-dark/30 p-2 rounded-xl border border-white/5 h-[58px]">
                     <div class="flex bg-surface-dark rounded-lg p-1 border border-white/5">
                        <button onclick="app.setVppDeviceTab('assigned')" class="px-4 py-1.5 rounded-md text-sm font-medium transition-all ${state.vppDeviceTab === 'assigned' ? 'bg-brand text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}">Joined Devices</button>
                        <button onclick="app.setVppDeviceTab('discovery')" class="px-4 py-1.5 rounded-md text-sm font-medium transition-all ${state.vppDeviceTab === 'discovery' ? 'bg-brand text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}">Joinable Devices</button>
                     </div>
                     ${state.vppDeviceTab === 'assigned' ? `
                     <div class="flex gap-2">
                        <div class="relative">
                            <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"></i>
                            <input 
                                type="text" 
                                id="assigned-search-input"
                                placeholder="Search" 
                                value="${state.assignedSearchQuery || ''}"
                                oninput="app.setAssignedSearch(this.value)"
                                class="bg-surface-dark border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-brand/50 w-64 transition-colors"
                            >
                        </div>
                        <button onclick="app.openAddDeviceDrawer()" class="flex items-center gap-2 bg-brand hover:bg-brand-light text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-brand/20">
                            <i data-lucide="plus" class="w-4 h-4"></i>
                            <span>Add Device</span>
                        </button>
                        <button onclick="app.openBatchAddModal()" class="flex items-center gap-2 bg-surface-dark border border-white/10 hover:bg-white/5 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all">
                            <i data-lucide="upload" class="w-4 h-4"></i>
                            <span>Batch Add</span>
                        </button>
                     </div>
                     ` : ''}
                     ${state.vppDeviceTab === 'discovery' ? `
                     <div class="relative">
                        <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"></i>
                        <input 
                            type="text" 
                            id="discovery-search-input"
                            placeholder="Search" 
                            value="${state.discoverySearchQuery || ''}"
                            oninput="app.setDiscoverySearch(this.value)"
                            class="bg-surface-dark border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-brand/50 w-64 transition-colors"
                        >
                     </div>
                     ` : ''}
                </div>

                <!-- Content Panel -->
                <div class="flex-1 flex flex-col glass-panel rounded-2xl border-white/5 overflow-hidden">
                    ${state.vppDeviceTab === 'assigned' ? `
                        <!-- Assigned Devices List -->
                        <div class="flex-1 overflow-y-auto p-6">
                            <table class="w-full text-left border-collapse">
                                <thead>
                                    <tr class="text-xs text-slate-500 border-b border-white/5">
                                        <th class="pb-3 font-medium">Serial Number</th>
                                        <th class="pb-3 font-medium">Type</th>
                                        <th class="pb-3 font-medium">Vendor</th>
                                        <th class="pb-3 font-medium">Status</th>
                                        <th class="pb-3 font-medium">Capacity</th>
                                        <th class="pb-3 font-medium">User Name</th>
                                        <th class="pb-3 font-medium">Phone</th>
                                        <th class="pb-3 font-medium">Email</th>
                                        <th class="pb-3 font-medium">Address</th>
                                    </tr>
                                </thead>
                                <tbody class="text-sm">
                                    ${assignedDevices.length > 0 ? assignedDevices.map(dev => `
                                        <tr class="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                                            <td class="py-3 font-mono text-slate-300 group-hover:text-white">${dev.sn}</td>
                                            <td class="py-3 text-slate-400">
                                                <span class="flex items-center gap-2">
                                                    <i data-lucide="${dev.type === 'Inverter' ? 'zap' : 'battery'}" class="w-3.5 h-3.5"></i>
                                                    ${dev.type}
                                                </span>
                                            </td>
                                            <td class="py-3 text-slate-400">${dev.vendor}</td>
                                            <td class="py-3">
                                                <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs ${dev.status === 'online' ? 'bg-success/10 text-success' : 'bg-slate-700 text-slate-400'}">
                                                    <span class="w-1 h-1 rounded-full bg-current"></span>
                                                    ${dev.status}
                                                </span>
                                            </td>
                                            <td class="py-3 text-slate-400">${dev.capacity} kW</td>
                                            <td class="py-3 text-slate-400">${dev.userName || '-'}</td>
                                            <td class="py-3 font-mono text-xs text-slate-400">${dev.phone || '-'}</td>
                                            <td class="py-3 text-xs text-slate-400">${dev.email || '-'}</td>
                                            <td class="py-3 text-xs text-slate-400" title="${dev.address || '-'}">${dev.address ? (dev.address.length > 10 ? dev.address.substring(0, 10) + '...' : dev.address) : '-'}</td>
                                        </tr>
                                    `).join('') : `
                                        <tr>
                                            <td colspan="9" class="py-8 text-center text-slate-500">
                                                当前暂无设备
                                            </td>
                                        </tr>
                                    `}
                                </tbody>
                            </table>
                        </div>
                    ` : `
                        <!-- Device Discovery List -->
                        <div class="flex-1 overflow-y-auto p-6">
                            <table class="w-full text-left border-collapse">
                                <thead>
                                    <tr class="text-xs text-slate-500 border-b border-white/5">
                                        <th class="pb-3 font-medium">Serial Number</th>
                                        <th class="pb-3 font-medium">Type</th>
                                        <th class="pb-3 font-medium">Vendor</th>
                                        <th class="pb-3 font-medium">Status</th>
                                        <th class="pb-3 font-medium">Capacity</th>
                                        <th class="pb-3 font-medium">User Name</th>
                                        <th class="pb-3 font-medium">Phone</th>
                                        <th class="pb-3 font-medium">Email</th>
                                        <th class="pb-3 font-medium">Address</th>
                                    </tr>
                                </thead>
                                <tbody class="text-sm">
                                    ${MOCK_DATA.devices
                                        .filter(dev => {
                                            if (!state.discoverySearchQuery) return true;
                                            const q = state.discoverySearchQuery.toLowerCase();
                                            return (dev.sn && dev.sn.toLowerCase().includes(q)) ||
                                                   (dev.vendor && dev.vendor.toLowerCase().includes(q)) ||
                                                   (dev.type && dev.type.toLowerCase().includes(q)) ||
                                                   (dev.userName && dev.userName.toLowerCase().includes(q)) ||
                                                   (dev.phone && dev.phone.toLowerCase().includes(q)) ||
                                                   (dev.email && dev.email.toLowerCase().includes(q)) ||
                                                   (dev.address && dev.address.toLowerCase().includes(q));
                                        })
                                        .map(dev => `
                                        <tr class="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                                            <td class="py-3 font-mono text-slate-300 group-hover:text-white">${dev.sn}</td>
                                            <td class="py-3 text-slate-400">
                                                <span class="flex items-center gap-2">
                                                    <i data-lucide="${dev.type === 'Inverter' ? 'zap' : 'battery'}" class="w-3.5 h-3.5"></i>
                                                    ${dev.type}
                                                </span>
                                            </td>
                                            <td class="py-3 text-slate-400">${dev.vendor}</td>
                                            <td class="py-3">
                                                <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs ${dev.status === 'online' ? 'bg-success/10 text-success' : 'bg-slate-700 text-slate-400'}">
                                                    <span class="w-1 h-1 rounded-full bg-current"></span>
                                                    ${dev.status}
                                                </span>
                                            </td>
                                            <td class="py-3 text-slate-400">${dev.capacity} kW</td>
                                            <td class="py-3 text-slate-400">${app.formatSensitive(dev.userName)}</td>
                                            <td class="py-3 font-mono text-xs text-slate-400">${app.formatSensitive(dev.phone)}</td>
                                            <td class="py-3 text-xs text-slate-400">${app.formatSensitive(dev.email)}</td>
                                            <td class="py-3 text-xs text-slate-400" title="${app.formatSensitive(dev.address)}">${dev.address ? (app.formatSensitive(dev.address).length > 10 ? app.formatSensitive(dev.address).substring(0, 10) + '...' : app.formatSensitive(dev.address)) : '-'}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    `}
                </div>
            </div>
        `;
    },

    // ==========================================
    // ACTIONS
    // ==========================================

    selectVPP(vppId) {
        state.selectedVppId = vppId;
        this.renderVPP(document.getElementById('content-area'));
        lucide.createIcons();
    },

    setVppDeviceTab(tab) {
        state.vppDeviceTab = tab;
        this.renderVPP(document.getElementById('content-area'));
        lucide.createIcons();
    },

    setAssignedSearch(query) {
        state.assignedSearchQuery = query;
        this.renderVPP(document.getElementById('content-area'));
        lucide.createIcons();
        // Keep focus on input after re-render
        const input = document.getElementById('assigned-search-input');
        if (input) {
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length);
        }
    },

    setDetailsSearch(query) {
        state.detailsSearchQuery = query;
        this.renderDetails(document.getElementById('content-area'), state.selectedNodeId);
        lucide.createIcons();
        // Keep focus
        const input = document.getElementById('details-search-input');
        if (input) {
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length);
        }
    },

    setDiscoverySearch(query) {
        state.discoverySearchQuery = query;
        this.renderVPP(document.getElementById('content-area'));
        lucide.createIcons();
        // Keep focus on input after re-render
        const input = document.getElementById('discovery-search-input');
        if (input) {
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length);
        }
    },

    toggleNodeStatus(nodeId) {
        const node = state.nodes.find(n => n.id === nodeId);
        if (!node) return;

        if (node.status === 'online') {
            // Check for associated VPP or devices before disabling
            if (node.vpp || node.inverters > 0 || node.batteries > 0) {
                // Show failure alert (reusing modal or simple alert for now, but user asked for "prompt" then "confirm")
                // User requirement: "若该卡片下存在任意关联vpp或者设备，则停用失败并提示存在关联设备或VPP"
                // This implies we try to disable -> fail -> prompt reason.
                // But the user also said "click button disable -> popup confirm -> confirm -> disable".
                // So the check should probably happen either before confirm or after confirm.
                // "confirmation first, then disable" -> "if exists... disable fails".
                // Let's do the confirmation first as requested.
                this.showConfirmModal(
                    'Disable Access Node', 
                    `Are you sure you want to disable <strong>${node.name}</strong>?`,
                    () => {
                        // Actual disable logic check
                        if (node.vpp || node.inverters > 0 || node.batteries > 0) {
                             // Fail
                             this.showAlertModal('Operation Failed', 'Cannot disable this node because it has associated VPP or devices attached.');
                        } else {
                            // Success
                            node.status = 'offline';
                            this.renderDashboard(document.getElementById('content-area'));
                            lucide.createIcons();
                        }
                    }
                );
            } else {
                 // Even if empty, still confirm? "点击按钮停用，弹出弹窗并二次确认" -> Yes.
                 this.showConfirmModal(
                    'Disable Access Node', 
                    `Are you sure you want to disable <strong>${node.name}</strong>?`,
                    () => {
                        node.status = 'offline';
                        this.renderDashboard(document.getElementById('content-area'));
                        lucide.createIcons();
                    }
                );
            }
        } else {
            // Enable (no confirmation requested, but good practice? User didn't specify. Assuming direct toggle or confirm.)
            // "Default enabled... click to disable". Doesn't say anything about re-enabling.
            // I'll make it direct for now.
            node.status = 'online';
            this.renderDashboard(document.getElementById('content-area'));
            lucide.createIcons();
        }
    },

    showConfirmModal(title, message, onConfirm) {
        this.updateModalWidth('max-w-md');
        // Reuse modal structure or create a small one
        const backdrop = document.getElementById('modal-backdrop');
        const content = document.getElementById('modal-content');
        
        content.innerHTML = `
            <div class="p-8 text-center">
                <div class="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/20">
                    <i data-lucide="alert-triangle" class="w-8 h-8"></i>
                </div>
                <h3 class="text-xl font-bold text-white mb-3">${title}</h3>
                <p class="text-slate-400 mb-8 text-base leading-relaxed">${message}</p>
                <div class="grid grid-cols-2 gap-4">
                    <button id="modal-cancel-btn" class="w-full py-3 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-all font-medium">Cancel</button>
                    <button id="modal-confirm-btn" class="w-full py-3 rounded-xl bg-brand text-white hover:bg-brand-light transition-all font-bold shadow-lg shadow-brand/20">Confirm</button>
                </div>
            </div>
        `;
        
        this.toggleModal(true);
        lucide.createIcons();

        document.getElementById('modal-cancel-btn').onclick = () => this.toggleModal(false);
        document.getElementById('modal-confirm-btn').onclick = () => {
            this.toggleModal(false);
            if (onConfirm) onConfirm();
        };
    },

    showAlertModal(title, message) {
        this.updateModalWidth('max-w-md');
        state.modalPreventClose = true;
        const content = document.getElementById('modal-content');
        content.innerHTML = `
            <div class="p-8 text-center">
                <div class="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                    <i data-lucide="x-circle" class="w-8 h-8"></i>
                </div>
                <h3 class="text-xl font-bold text-white mb-3">${title}</h3>
                <p class="text-slate-400 mb-8 text-base leading-relaxed">${message}</p>
                <button onclick="app.toggleModal(false)" class="w-full py-3 rounded-xl bg-brand text-white hover:bg-brand-light transition-all font-bold shadow-lg shadow-brand/20">Confirm</button>
            </div>
        `;
        this.toggleModal(true);
        lucide.createIcons();
    },

    setDashboardFilter(filterType) {
        state.dashboardFilter = filterType;
        const contentArea = document.getElementById('content-area');
        // We need to re-render but keeping the fade-in animation might be distracting if it happens on every filter click.
        // Let's just re-render the dashboard content specifically or the whole view.
        // Re-rendering the whole view via this.renderDashboard is easiest.
        this.renderDashboard(contentArea);
        lucide.createIcons();
    },

    setDetailsTab(tabName, nodeId) {
        state.detailsTab = tabName;
        const contentArea = document.getElementById('content-area');
        // Re-render details view
        // We need to pass nodeId because renderDetails expects it. 
        // In a real app, we might store current nodeId in state to avoid passing it around.
        // For now, let's assume we can get it or pass it.
        // The onclick handler in renderDetails will pass it.
        this.renderDetails(contentArea, nodeId);
        lucide.createIcons();
    },

    openDeviceDataModal(sn, dataType = 'Power') {
        this.updateModalWidth('max-w-4xl');
        this.renderDeviceDataModalContent(sn, dataType);
        this.toggleModal(true);
    },

    renderDeviceDataModalContent(sn, dataType = 'Power', timeRange = '24H') {
        const modalContent = document.getElementById('modal-content');
        
        // Mock data generation based on SN and dataType
        const dataMap = {
            'Power': { unit: 'kW', color: '#1E40AF', data: [120, 132, 101, 134, 90, 230, 210] },
            'Voltage': { unit: 'V', color: '#10B981', data: [220, 222, 221, 223, 220, 221, 222] },
            'Current': { unit: 'A', color: '#F59E0B', data: [10, 12, 11, 13, 9, 23, 21] },
            'Frequency': { unit: 'Hz', color: '#8B5CF6', data: [50.01, 50.02, 49.99, 50.00, 50.01, 50.02, 49.98] },
            'Temperature': { unit: '°C', color: '#F43F5E', data: [35, 36, 38, 40, 42, 41, 39] },
            'SOC': { unit: '%', color: '#3B82F6', data: [80, 78, 75, 72, 70, 68, 85] }
        };

        // Adjust data based on timeRange
        let xAxisData = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];
        
        if (timeRange === '7D') {
            xAxisData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            // Simple randomization for demo
            Object.keys(dataMap).forEach(k => {
                dataMap[k].data = dataMap[k].data.map(v => v * (0.9 + Math.random() * 0.2));
            });
        } else if (timeRange === '30D') {
            xAxisData = ['1st', '5th', '10th', '15th', '20th', '25th', '30th'];
            Object.keys(dataMap).forEach(k => {
                dataMap[k].data = dataMap[k].data.map(v => v * (0.8 + Math.random() * 0.4));
            });
        } else if (timeRange === 'Custom') {
            xAxisData = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
        }

        // Available devices in the current context (Mocking those in the Details view)
        const availableDevices = [
            { sn: 'INV-001', model: 'SG-5K-D', type: 'Inverter' },
            { sn: 'INV-002', model: 'SG-5K-D', type: 'Inverter' }
        ];

        const currentData = dataMap[dataType] || dataMap['Power'];
        const types = Object.keys(dataMap);

        modalContent.innerHTML = `
            <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h3 class="text-xl font-bold text-white flex items-center gap-2">
                            Device Analysis
                        </h3>
                        <p class="text-slate-400 text-xs mt-1">Real-time data monitoring</p>
                    </div>
                    <button onclick="app.closeModal()" class="text-slate-400 hover:text-white transition-colors">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold text-slate-400 uppercase">Select Device</label>
                        <div class="relative">
                            <i data-lucide="server" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"></i>
                            <select onchange="app.renderDeviceDataModalContent(this.value, '${dataType}', '${timeRange}')" class="w-full bg-surface-dark border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all appearance-none cursor-pointer">
                                ${availableDevices.map(d => `<option value="${d.sn}" ${d.sn === sn ? 'selected' : ''}>${d.sn} - ${d.model}</option>`).join('')}
                            </select>
                            <i data-lucide="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none"></i>
                        </div>
                    </div>
                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold text-slate-400 uppercase">Data Metric</label>
                        <div class="relative">
                            <i data-lucide="activity" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"></i>
                            <select onchange="app.renderDeviceDataModalContent('${sn}', this.value, '${timeRange}')" class="w-full bg-surface-dark border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all appearance-none cursor-pointer">
                                ${types.map(t => `<option value="${t}" ${t === dataType ? 'selected' : ''}>${t}</option>`).join('')}
                            </select>
                            <i data-lucide="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none"></i>
                        </div>
                    </div>
                </div>

                <div class="glass-panel p-4 rounded-xl bg-surface-dark/50 border border-white/5">
                     <div class="flex justify-between items-center mb-4">
                        <h4 class="font-bold text-white">${dataType} Trend</h4>
                        
                        <div class="flex items-center gap-3">
                            <div class="flex bg-surface-dark rounded-lg p-1 border border-white/10">
                                ${['24H', '7D', '30D'].map(range => `
                                    <button onclick="app.renderDeviceDataModalContent('${sn}', '${dataType}', '${range}')" 
                                        class="px-3 py-1 text-xs rounded-md transition-all ${timeRange === range ? 'bg-white/10 text-white font-medium shadow-sm' : 'text-slate-400 hover:text-white'}">
                                        ${range}
                                    </button>
                                `).join('')}
                            </div>
                            
                            <div class="h-4 w-px bg-white/10"></div>
                            
                            <div class="relative">
                                <button onclick="const picker = document.getElementById('custom-range-picker'); picker.classList.toggle('hidden');" 
                                    class="flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg border border-white/10 transition-all ${timeRange === 'Custom' ? 'bg-brand/20 text-brand-light border-brand/20' : 'bg-surface-dark text-slate-400 hover:text-white hover:border-white/20'}">
                                    <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
                                    <span>${timeRange === 'Custom' ? 'Custom' : 'Custom'}</span>
                                </button>
                                
                                <div id="custom-range-picker" class="hidden absolute top-full right-0 mt-2 p-3 bg-surface border border-white/10 rounded-xl shadow-xl z-50 w-64 backdrop-blur-xl">
                                    <div class="space-y-3">
                                        <div class="space-y-1">
                                            <label class="text-[10px] uppercase text-slate-500 font-semibold">Start Date</label>
                                            <input type="date" class="w-full bg-surface-dark border border-white/10 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-brand" onclick="event.stopPropagation()">
                                        </div>
                                        <div class="space-y-1">
                                            <label class="text-[10px] uppercase text-slate-500 font-semibold">End Date</label>
                                            <input type="date" class="w-full bg-surface-dark border border-white/10 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-brand" onclick="event.stopPropagation()">
                                        </div>
                                        <button onclick="app.renderDeviceDataModalContent('${sn}', '${dataType}', 'Custom')" class="w-full bg-brand hover:bg-brand-light text-white text-xs font-medium py-1.5 rounded transition-colors">
                                            Apply Range
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="device-chart-container" class="w-full h-[300px]"></div>
                </div>

                <div class="mt-6 grid grid-cols-3 gap-4">
                    <div class="bg-surface-dark p-3 rounded-lg border border-white/5">
                        <p class="text-xs text-slate-500 mb-1">Current</p>
                        <p class="text-lg font-mono text-white">${currentData.data[currentData.data.length-1].toFixed(1)} <span class="text-xs text-slate-500">${currentData.unit}</span></p>
                    </div>
                    <div class="bg-surface-dark p-3 rounded-lg border border-white/5">
                        <p class="text-xs text-slate-500 mb-1">Average</p>
                        <p class="text-lg font-mono text-white">${(currentData.data.reduce((a,b)=>a+b,0)/currentData.data.length).toFixed(1)} <span class="text-xs text-slate-500">${currentData.unit}</span></p>
                    </div>
                    <div class="bg-surface-dark p-3 rounded-lg border border-white/5">
                        <p class="text-xs text-slate-500 mb-1">Peak</p>
                        <p class="text-lg font-mono text-white">${Math.max(...currentData.data).toFixed(1)} <span class="text-xs text-slate-500">${currentData.unit}</span></p>
                    </div>
                </div>
            </div>
        `;
        
        lucide.createIcons();
        
        // Init Chart
        setTimeout(() => {
            const chartDom = document.getElementById('device-chart-container');
            if (!chartDom) return;
            // Dispose existing instance if any
            const existingChart = echarts.getInstanceByDom(chartDom);
            if (existingChart) existingChart.dispose();

            const myChart = echarts.init(chartDom);
            const option = {
                grid: { top: 20, right: 20, bottom: 20, left: 40, containLabel: true },
                tooltip: { trigger: 'axis' },
                xAxis: {
                    type: 'category',
                    data: xAxisData,
                    axisLine: { lineStyle: { color: '#334155' } },
                    axisLabel: { color: '#94a3b8' }
                },
                yAxis: {
                    type: 'value',
                    splitLine: { lineStyle: { color: '#334155', type: 'dashed' } },
                    axisLabel: { color: '#94a3b8' }
                },
                series: [{
                    data: currentData.data,
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    lineStyle: { width: 3, color: currentData.color },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: currentData.color + '80' }, // 50% opacity
                            { offset: 1, color: currentData.color + '00' }  // 0% opacity
                        ])
                    }
                }]
            };
            myChart.setOption(option);
        }, 100);
    },

    openCreateModal() {
        this.updateModalWidth('max-w-xl');
        const modalContent = document.getElementById('modal-content');
        this.renderCreateModalContent('CLOUD');
        this.toggleModal(true);
    },

    renderCreateModalContent(type) {
        const modalContent = document.getElementById('modal-content');
        const isManta = type === 'MANTA';

        const mantaForm = `
            <div class="grid grid-cols-3 gap-4">
                <div class="col-span-2 space-y-1.5">
                    <label class="text-xs font-semibold text-slate-400 uppercase">IP Address / URL</label>
                    <input type="text" name="ip" class="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all font-mono text-sm" placeholder="192.168.x.x">
                </div>
                <div class="space-y-1.5">
                    <label class="text-xs font-semibold text-slate-400 uppercase">Port</label>
                    <input type="text" name="port" class="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all font-mono text-sm" placeholder="8080">
                </div>
            </div>
            <div class="space-y-1.5">
                <label class="text-xs font-semibold text-slate-400 uppercase">Assigned VPP</label>
                <select name="vpp" class="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all appearance-none">
                    <option value="">None</option>
                    <option value="State Grid VPP">State Grid VPP</option>
                    <option value="Local Energy VPP">Local Energy VPP</option>
                </select>
            </div>
        `;

        const cloudForm = `
            <div class="space-y-1.5">
                <label class="text-xs font-semibold text-slate-400 uppercase">Authorization Method</label>
                <div class="relative">
                    <select name="auth_method" class="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all appearance-none cursor-pointer">
                        <option value="direct">Batch Authorization</option>
                        <option value="oauth">Single Authorization</option>
                    </select>
                    <i data-lucide="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none"></i>
                </div>
            </div>
            <div class="space-y-1.5">
                <label class="text-xs font-semibold text-slate-400 uppercase">API Endpoint</label>
                <input type="text" name="endpoint" class="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all font-mono text-sm" placeholder="https://api.vendor.com/v1">
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1.5">
                    <label class="text-xs font-semibold text-slate-400 uppercase">Vendor</label>
                    <select name="vendor" class="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all appearance-none">
                        <option>Sungrow</option>
                        <option>Huawei</option>
                        <option>Growatt</option>
                        <option>GoodWe</option>
                    </select>
                </div>
                <div class="space-y-1.5">
                    <label class="text-xs font-semibold text-slate-400 uppercase">Region</label>
                    <select name="region" class="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all appearance-none">
                        <option>China (CN)</option>
                        <option>Europe (EU)</option>
                        <option>North America (NA)</option>
                    </select>
                </div>
            </div>
        `;

        modalContent.innerHTML = `
            <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-white">New Access</h3>
                    <button onclick="app.closeModal()" class="text-slate-400 hover:text-white transition-colors">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                </div>
                
                <div class="flex gap-4 mb-6 p-1 bg-surface-dark rounded-lg">
                    <button onclick="app.renderCreateModalContent('CLOUD')" class="flex-1 py-2 rounded-md text-sm font-medium transition-all ${!isManta ? 'bg-brand text-white shadow-sm' : 'text-slate-400 hover:text-white'}">Cloud</button>
                    <button onclick="app.renderCreateModalContent('MANTA')" class="flex-1 py-2 rounded-md text-sm font-medium transition-all ${isManta ? 'bg-brand text-white shadow-sm' : 'text-slate-400 hover:text-white'}">Manta</button>
                </div>

                <form id="create-form" onsubmit="app.handleCreateSubmit(event, '${type}')" class="space-y-4">
                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold text-slate-400 uppercase">Access Name</label>
                        <input type="text" name="name" required class="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all placeholder:text-slate-600" placeholder="e.g. Site Connection A">
                    </div>

                    ${isManta ? mantaForm : cloudForm}

                    <div class="pt-4">
                        <button type="submit" id="submit-btn" class="w-full bg-brand hover:bg-brand-light text-white font-bold py-3 rounded-xl shadow-lg shadow-brand/20 transition-all active:scale-[0.98] flex justify-center items-center gap-2">
                            <span>Confirm</span>
                        </button>
                    </div>
                </form>
            </div>
        `;
        lucide.createIcons();
    },

    openVPPDrawer(vppId = null) {
        const isEdit = !!vppId;
        const vpp = isEdit ? state.vpps.find(v => v.id === vppId) : null;
        
        const drawerContent = document.getElementById('drawer-content');
        drawerContent.innerHTML = `
            <div class="p-6 h-full flex flex-col">
                <div class="flex justify-between items-center mb-8">
                    <h3 class="text-xl font-bold text-white">${isEdit ? 'Edit VPP' : 'Create New VPP'}</h3>
                    <button onclick="app.closeDrawer()" class="text-slate-400 hover:text-white transition-colors">
                        <i data-lucide="x" class="w-6 h-6"></i>
                    </button>
                </div>

                <form onsubmit="app.handleVPPSubmit(event, ${vppId})" class="space-y-6 flex-1">
                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold text-slate-400 uppercase">VPP Name</label>
                        <input type="text" value="${isEdit ? vpp.name : ''}" required class="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all" placeholder="e.g. Virtual Power Plant X">
                    </div>

                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold text-slate-400 uppercase">Description</label>
                        <textarea rows="4" class="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all resize-none" placeholder="Enter VPP description...">${isEdit ? vpp.description : ''}</textarea>
                    </div>

                    <div class="pt-4">
                        <button type="submit" id="vpp-submit-btn" class="w-full bg-brand hover:bg-brand-light text-white font-bold py-3 rounded-xl shadow-lg shadow-brand/20 transition-all active:scale-[0.98] flex justify-center items-center gap-2">
                            <span>${isEdit ? 'Save Changes' : 'Create VPP'}</span>
                        </button>
                    </div>
                </form>
            </div>
        `;
        lucide.createIcons();
        this.toggleDrawer(true);
    },

    handleCreateSubmit(e, type) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const btn = document.getElementById('submit-btn');
        
        // Loading State
        btn.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Creating...`;
        lucide.createIcons();
        
        // Simulate API Call
        setTimeout(() => {
            // Add new node to state
            const newNode = {
                id: Date.now(),
                name: formData.get('name'),
                status: 'online',
                type: type,
                inverters: 0,
                batteries: 0
            };

            if (type === 'MANTA') {
                newNode.vpp = formData.get('vpp');
                newNode.ip = formData.get('ip');
            } else {
                newNode.vpp = 'Global Pool';
                newNode.vendor = formData.get('vendor');
                newNode.authMethod = formData.get('auth_method');
                newNode.appKey = 'manta_' + Math.random().toString(36).substr(2, 8);
                newNode.appAccess = 'sec_' + Math.random().toString(36).substr(2, 16);
            }

            state.nodes.unshift(newNode);
            
            this.showToast('Connection established successfully', 'success');
            this.toggleModal(false);
            this.renderDashboard(document.getElementById('content-area'));
            lucide.createIcons();
        }, 1500);
    },

    handleVPPSubmit(e, vppId = null) {
        e.preventDefault();
        const btn = document.getElementById('vpp-submit-btn');
        const isEdit = !!vppId;
        
        btn.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> ${isEdit ? 'Saving...' : 'Creating...'}`;
        lucide.createIcons();

        setTimeout(() => {
            const name = e.target.querySelector('input').value;
            const description = e.target.querySelector('textarea').value;
            
            if (isEdit) {
                const vpp = state.vpps.find(v => v.id === vppId);
                if (vpp) {
                    vpp.name = name;
                    vpp.description = description;
                }
            } else {
                const newVPP = {
                    id: Date.now(),
                    name: name,
                    description: description,
                    capacity: '0 kWh',
                    devices: 0
                };
                state.vpps.unshift(newVPP);
            }
            
            this.showToast(`VPP ${isEdit ? 'Updated' : 'Created'} successfully`, 'success');
            this.toggleDrawer(false);
            this.renderVPP(document.getElementById('content-area'));
            lucide.createIcons();
        }, 1000);
    },

    openAddDeviceDrawer() {
        const drawerContent = document.getElementById('drawer-content');
        
        // Get unique vendors from existing Access Points
        const uniqueVendors = [...new Set(state.nodes.map(node => 
            node.type === 'MANTA' ? 'OSW' : (node.vendor || 'Unknown')
        ))].filter(v => v !== 'Unknown');

        const vendorOptions = uniqueVendors.length > 0 
            ? uniqueVendors.map(v => `<option value="${v}">${v}</option>`).join('')
            : '<option value="" disabled selected>No active vendors found</option>';

        drawerContent.innerHTML = `
            <div class="p-6 h-full flex flex-col">
                <div class="flex justify-between items-center mb-8">
                    <h3 class="text-xl font-bold text-white">Add New Device</h3>
                    <button onclick="app.closeDrawer()" class="text-slate-400 hover:text-white transition-colors">
                        <i data-lucide="x" class="w-6 h-6"></i>
                    </button>
                </div>

                <form onsubmit="app.handleAddDeviceSubmit(event)" class="space-y-4 flex-1 overflow-y-auto pr-2">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-1.5">
                            <label class="text-xs font-semibold text-slate-400 uppercase">Device Type</label>
                            <select name="type" class="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all appearance-none cursor-pointer">
                                <option value="Inverter">Inverter</option>
                                <option value="Battery">Battery</option>
                            </select>
                        </div>
                        <div class="space-y-1.5">
                            <label class="text-xs font-semibold text-slate-400 uppercase">Vendor</label>
                            <select name="vendor" class="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all appearance-none cursor-pointer">
                                ${vendorOptions}
                            </select>
                        </div>
                    </div>

                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold text-slate-400 uppercase">Serial Number (SN)</label>
                        <input type="text" name="sn" required class="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all placeholder:text-slate-600 font-mono text-sm" placeholder="e.g. INV-2024-XXXX">
                    </div>

                    <div class="border-t border-white/10 my-4 pt-4">
                        <h4 class="text-sm font-semibold text-white mb-4">Customer Information</h4>
                        
                        <div class="space-y-4">
                            <div class="space-y-1.5">
                                <label class="text-xs font-semibold text-slate-400 uppercase">Customer Name</label>
                                <input type="text" name="userName" required class="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all placeholder:text-slate-600" placeholder="Full Name">
                            </div>

                            <div class="grid grid-cols-2 gap-4">
                                <div class="space-y-1.5">
                                    <label class="text-xs font-semibold text-slate-400 uppercase">Phone Number</label>
                                    <input type="tel" name="phone" required class="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all placeholder:text-slate-600 font-mono text-sm" placeholder="+1 555-0000">
                                </div>
                                <div class="space-y-1.5">
                                    <label class="text-xs font-semibold text-slate-400 uppercase">Email</label>
                                    <input type="email" name="email" required class="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all placeholder:text-slate-600" placeholder="email@example.com">
                                </div>
                            </div>

                            <div class="space-y-1.5">
                                <label class="text-xs font-semibold text-slate-400 uppercase">Address</label>
                                <input type="text" name="address" required class="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all placeholder:text-slate-600" placeholder="Street Address, City, Zip">
                            </div>
                        </div>
                    </div>

                    <div class="pt-4 mt-auto">
                        <button type="submit" class="w-full bg-brand hover:bg-brand-light text-white font-bold py-3 rounded-xl shadow-lg shadow-brand/20 transition-all active:scale-[0.98] flex justify-center items-center gap-2">
                            <span>Confirm</span>
                            <i data-lucide="check-circle" class="w-4 h-4"></i>
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        this.toggleDrawer(true);
        lucide.createIcons();
    },

    handleAddDeviceSubmit(e) {
        e.preventDefault();
        const btn = e.submitter;
        btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Processing Authorization...`;
        btn.disabled = true;
        lucide.createIcons();

        const formData = new FormData(e.target);
        const deviceData = {
            id: Date.now(),
            sn: formData.get('sn'),
            type: formData.get('type'),
            vendor: formData.get('vendor'),
            status: 'online', // Simulated status after auth
            capacity: formData.get('type') === 'Inverter' ? 50 : 100, // Mock capacity
            userName: formData.get('userName'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            address: formData.get('address'),
            vppId: state.selectedVppId // Auto-assign to current VPP
        };

        // Simulate API call to vendor cloud for authorization
        setTimeout(() => {
            // Add to assigned devices
            MOCK_DATA.assignedDevices.push(deviceData);
            
            // Update corresponding Access Point (node) device list/counts
            // Find corresponding node
            const targetNode = state.nodes.find(node => {
                if (deviceData.vendor === 'OSW') {
                    return node.type === 'MANTA'; // Assuming MANTA nodes are OSW
                }
                return node.vendor === deviceData.vendor;
            });

            if (targetNode) {
                // Update counts
                if (deviceData.type === 'Inverter') {
                    targetNode.inverters = (targetNode.inverters || 0) + 1;
                    if (deviceData.status === 'online') {
                        targetNode.invertersOnline = (targetNode.invertersOnline || 0) + 1;
                    } else {
                        targetNode.invertersOffline = (targetNode.invertersOffline || 0) + 1;
                    }
                } else if (deviceData.type === 'Battery') {
                    targetNode.batteries = (targetNode.batteries || 0) + 1;
                    if (deviceData.status === 'online') {
                        targetNode.batteriesOnline = (targetNode.batteriesOnline || 0) + 1;
                    } else {
                        targetNode.batteriesOffline = (targetNode.batteriesOffline || 0) + 1;
                    }
                }
                // NOTE: The Details view currently uses mock data generation based on these counts.
                // By updating the counts, the Details view will show more devices, though they will be randomly generated.
                // To show the specific added device, renderDetails needs refactoring to read from assignedDevices.
            }

            this.showToast(`Device ${deviceData.sn} authorized and added successfully`, 'success');
            this.toggleDrawer(false);
            this.renderVPP(document.getElementById('content-area'));
            lucide.createIcons();
        }, 2000);
    },

    openBatchAddModal() {
        this.updateModalWidth('max-w-2xl');
        const content = document.getElementById('modal-content');
        content.innerHTML = `
            <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-white">Batch Add Devices</h3>
                    <button onclick="app.toggleModal(false)" class="text-slate-400 hover:text-white transition-colors">
                        <i data-lucide="x" class="w-6 h-6"></i>
                    </button>
                </div>

                <div class="space-y-6">
                    <!-- Step 1: Download Template -->
                    <div class="bg-surface-dark/50 border border-white/5 rounded-xl p-4">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="text-white font-medium flex items-center gap-2">
                                <span class="flex items-center justify-center w-6 h-6 rounded-full bg-brand/20 text-brand text-xs font-bold border border-brand/20">1</span>
                                Download Template
                            </h4>
                        </div>
                        <p class="text-slate-400 text-sm mb-4 ml-8">Download the Excel template to fill in device information.</p>
                        <div class="ml-8">
                            <button onclick="app.downloadBatchTemplate()" class="flex items-center gap-2 px-4 py-2 bg-surface-dark border border-white/10 hover:border-brand/50 text-slate-300 hover:text-white rounded-lg text-sm transition-all group">
                                <i data-lucide="file-spreadsheet" class="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform"></i>
                                <span>Download .xlsx Template</span>
                            </button>
                        </div>
                    </div>

                    <!-- Step 2: Upload -->
                    <div class="bg-surface-dark/50 border border-white/5 rounded-xl p-4">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="text-white font-medium flex items-center gap-2">
                                <span class="flex items-center justify-center w-6 h-6 rounded-full bg-brand/20 text-brand text-xs font-bold border border-brand/20">2</span>
                                Upload File
                            </h4>
                        </div>
                        <p class="text-slate-400 text-sm mb-4 ml-8">Upload your filled Excel file here.</p>
                        <div class="ml-8">
                            <div id="drop-zone" class="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-brand/50 hover:bg-white/5 transition-all cursor-pointer relative">
                                <input type="file" id="batch-file-input" accept=".xlsx,.xls,.csv" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onchange="app.handleBatchFileSelect(event)">
                                <div id="upload-placeholder" class="pointer-events-none">
                                    <div class="w-12 h-12 bg-surface-dark rounded-full flex items-center justify-center mx-auto mb-3 border border-white/10">
                                        <i data-lucide="upload-cloud" class="w-6 h-6 text-slate-400"></i>
                                    </div>
                                    <p class="text-slate-300 font-medium mb-1">Click or drag file to upload</p>
                                    <p class="text-slate-500 text-xs">Support .xlsx, .xls</p>
                                </div>
                                <div id="file-info" class="hidden pointer-events-none">
                                    <div class="w-12 h-12 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-3 border border-green-500/20">
                                        <i data-lucide="file-check" class="w-6 h-6"></i>
                                    </div>
                                    <p id="file-name" class="text-white font-medium mb-1 truncate px-4"></p>
                                    <p class="text-slate-400 text-xs">Ready to upload</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-end gap-3 mt-8 pt-6 border-t border-white/5">
                    <button onclick="app.toggleModal(false)" class="px-6 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-all font-medium text-sm">Cancel</button>
                    <button id="batch-submit-btn" onclick="app.handleBatchSubmit()" disabled class="px-6 py-2.5 rounded-xl bg-brand text-white hover:bg-brand-light transition-all font-bold shadow-lg shadow-brand/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                        <span>Confirm</span>
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
        `;
        
        this.toggleModal(true);
        lucide.createIcons();
    },

    downloadBatchTemplate() {
        const headers = ['Device Type', 'Vendor', 'Serial Number', 'Customer Name', 'Phone', 'Email', 'Address'];
        const rows = [
            ['Inverter', 'Sungrow', 'INV-2024-001', 'John Doe', '+1 555-0101', 'john@example.com', '123 Main St, NY'],
            ['Battery', 'Tesla', 'BAT-2024-001', 'Jane Smith', '+1 555-0102', 'jane@example.com', '456 Oak Ave, CA']
        ];
        
        const csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n" 
            + rows.map(e => e.join(",")).join("\n");
            
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "device_import_template.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    handleBatchFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            document.getElementById('upload-placeholder').classList.add('hidden');
            document.getElementById('file-info').classList.remove('hidden');
            document.getElementById('file-name').textContent = file.name;
            document.getElementById('batch-submit-btn').disabled = false;
        }
    },

    handleBatchSubmit() {
        const btn = document.getElementById('batch-submit-btn');
        
        // Step 1: Validation
        btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Validating data...`;
        btn.disabled = true;
        lucide.createIcons();

        setTimeout(() => {
            // Step 2: Authorization
            btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Processing Authorization...`;
            lucide.createIcons();

            setTimeout(() => {
                // Success: Add mock devices
                const newDevices = [
                    {
                        id: Date.now(),
                        sn: 'INV-BATCH-' + Math.floor(Math.random() * 1000),
                        type: 'Inverter',
                        vendor: 'Sungrow',
                        status: 'online',
                        capacity: 50,
                        userName: 'Batch User 1',
                        phone: '+1 555-9999',
                        email: 'batch1@example.com',
                        address: '789 Batch St',
                        vppId: state.selectedVppId
                    },
                    {
                        id: Date.now() + 1,
                        sn: 'BAT-BATCH-' + Math.floor(Math.random() * 1000),
                        type: 'Battery',
                        vendor: 'Tesla',
                        status: 'online',
                        capacity: 100,
                        userName: 'Batch User 2',
                        phone: '+1 555-8888',
                        email: 'batch2@example.com',
                        address: '101 Batch Rd',
                        vppId: state.selectedVppId
                    }
                ];

                // Update Data
                newDevices.forEach(deviceData => {
                    MOCK_DATA.assignedDevices.push(deviceData);
                    
                    // Update corresponding Access Point (node) device list/counts
                    const targetNode = state.nodes.find(node => node.vendor === deviceData.vendor);
                    if (targetNode) {
                        if (deviceData.type === 'Inverter') {
                            targetNode.inverters = (targetNode.inverters || 0) + 1;
                            targetNode.invertersOnline = (targetNode.invertersOnline || 0) + 1;
                        } else {
                            targetNode.batteries = (targetNode.batteries || 0) + 1;
                            targetNode.batteriesOnline = (targetNode.batteriesOnline || 0) + 1;
                        }
                    }
                });

                this.showToast(`${newDevices.length} devices authorized and added successfully`, 'success');
                this.toggleModal(false);
                this.renderVPP(document.getElementById('content-area'));
                lucide.createIcons();
            }, 1500);
        }, 1000);
    },

    toggleSecret(id, secret) {
        const el = document.getElementById(`secret-${id}`);
        if (el.textContent.includes('•')) {
            el.textContent = secret;
            el.classList.add('text-brand-light');
        } else {
            el.textContent = '••••••••••••••••';
            el.classList.remove('text-brand-light');
        }
    },

    initChart() {
        const chartDom = document.getElementById('chart-container');
        if (!chartDom) return;
        
        const myChart = echarts.init(chartDom);
        const option = {
            grid: { top: 10, right: 10, bottom: 20, left: 30, containLabel: true },
            tooltip: { trigger: 'axis' },
            xAxis: {
                type: 'category',
                data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
                axisLine: { lineStyle: { color: '#334155' } },
                axisLabel: { color: '#94a3b8' }
            },
            yAxis: {
                type: 'value',
                splitLine: { lineStyle: { color: '#334155', type: 'dashed' } },
                axisLabel: { color: '#94a3b8' }
            },
            series: [
                {
                    data: [120, 132, 301, 934, 1290, 1330, 1320],
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    lineStyle: { width: 3, color: '#1E40AF' },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(30, 64, 175, 0.5)' },
                            { offset: 1, color: 'rgba(30, 64, 175, 0)' }
                        ])
                    }
                }
            ]
        };
        myChart.setOption(option);
        
        window.addEventListener('resize', () => myChart.resize());
    },

    // ==========================================
    // UTILS
    // ==========================================

    updateModalWidth(widthClass) {
        const content = document.getElementById('modal-content');
        content.classList.remove('max-w-sm', 'max-w-md', 'max-w-lg', 'max-w-xl', 'max-w-2xl', 'max-w-3xl', 'max-w-4xl', 'max-w-5xl');
        content.classList.add(widthClass);
    },

    toggleModal(show) {
        const container = document.getElementById('modal-container');
        const backdrop = document.getElementById('modal-backdrop');
        const content = document.getElementById('modal-content');

        if (this.modalHideTimer) {
            clearTimeout(this.modalHideTimer);
            this.modalHideTimer = null;
        }

        if (show) {
            container.classList.remove('hidden');
            void container.offsetWidth;
            backdrop.classList.remove('opacity-0');
            content.classList.remove('opacity-0', 'scale-95');
            content.classList.add('scale-100');
        } else {
            state.modalPreventClose = false;
            backdrop.classList.add('opacity-0');
            content.classList.remove('scale-100');
            content.classList.add('opacity-0', 'scale-95');
            this.modalHideTimer = setTimeout(() => container.classList.add('hidden'), 300);
        }
    },

    toggleDrawer(show) {
        const container = document.getElementById('drawer-container');
        const backdrop = document.getElementById('drawer-backdrop');
        const content = document.getElementById('drawer-content');

        if (show) {
            container.classList.remove('hidden');
            void container.offsetWidth;
            backdrop.classList.remove('opacity-0');
            content.classList.remove('translate-x-full');
        } else {
            backdrop.classList.add('opacity-0');
            content.classList.add('translate-x-full');
            setTimeout(() => container.classList.add('hidden'), 300);
        }
    },

    closeModal() {
        this.toggleModal(false);
    },

    closeDrawer() {
        this.toggleDrawer(false);
    },

    showToast(msg, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        
        const colors = {
            success: 'border-l-success bg-surface-light text-white',
            error: 'border-l-danger bg-surface-light text-white',
            info: 'border-l-brand bg-surface-light text-white'
        };
        
        const icons = {
            success: 'check-circle',
            error: 'alert-circle',
            info: 'info'
        };

        toast.className = `flex items-center gap-3 px-4 py-3 rounded shadow-lg border-l-4 ${colors[type]} transform translate-x-full transition-transform duration-300 min-w-[300px] glass-panel`;
        toast.innerHTML = `
            <i data-lucide="${icons[type]}" class="w-5 h-5 ${type === 'success' ? 'text-success' : type === 'error' ? 'text-danger' : 'text-brand'}"></i>
            <span class="font-medium text-sm">${msg}</span>
        `;
        
        container.appendChild(toast);
        lucide.createIcons();

        // Animate in
        requestAnimationFrame(() => {
            toast.classList.remove('translate-x-full');
        });

        // Remove after delay
        setTimeout(() => {
            toast.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// Start App
document.addEventListener('DOMContentLoaded', () => app.init());
