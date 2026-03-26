// Mock Data
window.MOCK_DATA = {
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
        { id: 101, sn: 'INV-2024-001', nmi: 'NMI' + Math.floor(Math.random() * 1000000000), vendor: 'Sungrow', type: 'Inverter', status: 'online', capacity: 50, userName: 'Alice Green', phone: '+1 555-0201', email: 'alice@example.com', address: '321 Green Way', state: 'NSW', inverterType: 'Hybrid', authStatus: 'expired' },
        { id: 102, sn: 'BAT-2024-002', nmi: 'NMI' + Math.floor(Math.random() * 1000000000), vendor: 'CATL', type: 'Battery', status: 'online', capacity: 200, userName: 'Charlie Black', phone: '+1 555-0202', email: 'charlie@example.com', address: '654 Energy Blvd', state: 'VIC', inverterType: 'Hybrid', authStatus: 'authorized' },
        { id: 103, sn: 'INV-2024-003', nmi: 'NMI' + Math.floor(Math.random() * 1000000000), vendor: 'Huawei', type: 'Inverter', status: 'offline', capacity: 45, userName: 'David White', phone: '+1 555-0203', email: 'david@example.com', address: '987 Volt Rd', state: 'QLD', inverterType: 'Grid-Tied', authStatus: 'expired' },
        { id: 104, sn: 'BAT-2024-004', nmi: 'NMI' + Math.floor(Math.random() * 1000000000), vendor: 'BYD', type: 'Battery', status: 'online', capacity: 150, userName: 'Eva Blue', phone: '+1 555-0204', email: 'eva@example.com', address: '147 Ampere Ct', state: 'SA', inverterType: 'Hybrid', authStatus: 'authorized' },
        { id: 105, sn: 'INV-2024-005', nmi: 'NMI' + Math.floor(Math.random() * 1000000000), vendor: 'Sungrow', type: 'Inverter', status: 'online', capacity: 55, userName: 'Frank Red', phone: '+1 555-0205', email: 'frank@example.com', address: '258 Ohm Pl', state: 'NSW', inverterType: 'AC-Coupled', authStatus: 'authorized' },
    ],
    pricingRegions: [
        { id: 'NSW', name: 'New South Wales' },
        { id: 'QLD', name: 'Queensland' },
        { id: 'SA', name: 'South Australia' },
        { id: 'VIC', name: 'Victoria' },
        { id: 'WA', name: 'Western Australia' }
    ],
    regionMarkets: {
        NSW: ['All', 'Spot', 'FCAS'],
        QLD: ['All', 'Spot', 'FCAS'],
        SA: ['All', 'Spot', 'FCAS'],
        VIC: ['All', 'Spot', 'FCAS'],
        WA: ['All', 'Spot', 'FCAS']
    },
    assignableVpps: [
        { id: 'vpp-001', name: 'Harbor Flex', state: 'NSW', markets: ['Spot', 'FCAS'] },
        { id: 'vpp-002', name: 'Coastal Grid', state: 'NSW', markets: ['Spot'] },
        { id: 'vpp-003', name: 'Metro Pulse', state: 'VIC', markets: ['Spot', 'FCAS'] },
        { id: 'vpp-004', name: 'Sunrise Collective', state: 'QLD', markets: ['Spot'] },
        { id: 'vpp-005', name: 'Adelaide Reserve', state: 'SA', markets: ['FCAS'] }
    ],

    smartFeedInRules: [
        { id: 1, state: 'SA', triggerTime: '07:00 - 12:00', triggerPrice: 0.00, socReserve: 30, vppName: 'SA Smart Feedin', lastModified: '10/08/2022 18:22:43', eventsTriggered: 3229, active: true },
        { id: 2, state: 'NSW', triggerTime: '10:00 - 14:00', triggerPrice: -10.00, socReserve: 50, vppName: 'NSW Feed Control', lastModified: '11/01/2026 09:15:00', eventsTriggered: 156, active: true },
        ...Array.from({ length: 15 }, (_, i) => ({
            id: i + 3,
            state: ['NSW', 'VIC', 'QLD', 'SA'][i % 4],
            triggerTime: `${String(i + 6).padStart(2, '0')}:00 - ${String(i + 10).padStart(2, '0')}:00`,
            triggerPrice: (Math.random() * -20).toFixed(2),
            socReserve: 20 + i * 2,
            vppName: `Test VPP ${i + 1}`,
            lastModified: '12/01/2026 10:00:00',
            eventsTriggered: Math.floor(Math.random() * 500),
            active: i % 2 === 0
        }))
    ],

    smartFeedInEvents: [
        { id: 1, time: '12/01/2026 14:30:05', type: 'Current Overload', value: '120A', threshold: '100A', status: 'Resolved', details: 'Discharge current exceeded max limit' },
        { id: 2, time: '12/01/2026 15:15:22', type: 'High Temperature', value: '45°C', threshold: '40°C', status: 'Active', details: 'Battery temperature above safety range' },
        ...Array.from({ length: 15 }, (_, i) => ({
            id: i + 3,
            time: '12/01/2026 ' + String(10 + i).padStart(2, '0') + ':00:00',
            type: i % 2 === 0 ? 'Current Overload' : 'High Temperature',
            value: i % 2 === 0 ? (110 + i) + 'A' : (42 + i) + '°C',
            threshold: i % 2 === 0 ? '100A' : '40°C',
            status: i % 3 === 0 ? 'Active' : 'Resolved',
            details: i % 2 === 0 ? 'Discharge current exceeded max limit' : 'Battery temperature above safety range'
        }))
    ],

    tradingEvents: Array.from({ length: 45 }, (_, i) => {
        const d = new Date();
        const daysAgo = Math.floor(i / 5); // 5 items per day
        d.setDate(d.getDate() - daysAgo);
        
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        const dateStr = `${day}/${month}/${year} (+11:00)`;
        
        const vppNames = ['SA VPP', 'NSW VPP', "Jeff's VPP", 'QLD VPP', 'VIC VPP'];
        
        return {
            id: i + 1,
            vppName: vppNames[i % vppNames.length],
            state: ['NSW', 'VIC', 'QLD', 'SA'][i % 4],
            triggerType: 'Actual',
            eventType: i % 2 === 0 ? 'Charge' : 'Discharge',
            price: parseFloat((Math.random() * 1000).toFixed(2)), // Ensure number
            date: dateStr,
            timeRange: `${String(10 + (i % 8)).padStart(2, '0')}:00 - ${String(10 + (i % 8))}:30`,
            power: parseFloat((Math.random() * 500).toFixed(2)), // Ensure number
            status: i % 10 === 0 ? 'Pending' : 'Completed'
        };
    }),

    capGraph: {
        metrics: {
            VIC: { online: 12, total: 19, inverterPower: 90.79, currentCap: 98.38, totalCap: 193.80, spotPrice: 60.43, forecastPrice: 56.58 },
            SA: { online: 45, total: 60, inverterPower: 210.50, currentCap: 250.00, totalCap: 400.00, spotPrice: 45.20, forecastPrice: 42.10 },
            NSW: { online: 30, total: 40, inverterPower: 150.25, currentCap: 180.50, totalCap: 300.00, spotPrice: 55.80, forecastPrice: 50.30 },
            QLD: { online: 20, total: 30, inverterPower: 120.00, currentCap: 140.00, totalCap: 220.00, spotPrice: 48.90, forecastPrice: 46.50 }
        },
        forecasts: Array.from({ length: 48 }, (_, i) => {
            const date = new Date('2026-01-14T00:00:00');
            date.setMinutes(date.getMinutes() + i * 30);
            return {
                time: date.toLocaleString('en-AU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }),
                price: (20 + Math.random() * 40).toFixed(4) // Random price between 20 and 60
            };
        }).reverse(),
        chartData: Array.from({ length: 24 * 12 }, (_, i) => { // 5 min interval for smoother chart
             const hour = Math.floor(i / 12);
             const minute = (i % 12) * 5;
             const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
             
             // Simulate solar/battery profile
             let capacity = 30;
             if (hour > 6 && hour < 18) {
                 capacity += 50 * Math.sin(((hour - 6) / 12) * Math.PI); // Solar curve
             }
             capacity += Math.random() * 10; // Noise

             let soc = 40;
             if (hour > 8 && hour < 16) {
                 soc += 40 * Math.sin(((hour - 8) / 8) * Math.PI); // Charging
             } else if (hour >= 16) {
                 soc = 80 - (hour - 16) * 5; // Discharging
             }
             soc = Math.max(0, Math.min(100, soc + Math.random() * 5));

             return { time, capacity: capacity.toFixed(2), soc: soc.toFixed(0) };
        })
    },

    capRules: [
        { id: 1, state: 'QLD', scheduleType: 'every_day', targetTime: '06:00', triggerPrice: 300.00, targetCapacity: '4 MWh', vppName: 'QLD VPP', lastModified: '18/12/2025 14:36:23', eventsTriggered: 10, active: false },
        { id: 2, state: 'SA', scheduleType: 'every_day', targetTime: '05:00', triggerPrice: 0.00, targetCapacity: '5.6 MWh', vppName: 'SA VPP', lastModified: '10/08/2022 18:23:52', eventsTriggered: 304, active: true },
        ...Array.from({ length: 13 }, (_, i) => ({
            id: i + 3,
            state: ['NSW', 'VIC', 'QLD', 'SA'][i % 4],
            scheduleType: 'every_day',
            targetTime: `${String(i + 7).padStart(2, '0')}:00`,
            triggerPrice: (Math.random() * 500).toFixed(2),
            targetCapacity: (Math.random() * 10).toFixed(1) + ' MWh',
            vppName: `Test VPP ${i + 1}`,
            lastModified: '12/01/2026 10:00:00',
            eventsTriggered: Math.floor(Math.random() * 100),
            active: i % 2 === 0
        }))
    ],

    capEvents: [
        { id: 1, vppName: 'SA VPP', eventType: 'Charge', date: '30/11/2023 (+11:00)', timeRange: '04:30:40 - 05:00:00', power: '931.32 kW', spotPrice: '$1.58092', volume: '32.63989 kWh', vppIncome: '-$0.05', status: 'Partially Success', notes: 'The device(s) in group failed to schedule.', serviceTag: '' },
        { id: 2, vppName: 'SA VPP', eventType: 'Charge', date: '30/11/2023 (+11:00)', timeRange: '04:01:05 - 04:30:00', power: '935.92 kW', spotPrice: '-$30.50', volume: '154.568 kWh', vppIncome: '$4.72', status: 'Partially Success', notes: 'The device(s) in group failed to schedule.', serviceTag: '' },
        { id: 3, vppName: 'SA VPP', eventType: 'Charge', date: '30/11/2023 (+11:00)', timeRange: '03:30:48 - 04:00:00', power: '935.92 kW', spotPrice: '-$21.69', volume: '22.68890 kWh', vppIncome: '$0.49', status: 'Partially Success', notes: 'The device(s) in group failed to schedule.', serviceTag: '' },
        { id: 4, vppName: 'SA VPP', eventType: 'Charge', date: '30/11/2023 (+11:00)', timeRange: '03:20:48 - 03:30:00', power: '935.92 kW', spotPrice: '-$4.337', volume: '22.29479 kWh', vppIncome: '$0.10', status: 'Partially Success', notes: 'The device(s) in group failed to schedule.', serviceTag: '' },
        ...Array.from({ length: 15 }, (_, i) => ({
            id: i + 5,
            vppName: `VPP ${i + 1}`,
            eventType: i % 2 === 0 ? 'Charge' : 'Discharge',
            date: '12/01/2026 (+11:00)',
            timeRange: '12:00:00 - 12:30:00',
            power: (Math.random() * 1000).toFixed(2) + ' kW',
            spotPrice: '$' + (Math.random() * 200).toFixed(2),
            volume: (Math.random() * 100).toFixed(2) + ' kWh',
            vppIncome: '$' + (Math.random() * 10).toFixed(2),
            status: ['Success', 'Partially Success', 'Failed'][i % 3],
            notes: '',
            serviceTag: ''
        }))
    ],

    fcasGroups: [
        { id: 1, name: 'ASSDE1', onlineDers: 36, totalDers: 223, state: 'SA', inverterSize: '1,103.40 kW', currentSoc: '229.09', totalSoc: '2,586.02 kWh', serviceTag: 'FCAS', eventsTriggered: '', active: false }
    ],

    fcasData: {
        stats: {
            current: { raise60s: 0.200, raise5min: 0.050, raiseAvail: 0.108 },
            forecast: { raise60s: 0.100, raise5min: 0.010, raiseAvail: 0.082 }
        },
        chartData: Array.from({ length: 24 * 12 }, (_, i) => {
             const hour = Math.floor(i / 12);
             const minute = (i % 12) * 5;
             const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
             return { 
                 time, 
                 price: (Math.random() * 0.5).toFixed(3), 
                 capacity: (Math.random() * 5).toFixed(2) 
             };
        }),
        forecast30min: [
            { label: 'Raise Price (60s)', values: Array(8).fill(0).map(() => (Math.random() * 0.2).toFixed(3)) },
            { label: 'Raise Price (5min)', values: Array(8).fill(0).map(() => (Math.random() * 0.1).toFixed(3)) }
        ],
        bids: Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            tradingPeriod: '12:00 - 12:30',
            duid: `DUID-${1000 + i}`,
            serviceType: i % 2 === 0 ? 'Raise 60 sec' : 'Raise 5 min',
            maxAvailability: (Math.random() * 10).toFixed(2) + ' MW',
            submissionDate: '20/01/2026 10:00:00',
            status: i % 3 === 0 ? 'Pending' : 'Cleared',
            totalSettlement: '$' + (Math.random() * 100).toFixed(2)
        }))
    },

    fcasPriceAvailability: [
        { id: 1, time: '12/01/2026 14:30', region: 'SA', service: 'Raise 6 sec', price: 15.50, availability: 120.5, cleared: 100.0 },
        { id: 2, time: '12/01/2026 14:30', region: 'SA', service: 'Lower 6 sec', price: 12.20, availability: 150.0, cleared: 110.0 },
        { id: 3, time: '12/01/2026 14:30', region: 'VIC', service: 'Raise 6 sec', price: 18.00, availability: 200.0, cleared: 180.0 },
        { id: 4, time: '12/01/2026 14:30', region: 'NSW', service: 'Raise 5 min', price: 25.00, availability: 300.0, cleared: 250.0 }
    ],

    reportsVppEvents: [
        {
            id: 1,
            vppName: 'SA VPP',
            eventType: 'Discharge',
            date: '12/01/2026 (+11:00)',
            timeRange: '19:10:47 - 19:30:00',
            power: '576.03 kW',
            spotPrice: '$180.10733',
            volume: '',
            vppIncome: '',
            status: 'Partially Success',
            notes: 'The device(s) in group failed to schedule.',
            serviceTag: ''
        },
        {
            id: 2,
            vppName: 'NSW VPP',
            eventType: 'Discharge',
            date: '10/01/2026 (+11:00)',
            timeRange: '20:31:08 - 21:00:00',
            power: '411.19 kW',
            spotPrice: '$344.09265',
            volume: '13.68855 kWh',
            vppIncome: '$4.71',
            status: 'Partially Success',
            notes: 'The device(s) in group failed to schedule.',
            serviceTag: ''
        },
        {
            id: 3,
            vppName: "Jeff's VPP",
            eventType: 'Discharge',
            date: '10/01/2026 (+11:00)',
            timeRange: '20:31:08 - 21:00:00',
            power: '10.00 kW',
            spotPrice: '$344.09265',
            volume: '0.00000 kWh',
            vppIncome: '$0.00',
            status: 'Success',
            notes: '',
            serviceTag: ''
        },
        {
            id: 4,
            vppName: 'NSW VPP',
            eventType: 'Discharge',
            date: '10/01/2026 (+11:00)',
            timeRange: '20:01:28 - 20:30:00',
            power: '411.19 kW',
            spotPrice: '$6,951.66...',
            volume: '12.25886 kWh',
            vppIncome: '$85.22',
            status: 'Partially Success',
            notes: 'The device(s) in group failed to schedule.',
            serviceTag: ''
        },
        {
            id: 5,
            vppName: "Jeff's VPP",
            eventType: 'Discharge',
            date: '10/01/2026 (+11:00)',
            timeRange: '20:01:28 - 20:30:00',
            power: '10.00 kW',
            spotPrice: '$6,951.66...',
            volume: '0.00000 kWh',
            vppIncome: '$0.00',
            status: 'Success',
            notes: '',
            serviceTag: ''
        },
        {
            id: 6,
            vppName: "Jeff's VPP",
            eventType: 'Discharge',
            date: '10/01/2026 (+11:00)',
            timeRange: '19:35:48 - 20:00:00',
            power: '10.00 kW',
            spotPrice: '$11,862.3...',
            volume: '0.00000 kWh',
            vppIncome: '$0.00',
            status: 'Success',
            notes: '',
            serviceTag: ''
        },
        {
            id: 7,
            vppName: 'NSW VPP',
            eventType: 'Discharge',
            date: '10/01/2026 (+11:00)',
            timeRange: '19:31:05 - 20:00:00',
            power: '411.19 kW',
            spotPrice: '$11,862.3...',
            volume: '14.30293 kWh',
            vppIncome: '$169.67',
            status: 'Partially Success',
            notes: 'The device(s) in group failed to schedule.',
            serviceTag: ''
        }
    ],

    reportsDerEvents: [
        {
            id: 1,
            sn: 'AL2002120020030',
            eventType: 'Discharge',
            date: '12/01/2026 (+11:00)',
            timeRange: '19:30:00 - 20:00:00',
            from: 'User',
            power: '5.00 kW',
            spotPrice: '$58.156...',
            volume: '',
            vppIncome: '',
            notes: '',
            status: 'Completed'
        },
        {
            id: 2,
            sn: '7F1727AF-6C',
            eventType: 'Discharge',
            date: '12/01/2026 (+11:00)',
            timeRange: '19:10:47 - 19:30:00',
            from: 'System',
            power: '4.99 kW',
            spotPrice: '$180.10...',
            volume: '',
            vppIncome: '',
            notes: '',
            status: 'Completed'
        },
        {
            id: 3,
            sn: 'AL8002021090031',
            eventType: 'Discharge',
            date: '12/01/2026 (+11:00)',
            timeRange: '19:10:47 - 19:30:00',
            from: 'System',
            power: '4.60 kW',
            spotPrice: '$180.10...',
            volume: '',
            vppIncome: '',
            notes: '',
            status: 'Completed'
        },
        {
            id: 4,
            sn: 'AL8001321010774',
            eventType: 'Discharge',
            date: '12/01/2026 (+11:00)',
            timeRange: '19:10:47 - 19:30:00',
            from: 'System',
            power: '5.00 kW',
            spotPrice: '$180.10...',
            volume: '',
            vppIncome: '',
            notes: '',
            status: 'Completed'
        },
        {
            id: 5,
            sn: 'AL2002119120021',
            eventType: 'Discharge',
            date: '12/01/2026 (+11:00)',
            timeRange: '19:10:47 - 19:30:00',
            from: 'System',
            power: '5.00 kW',
            spotPrice: '$180.10...',
            volume: '',
            vppIncome: '',
            notes: '',
            status: 'Completed'
        },
        {
            id: 6,
            sn: 'AL2002220060275',
            eventType: 'Discharge',
            date: '12/01/2026 (+11:00)',
            timeRange: '19:10:47 - 19:30:00',
            from: 'System',
            power: '5.00 kW',
            spotPrice: '$180.10...',
            volume: '',
            vppIncome: '',
            notes: '',
            status: 'Completed'
        },
        {
            id: 7,
            sn: 'AL2002118030338',
            eventType: 'Discharge',
            date: '12/01/2026 (+11:00)',
            timeRange: '19:10:47 - 19:30:00',
            from: 'System',
            power: '5.00 kW',
            spotPrice: '$180.10...',
            volume: '',
            vppIncome: '',
            notes: '',
            status: 'Completed'
        },
        {
            id: 8,
            sn: 'AL2002220080138',
            eventType: 'Discharge',
            date: '12/01/2026 (+11:00)',
            timeRange: '19:10:47 - 19:30:00',
            from: 'System',
            power: '5.00 kW',
            spotPrice: '$180.10...',
            volume: '',
            vppIncome: '',
            notes: '',
            status: 'Completed'
        },
        {
            id: 9,
            sn: 'AL2002120020452',
            eventType: 'Discharge',
            date: '12/01/2026 (+11:00)',
            timeRange: '19:10:47 - 19:30:00',
            from: 'System',
            power: '5.00 kW',
            spotPrice: '$180.10... /MWh',
            volume: '',
            vppIncome: '',
            notes: '',
            status: 'Completed'
        },
        {
            id: 10,
            sn: 'AL2002220060298',
            eventType: 'Discharge',
            date: '12/01/2026 (+11:00)',
            timeRange: '19:10:47 - 19:30:00',
            from: 'System',
            power: '5.00 kW',
            spotPrice: '$180.10... /MWh',
            volume: '',
            vppIncome: '',
            notes: '',
            status: 'Completed'
        }
    ],
    reportsVppEventItems: [
        {
            id: 1,
            eventId: '826176',
            nmi: '4407212728',
            eventType: 'Discharge',
            date: '10/01/2026',
            timeRange: '20:31:08 - 21:00:00',
            from: 'VPP',
            isSettle: 'Y',
            quantity: '0.342551 kWh',
            spotPrice: '$0.344090 /kWh',
            revenue: '$0.117868',
            ownerProfit: '$0.101753',
            netProfit: '$0.016115'
        },
        {
            id: 2,
            eventId: '826175',
            nmi: '4102625721',
            eventType: 'Discharge',
            date: '10/01/2026',
            timeRange: '20:31:08 - 21:00:00',
            from: 'VPP',
            isSettle: 'Y',
            quantity: '0.636991 kWh',
            spotPrice: '$0.344090 /kWh',
            revenue: '$0.219182',
            ownerProfit: '$0.189215',
            netProfit: '$0.029967'
        },
        {
            id: 3,
            eventId: '826170',
            nmi: '4102880912',
            eventType: 'Discharge',
            date: '10/01/2026',
            timeRange: '20:31:08 - 21:00:00',
            from: 'VPP',
            isSettle: 'Y',
            quantity: '1.274944 kWh',
            spotPrice: '$0.344090 /kWh',
            revenue: '$0.438695',
            ownerProfit: '$0.378716',
            netProfit: '$0.059980'
        },
        {
            id: 4,
            eventId: '826167',
            nmi: '4103496008',
            eventType: 'Discharge',
            date: '10/01/2026',
            timeRange: '20:31:08 - 21:00:00',
            from: 'VPP',
            isSettle: 'Y',
            quantity: '0.361796 kWh',
            spotPrice: '$0.344090 /kWh',
            revenue: '$0.124490',
            ownerProfit: '$0.107470',
            netProfit: '$0.017021'
        },
        {
            id: 5,
            eventId: '826173',
            nmi: '4102175872',
            eventType: 'Discharge',
            date: '10/01/2026',
            timeRange: '20:31:08 - 21:00:00',
            from: 'VPP',
            isSettle: 'Y',
            quantity: '0.000000 kWh',
            spotPrice: '$0.344090 /kWh',
            revenue: '$0.000000',
            ownerProfit: '$0.000000',
            netProfit: '$0.000000'
        },
        {
            id: 6,
            eventId: '826183',
            nmi: '4001249805',
            eventType: 'Discharge',
            date: '10/01/2026',
            timeRange: '20:31:08 - 21:00:00',
            from: 'VPP',
            isSettle: 'Y',
            quantity: '0.000000 kWh',
            spotPrice: '$0.344090 /kWh',
            revenue: '$0.000000',
            ownerProfit: '$0.000000',
            netProfit: '$0.000000'
        },
        {
            id: 7,
            eventId: '826156',
            nmi: '4103974475',
            eventType: 'Discharge',
            date: '10/01/2026',
            timeRange: '20:31:08 - 21:00:00',
            from: 'VPP',
            isSettle: 'Y',
            quantity: '0.097184 kWh',
            spotPrice: '$0.344090 /kWh',
            revenue: '$0.033440',
            ownerProfit: '$0.028868',
            netProfit: '$0.004572'
        },
        {
            id: 8,
            eventId: '826157',
            nmi: '4103058960',
            eventType: 'Discharge',
            date: '10/01/2026',
            timeRange: '20:31:08 - 21:00:00',
            from: 'VPP',
            isSettle: 'Y',
            quantity: '0.000000 kWh',
            spotPrice: '$0.344090 /kWh',
            revenue: '$0.000000',
            ownerProfit: '$0.000000',
            netProfit: '$0.000000'
        },
        {
            id: 9,
            eventId: '826150',
            nmi: '4103878722',
            eventType: 'Discharge',
            date: '10/01/2026',
            timeRange: '20:31:08 - 21:00:00',
            from: 'VPP',
            isSettle: 'Y',
            quantity: '0.000000 kWh',
            spotPrice: '$0.344090 /kWh',
            revenue: '$0.000000',
            ownerProfit: '$0.000000',
            netProfit: '$0.000000'
        },
        {
            id: 10,
            eventId: '826164',
            nmi: '4102786454',
            eventType: 'Discharge',
            date: '10/01/2026',
            timeRange: '20:31:08 - 21:00:00',
            from: 'VPP',
            isSettle: 'Y',
            quantity: '0.000000 kWh',
            spotPrice: '$0.344090 /kWh',
            revenue: '$0.000000',
            ownerProfit: '$0.000000',
            netProfit: '$0.000000'
        },
        {
            id: 11,
            eventId: '826171',
            nmi: '4001263093',
            eventType: 'Discharge',
            date: '10/01/2026',
            timeRange: '20:31:08 - 21:00:00',
            from: 'VPP',
            isSettle: 'Y',
            quantity: '1.542442 kWh',
            spotPrice: '$0.344090 /kWh',
            revenue: '$0.530739',
            ownerProfit: '$0.458175',
            netProfit: '$0.072564'
        }
    ],

    users: (typeof MOCK_USERS !== 'undefined' && Array.isArray(MOCK_USERS)) ? MOCK_USERS : [
        { id: 1, userName: '2121 2121', email: 'ian.ru@SmartRent.com.au', company: 'OSW', mobile: '0400000000', status: 'Active', loginCount: 1, lastLoginTime: '2026-02-04 11:53:46', lastLoginIp: '101.185.179.154', currentLoginIp: '101.185.179.154', created: '2026-02-04' },
        ...Array.from({ length: 15 }, (_, i) => ({
            id: i + 2,
            userName: `User ${i + 2}`,
            email: `user${i + 2}@example.com`,
            company: ['Solar Naturally Pty Ltd', 'GPOWER PTY LTD', 'Regen Power Pty Ltd', 'Connect Solar Cycle Team', 'Green Energy Co', 'Manta Energy'][i % 6],
            mobile: `04000000${String(i + 2).padStart(2, '0')}`,
            status: i % 2 === 0 ? 'Active' : 'Inactive',
            loginCount: Math.floor(Math.random() * 100),
            lastLoginTime: '2026-02-04 11:53:46',
            lastLoginIp: '101.185.179.154',
            currentLoginIp: '101.185.179.154',
            created: '2026-02-04'
        }))
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
