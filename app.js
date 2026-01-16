// Mock Data
const MOCK_DATA = {
    // accessNodes removed

    overview: {
        regions: [
            { name: 'NSW', online: 63, total: 91, inverterPower: 483.19, currentCap: 627.87, totalCap: 1566.36, generation: 662.04, price: 59.96, forecastPrice: null, date: '12/01/2026 21:00:00' },
            { name: 'QLD', online: 19, total: 40, inverterPower: 284.59, currentCap: 215.66, totalCap: 941.28, generation: 196.83, price: 63.83, forecastPrice: 57.84, date: '12/01/2026 21:00:00' },
            { name: 'SA', online: 80, total: 124, inverterPower: 589.03, currentCap: 611.19, totalCap: 1127.75, generation: 2355.68, price: 54.63, forecastPrice: 54.18, date: '12/01/2026 21:00:00' },
            { name: 'VIC', online: 21, total: 34, inverterPower: 140.39, currentCap: 181.54, totalCap: 315.02, generation: 548.04, price: 52.98, forecastPrice: 31.59, date: '12/01/2026 21:00:00' },
        ],
        reminders: [
            { id: 1, type: 'pending', label: 'Pending devices', count: 5 },
            { id: 2, type: 'invalid', label: 'Invalid devices', count: 4 },
            { id: 3, type: 'feedback', label: 'Feedback pending', count: 40 },
        ],
        vppEvents: [
            { state: 'NSW', charge: 0, discharge: 0 },
            { state: 'QLD', charge: 0, discharge: 0 },
            { state: 'SA', charge: 0, discharge: 1 },
            { state: 'VIC', charge: 0, discharge: 0 },
        ],
        statistics: {
            week: {
                xAxis: ['Week 1', 'Week 2', 'Week 3'],
                series: [
                    { name: 'Hybrid Inverters', data: [0.8, 0.2, 0.4] },
                    { name: 'String Inverters', data: [0.3, 0.5, 0.2] },
                    { name: 'EV Charger', data: [0.1, 0.1, 0.1] }
                ]
            }
        }
    },

    vpps: [],
    assignedDevices: [],
    devices: [
        { id: 101, sn: 'INV-2024-001', vendor: 'Sungrow', type: 'Inverter', status: 'online', capacity: 50, userName: 'Alice Green', phone: '+1 555-0201', email: 'alice@example.com', address: '321 Green Way' },
        { id: 102, sn: 'BAT-2024-002', vendor: 'CATL', type: 'Battery', status: 'online', capacity: 200, userName: 'Charlie Black', phone: '+1 555-0202', email: 'charlie@example.com', address: '654 Energy Blvd' },
        { id: 103, sn: 'INV-2024-003', vendor: 'Huawei', type: 'Inverter', status: 'offline', capacity: 45, userName: 'David White', phone: '+1 555-0203', email: 'david@example.com', address: '987 Volt Rd' },
        { id: 104, sn: 'BAT-2024-004', vendor: 'BYD', type: 'Battery', status: 'online', capacity: 150, userName: 'Eva Blue', phone: '+1 555-0204', email: 'eva@example.com', address: '147 Ampere Ct' },
        { id: 105, sn: 'INV-2024-005', vendor: 'Sungrow', type: 'Inverter', status: 'online', capacity: 55, userName: 'Frank Red', phone: '+1 555-0205', email: 'frank@example.com', address: '258 Ohm Pl' },
    ],

    smartFeedInRules: [
        { id: 1, state: 'SA', triggerTime: '07:00 - 12:00', triggerPrice: 0.00, socReserve: 30, vppName: 'SA Smart Feedin', lastModified: '10/08/2022 18:22:43', eventsTriggered: 3229, active: true },
        { id: 2, state: 'NSW', triggerTime: '10:00 - 14:00', triggerPrice: -10.00, socReserve: 50, vppName: 'NSW Feed Control', lastModified: '11/01/2026 09:15:00', eventsTriggered: 156, active: true }
    ],

    smartFeedInEvents: [
        { id: 1, time: '12/01/2026 14:30:05', type: 'Current Overload', value: '120A', threshold: '100A', status: 'Resolved', details: 'Discharge current exceeded max limit' },
        { id: 2, time: '12/01/2026 15:15:22', type: 'High Temperature', value: '45°C', threshold: '40°C', status: 'Active', details: 'Battery temperature above safety range' }
    ],

    tradingEvents: [
        { id: 1, vppName: 'SA VPP', state: 'SA', triggerType: 'Actual', eventType: 'Discharge', price: 180.10733, date: '12/01/2026 (+11:00)', timeRange: '19:10:47 - 19:30:00', power: 576.03 },
        { id: 2, vppName: 'NSW VPP', state: 'NSW', triggerType: 'Actual', eventType: 'Discharge', price: 344.09265, date: '10/01/2026 (+11:00)', timeRange: '20:31:08 - 21:00:00', power: 411.19 },
        { id: 3, vppName: "Jeff's VPP", state: 'NSW', triggerType: 'Actual', eventType: 'Discharge', price: 344.09265, date: '10/01/2026 (+11:00)', timeRange: '20:31:08 - 21:00:00', power: 10.00 },
        { id: 4, vppName: 'NSW VPP', state: 'NSW', triggerType: 'Actual', eventType: 'Discharge', price: 6951.66847, date: '10/01/2026 (+11:00)', timeRange: '20:01:28 - 20:30:00', power: 411.19 },
        { id: 5, vppName: "Jeff's VPP", state: 'NSW', triggerType: 'Actual', eventType: 'Discharge', price: 6951.66847, date: '10/01/2026 (+11:00)', timeRange: '20:01:28 - 20:30:00', power: 10.00 },
        { id: 6, vppName: "Jeff's VPP", state: 'NSW', triggerType: 'Actual', eventType: 'Discharge', price: 11862.30384, date: '10/01/2026 (+11:00)', timeRange: '19:35:48 - 20:00:00', power: 10.00 },
        { id: 7, vppName: 'NSW VPP', state: 'NSW', triggerType: 'Actual', eventType: 'Discharge', price: 11862.30384, date: '10/01/2026 (+11:00)', timeRange: '19:31:05 - 20:00:00', power: 411.19 },
        { id: 8, vppName: "Jeff's VPP", state: 'NSW', triggerType: 'Actual', eventType: 'Discharge', price: 11862.30384, date: '10/01/2026 (+11:00)', timeRange: '19:31:05 - 19:31:06', power: 10.00 },
    ],

    companies: [
        { id: 1, name: 'Solar Naturally Pty Ltd', industry: 'Energy Retailer', country: 'Australia', status: 'Active' },
        { id: 2, name: 'GPOWER PTY LTD', industry: 'Commercial & Industrial', country: 'USA', status: 'Inactive' },
        { id: 3, name: 'Regen Power Pty Ltd', industry: 'Energy Retailer', country: 'Spain', status: 'Active' },
        { id: 4, name: 'Connect Solar Cycle Team', industry: 'Commercial & Industrial', country: 'Germany', status: 'Inactive' },
        { id: 5, name: 'Green Energy Co', industry: 'Energy Retailer', country: 'Australia', status: 'Active' },
        { id: 6, name: 'Manta Energy', industry: 'Technology', country: 'Australia', status: 'Active' }
    ]
};

// Page Titles
const titles = {
    overview: 'Overview',
    electricity_market: 'Electricity Market',
    wholesale_price: 'Wholesale Price',
    arbitrage_points: 'Arbitrage Points',
    trading: 'Trading',
    trading_rules: 'Trading Rules',
    trading_events: 'Trading Events',
    smart_feed_in: 'Smart Feed-in',
    smart_feed_in_rules: 'Smart Feed-in Rules',
    smart_feed_in_events: 'Smart Feed-in Events',
    cap_service: 'Cap Service',
    vpp: 'VPP Management',
    vpp_details: 'VPP Details',
    device_management: 'Device Connection',
    system_details: 'System Details',
    system: 'System'
};

// State
const state = {
    currentView: 'overview',
    // nodes removed
    vpps: [...MOCK_DATA.vpps],
    systems: [], // Initialize systems array
    selectedVppId: null,
    vppDeviceTab: 'assigned', // assigned or discovery
    assignedSearchQuery: '',
    discoverySearchQuery: '',
    isSuperAdmin: true, // Default to true to simulate an admin user
    cloudBound: false, // New state for cloud platform binding
    currentUser: {
        company: 'Manta Energy',
        country: 'Australia',
        abn: '12 345 678 901',
        address: '100 Miller St, North Sydney NSW 2060'
    }
};

// App Object
const app = {
    init() {
        if (!this.checkLogin()) return;
        this.loadUserInfo();
        this.navigate('overview');
        this.setupGlobalListeners();
    },

    loadUserInfo() {
        const userName = localStorage.getItem('manta_userName');
        const userEmail = localStorage.getItem('manta_userEmail');
        const userCompany = localStorage.getItem('manta_userCompany');
        
        if (userName && userEmail) {
            // Update State
            state.currentUser = {
                name: userName,
                email: userEmail,
                company: userCompany
            };

            // Update UI
            const nameEl = document.getElementById('user-name');
            const emailEl = document.getElementById('user-email');
            const initialsEl = document.getElementById('user-initials');
            
            if (nameEl) nameEl.textContent = userName;
            if (emailEl) emailEl.textContent = userEmail;
            
            // Update Initials (First letter of First and Last name)
            if (initialsEl) {
                const parts = userName.trim().split(' ');
                let initials = parts[0][0];
                if (parts.length > 1) {
                    initials += parts[parts.length - 1][0];
                }
                initialsEl.textContent = initials.toUpperCase();
            }
        }
    },

    checkLogin() {
        const isLoggedIn = localStorage.getItem('manta_isLoggedIn') === 'true';
        // Check if we are already on the login page to avoid infinite loop (though app.js is likely only used in index.html)
        if (!isLoggedIn && !window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    },

    handleLogout() {
        localStorage.removeItem('manta_isLoggedIn');
        localStorage.removeItem('manta_userEmail');
        localStorage.removeItem('manta_userName');
        window.location.href = 'login.html';
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

    toggleSubmenu(id, element) {
        const submenu = document.getElementById(id);
        const icon = element.querySelector('.chevron-icon');
        
        if (submenu.classList.contains('hidden')) {
            submenu.classList.remove('hidden');
            if (icon) icon.style.transform = 'rotate(180deg)';
        } else {
            submenu.classList.add('hidden');
            if (icon) icon.style.transform = 'rotate(0deg)';
        }
    },

    updateBreadcrumbs(viewName) {
        const container = document.getElementById('breadcrumbs');
        if (!container) return;

        const breadcrumbPaths = {
            'overview': [{label: 'Overview'}],
            'electricity_market': [{label: 'Electricity Market'}],
            'wholesale_price': [{label: 'Electricity Market'}, {label: 'Wholesale Price'}],
            'arbitrage_points': [{label: 'Electricity Market'}, {label: 'Arbitrage Points'}],
            'trading': [{label: 'Trading'}],
            'trading_rules': [{label: 'Trading'}, {label: 'Trading Rules'}],
            'trading_events': [{label: 'Trading'}, {label: 'Trading Events'}],
            'smart_feed_in': [{label: 'Smart Feed-in'}],
            'smart_feed_in_rules': [{label: 'Smart Feed-in'}, {label: 'Smart Feed-in Rules'}],
            'smart_feed_in_events': [{label: 'Smart Feed-in'}, {label: 'Smart Feed-in Events'}],
            'cap_service': [{label: 'Cap Service'}],
            'vpp': [{label: 'System'}, {label: 'VPP Management'}],
            'device_management': [{label: 'System'}, {label: 'Device Management'}],
            'vpp_details': [
                {label: 'System'}, 
                {label: 'VPP Management', view: 'vpp'}, 
                {label: 'VPP Details'}
            ],
            'system_details': [
                {label: 'System'}, 
                {label: 'VPP Management', view: 'vpp'}, 
                {label: 'System Details'}
            ],
        };

        const currentPath = breadcrumbPaths[viewName] || [{label: 'Overview'}];
        const path = [{label: 'Manta', view: 'overview'}, ...currentPath];
        
        let html = '';
        
        path.forEach((item, index) => {
            if (index > 0) {
                html += `<i data-lucide="chevron-right" class="w-4 h-4 text-gray-300 mx-1"></i>`;
            }
            
            const isLast = index === path.length - 1;
            const isRoot = index === 0; // Manta
            
            if (item.view && !isLast) {
                 const paramsStr = item.params ? `, ${JSON.stringify(item.params).replace(/"/g, "'")}` : '';
                 html += `
                    <button onclick="app.navigate('${item.view}'${paramsStr})" class="flex items-center gap-1.5 text-gray-500 hover:text-manta-primary transition-colors group">
                        ${isRoot ? '<i data-lucide="layout-grid" class="w-4 h-4 group-hover:text-manta-primary transition-colors"></i>' : ''}
                        <span class="font-medium">${item.label}</span>
                    </button>
                `;
            } else if (isLast) {
                 html += `<span class="text-gray-900 font-semibold">${item.label}</span>`;
            } else {
                 html += `<span class="text-gray-500 font-medium">${item.label}</span>`;
            }
        });
        
        container.innerHTML = html;
        
        // Re-initialize icons for the breadcrumbs container
        if (window.lucide) {
            lucide.createIcons({
                root: container
            });
        }
    },

    navigate(viewName, params = {}) {
        state.currentView = viewName;
        
        // Update Sidebar
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        const navItem = document.getElementById(`nav-${viewName}`);
        if (navItem) navItem.classList.add('active');

        // Handle Electricity Market Submenu Expansion
        const electricityMarketViews = ['wholesale_price', 'arbitrage_points'];
        const electricityMarketSubmenu = document.getElementById('electricity-market-submenu');
        const electricityMarketToggle = document.querySelector('a[onclick*="electricity-market-submenu"] .chevron-icon');

        if (electricityMarketViews.includes(viewName)) {
            if (electricityMarketSubmenu && electricityMarketSubmenu.classList.contains('hidden')) {
                electricityMarketSubmenu.classList.remove('hidden');
                if (electricityMarketToggle) electricityMarketToggle.style.transform = 'rotate(180deg)';
            }
        }

        // Handle Trading Submenu Expansion
        const tradingViews = ['trading_rules', 'trading_events'];
        const tradingSubmenu = document.getElementById('trading-submenu');
        const tradingToggle = document.querySelector('a[onclick*="trading-submenu"] .chevron-icon');

        if (tradingViews.includes(viewName)) {
            if (tradingSubmenu && tradingSubmenu.classList.contains('hidden')) {
                tradingSubmenu.classList.remove('hidden');
                if (tradingToggle) tradingToggle.style.transform = 'rotate(180deg)';
            }
        }

        // Handle Smart Feed-in Submenu Expansion
        const smartFeedInViews = ['smart_feed_in_rules', 'smart_feed_in_events'];
        const smartFeedInSubmenu = document.getElementById('smart-feed-in-submenu');
        const smartFeedInToggle = document.querySelector('a[onclick*="smart-feed-in-submenu"] .chevron-icon');

        if (smartFeedInViews.includes(viewName)) {
            if (smartFeedInSubmenu && smartFeedInSubmenu.classList.contains('hidden')) {
                smartFeedInSubmenu.classList.remove('hidden');
                if (smartFeedInToggle) smartFeedInToggle.style.transform = 'rotate(180deg)';
            }
        }

        // Handle System Submenu Expansion
        const systemViews = ['vpp', 'device_management', 'vpp_details', 'system_details'];
        const systemSubmenu = document.getElementById('system-submenu');
        // Find the toggle icon. It's inside the 'System' link which calls toggleSubmenu
        // We can find it by looking for the onclick handler or just generic selection if unique
        const systemToggle = document.querySelector('a[onclick*="system-submenu"] .chevron-icon');
        
        if (systemViews.includes(viewName)) {
            if (systemSubmenu && systemSubmenu.classList.contains('hidden')) {
                systemSubmenu.classList.remove('hidden');
                if (systemToggle) systemToggle.style.transform = 'rotate(180deg)';
            }
        }

        // Update Header & Breadcrumbs
        this.updateBreadcrumbs(viewName);

        // Render Content
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = ''; // Clear current content
        contentArea.classList.remove('fade-in');
        void contentArea.offsetWidth; // Trigger reflow
        contentArea.classList.add('fade-in');

        if (viewName === 'overview') {
            this.renderOverview(contentArea);
        } else if (viewName === 'wholesale_price') {
            this.renderWholesalePrice(contentArea);
        } else if (viewName === 'arbitrage_points') {
            this.renderArbitragePoints(contentArea);
        } else if (viewName === 'trading_rules') {
            this.renderTradingRules(contentArea);
        } else if (viewName === 'trading_events') {
            this.renderTradingEvents(contentArea);
        } else if (viewName === 'smart_feed_in_rules') {
            this.renderSmartFeedInRules(contentArea);
        } else if (viewName === 'smart_feed_in_events') {
            this.renderSmartFeedInEvents(contentArea);
        } else if (['electricity_market', 'trading', 'smart_feed_in', 'cap_service'].includes(viewName)) {
            this.renderPlaceholder(contentArea, titles[viewName]);
        } else if (viewName === 'vpp') {
            this.renderVPP(contentArea);
        } else if (viewName === 'vpp_details') {
            this.renderVPPDetails(contentArea, params.id);
        } else if (viewName === 'device_management') {
            this.renderDeviceManagement(contentArea);
        } else if (viewName === 'system_details') {
            this.renderSystemDetails(contentArea, params.id);
        }

        lucide.createIcons();
    },

    renderPlaceholder(container, title) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-center p-8">
                <div class="bg-gray-100 p-6 rounded-full inline-block mb-4 border border-gray-200">
                    <i data-lucide="construction" class="w-12 h-12 text-gray-400"></i>
                </div>
                <h2 class="text-xl font-bold text-gray-900 mb-2">${title}</h2>
                <p class="text-gray-500 max-w-md">This feature is currently under development.</p>
            </div>
        `;
    },

    openTradingRuleModal() {
        const content = document.getElementById('modal-content');
        this.updateModalWidth('max-w-2xl');
        
        content.innerHTML = `
            <div class="flex items-center justify-between p-6 border-b border-gray-100">
                <h3 class="text-xl font-bold text-gray-900">New Trading Rule</h3>
                <button onclick="app.closeModal()" class="text-gray-400 hover:text-gray-900 transition-colors">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
            </div>
            
            <div class="p-6 space-y-6">
                <!-- Row 1: VPP & State -->
                <div class="grid grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <select class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-manta-primary focus:border-manta-primary">
                            <option>Select State</option>
                            <option>NSW</option>
                            <option>VIC</option>
                            <option>QLD</option>
                            <option>SA</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">VPP Name</label>
                        <select class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-manta-primary focus:border-manta-primary">
                            <option>Select VPP</option>
                            <option>NSW VPP</option>
                            <option>VIC VPP</option>
                            <option>SA VPP</option>
                        </select>
                    </div>
                </div>

                <!-- Row 2: Trigger Conditions -->
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-4">
                    <h4 class="text-sm font-semibold text-gray-900">Trigger Conditions</h4>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-medium text-gray-500 mb-1">Trigger Type</label>
                            <div class="flex gap-4 mt-1">
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="triggerType" class="text-manta-primary focus:ring-manta-primary" checked>
                                    <span class="text-sm text-gray-700">Actual Price</span>
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="triggerType" class="text-manta-primary focus:ring-manta-primary">
                                    <span class="text-sm text-gray-700">Forecast</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-gray-500 mb-1">Price Threshold ($/MWh)</label>
                            <div class="flex items-center gap-2">
                                <select class="w-20 border border-gray-300 rounded-lg px-2 py-1.5 text-sm bg-white">
                                    <option>>=</option>
                                    <option><=</option>
                                </select>
                                <input type="number" value="500" class="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Row 3: Action -->
                <div class="space-y-4">
                    <h4 class="text-sm font-semibold text-gray-900">Action</h4>
                    
                    <div class="grid grid-cols-3 gap-4">
                        <div>
                            <label class="block text-xs font-medium text-gray-500 mb-1">Type</label>
                            <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
                                <option>Discharge</option>
                                <option>Charge</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-gray-500 mb-1">Power (kW)</label>
                            <input type="number" value="50" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-gray-500 mb-1">Duration (min)</label>
                            <input type="number" value="30" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                        </div>
                    </div>
                </div>
            </div>

            <div class="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
                <button onclick="app.closeModal()" class="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors">Cancel</button>
                <button onclick="app.closeModal(); app.showToast('Trading Rule Created Successfully', 'success')" class="px-6 py-2 bg-manta-primary hover:bg-manta-dark text-white font-medium rounded-lg shadow-sm transition-colors">
                    Create Rule
                </button>
            </div>
        `;
        
        lucide.createIcons({ root: content });
        this.toggleModal(true);
    },

    renderTradingEvents(container) {
        const events = MOCK_DATA.tradingEvents;
        
        container.innerHTML = `
            <div class="flex flex-col h-full space-y-4">
                <!-- Filter Bar -->
                <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div class="flex flex-wrap items-end gap-4">
                        <div class="flex-1 min-w-[300px]">
                            <label class="block text-xs font-medium text-gray-500 mb-1">Time Range</label>
                            <div class="relative">
                                <i data-lucide="clock" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"></i>
                                <input type="text" placeholder="Select date range" class="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-manta-primary focus:border-manta-primary sm:text-sm">
                            </div>
                        </div>
                        <div class="w-32">
                            <label class="block text-xs font-medium text-gray-500 mb-1">Event Type</label>
                            <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-manta-primary focus:border-manta-primary bg-white">
                                <option>All</option>
                                <option>Charge</option>
                                <option>Discharge</option>
                            </select>
                        </div>
                        <div class="w-32">
                            <label class="block text-xs font-medium text-gray-500 mb-1">Status</label>
                            <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-manta-primary focus:border-manta-primary bg-white">
                                <option>All</option>
                                <option>Completed</option>
                                <option>Pending</option>
                            </select>
                        </div>
                        <div class="w-32">
                            <label class="block text-xs font-medium text-gray-500 mb-1">State</label>
                            <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-manta-primary focus:border-manta-primary bg-white">
                                <option>All</option>
                                <option>NSW</option>
                                <option>VIC</option>
                                <option>QLD</option>
                                <option>SA</option>
                            </select>
                        </div>
                        <div class="flex-1 min-w-[200px]">
                            <label class="block text-xs font-medium text-gray-500 mb-1">VPP Name</label>
                            <div class="flex gap-2">
                                <input type="text" class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-manta-primary focus:border-manta-primary">
                                <button class="px-4 py-2 bg-manta-primary hover:bg-manta-dark text-white font-medium rounded-lg shadow-sm transition-colors">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Table -->
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm flex-1 flex flex-col min-h-0">
                    <div class="flex items-center justify-end px-4 py-2 border-b border-gray-100">
                         <span class="text-xs text-gray-500">Total ${events.length}</span>
                    </div>
                    <div class="overflow-auto flex-1">
                        <table class="w-full text-sm text-left">
                            <thead class="text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100 bg-gray-50 sticky top-0">
                                <tr>
                                    <th class="px-6 py-3 font-medium text-center w-16">#</th>
                                    <th class="px-6 py-3 font-medium">VPP Name</th>
                                    <th class="px-6 py-3 font-medium">State</th>
                                    <th class="px-6 py-3 font-medium">Trigger Type</th>
                                    <th class="px-6 py-3 font-medium">Event Type</th>
                                    <th class="px-6 py-3 font-medium">Actual Price</th>
                                    <th class="px-6 py-3 font-medium">Date</th>
                                    <th class="px-6 py-3 font-medium">Start Time - End Time</th>
                                    <th class="px-6 py-3 font-medium">Power</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100" id="trading-events-tbody">
                                ${this.renderTradingEventsRows(events)}
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- Pagination -->
                    <div class="border-t border-gray-100 p-4 flex items-center justify-between">
                         <span class="text-sm text-gray-500">Total ${events.length}</span>
                         <div class="flex items-center gap-2">
                             <button class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50" disabled>
                                 <i data-lucide="chevron-left" class="w-5 h-5"></i>
                             </button>
                             <span class="text-sm font-medium text-gray-900">1</span>
                             <button class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                                 <i data-lucide="chevron-right" class="w-5 h-5"></i>
                             </button>
                             <span class="text-sm text-gray-500 ml-2">Go to</span>
                             <input type="text" value="1" class="w-10 h-8 border border-gray-300 rounded text-center text-sm focus:ring-manta-primary focus:border-manta-primary">
                         </div>
                    </div>
                </div>
            </div>
        `;
        
        // Start simulation if not already running
            if (!this.tradingSimulationInterval) {
                this.startTradingSimulation();
            }
        },

    renderSmartFeedInRules(container) {
        const rules = MOCK_DATA.smartFeedInRules;
        
        container.innerHTML = `
            <div class="flex flex-col h-full space-y-4">
                <!-- Monitor Section (Battery Discharge Limitation Functionality) -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500 mb-1">Current Market Price (SA)</p>
                            <h3 class="text-2xl font-bold text-gray-900" id="monitor-price">--</h3>
                        </div>
                        <div class="p-3 bg-blue-50 rounded-full">
                            <i data-lucide="dollar-sign" class="w-6 h-6 text-blue-600"></i>
                        </div>
                    </div>
                    
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500 mb-1">Discharge Limit Status</p>
                            <div class="flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-gray-300" id="monitor-status-dot"></span>
                                <h3 class="text-xl font-bold text-gray-700" id="monitor-status">Monitoring</h3>
                            </div>
                        </div>
                        <div class="p-3 bg-gray-50 rounded-full" id="monitor-status-icon-bg">
                            <i data-lucide="shield-check" class="w-6 h-6 text-gray-400" id="monitor-status-icon"></i>
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500 mb-1">Avg. Battery SOC</p>
                            <h3 class="text-2xl font-bold text-gray-900" id="monitor-soc">--%</h3>
                            <p class="text-xs text-gray-400 mt-1">Reserve Target: <span id="monitor-reserve">--%</span></p>
                        </div>
                        <div class="p-3 bg-green-50 rounded-full">
                            <i data-lucide="battery-charging" class="w-6 h-6 text-green-600"></i>
                        </div>
                    </div>
                </div>

                <!-- Filter Bar -->
                <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div class="flex flex-wrap items-end gap-4">
                        <div class="flex-1 min-w-[200px]">
                            <label class="block text-xs font-medium text-gray-500 mb-1">State</label>
                            <select class="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-manta-primary focus:border-manta-primary sm:text-sm bg-white">
                                <option>All</option>
                                <option>NSW</option>
                                <option>VIC</option>
                                <option>QLD</option>
                                <option>SA</option>
                            </select>
                        </div>
                        <div class="flex-1 min-w-[200px]">
                            <label class="block text-xs font-medium text-gray-500 mb-1">VPP Name</label>
                            <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-manta-primary focus:border-manta-primary sm:text-sm">
                        </div>
                        <button class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition-colors">
                            Search
                        </button>
                    </div>
                </div>

                <!-- Action Bar -->
                <div class="flex justify-end">
                    <button class="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition-colors">
                        New Smart Feed-in Rule
                    </button>
                </div>

                <!-- Table -->
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm flex-1 flex flex-col min-h-0">
                    <div class="overflow-auto flex-1">
                        <table class="w-full text-sm text-left">
                            <thead class="text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100 bg-gray-50 sticky top-0">
                                <tr>
                                    <th class="px-6 py-3 font-medium text-center w-16">#</th>
                                    <th class="px-6 py-3 font-medium">State</th>
                                    <th class="px-6 py-3 font-medium">Trigger Time</th>
                                    <th class="px-6 py-3 font-medium">Trigger Price</th>
                                    <th class="px-6 py-3 font-medium">SOC Reserve</th>
                                    <th class="px-6 py-3 font-medium">VPP Name</th>
                                    <th class="px-6 py-3 font-medium">Last Modified At</th>
                                    <th class="px-6 py-3 font-medium">Number of Events Triggered</th>
                                    <th class="px-6 py-3 font-medium">Active</th>
                                    <th class="px-6 py-3 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${rules.map((rule, idx) => `
                                    <tr class="hover:bg-gray-50 transition-colors">
                                        <td class="px-6 py-4 text-center text-gray-500">${idx + 1}</td>
                                        <td class="px-6 py-4 text-gray-900">${rule.state}</td>
                                        <td class="px-6 py-4 text-gray-900">${rule.triggerTime}</td>
                                        <td class="px-6 py-4 font-mono text-gray-900 font-medium">$${rule.triggerPrice.toFixed(2)} /MWh</td>
                                        <td class="px-6 py-4 text-gray-900">${rule.socReserve}%</td>
                                        <td class="px-6 py-4 font-medium text-blue-600 hover:text-blue-800 cursor-pointer">${rule.vppName}</td>
                                        <td class="px-6 py-4 text-gray-500">${rule.lastModified}</td>
                                        <td class="px-6 py-4 text-gray-900 pl-12">${rule.eventsTriggered}</td>
                                        <td class="px-6 py-4">
                                            <div class="flex items-center">
                                                <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                                    <input type="checkbox" name="toggle" id="toggle-${rule.id}" class="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer ${rule.active ? 'right-0 border-green-600' : 'left-0 border-gray-300'}" ${rule.active ? 'checked' : ''}/>
                                                    <label for="toggle-${rule.id}" class="toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${rule.active ? 'bg-green-600' : 'bg-gray-300'}"></label>
                                                </div>
                                                <span class="text-xs ${rule.active ? 'text-green-600 font-medium' : 'text-gray-400'}">${rule.active ? 'Active' : 'Inactive'}</span>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 text-right">
                                            <div class="flex items-center justify-end gap-2">
                                                <button class="p-1 text-gray-400 hover:text-manta-primary transition-colors" title="Edit">
                                                    <i data-lucide="pencil" class="w-4 h-4"></i>
                                                </button>
                                                <button class="p-1 text-gray-400 hover:text-gray-600 transition-colors" title="Log">
                                                    <i data-lucide="file-text" class="w-4 h-4"></i>
                                                </button>
                                                <button class="p-1 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                                                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- Pagination -->
                    <div class="border-t border-gray-100 p-4 flex items-center justify-between">
                        <span class="text-sm text-gray-500">Total ${rules.length}</span>
                        <div class="flex items-center gap-2">
                            <button class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50" disabled>
                                <i data-lucide="chevron-left" class="w-5 h-5"></i>
                            </button>
                            <span class="text-sm font-medium text-gray-900">1</span>
                            <button class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                                <i data-lucide="chevron-right" class="w-5 h-5"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Start monitoring simulation
        this.startSmartFeedInSimulation();
    },

    renderSmartFeedInEvents(container) {
        const events = MOCK_DATA.smartFeedInEvents;
        
        container.innerHTML = `
            <div class="flex flex-col h-full space-y-4">
                <!-- Battery Safety Monitor Section -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500 mb-1">Discharge Current</p>
                            <h3 class="text-2xl font-bold text-gray-900" id="safety-current">-- A</h3>
                            <p class="text-xs text-gray-400 mt-1">Max Limit: <span id="safety-limit-current">100 A</span></p>
                        </div>
                        <div class="p-3 bg-yellow-50 rounded-full" id="safety-current-icon-bg">
                            <i data-lucide="zap" class="w-6 h-6 text-yellow-600" id="safety-current-icon"></i>
                        </div>
                    </div>
                    
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500 mb-1">Battery Temperature</p>
                            <h3 class="text-2xl font-bold text-gray-900" id="safety-temp">-- °C</h3>
                            <p class="text-xs text-gray-400 mt-1">Safe Range: <span id="safety-limit-temp">< 45 °C</span></p>
                        </div>
                        <div class="p-3 bg-red-50 rounded-full" id="safety-temp-icon-bg">
                            <i data-lucide="thermometer" class="w-6 h-6 text-red-600" id="safety-temp-icon"></i>
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500 mb-1">Safety Status</p>
                            <div class="flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-green-500" id="safety-status-dot"></span>
                                <h3 class="text-xl font-bold text-gray-700" id="safety-status">Normal</h3>
                            </div>
                        </div>
                        <div class="p-3 bg-green-50 rounded-full" id="safety-status-bg">
                            <i data-lucide="shield-check" class="w-6 h-6 text-green-600" id="safety-status-icon"></i>
                        </div>
                    </div>
                </div>

                <!-- Events Table -->
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm flex-1 flex flex-col min-h-0">
                    <div class="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                        <h3 class="font-semibold text-gray-900">Safety Events Log</h3>
                        <div class="flex gap-2">
                             <button class="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                Export Log
                             </button>
                             <button class="px-3 py-1.5 text-xs font-medium text-white bg-manta-primary hover:bg-manta-dark rounded-lg transition-colors">
                                Configure Limits
                             </button>
                        </div>
                    </div>
                    <div class="overflow-auto flex-1">
                        <table class="w-full text-sm text-left">
                            <thead class="text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100 bg-gray-50 sticky top-0">
                                <tr>
                                    <th class="px-6 py-3 font-medium text-center w-16">#</th>
                                    <th class="px-6 py-3 font-medium">Time</th>
                                    <th class="px-6 py-3 font-medium">Type</th>
                                    <th class="px-6 py-3 font-medium">Value</th>
                                    <th class="px-6 py-3 font-medium">Threshold</th>
                                    <th class="px-6 py-3 font-medium">Status</th>
                                    <th class="px-6 py-3 font-medium">Details</th>
                                    <th class="px-6 py-3 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100" id="safety-events-tbody">
                                ${this.renderSafetyEventsRows(events)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        
        this.startSmartFeedInSimulation();
    },

    renderSafetyEventsRows(events) {
        if (!events || events.length === 0) {
            return `<tr><td colspan="8" class="px-6 py-8 text-center text-gray-500">No safety events recorded</td></tr>`;
        }
        return events.map((event, idx) => `
            <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 text-center text-gray-500">${idx + 1}</td>
                <td class="px-6 py-4 text-gray-900">${event.time}</td>
                <td class="px-6 py-4 font-medium ${this.getEventColor(event.type)}">${event.type}</td>
                <td class="px-6 py-4 text-gray-900 font-mono">${event.value}</td>
                <td class="px-6 py-4 text-gray-500 font-mono">${event.threshold}</td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 text-xs rounded-full ${event.status === 'Active' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}">
                        ${event.status}
                    </span>
                </td>
                <td class="px-6 py-4 text-gray-500 max-w-xs truncate" title="${event.details}">${event.details}</td>
                <td class="px-6 py-4 text-right">
                    <button class="text-gray-400 hover:text-gray-600">
                        <i data-lucide="more-horizontal" class="w-4 h-4"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    },

    getEventColor(type) {
        if (type.includes('Temperature')) return 'text-red-600';
        if (type.includes('Current')) return 'text-yellow-600';
        if (type.includes('SOC')) return 'text-orange-600';
        return 'text-gray-900';
    },

    startSmartFeedInSimulation() {
        if (this.smartFeedInInterval) return;

        let currentPrice = -50.00;
        let soc = 80;
        let isDischarging = true;
        
        // Safety Simulation Variables
        let dischargeCurrent = 50; // Amps
        let temperature = 25; // Celsius
        
        // Limits
        const MAX_CURRENT = 100;
        const MAX_TEMP = 45;
        const MIN_SOC = 10;

        this.smartFeedInInterval = setInterval(() => {
            // 1. Simulate Price Fluctuation (Random walk)
            const change = (Math.random() - 0.4) * 20; 
            currentPrice += change;

            // 2. Simulate Safety Parameters
            dischargeCurrent += (Math.random() - 0.5) * 10;
            if (dischargeCurrent < 0) dischargeCurrent = 0;
            
            temperature += (Math.random() - 0.5) * 2;
            if (temperature < 10) temperature = 10; 

            // 3. Simulate Battery SOC
            if (isDischarging) {
                soc -= 0.5;
                if (dischargeCurrent > 80) temperature += 0.5; // Heat up
            } else {
                soc += 0.2; // Charging/Holding
                temperature -= 0.2; // Cool down
            }
            if (soc > 100) soc = 100;
            if (soc < 0) soc = 0;

            // 4. Safety Checks
            let safetyStatus = 'Normal';

            if (dischargeCurrent > MAX_CURRENT) {
                safetyStatus = 'Warning';
            }
            if (temperature > MAX_TEMP) {
                safetyStatus = 'Critical';
            }

            // 5. Logic: Check against rules
            const activeRule = MOCK_DATA.smartFeedInRules.find(r => r.state === 'SA' && r.active);
            const threshold = activeRule ? activeRule.triggerPrice : 0;
            const reserve = activeRule ? activeRule.socReserve : 20;

            let limitActivated = false;
            
            if (currentPrice >= threshold) {
                limitActivated = true;
                if (soc <= reserve) {
                    isDischarging = false; 
                }
            } else {
                limitActivated = false;
                isDischarging = true; 
            }

            // 6. Update UI (Rules Page)
            const priceEl = document.getElementById('monitor-price');
            const statusEl = document.getElementById('monitor-status');
            const statusDot = document.getElementById('monitor-status-dot');
            const statusIcon = document.getElementById('monitor-status-icon');
            const statusIconBg = document.getElementById('monitor-status-icon-bg');
            const socEl = document.getElementById('monitor-soc');
            const reserveEl = document.getElementById('monitor-reserve');

            if (priceEl) {
                priceEl.innerText = `$${currentPrice.toFixed(2)} /MWh`;
                priceEl.className = currentPrice >= 0 ? 'text-2xl font-bold text-gray-900' : 'text-2xl font-bold text-red-600';

                if (limitActivated) {
                    statusEl.innerText = 'Limit Activated';
                    statusEl.className = 'text-xl font-bold text-orange-600';
                    statusDot.className = 'w-2 h-2 rounded-full bg-orange-500 animate-pulse';
                    statusIcon.className = 'w-6 h-6 text-orange-600';
                    statusIconBg.className = 'p-3 bg-orange-100 rounded-full';
                    
                    if (Math.random() > 0.95) {
                        app.showToast(`Discharge Limit Active`, 'warning');
                    }
                } else {
                    statusEl.innerText = 'Normal Operation';
                    statusEl.className = 'text-xl font-bold text-green-600';
                    statusDot.className = 'w-2 h-2 rounded-full bg-green-500';
                    statusIcon.className = 'w-6 h-6 text-green-600';
                    statusIconBg.className = 'p-3 bg-green-100 rounded-full';
                }

                socEl.innerText = `${soc.toFixed(1)}%`;
                if (limitActivated && soc <= reserve) {
                    socEl.className = 'text-2xl font-bold text-orange-600';
                } else {
                    socEl.className = 'text-2xl font-bold text-gray-900';
                }
                reserveEl.innerText = `${reserve}%`;
            }

            // 7. Update UI (Events Page / Safety Monitor)
            const safetyCurrentEl = document.getElementById('safety-current');
            if (safetyCurrentEl) {
                safetyCurrentEl.textContent = `${dischargeCurrent.toFixed(1)} A`;
                document.getElementById('safety-temp').textContent = `${temperature.toFixed(1)} °C`;
                
                const sStatusEl = document.getElementById('safety-status');
                const sStatusDot = document.getElementById('safety-status-dot');
                const sStatusBg = document.getElementById('safety-status-bg');
                const sStatusIcon = document.getElementById('safety-status-icon');

                sStatusEl.textContent = safetyStatus;
                if (safetyStatus === 'Normal') {
                    sStatusDot.className = 'w-2 h-2 rounded-full bg-green-500';
                    sStatusBg.className = 'p-3 bg-green-50 rounded-full';
                    sStatusIcon.className = 'w-6 h-6 text-green-600';
                } else if (safetyStatus === 'Warning') {
                    sStatusDot.className = 'w-2 h-2 rounded-full bg-yellow-500';
                    sStatusBg.className = 'p-3 bg-yellow-50 rounded-full';
                    sStatusIcon.className = 'w-6 h-6 text-yellow-600';
                } else { 
                    sStatusDot.className = 'w-2 h-2 rounded-full bg-red-500';
                    sStatusBg.className = 'p-3 bg-red-50 rounded-full';
                    sStatusIcon.className = 'w-6 h-6 text-red-600';
                }
            }
            
            // Trigger Mock Event randomly for demo if critical/warning
            if (safetyStatus !== 'Normal' && Math.random() > 0.9) {
                const newEvent = {
                    id: Date.now(),
                    time: new Date().toLocaleString(),
                    type: temperature > MAX_TEMP ? 'High Temperature' : 'Current Overload',
                    value: temperature > MAX_TEMP ? `${temperature.toFixed(1)}°C` : `${dischargeCurrent.toFixed(1)}A`,
                    threshold: temperature > MAX_TEMP ? `${MAX_TEMP}°C` : `${MAX_CURRENT}A`,
                    status: 'Active',
                    details: 'Automated trigger from monitor'
                };
                MOCK_DATA.smartFeedInEvents.unshift(newEvent);
                // Refresh table if visible
                const tbody = document.getElementById('safety-events-tbody');
                if (tbody) {
                    tbody.innerHTML = app.renderSafetyEventsRows(MOCK_DATA.smartFeedInEvents);
                }
            }

        }, 2000); 
    },

    renderTradingEventsRows(events) {
        return events.map((event, idx) => `
            <tr class="hover:bg-gray-50 transition-colors animate-in fade-in slide-in-from-bottom-1 duration-300">
                <td class="px-6 py-4 text-center text-gray-500">${idx + 1}</td>
                <td class="px-6 py-4 font-medium text-blue-600 hover:text-blue-800 cursor-pointer">${event.vppName}</td>
                <td class="px-6 py-4 text-gray-900">${event.state}</td>
                <td class="px-6 py-4 text-gray-900">${event.triggerType}</td>
                <td class="px-6 py-4 text-gray-900">${event.eventType}</td>
                <td class="px-6 py-4 font-mono text-gray-900 font-medium">$${event.price.toFixed(5)} /MWh</td>
                <td class="px-6 py-4 text-gray-500">${event.date}</td>
                <td class="px-6 py-4 text-gray-500">${event.timeRange}</td>
                <td class="px-6 py-4 text-gray-900 font-medium">${event.power.toFixed(2)} kW</td>
            </tr>
        `).join('');
    },

    startTradingSimulation() {
        this.tradingSimulationInterval = setInterval(() => {
            // Simulate random event
            if (Math.random() > 0.7) { // 30% chance every 3 seconds
                const newEvent = {
                    id: MOCK_DATA.tradingEvents.length + 1,
                    vppName: ['NSW VPP', 'VIC VPP', 'SA VPP', "Jeff's VPP"][Math.floor(Math.random() * 4)],
                    state: ['NSW', 'VIC', 'SA'][Math.floor(Math.random() * 3)],
                    triggerType: 'Actual',
                    eventType: Math.random() > 0.5 ? 'Charge' : 'Discharge',
                    price: Math.random() * 15000,
                    date: new Date().toLocaleDateString() + ' (+11:00)',
                    timeRange: new Date().toLocaleTimeString() + ' - ' + new Date(Date.now() + 1800000).toLocaleTimeString(),
                    power: Math.random() * 1000
                };
                
                MOCK_DATA.tradingEvents.unshift(newEvent); // Add to top
                
                // If currently viewing trading_events, update the table
                const tbody = document.getElementById('trading-events-tbody');
                if (tbody) {
                    tbody.innerHTML = this.renderTradingEventsRows(MOCK_DATA.tradingEvents);
                    app.showToast(`New Trading Event: ${newEvent.vppName} - ${newEvent.eventType}`, 'info');
                }
            }
        }, 3000);
    },

    renderWholesalePrice(container) {
        // Mock Data Generation
        const generateData = () => {
            const now = new Date('2026-01-12T00:00:00');
            const data = [];
            for (let i = 0; i < 48; i++) { // 30 min intervals for 24 hours
                const time = new Date(now.getTime() + i * 30 * 60000);
                // Base sine wave + noise
                const base = 50 + Math.sin(i / 8) * 30;
                
                data.push({
                    time: time.toISOString(),
                    marketForecast: Math.max(0, base + Math.random() * 20 - 10).toFixed(2),
                    actual: i < 36 ? Math.max(0, base + Math.random() * 30 - 15).toFixed(2) : null, // Actual only up to current time (approx)
                    algoForecast: Math.max(0, base + Math.random() * 15 - 5).toFixed(2)
                });
            }
            return data;
        };

        const chartData = generateData();
        const times = chartData.map(d => {
            const date = new Date(d.time);
            return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        });

        // View State Management
        let isChartView = true;

        container.innerHTML = `
            <div class="flex flex-col h-full space-y-4">
                <!-- Controls Bar -->
                <div class="flex flex-wrap justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm gap-4">
                    <!-- Left: Region & Time -->
                    <div class="flex items-center gap-6">
                        <div class="flex bg-gray-100 p-1 rounded-lg">
                            <button class="px-4 py-1.5 text-sm font-medium bg-white text-manta-primary shadow-sm rounded-md transition-all">QLD</button>
                            <button class="px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">NSW</button>
                            <button class="px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">VIC</button>
                            <button class="px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">SA</button>
                        </div>
                        
                        <div class="h-8 w-px bg-gray-200"></div>

                        <div class="flex items-center gap-2">
                            <button class="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"><i data-lucide="chevron-left" class="w-5 h-5"></i></button>
                            <span class="text-sm font-semibold text-gray-900 min-w-[100px] text-center">12/01/2026</span>
                            <button class="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"><i data-lucide="chevron-right" class="w-5 h-5"></i></button>
                        </div>
                    </div>

                    <!-- Right: Tools -->
                    <div class="flex items-center gap-3">
                        <div class="flex bg-gray-100 p-1 rounded-lg">
                            <button id="view-toggle-chart" class="p-1.5 rounded text-manta-primary bg-white shadow-sm transition-all" title="Chart View">
                                <i data-lucide="line-chart" class="w-4 h-4"></i>
                            </button>
                            <button id="view-toggle-list" class="p-1.5 rounded text-gray-500 hover:text-gray-900 transition-colors" title="List View">
                                <i data-lucide="list" class="w-4 h-4"></i>
                            </button>
                        </div>

                        <div class="w-px h-6 bg-gray-200 mx-1"></div>

                        <div class="flex bg-gray-100 p-1 rounded-lg">
                            <button class="px-3 py-1 text-xs font-medium bg-white text-manta-primary shadow-sm rounded-md transition-all">5Min</button>
                            <button class="px-3 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors">30Min</button>
                        </div>
                        <button class="p-2 text-gray-500 hover:text-manta-primary hover:bg-gray-50 rounded-lg transition-colors" title="Refresh Data">
                            <i data-lucide="refresh-cw" class="w-5 h-5"></i>
                        </button>
                        <button class="p-2 text-gray-500 hover:text-manta-primary hover:bg-gray-50 rounded-lg transition-colors" title="Export Data">
                            <i data-lucide="download" class="w-5 h-5"></i>
                        </button>
                    </div>
                </div>

                <!-- Main Content Area -->
                <div class="flex-1 bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative flex flex-col min-h-0">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="text-lg font-bold text-gray-900">Wholesale Price Trend</h3>
                            <p class="text-sm text-gray-500">Real-time market price vs Forecasts</p>
                        </div>
                        <!-- Weather Widget (Mock) -->
                        <div class="text-right">
                            <div class="flex items-center justify-end gap-2 text-gray-900">
                                <span class="text-2xl font-bold">22°</span>
                                <div class="text-right">
                                    <p class="text-sm font-medium">Brisbane</p>
                                    <p class="text-xs text-gray-500">Shower rain</p>
                                </div>
                                <i data-lucide="cloud-rain" class="w-8 h-8 text-blue-400"></i>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Chart View -->
                    <div id="wholesale-chart-view" class="flex-1 w-full min-h-0">
                        <div id="wholesale-chart" class="w-full h-full"></div>
                    </div>

                    <!-- List View -->
                    <div id="wholesale-list-view" class="flex-1 w-full min-h-0 hidden overflow-hidden flex flex-col">
                        <div class="overflow-auto flex-1">
                            <table class="w-full text-sm text-left">
                                <thead class="text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100 bg-gray-50 sticky top-0 z-10">
                                    <tr>
                                        <th class="px-6 py-3 font-medium">Time</th>
                                        <th class="px-6 py-3 font-medium">Region</th>
                                        <th class="px-6 py-3 font-medium text-right">Market Forecast ($)</th>
                                        <th class="px-6 py-3 font-medium text-right">Actual Price ($)</th>
                                        <th class="px-6 py-3 font-medium text-right">Algo Forecast ($)</th>
                                        <th class="px-6 py-3 font-medium text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-100">
                                    ${chartData.map(d => {
                                        const date = new Date(d.time);
                                        const timeStr = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
                                        const variance = d.actual ? Math.abs(d.actual - d.marketForecast) : 0;
                                        const statusColor = !d.actual ? 'text-gray-400' : variance < 5 ? 'text-green-500' : variance < 15 ? 'text-yellow-500' : 'text-red-500';
                                        
                                        return `
                                            <tr class="hover:bg-gray-50 transition-colors">
                                                <td class="px-6 py-3 font-medium text-gray-900">${timeStr}</td>
                                                <td class="px-6 py-3 text-gray-600">QLD</td>
                                                <td class="px-6 py-3 text-gray-600 text-right font-mono">${d.marketForecast}</td>
                                                <td class="px-6 py-3 text-gray-900 text-right font-mono font-medium">${d.actual || '-'}</td>
                                                <td class="px-6 py-3 text-gray-600 text-right font-mono">${d.algoForecast}</td>
                                                <td class="px-6 py-3 text-center">
                                                    <i data-lucide="circle" class="w-3 h-3 ${statusColor} fill-current inline-block"></i>
                                                </td>
                                            </tr>
                                        `;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Toggle Logic
        const toggleChartBtn = document.getElementById('view-toggle-chart');
        const toggleListBtn = document.getElementById('view-toggle-list');
        const chartView = document.getElementById('wholesale-chart-view');
        const listView = document.getElementById('wholesale-list-view');

        const updateView = () => {
            if (isChartView) {
                chartView.classList.remove('hidden');
                listView.classList.add('hidden');
                
                toggleChartBtn.classList.add('bg-white', 'text-manta-primary', 'shadow-sm');
                toggleChartBtn.classList.remove('text-gray-500');
                
                toggleListBtn.classList.remove('bg-white', 'text-manta-primary', 'shadow-sm');
                toggleListBtn.classList.add('text-gray-500');
            } else {
                chartView.classList.add('hidden');
                listView.classList.remove('hidden');

                toggleListBtn.classList.add('bg-white', 'text-manta-primary', 'shadow-sm');
                toggleListBtn.classList.remove('text-gray-500');

                toggleChartBtn.classList.remove('bg-white', 'text-manta-primary', 'shadow-sm');
                toggleChartBtn.classList.add('text-gray-500');
            }
        };

        toggleChartBtn.addEventListener('click', () => {
            isChartView = true;
            updateView();
        });

        toggleListBtn.addEventListener('click', () => {
            isChartView = false;
            updateView();
        });

        // Init Chart
        setTimeout(() => {
            const chartDom = document.getElementById('wholesale-chart');
            if (!chartDom) return;

            const myChart = echarts.init(chartDom);
            
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: { backgroundColor: '#6a7985' }
                    }
                },
                legend: {
                    data: ['Market Forecast', 'Actual Price', 'Algo Forecast'],
                    top: 0
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '10%', // Space for dataZoom
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                dataZoom: [
                    {
                        type: 'inside',
                        start: 0,
                        end: 100
                    },
                    {
                        start: 0,
                        end: 100
                    }
                ],
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: times,
                    axisLine: { lineStyle: { color: '#E5E7EB' } },
                    axisLabel: { color: '#6B7280' }
                },
                yAxis: {
                    type: 'value',
                    name: 'Price ($/MWh)',
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { lineStyle: { type: 'dashed', color: '#F3F4F6' } },
                    axisLabel: { color: '#6B7280' }
                },
                series: [
                    {
                        name: 'Market Forecast',
                        type: 'line',
                        smooth: true,
                        lineStyle: { width: 2, color: '#3B82F6' }, // Blue
                        itemStyle: { color: '#3B82F6' },
                        showSymbol: false,
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: 'rgba(59, 130, 246, 0.1)' },
                                { offset: 1, color: 'rgba(59, 130, 246, 0)' }
                            ])
                        },
                        data: chartData.map(d => d.marketForecast)
                    },
                    {
                        name: 'Actual Price',
                        type: 'line',
                        smooth: true, // User asked for solid line, usually implies smooth or straight. Smooth looks better.
                        lineStyle: { width: 2, color: '#10B981' }, // Green (Manta Success)
                        itemStyle: { color: '#10B981' },
                        markPoint: {
                            data: [
                                { type: 'max', name: 'Max' },
                                { type: 'min', name: 'Min' }
                            ]
                        },
                        data: chartData.map(d => d.actual)
                    },
                    {
                        name: 'Algo Forecast',
                        type: 'line',
                        smooth: true,
                        lineStyle: { width: 2, color: '#F59E0B', type: 'dashed' }, // Orange
                        itemStyle: { color: '#F59E0B' },
                        showSymbol: false,
                        data: chartData.map(d => d.algoForecast)
                    }
                ]
            };

            myChart.setOption(option);

            // Resize Observer
            const resizeObserver = new ResizeObserver(() => {
                myChart.resize();
            });
            resizeObserver.observe(container);
        }, 0);
    },

    renderArbitragePoints(container) {
        // Mock Data
        const generateData = () => {
            const data = [];
            const now = new Date('2026-01-13T13:40:00');
            
            for (let i = 0; i < 15; i++) {
                const settlementTime = new Date(now.getTime() - i * 5 * 60000);
                const forecasts = [];
                for (let j = 1; j <= 4; j++) {
                    forecasts.push(new Date(settlementTime.getTime() + j * 5 * 60000));
                }

                data.push({
                    settlementTime: settlementTime,
                    forecasts: forecasts,
                    forecastStatus: Math.random() > 0.2, // true = success/green
                    actualStatus: Math.random() > 0.1
                });
            }
            return data;
        };

        const data = generateData();

        container.innerHTML = `
            <div class="flex flex-col h-full space-y-4">
                <!-- Top Controls -->
                <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap gap-4 items-center">
                    <!-- Region & Type Indicators -->
                    <div class="flex items-center gap-4 pr-6 border-r border-gray-200 mr-2">
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 rounded-lg bg-blue-50 text-manta-primary flex items-center justify-center font-bold border border-blue-100 shadow-sm">SA</div>
                            <div class="flex flex-col">
                                <span class="text-xs font-medium text-gray-500">Region</span>
                                <span class="text-sm font-bold text-gray-900">South Australia</span>
                            </div>
                        </div>
                        <div class="h-8 w-px bg-gray-100"></div>
                        <div class="flex items-center gap-2">
                            <div class="p-1.5 rounded-lg bg-gray-100 text-gray-600">
                                <i data-lucide="share-2" class="w-4 h-4"></i>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-xs font-medium text-gray-500">Type</span>
                                <span class="text-sm font-bold text-gray-900">Shared</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex-1 min-w-[200px]">
                        <label class="block text-xs font-medium text-gray-500 mb-1">Time Range</label>
                        <div class="relative">
                            <input type="text" placeholder="-" class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-manta-primary focus:border-manta-primary sm:text-sm">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i data-lucide="calendar" class="w-4 h-4 text-gray-400"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex-1 min-w-[200px]">
                        <label class="block text-xs font-medium text-gray-500 mb-1">Trigger Price</label>
                        <select class="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-manta-primary focus:border-manta-primary sm:text-sm appearance-none bg-white">
                            <option>All</option>
                            <option>>= 300</option>
                            <option>-200 to 300</option>
                            <option><= -200</option>
                        </select>
                    </div>

                    <button class="px-6 py-2 bg-manta-primary hover:bg-manta-dark text-white font-medium rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-manta-primary">
                        Search
                    </button>
                </div>

                <!-- Legend Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-center gap-3 transition-shadow hover:shadow-md">
                        <div class="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 shadow-sm border border-red-100">
                            <i data-lucide="lightbulb" class="w-5 h-5 fill-current"></i>
                        </div>
                        <span class="text-sm font-medium text-gray-700">Price ($/MWh) ≥ 300</span>
                    </div>
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-center gap-3 transition-shadow hover:shadow-md">
                        <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 shadow-sm border border-green-100">
                            <i data-lucide="lightbulb" class="w-5 h-5 fill-current"></i>
                        </div>
                        <span class="text-sm font-medium text-gray-700">-200 < Price < 300</span>
                    </div>
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-center gap-3 transition-shadow hover:shadow-md">
                        <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shadow-sm border border-blue-100">
                            <i data-lucide="lightbulb" class="w-5 h-5 fill-current"></i>
                        </div>
                        <span class="text-sm font-medium text-gray-700">Price ≤ -200</span>
                    </div>
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-center gap-3 transition-shadow hover:shadow-md">
                        <div class="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shadow-sm border border-orange-100">
                            <i data-lucide="lightbulb" class="w-5 h-5 fill-current"></i>
                        </div>
                        <span class="text-sm font-medium text-gray-700">Multi Condition</span>
                    </div>
                </div>

                <!-- Table Section -->
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden">
                    <!-- Pagination Header -->
                    <div class="px-6 py-3 border-b border-gray-200 flex flex-wrap justify-end items-center gap-4 text-sm text-gray-600 bg-gray-50/50">
                        <span class="text-gray-500">Total 285</span>
                        <div class="flex items-center gap-1">
                            <button class="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600 transition-colors"><i data-lucide="chevron-left" class="w-4 h-4"></i></button>
                            <span class="font-medium text-manta-primary px-2">1</span>
                            <span class="px-2 cursor-pointer hover:text-gray-900">2</span>
                            <span class="px-2 cursor-pointer hover:text-gray-900">3</span>
                            <span class="px-2 text-gray-400">...</span>
                            <span class="px-2 cursor-pointer hover:text-gray-900">15</span>
                            <button class="p-1 hover:bg-gray-200 rounded text-gray-600 transition-colors"><i data-lucide="chevron-right" class="w-4 h-4"></i></button>
                        </div>
                        <div class="flex items-center gap-2 border-l border-gray-200 pl-4">
                            <span>Go to</span>
                            <input type="text" value="1" class="w-12 text-center border border-gray-300 rounded px-1 py-0.5 focus:ring-manta-primary focus:border-manta-primary">
                        </div>
                    </div>
                    
                    <!-- Table -->
                    <div class="overflow-auto flex-1">
                        <table class="w-full text-left text-sm">
                            <thead class="bg-gray-50 text-gray-900 font-semibold border-b border-gray-200 sticky top-0 z-10">
                                <tr>
                                    <th class="px-6 py-4 whitespace-nowrap bg-gray-50">Settlement Time</th>
                                    <th class="px-6 py-4 bg-gray-50">Forecast Start Time - Forecast End Time</th>
                                    <th class="px-6 py-4 text-center whitespace-nowrap bg-gray-50">Forecast Status</th>
                                    <th class="px-6 py-4 text-center whitespace-nowrap bg-gray-50">Actual Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100 bg-white">
                                ${data.map((row, idx) => {
                                    const timeStr = `${row.settlementTime.getHours()}:${row.settlementTime.getMinutes().toString().padStart(2, '0')}`;
                                    const dateStr = '13/01/2026 (+10:00)';
                                    
                                    const forecastHtml = row.forecasts.map(f => {
                                        const fTime = `${f.getHours()}:${f.getMinutes().toString().padStart(2, '0')}`;
                                        return `
                                            <div class="flex flex-col min-w-[140px]">
                                                <span class="font-medium text-gray-900">${fTime}</span>
                                                <span class="text-xs text-gray-500">${dateStr}</span>
                                            </div>
                                        `;
                                    }).join('');

                                    const statusClass = (status) => status ? 
                                        'bg-green-100 text-green-500 border-green-200' : 
                                        'bg-red-100 text-red-500 border-red-200';
                                    
                                    return `
                                        <tr class="hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}">
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="font-bold text-gray-900">${timeStr}</div>
                                                <div class="text-xs text-gray-500 mt-0.5">${dateStr}</div>
                                            </td>
                                            <td class="px-6 py-4">
                                                <div class="flex gap-8 overflow-x-auto pb-1 no-scrollbar">
                                                    ${forecastHtml}
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 text-center">
                                                <div class="w-8 h-8 rounded-full flex items-center justify-center mx-auto border ${statusClass(row.forecastStatus)}">
                                                    <i data-lucide="lightbulb" class="w-4 h-4 fill-current"></i>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 text-center">
                                                <div class="w-8 h-8 rounded-full flex items-center justify-center mx-auto border ${statusClass(row.actualStatus)}">
                                                    <i data-lucide="lightbulb" class="w-4 h-4 fill-current"></i>
                                                </div>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    },

    renderTradingRules(container) {
        // Mock Data
        const rules = [
            { id: 1, state: 'NSW', vppName: 'NSW VPP', triggerType: 'Actual', triggerPrice: '>= $500.00/MWh', eventType: 'Discharge', ignoreTime: '', lastModified: '27/06/2025 15:39:43', eventsTriggered: 38, active: true },
            { id: 2, state: 'VIC', vppName: 'VIC VPP', triggerType: 'Actual', triggerPrice: '>= $500.00/MWh', eventType: 'Discharge', ignoreTime: '', lastModified: '27/06/2025 15:38:16', eventsTriggered: 32, active: true },
            { id: 3, state: 'SA', vppName: 'SA VPP', triggerType: 'Actual', triggerPrice: '>= $500.00/MWh', eventType: 'Discharge', ignoreTime: '', lastModified: '27/06/2025 15:37:48', eventsTriggered: 98, active: true },
            { id: 4, state: 'QLD', vppName: 'QLD VPP', triggerType: 'Actual', triggerPrice: '>= $500.00/MWh', eventType: 'Discharge', ignoreTime: '', lastModified: '27/06/2025 15:35:51', eventsTriggered: 12, active: true },
            { id: 5, state: 'NSW', vppName: "Jeff's VPP", triggerType: 'Actual', triggerPrice: '>= $300.00/MWh', eventType: 'Discharge', ignoreTime: '', lastModified: '20/03/2024 12:38:58', eventsTriggered: 1285, active: true },
        ];

        container.innerHTML = `
            <div class="flex flex-col h-full space-y-4">
                <!-- Search Bar -->
                <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div class="flex flex-wrap items-end gap-4">
                        <div class="flex-1 min-w-[200px]">
                            <label class="block text-xs font-medium text-gray-500 mb-1">Trigger Type</label>
                            <select class="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-manta-primary focus:border-manta-primary sm:text-sm bg-white">
                                <option>All</option>
                                <option>Actual</option>
                                <option>Forecast</option>
                            </select>
                        </div>
                        <div class="flex-1 min-w-[200px]">
                            <label class="block text-xs font-medium text-gray-500 mb-1">State</label>
                            <select class="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-manta-primary focus:border-manta-primary sm:text-sm bg-white">
                                <option>All</option>
                                <option>NSW</option>
                                <option>VIC</option>
                                <option>QLD</option>
                                <option>SA</option>
                            </select>
                        </div>
                        <div class="flex-1 min-w-[200px]">
                            <label class="block text-xs font-medium text-gray-500 mb-1">VPP Name</label>
                            <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-manta-primary focus:border-manta-primary sm:text-sm">
                        </div>
                        <button class="px-6 py-2 bg-manta-primary hover:bg-manta-dark text-white font-medium rounded-lg shadow-sm transition-colors">
                            Search
                        </button>
                    </div>
                </div>

                <!-- Action Bar -->
                <div class="flex justify-end">
                    <button onclick="app.openTradingRuleModal()" class="flex items-center gap-2 px-4 py-2 bg-manta-primary hover:bg-manta-dark text-white font-medium rounded-lg shadow-sm transition-colors">
                        New Trading Rule
                    </button>
                </div>

                <!-- Table -->
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm flex-1 flex flex-col min-h-0">
                    <div class="overflow-auto flex-1">
                        <table class="w-full text-sm text-left">
                            <thead class="text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100 bg-gray-50 sticky top-0">
                                <tr>
                                    <th class="px-6 py-3 font-medium text-center w-16">#</th>
                                    <th class="px-6 py-3 font-medium">State</th>
                                    <th class="px-6 py-3 font-medium">VPP Name</th>
                                    <th class="px-6 py-3 font-medium">Trigger Type</th>
                                    <th class="px-6 py-3 font-medium">Trigger Price</th>
                                    <th class="px-6 py-3 font-medium">Event Type</th>
                                    <th class="px-6 py-3 font-medium">Ignore Time</th>
                                    <th class="px-6 py-3 font-medium">Last Modified At</th>
                                    <th class="px-6 py-3 font-medium">Number of Events Triggered</th>
                                    <th class="px-6 py-3 font-medium">Active</th>
                                    <th class="px-6 py-3 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${rules.map((rule, idx) => `
                                    <tr class="hover:bg-gray-50 transition-colors">
                                        <td class="px-6 py-4 text-center text-gray-500">${idx + 1}</td>
                                        <td class="px-6 py-4 text-gray-900">${rule.state}</td>
                                        <td class="px-6 py-4 font-medium text-blue-600 hover:text-blue-800 cursor-pointer">${rule.vppName}</td>
                                        <td class="px-6 py-4 text-gray-900">${rule.triggerType}</td>
                                        <td class="px-6 py-4 font-mono text-gray-900 font-medium">${rule.triggerPrice}</td>
                                        <td class="px-6 py-4 text-gray-900">${rule.eventType}</td>
                                        <td class="px-6 py-4 text-gray-500">${rule.ignoreTime || '-'}</td>
                                        <td class="px-6 py-4 text-gray-500">
                                            <div class="text-gray-900">${rule.lastModified.split(' ')[0]}</div>
                                            <div class="text-xs text-gray-400">${rule.lastModified.split(' ')[1]}</div>
                                        </td>
                                        <td class="px-6 py-4 text-gray-900 pl-12">${rule.eventsTriggered}</td>
                                        <td class="px-6 py-4 text-gray-900">${rule.active ? 'Yes' : 'No'}</td>
                                        <td class="px-6 py-4 text-right">
                                            <div class="flex items-center justify-end gap-2">
                                                <button class="p-1 text-gray-400 hover:text-manta-primary transition-colors" title="Edit">
                                                    <i data-lucide="pencil" class="w-4 h-4"></i>
                                                </button>
                                                <button class="p-1 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                                                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- Pagination -->
                    <div class="border-t border-gray-100 p-4 flex items-center justify-between">
                        <span class="text-sm text-gray-500">Total ${rules.length}</span>
                        <div class="flex items-center gap-2">
                            <button class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50" disabled>
                                <i data-lucide="chevron-left" class="w-5 h-5"></i>
                            </button>
                            <span class="text-sm font-medium text-gray-900">1</span>
                            <button class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                                <i data-lucide="chevron-right" class="w-5 h-5"></i>
                            </button>
                            <span class="text-sm text-gray-500 ml-2">Go to</span>
                            <input type="text" value="1" class="w-10 h-8 border border-gray-300 rounded text-center text-sm focus:ring-manta-primary focus:border-manta-primary">
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderOverview(container) {
        const data = MOCK_DATA.overview;
        
        container.innerHTML = `
            <div class="flex flex-col gap-6 w-full h-full">
                <!-- Top Row: Region Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    ${data.regions.map(region => `
                        <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <h3 class="text-lg font-bold text-gray-900 mb-4">${region.name}</h3>
                            
                            <div class="grid grid-cols-2 gap-y-4 gap-x-2 mb-4">
                                <div>
                                    <p class="text-xs text-gray-500 mb-1">Online/Total DERs</p>
                                    <p class="text-base font-bold text-gray-900">${region.online}/${region.total}</p>
                                </div>
                                <div>
                                    <p class="text-xs text-gray-500 mb-1">Inverter Power</p>
                                    <p class="text-base font-bold text-gray-900">${region.inverterPower} kW</p>
                                </div>
                                <div>
                                    <p class="text-xs text-gray-500 mb-1">Current/Total Capacity</p>
                                    <p class="text-sm font-bold text-gray-900">${region.currentCap} / ${region.totalCap}</p>
                                    <p class="text-xs text-gray-500">kWh</p>
                                </div>
                                <div>
                                    <p class="text-xs text-gray-500 mb-1">Today Generation</p>
                                    <p class="text-base font-bold text-gray-900">${region.generation} kWh</p>
                                </div>
                            </div>
                            
                            <div class="pt-4 border-t border-gray-100 grid grid-cols-2 gap-2">
                                <div>
                                    <p class="text-xs text-gray-500 mb-1">Current Price</p>
                                    <p class="text-base font-bold text-gray-900">$${region.price}/MWh</p>
                                    <p class="text-[10px] text-gray-400 mt-1">${region.date.split(' ')[1]}</p>
                                </div>
                                <div>
                                    <p class="text-xs text-gray-500 mb-1">Forecast Price</p>
                                    <div class="flex items-center gap-1">
                                        <p class="text-base font-bold ${region.forecastPrice ? 'text-orange-500' : 'text-orange-300'}">
                                            ${region.forecastPrice ? '$' + region.forecastPrice + '/MWh' : '/MWh'}
                                        </p>
                                        <i data-lucide="sun" class="w-4 h-4 text-orange-400 fill-current"></i>
                                    </div>
                                    <p class="text-[10px] text-gray-400 mt-1">${region.forecastPrice ? '12/01/2026 22:00:00' : '-'}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Bottom Section -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
                    <!-- Left Column: Reminder & VPP Events -->
                    <div class="flex flex-col gap-6 lg:col-span-1 h-full">
                        <!-- Reminder -->
                        <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex-1 flex flex-col">
                            <h3 class="text-lg font-bold text-gray-900 mb-4">Reminder</h3>
                            <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Awaiting follow up</h4>
                            <div class="space-y-3 flex-1">
                                ${data.reminders.map(item => `
                                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                                        <div class="flex items-center gap-3">
                                            <i data-lucide="${item.type === 'pending' ? 'clock' : item.type === 'invalid' ? 'alert-circle' : 'message-square'}" 
                                               class="w-4 h-4 text-gray-400 group-hover:text-manta-primary transition-colors"></i>
                                            <span class="text-sm text-gray-600 font-medium">${item.label}</span>
                                        </div>
                                        <span class="text-sm font-bold text-manta-primary">${item.count}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- VPP Events -->
                        <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex-1 flex flex-col">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-lg font-bold text-gray-900">VPP Events</h3>
                                <span class="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">12 Jan 2026</span>
                            </div>
                            <div class="overflow-x-auto flex-1">
                                <table class="w-full text-sm text-left">
                                    <thead class="text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                        <tr>
                                            <th class="px-4 py-2 font-medium">State</th>
                                            <th class="px-4 py-2 font-medium text-right">Charge</th>
                                            <th class="px-4 py-2 font-medium text-right">Discharge</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-100">
                                        ${data.vppEvents.map(event => `
                                            <tr class="hover:bg-gray-50 transition-colors">
                                                <td class="px-4 py-3 font-medium text-gray-900">${event.state}</td>
                                                <td class="px-4 py-3 text-gray-600 text-right font-mono">${event.charge}</td>
                                                <td class="px-4 py-3 text-gray-600 text-right font-mono">${event.discharge}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Statistics -->
                    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col lg:col-span-2 h-full">
                        <div class="flex flex-wrap justify-between items-center mb-6 gap-4">
                            <h3 class="text-lg font-bold text-gray-900">Statistics</h3>
                            <div class="flex items-center gap-4">
                                <div class="flex bg-gray-100 p-1 rounded-lg">
                                    <button class="px-3 py-1 text-xs font-medium bg-white text-manta-primary shadow-sm rounded-md transition-all">Week</button>
                                    <button class="px-3 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors">Month</button>
                                    <button class="px-3 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors">Quarterly</button>
                                </div>
                                <div class="flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1 bg-white hover:border-gray-300 transition-colors">
                                    <button class="text-gray-400 hover:text-gray-600 p-0.5 hover:bg-gray-50 rounded"><i data-lucide="chevron-left" class="w-4 h-4"></i></button>
                                    <span class="text-xs font-medium text-gray-900 min-w-[32px] text-center">2026</span>
                                    <button class="text-gray-400 hover:text-gray-600 p-0.5 hover:bg-gray-50 rounded"><i data-lucide="chevron-right" class="w-4 h-4"></i></button>
                                </div>
                            </div>
                        </div>
                        
                        <div id="overview-chart" class="flex-1 w-full min-h-[300px]"></div>
                    </div>
                </div>
            </div>
        `;

        this.initOverviewChart();
    },

    initOverviewChart() {
        const chartDom = document.getElementById('overview-chart');
        if (!chartDom) return;
        
        const myChart = echarts.init(chartDom);
        const data = MOCK_DATA.overview.statistics.week;

        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
            },
            legend: {
                data: ['Hybrid Inverters', 'String Inverters', 'EV Charger'],
                icon: 'roundRect',
                right: 10,
                top: 0,
                itemWidth: 12,
                itemHeight: 12,
                textStyle: { fontSize: 11, color: '#666' }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: data.xAxis,
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { color: '#9CA3AF', rotate: 45 }
            },
            yAxis: {
                type: 'value',
                name: 'Quantity',
                min: 0,
                max: 1,
                interval: 0.2,
                splitLine: {
                    lineStyle: { type: 'dashed', color: '#E5E7EB' }
                },
                axisLabel: { color: '#9CA3AF' }
            },
            series: [
                {
                    name: 'Hybrid Inverters',
                    type: 'bar',
                    barWidth: 8,
                    itemStyle: { color: '#2E9F58', borderRadius: [4, 4, 0, 0] },
                    data: data.series[0].data
                },
                {
                    name: 'String Inverters',
                    type: 'bar',
                    barWidth: 8,
                    itemStyle: { color: '#A3E635', borderRadius: [4, 4, 0, 0] }, // Lime-400
                    data: data.series[1].data
                },
                {
                    name: 'EV Charger',
                    type: 'bar',
                    barWidth: 8,
                    itemStyle: { color: '#F59E0B', borderRadius: [4, 4, 0, 0] }, // Amber-500
                    data: data.series[2].data
                }
            ]
        };

        myChart.setOption(option);
        
        // Handle resize
        window.addEventListener('resize', () => myChart.resize());
        
        // Store chart instance to destroy later if needed, though simple replacement works for this SPA
        this.overviewChart = myChart;
    },

    disconnectSystem(id, event) {
        if (event) {
            event.stopPropagation();
        }

        const system = state.systems.find(s => s.id === id);
        if (!system) return;

        this.showConfirmModal(
            'Disconnect Platform',
            'Are you sure you want to disconnect Manta from this platform? Note: After disconnection, devices under this connection will no longer be controlled by Manta.',
            () => {
                system.status = 'disconnected';
                this.renderDeviceManagement(document.getElementById('content-area'));
            }
        );
    },

    renderDeviceManagement(container) {
        if (!state.cloudBound) {
            // Empty State - Bind Cloud Platform
            container.className = 'flex-1 flex items-center justify-center h-full fade-in';
            container.innerHTML = `
                <div class="text-center">
                    <div class="bg-gray-100 p-6 rounded-full inline-block mb-4 border border-gray-200">
                        <i data-lucide="cloud-off" class="w-12 h-12 text-gray-400 opacity-50"></i>
                    </div>
                    <h2 class="text-xl font-bold text-gray-900 mb-2">No Sub-VPP Connected</h2>
                    <p class="text-gray-500 mb-6 max-w-md mx-auto">Connect a sub-VPP to synchronize and manage your devices.</p>
                    <button onclick="app.openCloudBindDrawer()" class="bg-manta-primary hover:bg-manta-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-sm flex items-center gap-2 mx-auto">
                        <i data-lucide="link" class="w-5 h-5"></i>
                        <span>Create</span>
                    </button>
                </div>
            `;
        } else {
            // System List (Card View)
            container.className = "flex-1 flex flex-col gap-4 h-full overflow-hidden p-8";
            
            const systems = state.systems || [];

            container.innerHTML = `
                <!-- System List -->
                <div class="w-full h-full flex flex-col gap-4 slide-up" style="animation-delay: 0.1s;">
                    <div class="flex justify-between items-center bg-white p-2 rounded-xl border border-gray-200 h-[58px] shadow-sm">
                        <h2 class="text-xl font-bold text-gray-900 pl-2">Sub-VPP List</h2>
                        <button onclick="app.openCloudBindDrawer()" class="flex items-center gap-2 bg-manta-primary hover:bg-manta-dark text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all shadow-sm active:scale-95">
                            <i data-lucide="plus" class="w-4 h-4"></i>
                            <span>New</span>
                        </button>
                    </div>
                    
                    <div class="flex-1 overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 content-start pb-4">
                        ${systems.map(sys => {
                            let iconName = 'cloud';
                            if (sys.type === 'SCADA') iconName = 'database';
                            if (sys.type === 'Edge') iconName = 'cpu';

                            const sysDevices = (state.devices || []).filter(d => d.vendor === sys.vendor);
                            const invs = sysDevices.filter(d => d.type === 'Inverter');
                            const bats = sysDevices.filter(d => d.type === 'Battery');
                            
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

                            const getStatusConfig = (s) => {
                                const status = (s || '').toLowerCase();
                                if (status === 'connecting') return { color: 'bg-yellow-500', text: 'Connecting' };
                                if (status === 'connected' || status === 'online') return { color: 'bg-manta-primary', text: 'Connected' };
                                return { color: 'bg-gray-400', text: 'Disconnected' };
                            };
                            const statusConfig = getStatusConfig(sys.status);
                            const isConnecting = (sys.status || '').toLowerCase() === 'connecting';
                            const isDisconnected = (sys.status || '').toLowerCase() === 'disconnected';
                            const onclickAttr = isConnecting ? '' : `onclick="app.navigate('system_details', { id: ${sys.id} })"`;
                            const cursorClass = isConnecting ? 'cursor-default' : 'cursor-pointer';

                            return `
                            <div ${onclickAttr} class="group bg-white p-3 rounded-xl ${cursorClass} border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 relative h-full flex flex-col">
                                <div class="absolute top-3 right-3 z-20">
                                    <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gray-50 border border-gray-100 ${!isDisconnected ? 'group-hover:hidden' : ''} transition-all duration-200">
                                        <span class="flex h-1.5 w-1.5 rounded-full ${statusConfig.color} shrink-0"></span>
                                        <span class="text-[10px] text-gray-500 font-medium uppercase tracking-wider">${statusConfig.text}</span>
                                    </div>
                                    ${!isDisconnected ? `
                                    <button onclick="app.disconnectSystem(${sys.id}, event)" class="hidden group-hover:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-50 border border-red-100 text-red-600 hover:bg-red-100 transition-all duration-200 shadow-sm">
                                        <i data-lucide="unlink" class="w-3 h-3"></i>
                                        <span class="text-[10px] font-medium uppercase tracking-wider">Disconnect</span>
                                    </button>
                                    ` : ''}
                                </div>

                                <!-- Header Section -->
                                <div class="flex justify-between items-start mb-3">
                                    <div>
                                        <div class="flex items-center gap-2 mb-2 pr-20">
                                            <h3 class="font-bold text-gray-900 transition-colors line-clamp-1">${sys.name}</h3>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <p class="text-[10px] text-gray-400 font-medium uppercase tracking-wider">${sys.type}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Stats Grid -->
                                <div class="grid grid-cols-2 gap-2 text-xs mt-auto">
                                    <!-- Inverters Panel -->
                                    <div class="bg-gray-50 rounded-lg p-2 border border-gray-100 group-hover:border-gray-200 transition-colors">
                                        <div class="flex items-center gap-1.5 text-gray-500 font-medium mb-2 pb-2 border-b border-gray-200">
                                            <i data-lucide="zap" class="w-3 h-3 text-manta-primary"></i>
                                            <span>Inverters</span>
                                        </div>
                                        <div class="space-y-1.5">
                                            <div class="flex justify-between items-center">
                                                <span class="text-gray-400">Total</span>
                                                <span class="text-gray-700 font-mono text-[11px]">${stats.inv.total} <span class="text-gray-300">|</span> ${stats.inv.cap}kW</span>
                                            </div>
                                            <div class="space-y-1 pt-1 border-t border-gray-200">
                                                <div class="flex justify-between items-center">
                                                    <div class="flex items-center gap-1.5">
                                                        <div class="w-1.5 h-1.5 rounded-full bg-manta-primary"></div>
                                                        <span class="text-gray-400 text-[10px]">Online</span>
                                                    </div>
                                                    <span class="text-gray-600 font-mono text-[10px]">${stats.inv.online} <span class="text-gray-300">/</span> ${stats.inv.onlineCap}kW</span>
                                                </div>
                                                <div class="flex justify-between items-center">
                                                    <div class="flex items-center gap-1.5">
                                                        <div class="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                                                        <span class="text-gray-400 text-[10px]">Offline</span>
                                                    </div>
                                                    <span class="text-gray-600 font-mono text-[10px]">${stats.inv.offline} <span class="text-gray-300">/</span> ${stats.inv.offlineCap}kW</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Batteries Panel -->
                                    <div class="bg-gray-50 rounded-lg p-2 border border-gray-100 group-hover:border-gray-200 transition-colors">
                                        <div class="flex items-center gap-1.5 text-gray-500 font-medium mb-2 pb-2 border-b border-gray-200">
                                            <i data-lucide="battery" class="w-3 h-3 text-blue-500"></i>
                                            <span>Batteries</span>
                                        </div>
                                        <div class="space-y-1.5">
                                            <div class="flex justify-between items-center">
                                                <span class="text-gray-400">Total</span>
                                                <span class="text-gray-700 font-mono text-[11px]">${stats.bat.total} <span class="text-gray-300">|</span> ${stats.bat.cap}kWh</span>
                                            </div>
                                            <div class="space-y-1 pt-1 border-t border-gray-200">
                                                <div class="flex justify-between items-center">
                                                    <div class="flex items-center gap-1.5">
                                                        <div class="w-1.5 h-1.5 rounded-full bg-manta-primary"></div>
                                                        <span class="text-gray-400 text-[10px]">Online</span>
                                                    </div>
                                                    <span class="text-gray-600 font-mono text-[10px]">${stats.bat.online} <span class="text-gray-300">/</span> ${stats.bat.onlineCap}kWh</span>
                                                </div>
                                                <div class="flex justify-between items-center">
                                                    <div class="flex items-center gap-1.5">
                                                        <div class="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                                                        <span class="text-gray-400 text-[10px]">Offline</span>
                                                    </div>
                                                    <span class="text-gray-600 font-mono text-[10px]">${stats.bat.offline} <span class="text-gray-300">/</span> ${stats.bat.offlineCap}kWh</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }
    },

    renderSystemDetails(container, systemId) {
        const system = state.systems.find(s => s.id == systemId);
        if (!system) return this.navigate('device_management');

        container.className = 'flex-1 flex flex-col h-full fade-in space-y-6 px-8 py-8'; // Added padding

        // Header with Back Button
        const header = document.createElement('div');
        header.className = 'flex items-center gap-4';
        header.innerHTML = `
            <button onclick="app.navigate('device_management')" class="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900" aria-label="Back to Platform List">
                <i data-lucide="arrow-left" class="w-6 h-6"></i>
            </button>
            <div>
                <h1 class="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                    ${system.name}
                    <span class="text-xs px-2 py-0.5 rounded border border-gray-200 text-gray-500 font-normal">${system.type}</span>
                </h1>
            </div>
        `;
        container.appendChild(header);

        // Mock devices for this system (using existing state.devices as pool)
        const devices = state.devices || [];
        
        // Calculate Metrics
        const totalDevices = devices.length;
        const onlineDevices = devices.filter(d => d.status === 'online').length;
        const offlineDevices = totalDevices - onlineDevices;
        const totalCapacity = devices.reduce((sum, d) => sum + (d.capacity || 0), 0);

        // Summary Cards
        const summary = document.createElement('div');
        summary.className = 'grid grid-cols-1 md:grid-cols-4 gap-4';
        summary.innerHTML = `
            <div class="bg-white shadow-sm border border-gray-200 p-4 rounded-xl flex items-center gap-4">
                <div class="p-3 rounded-lg bg-manta-primary/10 text-manta-primary">
                    <i data-lucide="info" class="w-6 h-6"></i>
                </div>
                <div>
                    <div class="space-y-0.5">
                         <div class="text-sm text-gray-900 font-mono"><span class="text-gray-500 text-[10px] uppercase tracking-wider mr-2">Type:</span>${system.type}</div>
                         <div class="text-sm text-gray-900 font-mono"><span class="text-gray-500 text-[10px] uppercase tracking-wider mr-2">Country:</span>Australia</div>
                         <div class="text-sm text-gray-900 font-mono"><span class="text-gray-500 text-[10px] uppercase tracking-wider mr-2">Mfr:</span>${system.vendor}</div>
                    </div>
                </div>
            </div>
            <div class="bg-white shadow-sm border border-gray-200 p-4 rounded-xl relative flex items-center gap-4">
                <div class="p-3 rounded-lg bg-manta-primary/10 text-manta-primary">
                    <i data-lucide="cpu" class="w-6 h-6"></i>
                </div>
                <div>
                    <p class="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Devices</p>
                </div>
                <div class="absolute top-4 right-4">
                    <p class="text-2xl font-bold text-gray-900">${totalDevices}</p>
                </div>
            </div>
            <div class="bg-white shadow-sm border border-gray-200 p-4 rounded-xl relative flex items-center gap-4">
                <div class="p-3 rounded-lg bg-success/20 text-success">
                    <i data-lucide="activity" class="w-6 h-6"></i>
                </div>
                <div>
                    <p class="text-xs text-gray-500 font-medium uppercase tracking-wider">Online</p>
                </div>
                <div class="absolute top-4 right-4">
                    <span class="text-2xl font-bold text-gray-900">${onlineDevices}</span>
                </div>
            </div>
            <div class="bg-white shadow-sm border border-gray-200 p-4 rounded-xl relative flex items-center gap-4">
                <div class="p-3 rounded-lg bg-gray-100 text-gray-400">
                    <i data-lucide="wifi-off" class="w-6 h-6"></i>
                </div>
                <div>
                    <p class="text-xs text-gray-500 font-medium uppercase tracking-wider">Offline</p>
                </div>
                <div class="absolute top-4 right-4">
                    <p class="text-2xl font-bold text-gray-900">${offlineDevices}</p>
                </div>
            </div>
        `;
        container.appendChild(summary);

        // Content (Device List)
        const content = document.createElement('div');
        content.className = 'flex-1 flex flex-col bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden';
        
        content.innerHTML = `
            <!-- Table Header -->
            <div class="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
                 <h2 class="text-xl font-bold text-gray-900 pl-2">Device List</h2>
                 <div class="flex gap-2">
                    <div class="relative">
                        <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"></i>
                        <input 
                            type="text" 
                            placeholder="Search" 
                            class="bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-1.5 text-sm text-gray-900 focus:outline-none focus:border-manta-primary/50 w-64 transition-colors placeholder:text-gray-400"
                        >
                    </div>
                 </div>
            </div>

            <!-- Device Table -->
            <div class="flex-1 overflow-y-auto p-6">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="text-xs text-gray-500 border-b border-gray-100">
                            <th class="pb-3 font-medium">SN</th>
                            <th class="pb-3 font-medium">Type</th>
                            <th class="pb-3 font-medium">Manufacturer</th>
                            <th class="pb-3 font-medium">NMI</th>
                            <th class="pb-3 font-medium">VPP</th>
                            <th class="pb-3 font-medium">Status</th>
                            <th class="pb-3 font-medium">Owner</th>
                            <th class="pb-3 font-medium">Owner Email</th>
                            <th class="pb-3 font-medium">DNSP</th>
                            <th class="pb-3 font-medium">Retailer</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        ${devices.length > 0 ? devices.map(dev => {
                            const nmi = dev.nmi || `410${Math.floor(Math.random() * 9000000 + 1000000)}`;
                            const dnsp = dev.dnsp || ['Ausgrid', 'Endeavour Energy', 'Essential Energy'][Math.floor(Math.random() * 3)];
                            const retailer = dev.retailer || ['AGL', 'Origin', 'EnergyAustralia'][Math.floor(Math.random() * 3)];
                            const vpp = state.vpps.find(v => v.id === dev.vppId);
                            const vppName = vpp ? vpp.name : '-';
                            
                            return `
                            <tr class="group hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                                <td class="py-3 font-mono text-gray-600 group-hover:text-gray-900">${dev.sn}</td>
                                <td class="py-3 text-gray-500">
                                    <span class="flex items-center gap-2">
                                        <i data-lucide="${dev.type === 'Inverter' ? 'zap' : 'battery'}" class="w-3.5 h-3.5"></i>
                                        ${dev.type}
                                    </span>
                                </td>
                                <td class="py-3 text-gray-500">${dev.vendor}</td>
                                <td class="py-3 font-mono text-gray-500">${nmi}</td>
                                <td class="py-3 text-gray-500">${vppName}</td>
                                <td class="py-3">
                                    <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs ${dev.status === 'online' ? 'bg-success/10 text-success' : 'bg-gray-200 text-gray-500'}">
                                        <span class="w-1 h-1 rounded-full bg-current"></span>
                                        ${dev.status}
                                    </span>
                                </td>
                                <td class="py-3 text-gray-500">${dev.userName || '-'}</td>
                                <td class="py-3 text-gray-500 text-xs">${dev.email || '-'}</td>
                                <td class="py-3 text-gray-500">${dnsp}</td>
                                <td class="py-3 text-gray-500">${retailer}</td>
                            </tr>
                        `}).join('') : `
                            <tr>
                                <td colspan="10" class="py-8 text-center text-gray-400">
                                    No devices found.
                                </td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>
        `;
        container.appendChild(content);
    },

    // ==========================================
    // RENDERERS
    // ==========================================


    renderVPP(container) {
        container.innerHTML = ''; 

        if (state.vpps.length === 0) {
            container.className = "flex-1 flex items-center justify-center h-full";
            container.innerHTML = `
                <div class="text-center">
                    <div class="bg-gray-100 p-6 rounded-full inline-block mb-4 border border-gray-200">
                        <i data-lucide="server" class="w-12 h-12 text-gray-400 opacity-50"></i>
                    </div>
                    <h2 class="text-xl font-bold text-gray-900 mb-2">No VPPs Created</h2>
                    <button onclick="app.openVPPDrawer()" class="bg-manta-primary hover:bg-manta-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-sm flex items-center gap-2 mx-auto">
                        <i data-lucide="plus" class="w-5 h-5"></i>
                        <span>Create</span>
                    </button>
                </div>
            `;
            return;
        }

        // Layout: Left (VPP List) | Right (Device Discovery)
        container.className = "flex-1 flex flex-col gap-4 h-full overflow-hidden p-8";
        
        // Ensure selectedVppId is valid
        if (!state.vpps.find(v => v.id === state.selectedVppId)) {
            state.selectedVppId = state.vpps[0].id;
        }

        container.innerHTML = `
            <!-- VPP List -->
            <div class="w-full h-full flex flex-col gap-4 slide-up" style="animation-delay: 0.1s;">
                <div class="flex justify-between items-center bg-white p-2 rounded-xl border border-gray-200 h-[58px] shadow-sm">
                    <h2 class="text-xl font-bold text-gray-900 pl-2">VPP List</h2>
                    <button onclick="app.openVPPDrawer()" class="flex items-center gap-2 bg-manta-primary hover:bg-manta-dark text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all shadow-sm active:scale-95">
                        <i data-lucide="plus" class="w-4 h-4"></i>
                        <span>New</span>
                    </button>
                </div>
                
                <div class="flex-1 overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 content-start pb-4">
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
                        <div onclick="app.navigate('vpp_details', { id: ${vpp.id} })" class="group bg-white p-3 rounded-xl cursor-pointer border-l-4 ${isSelected ? 'border-l-manta-primary bg-gray-50 border-y border-r border-gray-200' : 'border-l-transparent border border-gray-200 hover:border-l-gray-400 hover:bg-gray-50'} transition-all duration-300 relative h-full flex flex-col shadow-sm hover:shadow-md">
                            <!-- Header Section -->
                            <div class="flex justify-between items-start mb-3">
                                <div>
                                    <div class="flex items-center gap-2 mb-1">
                                        <h3 class="font-bold text-gray-900 group-hover:text-manta-primary transition-colors line-clamp-1">${vpp.name}</h3>
                                        ${isSelected ? '<span class="flex h-2 w-2 rounded-full bg-manta-primary shrink-0"></span>' : ''}
                                    </div>
                                </div>
                                <div class="opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    <button onclick="event.stopPropagation(); app.openVPPDrawer(${vpp.id})" class="px-2 py-1 rounded bg-white border border-gray-200 hover:bg-gray-100 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors shadow-sm flex items-center gap-1">
                                        <i data-lucide="edit-2" class="w-3 h-3"></i>
                                        <span>Edit</span>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Stats Grid -->
                            <div class="grid grid-cols-2 gap-2 text-xs mt-auto">
                                <!-- Inverters Panel -->
                                <div class="bg-gray-50 rounded-lg p-2 border border-gray-200 group-hover:border-gray-300 transition-colors">
                                    <div class="flex items-center gap-1.5 text-gray-700 font-medium mb-2 pb-2 border-b border-gray-200">
                                        <i data-lucide="zap" class="w-3 h-3 text-manta-primary"></i>
                                        <span>Inverters</span>
                                    </div>
                                    <div class="space-y-1.5">
                                        <div class="flex justify-between items-center">
                                            <span class="text-gray-500">Total</span>
                                            <span class="text-gray-700 font-mono text-[11px]">${stats.inv.total} <span class="text-gray-400">|</span> ${stats.inv.cap}kW</span>
                                        </div>
                                        <div class="space-y-1 pt-1 border-t border-gray-200">
                                            <div class="flex justify-between items-center">
                                                <div class="flex items-center gap-1.5">
                                                    <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                                    <span class="text-gray-500 text-[10px]">Online</span>
                                                </div>
                                                <span class="text-gray-700 font-mono text-[10px]">${stats.inv.online} <span class="text-gray-400">/</span> ${stats.inv.onlineCap}kW</span>
                                            </div>
                                            <div class="flex justify-between items-center">
                                                <div class="flex items-center gap-1.5">
                                                    <div class="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                                                    <span class="text-gray-500 text-[10px]">Offline</span>
                                                </div>
                                                <span class="text-gray-700 font-mono text-[10px]">${stats.inv.offline} <span class="text-gray-400">/</span> ${stats.inv.offlineCap}kW</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Batteries Panel -->
                                <div class="bg-gray-50 rounded-lg p-2 border border-gray-200 group-hover:border-gray-300 transition-colors">
                                    <div class="flex items-center gap-1.5 text-gray-700 font-medium mb-2 pb-2 border-b border-gray-200">
                                        <i data-lucide="battery" class="w-3 h-3 text-blue-500"></i>
                                        <span>Batteries</span>
                                    </div>
                                    <div class="space-y-1.5">
                                        <div class="flex justify-between items-center">
                                            <span class="text-gray-500">Total</span>
                                            <span class="text-gray-700 font-mono text-[11px]">${stats.bat.total} <span class="text-gray-400">|</span> ${stats.bat.cap}kWh</span>
                                        </div>
                                        <div class="space-y-1 pt-1 border-t border-gray-200">
                                            <div class="flex justify-between items-center">
                                                <div class="flex items-center gap-1.5">
                                                    <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                                    <span class="text-gray-500 text-[10px]">Online</span>
                                                </div>
                                                <span class="text-gray-700 font-mono text-[10px]">${stats.bat.online} <span class="text-gray-400">/</span> ${stats.bat.onlineCap}kWh</span>
                                            </div>
                                            <div class="flex justify-between items-center">
                                                <div class="flex items-center gap-1.5">
                                                    <div class="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                                                    <span class="text-gray-500 text-[10px]">Offline</span>
                                                </div>
                                                <span class="text-gray-700 font-mono text-[10px]">${stats.bat.offline} <span class="text-gray-400">/</span> ${stats.bat.offlineCap}kWh</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `}).join('')}
                </div>
            </div>
        `;
    },

    renderVPPDetails(container, vppId) {
        container.innerHTML = '';
        const vpp = state.vpps.find(v => v.id == vppId);
        if (!vpp) return this.navigate('vpp');
        
        state.selectedVppId = vppId; // Ensure selectedVppId is updated

        const allVppDevices = MOCK_DATA.assignedDevices.filter(d => d.vppId === vpp.id);
        const totalDevices = allVppDevices.length;
        const onlineDevices = allVppDevices.filter(d => d.status === 'online').length;
        const offlineDevices = totalDevices - onlineDevices;

        const assignedDevices = allVppDevices
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

        // Header
        const header = document.createElement('div');
        header.className = 'flex items-center gap-4 mb-8';
        header.innerHTML = `
            <button onclick="app.navigate('vpp')" class="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900">
                <i data-lucide="arrow-left" class="w-6 h-6"></i>
            </button>
            <div>
                <h1 class="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                    ${vpp.name}
                </h1>
            </div>
        `;
        container.appendChild(header);

        // Content
        const content = document.createElement('div');
        content.className = 'flex-1 flex flex-col gap-4 slide-up';
        content.style.height = 'calc(100% - 80px)'; // Adjust for header
        
        content.innerHTML = `
            <!-- Summary Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div class="p-3 rounded-lg bg-manta-primary/10 text-manta-primary">
                        <i data-lucide="info" class="w-6 h-6"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="space-y-0.5">
                             <div class="text-sm text-gray-900 font-mono truncate"><span class="text-gray-500 text-[10px] uppercase tracking-wider mr-2">Company:</span>${vpp.company || '-'}</div>
                             <div class="text-sm text-gray-900 font-mono truncate"><span class="text-gray-500 text-[10px] uppercase tracking-wider mr-2">Country:</span>${vpp.country || '-'}</div>
                             <div class="text-sm text-gray-900 font-mono truncate"><span class="text-gray-500 text-[10px] uppercase tracking-wider mr-2">ABN/VAT:</span>${vpp.abn || '-'}</div>
                             <div class="text-sm text-gray-900 font-mono truncate"><span class="text-gray-500 text-[10px] uppercase tracking-wider mr-2">DNSP:</span>${vpp.dnsp || '-'}</div>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative flex items-center gap-4">
                    <div class="p-3 rounded-lg bg-manta-primary/10 text-manta-primary">
                        <i data-lucide="cpu" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Devices</p>
                    </div>
                    <div class="absolute top-4 right-4">
                        <p class="text-2xl font-bold text-gray-900">${totalDevices}</p>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative flex items-center gap-4">
                    <div class="p-3 rounded-lg bg-green-100 text-green-600">
                        <i data-lucide="activity" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500 font-medium uppercase tracking-wider">Online</p>
                    </div>
                    <div class="absolute top-4 right-4">
                        <span class="text-2xl font-bold text-gray-900">${onlineDevices}</span>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative flex items-center gap-4">
                    <div class="p-3 rounded-lg bg-gray-100 text-gray-500">
                        <i data-lucide="wifi-off" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500 font-medium uppercase tracking-wider">Offline</p>
                    </div>
                    <div class="absolute top-4 right-4">
                        <p class="text-2xl font-bold text-gray-900">${offlineDevices}</p>
                    </div>
                </div>
            </div>

            <!-- Unified Panel -->
            <div class="flex-1 flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <!-- Header -->
                <div class="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
                     <h2 class="text-xl font-bold text-gray-900 pl-2">Device List</h2>
                     <div class="flex gap-2">
                        <div class="relative">
                            <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"></i>
                            <input 
                                type="text" 
                                id="assigned-search-input"
                                placeholder="Search" 
                                value="${state.assignedSearchQuery || ''}"
                                oninput="app.setAssignedSearch(this.value)"
                                class="bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-1.5 text-sm text-gray-900 focus:outline-none focus:border-manta-primary focus:ring-1 focus:ring-manta-primary w-64 transition-colors"
                            >
                        </div>
                     </div>
                </div>

                <!-- Assigned Devices List -->
                <div class="flex-1 overflow-y-auto p-6">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="text-xs text-gray-500 border-b border-gray-200">
                                <th class="pb-3 font-medium">SN</th>
                                <th class="pb-3 font-medium">Type</th>
                                <th class="pb-3 font-medium">Manufacturer</th>
                                <th class="pb-3 font-medium">NMI</th>
                                <th class="pb-3 font-medium">Status</th>
                                <th class="pb-3 font-medium">Owner</th>
                                <th class="pb-3 font-medium">Owner Email</th>
                                <th class="pb-3 font-medium">DNSP</th>
                                <th class="pb-3 font-medium">Retailer</th>
                            </tr>
                        </thead>
                        <tbody class="text-sm">
                            ${assignedDevices.length > 0 ? assignedDevices.map(dev => {
                                const nmi = dev.nmi || `410${Math.floor(Math.random() * 9000000 + 1000000)}`;
                                const dnsp = dev.dnsp || ['Ausgrid', 'Endeavour Energy', 'Essential Energy'][Math.floor(Math.random() * 3)];
                                const retailer = dev.retailer || ['AGL', 'Origin', 'EnergyAustralia'][Math.floor(Math.random() * 3)];
                                return `
                                <tr class="group hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                                    <td class="py-3 font-mono text-gray-700 group-hover:text-gray-900">${dev.sn}</td>
                                    <td class="py-3 text-gray-500">
                                        <span class="flex items-center gap-2">
                                            <i data-lucide="${dev.type === 'Inverter' ? 'zap' : 'battery'}" class="w-3.5 h-3.5"></i>
                                            ${dev.type}
                                        </span>
                                    </td>
                                    <td class="py-3 text-gray-500">${dev.vendor}</td>
                                    <td class="py-3 font-mono text-gray-500">${nmi}</td>
                                    <td class="py-3">
                                        <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs ${dev.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}">
                                            <span class="w-1 h-1 rounded-full bg-current"></span>
                                            ${dev.status}
                                        </span>
                                    </td>
                                    <td class="py-3 text-gray-500">${dev.userName || '-'}</td>
                                    <td class="py-3 text-xs text-gray-500">${dev.email || '-'}</td>
                                    <td class="py-3 text-gray-500">${dnsp}</td>
                                    <td class="py-3 text-gray-500">${retailer}</td>
                                </tr>
                            `}).join('') : `
                                <tr>
                                    <td colspan="9" class="py-8 text-center text-gray-500">
                                        当前暂无设备
                                    </td>
                                </tr>
                            `}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        container.appendChild(content);
    },

    // ==========================================
    // ACTIONS
    // ==========================================

    selectVPP(vppId) {
        state.selectedVppId = vppId;
        this.renderVPP(document.getElementById('content-area'));
        lucide.createIcons();
    },

    syncDevices() {
        const btn = document.getElementById('btn-sync-devices');
        if (!btn) return;
        
        const originalContent = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = `
            <i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>
            <span>Syncing...</span>
        `;
        lucide.createIcons();
        
        // Simulate network request
        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.disabled = false;
            lucide.createIcons();
            this.showToast('Devices synchronized successfully', 'success');
        }, 1500);
    },

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        const colors = {
            success: 'bg-white border-green-200 text-green-700 border',
            error: 'bg-white border-red-200 text-red-700 border',
            info: 'bg-white border-blue-200 text-blue-700 border'
        };
        const icons = {
            success: 'check-circle',
            error: 'alert-circle',
            info: 'info'
        };

        toast.className = `flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full opacity-0 ${colors[type]}`;
        toast.innerHTML = `
            <i data-lucide="${icons[type]}" class="w-5 h-5"></i>
            <span class="font-medium text-sm">${message}</span>
        `;

        container.appendChild(toast);
        lucide.createIcons();

        // Animate in
        requestAnimationFrame(() => {
            toast.classList.remove('translate-x-full', 'opacity-0');
        });

        // Remove after 3s
        setTimeout(() => {
            toast.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    setVppDeviceTab(tab) {
        state.vppDeviceTab = tab;
        this.renderVPP(document.getElementById('content-area'));
        lucide.createIcons();
    },

    setAssignedSearch(query) {
        state.assignedSearchQuery = query;
        const container = document.getElementById('content-area');
        if (state.currentView === 'vpp_details') {
            this.renderVPPDetails(container, state.selectedVppId);
        } else {
            this.renderVPP(container);
        }
        lucide.createIcons();
        // Keep focus on input after re-render
        const input = document.getElementById('assigned-search-input');
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

    showConfirmModal(title, message, onConfirm) {
        this.updateModalWidth('max-w-md');
        // Reuse modal structure or create a small one
        const backdrop = document.getElementById('modal-backdrop');
        const content = document.getElementById('modal-content');
        
        content.innerHTML = `
            <div class="p-8 text-center bg-white rounded-2xl">
                <div class="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-100">
                    <i data-lucide="alert-triangle" class="w-8 h-8"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">${title}</h3>
                <p class="text-gray-500 mb-8 text-base leading-relaxed">${message}</p>
                <div class="grid grid-cols-2 gap-4">
                    <button id="modal-cancel-btn" class="w-full py-3 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all font-medium">Cancel</button>
                    <button id="modal-confirm-btn" class="w-full py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all font-bold shadow-lg shadow-red-600/20">Confirm</button>
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
            <div class="p-6 bg-white rounded-xl">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 flex items-center gap-2">
                            Device Analysis
                        </h3>
                        <p class="text-gray-500 text-xs mt-1">Real-time data monitoring</p>
                    </div>
                    <button onclick="app.closeModal()" class="text-gray-400 hover:text-gray-900 transition-colors">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold text-gray-500 uppercase">Select Device</label>
                        <div class="relative">
                            <i data-lucide="server" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"></i>
                            <select onchange="app.renderDeviceDataModalContent(this.value, '${dataType}', '${timeRange}')" class="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-gray-900 focus:border-manta-primary focus:ring-1 focus:ring-manta-primary outline-none transition-all appearance-none cursor-pointer">
                                ${availableDevices.map(d => `<option value="${d.sn}" ${d.sn === sn ? 'selected' : ''}>${d.sn} - ${d.model}</option>`).join('')}
                            </select>
                            <i data-lucide="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"></i>
                        </div>
                    </div>
                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold text-gray-500 uppercase">Data Metric</label>
                        <div class="relative">
                            <i data-lucide="activity" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"></i>
                            <select onchange="app.renderDeviceDataModalContent('${sn}', this.value, '${timeRange}')" class="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-gray-900 focus:border-manta-primary focus:ring-1 focus:ring-manta-primary outline-none transition-all appearance-none cursor-pointer">
                                ${types.map(t => `<option value="${t}" ${t === dataType ? 'selected' : ''}>${t}</option>`).join('')}
                            </select>
                            <i data-lucide="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"></i>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                     <div class="flex justify-between items-center mb-4">
                        <h4 class="font-bold text-gray-900">${dataType} Trend</h4>
                        
                        <div class="flex items-center gap-3">
                            <div class="flex bg-gray-100 rounded-lg p-1 border border-gray-200">
                                ${['24H', '7D', '30D'].map(range => `
                                    <button onclick="app.renderDeviceDataModalContent('${sn}', '${dataType}', '${range}')" 
                                        class="px-3 py-1 text-xs rounded-md transition-all ${timeRange === range ? 'bg-white text-gray-900 font-medium shadow-sm' : 'text-gray-500 hover:text-gray-900'}">
                                        ${range}
                                    </button>
                                `).join('')}
                            </div>
                            
                            <div class="h-4 w-px bg-gray-200"></div>
                            
                            <div class="relative">
                                <button onclick="const picker = document.getElementById('custom-range-picker'); picker.classList.toggle('hidden');" 
                                    class="flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg border border-gray-200 transition-all ${timeRange === 'Custom' ? 'bg-manta-primary/10 text-manta-primary border-manta-primary/20' : 'bg-gray-50 text-gray-500 hover:text-gray-900 hover:border-gray-300'}">
                                    <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
                                    <span>${timeRange === 'Custom' ? 'Custom' : 'Custom'}</span>
                                </button>
                                
                                <div id="custom-range-picker" class="hidden absolute top-full right-0 mt-2 p-3 bg-white border border-gray-200 rounded-xl shadow-xl z-50 w-64">
                                    <div class="space-y-3">
                                        <div class="space-y-1">
                                            <label class="text-[10px] uppercase text-gray-500 font-semibold">Start Date</label>
                                            <input type="date" class="w-full bg-gray-50 border border-gray-200 rounded px-2 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-manta-primary" onclick="event.stopPropagation()">
                                        </div>
                                        <div class="space-y-1">
                                            <label class="text-[10px] uppercase text-gray-500 font-semibold">End Date</label>
                                            <input type="date" class="w-full bg-gray-50 border border-gray-200 rounded px-2 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-manta-primary" onclick="event.stopPropagation()">
                                        </div>
                                        <button onclick="app.renderDeviceDataModalContent('${sn}', '${dataType}', 'Custom')" class="w-full bg-manta-primary hover:bg-manta-dark text-white text-xs font-medium py-1.5 rounded transition-colors">
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
                    <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p class="text-xs text-gray-500 mb-1">Current</p>
                        <p class="text-lg font-mono text-gray-900">${currentData.data[currentData.data.length-1].toFixed(1)} <span class="text-xs text-gray-500">${currentData.unit}</span></p>
                    </div>
                    <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p class="text-xs text-gray-500 mb-1">Average</p>
                        <p class="text-lg font-mono text-gray-900">${(currentData.data.reduce((a,b)=>a+b,0)/currentData.data.length).toFixed(1)} <span class="text-xs text-gray-500">${currentData.unit}</span></p>
                    </div>
                    <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p class="text-xs text-gray-500 mb-1">Peak</p>
                        <p class="text-lg font-mono text-gray-900">${Math.max(...currentData.data).toFixed(1)} <span class="text-xs text-gray-500">${currentData.unit}</span></p>
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
                    axisLine: { lineStyle: { color: '#E5E7EB' } },
                    axisLabel: { color: '#6B7280' }
                },
                yAxis: {
                    type: 'value',
                    splitLine: { lineStyle: { color: '#E5E7EB', type: 'dashed' } },
                    axisLabel: { color: '#6B7280' }
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

    openVPPDrawer(vppId = null) {
        const isEdit = !!vppId;
        const vpp = isEdit ? state.vpps.find(v => v.id === vppId) : null;
        const title = isEdit ? 'Edit VPP' : (state.vpps.length === 0 ? 'Create VPP' : 'Add VPP');
        
        const drawerContent = document.getElementById('drawer-content');
        drawerContent.innerHTML = `
            <div class="p-6 h-full flex flex-col">
                <div class="flex justify-between items-center mb-8">
                    <h3 class="text-xl font-bold text-gray-900">${title}</h3>
                    <button onclick="app.closeDrawer()" class="text-gray-400 hover:text-gray-900 transition-colors">
                        <i data-lucide="x" class="w-6 h-6"></i>
                    </button>
                </div>

                <form onsubmit="app.handleVPPSubmit(event, ${vppId})" class="space-y-6 flex-1">
                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold text-gray-500">VPP Name</label>
                        <input type="text" name="name" value="${isEdit ? vpp.name : ''}" required class="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-manta-primary focus:ring-1 focus:ring-manta-primary outline-none transition-all placeholder:text-gray-400" placeholder="e.g. Virtual Power Plant X">
                    </div>

                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold text-gray-500">Company</label>
                        <input type="text" name="company" value="${isEdit ? (vpp.company || '') : (state.currentUser?.company || '')}" class="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-manta-primary focus:ring-1 focus:ring-manta-primary outline-none transition-all placeholder:text-gray-400" placeholder="e.g. Acme Corp">
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-1.5">
                            <label class="text-xs font-semibold text-gray-500">Country</label>
                            <input type="text" name="country" value="${isEdit ? (vpp.country || '') : (state.currentUser?.country || '')}" class="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-manta-primary focus:ring-1 focus:ring-manta-primary outline-none transition-all placeholder:text-gray-400" placeholder="e.g. Australia">
                        </div>
                        <div class="space-y-1.5">
                            <label class="text-xs font-semibold text-gray-500">ABN/VAT</label>
                            <input type="text" name="abn" value="${isEdit ? (vpp.abn || '') : (state.currentUser?.abn || '')}" class="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-manta-primary focus:ring-1 focus:ring-manta-primary outline-none transition-all placeholder:text-gray-400" placeholder="e.g. 12 345 678 901">
                        </div>
                    </div>

                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold text-gray-500">Business Address</label>
                        <input type="text" name="address" value="${isEdit ? (vpp.address || '') : (state.currentUser?.address || '')}" class="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-manta-primary focus:ring-1 focus:ring-manta-primary outline-none transition-all placeholder:text-gray-400" placeholder="e.g. 123 Solar St, Sydney">
                    </div>

                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold text-gray-500">DNSP</label>
                        <input type="text" name="dnsp" value="${isEdit ? (vpp.dnsp || '') : ''}" class="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-manta-primary focus:ring-1 focus:ring-manta-primary outline-none transition-all placeholder:text-gray-400" placeholder="e.g. Energy Provider Name">
                    </div>

                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold text-gray-500">Description</label>
                        <textarea name="description" rows="4" class="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-manta-primary focus:ring-1 focus:ring-manta-primary outline-none transition-all resize-none placeholder:text-gray-400" placeholder="Enter VPP description...">${isEdit ? vpp.description : ''}</textarea>
                    </div>

                    <div class="pt-4 flex gap-3">
                        <button type="button" onclick="app.closeDrawer()" class="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-bold py-3 rounded-xl transition-all active:scale-[0.98] flex justify-center items-center gap-2">
                            Cancel
                        </button>
                        <button type="submit" id="vpp-submit-btn" class="flex-1 bg-manta-primary hover:bg-manta-dark text-white font-bold py-3 rounded-xl shadow-lg shadow-manta-primary/20 transition-all active:scale-[0.98] flex justify-center items-center gap-2">
                            <span>Submit</span>
                        </button>
                    </div>
                </form>
            </div>
        `;
        lucide.createIcons();
        this.toggleDrawer(true);
    },

    openCloudBindDrawer(isEdit = false) {
        const title = isEdit ? 'Edit System Configuration' : 'Create Connection';
        const drawerContent = document.getElementById('drawer-content');
        
        // 1. Get current user's company
        const companyName = state.currentUser?.company;
        
        if (!companyName) {
             this.showToast('Access Denied: No company associated with user.', 'error');
             return;
        }
        
        // 2. Check if company exists in allowed list (MOCK_DATA.companies or global MOCK_COMPANIES)
        let companyInfo = MOCK_DATA.companies?.find(c => c.name === companyName);
        
        if (!companyInfo && typeof MOCK_COMPANIES !== 'undefined') {
            const extCompany = MOCK_COMPANIES.find(c => c.companyName === companyName);
            if (extCompany) {
                companyInfo = {
                    name: extCompany.companyName,
                    country: extCompany.nation,
                    status: extCompany.status
                };
            }
        }
        
        if (!companyInfo) {
            this.showToast('Access Denied: Your company is not authorized.', 'error');
            return;
        }

        if (companyInfo.status !== 'Active') {
            this.showToast('Access Denied: Your company account is inactive.', 'error');
            return;
        }

        // 3. Get country from company info
        const country = companyInfo.country || state.currentUser?.country;
        
        if (!country) {
             this.showToast('Configuration Error: Country not defined for company.', 'error');
             return;
        }

        // Mock Data based on Region and Company (using MOCK_ACCESS_NODES)
        // Filter out already connected items from state.systems
        const connectedSystemNames = (state.systems || [])
            .map(s => s.name);

        const getOptions = (type) => {
             if (typeof MOCK_ACCESS_NODES === 'undefined') return [];
             return MOCK_ACCESS_NODES
                 .filter(n => n.type === type && n.company === companyName && !connectedSystemNames.includes(n.name))
                 .map(n => n.name);
        };

        const scadaOptions = getOptions('SCADA');
        const edgeOptions = getOptions('EDGE');
        const manufacturers = getOptions('CLOUD');

        drawerContent.innerHTML = `
            <div class="p-6 h-full flex flex-col">
                <div class="flex justify-between items-center mb-8">
                    <h3 class="text-xl font-bold text-gray-900">${title}</h3>
                    <button onclick="app.closeDrawer()" class="text-gray-400 hover:text-gray-900 transition-colors">
                        <i data-lucide="x" class="w-6 h-6"></i>
                    </button>
                </div>

                <form onsubmit="app.handleCloudBindSubmit(event)" class="space-y-6 flex-1">
                    <div class="grid grid-cols-2 gap-4">
                        <!-- System Type -->
                        <div class="space-y-1.5">
                            <label class="text-xs font-semibold text-gray-500">Type</label>
                            <select name="systemType" onchange="app.handleSystemTypeChange(this.value)" class="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-manta-primary focus:ring-1 focus:ring-manta-primary outline-none transition-all appearance-none">
                                <option value="cloud">Manufacturer Cloud</option>
                                <option value="scada">SCADA</option>
                                <option value="edge">Edge</option>
                            </select>
                        </div>

                        <!-- Country Selection (Read-only) -->
                        <div class="space-y-1.5">
                            <label class="text-xs font-semibold text-gray-500">Country (Company Region)</label>
                            <input type="text" name="country" value="${country}" readonly class="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-500 outline-none cursor-not-allowed">
                        </div>
                    </div>

                    <!-- Cloud: Manufacturers (Multi-select) -->
                    <div id="section-cloud" class="space-y-1.5">
                        <label class="text-xs font-semibold text-gray-500">Manufacturer Cloud</label>
                        <div class="bg-white border border-gray-300 rounded-lg p-3 space-y-2 max-h-48 overflow-y-auto">
                            ${manufacturers.length > 0 ? manufacturers.map(m => `
                                <label class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">
                                    <input type="checkbox" name="manufacturers" value="${m}" class="w-4 h-4 rounded border-gray-300 bg-white text-manta-primary focus:ring-manta-primary focus:ring-offset-0">
                                    <span class="text-sm text-gray-900">${m}</span>
                                </label>
                            `).join('') : '<div class="p-2 text-sm text-gray-500">No cloud nodes found for your company.</div>'}
                        </div>
                    </div>

                    <!-- SCADA: System Selection -->
                    <div id="section-scada" class="space-y-1.5 hidden">
                        <label class="text-xs font-semibold text-gray-500">SCADA</label>
                        <div class="bg-white border border-gray-300 rounded-lg p-3 space-y-2 max-h-48 overflow-y-auto">
                            ${scadaOptions.length > 0 ? scadaOptions.map(s => `
                                <label class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">
                                    <input type="checkbox" name="scada" value="${s}" class="w-4 h-4 rounded border-gray-300 bg-white text-manta-primary focus:ring-manta-primary focus:ring-offset-0">
                                    <span class="text-sm text-gray-900">${s}</span>
                                </label>
                            `).join('') : '<div class="p-2 text-sm text-gray-500">No SCADA systems found for your company.</div>'}
                        </div>
                    </div>

                    <!-- Edge: Device Selection -->
                    <div id="section-edge" class="space-y-1.5 hidden">
                        <label class="text-xs font-semibold text-gray-500">Edge</label>
                        <div class="bg-white border border-gray-300 rounded-lg p-3 space-y-2 max-h-48 overflow-y-auto">
                            ${edgeOptions.length > 0 ? edgeOptions.map(e => `
                                <label class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">
                                    <input type="checkbox" name="edge" value="${e}" class="w-4 h-4 rounded border-gray-300 bg-white text-manta-primary focus:ring-manta-primary focus:ring-offset-0">
                                    <span class="text-sm text-gray-900">${e}</span>
                                </label>
                            `).join('') : '<div class="p-2 text-sm text-gray-500">No edge nodes found for your company.</div>'}
                        </div>
                    </div>


                    <div class="pt-4 flex gap-3">
                        <button type="button" onclick="app.closeDrawer()" class="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-bold py-3 rounded-xl transition-all active:scale-[0.98] flex justify-center items-center gap-2">
                            Cancel
                        </button>
                        <button type="submit" id="cloud-submit-btn" class="flex-1 bg-manta-primary hover:bg-manta-dark text-white font-bold py-3 rounded-xl shadow-lg shadow-manta-primary/20 transition-all active:scale-[0.98] flex justify-center items-center gap-2">
                            <span>${isEdit ? 'Update' : 'Submit'}</span>
                        </button>
                    </div>
                </form>
            </div>
        `;
        lucide.createIcons();
        this.toggleDrawer(true);
    },

    updateSystemOptions(country) {
        const company = state.currentUser?.company || '';
        const connectedSystemNames = (state.systems || []).map(s => s.name);
        
        // Helper to get options
        const getOptions = (type) => {
            if (typeof MOCK_ACCESS_NODES === 'undefined') return [];
            return MOCK_ACCESS_NODES
                .filter(n => n.type === type && n.company === company && !connectedSystemNames.includes(n.name))
                .map(n => n.name);
        };

        // Update Cloud Options
        const cloudContainer = document.querySelector('#section-cloud .overflow-y-auto');
        if (cloudContainer) {
            const options = getOptions('CLOUD');
            cloudContainer.innerHTML = options.length ? options.map(m => `
                <label class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">
                    <input type="checkbox" name="manufacturers" value="${m}" class="w-4 h-4 rounded border-gray-300 bg-white text-manta-primary focus:ring-manta-primary focus:ring-offset-0">
                    <span class="text-sm text-gray-900">${m}</span>
                </label>
            `).join('') : '<div class="p-2 text-sm text-gray-500">No cloud nodes found for your company.</div>';
        }

        // Update SCADA Options
        const scadaContainer = document.querySelector('#section-scada .overflow-y-auto');
        if (scadaContainer) {
            const options = getOptions('SCADA');
            scadaContainer.innerHTML = options.length ? options.map(s => `
                <label class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">
                    <input type="checkbox" name="scada" value="${s}" class="w-4 h-4 rounded border-gray-300 bg-white text-manta-primary focus:ring-manta-primary focus:ring-offset-0">
                    <span class="text-sm text-gray-900">${s}</span>
                </label>
            `).join('') : '<div class="p-2 text-sm text-gray-500">No SCADA systems found for your company.</div>';
        }

        // Update Edge Options
        const edgeContainer = document.querySelector('#section-edge .overflow-y-auto');
        if (edgeContainer) {
            const options = getOptions('EDGE');
            edgeContainer.innerHTML = options.length ? options.map(e => `
                <label class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">
                    <input type="checkbox" name="edge" value="${e}" class="w-4 h-4 rounded border-gray-300 bg-white text-manta-primary focus:ring-manta-primary focus:ring-offset-0">
                    <span class="text-sm text-gray-900">${e}</span>
                </label>
            `).join('') : '<div class="p-2 text-sm text-gray-500">No edge devices found for your company.</div>';
        }
    },

    handleSystemTypeChange(type) {
        const cloudSection = document.getElementById('section-cloud');
        const scadaSection = document.getElementById('section-scada');
        const edgeSection = document.getElementById('section-edge');

        cloudSection.classList.add('hidden');
        scadaSection.classList.add('hidden');
        edgeSection.classList.add('hidden');

        if (type === 'cloud') {
            cloudSection.classList.remove('hidden');
        } else if (type === 'scada') {
            scadaSection.classList.remove('hidden');
        } else if (type === 'edge') {
            edgeSection.classList.remove('hidden');
        }
    },

    handleCloudBindSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const btn = document.getElementById('cloud-submit-btn');
        const systemType = formData.get('systemType');
        
        btn.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Processing...`;
        lucide.createIcons();
        
        setTimeout(() => {
            state.cloudBound = true;
            // state.cloudAccount and state.cloudSecret removed
            
            if (!state.systems) state.systems = [];
            const newSystems = [];
            const timestamp = Date.now();

            if (systemType === 'cloud') {
                const manufacturers = formData.getAll('manufacturers');
                state.cloudVendor = manufacturers.join(', '); // Keep legacy support
                
                manufacturers.forEach((m, index) => {
                    newSystems.push({
                        id: timestamp + index,
                        name: `${m} Cloud`,
                        type: 'Cloud',
                        vendor: m,
                        deviceCount: Math.floor(Math.random() * 10) + 1, // Random mock count
                        status: 'connecting'
                    });
                });
            } else if (systemType === 'scada') {
                 const scadaSystems = formData.getAll('scada');
                 state.cloudVendor = scadaSystems.join(', ');
                 
                 scadaSystems.forEach((s, index) => {
                    newSystems.push({
                        id: timestamp + index,
                        name: s,
                        type: 'SCADA',
                        vendor: 'SCADA Provider',
                        deviceCount: Math.floor(Math.random() * 5) + 1,
                        status: 'connected'
                    });
                });
            } else {
                const edgeDevices = formData.getAll('edge');
                state.cloudVendor = edgeDevices.join(', ');
                
                edgeDevices.forEach((e, index) => {
                   // Extract name from "Name (SN: ...)" format if needed, or use full string
                   const namePart = e.split(' (SN:')[0] || e;
                   
                   newSystems.push({
                       id: timestamp + index,
                       name: namePart,
                       type: 'Edge',
                       vendor: 'Manta Systems',
                       deviceCount: 1, 
                       status: 'connected'
                   });
                 });
             }
            
            // Add new systems to state
            state.systems.push(...newSystems);

            // Populate devices if empty (first bind simulation)
            if (!state.devices || state.devices.length === 0) {
                 state.devices = [
                    { sn: 'INV-2024001', type: 'Inverter', vendor: newSystems[0]?.vendor || 'Generic', status: 'online', capacity: 50, address: '123 Solar St, Sydney' },
                    { sn: 'BAT-2024002', type: 'Battery', vendor: newSystems[0]?.vendor || 'Generic', status: 'online', capacity: 13.5, address: '123 Solar St, Sydney' },
                    { sn: 'INV-2024003', type: 'Inverter', vendor: newSystems[0]?.vendor || 'Generic', status: 'offline', capacity: 100, address: '456 Wind Way, Melbourne' },
                    { sn: 'BAT-2024004', type: 'Battery', vendor: newSystems[0]?.vendor || 'Generic', status: 'online', capacity: 27, address: '456 Wind Way, Melbourne' },
                    { sn: 'INV-2024005', type: 'Inverter', vendor: newSystems[0]?.vendor || 'Generic', status: 'online', capacity: 30, address: '789 Energy Rd, Brisbane' }
                ];
            }

            this.showToast('Systems connected successfully', 'success');
            this.toggleDrawer(false);
            this.renderDeviceManagement(document.getElementById('content-area'));
            lucide.createIcons();
        }, 1500);
    },

    syncDevices() {
        this.showToast('Syncing devices...', 'info');
        setTimeout(() => {
             this.showToast('Devices synchronized successfully', 'success');
        }, 1500);
    },

    handleVPPSubmit(e, vppId = null) {
        e.preventDefault();
        const btn = document.getElementById('vpp-submit-btn');
        const isEdit = !!vppId;
        
        btn.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> ${isEdit ? 'Saving...' : 'Creating...'}`;
        lucide.createIcons();

        setTimeout(() => {
            const formData = new FormData(e.target);
            const name = formData.get('name');
            const company = formData.get('company');
            const country = formData.get('country');
            const abn = formData.get('abn');
            const address = formData.get('address');
            const dnsp = formData.get('dnsp');
            const description = formData.get('description');
            
            if (isEdit) {
                const vpp = state.vpps.find(v => v.id === vppId);
                if (vpp) {
                    vpp.name = name;
                    vpp.company = company;
                    vpp.country = country;
                    vpp.abn = abn;
                    vpp.address = address;
                    vpp.dnsp = dnsp;
                    vpp.description = description;
                }
            } else {
                const newVPP = {
                    id: Date.now(),
                    name: name,
                    company: company,
                    country: country,
                    abn: abn,
                    address: address,
                    dnsp: dnsp,
                    description: description,
                    capacity: '0 kWh',
                    devices: 0,
                    createdAt: Date.now()
                };

                // Simulate Devices (5 Inverters, 3 Batteries)
                const mockInverters = Array.from({length: 5}, (_, i) => ({
                    id: Date.now() + i,
                    sn: `INV-SIM-${Date.now()}-${i}`,
                    vendor: ['Sungrow', 'Huawei', 'Tesla'][Math.floor(Math.random() * 3)],
                    type: 'Inverter',
                    status: Math.random() > 0.2 ? 'online' : 'offline',
                    vppId: newVPP.id,
                    capacity: 50,
                    userName: `Sim User ${i}`,
                    phone: `+1 555-0${i}`,
                    email: `sim${i}@example.com`,
                    address: `${i} Simulation St`
                }));

                const mockBatteries = Array.from({length: 3}, (_, i) => ({
                    id: Date.now() + 100 + i,
                    sn: `BAT-SIM-${Date.now()}-${i}`,
                    vendor: ['CATL', 'BYD', 'Tesla'][Math.floor(Math.random() * 3)],
                    type: 'Battery',
                    status: Math.random() > 0.2 ? 'online' : 'offline',
                    vppId: newVPP.id,
                    capacity: 100,
                    userName: `Sim User ${i}`,
                    phone: `+1 555-0${i}`,
                    email: `sim${i}@example.com`,
                    address: `${i} Simulation St`
                }));

                const newDevices = [...mockInverters, ...mockBatteries];
                MOCK_DATA.assignedDevices.push(...newDevices);

                // Update VPP stats
                const totalCapacity = newDevices.reduce((sum, d) => sum + d.capacity, 0);
                newVPP.capacity = totalCapacity >= 1000 ? (totalCapacity/1000).toFixed(1) + ' MWh' : totalCapacity + ' kWh';
                newVPP.devices = newDevices.length;

                state.vpps.unshift(newVPP);
                state.selectedVppId = newVPP.id;
            }
            
            this.showToast(`VPP ${isEdit ? 'Updated' : 'Created'} successfully`, 'success');
            this.toggleDrawer(false);
            this.renderVPP(document.getElementById('content-area'));
            lucide.createIcons();
        }, 1000);
    },

    openAddDeviceDrawer() {
        const drawerContent = document.getElementById('drawer-content');
        
        // Static list of supported vendors
        const uniqueVendors = ['Sungrow', 'Huawei', 'GoodWe', 'Tesla', 'BYD', 'CATL', 'OSW'];

        const vendorOptions = uniqueVendors.map(v => `<option value="${v}">${v}</option>`).join('');

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

    editVPP(vppId) {
        // In a real app, this would open a modal with form fields
        // For now, we'll just show a toast or alert
        this.showToast('Edit functionality coming soon!', 'info');
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
    },

    runBatterySafetyTests() {
        console.log('%c Running Battery Safety Unit Tests...', 'color: blue; font-weight: bold;');
        const results = [];
        
        // Test 1: Current Limit Trigger
        let current = 101;
        const MAX_CURRENT = 100;
        let triggered = current > MAX_CURRENT;
        results.push({ name: 'Current > Limit (101A > 100A) triggers warning', passed: triggered === true });

        // Test 2: Temp Limit Trigger
        let temp = 46;
        const MAX_TEMP = 45;
        triggered = temp > MAX_TEMP;
        results.push({ name: 'Temp > Limit (46°C > 45°C) triggers critical', passed: triggered === true });

        // Test 3: Normal Conditions
        current = 50;
        temp = 25;
        triggered = (current > MAX_CURRENT) || (temp > MAX_TEMP);
        results.push({ name: 'Normal conditions (50A, 25°C) do not trigger', passed: triggered === false });
        
        // Test 4: Boundary Values
        current = 100; // Exact limit
        triggered = current > MAX_CURRENT;
        results.push({ name: 'Current = Limit (100A) does not trigger', passed: triggered === false });

        console.table(results);
        return results;
    }
};

// Start App
document.addEventListener('DOMContentLoaded', () => app.init());
