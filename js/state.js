// State
window.state = {
    addDeviceDrawer: {
        isOpen: false,
        searchQuery: '',
        selectedDeviceIds: [],
        submitting: false,
        error: null
    },
    currentView: 'overview',
    // nodes removed
    vpps: [...MOCK_DATA.vpps],
    devices: [...MOCK_DATA.devices],
    systems: [], // Initialize systems array
    selectedVppId: null,
    vppDeviceTab: 'assigned', // assigned or discovery
    vppDetailsTab: 'der-list', // der-list or event-list
    operationViewMode: 'chart', // chart or table
    assignedSearchQuery: '',
    discoverySearchQuery: '',
    assignVpp: {
        deviceSn: '',
        pricingRegion: '',
        activeMarket: '',
        assignedVppId: '',
        searchQuery: '',
        pricingRegions: [],
        marketOptions: [],
        vppOptions: [],
        loadingRegions: false,
        loadingMarkets: false,
        loadingVpps: false,
        submitting: false,
        regionRequestId: 0,
        marketRequestId: 0,
        vppRequestId: 0
    },
    vppList: {
                                                                                                                                                                                                                                                                                                                                                                                        vppName: '',
        state: '',
        currentPage: 1,
        itemsPerPage: 10
    },
    derListPagination: {
        currentPage: 1,
        itemsPerPage: 10
    },
    subVppList: {
        name: '',
        type: 'All',
        status: 'All',
        currentPage: 1,
        itemsPerPage: 10
    },
    isSuperAdmin: true, // Default to true to simulate an admin user
    cloudBound: false, // New state for cloud platform binding
    capGraph: {
        selectedState: 'VIC',
        selectedDate: '12/01/2026',
        forecastInterval: '30Min'
    },
    capRules: {
        state: 'All',
        vppName: '',
        currentPage: 1,
        itemsPerPage: 10
    },
    capEvents: {
        timeRange: '',
        status: 'All',
        eventType: 'All',
        vppName: '',
        currentPage: 1,
        itemsPerPage: 10
    },
    smartFeedInRules: {
        state: 'All',
        vppName: '',
        currentPage: 1,
        itemsPerPage: 10
    },
    smartFeedInEvents: {
        type: 'All',
        status: 'All',
        currentPage: 1,
        itemsPerPage: 10
    },
    tradingEvents: {
        timeRange: '',
        eventType: 'All',
        status: 'All',
        state: 'All',
        vppName: '',
        currentPage: 1,
        itemsPerPage: 10
    },
    spotTradingEventsFilters: {
        eventTypes: [],
        statuses: [],
        eventOptions: [],
        statusOptions: [],
        eventTypesAll: true,
        statusesAll: true,
        openMenu: null
    },
    fcasGroups: {
        groupName: '',
        state: 'All',
        active: 'All',
        currentPage: 1,
        itemsPerPage: 10
    },
    systemDetails: {
        deviceListPagination: {
            currentPage: 1,
            itemsPerPage: 10
        }
    },
    tradingRules: [
        {
            id: 1,
            vpp: 'SA VPP',
            state: 'Active',
            region: 'SA',
            triggerType: 'Price',
            priceSource: 'Spot',
            condition: '>=',
            price: '100',
            action: 'Discharge',
            createdAt: '2026-02-20T08:00:00.000Z',
            updatedAt: '2026-02-21T09:30:00.000Z',
            applicableVpps: [
                { id: 'vpp-005', name: 'SA VPP', ignoreTimeEnabled: true, ignoreTimeStart: '10:00', ignoreTimeEnd: '14:00', ignoreFrequency: 'Everyday' }
            ]
        }
    ], // Store created rules
    tradingOverviewSearch: '',
    tradingRulesList: {
        state: 'All',
        vppName: '',
        triggerType: 'All',
        currentPage: 1,
        itemsPerPage: 10,
        expandedHistoryRuleId: null
    },
    tradingRulesFilters: {
        regions: [],
        events: [],
        statuses: [],
        regionOptions: [],
        eventOptions: [],
        statusOptions: [],
        regionsAll: true,
        eventsAll: true,
        statusesAll: true,
        openMenu: null
    },
    tradingRuleVppSelections: [],
    tradingRuleVppDropdownOpen: false,
    tradingRuleVppOptions: [],
    fcasPriceAvailability: {
        region: 'SA',
        direction: 'Raise', // Raise or Lower
        date: '20/01/2026',
        bids: {
            dateRange: '',
            serviceType: 'All',
            currentPage: 1,
            itemsPerPage: 10
        }
    },
    reportsVppEvents: {
        timeRange: '',
        status: 'All',
        eventType: 'All',
        vppName: '',
        search: '',
        selectedEventIndex: null,
        currentMode: 'realtime',
        dateRange: { start: null, end: null },
        currentPage: 1,
        itemsPerPage: 10
    },
    reportsVppEventsDetails: {
        status: 'All',
        search: ''
    },
    reportsVppEventsDetailsDerTableFilters: {
        statuses: [],
        regions: [],
        events: [],
        statusOptions: [],
        regionOptions: [],
        eventOptions: [],
        statusesAll: true,
        regionsAll: true,
        eventsAll: true,
        openMenu: null
    },
    reportsVppEventsTableFilters: {
        statuses: [],
        regions: [],
        events: [],
        statusOptions: [],
        regionOptions: [],
        eventOptions: [],
        statusesAll: true,
        regionsAll: true,
        eventsAll: true,
        openMenu: null
    },
    reportsDerEvents: {
        timeRange: '',
        eventType: 'All',
        status: 'All',
        from: 'All',
        sn: '',
        search: '',
        currentMode: 'realtime',
        dateRange: { start: null, end: null },
        currentPage: 1,
        itemsPerPage: 10
    },
    reportsDerEventsTableFilters: {
        statuses: [],
        regions: [],
        events: [],
        statusOptions: [],
        regionOptions: [],
        eventOptions: [],
        statusesAll: true,
        regionsAll: true,
        eventsAll: true,
        openMenu: null
    },
    reportsVppEventItems: {
        month: '',
        eventType: 'All',
        from: 'All',
        eventId: '',
        nmi: '',
        currentPage: 1,
        itemsPerPage: 10
    },
    account: {
        status: 'All',
        company: 'All',
        keyword: '',
        currentPage: 1,
        itemsPerPage: 10
    },
    arbitrage: {
        currentPage: 1,
        itemsPerPage: 10,
        currentMode: 'realtime',
        dateRange: { start: null, end: null },
        activeFilter: null
    },
    currentUser: {
        company: 'Manta Energy',
        country: 'Australia',
        abn: '12 345 678 901',
        address: '100 Miller St, North Sydney NSW 2060'
    }
};
