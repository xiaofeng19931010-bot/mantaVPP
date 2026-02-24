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
        { id: 101, sn: 'INV-2024-001', vendor: 'Sungrow', type: 'Inverter', status: 'online', capacity: 50, userName: 'Alice Green', phone: '+1 555-0201', email: 'alice@example.com', address: '321 Green Way', state: 'NSW' },
        { id: 102, sn: 'BAT-2024-002', vendor: 'CATL', type: 'Battery', status: 'online', capacity: 200, userName: 'Charlie Black', phone: '+1 555-0202', email: 'charlie@example.com', address: '654 Energy Blvd', state: 'VIC' },
        { id: 103, sn: 'INV-2024-003', vendor: 'Huawei', type: 'Inverter', status: 'offline', capacity: 45, userName: 'David White', phone: '+1 555-0203', email: 'david@example.com', address: '987 Volt Rd', state: 'QLD' },
        { id: 104, sn: 'BAT-2024-004', vendor: 'BYD', type: 'Battery', status: 'online', capacity: 150, userName: 'Eva Blue', phone: '+1 555-0204', email: 'eva@example.com', address: '147 Ampere Ct', state: 'SA' },
        { id: 105, sn: 'INV-2024-005', vendor: 'Sungrow', type: 'Inverter', status: 'online', capacity: 55, userName: 'Frank Red', phone: '+1 555-0205', email: 'frank@example.com', address: '258 Ohm Pl', state: 'NSW' },
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

    tradingEvents: [
        { id: 1, vppName: 'SA VPP', state: 'SA', triggerType: 'Actual', eventType: 'Discharge', price: 180.10733, date: '12/01/2026 (+11:00)', timeRange: '19:10:47 - 19:30:00', power: 576.03, status: 'Completed' },
        { id: 2, vppName: 'NSW VPP', state: 'NSW', triggerType: 'Actual', eventType: 'Discharge', price: 344.09265, date: '10/01/2026 (+11:00)', timeRange: '20:31:08 - 21:00:00', power: 411.19, status: 'Completed' },
        { id: 3, vppName: "Jeff's VPP", state: 'NSW', triggerType: 'Actual', eventType: 'Discharge', price: 344.09265, date: '10/01/2026 (+11:00)', timeRange: '20:31:08 - 21:00:00', power: 10.00, status: 'Completed' },
        { id: 4, vppName: 'NSW VPP', state: 'NSW', triggerType: 'Actual', eventType: 'Discharge', price: 6951.66847, date: '10/01/2026 (+11:00)', timeRange: '20:01:28 - 20:30:00', power: 411.19, status: 'Completed' },
        { id: 5, vppName: "Jeff's VPP", state: 'NSW', triggerType: 'Actual', eventType: 'Discharge', price: 6951.66847, date: '10/01/2026 (+11:00)', timeRange: '20:01:28 - 20:30:00', power: 10.00, status: 'Completed' },
        { id: 6, vppName: "Jeff's VPP", state: 'NSW', triggerType: 'Actual', eventType: 'Discharge', price: 11862.30384, date: '10/01/2026 (+11:00)', timeRange: '19:35:48 - 20:00:00', power: 10.00, status: 'Completed' },
        { id: 7, vppName: 'NSW VPP', state: 'NSW', triggerType: 'Actual', eventType: 'Discharge', price: 11862.30384, date: '10/01/2026 (+11:00)', timeRange: '19:31:05 - 20:00:00', power: 411.19, status: 'Completed' },
        { id: 8, vppName: "Jeff's VPP", state: 'NSW', triggerType: 'Actual', eventType: 'Discharge', price: 11862.30384, date: '10/01/2026 (+11:00)', timeRange: '19:31:05 - 19:31:06', power: 10.00, status: 'Completed' },
        ...Array.from({ length: 15 }, (_, i) => ({
            id: i + 9,
            vppName: `VPP ${i + 1}`,
            state: ['NSW', 'VIC', 'QLD', 'SA'][i % 4],
            triggerType: 'Actual',
            eventType: i % 2 === 0 ? 'Charge' : 'Discharge',
            price: Math.random() * 1000,
            date: '12/01/2026 (+11:00)',
            timeRange: '12:00:00 - 12:30:00',
            power: Math.random() * 500,
            status: i % 5 === 0 ? 'Pending' : 'Completed'
        }))
    ],

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
        { id: 1, vppName: 'SA VPP', eventType: 'Charge', date: '30/11/2023 (+11:00)', timeRange: '04:30:40 - 05:00:00', power: '931.32 kW', spotPrice: '$1.58092 /MWh', volume: '32.63989 kWh', vppIncome: '-$0.05', status: 'Partially Success', notes: 'The device(s) in group failed to schedule.', serviceTag: '' },
        { id: 2, vppName: 'SA VPP', eventType: 'Charge', date: '30/11/2023 (+11:00)', timeRange: '04:01:05 - 04:30:00', power: '935.92 kW', spotPrice: '-$30.50 /MWh', volume: '154.568 kWh', vppIncome: '$4.72', status: 'Partially Success', notes: 'The device(s) in group failed to schedule.', serviceTag: '' },
        { id: 3, vppName: 'SA VPP', eventType: 'Charge', date: '30/11/2023 (+11:00)', timeRange: '03:30:48 - 04:00:00', power: '935.92 kW', spotPrice: '-$21.69 /MWh', volume: '22.68890 kWh', vppIncome: '$0.49', status: 'Partially Success', notes: 'The device(s) in group failed to schedule.', serviceTag: '' },
        { id: 4, vppName: 'SA VPP', eventType: 'Charge', date: '30/11/2023 (+11:00)', timeRange: '03:20:48 - 03:30:00', power: '935.92 kW', spotPrice: '-$4.337 /MWh', volume: '22.29479 kWh', vppIncome: '$0.10', status: 'Partially Success', notes: 'The device(s) in group failed to schedule.', serviceTag: '' },
        ...Array.from({ length: 15 }, (_, i) => ({
            id: i + 5,
            vppName: `VPP ${i + 1}`,
            eventType: i % 2 === 0 ? 'Charge' : 'Discharge',
            date: '12/01/2026 (+11:00)',
            timeRange: '12:00:00 - 12:30:00',
            power: (Math.random() * 1000).toFixed(2) + ' kW',
            spotPrice: '$' + (Math.random() * 200).toFixed(2) + ' /MWh',
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
            spotPrice: '$180.10733 /MWh',
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
            spotPrice: '$344.09265 /MWh',
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
            spotPrice: '$344.09265 /MWh',
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
            spotPrice: '$6,951.66... /MWh',
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
            spotPrice: '$6,951.66... /MWh',
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
            spotPrice: '$11,862.3... /MWh',
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
            spotPrice: '$11,862.3... /MWh',
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
            spotPrice: '$58.156... /MWh',
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
            spotPrice: '$180.10... /MWh',
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
            spotPrice: '$180.10... /MWh',
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
            spotPrice: '$180.10... /MWh',
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
            spotPrice: '$180.10... /MWh',
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
            spotPrice: '$180.10... /MWh',
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
            spotPrice: '$180.10... /MWh',
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
            spotPrice: '$180.10... /MWh',
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

// Page Titles
const titles = {
    overview: 'Overview',
    electricity_market: 'Electricity Market',
    spot_market: 'Spot Market',
    arbitrage_points: 'Arbitrage Points',
    trading: 'Trading',
    trading_rules: 'Trading Rules',
    trading_events: 'Trading Events',
    smart_feed_in: 'Smart Feed-in',
    smart_feed_in_rules: 'Smart Feed-in Rules',
    smart_feed_in_events: 'Smart Feed-in Events',
    cap_service: 'Cap Service',
    cap_graph: 'Cap Graph',
    cap_rules: 'Cap Rules',
    cap_events: 'Cap Events',
    fcas: 'FCAS',
    fcas_groups: 'FCAS Groups',
    fcas_price_availability: 'Price and Availability',
    reports: 'Reports',
    reports_vpp_events: 'VPP Events',
    reports_der_events: 'DER Events',
    reports_vpp_event_items: 'VPP Event Items',
    reports_vpp_event_month_summary: 'VPP Event Month Summary',
    reports_terminated: 'Terminated',
    vpp: 'VPP Management',
    vpp_details: 'VPP Details',
    device_management: 'Device Connection',
    system_details: 'System Details',
    system: 'System',
    account: 'Account'
};

// State
const state = {
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
    tradingRules: [], // Store created rules
    tradingRulesList: {
        state: 'All',
        vppName: '',
        triggerType: 'All',
        currentPage: 1,
        itemsPerPage: 10
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
        currentPage: 1,
        itemsPerPage: 10
    },
    reportsDerEvents: {
        timeRange: '',
        eventType: 'All',
        status: 'All',
        from: 'All',
        sn: '',
        currentPage: 1,
        itemsPerPage: 10
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
        itemsPerPage: 10
    },
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
        
        // Check for URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const view = urlParams.get('view');
        const sn = urlParams.get('sn');

        if (view === 'der_details' && sn) {
            // Navigate to DER Management (assuming ESS for now or generic)
            this.navigate('device_details', { sn });
        } else {
            this.navigate('overview');
        }

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

        // Close VPP dropdown on outside click
        document.addEventListener('click', (e) => {
            const dropdown = document.getElementById('rule-vpp-dropdown');
            const toggleBtn = document.getElementById('rule-vpp-toggle-btn');
            
            if (state.tradingRuleVppDropdownOpen && dropdown && toggleBtn) {
                if (!dropdown.contains(e.target) && !toggleBtn.contains(e.target)) {
                    this.toggleRuleVppDropdown();
                }
            }
        });
    },

    toggleSubmenu(id, element) {
        const submenu = document.getElementById(id);
        const icon = element.querySelector('.chevron-icon');
        
        if (submenu.classList.contains('max-h-0')) {
            submenu.classList.remove('max-h-0', 'opacity-0');
            submenu.classList.add('max-h-[1000px]', 'opacity-100');
            if (icon) icon.style.transform = 'rotate(180deg)';
            if (element) element.setAttribute('aria-expanded', 'true');
        } else {
            submenu.classList.remove('max-h-[1000px]', 'opacity-100');
            submenu.classList.add('max-h-0', 'opacity-0');
            if (icon) icon.style.transform = 'rotate(0deg)';
            if (element) element.setAttribute('aria-expanded', 'false');
        }
    },

    expandSubmenu(id) {
        const submenu = document.getElementById(id);
        const toggleBtn = document.querySelector(`[onclick*="${id}"]`);
        const icon = toggleBtn ? toggleBtn.querySelector('.chevron-icon') : null;

        if (submenu && submenu.classList.contains('max-h-0')) {
            submenu.classList.remove('max-h-0', 'opacity-0');
            submenu.classList.add('max-h-[1000px]', 'opacity-100');
            if (icon) icon.style.transform = 'rotate(180deg)';
            if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
        }
    },

    // ==========================================
    // Add Device Drawer
    // ==========================================

    toggleAddDeviceDrawer(isOpen) {
        state.addDeviceDrawer.isOpen = isOpen;
        
        const container = document.getElementById('content-area');
        const existingDrawer = document.getElementById('vpp-add-device-drawer');

        if (isOpen) {
            // Reset state when opening
            state.addDeviceDrawer.searchQuery = '';
            state.addDeviceDrawer.selectedDeviceIds = [];
            state.addDeviceDrawer.error = null;
            state.addDeviceDrawer.submitting = false;

            // Render drawer
            const drawerHtml = app.renderAddDeviceDrawer();
            if (drawerHtml) {
                if (existingDrawer) {
                    existingDrawer.innerHTML = drawerHtml;
                } else {
                    const drawerContainer = document.createElement('div');
                    drawerContainer.id = 'vpp-add-device-drawer';
                    drawerContainer.innerHTML = drawerHtml;
                    container.appendChild(drawerContainer);
                }
                if (window.lucide) lucide.createIcons();
            }
        } else {
            // Close drawer
            if (existingDrawer) {
                existingDrawer.remove();
            }
        }
    },

    setAddDeviceSearch(query) {
        state.addDeviceDrawer.searchQuery = query;
        const existingDrawer = document.getElementById('vpp-add-device-drawer');
        if (existingDrawer) {
             const drawerHtml = app.renderAddDeviceDrawer();
             existingDrawer.innerHTML = drawerHtml;
             if (window.lucide) lucide.createIcons();
             
             // Restore focus
             setTimeout(() => {
                const input = document.getElementById('add-device-search-input');
                if (input) {
                    input.focus();
                    const len = input.value.length;
                    input.setSelectionRange(len, len);
                }
            }, 0);
        }
    },

    getAvailableAddDevices() {
        const vpp = state.vpps.find(v => v.id === state.selectedVppId) || {};
        const vppState = vpp.state;
        let availableDevices = state.devices.filter(d => {
            if (vppState && d.state !== vppState) return false;
            return true;
        });
        if (state.addDeviceDrawer.searchQuery) {
            const q = state.addDeviceDrawer.searchQuery.toLowerCase();
            availableDevices = availableDevices.filter(d => d.sn.toLowerCase().includes(q));
        }
        return availableDevices;
    },

    toggleDeviceSelection(sn) {
        const index = state.addDeviceDrawer.selectedDeviceIds.indexOf(sn);
        let isSelected = false;
        if (index > -1) {
            state.addDeviceDrawer.selectedDeviceIds.splice(index, 1);
            isSelected = false;
        } else {
            state.addDeviceDrawer.selectedDeviceIds.push(sn);
            isSelected = true;
        }
        
        // Update checkbox state (for row clicks)
        const checkbox = document.getElementById(`checkbox-${sn}`);
        if (checkbox) {
            checkbox.checked = isSelected;
        }

        // Update Confirm button text
        const btn = document.getElementById('btn-add-devices-confirm');
        if (btn) {
            btn.innerHTML = `Confirm (${state.addDeviceDrawer.selectedDeviceIds.length})`;
        }

        const availableDevices = app.getAvailableAddDevices();
        const selectedInList = availableDevices.filter(d => state.addDeviceDrawer.selectedDeviceIds.includes(d.sn));
        const allSelected = availableDevices.length > 0 && selectedInList.length === availableDevices.length;
        const someSelected = selectedInList.length > 0 && !allSelected;
        const allCheckbox = document.getElementById('checkbox-all-devices');
        if (allCheckbox) {
            allCheckbox.checked = allSelected;
            allCheckbox.indeterminate = someSelected;
        }
    },

    toggleAllAddDevices(isChecked) {
        const availableDevices = app.getAvailableAddDevices();
        if (isChecked) {
            const nextSelected = new Set(state.addDeviceDrawer.selectedDeviceIds);
            availableDevices.forEach(d => nextSelected.add(d.sn));
            state.addDeviceDrawer.selectedDeviceIds = Array.from(nextSelected);
        } else {
            const availableSet = new Set(availableDevices.map(d => d.sn));
            state.addDeviceDrawer.selectedDeviceIds = state.addDeviceDrawer.selectedDeviceIds.filter(sn => !availableSet.has(sn));
        }

        availableDevices.forEach(d => {
            const checkbox = document.getElementById(`checkbox-${d.sn}`);
            if (checkbox) checkbox.checked = isChecked;
        });

        const allCheckbox = document.getElementById('checkbox-all-devices');
        if (allCheckbox) {
            allCheckbox.checked = isChecked && availableDevices.length > 0;
            allCheckbox.indeterminate = false;
        }

        const btn = document.getElementById('btn-add-devices-confirm');
        if (btn) {
            btn.innerHTML = `Confirm (${state.addDeviceDrawer.selectedDeviceIds.length})`;
        }
    },

    submitAddDevices() {
        if (state.addDeviceDrawer.selectedDeviceIds.length === 0) {
            state.addDeviceDrawer.error = 'Please select at least one device.';
            // Update error display manually
            const listContainer = document.querySelector('.animate-slide-in-right .flex-1.overflow-y-auto');
            if (listContainer) {
                let errorDiv = listContainer.querySelector('.bg-red-50');
                if (!errorDiv) {
                     errorDiv = document.createElement('div');
                     errorDiv.className = "mb-[16px] p-[12px] bg-red-50 text-red-600 rounded-[4px] text-[14px]";
                     listContainer.insertBefore(errorDiv, listContainer.firstChild);
                }
                errorDiv.innerText = state.addDeviceDrawer.error;
            }
            return;
        }

        state.addDeviceDrawer.submitting = true;
        state.addDeviceDrawer.error = null;
        
        // Remove error if exists
        const listContainer = document.querySelector('.animate-slide-in-right .flex-1.overflow-y-auto');
        if (listContainer) {
            const errorDiv = listContainer.querySelector('.bg-red-50');
            if (errorDiv) errorDiv.remove();
        }

        // Update button state manually
        const btn = document.getElementById('btn-add-devices-confirm');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin mr-2"></i>Confirm (${state.addDeviceDrawer.selectedDeviceIds.length})`;
            if (window.lucide) lucide.createIcons();
        }

        // Mock API call
        setTimeout(() => {
            // Success scenario
            const selectedDevices = state.devices.filter(d => state.addDeviceDrawer.selectedDeviceIds.includes(d.sn));
            
            // Add to assigned devices
            // Ensure state.assignedDevices is initialized from MOCK_DATA if empty
            if (!state.assignedDevices || state.assignedDevices.length === 0) {
                 state.assignedDevices = [...MOCK_DATA.assignedDevices];
            }

            const currentVppId = state.selectedVppId;
            const newDevices = selectedDevices
                .filter(d => !state.assignedDevices.some(ad => ad.sn === d.sn))
                .map(d => ({ ...d, vppId: currentVppId })); // Add vppId

            state.assignedDevices = [...state.assignedDevices, ...newDevices];

            state.addDeviceDrawer.submitting = false;
            state.addDeviceDrawer.isOpen = false;
            
            // Show success message
            alert('Add successfully'); 

            app.renderVPPDetails(document.getElementById('content-area'), state.selectedVppId);
            if (window.lucide) lucide.createIcons();
        }, 1000);
    },

    renderAddDeviceDrawer() {
        if (!state.addDeviceDrawer.isOpen) return '';

        const availableDevices = app.getAvailableAddDevices();
        const selectedInList = availableDevices.filter(d => state.addDeviceDrawer.selectedDeviceIds.includes(d.sn));
        const allSelected = availableDevices.length > 0 && selectedInList.length === availableDevices.length;

        return `
            <!-- Backdrop -->
            <div class="fixed inset-0 bg-black/50 z-40 transition-opacity" onclick="app.toggleAddDeviceDrawer(false)"></div>
            
            <!-- Drawer -->
            <div class="fixed top-0 right-0 h-full w-[480px] bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col animate-slide-in-right">
                <!-- Header -->
                <div class="px-[24px] py-[20px] border-b border-[#e6e8ee] flex justify-between items-center">
                    <h2 class="text-[20px] font-semibold text-[#313949]">Add DERs</h2>
                    <button onclick="app.toggleAddDeviceDrawer(false)" class="text-[#5f646e] hover:text-[#313949]">
                        <i data-lucide="x" class="w-[24px] h-[24px]"></i>
                    </button>
                </div>

                <!-- Search -->
                <div class="px-[24px] pt-[16px] pb-[8px]">
                     <div class="bg-[#f3f3f6] rounded-[4px] flex items-center h-[40px] px-[12px] gap-[8px]">
                        <i data-lucide="search" class="w-[20px] h-[20px] text-[#b5bcc8]"></i>
                        <input 
                            type="text" 
                            id="add-device-search-input"
                            placeholder="Search by SN" 
                            value="${state.addDeviceDrawer.searchQuery}"
                            oninput="app.setAddDeviceSearch(this.value)"
                            class="bg-transparent border-none focus:outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] w-full h-full p-0"
                            autofocus
                        >
                    </div>
                </div>

                <!-- List -->
                <div class="flex-1 overflow-y-auto px-[24px] pb-[24px] pt-0">
                    ${state.addDeviceDrawer.error ? `
                        <div class="mb-[16px] p-[12px] bg-red-50 text-red-600 rounded-[4px] text-[14px]">
                            ${state.addDeviceDrawer.error}
                        </div>
                    ` : ''}

                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="h-[40px] text-[12px] text-[#5f646e] border-b border-[#e6e8ee]">
                                <th class="w-[40px] px-[8px]">
                                    <div class="flex items-center justify-center">
                                        <input type="checkbox"
                                            id="checkbox-all-devices"
                                            ${allSelected ? 'checked' : ''}
                                            class="w-[16px] h-[16px] rounded border-gray-300 text-[#0052ff] focus:ring-[#0052ff]"
                                            onclick="app.toggleAllAddDevices(this.checked)"
                                        >
                                    </div>
                                </th>
                                <th class="px-[16px] font-medium">SN</th>
                                <th class="px-[16px] font-medium">DER Type</th>
                            </tr>
                        </thead>
                        <tbody class="text-[14px] text-[#313949]">
                            ${availableDevices.length > 0 ? availableDevices.map(dev => {
                                const displayType = dev.type === 'Inverter' ? 'Single PV' : (dev.type === 'Battery' ? 'Single ESS' : (dev.type === 'Hybrid' ? 'PV Plus ESS' : (dev.type || '-')));
                                return `
                                <tr class="h-[48px] hover:bg-[#f3f3f6] border-b border-[#e6e8ee] last:border-0 cursor-pointer" onclick="app.toggleDeviceSelection('${dev.sn}')">
                                    <td class="px-[8px]">
                                        <div class="flex items-center justify-center">
                                            <input type="checkbox" 
                                                id="checkbox-${dev.sn}"
                                                ${state.addDeviceDrawer.selectedDeviceIds.includes(dev.sn) ? 'checked' : ''}
                                                class="w-[16px] h-[16px] rounded border-gray-300 text-[#0052ff] focus:ring-[#0052ff]"
                                                onclick="event.stopPropagation(); app.toggleDeviceSelection('${dev.sn}')"
                                            >
                                        </div>
                                    </td>
                                    <td class="px-[16px] font-mono">${dev.sn}</td>
                                    <td class="px-[16px] text-[#5f646e]">${displayType}</td>
                                </tr>
                            `}).join('') : `
                                <tr>
                                    <td colspan="3" class="py-[32px] text-center text-[#5f646e]">
                                        No matching devices found in ${vppState || 'this region'}
                                    </td>
                                </tr>
                            `}
                        </tbody>
                    </table>
                </div>

                <!-- Footer -->
                <div class="px-[24px] py-[20px] border-t border-[#e6e8ee] flex items-center gap-[12px] bg-white">
                    <button onclick="app.toggleAddDeviceDrawer(false)" class="flex-1 h-[32px] px-[12px] flex items-center justify-center bg-white border border-[#e6e8ee] rounded-[4px] text-[14px] text-[#313949] hover:bg-[#f3f3f6] active:bg-[#e6e8ee] transition-colors font-medium leading-[20px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e9f58]/30">
                        Cancel
                    </button>
                    <button id="btn-add-devices-confirm" onclick="app.submitAddDevices()" class="flex-1 h-[32px] px-[12px] flex items-center justify-center bg-[#3ec064] rounded-[4px] text-[14px] text-white hover:bg-[#2e9f58] active:bg-[#1a6e3b] transition-colors font-medium leading-[20px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e9f58]/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-[#3ec064]" ${state.addDeviceDrawer.submitting ? 'disabled' : ''}>
                        ${state.addDeviceDrawer.submitting ? '<i data-lucide="loader-2" class="w-4 h-4 animate-spin mr-2"></i>' : ''}
                        Confirm (${state.addDeviceDrawer.selectedDeviceIds.length})
                    </button>
                </div>
            </div>
        `;
    },

    toggleSidebar() {
        const sidebar = document.getElementById('main-sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        
        if (sidebar && overlay) {
            const isClosed = sidebar.classList.contains('-translate-x-full');
            if (isClosed) {
                sidebar.classList.remove('-translate-x-full');
                overlay.classList.remove('hidden');
                setTimeout(() => overlay.classList.remove('opacity-0'), 10);
            } else {
                sidebar.classList.add('-translate-x-full');
                overlay.classList.add('opacity-0');
                setTimeout(() => overlay.classList.add('hidden'), 300);
            }
        }
    },

    updateBreadcrumbs(viewName) {
        const container = document.getElementById('breadcrumbs');
        if (!container) return;

        const breadcrumbPaths = {
            'overview': [{label: 'Overview'}],
            'electricity_market': [{label: 'Spot Market'}],
            'spot_market': [{label: 'Spot Market'}, {label: 'Spot Price'}],
            'arbitrage_points': [{label: 'Spot Market'}, {label: 'Arbitrage Points'}],
            'trading': [{label: 'Spot Market'}, {label: 'Spot Trading'}],
            'trading_rules': [{label: 'Trading'}, {label: 'Trading Rules'}],
            'trading_events': [{label: 'Trading'}, {label: 'Trading Events'}],
            'smart_feed_in': [{label: 'Smart Feed-in'}],
            'smart_feed_in_rules': [{label: 'Smart Feed-in'}, {label: 'Smart Feed-in Rules'}],
            'smart_feed_in_events': [{label: 'Smart Feed-in'}, {label: 'Smart Feed-in Events'}],
            'cap_service': [{label: 'Cap Service'}],
            'cap_graph': [{label: 'Cap Service'}, {label: 'Cap Graph'}],
            'cap_rules': [{label: 'Cap Service'}, {label: 'Cap Rules'}],
            'cap_events': [{label: 'Cap Service'}, {label: 'Cap Events'}],
            'fcas': [{label: 'FCAS'}],
            'fcas_groups': [{label: 'FCAS'}, {label: 'FCAS Groups'}],
            'fcas_price_availability': [{label: 'FCAS'}, {label: 'Price and Availability'}],
            'reports': [{label: 'Reports'}],
            'reports_vpp_events': [{label: 'Reports'}, {label: 'VPP Events'}],
            'reports_der_events': [{label: 'Reports'}, {label: 'DER Events'}],
            'reports_vpp_event_items': [{label: 'Reports'}, {label: 'VPP Event Items'}],
            'reports_vpp_event_month_summary': [{label: 'Reports'}, {label: 'VPP Event Month Summary'}],
            'reports_terminated': [{label: 'Reports'}, {label: 'Terminated'}],
            'vpp': [{label: 'VPP Management'}],
            'der': [{label: 'DER Management'}],
            'der_ess': [{label: 'DER Management', onclick: "app.navigate('der')"}, {label: 'PV ESS'}],
            'der_pv': [{label: 'DER Management', onclick: "app.navigate('der')"}, {label: 'PV'}],
            'der_ev': [{label: 'DER Management', onclick: "app.navigate('der')"}, {label: 'ESS'}],
            'device_management': [{label: 'System'}, {label: 'DER Access'}],
            'account': [{label: 'System'}, {label: 'Account'}],
            'vpp_details': [
                {label: 'VPP Management', view: 'vpp'}, 
                {label: 'VPP Details'}
            ],
            'system_details': [
                {label: 'System'},
                {label: 'DER Access', view: 'device_management'}, 
                {label: 'Details'}
            ],
            'device_details': [
                {label: 'DER Management', view: 'der'},
                {label: 'PV ESS', view: 'der_ess'}, 
                {label: 'Device Details'}
            ],
        };

        const currentPath = breadcrumbPaths[viewName] || [{label: 'Overview'}];
        const path = [{label: 'Manta', view: 'overview'}, ...currentPath];
        
        let html = '';
        
        path.forEach((item, index) => {
            if (index > 0) {
                html += `<i data-lucide="chevron-right" class="w-3 h-3 text-[#b5bcc8] mx-1"></i>`;
            }
            
            const isLast = index === path.length - 1;
            // const isRoot = index === 0; // Manta - Removed icon logic for design match
            
            if (item.view && !isLast) {
                 const paramsStr = item.params ? `, ${JSON.stringify(item.params).replace(/"/g, "'")}` : '';
                 html += `
                    <button onclick="app.navigate('${item.view}'${paramsStr})" class="flex items-center gap-1.5 text-[#b5bcc8] hover:text-manta-primary transition-colors group">
                        <span class="font-normal">${item.label}</span>
                    </button>
                `;
            } else if (isLast) {
                 html += `<span class="text-[#1c2128] font-normal">${item.label}</span>`;
            } else {
                 html += `<span class="text-[#9ca3af] font-normal">${item.label}</span>`;
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
        if (['spot_market', 'arbitrage_points', 'trading'].includes(viewName)) {
            this.expandSubmenu('electricity-market-submenu');
        }

        // Handle Trading Submenu Expansion
        if (['trading_rules', 'trading_events'].includes(viewName)) {
            this.expandSubmenu('trading-submenu');
        }

        // Handle Smart Feed-in Submenu Expansion
        if (['smart_feed_in_rules', 'smart_feed_in_events'].includes(viewName)) {
            this.expandSubmenu('smart-feed-in-submenu');
        }

        // Handle Cap Service Submenu Expansion
        if (['cap_graph', 'cap_rules', 'cap_events'].includes(viewName)) {
            this.expandSubmenu('cap-service-submenu');
        }

        // Handle FCAS Submenu Expansion
        if (['fcas_groups', 'fcas_price_availability'].includes(viewName)) {
            this.expandSubmenu('fcas-submenu');
        }

        // Handle DER Management Submenu Expansion
        if (['der_ess', 'der_pv', 'der_ev'].includes(viewName)) {
            this.expandSubmenu('der-submenu');
        }

        // Handle Reports Submenu Expansion
        if (['reports_vpp_events', 'reports_der_events', 'reports_vpp_event_items', 'reports_vpp_event_month_summary', 'reports_terminated'].includes(viewName)) {
            this.expandSubmenu('reports-submenu');
        }

        // Handle System Submenu Expansion
        if (['device_management', 'account'].includes(viewName)) {
            this.expandSubmenu('system-submenu');
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
        } else if (viewName === 'arbitrage_points') {
            this.renderArbitragePoints(contentArea);
        } else if (viewName === 'trading') {
            this.renderTradingOverview(contentArea);
        } else if (viewName === 'trading_rules') {
            this.renderTradingRules(contentArea);
        } else if (viewName === 'trading_events') {
            this.renderTradingEvents(contentArea);
        } else if (viewName === 'smart_feed_in_rules') {
            this.renderSmartFeedInRules(contentArea);
        } else if (viewName === 'smart_feed_in_events') {
            this.renderSmartFeedInEvents(contentArea);
        } else if (viewName === 'cap_graph') {
            this.renderCapGraph(contentArea);
        } else if (viewName === 'cap_rules') {
            this.renderCapRules(contentArea);
        } else if (viewName === 'cap_events') {
            this.renderCapEvents(contentArea);
        } else if (viewName === 'fcas_groups') {
            this.renderFcasGroups(contentArea);
        } else if (viewName === 'fcas_price_availability') {
            this.renderFcasPriceAvailability(contentArea);
        } else if (viewName === 'reports_vpp_events') {
            this.renderReportsVppEvents(contentArea);
        } else if (viewName === 'reports_der_events') {
            this.renderReportsDerEvents(contentArea);
        } else if (viewName === 'reports_vpp_event_items') {
            this.renderReportsVppEventItems(contentArea);
        } else if (viewName === 'spot_market') {
            this.renderSpotMarket(contentArea);
        } else if (viewName === 'account') {
            this.renderAccount(contentArea);
        } else if (['electricity_market', 'smart_feed_in', 'cap_service', 'fcas', 'reports', 'reports_vpp_event_month_summary', 'reports_terminated'].includes(viewName)) {
            this.renderPlaceholder(contentArea, titles[viewName]);
        } else if (viewName === 'vpp') {
            this.renderVPP(contentArea);
        } else if (viewName === 'der') {
            this.renderDERManagement(contentArea);
        } else if (['der_ess', 'der_pv', 'der_ev'].includes(viewName)) {
            // Filter devices by type for submenu items
            let type = 'All';
            if (viewName === 'der_ess') type = 'Battery';
            if (viewName === 'der_pv') type = 'Inverter'; // Assuming PV corresponds to Inverter or similar
            if (viewName === 'der_ev') type = 'EV'; // Assuming EV type exists
            
            this.renderDERManagement(contentArea, type);
        } else if (viewName === 'vpp_details') {
            state.vppDetailsTab = 'der-list';
            this.renderVPPDetails(contentArea, params.id);
        } else if (viewName === 'device_management') {
            this.renderDeviceManagement(contentArea);
        } else if (viewName === 'system_details') {
            this.renderSystemDetails(contentArea, params.id);
        } else if (viewName === 'device_details') {
            this.renderDeviceDetails(contentArea, params.sn);
        }

        lucide.createIcons();
    },

    updateVPPListState(key, value) {
        state.vppList[key] = value;
        if (key !== 'currentPage') {
            state.vppList.currentPage = 1;
        }
        this.renderVPP(document.getElementById('content-area'));
    },

    updateSubVPPListState(key, value) {
        state.subVppList[key] = value;
        if (key === 'itemsPerPage') {
            state.subVppList.currentPage = 1;
        }
        this.renderDeviceManagement(document.getElementById('content-area'));
        lucide.createIcons();
    },

    updateDERListState(key, value) {
        state.derListPagination[key] = value;
        if (key === 'itemsPerPage') {
            state.derListPagination.currentPage = 1;
        }
        this.renderVPPDetails(document.getElementById('content-area'), state.selectedVppId);
    },

    renderSpotMarket(container) {
        // Clear any existing interval when re-rendering
        if (this.spotMarketInterval) {
            clearInterval(this.spotMarketInterval);
            this.spotMarketInterval = null;
        }

        container.className = "w-full h-full bg-[#f8f9fb] p-[8px] overflow-y-auto";
        container.innerHTML = `
            <div class="min-h-full flex flex-col">
                <!-- Top Bar -->
                <div class="flex items-center justify-between bg-white px-4 py-3 border-b border-gray-200">
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-medium text-gray-500">Pricing Region:</span>
                            <select id="spot-region-select" class="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-manta-primary focus:border-manta-primary block p-2">
                                <option>NSW</option>
                                <option>VIC</option>
                                <option>QLD</option>
                                <option>SA</option>
                                <option>TAS</option>
                            </select>
                        </div>
                        <div class="flex p-1 bg-gray-100 rounded-lg">
                            <button id="spot-tab-realtime" class="px-3 py-1.5 text-sm font-medium text-gray-900 bg-white rounded shadow-sm transition-all">Real-time</button>
                            <button id="spot-tab-historical" class="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Historical</button>
                        </div>
                        <div id="spot-date-picker-container" class="hidden flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
                            <span class="text-sm font-medium text-gray-500">Date:</span>
                            <input type="date" id="spot-date-picker" class="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-manta-primary focus:border-manta-primary block p-2">
                        </div>

                    </div>

                </div>

                <!-- Main Content -->
                <div class="flex flex-col gap-4">
                    <div class="bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col h-[500px] shrink-0 overflow-hidden">
                        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 class="text-lg font-semibold text-gray-900">Spot Price</h3>
                            <div class="flex items-center gap-2">
                                <!-- Chart Settings -->
                                <div class="relative">
                                    <button id="chart-settings-btn" title="Settings" class="p-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center">
                                        <i data-lucide="settings" class="w-4 h-4"></i>
                                    </button>
                                    <!-- Settings Menu -->
                                    <div id="chart-settings-menu" class="hidden absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-2">
                                        <div class="space-y-1">
                                            <!-- Weather -->
                                            <label class="block cursor-pointer select-none">
                                                <input type="checkbox" id="setting-weather" class="peer sr-only">
                                                <div class="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-50 peer-checked:bg-gray-100 peer-checked:text-[#3ec064] peer-checked:[&_.check-icon]:opacity-100 transition-colors">
                                                    <div class="check-icon w-4 h-4 flex items-center justify-center opacity-0 transition-opacity">
                                                        <i data-lucide="check" class="w-3 h-3"></i>
                                                    </div>
                                                    <span class="text-sm">Weather</span>
                                                </div>
                                            </label>
                                            
                                            <!-- Arbitrage Point -->
                                            <div class="relative group">
                                                <label class="block cursor-pointer select-none">
                                                    <input type="checkbox" id="setting-arbitrage" class="peer sr-only">
                                                    <div class="flex items-center justify-between px-2 py-1.5 rounded hover:bg-gray-50 peer-checked:bg-gray-100 peer-checked:text-[#3ec064] peer-checked:[&_.check-icon]:opacity-100 transition-colors">
                                                        <div class="flex items-center gap-2">
                                                            <div class="check-icon w-4 h-4 flex items-center justify-center opacity-0 transition-opacity">
                                                                <i data-lucide="check" class="w-3 h-3"></i>
                                                            </div>
                                                            <span class="text-sm">Arbitrage Point</span>
                                                        </div>
                                                        <i data-lucide="chevron-right" class="w-4 h-4 text-gray-400"></i>
                                                    </div>
                                                </label>
                                                
                                                <!-- Sub Menu for Arbitrage Point -->
                                                 <div id="setting-arbitrage-submenu" class="hidden absolute right-full top-0 mr-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
                                                    <label class="block cursor-pointer select-none">
                                                        <input type="radio" name="arbitrage-signal" value="forecast" class="peer sr-only" checked>
                                                        <div class="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-50 peer-checked:bg-gray-100 peer-checked:text-[#3ec064] peer-checked:[&_.check-icon]:opacity-100 transition-colors">
                                                            <div class="check-icon w-4 h-4 flex items-center justify-center opacity-0 transition-opacity">
                                                                <i data-lucide="check" class="w-3 h-3"></i>
                                                            </div>
                                                            <span class="text-sm">Signal by Forecast</span>
                                                        </div>
                                                    </label>
                                                    <label class="block cursor-pointer select-none">
                                                        <input type="radio" name="arbitrage-signal" value="spot" class="peer sr-only">
                                                        <div class="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-50 peer-checked:bg-gray-100 peer-checked:text-[#3ec064] peer-checked:[&_.check-icon]:opacity-100 transition-colors">
                                                            <div class="check-icon w-4 h-4 flex items-center justify-center opacity-0 transition-opacity">
                                                                <i data-lucide="check" class="w-3 h-3"></i>
                                                            </div>
                                                            <span class="text-sm">Signal by Spot</span>
                                                        </div>
                                                    </label>
                                                 </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button title="Fullscreen" class="p-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center">
                                    <i data-lucide="maximize" class="w-4 h-4"></i>
                                </button>
                            </div>
                        </div>
                        <!-- Top Stats Bar -->
                        <div class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-8">
                            <!-- Market Status Group -->
                            <div class="flex items-center gap-8">
                                <div>
                                    <p class="text-sm text-gray-500 mb-1">Spot</p>
                                    <div class="flex items-end gap-2">
                                        <span id="stat-spot-price" class="text-2xl font-bold text-gray-900">0.55</span>
                                        <span class="text-sm text-gray-500 mb-1">$/MWh</span>
                                    </div>
                                </div>
                                <div class="h-8 w-px bg-gray-200"></div>
                                <div>
                                    <p class="text-sm text-gray-500 mb-1">Pre-Dispatch</p>
                                    <div class="flex items-end gap-2">
                                        <span id="stat-predispatch-price" class="text-2xl font-bold text-gray-900">0.68</span>
                                        <span class="text-sm text-gray-500 mb-1">$/MWh</span>
                                    </div>
                                </div>
                                <div class="h-8 w-px bg-gray-200"></div>
                                <div>
                                    <p class="text-sm text-gray-500 mb-1">Forecast Spot</p>
                                    <div class="flex items-end gap-2">
                                        <span id="stat-forecast-spot-price" class="text-xl font-bold text-manta-primary">0.72</span>
                                        <span class="text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded">↑ 5.2%</span>
                                    </div>
                                </div>
                                <div class="h-8 w-px bg-gray-200"></div>
                                <div>
                                    <p class="text-sm text-gray-500 mb-1">Available Discharge</p>
                                    <div class="flex items-end gap-2">
                                        <span class="text-xl font-bold text-gray-900">12.5</span>
                                        <span class="text-sm text-gray-500 mb-1">MWh</span>
                                    </div>
                                </div>
                                <div class="h-8 w-px bg-gray-200"></div>
                                <div>
                                    <p class="text-sm text-gray-500 mb-1">Available Charge</p>
                                    <div class="flex items-end gap-2">
                                        <span class="text-xl font-bold text-gray-900">8.2</span>
                                        <span class="text-sm text-gray-500 mb-1">MWh</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Trading Performance Group -->
                            <div id="trading-opportunities-stats" class="hidden flex items-center gap-8">
                                <div>
                                    <p class="text-sm text-gray-500 mb-1">Trading Opportunities</p>
                                    <p class="font-medium text-lg">3 <span class="text-gray-400 text-sm font-normal">(2 Captured)</span></p>
                                </div>
                                <div class="h-8 w-px bg-gray-200"></div>
                                <div>
                                    <p class="text-sm text-gray-500 mb-1">Est. Revenue</p>
                                    <p class="text-lg font-bold text-green-600">+$1,520</p>
                                </div>
                            </div>
                        </div>

                        <!-- Chart Area -->
                        <div id="spot-chart-wrapper" class="flex-1 bg-white relative flex flex-col">
                            <div id="spot-market-chart" class="w-full h-full"></div>
                        </div>
                    </div>

                    <!-- Trading Events List -->
                    <div class="bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col overflow-hidden">
                        <div class="px-6 py-4 border-b border-gray-200">
                            <h3 class="text-lg font-semibold text-gray-900">Trading Events</h3>
                        </div>
                        <div>
                            ${(() => {
                                const events = MOCK_DATA.tradingEvents || [];
                                const recentEvents = events;
                                if (events.length === 0) {
                                    return `
                                        <div class="h-full flex items-center justify-center p-[20px]">
                                            <div class="bg-[#f3f3f6] w-full rounded-[6px] px-[16px] py-[20px] flex flex-col items-center text-center gap-[10px]">
                                                <div class="relative w-[88px] h-[88px]">
                                                    <i data-lucide="activity" class="w-full h-full text-[#b5bcc8]"></i>
                                                </div>
                                                <p class="font-['Roboto'] font-semibold text-[16px] leading-[20px] text-[#313949]">No Events Created</p>
                                                <p class="font-['Roboto'] text-[13px] leading-[18px] text-[#7a828f]">Trading events will appear here once available.</p>
                                            </div>
                                        </div>
                                    `;
                                }
                                return `
                                <table class="w-full text-sm text-left">
                                    <thead class="text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100 bg-gray-50 sticky top-0 z-10">
                                        <tr>
                                            <th class="px-4 py-2 font-medium">Date</th>
                                            <th class="px-4 py-2 font-medium">VPP</th>
                                            <th class="px-4 py-2 font-medium">Pricing Region</th>
                                            <th class="px-4 py-2 font-medium">Trigger From</th>
                                            <th class="px-4 py-2 font-medium">Trigger Condition</th>
                                            <th class="px-4 py-2 font-medium">Event</th>
                                            <th class="px-4 py-2 font-medium">Start Time</th>
                                            <th class="px-4 py-2 font-medium">End Time</th>
                                            <th class="px-4 py-2 font-medium">Rated Power</th>
                                            <th class="px-4 py-2 font-medium">Volume</th>
                                            <th class="px-4 py-2 font-medium">Spot</th>
                                            <th class="px-4 py-2 font-medium">Status</th>
                                            <th class="px-4 py-2 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-100">
                                        ${recentEvents.map(event => {
                                            const matchedRule = state.tradingRules.find(rule => {
                                                const ruleNames = [];
                                                if (rule.vpp) ruleNames.push(rule.vpp);
                                                if (rule.applicableVpps && rule.applicableVpps.length) {
                                                    ruleNames.push(...rule.applicableVpps.map(v => v.name).filter(Boolean));
                                                }
                                                return ruleNames.some(name => name.toLowerCase() === String(event.vppName || '').toLowerCase());
                                            });
                                            const rawTriggerType = matchedRule?.triggerType || event.triggerType;
                                            const triggerType = rawTriggerType === 'Price' ? 'Spot Price' : (rawTriggerType === 'Arbitrage' ? 'Arbitrage Point' : rawTriggerType || '-');
                                            const timeParts = event.timeRange ? event.timeRange.split(' - ') : [];
                                            const startTime = timeParts[0] || '-';
                                            const endTime = timeParts[1] || '-';
                                            const power = typeof event.power === 'number' ? `${event.power.toFixed(2)} kW` : (event.power || '-');
                                            const volume = event.volume || '-';
                                            const spot = typeof event.price === 'number' ? `$${event.price.toFixed(2)} /MWh` : (event.spot || '-');
                                            return `
                                            <tr class="hover:bg-gray-50 transition-colors">
                                                <td class="px-4 py-3 text-gray-600">${event.date ? event.date.split(' ')[0] : '-'}</td>
                                                <td class="px-4 py-3 text-gray-900 font-medium">${event.vppName || '-'}</td>
                                                <td class="px-4 py-3 text-gray-600">${event.state || '-'}</td>
                                                <td class="px-4 py-3 text-gray-600">${triggerType}</td>
                                                <td class="px-4 py-3 text-gray-600">${matchedRule ? (matchedRule.triggerType === 'Price' ? `${matchedRule.priceSource} ${matchedRule.condition} ${matchedRule.price} $/MW` : `${matchedRule.priceSource} = ${matchedRule.arbitrageSignal}`) : '-'}</td>
                                                <td class="px-4 py-3 text-gray-600">${event.eventType || '-'}</td>
                                                <td class="px-4 py-3 text-gray-600">${startTime}</td>
                                                <td class="px-4 py-3 text-gray-600">${endTime}</td>
                                                <td class="px-4 py-3 text-gray-600">${power}</td>
                                                <td class="px-4 py-3 text-gray-600">${volume}</td>
                                                <td class="px-4 py-3 text-gray-600">${spot}</td>
                                                <td class="px-4 py-3">
                                                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${event.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}">${event.status || '-'}</span>
                                                </td>
                                                <td class="px-4 py-3">
                                                    <button class="p-1 text-gray-500 hover:text-manta-primary transition-colors" title="View Details">
                                                        <i data-lucide="eye" class="w-4 h-4"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        `;
                                        }).join('')}
                                    </tbody>
                                </table>`;
                            })()}
                        </div>
                    </div>
<!-- Pagination removed -->
                </div>


            </div>
        `;

        // Initialize ECharts
        setTimeout(() => {
            const chartDom = document.getElementById('spot-market-chart');
            if (!chartDom) return;
            
            const myChart = echarts.init(chartDom);
            
            // UI Elements
            const realTimeTab = document.getElementById('spot-tab-realtime');
            const historicalTab = document.getElementById('spot-tab-historical');
            const datePickerContainer = document.getElementById('spot-date-picker-container');
            const datePicker = document.getElementById('spot-date-picker');
            
            // Date Picker Setup
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];
            
            if (datePicker) {
                datePicker.max = yesterdayStr;
                datePicker.value = yesterdayStr;
            }

            // State
            let currentMode = 'realtime'; // 'realtime' | 'historical'
            let currentData = null;

            // Generate Data Function
            function generateData(dateStr, isRealtime) {
                const timestamps = [];
                const prices = [];
                const predictions = [];
                const dispatchPrices = [];
                const tradingPrices = [];
                const forecastTradingPrices = [];
                const signals = []; // Keep for backward compatibility if needed, or remove
                const forecastSignals = [];
                const spotSignals = [];
                
                // Seed based on date string for consistency in historical mode
                let seed = 0;
                for (let i = 0; i < dateStr.length; i++) {
                    seed += dateStr.charCodeAt(i);
                }
                const random = () => {
                    const x = Math.sin(seed++) * 10000;
                    return x - Math.floor(x);
                };

                // Australian Market Price Profile (Duck Curve)
                // Key points: Time (h) -> Price (normalized 0-1 approx)
                const keyPoints = [
                    { h: 0, p: 0.35 },   // Overnight stable
                    { h: 5, p: 0.40 },   // Pre-dawn
                    { h: 7, p: 0.85 },   // Morning Peak
                    { h: 9, p: 0.40 },   // Solar ramp up
                    { h: 12, p: 0.05 },  // Solar Peak / Price Trough
                    { h: 14, p: 0.15 },  // Solar fading
                    { h: 17, p: 0.60 },  // Evening ramp
                    { h: 18.5, p: 0.95 }, // Evening Peak
                    { h: 21, p: 0.55 },  // Demand drop
                    { h: 24, p: 0.35 }   // Overnight return
                ];

                const getBasePrice = (h) => {
                    for (let k = 0; k < keyPoints.length - 1; k++) {
                        if (h >= keyPoints[k].h && h <= keyPoints[k+1].h) {
                            const t = (h - keyPoints[k].h) / (keyPoints[k+1].h - keyPoints[k].h);
                            // Cubic interpolation for smoother curve
                            const t2 = t * t;
                            const t3 = t2 * t;
                            const ease = 3 * t2 - 2 * t3; 
                            return keyPoints[k].p + ease * (keyPoints[k+1].p - keyPoints[k].p);
                        }
                    }
                    return 0.35;
                };

                let currentTradingPrice = 0.5;
                
                // 24 hours * 12 intervals (5 mins) = 288 points
                const points = 288;
                
                const now = new Date();
                const currentHour = now.getHours();
                const currentMinute = now.getMinutes();
                const currentTimeIndex = (currentHour * 12) + Math.floor(currentMinute / 5);

                for (let i = 0; i < points; i++) {
                    const hour = Math.floor(i / 12);
                    const minute = (i % 12) * 5;
                    const timeVal = hour + minute / 60;
                    const timeStr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
                    const fullTimeStr = `${dateStr} ${timeStr}`;
                    timestamps.push(fullTimeStr);
                    
                    // Simulate price curve with AU market characteristics
                    const baseVal = getBasePrice(timeVal);
                    const noise = (random() - 0.5) * 0.15; // Increased volatility
                    
                    // Add occasional price spikes (characteristic of NEM)
                    let spike = 0;
                    if (random() > 0.97) {
                        spike = random() * 0.4; // Occasional upward spike
                    }
                    
                    const val = Math.max(-0.1, baseVal + noise + spike); // Allow slightly negative prices
                    
                    const predVal = val + (random() - 0.5) * 0.02; // Forecast slightly different
                    if (isRealtime && i > currentTimeIndex + 6) {
                        predictions.push(null);
                    } else {
                        predictions.push(predVal.toFixed(3));
                    }

                    // Dispatch Price (5-min granularity)
                    const dispatchVal = val + (random() - 0.5) * 0.04;
                    if (isRealtime && i > currentTimeIndex + 1) {
                        dispatchPrices.push(null);
                    } else {
                        dispatchPrices.push(dispatchVal.toFixed(3));
                    }

                    // Spot & Forecast Spot (5-min granularity)
                    currentTradingPrice = val + (random() - 0.5) * 0.08;
                    const forecastTradingVal = currentTradingPrice + (random() - 0.5) * 0.05;

                    if (isRealtime && i > currentTimeIndex) {
                        tradingPrices.push(null);
                    } else {
                        tradingPrices.push(currentTradingPrice.toFixed(3));
                    }

                    if (isRealtime && i > currentTimeIndex + 1) {
                        forecastTradingPrices.push(null);
                    } else {
                        forecastTradingPrices.push(forecastTradingVal.toFixed(3));
                    }
                    
                    // Real-time price logic
                    if (isRealtime) {
                        if (i <= currentTimeIndex) {
                            prices.push(val.toFixed(3));
                        } else {
                            prices.push(null); 
                        }
                    } else {
                        // Historical: all prices available
                        prices.push(val.toFixed(3));
                    }
                    
                    // Random signals
                    if (i % 50 === 0 && random() > 0.5 && (!isRealtime || i <= currentTimeIndex)) {
                        signals.push({
                            name: random() > 0.5 ? 'Buy' : 'Sell',
                            coord: [fullTimeStr, val],
                            value: random() > 0.5 ? 'B' : 'S',
                            itemStyle: { color: random() > 0.5 ? '#10B981' : '#EF4444' }
                        });
                    }

                    // Generate Forecast Signals (can cover future)
                    if (i % 25 === 0 && random() > 0.6) {
                        const types = ['Discharge', 'Normal', 'Charge', 'FCAS', 'Abnormal'];
                        const type = types[Math.floor(random() * types.length)];
                        
                        let color, value;
                        switch (type) {
                            case 'Discharge': color = '#EF4444'; value = 'D'; break; // Red
                            case 'Charge': color = '#10B981'; value = 'C'; break;    // Green
                            case 'Normal': color = '#9CA3AF'; value = 'N'; break;    // Gray
                            case 'FCAS': color = '#8B5CF6'; value = 'F'; break;      // Purple
                            case 'Abnormal': color = '#F59E0B'; value = 'A'; break;  // Amber
                        }

                        forecastSignals.push({
                            name: type,
                            coord: [fullTimeStr, forecastTradingVal], // Align with Forecast Spot series data
                            value: value,
                            itemStyle: { color: color },
                            type: type // Used for filtering
                        });
                    }

                    // Generate Spot Signals (historical/realtime up to now)
                    if (i % 35 === 0 && random() > 0.6 && (!isRealtime || i <= currentTimeIndex)) {
                        const types = ['Discharge', 'Normal', 'Charge', 'FCAS', 'Abnormal'];
                        const type = types[Math.floor(random() * types.length)];
                        
                        let color, value;
                        switch (type) {
                            case 'Discharge': color = '#EF4444'; value = 'D'; break; // Red
                            case 'Charge': color = '#10B981'; value = 'C'; break;    // Green
                            case 'Normal': color = '#9CA3AF'; value = 'N'; break;    // Gray
                            case 'FCAS': color = '#8B5CF6'; value = 'F'; break;      // Purple
                            case 'Abnormal': color = '#F59E0B'; value = 'A'; break;  // Amber
                        }

                        spotSignals.push({
                            name: type,
                            coord: [fullTimeStr, currentTradingPrice], // Align with Spot series data
                            value: value,
                            itemStyle: { color: color },
                            type: type // Used for filtering
                        });
                    }
                }
                
                return { timestamps, prices, predictions, dispatchPrices, tradingPrices, forecastTradingPrices, signals, forecastSignals, spotSignals };
            }

            function updateChart() {
                const dateStr = currentMode === 'realtime' 
                    ? new Date().toISOString().split('T')[0] 
                    : (datePicker ? datePicker.value : new Date().toISOString().split('T')[0]);
                
                currentData = generateData(dateStr, currentMode === 'realtime');
                
                // Update Market Status Stats
                if (currentMode === 'realtime') {
                    const now = new Date();
                    const currentHour = now.getHours();
                    const currentMinute = now.getMinutes();
                    const currentTimeIndex = (currentHour * 12) + Math.floor(currentMinute / 5);
                    
                    const spotVal = currentData.tradingPrices[currentTimeIndex];
                    const preDispatchVal = currentData.dispatchPrices[currentTimeIndex];
                    const forecastVal = currentData.forecastTradingPrices[currentTimeIndex + 1];

                    const spotEl = document.getElementById('stat-spot-price');
                    const preDispatchEl = document.getElementById('stat-predispatch-price');
                    const forecastEl = document.getElementById('stat-forecast-spot-price');

                    if (spotEl) spotEl.textContent = spotVal || '-';
                    if (preDispatchEl) preDispatchEl.textContent = preDispatchVal || '-';
                    if (forecastEl) forecastEl.textContent = forecastVal || '-';
                }

                // Filter Arbitrage Signals
                const arbitrageEnabled = document.getElementById('setting-arbitrage')?.checked;
                const selectedArbitrage = document.querySelector('input[name="arbitrage-signal"]:checked');
                const signalType = selectedArbitrage ? selectedArbitrage.value : 'forecast';
                
                const rawSignals = (arbitrageEnabled && (signalType === 'forecast' ? currentData.forecastSignals : currentData.spotSignals)) || [];
                const displaySignals = [];
                let lastType = null;
                
                if (rawSignals) {
                    rawSignals.forEach(signal => {
                        if (signal.type !== lastType) {
                            displaySignals.push(signal);
                            lastType = signal.type;
                        }
                    });
                }

                const option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { type: 'cross' },
                        formatter: function (params) {
                            let html = `<div class="font-bold mb-1">${params[0].axisValue}</div>`;
                            const dataIndex = params[0].dataIndex;
                            
                            // Add Pre-Dispatch
                            const dispatch = params.find(p => p.seriesName === 'Pre-Dispatch');
                            if (dispatch && dispatch.value !== undefined && dispatch.value !== null) {
                                html += `<div class="flex justify-between gap-4 text-xs">
                                    <span style="color:${dispatch.color}">${dispatch.marker} Pre-Dispatch</span>
                                    <span class="font-mono font-bold">${dispatch.value}</span>
                                </div>`;
                            }

                            // Add Spot
                            const trading = params.find(p => p.seriesName === 'Spot');
                            if (trading && trading.value !== undefined && trading.value !== null) {
                                html += `<div class="flex justify-between gap-4 text-xs">
                                    <span style="color:${trading.color}">${trading.marker} Spot</span>
                                    <span class="font-mono font-bold">${trading.value}</span>
                                </div>`;
                            }

                            // Add Forecast Spot
                            const forecastTrading = params.find(p => p.seriesName === 'Forecast Spot');
                            if (forecastTrading && forecastTrading.value !== undefined && forecastTrading.value !== null) {
                                html += `<div class="flex justify-between gap-4 text-xs">
                                    <span style="color:${forecastTrading.color}">${forecastTrading.marker} Forecast Spot</span>
                                    <span class="font-mono font-bold">${forecastTrading.value}</span>
                                </div>`;
                            }
                            
                            // Add Arbitrage Signal
                            const currentTimestamp = params[0].axisValue;
                            const signal = displaySignals.find(s => s.coord[0] === currentTimestamp);
                            if (signal) {
                                html += `<div class="mt-2 pt-2 border-t border-gray-200 flex justify-between gap-4 text-xs">
                                    <span class="font-bold text-gray-600">Signal</span>
                                    <span class="font-bold" style="color:${signal.itemStyle.color}">${signal.type}</span>
                                </div>`;
                            }

                            return html;
                        }
                    },
                    axisPointer: {
                        link: { xAxisIndex: 'all' }
                    },
                    grid: [
                        {
                            left: '50px',
                            right: '50px',
                            top: '10%',
                            bottom: '60px'
                        }
                    ],
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: currentData.timestamps,
                            axisLine: { show: false },
                            axisTick: { show: false },
                            axisLabel: { 
                                show: true, 
                                color: '#9ca3af', 
                                margin: 10,
                                formatter: function(value) {
                                    // Extract HH:mm from "YYYY-MM-DD HH:mm"
                                    if (!value) return '';
                                    const parts = value.split(' ');
                                    return parts.length > 1 ? parts[1] : value;
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            scale: true,
                            splitLine: { show: true, lineStyle: { type: 'dashed', color: '#e5e7eb' } }
                        }
                    ],
                    series: [
                        // Pre-Dispatch
                        {
                            name: 'Pre-Dispatch',
                            type: 'line',
                            data: currentData.dispatchPrices,
                            itemStyle: { color: '#2563eb' }, // Blue
                            lineStyle: { width: 1.5 },
                            showSymbol: false
                        },
                        // Forecast Spot (Stack Base)
                        {
                            name: 'Forecast Spot',
                            type: 'bar',
                            stack: 'analysis',
                            data: currentData.forecastTradingPrices,
                            itemStyle: { color: '#059669' }, // Darker Emerald
                            barWidth: '30%',
                            z: 2,
                            showSymbol: false
                        },
                        // Spot (Background)
                        {
                            name: 'Spot',
                            type: 'bar',
                            data: currentData.tradingPrices,
                            itemStyle: { color: 'rgba(200, 202, 207, 1)' }, // Background gray style with 25% opacity
                            barWidth: '75%',
                            barGap: '-175%', // -100% - (75-30)/2/30 * 100% = -175%
                            z: 1,
                            showSymbol: false,
                            markPoint: {
                                data: displaySignals,
                                symbol: 'pin',
                                symbolSize: 40,
                                label: {
                                    show: true,
                                    formatter: function(params) {
                                        return params.data.value;
                                    },
                                    color: '#fff',
                                    fontSize: 12,
                                    fontWeight: 'bold'
                                },
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowColor: 'rgba(0,0,0,0.3)'
                                }
                            }
                        },
                    ]
                };
                
                myChart.setOption(option);
            }

            // Arbitrage Signal Interaction
            const arbitrageRadios = document.querySelectorAll('input[name="arbitrage-signal"]');
            arbitrageRadios.forEach(radio => {
                radio.addEventListener('change', () => {
                    updateChart();
                });
            });
            
            // Resize handler
            window.addEventListener('resize', () => myChart.resize());

            // Refresh Interval Helper
            const startRefreshInterval = () => {
                if (this.spotMarketInterval) clearInterval(this.spotMarketInterval);
                this.spotMarketInterval = setInterval(updateChart, 300000); // 5 minutes
            };

            const stopRefreshInterval = () => {
                if (this.spotMarketInterval) {
                    clearInterval(this.spotMarketInterval);
                    this.spotMarketInterval = null;
                }
            };

            // Event Listeners
            const settingsBtn = document.getElementById('chart-settings-btn');
            const settingsMenu = document.getElementById('chart-settings-menu');
            const arbitrageCheckbox = document.getElementById('setting-arbitrage');
            const arbitrageSubmenu = document.getElementById('setting-arbitrage-submenu');

            if (settingsBtn && settingsMenu) {
                settingsBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    settingsMenu.classList.toggle('hidden');
                });

                document.addEventListener('click', (e) => {
                    if (!settingsMenu.contains(e.target) && !settingsBtn.contains(e.target)) {
                        settingsMenu.classList.add('hidden');
                    }
                });
            }

            if (arbitrageCheckbox && arbitrageSubmenu) {
                arbitrageCheckbox.addEventListener('change', (e) => {
                    const tradingStats = document.getElementById('trading-opportunities-stats');
                    if (e.target.checked) {
                        arbitrageSubmenu.classList.remove('hidden');
                        if (tradingStats) tradingStats.classList.remove('hidden');
                    } else {
                        arbitrageSubmenu.classList.add('hidden');
                        if (tradingStats) tradingStats.classList.add('hidden');
                    }
                    updateChart(); // Trigger chart update to show/hide signals
                });
            }

            // Weather Popup Logic
            const weatherCheckbox = document.getElementById('setting-weather');
            const spotChartWrapper = document.getElementById('spot-chart-wrapper');
            const regionSelect = document.getElementById('spot-region-select');

            const getMockWeatherData = (region) => {
                const cities = { 'NSW': 'Sydney', 'VIC': 'Melbourne', 'QLD': 'Brisbane', 'SA': 'Adelaide', 'TAS': 'Hobart' };
                return {
                    current: {
                        city: cities[region] || region,
                        temp: Math.floor(20 + Math.random() * 15),
                        icon: ['sun', 'cloud', 'cloud-rain'][Math.floor(Math.random() * 3)],
                        desc: ['Sunny', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 3)],
                        humidity: 60 + Math.floor(Math.random() * 20),
                        wind: 10 + Math.floor(Math.random() * 15),
                        feelsLike: 25 + Math.floor(Math.random() * 10)
                    },
                    alerts: Math.random() > 0.5 ? [
                        { level: 'high', type: 'Heat Wave', start: '12:00', end: '18:00', desc: 'Severe heat wave warning.' },
                        { level: 'medium', type: 'Strong Wind', start: '14:00', end: '20:00', desc: 'Gusts up to 60km/h.' }
                    ] : []
                };
            };

            const hideWeatherPopup = () => {
                const popup = document.getElementById('weather-popup');
                if (popup) popup.remove();
                if (weatherCheckbox && weatherCheckbox.checked) {
                    weatherCheckbox.checked = false;
                    // Dispatch change to sync state, but ensure we don't cause a loop if needed.
                    // The 'change' listener removes the popup if unchecked.
                    weatherCheckbox.dispatchEvent(new Event('change'));
                }
            };

            const renderWeatherPopup = async () => {
                const region = regionSelect ? regionSelect.value : 'NSW';
                let popup = document.getElementById('weather-popup');
                if (popup) popup.remove();

                popup = document.createElement('div');
                popup.id = 'weather-popup';
                popup.className = 'absolute top-0 left-0 mt-2 ml-2 w-[320px] bg-white rounded-lg shadow-xl border border-gray-200 z-[1050] overflow-hidden animate-in fade-in zoom-in-95 duration-200 group';
                popup.innerHTML = `
                    <div class="p-4 flex items-center justify-center h-40">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-manta-primary"></div>
                    </div>
                `;
                if (spotChartWrapper) spotChartWrapper.appendChild(popup);

                try {
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 800));
                    const data = getMockWeatherData(region);

                    popup.innerHTML = `
                        <button id="weather-popup-close" class="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded hover:bg-black/10 transition-all text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 z-10">
                            <i data-lucide="x" class="w-4 h-4"></i>
                        </button>
                        <div class="p-4 flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="flex flex-col">
                                    <span class="text-sm font-medium text-gray-700 mb-1">${data.current.city}</span>
                                    <span class="text-4xl font-bold text-gray-900">${data.current.temp}°</span>
                                    <span class="text-sm text-gray-500">${data.current.desc}</span>
                                </div>
                                <i data-lucide="${data.current.icon}" class="w-16 h-16 text-yellow-500 stroke-1"></i>
                            </div>
                            <div class="space-y-1 text-xs text-gray-500">
                                <div class="flex items-center gap-1"><i data-lucide="droplets" class="w-3 h-3"></i> ${data.current.humidity}%</div>
                                <div class="flex items-center gap-1"><i data-lucide="wind" class="w-3 h-3"></i> ${data.current.wind}km/h</div>
                                <div class="flex items-center gap-1"><i data-lucide="thermometer" class="w-3 h-3"></i> ${data.current.feelsLike}°</div>
                            </div>
                        </div>
                        <div class="px-4 pb-4">
                            <h4 class="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wider">24H Major Changes</h4>
                            <div class="space-y-2">
                                ${data.alerts.length > 0 ? data.alerts.map(alert => `
                                    <div class="flex gap-2 p-2 rounded bg-gray-50 border border-gray-100">
                                        <div class="w-1 rounded-full ${alert.level === 'high' ? 'bg-red-500' : 'bg-orange-500'}"></div>
                                        <div class="flex-1 min-w-0">
                                            <div class="flex items-center justify-between mb-0.5">
                                                <span class="text-xs font-medium text-gray-900 truncate">${alert.type}</span>
                                                <span class="text-xs text-gray-400 whitespace-nowrap">${alert.start}-${alert.end}</span>
                                            </div>
                                            <p class="text-[10px] text-gray-500 leading-tight line-clamp-2">${alert.desc}</p>
                                        </div>
                                    </div>
                                `).join('') : '<div class="text-xs text-gray-400 italic">No major weather changes expected.</div>'}
                            </div>
                        </div>
                    `;
                    lucide.createIcons();

                    const closeBtn = document.getElementById('weather-popup-close');
                    if (closeBtn) {
                        closeBtn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            hideWeatherPopup();
                        });
                    }

                } catch (e) {
                    popup.innerHTML = `
                        <div class="p-4 flex flex-col items-center justify-center h-40 text-center">
                            <p class="text-sm text-gray-500 mb-3">Weather data fetch failed</p>
                            <button onclick="document.getElementById('setting-weather').dispatchEvent(new Event('change'))" class="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 transition-colors">Retry</button>
                        </div>
                    `;
                }
            };

            if (weatherCheckbox) {
                weatherCheckbox.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        renderWeatherPopup();
                    } else {
                        const popup = document.getElementById('weather-popup');
                        if (popup) popup.remove();
                    }
                });
            }

            if (regionSelect) {
                regionSelect.addEventListener('change', () => {
                    if (weatherCheckbox && weatherCheckbox.checked) {
                        renderWeatherPopup();
                    }
                });
            }

            if (realTimeTab && historicalTab) {
                realTimeTab.addEventListener('click', () => {
                    currentMode = 'realtime';
                    realTimeTab.className = "px-3 py-1.5 text-sm font-medium text-gray-900 bg-white rounded shadow-sm transition-all";
                    historicalTab.className = "px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors";
                    if (datePickerContainer) datePickerContainer.classList.add('hidden');
                    updateChart();
                    startRefreshInterval();
                });

                historicalTab.addEventListener('click', () => {
                    currentMode = 'historical';
                    historicalTab.className = "px-3 py-1.5 text-sm font-medium text-gray-900 bg-white rounded shadow-sm transition-all";
                    realTimeTab.className = "px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors";
                    if (datePickerContainer) datePickerContainer.classList.remove('hidden');
                    updateChart();
                    stopRefreshInterval();
                });
            }

            if (datePicker) {
                datePicker.addEventListener('change', updateChart);
            }
            
            // Initial Chart Load
            updateChart();
            if (currentMode === 'realtime') {
                startRefreshInterval();
            }
            
            // Events
            myChart.on('dblclick', function (params) {
                if (params.componentType === 'markPoint') {
                    // Mock jump to strategy
                    alert(`Jump to Strategy Orchestration: View logic for ${params.name} signal (Price: ${params.data.coord[1]})`);
                }
            });
            
        }, 100);
        
        lucide.createIcons();
    },

    renderCapGraph(container) {
        const { selectedState, selectedDate, forecastInterval } = state.capGraph;
        const metrics = MOCK_DATA.capGraph.metrics[selectedState];
        const forecasts = MOCK_DATA.capGraph.forecasts;
        const chartData = MOCK_DATA.capGraph.chartData;

        container.className = "w-full h-full bg-[#f8f9fb] p-[8px]";
        container.innerHTML = `
            <div class="space-y-6 h-full flex flex-col">
                <!-- Header Controls -->
                <div class="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div class="flex items-center gap-2">
                        ${['VIC', 'SA', 'NSW', 'QLD'].map(s => `
                            <button onclick="app.updateCapGraphState('selectedState', '${s}')" 
                                class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedState === s ? 'bg-manta-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">
                                ${s}
                            </button>
                        `).join('')}
                    </div>
                    <div class="flex items-center gap-2">
                        <button class="p-1.5 text-gray-400 hover:text-gray-600"><i data-lucide="chevron-left" class="w-4 h-4"></i></button>
                        <div class="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700">
                            <i data-lucide="calendar" class="w-4 h-4 text-gray-400"></i>
                            <span>12/01/2026</span>
                        </div>
                        <button class="p-1.5 text-gray-400 hover:text-gray-600"><i data-lucide="chevron-right" class="w-4 h-4"></i></button>
                    </div>
                </div>

                <!-- Metrics Cards -->
                <div class="grid grid-cols-5 gap-4">
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
                        <p class="text-sm text-gray-500 mb-1">Online/Total DERs</p>
                        <p class="text-xl font-bold text-manta-primary">${metrics.online} / ${metrics.total}</p>
                    </div>
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
                        <p class="text-sm text-gray-500 mb-1">Inverter Power</p>
                        <p class="text-xl font-bold text-manta-primary">${metrics.inverterPower} kW</p>
                    </div>
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
                        <p class="text-sm text-gray-500 mb-1">Current/Total Capacity</p>
                        <p class="text-xl font-bold text-manta-primary">${metrics.currentCap} / ${metrics.totalCap} kWh</p>
                    </div>
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
                        <p class="text-sm text-gray-500 mb-1">Current Spot Price</p>
                        <p class="text-xl font-bold text-manta-primary">$${metrics.spotPrice} /MWh</p>
                    </div>
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
                        <p class="text-sm text-gray-500 mb-1">Forecast Price(Next 30 Min)</p>
                        <p class="text-xl font-bold text-manta-primary">$${metrics.forecastPrice} /MWh</p>
                    </div>
                </div>

                <!-- Main Content Grid -->
                <div class="grid grid-cols-3 gap-6 flex-1 min-h-0">
                    <!-- Chart Section -->
                    <div class="col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col relative">
                        <div class="absolute top-6 right-6 z-10">
                             <button class="bg-manta-primary hover:bg-manta-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                                Create an Event
                            </button>
                        </div>
                        <div id="cap-graph-chart" class="w-full flex-1 min-h-[400px]"></div>
                    </div>

                    <!-- Forecast Table Section -->
                    <div class="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
                        <div class="p-4 border-b border-gray-100 flex items-center justify-end">
                            <div class="flex bg-gray-100 p-1 rounded-lg">
                                <button onclick="app.updateCapGraphState('forecastInterval', '30Min')" 
                                    class="px-3 py-1 text-xs font-medium rounded-md transition-all ${forecastInterval === '30Min' ? 'bg-manta-primary text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}">
                                    30Min
                                </button>
                                <button onclick="app.updateCapGraphState('forecastInterval', '5Min')" 
                                    class="px-3 py-1 text-xs font-medium rounded-md transition-all ${forecastInterval === '5Min' ? 'bg-manta-primary text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}">
                                    5Min
                                </button>
                            </div>
                        </div>
                        <div class="flex-1 overflow-y-auto">
                            <table class="w-full text-sm text-left">
                                <thead class="bg-gray-50 text-gray-500 sticky top-0 z-10">
                                    <tr>
                                        <th class="px-6 py-3 font-medium">Settlement Date</th>
                                        <th class="px-6 py-3 font-medium text-left">Forecast Price ($/MWh)</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-100">
                                    ${forecasts.map(row => `
                                        <tr class="hover:bg-gray-50 transition-colors">
                                            <td class="px-6 py-3 text-gray-900">${row.time}</td>
                                            <td class="px-6 py-3 text-gray-900 text-left font-medium">${row.price}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>

        `;
        
        // Initialize Chart
        this.initCapGraphChart(chartData);
    },

    updateCapState(key, value) {
        // Handle nested keys like 'capRules.state'
        const parts = key.split('.');
        if (parts.length === 2) {
            state[parts[0]][parts[1]] = value;
            if (parts[0] === 'capRules') {
                this.renderCapRules(document.getElementById('content-area'));
            } else if (parts[0] === 'capEvents') {
                this.renderCapEvents(document.getElementById('content-area'));
            }
        }
    },

    updateSmartFeedInState(key, value) {
        const parts = key.split('.');
        if (parts.length === 2) {
            state[parts[0]][parts[1]] = value;
            if (parts[0] === 'smartFeedInRules') {
                this.renderSmartFeedInRules(document.getElementById('content-area'));
            } else if (parts[0] === 'smartFeedInEvents') {
                this.renderSmartFeedInEvents(document.getElementById('content-area'));
            }
        }
    },

    updateTradingState(key, value) {
        const parts = key.split('.');
        if (parts.length === 2) {
            state[parts[0]][parts[1]] = value;
            if (parts[0] === 'tradingEvents') {
                this.renderTradingEvents(document.getElementById('content-area'));
            }
        }
    },

    updateArbitrageState(key, value) {
        const parts = key.split('.');
        if (parts.length === 2) {
            state[parts[0]][parts[1]] = value;
            if (parts[0] === 'arbitrage') {
                this.renderArbitragePoints(document.getElementById('content-area'));
            }
        }
    },

    renderCapRules(container) {
        const { state: stateFilter, vppName, currentPage } = state.capRules;
        const itemsPerPage = state.capRules.itemsPerPage || 10;
        
        // Filter logic
        let filteredRules = MOCK_DATA.capRules.filter(rule => {
            const matchState = stateFilter === 'All' || rule.state === stateFilter;
            const matchVppName = !vppName || rule.vppName.toLowerCase().includes(vppName.toLowerCase());
            return matchState && matchVppName;
        });

        const totalItems = filteredRules.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
        const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
        
        // Pagination logic
        const startIdx = (validCurrentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const rules = filteredRules.slice(startIdx, endIdx);

        // Calculate pagination pages
        let pages = [];
        if (totalPages > 0) {
            if (totalPages <= 7) {
                pages = Array.from({length: totalPages}, (_, i) => i + 1);
            } else {
                if (validCurrentPage <= 4) {
                    pages = [1, 2, 3, 4, 5, '...', totalPages];
                } else if (validCurrentPage >= totalPages - 3) {
                    pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                } else {
                    pages = [1, '...', validCurrentPage - 1, validCurrentPage, validCurrentPage + 1, '...', totalPages];
                }
            }
        }

        container.className = "w-full h-full bg-[#f8f9fb] p-[8px]";
        container.innerHTML = `
            <div class="flex flex-col gap-6 w-full h-full">
                <!-- Search & Filter -->
                <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div class="flex flex-wrap items-end gap-4">
                        <div class="flex-1 min-w-[200px]">
                            <label class="block text-xs font-medium text-gray-500 mb-1">Pricing Region</label>
                            <select onchange="app.updateCapState('capRules.state', this.value)" class="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-manta-primary focus:border-manta-primary sm:text-sm bg-white">
                                <option value="All" ${stateFilter === 'All' ? 'selected' : ''}>All</option>
                                <option value="NSW" ${stateFilter === 'NSW' ? 'selected' : ''}>NSW</option>
                                <option value="VIC" ${stateFilter === 'VIC' ? 'selected' : ''}>VIC</option>
                                <option value="QLD" ${stateFilter === 'QLD' ? 'selected' : ''}>QLD</option>
                                <option value="SA" ${stateFilter === 'SA' ? 'selected' : ''}>SA</option>
                            </select>
                        </div>
                        <div class="flex-1 min-w-[200px]">
                            <label class="block text-xs font-medium text-gray-500 mb-1">VPP Name</label>
                            <input type="text" value="${vppName}" oninput="app.updateCapState('capRules.vppName', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-manta-primary focus:border-manta-primary sm:text-sm">
                        </div>
                        <button onclick="app.renderCapRules(document.getElementById('content-area'))" class="px-6 py-2 bg-manta-primary hover:bg-manta-dark text-white font-medium rounded-lg shadow-sm transition-colors">
                            Search
                        </button>
                    </div>
                </div>

                <!-- Action Bar -->
                <div class="flex justify-end">
                    <button class="flex items-center gap-2 px-4 py-2 bg-manta-primary hover:bg-manta-dark text-white font-medium rounded-lg shadow-sm transition-colors">
                        New Cap Rule
                    </button>
                </div>

                <!-- Table -->
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm flex-1 flex flex-col min-h-0">
                    <div class="overflow-auto flex-1">
                        <table class="w-full text-sm text-left">
                            <thead class="text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100 bg-gray-50 sticky top-0">
                                <tr>
                                    <th class="px-6 py-3 font-medium text-left w-16">#</th>
                                    <th class="px-6 py-3 font-medium">Pricing Region</th>
                                    <th class="px-6 py-3 font-medium">Schedule Type</th>
                                    <th class="px-6 py-3 font-medium">Target Time</th>
                                    <th class="px-6 py-3 font-medium">Trigger Price</th>
                                    <th class="px-6 py-3 font-medium">Target Capacity</th>
                                    <th class="px-6 py-3 font-medium">VPP Name</th>
                                    <th class="px-6 py-3 font-medium">Last Modified At</th>
                                    <th class="px-6 py-3 font-medium">Number of Events Triggered</th>
                                    <th class="px-6 py-3 font-medium">Active</th>
                                    <th class="px-6 py-3 font-medium text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${rules.length > 0 ? rules.map((rule, idx) => `
                                    <tr class="hover:bg-gray-50 transition-colors">
                                        <td class="px-6 py-4 text-left text-gray-500">${startIdx + idx + 1}</td>
                                        <td class="px-6 py-4 text-gray-900">${rule.state}</td>
                                        <td class="px-6 py-4 text-gray-900">${rule.scheduleType}</td>
                                        <td class="px-6 py-4 text-gray-900">${rule.targetTime}</td>
                                        <td class="px-6 py-4 font-mono text-gray-900 font-medium">$${typeof rule.triggerPrice === 'number' ? rule.triggerPrice.toFixed(2) : rule.triggerPrice} /MWh</td>
                                        <td class="px-6 py-4 text-gray-900">${rule.targetCapacity}</td>
                                        <td class="px-6 py-4 font-medium text-blue-600 hover:text-blue-800 cursor-pointer">${rule.vppName}</td>
                                        <td class="px-6 py-4 text-gray-500">${rule.lastModified}</td>
                                        <td class="px-6 py-4 text-gray-900 pl-12">${rule.eventsTriggered}</td>
                                        <td class="px-6 py-4 text-gray-900">
                                            <div class="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" class="sr-only peer" ${rule.active ? 'checked' : ''}>
                                                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-manta-primary"></div>
                                                <span class="ml-2 text-sm text-gray-600">${rule.active ? 'Active' : 'Inactive'}</span>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 text-left">
                                            <div class="flex items-center justify-start gap-2">
                                                <button class="p-1 text-gray-400 hover:text-manta-primary transition-colors" title="Edit">
                                                    <i data-lucide="pencil" class="w-4 h-4"></i>
                                                </button>
                                                <button class="p-1 text-gray-400 hover:text-gray-600 transition-colors" title="View">
                                                    <i data-lucide="file-text" class="w-4 h-4"></i>
                                                </button>
                                                <button class="p-1 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                                                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('') : `
                                    <tr>
                                        <td colspan="11" class="px-6 py-12 text-center text-gray-500">No rules found matching your criteria</td>
                                    </tr>
                                `}
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- Pagination -->
                    <div class="border-t border-gray-100 p-4 flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <span class="text-sm text-gray-500">Total ${totalItems}</span>
                            <div class="flex items-center gap-2">
                                <span class="text-sm text-gray-500">Rows per page:</span>
                                <select onchange="app.updateCapState('capRules.itemsPerPage', Number(this.value))" class="border border-gray-300 rounded text-sm text-gray-600 focus:outline-none focus:border-manta-primary">
                                    <option value="10" ${itemsPerPage === 10 ? 'selected' : ''}>10</option>
                                    <option value="20" ${itemsPerPage === 20 ? 'selected' : ''}>20</option>
                                    <option value="50" ${itemsPerPage === 50 ? 'selected' : ''}>50</option>
                                    <option value="100" ${itemsPerPage === 100 ? 'selected' : ''}>100</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button onclick="app.updateCapState('capRules.currentPage', ${validCurrentPage - 1})" ${validCurrentPage <= 1 ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                                <i data-lucide="chevron-left" class="w-5 h-5"></i>
                            </button>
                            ${pages.map(pageNum => {
                                if (pageNum === '...') {
                                    return '<span class="w-6 h-6 flex items-center justify-center text-gray-400 text-xs">...</span>';
                                }
                                return `<button onclick="app.updateCapState('capRules.currentPage', ${pageNum})" class="w-6 h-6 flex items-center justify-center rounded ${pageNum === validCurrentPage ? 'bg-manta-primary text-white' : 'hover:bg-gray-100 text-gray-600'} text-xs font-medium">${pageNum}</button>`;
                            }).join('')}
                            <button onclick="app.updateCapState('capRules.currentPage', ${validCurrentPage + 1})" ${validCurrentPage >= totalPages ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                                <i data-lucide="chevron-right" class="w-5 h-5"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        `;
        
        lucide.createIcons({
            root: container
        });
    },

    renderCapEvents(container) {
        const { timeRange, status, eventType, vppName, currentPage } = state.capEvents;
        const itemsPerPage = state.capEvents.itemsPerPage || 10;
        
        // Filter logic
        let filteredEvents = MOCK_DATA.capEvents.filter(event => {
            const matchTime = !timeRange || event.date.includes(timeRange) || event.timeRange.includes(timeRange);
            const matchStatus = status === 'All' || event.status === status;
            const matchEventType = eventType === 'All' || event.eventType === eventType;
            const matchVppName = !vppName || event.vppName.toLowerCase().includes(vppName.toLowerCase());
            return matchTime && matchStatus && matchEventType && matchVppName;
        });

        const totalItems = filteredEvents.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
        const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
        
        // Pagination logic
        const startIdx = (validCurrentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const events = filteredEvents.slice(startIdx, endIdx);

        // Calculate pagination pages
        let pages = [];
        if (totalPages > 0) {
            if (totalPages <= 7) {
                pages = Array.from({length: totalPages}, (_, i) => i + 1);
            } else {
                if (validCurrentPage <= 4) {
                    pages = [1, 2, 3, 4, 5, '...', totalPages];
                } else if (validCurrentPage >= totalPages - 3) {
                    pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                } else {
                    pages = [1, '...', validCurrentPage - 1, validCurrentPage, validCurrentPage + 1, '...', totalPages];
                }
            }
        }

        container.className = "w-full h-full bg-[#f8f9fb] p-[8px]";
        container.innerHTML = `
            <div class="flex flex-col gap-6 w-full h-full">
                <!-- Search & Filter -->
                <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div class="grid grid-cols-4 gap-4 items-end">
                        <div class="col-span-1">
                            <label class="block text-xs font-medium text-gray-500 mb-1">Time</label>
                            <div class="relative">
                                <input type="text" value="${timeRange}" oninput="app.updateCapState('capEvents.timeRange', this.value)" placeholder="Search time..." class="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-manta-primary focus:border-manta-primary sm:text-sm bg-white">
                                <i data-lucide="clock" class="w-4 h-4 text-gray-400 absolute left-3 top-2.5"></i>
                            </div>
                        </div>
                        <div class="col-span-1">
                            <label class="block text-xs font-medium text-gray-500 mb-1">Status</label>
                            <select onchange="app.updateCapState('capEvents.status', this.value)" class="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-manta-primary focus:border-manta-primary sm:text-sm bg-white">
                                <option value="All" ${status === 'All' ? 'selected' : ''}>All</option>
                                <option value="Success" ${status === 'Success' ? 'selected' : ''}>Success</option>
                                <option value="Partially Success" ${status === 'Partially Success' ? 'selected' : ''}>Partially Success</option>
                                <option value="Failed" ${status === 'Failed' ? 'selected' : ''}>Failed</option>
                            </select>
                        </div>
                        <div class="col-span-1">
                            <label class="block text-xs font-medium text-gray-500 mb-1">Event Type</label>
                            <select onchange="app.updateCapState('capEvents.eventType', this.value)" class="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-manta-primary focus:border-manta-primary sm:text-sm bg-white">
                                <option value="All" ${eventType === 'All' ? 'selected' : ''}>All</option>
                                <option value="Charge" ${eventType === 'Charge' ? 'selected' : ''}>Charge</option>
                                <option value="Discharge" ${eventType === 'Discharge' ? 'selected' : ''}>Discharge</option>
                            </select>
                        </div>
                        <div class="col-span-1">
                            <label class="block text-xs font-medium text-gray-500 mb-1">VPP Name</label>
                            <div class="flex gap-2">
                                <input type="text" value="${vppName}" oninput="app.updateCapState('capEvents.vppName', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-manta-primary focus:border-manta-primary sm:text-sm">
                                <button onclick="app.renderCapEvents(document.getElementById('content-area'))" class="px-4 py-2 bg-manta-primary hover:bg-manta-dark text-white font-medium rounded-lg shadow-sm transition-colors">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Table Section -->
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm flex-1 flex flex-col min-h-0">
                    <div class="overflow-auto flex-1">
                        <table class="w-full text-sm text-left">
                            <thead class="text-xs text-gray-500 font-bold bg-gray-50 sticky top-0">
                                <tr>
                                    <th class="px-4 py-3 text-left w-12">#</th>
                                    <th class="px-4 py-3">
                                        <div class="flex flex-col">
                                            <span>VPP</span>
                                            <span>Name</span>
                                        </div>
                                    </th>
                                    <th class="px-4 py-3">
                                        <div class="flex flex-col">
                                            <span>Event</span>
                                            <span>Type</span>
                                        </div>
                                    </th>
                                    <th class="px-4 py-3">Date</th>
                                    <th class="px-4 py-3">Start Time - End Time</th>
                                    <th class="px-4 py-3">Power</th>
                                    <th class="px-4 py-3">
                                        <div class="flex flex-col">
                                            <span>Spot</span>
                                            <span>Price</span>
                                        </div>
                                    </th>
                                    <th class="px-4 py-3">Volume</th>
                                    <th class="px-4 py-3">
                                        <div class="flex flex-col">
                                            <span>VPP</span>
                                            <span>Income</span>
                                        </div>
                                    </th>
                                    <th class="px-4 py-3">Status</th>
                                    <th class="px-4 py-3 w-48">Notes</th>
                                    <th class="px-4 py-3">
                                        <div class="flex flex-col">
                                            <span>Service</span>
                                            <span>Tag</span>
                                        </div>
                                    </th>
                                    <th class="px-4 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${events.length > 0 ? events.map((event, idx) => `
                                    <tr class="hover:bg-gray-50 transition-colors">
                                        <td class="px-4 py-4 text-left text-gray-500">${startIdx + idx + 1}</td>
                                        <td class="px-4 py-4 text-manta-primary font-medium cursor-pointer hover:underline">${event.vppName}</td>
                                        <td class="px-4 py-4 text-gray-900">${event.eventType}</td>
                                        <td class="px-4 py-4 text-gray-500 text-xs">${event.date}</td>
                                        <td class="px-4 py-4 text-gray-900 font-mono text-xs">${event.timeRange}</td>
                                        <td class="px-4 py-4 text-gray-900">${event.power}</td>
                                        <td class="px-4 py-4 text-gray-900">${event.spotPrice}</td>
                                        <td class="px-4 py-4 text-gray-900">${event.volume}</td>
                                        <td class="px-4 py-4 text-gray-900 font-medium">${event.vppIncome}</td>
                                        <td class="px-4 py-4">
                                            <span class="${event.status === 'Success' ? 'text-green-600' : event.status === 'Partially Success' ? 'text-orange-500' : 'text-red-600'} font-medium">
                                                ${event.status}
                                            </span>
                                        </td>
                                        <td class="px-4 py-4 text-gray-500 text-xs leading-tight max-w-xs">${event.notes}</td>
                                        <td class="px-4 py-4 text-gray-500">${event.serviceTag}</td>
                                        <td class="px-4 py-4 text-left">
                                            <div class="flex items-center justify-start gap-2">
                                                <button class="p-1 text-gray-400 hover:text-manta-primary transition-colors" title="View Details">
                                                    <i data-lucide="external-link" class="w-4 h-4"></i>
                                                </button>
                                                <button class="p-1 text-gray-400 hover:text-manta-primary transition-colors" title="Refresh Status">
                                                    <i data-lucide="refresh-cw" class="w-4 h-4"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('') : `
                                    <tr>
                                        <td colspan="13" class="px-6 py-12 text-center text-gray-500">No events found matching your criteria</td>
                                    </tr>
                                `}
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div class="border-t border-gray-100 p-4 flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <span class="text-sm text-gray-500">Total ${totalItems}</span>
                            <div class="flex items-center gap-2">
                                <span class="text-sm text-gray-500">Rows per page:</span>
                                <select onchange="app.updateCapState('capEvents.itemsPerPage', Number(this.value))" class="border border-gray-300 rounded text-sm text-gray-600 focus:outline-none focus:border-manta-primary">
                                    <option value="10" ${itemsPerPage === 10 ? 'selected' : ''}>10</option>
                                    <option value="20" ${itemsPerPage === 20 ? 'selected' : ''}>20</option>
                                    <option value="50" ${itemsPerPage === 50 ? 'selected' : ''}>50</option>
                                    <option value="100" ${itemsPerPage === 100 ? 'selected' : ''}>100</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button onclick="app.updateCapState('capEvents.currentPage', ${validCurrentPage - 1})" ${validCurrentPage <= 1 ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                                <i data-lucide="chevron-left" class="w-5 h-5"></i>
                            </button>
                            ${pages.map(pageNum => {
                                if (pageNum === '...') {
                                    return '<span class="w-6 h-6 flex items-center justify-center text-gray-400 text-xs">...</span>';
                                }
                                return `<button onclick="app.updateCapState('capEvents.currentPage', ${pageNum})" class="w-6 h-6 flex items-center justify-center rounded ${pageNum === validCurrentPage ? 'bg-manta-primary text-white' : 'hover:bg-gray-100 text-gray-600'} text-xs font-medium">${pageNum}</button>`;
                            }).join('')}
                            <button onclick="app.updateCapState('capEvents.currentPage', ${validCurrentPage + 1})" ${validCurrentPage >= totalPages ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                                <i data-lucide="chevron-right" class="w-5 h-5"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        lucide.createIcons({
            root: container
        });
    },

    renderReportsVppEventItems(container) {
        const { month, eventType, from, eventId, nmi, currentPage } = state.reportsVppEventItems;
        const itemsPerPage = state.reportsVppEventItems.itemsPerPage || 10;
        
        // Filter logic
        let filteredEvents = MOCK_DATA.reportsVppEventItems.filter(item => {
            const matchMonth = !month || item.date.includes(month);
            const matchEventType = eventType === 'All' || item.eventType === eventType;
            const matchFrom = from === 'All' || item.from === from;
            const matchEventId = !eventId || item.eventId.includes(eventId);
            const matchNmi = !nmi || item.nmi.includes(nmi);
            return matchMonth && matchEventType && matchFrom && matchEventId && matchNmi;
        });

        const totalItems = filteredEvents.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
        const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
        
        // Pagination logic
        const startIdx = (validCurrentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const slicedEvents = filteredEvents.slice(startIdx, endIdx);

        // Calculate pagination pages
        let pages = [];
        if (totalPages > 0) {
            if (totalPages <= 7) {
                pages = Array.from({length: totalPages}, (_, i) => i + 1);
            } else {
                if (validCurrentPage <= 4) {
                    pages = [1, 2, 3, 4, 5, '...', totalPages];
                } else if (validCurrentPage >= totalPages - 3) {
                    pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                } else {
                    pages = [1, '...', validCurrentPage - 1, validCurrentPage, validCurrentPage + 1, '...', totalPages];
                }
            }
        }

        container.className = "w-full h-full bg-[#f8f9fb] p-[8px]";
        container.innerHTML = `
            <div class="flex flex-col gap-6 w-full h-full overflow-y-auto">
                <!-- Filters Section -->
                <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div class="flex items-end gap-4">
                        <div class="flex-1">
                            <label class="block text-xs font-medium text-gray-500 mb-1">Months</label>
                            <div class="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white">
                                <i data-lucide="calendar" class="w-4 h-4 text-gray-400"></i>
                                <input type="text" placeholder="-" value="${month}" onchange="app.updateReportsVppEventItemsState('month', this.value)" class="w-full text-sm outline-none bg-transparent">
                            </div>
                        </div>
                        <div class="flex-1">
                            <label class="block text-xs font-medium text-gray-500 mb-1">Event Type</label>
                            <select onchange="app.updateReportsVppEventItemsState('eventType', this.value)" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-1 focus:ring-green-500">
                                <option value="All" ${eventType === 'All' ? 'selected' : ''}>All</option>
                                <option value="Discharge" ${eventType === 'Discharge' ? 'selected' : ''}>Discharge</option>
                                <option value="Charge" ${eventType === 'Charge' ? 'selected' : ''}>Charge</option>
                            </select>
                        </div>
                        <div class="flex-1">
                            <label class="block text-xs font-medium text-gray-500 mb-1">From</label>
                            <select onchange="app.updateReportsVppEventItemsState('from', this.value)" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-1 focus:ring-green-500">
                                <option value="All" ${from === 'All' ? 'selected' : ''}>All</option>
                                <option value="VPP" ${from === 'VPP' ? 'selected' : ''}>VPP</option>
                                <option value="User" ${from === 'User' ? 'selected' : ''}>User</option>
                            </select>
                        </div>
                        <div class="flex-1">
                            <label class="block text-xs font-medium text-gray-500 mb-1">Event ID</label>
                            <input type="text" value="${eventId}" oninput="app.updateReportsVppEventItemsState('eventId', this.value)" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-green-500">
                        </div>
                        <div class="flex-1">
                            <label class="block text-xs font-medium text-gray-500 mb-1">NMI</label>
                            <input type="text" value="${nmi}" oninput="app.updateReportsVppEventItemsState('nmi', this.value)" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-green-500">
                        </div>
                        <button onclick="app.renderReportsVppEventItems(document.getElementById('content-area'))" class="px-8 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition-colors">
                            Search
                        </button>
                    </div>
                </div>

                <!-- Table Section -->
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col flex-1 overflow-hidden">
                    <div class="flex-1 overflow-auto">
                        <table class="w-full text-sm text-left">
                            <thead class="text-xs text-gray-700 font-bold bg-gray-50 sticky top-0">
                                <tr>
                                    <th class="px-6 py-4 w-16"></th>
                                    <th class="px-6 py-4">Event ID</th>
                                    <th class="px-6 py-4">NMI</th>
                                    <th class="px-6 py-4">Event Type</th>
                                    <th class="px-6 py-4">Date</th>
                                    <th class="px-6 py-4">Start Time - End Time</th>
                                    <th class="px-6 py-4">From</th>
                                    <th class="px-6 py-4">Is Settle</th>
                                    <th class="px-6 py-4">Quantity</th>
                                    <th class="px-6 py-4">Spot Price</th>
                                    <th class="px-6 py-4">Revenue</th>
                                    <th class="px-6 py-4">Owner Profit</th>
                                    <th class="px-6 py-4">Net Profit</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${slicedEvents.length > 0 ? slicedEvents.map((event, idx) => `
                                    <tr class="hover:bg-gray-50 transition-colors group">
                                        <td class="px-6 py-4 text-gray-500">${(validCurrentPage - 1) * itemsPerPage + idx + 1}</td>
                                        <td class="px-6 py-4 text-gray-900">${event.eventId}</td>
                                        <td class="px-6 py-4 text-gray-900">${event.nmi}</td>
                                        <td class="px-6 py-4 text-gray-600">${event.eventType}</td>
                                        <td class="px-6 py-4 text-gray-600 whitespace-nowrap">${event.date}</td>
                                        <td class="px-6 py-4 text-gray-600 whitespace-nowrap">${event.timeRange}</td>
                                        <td class="px-6 py-4 text-gray-600">${event.from}</td>
                                        <td class="px-6 py-4 text-gray-900">${event.isSettle}</td>
                                        <td class="px-6 py-4 text-gray-900">${event.quantity}</td>
                                        <td class="px-6 py-4 text-gray-900 font-medium">${event.spotPrice}</td>
                                        <td class="px-6 py-4 text-gray-900">${event.revenue}</td>
                                        <td class="px-6 py-4 text-gray-900">${event.ownerProfit}</td>
                                        <td class="px-6 py-4 text-gray-900 font-medium">${event.netProfit}</td>
                                    </tr>
                                `).join('') : `
                                    <tr>
                                        <td colspan="13" class="px-6 py-12 text-center text-gray-500">No events found matching your criteria</td>
                                    </tr>
                                `}
                            </tbody>
                        </table>
                    </div>
                    <!-- Pagination -->
                    <div class="border-t border-gray-100 p-4 flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <span class="text-sm text-gray-500">Total ${totalItems}</span>
                            <div class="flex items-center gap-2">
                                <span class="text-sm text-gray-500">Rows per page:</span>
                                <select onchange="app.updateReportsVppEventItemsState('itemsPerPage', Number(this.value))" class="border border-gray-300 rounded text-sm text-gray-600 focus:outline-none focus:border-manta-primary">
                                    <option value="10" ${itemsPerPage === 10 ? 'selected' : ''}>10</option>
                                    <option value="20" ${itemsPerPage === 20 ? 'selected' : ''}>20</option>
                                    <option value="50" ${itemsPerPage === 50 ? 'selected' : ''}>50</option>
                                    <option value="100" ${itemsPerPage === 100 ? 'selected' : ''}>100</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button onclick="app.updateReportsVppEventItemsState('currentPage', ${validCurrentPage - 1})" ${validCurrentPage <= 1 ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                                <i data-lucide="chevron-left" class="w-5 h-5"></i>
                            </button>
                            ${pages.map(pageNum => {
                                if (pageNum === '...') {
                                    return '<span class="w-6 h-6 flex items-center justify-center text-gray-400 text-xs">...</span>';
                                }
                                return `<button onclick="app.updateReportsVppEventItemsState('currentPage', ${pageNum})" class="w-6 h-6 flex items-center justify-center rounded ${pageNum === validCurrentPage ? 'bg-manta-primary text-white' : 'hover:bg-gray-100 text-gray-600'} text-xs font-medium">${pageNum}</button>`;
                            }).join('')}
                            <button onclick="app.updateReportsVppEventItemsState('currentPage', ${validCurrentPage + 1})" ${validCurrentPage >= totalPages ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                                <i data-lucide="chevron-right" class="w-5 h-5"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        lucide.createIcons({
            root: container
        });
    },

    updateReportsVppEventItemsState(key, value) {
        state.reportsVppEventItems[key] = value;
        if (key === 'currentPage') {
            this.renderReportsVppEventItems(document.getElementById('content-area'));
        }
    },

    renderFcasGroups(container) {
        const { groupName, state: filterState, active, currentPage } = state.fcasGroups;
        
        // Filter logic
        let filteredGroups = MOCK_DATA.fcasGroups.filter(group => {
            const matchName = !groupName || group.name.toLowerCase().includes(groupName.toLowerCase());
            const matchState = filterState === 'All' || group.state === filterState;
            const matchActive = active === 'All' || 
                (active === 'Active' && group.active) || 
                (active === 'Inactive' && !group.active);
            return matchName && matchState && matchActive;
        });

        const itemsPerPage = state.fcasGroups.itemsPerPage || 10;
        const totalItems = filteredGroups.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
        const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
        
        // Pagination logic
        const startIdx = (validCurrentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const groups = filteredGroups.slice(startIdx, endIdx);

        // Calculate pagination pages
        let pages = [];
        if (totalPages > 0) {
            if (totalPages <= 7) {
                pages = Array.from({length: totalPages}, (_, i) => i + 1);
            } else {
                if (validCurrentPage <= 4) {
                    pages = [1, 2, 3, 4, 5, '...', totalPages];
                } else if (validCurrentPage >= totalPages - 3) {
                    pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                } else {
                    pages = [1, '...', validCurrentPage - 1, validCurrentPage, validCurrentPage + 1, '...', totalPages];
                }
            }
        }

        container.className = "w-full h-full bg-[#f8f9fb] p-[8px]";
        container.innerHTML = `
            <div class="flex flex-col gap-6 w-full h-full">
                <!-- Search & Filter -->
                <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div class="flex flex-wrap items-end gap-4">
                        <div class="flex-1 min-w-[200px]">
                            <label class="block text-xs font-medium text-gray-500 mb-1">FCAS Group Name</label>
                            <input type="text" value="${groupName}" oninput="app.updateFcasGroupsState('groupName', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-manta-primary focus:border-manta-primary sm:text-sm">
                        </div>
                        <div class="flex-1 min-w-[150px]">
                            <label class="block text-xs font-medium text-gray-500 mb-1">Pricing Region</label>
                            <select onchange="app.updateFcasGroupsState('state', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-manta-primary focus:border-manta-primary sm:text-sm bg-white">
                                <option value="All" ${filterState === 'All' ? 'selected' : ''}>All</option>
                                <option value="NSW" ${filterState === 'NSW' ? 'selected' : ''}>NSW</option>
                                <option value="VIC" ${filterState === 'VIC' ? 'selected' : ''}>VIC</option>
                                <option value="QLD" ${filterState === 'QLD' ? 'selected' : ''}>QLD</option>
                                <option value="SA" ${filterState === 'SA' ? 'selected' : ''}>SA</option>
                            </select>
                        </div>
                        <div class="flex-1 min-w-[150px]">
                            <label class="block text-xs font-medium text-gray-500 mb-1">Status</label>
                            <select onchange="app.updateFcasGroupsState('active', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-manta-primary focus:border-manta-primary sm:text-sm bg-white">
                                <option value="All" ${active === 'All' ? 'selected' : ''}>All</option>
                                <option value="Active" ${active === 'Active' ? 'selected' : ''}>Active</option>
                                <option value="Inactive" ${active === 'Inactive' ? 'selected' : ''}>Inactive</option>
                            </select>
                        </div>
                        <button onclick="app.renderFcasGroups(document.getElementById('content-area'))" class="px-6 py-2 bg-manta-primary hover:bg-manta-dark text-white font-medium rounded-lg shadow-sm transition-colors">
                            Search
                        </button>
                    </div>
                </div>

                <!-- Table Section -->
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm flex-1 flex flex-col min-h-0">
                    <!-- Table Header Controls -->
                    <div class="flex items-center justify-end px-6 py-4 border-b border-gray-100 gap-4">
                    </div>

                    <div class="overflow-auto flex-1">
                        <table class="w-full text-sm text-left">
                            <thead class="text-xs text-gray-500 font-bold bg-gray-50 sticky top-0">
                                <tr>
                                    <th class="px-6 py-3">FCAS Group Name</th>
                                    <th class="px-6 py-3">DERs(Online/Total)</th>
                                    <th class="px-6 py-3">Pricing Region</th>
                                    <th class="px-6 py-3">
                                        <div class="flex flex-col">
                                            <span>Inverter</span>
                                            <span>Size</span>
                                        </div>
                                    </th>
                                    <th class="px-6 py-3">
                                        <div class="flex flex-col">
                                            <span>SOC (Current /</span>
                                            <span>Total)</span>
                                        </div>
                                    </th>
                                    <th class="px-6 py-3">Service Tag</th>
                                    <th class="px-6 py-3">
                                        <div class="flex flex-col">
                                            <span>Number of Events</span>
                                            <span>Triggered</span>
                                        </div>
                                    </th>
                                    <th class="px-6 py-3">Active Status</th>
                                    <th class="px-6 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${groups.length > 0 ? groups.map(group => `
                                    <tr class="hover:bg-gray-50 transition-colors">
                                        <td class="px-6 py-4 text-gray-900 font-medium">${group.name}</td>
                                        <td class="px-6 py-4 text-gray-900">${group.onlineDers}/${group.totalDers}</td>
                                        <td class="px-6 py-4 text-gray-900">${group.state}</td>
                                        <td class="px-6 py-4 text-gray-900">${group.inverterSize}</td>
                                        <td class="px-6 py-4 text-gray-900">${group.currentSoc} / ${group.totalSoc}</td>
                                        <td class="px-6 py-4 text-gray-900">${group.serviceTag}</td>
                                        <td class="px-6 py-4 text-gray-900">${group.eventsTriggered || ''}</td>
                                        <td class="px-6 py-4">
                                            <div class="flex items-center gap-2">
                                                <span class="text-sm text-gray-500">${group.active ? 'Active' : 'Inactive'}</span>
                                                <button class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${group.active ? 'bg-manta-primary' : 'bg-gray-200'}">
                                                    <span class="translate-x-0.5 inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${group.active ? 'translate-x-4.5' : 'translate-x-0.5'}"></span>
                                                </button>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 text-left">
                                            <div class="flex items-center justify-start gap-2">
                                                <button class="p-1 text-gray-400 hover:text-manta-primary transition-colors" title="Edit">
                                                    <i data-lucide="square-pen" class="w-4 h-4"></i>
                                                </button>
                                                <button class="p-1 text-gray-400 hover:text-manta-primary transition-colors" title="Add">
                                                    <i data-lucide="plus-square" class="w-4 h-4"></i>
                                                </button>
                                                <button class="p-1 text-gray-400 hover:text-manta-primary transition-colors" title="Download">
                                                    <i data-lucide="file-down" class="w-4 h-4"></i>
                                                </button>
                                                <button class="p-1 text-gray-400 hover:text-manta-primary transition-colors" title="Report">
                                                    <i data-lucide="bar-chart-2" class="w-4 h-4"></i>
                                                </button>
                                                <button class="p-1 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                                                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('') : `
                                    <tr>
                                        <td colspan="9" class="px-6 py-12 text-center text-gray-500">No FCAS groups found</td>
                                    </tr>
                                `}
                            </tbody>
                        </table>
                    </div>
                     <!-- Pagination Bottom -->
                    <div class="border-t border-gray-100 p-4 flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <span class="text-sm text-gray-500">Total ${totalItems}</span>
                            <div class="flex items-center gap-2">
                                <span class="text-sm text-gray-500">Rows per page:</span>
                                <select onchange="app.updateFcasGroupsState('itemsPerPage', Number(this.value))" class="border border-gray-300 rounded text-sm text-gray-600 focus:outline-none focus:border-manta-primary">
                                    <option value="10" ${itemsPerPage === 10 ? 'selected' : ''}>10</option>
                                    <option value="20" ${itemsPerPage === 20 ? 'selected' : ''}>20</option>
                                    <option value="50" ${itemsPerPage === 50 ? 'selected' : ''}>50</option>
                                    <option value="100" ${itemsPerPage === 100 ? 'selected' : ''}>100</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button onclick="app.updateFcasGroupsState('currentPage', ${validCurrentPage - 1})" ${validCurrentPage <= 1 ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                                <i data-lucide="chevron-left" class="w-5 h-5"></i>
                            </button>
                            ${pages.map(pageNum => {
                                if (pageNum === '...') {
                                    return '<span class="w-6 h-6 flex items-center justify-center text-gray-400 text-xs">...</span>';
                                }
                                return `<button onclick="app.updateFcasGroupsState('currentPage', ${pageNum})" class="w-6 h-6 flex items-center justify-center rounded ${pageNum === validCurrentPage ? 'bg-manta-primary text-white' : 'hover:bg-gray-100 text-gray-600'} text-xs font-medium">${pageNum}</button>`;
                            }).join('')}
                            <button onclick="app.updateFcasGroupsState('currentPage', ${validCurrentPage + 1})" ${validCurrentPage >= totalPages ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                                <i data-lucide="chevron-right" class="w-5 h-5"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        lucide.createIcons({
            root: container
        });
    },

    updateFcasGroupsState(key, value) {
        state.fcasGroups[key] = value;
        if (key === 'currentPage' || key === 'state' || key === 'active') {
            this.renderFcasGroups(document.getElementById('content-area'));
        }
    },

    renderFcasPriceAvailability(container) {
        const { region, direction, date, bids: bidsState } = state.fcasPriceAvailability;
        const stats = MOCK_DATA.fcasData.stats;
        const forecast30min = MOCK_DATA.fcasData.forecast30min;
        
        // Filter bids
        const allBids = MOCK_DATA.fcasData.bids;
        const filteredBids = allBids.filter(bid => {
            return bidsState.serviceType === 'All' || bid.serviceType === bidsState.serviceType;
        });

        const itemsPerPage = bidsState.itemsPerPage || 10;
        const totalBids = filteredBids.length;
        const totalPages = Math.ceil(totalBids / itemsPerPage) || 1;
        const validCurrentPage = Math.min(Math.max(1, bidsState.currentPage), totalPages);
        
        const startIdx = (validCurrentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const currentBids = filteredBids.slice(startIdx, endIdx);

        // Calculate pagination pages
        let pages = [];
        if (totalPages > 0) {
            if (totalPages <= 7) {
                pages = Array.from({length: totalPages}, (_, i) => i + 1);
            } else {
                if (validCurrentPage <= 4) {
                    pages = [1, 2, 3, 4, 5, '...', totalPages];
                } else if (validCurrentPage >= totalPages - 3) {
                    pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                } else {
                    pages = [1, '...', validCurrentPage - 1, validCurrentPage, validCurrentPage + 1, '...', totalPages];
                }
            }
        }

        container.className = "w-full h-full bg-[#f8f9fb] p-[8px]";
        container.innerHTML = `
            <div class="flex flex-col gap-6 w-full h-full overflow-y-auto">
                <!-- Header Controls -->
                <div class="flex flex-col gap-4">
                    <h2 class="text-xl font-bold text-gray-900">Price and Availability</h2>
                    
                    <!-- Region Selector -->
                    <div class="flex items-center gap-2">
                         ${['SA', 'VIC', 'NSW', 'QLD'].map(r => `
                            <button onclick="app.updateFcasPriceAvailabilityState('region', '${r}')" 
                                class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${region === r ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">
                                ${r}
                            </button>
                        `).join('')}
                    </div>

                    <!-- Direction Selector -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                             <button onclick="app.updateFcasPriceAvailabilityState('direction', 'Raise')" 
                                class="px-6 py-1.5 rounded-full text-sm font-medium transition-colors ${direction === 'Raise' ? 'bg-green-600 text-white' : 'text-gray-500 hover:text-gray-700'}">
                                Raise
                            </button>
                            <button onclick="app.updateFcasPriceAvailabilityState('direction', 'Lower')" 
                                class="px-6 py-1.5 rounded-full text-sm font-medium transition-colors ${direction === 'Lower' ? 'bg-green-600 text-white' : 'text-gray-500 hover:text-gray-700'}">
                                Lower
                            </button>
                        </div>

                        <!-- Date Picker -->
                        <div class="flex items-center gap-2">
                             <span class="text-gray-500 text-sm flex items-center gap-1"><i data-lucide="clock" class="w-4 h-4"></i> Historical</span>
                             <button class="p-1 text-gray-400 hover:text-gray-600"><i data-lucide="chevron-left" class="w-4 h-4"></i></button>
                             <div class="bg-white border border-gray-200 rounded px-3 py-1 text-sm font-medium text-gray-700">
                                ${date}
                             </div>
                             <button class="p-1 text-gray-400 hover:text-gray-600"><i data-lucide="chevron-right" class="w-4 h-4"></i></button>
                        </div>
                    </div>
                </div>

                <!-- Metrics Row -->
                <div class="grid grid-cols-6 gap-4 text-center">
                    <div class="flex flex-col">
                        <span class="text-xs text-gray-500">Current Raise Price (60Sec)</span>
                        <span class="text-lg font-bold text-gray-900">$${stats.current.raise60s} <span class="text-xs font-normal text-gray-400">(/MWh)</span></span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-xs text-gray-500">Current Raise Price (5Min)</span>
                        <span class="text-lg font-bold text-gray-900">$${stats.current.raise5min} <span class="text-xs font-normal text-gray-400">(/MWh)</span></span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-xs text-gray-500">Current Raise Availability</span>
                        <span class="text-lg font-bold text-yellow-500">${stats.current.raiseAvail} <span class="text-xs font-normal text-gray-400">(MW)</span></span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-xs text-gray-500">Forecast Raise Price (60Sec)</span>
                        <span class="text-lg font-bold text-gray-900">$${stats.forecast.raise60s} <span class="text-xs font-normal text-gray-400">(/MWh)</span></span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-xs text-gray-500">Forecast Raise Price (5Min)</span>
                        <span class="text-lg font-bold text-gray-900">$${stats.forecast.raise5min} <span class="text-xs font-normal text-gray-400">(/MWh)</span></span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-xs text-gray-500">Forecast Raise Availability</span>
                        <span class="text-lg font-bold text-gray-900">${stats.forecast.raiseAvail} <span class="text-xs font-normal text-gray-400">(MW)</span></span>
                    </div>
                </div>

                    <!-- Chart Section -->
                <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm min-h-[400px] flex flex-col">
                     <div id="fcas-chart" class="w-full flex-1"></div>
                </div>

                <!-- 30min Forecast Section -->
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div class="px-6 py-3 bg-gray-50 border-b border-gray-100">
                        <h3 class="font-medium text-gray-700">30min Forecast</h3>
                    </div>
                    <div class="p-4 overflow-x-auto">
                        <table class="w-full text-sm">
                            <tbody class="divide-y divide-gray-100">
                                ${forecast30min.map(row => `
                                    <tr>
                                        <td class="py-3 font-medium text-gray-600 pr-4 whitespace-nowrap">${row.label}</td>
                                        ${row.values.map(val => `
                                            <td class="px-4 py-3 text-gray-900 text-left">${val}</td>
                                        `).join('')}
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- FCAS Bids Section -->
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col mt-4">
                    <div class="p-6 border-b border-gray-100">
                        <h3 class="text-lg font-bold text-gray-900 mb-4">FCAS Bids</h3>
                        
                        <div class="flex items-end gap-4">
                            <div class="flex-1">
                                <label class="block text-xs font-medium text-gray-500 mb-1">Trading Period</label>
                                <div class="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
                                    <i data-lucide="clock" class="w-4 h-4 text-gray-400"></i>
                                    <input type="text" placeholder="Start Time" class="w-full text-sm outline-none">
                                    <span class="text-gray-400">to</span>
                                    <input type="text" placeholder="End Time" class="w-full text-sm outline-none">
                                </div>
                            </div>
                            <div class="flex-1">
                                <label class="block text-xs font-medium text-gray-500 mb-1">Service Type</label>
                                <select onchange="app.updateFcasPriceAvailabilityState('bids.serviceType', this.value)" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
                                    <option value="All" ${bidsState.serviceType === 'All' ? 'selected' : ''}>All</option>
                                    <option value="Raise 6 sec" ${bidsState.serviceType === 'Raise 6 sec' ? 'selected' : ''}>Raise 6 sec</option>
                                    <option value="Raise 60 sec" ${bidsState.serviceType === 'Raise 60 sec' ? 'selected' : ''}>Raise 60 sec</option>
                                    <option value="Raise 5 min" ${bidsState.serviceType === 'Raise 5 min' ? 'selected' : ''}>Raise 5 min</option>
                                </select>
                            </div>
                            <button onclick="app.renderFcasPriceAvailability(document.getElementById('content-area'))" class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition-colors">
                                Search
                            </button>
                            <div class="flex-1 flex justify-end">
                                <button class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition-colors">
                                    Create an Event
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Bids Table -->
                    <div class="flex-1 overflow-auto min-h-[200px]">
                        <table class="w-full text-sm text-left">
                            <thead class="text-xs text-gray-500 font-bold bg-gray-50 sticky top-0">
                                <tr>
                                    <th class="px-6 py-3">Trading Period</th>
                                    <th class="px-6 py-3">DUID</th>
                                    <th class="px-6 py-3">Service Type</th>
                                    <th class="px-6 py-3">Max Availability</th>
                                    <th class="px-6 py-3">Submission Date</th>
                                    <th class="px-6 py-3">Status</th>
                                    <th class="px-6 py-3">Total Settlement</th>
                                    <th class="px-6 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${currentBids.length > 0 ? currentBids.map(bid => `
                                    <tr class="hover:bg-gray-50 transition-colors">
                                        <td class="px-6 py-4 text-gray-900">${bid.tradingPeriod}</td>
                                        <td class="px-6 py-4 text-gray-900">${bid.duid}</td>
                                        <td class="px-6 py-4 text-gray-900">${bid.serviceType}</td>
                                        <td class="px-6 py-4 text-gray-900">${bid.maxAvailability}</td>
                                        <td class="px-6 py-4 text-gray-900">${bid.submissionDate}</td>
                                        <td class="px-6 py-4">
                                            <span class="px-2 py-1 rounded-full text-xs font-medium ${bid.status === 'Cleared' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}">
                                                ${bid.status}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 text-gray-900">${bid.totalSettlement}</td>
                                        <td class="px-6 py-4 text-left">
                                            <button class="text-gray-400 hover:text-green-600 transition-colors">
                                                <i data-lucide="more-horizontal" class="w-4 h-4"></i>
                                            </button>
                                        </td>
                                    </tr>
                                `).join('') : `
                                    <tr>
                                        <td colspan="8" class="py-12 text-center text-gray-500">
                                            No Data
                                        </td>
                                    </tr>
                                `}
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- Pagination -->
                    <div class="border-t border-gray-100 p-4 flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <span class="text-sm text-gray-500">Total ${totalBids}</span>
                            <div class="flex items-center gap-2">
                                <span class="text-sm text-gray-500">Rows per page:</span>
                                <select onchange="app.updateFcasPriceAvailabilityState('bids.itemsPerPage', Number(this.value))" class="border border-gray-300 rounded text-sm text-gray-600 focus:outline-none focus:border-manta-primary">
                                    <option value="10" ${itemsPerPage === 10 ? 'selected' : ''}>10</option>
                                    <option value="20" ${itemsPerPage === 20 ? 'selected' : ''}>20</option>
                                    <option value="50" ${itemsPerPage === 50 ? 'selected' : ''}>50</option>
                                    <option value="100" ${itemsPerPage === 100 ? 'selected' : ''}>100</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button onclick="app.updateFcasPriceAvailabilityState('bids.currentPage', ${validCurrentPage - 1})" ${validCurrentPage <= 1 ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                                <i data-lucide="chevron-left" class="w-5 h-5"></i>
                            </button>
                            ${pages.map(pageNum => {
                                if (pageNum === '...') {
                                    return '<span class="w-6 h-6 flex items-center justify-center text-gray-400 text-xs">...</span>';
                                }
                                return `<button onclick="app.updateFcasPriceAvailabilityState('bids.currentPage', ${pageNum})" class="w-6 h-6 flex items-center justify-center rounded ${pageNum === validCurrentPage ? 'bg-manta-primary text-white' : 'hover:bg-gray-100 text-gray-600'} text-xs font-medium">${pageNum}</button>`;
                            }).join('')}
                            <button onclick="app.updateFcasPriceAvailabilityState('bids.currentPage', ${validCurrentPage + 1})" ${validCurrentPage >= totalPages ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                                <i data-lucide="chevron-right" class="w-5 h-5"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        lucide.createIcons({
            root: container
        });
        
        this.initFcasChart(MOCK_DATA.fcasData.chartData);
    },

    initFcasChart(data) {
        const chartDom = document.getElementById('fcas-chart');
        if (!chartDom) return;
        
        const myChart = echarts.init(chartDom);
        const option = {
            grid: {
                top: 40,
                right: 40,
                bottom: 20,
                left: 40,
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'cross' }
            },
            xAxis: {
                type: 'category',
                data: data.map(item => item.time),
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { color: '#9CA3AF', interval: 5 } // Show every 6th label (1 hour)
            },
            yAxis: [
                {
                    type: 'value',
                    name: 'Price ($/MWh)',
                    position: 'left',
                    splitLine: { lineStyle: { type: 'dashed' } },
                    axisLabel: { color: '#9CA3AF' }
                },
                {
                    type: 'value',
                    name: 'Capacity (MW)',
                    position: 'right',
                    splitLine: { show: false },
                    axisLabel: { color: '#9CA3AF' }
                }
            ],
            series: [
                {
                    name: 'Price',
                    type: 'line',
                    yAxisIndex: 0,
                    data: data.map(item => item.price),
                    smooth: true,
                    showSymbol: false,
                    lineStyle: { color: '#EAB308', width: 2 } // Yellow/Orange
                },
                {
                    name: 'Capacity',
                    type: 'line',
                    yAxisIndex: 1,
                    data: data.map(item => item.capacity),
                    smooth: true,
                    showSymbol: false,
                    lineStyle: { color: '#22C55E', width: 2 }, // Green
                    areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: '#22C55E66'}, {offset: 1, color: '#22C55E00'}]) }
                }
            ]
        };
        
        myChart.setOption(option);
        window.addEventListener('resize', () => myChart.resize());
    },

    updateFcasState(key, value) {
        state.fcasPriceAvailability[key] = value;
        this.renderFcasPriceAvailability(document.getElementById('content-area'));
    },

    updateReportsVppEventsState(key, value) {
        state.reportsVppEvents[key] = value;
        this.renderReportsVppEvents(document.getElementById('content-area'));
    },

    updateReportsDerEventsState(key, value) {
        state.reportsDerEvents[key] = value;
        this.renderReportsDerEvents(document.getElementById('content-area'));
    },

    renderReportsVppEvents(container) {
        const { currentPage, itemsPerPage } = state.reportsVppEvents;
        
        // Mock data expansion for pagination demo
        let allEvents = [...MOCK_DATA.reportsVppEvents];
        // Duplicate to have enough items for pagination demo
        while (allEvents.length < 55) {
             allEvents = [...allEvents, ...MOCK_DATA.reportsVppEvents.map((e, i) => ({...e, id: allEvents.length + 1 + i}))];
        }

        const totalItems = allEvents.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
        const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
        
        const startIdx = (validCurrentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const events = allEvents.slice(startIdx, endIdx);

        // Calculate pagination pages
        let pages = [];
        if (totalPages > 0) {
            if (totalPages <= 7) {
                pages = Array.from({length: totalPages}, (_, i) => i + 1);
            } else {
                if (validCurrentPage <= 4) {
                    pages = [1, 2, 3, 4, 5, '...', totalPages];
                } else if (validCurrentPage >= totalPages - 3) {
                    pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                } else {
                    pages = [1, '...', validCurrentPage - 1, validCurrentPage, validCurrentPage + 1, '...', totalPages];
                }
            }
        }
        
        container.innerHTML = `
            <div class="flex flex-col gap-6 w-full h-full overflow-y-auto">
                <!-- Filters Section -->
                <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div class="flex items-end gap-4">
                        <div class="flex-1">
                            <label class="block text-xs font-medium text-gray-500 mb-1">Time</label>
                            <div class="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
                                <i data-lucide="clock" class="w-4 h-4 text-gray-400"></i>
                                <input type="text" placeholder="-" class="w-full text-sm outline-none bg-transparent">
                            </div>
                        </div>
                        <div class="flex-1">
                            <label class="block text-xs font-medium text-gray-500 mb-1">Status</label>
                            <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-1 focus:ring-green-500">
                                <option>All</option>
                                <option>Success</option>
                                <option>Partially Success</option>
                                <option>Failed</option>
                            </select>
                        </div>
                        <div class="flex-1">
                            <label class="block text-xs font-medium text-gray-500 mb-1">Event Type</label>
                            <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-1 focus:ring-green-500">
                                <option>All</option>
                                <option>Discharge</option>
                                <option>Charge</option>
                            </select>
                        </div>
                         <div class="flex-1">
                            <label class="block text-xs font-medium text-gray-500 mb-1">VPP Name</label>
                            <input type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-green-500">
                        </div>
                        <button class="px-8 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition-colors">
                            Search
                        </button>
                    </div>
                </div>

                <!-- Table Section -->
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col flex-1 overflow-hidden">
                     <div class="flex items-center justify-end px-6 py-4 gap-4 border-b border-gray-100">
                         <div class="flex items-center gap-4">
                             <span class="text-sm text-gray-500">Total ${totalItems}</span>
                             <div class="flex items-center gap-2">
                                <span class="text-sm text-gray-500">Rows per page:</span>
                                <select onchange="app.updateReportsVppEventsState('itemsPerPage', Number(this.value))" class="border border-gray-300 rounded text-sm text-gray-600 focus:outline-none focus:border-manta-primary">
                                    <option value="10" ${itemsPerPage === 10 ? 'selected' : ''}>10</option>
                                    <option value="20" ${itemsPerPage === 20 ? 'selected' : ''}>20</option>
                                    <option value="50" ${itemsPerPage === 50 ? 'selected' : ''}>50</option>
                                    <option value="100" ${itemsPerPage === 100 ? 'selected' : ''}>100</option>
                                </select>
                            </div>
                         </div>
                         
                         <!-- Pagination Controls -->
                         <div class="flex items-center gap-2 text-sm">
                            <button onclick="app.updateReportsVppEventsState('currentPage', ${validCurrentPage - 1})" ${validCurrentPage <= 1 ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                                <i data-lucide="chevron-left" class="w-5 h-5"></i>
                            </button>
                            ${pages.map(pageNum => {
                                if (pageNum === '...') {
                                    return '<span class="w-6 h-6 flex items-center justify-center text-gray-400 text-xs">...</span>';
                                }
                                return `<button onclick="app.updateReportsVppEventsState('currentPage', ${pageNum})" class="w-6 h-6 flex items-center justify-center rounded ${pageNum === validCurrentPage ? 'bg-manta-primary text-white' : 'hover:bg-gray-100 text-gray-600'} text-xs font-medium">${pageNum}</button>`;
                            }).join('')}
                            <button onclick="app.updateReportsVppEventsState('currentPage', ${validCurrentPage + 1})" ${validCurrentPage >= totalPages ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                                <i data-lucide="chevron-right" class="w-5 h-5"></i>
                            </button>
                         </div>
                         
                         <div class="flex items-center gap-2 text-sm text-gray-500 border-l border-gray-200 pl-4 ml-2">
                             <span>Go to</span>
                             <input type="text" value="${validCurrentPage}" onchange="app.updateReportsVppEventsState('currentPage', Number(this.value))" class="w-10 px-2 py-1 border border-gray-300 rounded text-center text-xs focus:outline-none focus:border-green-500">
                         </div>
                     </div>

                    <div class="flex-1 overflow-auto">
                        <table class="w-full text-sm text-left">
                            <thead class="text-xs text-gray-700 font-bold bg-gray-50 sticky top-0">
                                <tr>
                                    <th class="px-6 py-4 w-16"></th>
                                    <th class="px-6 py-4">VPP Name</th>
                                    <th class="px-6 py-4">Event Type</th>
                                    <th class="px-6 py-4">Date</th>
                                    <th class="px-6 py-4">Start Time - End Time</th>
                                    <th class="px-6 py-4">Power</th>
                                    <th class="px-6 py-4">Spot Price</th>
                                    <th class="px-6 py-4">Volume</th>
                                    <th class="px-6 py-4">VPP Income</th>
                                    <th class="px-6 py-4">Status</th>
                                    <th class="px-6 py-4 w-64">Notes</th>
                                    <th class="px-6 py-4">Service Tag</th>
                                    <th class="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${events.map((event, idx) => `
                                    <tr class="hover:bg-gray-50 transition-colors group">
                                        <td class="px-6 py-4 text-gray-500">${event.id}</td>
                                        <td class="px-6 py-4">
                                            <a href="#" class="text-blue-500 hover:text-blue-700 font-medium">${event.vppName}</a>
                                        </td>
                                        <td class="px-6 py-4 text-gray-600">${event.eventType}</td>
                                        <td class="px-6 py-4 text-gray-600 whitespace-nowrap">${event.date}</td>
                                        <td class="px-6 py-4 text-gray-600 whitespace-nowrap">${event.timeRange}</td>
                                        <td class="px-6 py-4 text-gray-900">${event.power}</td>
                                        <td class="px-6 py-4 text-gray-900 font-medium">${event.spotPrice}</td>
                                        <td class="px-6 py-4 text-gray-900">${event.volume}</td>
                                        <td class="px-6 py-4 text-gray-900">${event.vppIncome}</td>
                                        <td class="px-6 py-4">
                                            <span class="${
                                                event.status === 'Success' ? 'text-green-600' : 
                                                event.status === 'Partially Success' ? 'text-orange-500' : 'text-red-500'
                                            } font-medium block w-max">
                                                ${event.status}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 text-gray-500 text-xs leading-relaxed">${event.notes}</td>
                                        <td class="px-6 py-4 text-gray-500">${event.serviceTag}</td>
                                        <td class="px-6 py-4">
                                            <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                                                    <i data-lucide="external-link" class="w-4 h-4"></i>
                                                </button>
                                                <button class="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
                                                    <i data-lucide="refresh-cw" class="w-4 h-4"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        
        lucide.createIcons({
            root: container
        });
    },

    renderReportsDerEvents(container) {
        const { currentPage, itemsPerPage } = state.reportsDerEvents;
        
        // Mock data expansion for pagination demo
        let allEvents = [...MOCK_DATA.reportsDerEvents];
        // Duplicate to have enough items for pagination demo
        while (allEvents.length < 55) {
             allEvents = [...allEvents, ...MOCK_DATA.reportsDerEvents.map((e, i) => ({...e, id: allEvents.length + 1 + i}))];
        }

        const totalItems = allEvents.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
        const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
        
        const startIdx = (validCurrentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const events = allEvents.slice(startIdx, endIdx);

        // Calculate pagination pages
        let pages = [];
        if (totalPages > 0) {
            if (totalPages <= 7) {
                pages = Array.from({length: totalPages}, (_, i) => i + 1);
            } else {
                if (validCurrentPage <= 4) {
                    pages = [1, 2, 3, 4, 5, '...', totalPages];
                } else if (validCurrentPage >= totalPages - 3) {
                    pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                } else {
                    pages = [1, '...', validCurrentPage - 1, validCurrentPage, validCurrentPage + 1, '...', totalPages];
                }
            }
        }
        
        container.innerHTML = `
            <div class="flex flex-col gap-6 w-full h-full overflow-y-auto">
                <!-- Filters Section -->
                <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div class="flex items-end gap-4">
                        <div class="flex-1">
                            <label class="block text-xs font-medium text-gray-500 mb-1">Time</label>
                            <div class="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
                                <i data-lucide="clock" class="w-4 h-4 text-gray-400"></i>
                                <input type="text" placeholder="-" class="w-full text-sm outline-none bg-transparent">
                            </div>
                        </div>
                        <div class="flex-1">
                            <label class="block text-xs font-medium text-gray-500 mb-1">Event Type</label>
                            <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-1 focus:ring-green-500">
                                <option>All</option>
                                <option>Discharge</option>
                                <option>Charge</option>
                            </select>
                        </div>
                        <div class="flex-1">
                            <label class="block text-xs font-medium text-gray-500 mb-1">Status</label>
                            <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-1 focus:ring-green-500">
                                <option>All</option>
                                <option>Completed</option>
                                <option>Failed</option>
                            </select>
                        </div>
                        <div class="flex-1">
                            <label class="block text-xs font-medium text-gray-500 mb-1">From</label>
                            <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-1 focus:ring-green-500">
                                <option>All</option>
                                <option>User</option>
                                <option>System</option>
                            </select>
                        </div>
                        <div class="flex-1">
                            <label class="block text-xs font-medium text-gray-500 mb-1">SN</label>
                            <input type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-green-500">
                        </div>
                        <button class="px-8 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition-colors">
                            Search
                        </button>
                    </div>
                </div>

                <!-- Table Section -->
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col flex-1 overflow-hidden">
                     <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                         <button class="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors">
                             Export
                         </button>
                         
                         <div class="flex items-center gap-4">
                             <span class="text-sm text-gray-500">Total ${totalItems}</span>
                             <div class="flex items-center gap-2">
                                <span class="text-sm text-gray-500">Rows per page:</span>
                                <select onchange="app.updateReportsDerEventsState('itemsPerPage', Number(this.value))" class="border border-gray-300 rounded text-sm text-gray-600 focus:outline-none focus:border-manta-primary">
                                    <option value="10" ${itemsPerPage === 10 ? 'selected' : ''}>10</option>
                                    <option value="20" ${itemsPerPage === 20 ? 'selected' : ''}>20</option>
                                    <option value="50" ${itemsPerPage === 50 ? 'selected' : ''}>50</option>
                                    <option value="100" ${itemsPerPage === 100 ? 'selected' : ''}>100</option>
                                </select>
                            </div>
                             
                             <!-- Pagination Controls -->
                             <div class="flex items-center gap-2 text-sm ml-4">
                                <button onclick="app.updateReportsDerEventsState('currentPage', ${validCurrentPage - 1})" ${validCurrentPage <= 1 ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                                    <i data-lucide="chevron-left" class="w-5 h-5"></i>
                                </button>
                                ${pages.map(pageNum => {
                                    if (pageNum === '...') {
                                        return '<span class="w-6 h-6 flex items-center justify-center text-gray-400 text-xs">...</span>';
                                    }
                                    return `<button onclick="app.updateReportsDerEventsState('currentPage', ${pageNum})" class="w-6 h-6 flex items-center justify-center rounded ${pageNum === validCurrentPage ? 'bg-manta-primary text-white' : 'hover:bg-gray-100 text-gray-600'} text-xs font-medium">${pageNum}</button>`;
                                }).join('')}
                                <button onclick="app.updateReportsDerEventsState('currentPage', ${validCurrentPage + 1})" ${validCurrentPage >= totalPages ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                                    <i data-lucide="chevron-right" class="w-5 h-5"></i>
                                </button>
                             </div>
                             
                             <div class="flex items-center gap-2 text-sm text-gray-500 border-l border-gray-200 pl-4 ml-2">
                                 <span>Go to</span>
                                 <input type="text" value="${validCurrentPage}" onchange="app.updateReportsDerEventsState('currentPage', Number(this.value))" class="w-10 px-2 py-1 border border-gray-300 rounded text-center text-xs focus:outline-none focus:border-green-500">
                             </div>
                         </div>
                     </div>

                    <div class="flex-1 overflow-auto">
                        <table class="w-full text-sm text-left">
                            <thead class="text-xs text-gray-700 font-bold bg-gray-50 sticky top-0">
                                <tr>
                                    <th class="px-6 py-4 w-16"></th>
                                    <th class="px-6 py-4">SN</th>
                                    <th class="px-6 py-4">Event Type</th>
                                    <th class="px-6 py-4">Date</th>
                                    <th class="px-6 py-4">Start Time - End Time</th>
                                    <th class="px-6 py-4">From</th>
                                    <th class="px-6 py-4">Power</th>
                                    <th class="px-6 py-4">Spot Price</th>
                                    <th class="px-6 py-4">Volume</th>
                                    <th class="px-6 py-4">VPP Income</th>
                                    <th class="px-6 py-4 w-64">Notes</th>
                                    <th class="px-6 py-4">Status</th>
                                    <th class="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${events.map((event, idx) => `
                                    <tr class="hover:bg-gray-50 transition-colors group">
                                        <td class="px-6 py-4 text-gray-500">${event.id}</td>
                                        <td class="px-6 py-4">
                                            <a href="#" class="text-blue-500 hover:text-blue-700 font-medium">${event.sn}</a>
                                        </td>
                                        <td class="px-6 py-4 text-gray-600">${event.eventType}</td>
                                        <td class="px-6 py-4 text-gray-600 whitespace-nowrap">${event.date}</td>
                                        <td class="px-6 py-4 text-gray-600 whitespace-nowrap">${event.timeRange}</td>
                                        <td class="px-6 py-4 text-gray-600">${event.from}</td>
                                        <td class="px-6 py-4 text-gray-900">${event.power}</td>
                                        <td class="px-6 py-4 text-gray-900 font-medium">${event.spotPrice}</td>
                                        <td class="px-6 py-4 text-gray-900">${event.volume}</td>
                                        <td class="px-6 py-4 text-gray-900">${event.vppIncome}</td>
                                        <td class="px-6 py-4 text-gray-500 text-xs leading-relaxed">${event.notes}</td>
                                        <td class="px-6 py-4">
                                            <span class="text-gray-900 font-medium block w-max">
                                                ${event.status}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4">
                                            <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button class="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
                                                    <i data-lucide="refresh-cw" class="w-4 h-4"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        
        lucide.createIcons({
            root: container
        });
    },

    initCapGraphChart(data) {
        const chartDom = document.getElementById('cap-graph-chart');
        if (!chartDom) return;
        
        const myChart = echarts.init(chartDom);
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'cross' }
            },
            legend: {
                data: ['Available capacity', 'SOC'],
                top: 0
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: data.map(item => item.time),
                axisLine: { lineStyle: { color: '#9CA3AF' } },
                axisLabel: { color: '#6B7280' }
            },
            yAxis: [
                {
                    type: 'value',
                    name: 'kWh',
                    position: 'left',
                    axisLine: { show: true, lineStyle: { color: '#9CA3AF' } },
                    axisLabel: { color: '#6B7280' },
                    splitLine: { lineStyle: { type: 'dashed', color: '#E5E7EB' } }
                },
                {
                    type: 'value',
                    name: '%',
                    min: 0,
                    max: 100,
                    position: 'right',
                    axisLine: { show: true, lineStyle: { color: '#9CA3AF' } },
                    axisLabel: { color: '#6B7280' },
                    splitLine: { show: false }
                }
            ],
            series: [
                {
                    name: 'Available capacity',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(250, 204, 21, 0.5)' },
                            { offset: 1, color: 'rgba(250, 204, 21, 0.1)' }
                        ])
                    },
                    lineStyle: { color: '#FACC15', width: 0 },
                    itemStyle: { color: '#FACC15' },
                    data: data.map(item => item.capacity)
                },
                {
                    name: 'SOC',
                    type: 'line',
                    yAxisIndex: 1,
                    smooth: true,
                    symbol: 'none',
                    lineStyle: { color: '#EAB308', width: 2 },
                    itemStyle: { color: '#EAB308' },
                    data: data.map(item => item.soc)
                }
            ]
        };

        myChart.setOption(option);
        
        // Handle Resize
        window.addEventListener('resize', () => myChart.resize());
        
        // Cleanup on destroy if needed (though app structure is simple here)
    },

    updateCapGraphState(key, value) {
        state.capGraph[key] = value;
        this.renderCapGraph(document.getElementById('content-area'));
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
                        <label class="block text-sm font-medium text-gray-700 mb-1">Pricing Region</label>
                        <select class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-manta-primary focus:border-manta-primary">
                            <option>Select Pricing Region</option>
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

                <!-- Row 3: Event -->
                <div class="space-y-4">
                    <h4 class="text-sm font-semibold text-gray-900">Event</h4>
                    
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
        const { currentPage } = state.tradingEvents;
        const itemsPerPage = state.tradingEvents.itemsPerPage || 10;
        
        const events = MOCK_DATA.tradingEvents;
        const totalItems = events.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
        const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

        const startIdx = (validCurrentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const slicedEvents = events.slice(startIdx, endIdx);

        // Calculate pagination pages
        let pages = [];
        if (totalPages > 0) {
            if (totalPages <= 7) {
                pages = Array.from({length: totalPages}, (_, i) => i + 1);
            } else {
                if (validCurrentPage <= 4) {
                    pages = [1, 2, 3, 4, 5, '...', totalPages];
                } else if (validCurrentPage >= totalPages - 3) {
                    pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                } else {
                    pages = [1, '...', validCurrentPage - 1, validCurrentPage, validCurrentPage + 1, '...', totalPages];
                }
            }
        }
        
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
                            <label class="block text-xs font-medium text-gray-500 mb-1">Pricing Region</label>
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
                         <span class="text-xs text-gray-500">Total ${totalItems}</span>
                    </div>
                    <div class="overflow-auto flex-1">
                        <table class="w-full text-sm text-left">
                            <thead class="text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100 bg-gray-50 sticky top-0">
                                <tr>
                                    <th class="px-6 py-3 font-medium">Date</th>
                                    <th class="px-6 py-3 font-medium">VPP</th>
                                    <th class="px-6 py-3 font-medium">Pricing Region</th>
                                    <th class="px-6 py-3 font-medium">Trigger Type</th>
                                    <th class="px-6 py-3 font-medium">Event</th>
                                    <th class="px-6 py-3 font-medium">Spot</th>
                                    <th class="px-6 py-3 font-medium">Start Time</th>
                                    <th class="px-6 py-3 font-medium">End Time</th>
                                    <th class="px-6 py-3 font-medium">Power</th>
                                    <th class="px-6 py-3 font-medium">Volume</th>
                                    <th class="px-6 py-3 font-medium">Status</th>
                                    <th class="px-6 py-3 font-medium">Event</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100" id="trading-events-tbody">
                                ${this.renderTradingEventsRows(slicedEvents)}
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- Pagination -->
                    <div class="border-t border-gray-100 p-4 flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <span class="text-sm text-gray-500">Total ${totalItems}</span>
                            <div class="flex items-center gap-2">
                                <span class="text-sm text-gray-500">Rows per page:</span>
                                <select onchange="app.updateTradingState('tradingEvents.itemsPerPage', Number(this.value))" class="border border-gray-300 rounded text-sm text-gray-600 focus:outline-none focus:border-manta-primary">
                                    <option value="10" ${itemsPerPage === 10 ? 'selected' : ''}>10</option>
                                    <option value="20" ${itemsPerPage === 20 ? 'selected' : ''}>20</option>
                                    <option value="50" ${itemsPerPage === 50 ? 'selected' : ''}>50</option>
                                    <option value="100" ${itemsPerPage === 100 ? 'selected' : ''}>100</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button onclick="app.updateTradingState('tradingEvents.currentPage', ${validCurrentPage - 1})" ${validCurrentPage <= 1 ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                                <i data-lucide="chevron-left" class="w-5 h-5"></i>
                            </button>
                            ${pages.map(pageNum => {
                                if (pageNum === '...') return `<span class="px-2 text-gray-400">...</span>`;
                                return `<button onclick="app.updateTradingState('tradingEvents.currentPage', ${pageNum})" class="w-6 h-6 flex items-center justify-center rounded ${pageNum === validCurrentPage ? 'bg-manta-primary text-white' : 'hover:bg-gray-100 text-gray-600'} text-xs font-medium">${pageNum}</button>`;
                            }).join('')}
                            <button onclick="app.updateTradingState('tradingEvents.currentPage', ${validCurrentPage + 1})" ${validCurrentPage >= totalPages ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                                <i data-lucide="chevron-right" class="w-5 h-5"></i>
                            </button>
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
        const { state: stateFilter, vppName, currentPage } = state.smartFeedInRules;
        
        // Filter logic
        let filteredRules = MOCK_DATA.smartFeedInRules.filter(rule => {
            const matchState = stateFilter === 'All' || rule.state === stateFilter;
            const matchVppName = !vppName || rule.vppName.toLowerCase().includes(vppName.toLowerCase());
            return matchState && matchVppName;
        });

        const total = filteredRules.length;
        const itemsPerPage = state.smartFeedInRules.itemsPerPage || 10;
        const totalItems = filteredRules.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
        const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

        // Pagination logic
        const startIdx = (validCurrentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const rules = filteredRules.slice(startIdx, endIdx);

        // Calculate pagination pages
        let pages = [];
        if (totalPages > 0) {
            if (totalPages <= 7) {
                pages = Array.from({length: totalPages}, (_, i) => i + 1);
            } else {
                if (validCurrentPage <= 4) {
                    pages = [1, 2, 3, 4, 5, '...', totalPages];
                } else if (validCurrentPage >= totalPages - 3) {
                    pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                } else {
                    pages = [1, '...', validCurrentPage - 1, validCurrentPage, validCurrentPage + 1, '...', totalPages];
                }
            }
        }
        
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
                            <label class="block text-xs font-medium text-gray-500 mb-1">Pricing Region</label>
                            <select onchange="app.updateSmartFeedInState('smartFeedInRules.state', this.value)" class="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-manta-primary focus:border-manta-primary sm:text-sm bg-white">
                                <option value="All" ${stateFilter === 'All' ? 'selected' : ''}>All</option>
                                <option value="NSW" ${stateFilter === 'NSW' ? 'selected' : ''}>NSW</option>
                                <option value="VIC" ${stateFilter === 'VIC' ? 'selected' : ''}>VIC</option>
                                <option value="QLD" ${stateFilter === 'QLD' ? 'selected' : ''}>QLD</option>
                                <option value="SA" ${stateFilter === 'SA' ? 'selected' : ''}>SA</option>
                            </select>
                        </div>
                        <div class="flex-1 min-w-[200px]">
                            <label class="block text-xs font-medium text-gray-500 mb-1">VPP Name</label>
                            <input type="text" value="${vppName}" oninput="app.updateSmartFeedInState('smartFeedInRules.vppName', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-manta-primary focus:border-manta-primary sm:text-sm">
                        </div>
                        <button onclick="app.renderSmartFeedInRules(document.getElementById('content-area'))" class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition-colors">
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
                                    <th class="px-6 py-3 font-medium text-left w-16">#</th>
                                    <th class="px-6 py-3 font-medium">Pricing Region</th>
                                    <th class="px-6 py-3 font-medium">Trigger Time</th>
                                    <th class="px-6 py-3 font-medium">Trigger Price</th>
                                    <th class="px-6 py-3 font-medium">SOC Reserve</th>
                                    <th class="px-6 py-3 font-medium">VPP Name</th>
                                    <th class="px-6 py-3 font-medium">Last Modified At</th>
                                    <th class="px-6 py-3 font-medium">Number of Events Triggered</th>
                                    <th class="px-6 py-3 font-medium">Active</th>
                                    <th class="px-6 py-3 font-medium text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${rules.length > 0 ? rules.map((rule, idx) => `
                                    <tr class="hover:bg-gray-50 transition-colors">
                                        <td class="px-6 py-4 text-left text-gray-500">${startIdx + idx + 1}</td>
                                        <td class="px-6 py-4 text-gray-900">${rule.state}</td>
                                        <td class="px-6 py-4 text-gray-900">${rule.triggerTime}</td>
                                        <td class="px-6 py-4 font-mono text-gray-900 font-medium">$${typeof rule.triggerPrice === 'number' ? rule.triggerPrice.toFixed(2) : rule.triggerPrice} /MWh</td>
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
                                        <td class="px-6 py-4 text-left">
                                            <div class="flex items-center justify-start gap-2">
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
                                `).join('') : `
                                    <tr>
                                        <td colspan="10" class="px-6 py-12 text-center text-gray-500">No rules found matching your criteria</td>
                                    </tr>
                                `}
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- Pagination -->
                    <div class="border-t border-gray-100 p-4 flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <span class="text-sm text-gray-500">Total ${totalItems}</span>
                            <div class="flex items-center gap-2">
                                <span class="text-sm text-gray-500">Rows per page:</span>
                                <select onchange="app.updateSmartFeedInState('smartFeedInRules.itemsPerPage', Number(this.value))" class="border border-gray-300 rounded text-sm text-gray-600 focus:outline-none focus:border-manta-primary">
                                    <option value="10" ${itemsPerPage === 10 ? 'selected' : ''}>10</option>
                                    <option value="20" ${itemsPerPage === 20 ? 'selected' : ''}>20</option>
                                    <option value="50" ${itemsPerPage === 50 ? 'selected' : ''}>50</option>
                                    <option value="100" ${itemsPerPage === 100 ? 'selected' : ''}>100</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button onclick="app.updateSmartFeedInState('smartFeedInRules.currentPage', ${validCurrentPage - 1})" ${validCurrentPage <= 1 ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                                <i data-lucide="chevron-left" class="w-5 h-5"></i>
                            </button>
                            ${pages.map(pageNum => {
                                if (pageNum === '...') {
                                    return '<span class="w-6 h-6 flex items-center justify-center text-gray-400 text-xs">...</span>';
                                }
                                return `<button onclick="app.updateSmartFeedInState('smartFeedInRules.currentPage', ${pageNum})" class="w-6 h-6 flex items-center justify-center rounded ${pageNum === validCurrentPage ? 'bg-green-600 text-white' : 'hover:bg-gray-100 text-gray-600'} text-xs font-medium">${pageNum}</button>`;
                            }).join('')}
                            <button onclick="app.updateSmartFeedInState('smartFeedInRules.currentPage', ${validCurrentPage + 1})" ${validCurrentPage >= totalPages ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                                <i data-lucide="chevron-right" class="w-5 h-5"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Start monitoring simulation
        this.startSmartFeedInSimulation();
        lucide.createIcons({
            root: container
        });
    },

    renderSmartFeedInEvents(container) {
        const { currentPage } = state.smartFeedInEvents;
        const itemsPerPage = state.smartFeedInEvents.itemsPerPage || 10;
        
        const events = MOCK_DATA.smartFeedInEvents;
        const totalItems = events.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
        const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

        const startIdx = (validCurrentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const slicedEvents = events.slice(startIdx, endIdx);

        // Calculate pagination pages
        let pages = [];
        if (totalPages > 0) {
            if (totalPages <= 7) {
                pages = Array.from({length: totalPages}, (_, i) => i + 1);
            } else {
                if (validCurrentPage <= 4) {
                    pages = [1, 2, 3, 4, 5, '...', totalPages];
                } else if (validCurrentPage >= totalPages - 3) {
                    pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                } else {
                    pages = [1, '...', validCurrentPage - 1, validCurrentPage, validCurrentPage + 1, '...', totalPages];
                }
            }
        }
        
        container.className = "w-full h-full bg-[#f8f9fb] p-[8px]";
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
                                    <th class="px-6 py-3 font-medium text-left w-16">#</th>
                                    <th class="px-6 py-3 font-medium">Time</th>
                                    <th class="px-6 py-3 font-medium">Type</th>
                                    <th class="px-6 py-3 font-medium">Value</th>
                                    <th class="px-6 py-3 font-medium">Threshold</th>
                                    <th class="px-6 py-3 font-medium">Status</th>
                                    <th class="px-6 py-3 font-medium">Details</th>
                                    <th class="px-6 py-3 font-medium text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100" id="safety-events-tbody">
                                ${this.renderSafetyEventsRows(slicedEvents)}
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- Pagination -->
                    <div class="border-t border-gray-100 p-4 flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <span class="text-sm text-gray-500">Total ${totalItems}</span>
                            <div class="flex items-center gap-2">
                                <span class="text-sm text-gray-500">Rows per page:</span>
                                <select onchange="app.updateSmartFeedInState('smartFeedInEvents.itemsPerPage', Number(this.value))" class="border border-gray-300 rounded text-sm text-gray-600 focus:outline-none focus:border-manta-primary">
                                    <option value="10" ${itemsPerPage === 10 ? 'selected' : ''}>10</option>
                                    <option value="20" ${itemsPerPage === 20 ? 'selected' : ''}>20</option>
                                    <option value="50" ${itemsPerPage === 50 ? 'selected' : ''}>50</option>
                                    <option value="100" ${itemsPerPage === 100 ? 'selected' : ''}>100</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button onclick="app.updateSmartFeedInState('smartFeedInEvents.currentPage', ${validCurrentPage - 1})" ${validCurrentPage <= 1 ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                                <i data-lucide="chevron-left" class="w-5 h-5"></i>
                            </button>
                            ${pages.map(pageNum => {
                                if (pageNum === '...') return `<span class="px-2 text-gray-400">...</span>`;
                                return `<button onclick="app.updateSmartFeedInState('smartFeedInEvents.currentPage', ${pageNum})" class="w-6 h-6 flex items-center justify-center rounded ${pageNum === validCurrentPage ? 'bg-green-600 text-white' : 'hover:bg-gray-100 text-gray-600'} text-xs font-medium">${pageNum}</button>`;
                            }).join('')}
                            <button onclick="app.updateSmartFeedInState('smartFeedInEvents.currentPage', ${validCurrentPage + 1})" ${validCurrentPage >= totalPages ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                                <i data-lucide="chevron-right" class="w-5 h-5"></i>
                            </button>
                        </div>
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
                <td class="px-6 py-4 text-left text-gray-500">${idx + 1}</td>
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
                <td class="px-6 py-4 text-left">
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
        return events.map((event) => {
            const matchedRule = state.tradingRules.find(rule => {
                const ruleNames = [];
                if (rule.vpp) ruleNames.push(rule.vpp);
                if (rule.applicableVpps && rule.applicableVpps.length) {
                    ruleNames.push(...rule.applicableVpps.map(v => v.name).filter(Boolean));
                }
                return ruleNames.some(name => name.toLowerCase() === String(event.vppName || '').toLowerCase());
            });
            const triggerType = matchedRule?.triggerType || event.triggerType || '-';
            const timeParts = event.timeRange ? event.timeRange.split(' - ') : [];
            const startTime = timeParts[0] || '-';
            const endTime = timeParts[1] || '-';
            const power = typeof event.power === 'number' ? `${event.power.toFixed(2)} kW` : (event.power || '-');
            const volume = event.volume || '-';
            const spot = typeof event.price === 'number' ? `$${event.price.toFixed(2)} /MWh` : (event.spot || '-');
            return `
            <tr class="hover:bg-gray-50 transition-colors animate-in fade-in slide-in-from-bottom-1 duration-300">
                <td class="px-6 py-4 text-gray-500">${event.date || '-'}</td>
                <td class="px-6 py-4 font-medium text-blue-600 hover:text-blue-800 cursor-pointer">${event.vppName || '-'}</td>
                <td class="px-6 py-4 text-gray-900">${event.state || '-'}</td>
                <td class="px-6 py-4 text-gray-900">${triggerType}</td>
                <td class="px-6 py-4 text-gray-900">${event.eventType || '-'}</td>
                <td class="px-6 py-4 font-mono text-gray-900 font-medium">${spot}</td>
                <td class="px-6 py-4 text-gray-500">${startTime}</td>
                <td class="px-6 py-4 text-gray-500">${endTime}</td>
                <td class="px-6 py-4 text-gray-900 font-medium">${power}</td>
                <td class="px-6 py-4 text-gray-900 font-medium">${volume}</td>
                <td class="px-6 py-4">
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${event.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}">${event.status || '-'}</span>
                </td>
                <td class="px-6 py-4">
                    <button class="p-1 text-gray-500 hover:text-manta-primary transition-colors" title="View Details">
                        <i data-lucide="eye" class="w-4 h-4"></i>
                    </button>
                </td>
            </tr>
        `;
        }).join('');
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

    renderArbitragePoints(container) {
        // Mock Data
        const generateData = () => {
            const data = [];
            // Generate data for the last 3 days to cover "Yesterday" and "Today" scenarios
            const now = new Date();
            // Round down to nearest 5 minutes
            const minutes = now.getMinutes();
            const roundedMinutes = Math.floor(minutes / 5) * 5;
            now.setMinutes(roundedMinutes);
            now.setSeconds(0);
            now.setMilliseconds(0);

            const signalTypes = ['Discharge', 'Normal', 'Charge', 'FCAS', 'Abnormal'];
            
            // Generate 3 days worth of data points (every 5 minutes)
            // Start from -1 to include the next 5-minute interval
            for (let i = -1; i < 864; i++) {
                const settlementTime = new Date(now.getTime() - i * 5 * 60000);
                const isFuture = i < 0;

                const forecasts = [];
                for (let j = 1; j <= 4; j++) {
                    forecasts.push({
                        time: new Date(settlementTime.getTime() + j * 5 * 60000),
                        price: (Math.random() * 200 - 50).toFixed(2)
                    });
                }

                // Determine signal based on time of day
                const hour = settlementTime.getHours();
                let baseSignal = 'Normal';
                
                if (hour >= 11 && hour <= 14) {
                    baseSignal = 'Charge';
                } else if (hour >= 20 && hour <= 22) {
                    baseSignal = 'Discharge';
                }

                // 100% follow the base signal to ensure strict continuity
                const finalSignal = baseSignal; 

                data.push({
                    settlementTime: settlementTime,
                    forecasts: forecasts,
                    forecastStatus: Math.random() > 0.2, // true = success/green
                    forecastSignalType: finalSignal, // Forecast matches signal for now
                    actualStatus: Math.random() > 0.1,
                    signalType: isFuture ? null : finalSignal,
                    spotPrice: isFuture ? null : (Math.random() * 200 - 50).toFixed(2),
                    forecastPrice: (Math.random() * 200 - 50).toFixed(2)
                });
            }
            return data;
        };

        const allData = generateData();
        // Initial filter state
        let currentMode = 'realtime'; // 'realtime' or 'historical'
        let dateRange = { start: null, end: null };

        container.className = "w-full h-full bg-[#f8f9fb] p-[8px]";
        container.innerHTML = `
            <div class="flex flex-col h-full space-y-4">
                <!-- Combined Overview and Table Section -->
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden">
                    <!-- Top Controls -->
                    <div class="p-4 border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <div class="flex items-center gap-2">
                                    <span class="text-sm font-medium text-gray-500">Pricing Region:</span>
                                    <select class="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-manta-primary focus:border-manta-primary block p-2">
                                        <option>NSW</option>
                                        <option>VIC</option>
                                        <option>QLD</option>
                                        <option>SA</option>
                                        <option>TAS</option>
                                    </select>
                                </div>
                                <!-- Tab Switcher -->
                                <div class="flex p-1 bg-gray-100 rounded-lg">
                                    <button id="arbitrage-tab-realtime" class="px-3 py-1.5 text-sm font-medium text-gray-900 bg-white rounded shadow-sm transition-all">Real-time</button>
                                    <button id="arbitrage-tab-historical" class="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Historical</button>
                                </div>

                                <!-- Date Picker (Hidden by default) -->
                                <div id="arbitrage-date-picker-container" class="hidden animate-in fade-in slide-in-from-left-2 flex items-center gap-2">
                                    <span class="text-sm font-medium text-gray-500">Time:</span>
                                    <div class="flex items-center gap-2">
                                        <div class="relative">
                                             <input id="arbitrage-date-start" type="date" class="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-manta-primary focus:border-manta-primary block p-2">
                                        </div>
                                        <span class="text-gray-400">-</span>
                                        <div class="relative">
                                             <input id="arbitrage-date-end" type="date" class="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-manta-primary focus:border-manta-primary block p-2">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Signal Filters -->
                    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 p-4 bg-gray-50/30">
                        <div id="filter-discharge" class="cursor-pointer bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-center gap-3 transition-all hover:shadow-md hover:scale-[1.02] group">
                            <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 shadow-sm border border-green-100 group-hover:bg-green-100 transition-colors">
                                <i data-lucide="zap" class="w-5 h-5 fill-current"></i>
                            </div>
                            <span class="text-sm font-medium text-gray-700 group-hover:text-green-700 transition-colors">Discharge</span>
                        </div>
                        <div id="filter-normal" class="cursor-pointer bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-center gap-3 transition-all hover:shadow-md hover:scale-[1.02] group">
                            <div class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 shadow-sm border border-gray-200 group-hover:bg-gray-100 transition-colors">
                                <i data-lucide="minus" class="w-5 h-5 fill-current"></i>
                            </div>
                            <span class="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Normal</span>
                        </div>
                        <div id="filter-charge" class="cursor-pointer bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-center gap-3 transition-all hover:shadow-md hover:scale-[1.02] group">
                            <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100 group-hover:bg-blue-100 transition-colors">
                                <i data-lucide="battery-charging" class="w-5 h-5 fill-current"></i>
                            </div>
                            <span class="text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors">Charge</span>
                        </div>
                        <div id="filter-fcas" class="cursor-pointer bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-center gap-3 transition-all hover:shadow-md hover:scale-[1.02] group">
                            <div class="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shadow-sm border border-purple-100 group-hover:bg-purple-100 transition-colors">
                                <i data-lucide="shield" class="w-5 h-5 fill-current"></i>
                            </div>
                            <span class="text-sm font-medium text-gray-700 group-hover:text-purple-700 transition-colors">FCAS</span>
                        </div>
                        <div id="filter-abnormal" class="cursor-pointer bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-center gap-3 transition-all hover:shadow-md hover:scale-[1.02] group">
                            <div class="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 shadow-sm border border-red-100 group-hover:bg-red-100 transition-colors">
                                <i data-lucide="alert-triangle" class="w-5 h-5 fill-current"></i>
                            </div>
                            <span class="text-sm font-medium text-gray-700 group-hover:text-red-700 transition-colors">Abnormal</span>
                        </div>
                    </div>
                    
                    <!-- Table -->
                    <div class="flex-1 p-6 min-h-0 overflow-hidden">
                        <div class="h-full overflow-auto bg-white">
                            <table class="w-full text-left border-collapse">
                                <thead class="sticky top-0 z-10 bg-white">
                                    <tr>
                                        <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee] whitespace-nowrap">Time</th>
                                        <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee] whitespace-nowrap">Spot ($/MW)</th>
                                        <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee] whitespace-nowrap">Forecast Spot ($/MW)</th>
                                        <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee]">Time / Forecast Spot ($/MW)</th>
                                        <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee] text-left whitespace-nowrap">Signal By Forecast</th>
                                        <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee] text-left whitespace-nowrap">Signal By Spot</th>
                                    </tr>
                                </thead>
                                <tbody id="arbitrage-tbody" class="">
                                    <!-- Content rendered by JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Pagination Header -->
                    <div id="arbitrage-pagination" class="border-t border-gray-100 p-4 flex items-center justify-between">
                        <!-- Pagination controls rendered by JS -->
                    </div>
                </div>
            </div>
        `;

        // Pagination Controls Renderer
        const updatePaginationControls = (totalItems, totalPages, currentPage, itemsPerPage) => {
            const paginationContainer = document.getElementById('arbitrage-pagination');
            if (!paginationContainer) return;

            // Calculate pagination pages
            let pages = [];
            if (totalPages > 0) {
                if (totalPages <= 7) {
                    pages = Array.from({length: totalPages}, (_, i) => i + 1);
                } else {
                    if (currentPage <= 4) {
                        pages = [1, 2, 3, 4, 5, '...', totalPages];
                    } else if (currentPage >= totalPages - 3) {
                        pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                    } else {
                        pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
                    }
                }
            }

            paginationContainer.innerHTML = `
                <div class="flex items-center gap-4">
                    <span class="text-sm text-gray-500">Total ${totalItems}</span>
                    <div class="flex items-center gap-2">
                        <span class="text-sm text-gray-500">Rows per page:</span>
                        <select onchange="app.updateArbitrageState('arbitrage.itemsPerPage', Number(this.value))" class="border border-gray-300 rounded text-sm text-gray-600 focus:outline-none focus:border-manta-primary">
                            <option value="10" ${itemsPerPage === 10 ? 'selected' : ''}>10</option>
                            <option value="20" ${itemsPerPage === 20 ? 'selected' : ''}>20</option>
                            <option value="50" ${itemsPerPage === 50 ? 'selected' : ''}>50</option>
                            <option value="100" ${itemsPerPage === 100 ? 'selected' : ''}>100</option>
                        </select>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="app.updateArbitrageState('arbitrage.currentPage', ${currentPage - 1})" ${currentPage <= 1 ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                        <i data-lucide="chevron-left" class="w-5 h-5"></i>
                    </button>
                    ${pages.map(pageNum => {
                        if (pageNum === '...') return `<span class="px-2 text-gray-400">...</span>`;
                        return `<button onclick="app.updateArbitrageState('arbitrage.currentPage', ${pageNum})" class="w-6 h-6 flex items-center justify-center rounded ${pageNum === currentPage ? 'bg-manta-primary text-white' : 'hover:bg-gray-100 text-gray-600'} text-xs font-medium">${pageNum}</button>`;
                    }).join('')}
                    <button onclick="app.updateArbitrageState('arbitrage.currentPage', ${currentPage + 1})" ${currentPage >= totalPages ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                        <i data-lucide="chevron-right" class="w-5 h-5"></i>
                    </button>
                </div>
            `;
            
            if (window.lucide) window.lucide.createIcons();
        };

        // Tab Switching Logic moved below renderTableBody


        // Table Rendering & Filtering Logic
        const renderTableBody = (filteredData) => {
            const tbody = document.getElementById('arbitrage-tbody');
            if (!tbody) return;
            
            tbody.innerHTML = filteredData.map((row, idx) => {
                const timeStr = `${row.settlementTime.getHours()}:${row.settlementTime.getMinutes().toString().padStart(2, '0')}`;
                // const dateStr = '13/01/2026 (+10:00)'; // Removed hardcoded date

                
                const forecastHtml = row.forecasts.map(f => {
                    const fTime = `${f.time.getHours()}:${f.time.getMinutes().toString().padStart(2, '0')}`;
                    return `
                        <div class="flex flex-col min-w-[140px] justify-center h-full py-1">
                            <span class="text-[14px] font-medium text-gray-900 leading-tight">${fTime}</span>
                            <span class="text-[12px] text-gray-500 leading-tight mt-0.5">${f.price}</span>
                        </div>
                    `;
                }).join('');

                const statusClass = (status) => status ? 
                    'bg-green-100 text-green-500 border-green-200' : 
                    'bg-red-100 text-red-500 border-red-200';
                
                const signalColors = {
                    'Discharge': 'bg-green-100 text-green-700 border-green-200',
                    'Normal': 'bg-gray-100 text-gray-700 border-gray-200',
                    'Charge': 'bg-blue-100 text-blue-700 border-blue-200',
                    'FCAS': 'bg-purple-100 text-purple-700 border-purple-200',
                    'Abnormal': 'bg-red-100 text-red-700 border-red-200'
                };
                
                return `
                    <tr class="h-[48px] hover:bg-[#f3f3f6] transition-colors border-b border-[#e6e8ee] animate-in fade-in slide-in-from-bottom-1 duration-300">
                        <td class="px-[8px] whitespace-nowrap">
                            <div class="text-[14px] font-semibold text-[#1c2026] font-['Roboto'] leading-tight">${timeStr}</div>
                        </td>
                        <td class="px-[8px] whitespace-nowrap">
                            <div class="text-[12px] text-gray-500 font-['Roboto'] leading-tight">${row.spotPrice || '-'}</div>
                        </td>
                        <td class="px-[8px] whitespace-nowrap">
                            <div class="text-[12px] text-gray-500 font-['Roboto'] leading-tight">${row.forecastPrice || '-'}</div>
                        </td>
                        <td class="px-[8px]">
                            <div class="flex gap-8 overflow-x-auto pb-1 no-scrollbar">
                                ${forecastHtml}
                            </div>
                        </td>
                        <td class="px-[8px] text-left">
                            <span class="inline-flex items-center gap-[4px] px-[8px] py-[2px] rounded-[12px] text-[12px] font-medium border ${signalColors[row.forecastSignalType]}">
                                ${row.forecastSignalType}
                            </span>
                        </td>
                        <td class="px-[8px] text-left">
                            ${row.signalType ? `
                            <span class="inline-flex items-center gap-[4px] px-[8px] py-[2px] rounded-[12px] text-[12px] font-medium border ${signalColors[row.signalType]}">
                                ${row.signalType}
                            </span>
                            ` : '<span class="text-gray-400">-</span>'}
                        </td>
                    </tr>
                `;
            }).join('');
            
            // Re-initialize Lucide icons for new content
            if (window.lucide) window.lucide.createIcons();
        };

        // Filter & Tab Logic
        let activeFilter = null;

        const applyFilters = () => {
            let filtered = [];
            const now = new Date();
            // Round down to nearest 5 minutes to match data generation
            const minutes = now.getMinutes();
            const roundedMinutes = Math.floor(minutes / 5) * 5;
            now.setMinutes(roundedMinutes);
            now.setSeconds(0);
            now.setMilliseconds(0);
            
            // Add 5 minutes to include the next interval
            const futureLimit = new Date(now.getTime() + 5 * 60000);

            const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            
            if (currentMode === 'realtime') {
                filtered = allData.filter(d => d.settlementTime >= todayStart && d.settlementTime <= futureLimit);
            } else {
                // Historical
                const start = dateRange.start ? new Date(dateRange.start) : new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
                const end = dateRange.end ? new Date(dateRange.end) : new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
                
                // Set times to cover full days
                start.setHours(0, 0, 0, 0);
                end.setHours(23, 59, 59, 999);

                filtered = allData.filter(d => d.settlementTime >= start && d.settlementTime <= end);
            }
            
            // Apply Signal Filter
            if (activeFilter) {
                filtered = filtered.filter(d => d.signalType === activeFilter);
            }

            // Sort by time descending
            filtered.sort((a, b) => b.settlementTime - a.settlementTime);

            // Pagination Logic
            const { currentPage, itemsPerPage } = state.arbitrage;
            const totalItems = filtered.length;
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages || 1));

            // Sync state if needed
            if (state.arbitrage.currentPage !== validCurrentPage) {
                state.arbitrage.currentPage = validCurrentPage;
            }

            const startIdx = (validCurrentPage - 1) * itemsPerPage;
            const endIdx = startIdx + itemsPerPage;
            const paginatedData = filtered.slice(startIdx, endIdx);

            renderTableBody(paginatedData);
            updatePaginationControls(totalItems, totalPages, validCurrentPage, itemsPerPage);
        };

        // Tab Switching Logic
        const tabRealtime = document.getElementById('arbitrage-tab-realtime');
        const tabHistorical = document.getElementById('arbitrage-tab-historical');
        const datePickerContainer = document.getElementById('arbitrage-date-picker-container');
        const dateStartInput = document.getElementById('arbitrage-date-start');
        const dateEndInput = document.getElementById('arbitrage-date-end');

        if (tabRealtime && tabHistorical && datePickerContainer) {
            const updateTabs = (isRealtime) => {
                currentMode = isRealtime ? 'realtime' : 'historical';
                
                if (isRealtime) {
                    tabRealtime.className = "px-3 py-1.5 text-sm font-medium text-gray-900 bg-white rounded shadow-sm transition-all";
                    tabHistorical.className = "px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors";
                    datePickerContainer.classList.add('hidden');
                } else {
                    tabRealtime.className = "px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors";
                    tabHistorical.className = "px-3 py-1.5 text-sm font-medium text-gray-900 bg-white rounded shadow-sm transition-all";
                    datePickerContainer.classList.remove('hidden');
                    
                    // Initialize default dates if needed (Yesterday)
                    if (!dateRange.start) {
                        const yesterday = new Date();
                        yesterday.setDate(yesterday.getDate() - 1);
                        const yStr = yesterday.toISOString().split('T')[0];
                        
                        if (dateStartInput) dateStartInput.value = yStr;
                        if (dateEndInput) dateEndInput.value = yStr;
                        
                        dateRange.start = yStr;
                        dateRange.end = yStr;
                        
                        // Set max to today
                        const todayStr = new Date().toISOString().split('T')[0];
                        if (dateStartInput) dateStartInput.max = todayStr;
                        if (dateEndInput) dateEndInput.max = todayStr;
                    }
                }
                applyFilters();
            };

            tabRealtime.addEventListener('click', () => updateTabs(true));
            tabHistorical.addEventListener('click', () => updateTabs(false));
            
            // Date Picker Listeners
            if (dateStartInput && dateEndInput) {
                dateStartInput.addEventListener('change', (e) => {
                    dateRange.start = e.target.value;
                    applyFilters();
                });
                dateEndInput.addEventListener('change', (e) => {
                    dateRange.end = e.target.value;
                    applyFilters();
                });
            }
        }

        // Add Signal Filter Listeners
        const filters = ['discharge', 'normal', 'charge', 'fcas', 'abnormal'];
        
        filters.forEach(filter => {
            const btn = document.getElementById(`filter-${filter}`);
            if (btn) {
                btn.addEventListener('click', () => {
                    const filterName = filter.charAt(0).toUpperCase() + filter.slice(1);
                    
                    if (activeFilter === filterName) {
                        // Clear Filter
                        activeFilter = null;
                        // Reset styles
                        filters.forEach(f => {
                             const el = document.getElementById(`filter-${f}`);
                             el.classList.remove('ring-2', 'ring-manta-primary', 'bg-gray-50');
                             el.classList.add('bg-white');
                        });
                    } else {
                        // Apply Filter
                        activeFilter = filterName;
                        // Update styles
                        filters.forEach(f => {
                             const el = document.getElementById(`filter-${f}`);
                             if (f === filter) {
                                 el.classList.add('ring-2', 'ring-manta-primary', 'bg-gray-50');
                                 el.classList.remove('bg-white');
                             } else {
                                 el.classList.remove('ring-2', 'ring-manta-primary', 'bg-gray-50');
                                 el.classList.add('bg-white');
                             }
                        });
                    }
                    applyFilters();
                });
            }
        });

        // Initial Render
        applyFilters();
    },

    renderTradingOverview(container) {
        const rules = state.tradingRules;
        const recentRules = rules.slice(0, 5);

        container.className = "w-full h-full bg-[#f8f9fb] p-[8px]";
        container.innerHTML = `
            <div class="flex flex-col h-full gap-4">
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col min-h-0 flex-1">
                    <div class="flex flex-wrap items-center justify-between px-4 py-3 border-b border-gray-100 gap-3">
                        <h3 class="text-lg font-semibold text-gray-900">Trading Rules</h3>
                        <div class="flex items-center gap-2">
                            ${rules.length > 0 ? `
                                <button onclick="app.openTradingRuleDrawer()" class="px-3 py-1.5 text-xs font-medium bg-manta-primary text-white rounded-md hover:bg-manta-dark transition-colors">New</button>
                            ` : ''}
                        </div>
                    </div>
                    <div class="flex-1 overflow-auto">
                        ${rules.length > 0 ? `
                                <table class="w-full text-sm text-left">
                                    <thead class="text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100 bg-gray-50 sticky top-0">
                                        <tr>
                                            <th class="px-4 py-2 font-medium">Pricing Region</th>
                                            <th class="px-4 py-2 font-medium">Trigger From</th>
                                            <th class="px-4 py-2 font-medium">Trigger Condition</th>
                                            <th class="px-4 py-2 font-medium">Event</th>
                                            <th class="px-4 py-2 font-medium">Status</th>
                                            <th class="px-4 py-2 font-medium">Applicable VPP</th>
                                            <th class="px-4 py-2 font-medium">Ignore Time</th>
                                            <th class="px-4 py-2 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-100">
                                        ${recentRules.map(rule => `
                                            <tr class="hover:bg-gray-50 transition-colors">
                                                <td class="px-4 py-3 text-gray-900 font-medium">${rule.region || (['NSW', 'VIC', 'QLD', 'SA', 'WA'].includes(rule.state) ? rule.state : '-')}</td>
                                                <td class="px-4 py-3 text-gray-600">${rule.triggerType === 'Price' ? 'Spot Price' : (rule.triggerType === 'Arbitrage' ? 'Arbitrage Point' : rule.triggerType || '-')}</td>
                                                <td class="px-4 py-3 text-gray-600">${rule.triggerType === 'Price' ? `${rule.priceSource} ${rule.condition} ${rule.price} $/MW` : `${rule.priceSource} = ${rule.arbitrageSignal}`}</td>
                                                <td class="px-4 py-3 text-gray-600">${rule.action || '-'}</td>
                                                <td class="px-4 py-3">
                                                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${rule.state === 'Inactive' ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'}">${rule.state === 'Inactive' ? 'Inactive' : 'Active'}</span>
                                                </td>
                                                <td class="px-4 py-3 text-gray-600">${rule.applicableVpps && rule.applicableVpps.length ? rule.applicableVpps.map(v => `<div class="truncate max-w-[200px]" title="${v.name}">${v.name}</div>`).filter(Boolean).join('') : (rule.vpp || '-')}</td>
                                                <td class="px-4 py-3 text-gray-600">${rule.applicableVpps && rule.applicableVpps.length ? rule.applicableVpps.map(v => {
                                                    if (!v.ignoreTimeEnabled || !v.ignoreTimeStart || !v.ignoreTimeEnd) return '<div>-</div>';
                                                    let content = `${v.ignoreTimeStart} - ${v.ignoreTimeEnd}`;
                                                    const frequency = v.ignoreFrequency || 'Everyday';
                                                    content += ` (${frequency}`;
                                                    if (frequency === 'Custom' && v.ignoreDateStart && v.ignoreDateEnd) {
                                                        content += `: ${v.ignoreDateStart} To ${v.ignoreDateEnd}`;
                                                    }
                                                    content += ')';
                                                    return `<div>${content}</div>`;
                                                }).join('') : '-'}</td>
                                                <td class="px-4 py-3">
                                                    <div class="flex items-center gap-2">
                                                        <button onclick="app.openTradingRuleDrawer(${rule.id})" class="p-1 text-gray-500 hover:text-manta-primary transition-colors" title="Edit">
                                                            <i data-lucide="edit-3" class="w-4 h-4"></i>
                                                        </button>
                                                        <button onclick="app.deleteTradingRule(${rule.id})" class="p-1 text-gray-500 hover:text-red-600 transition-colors" title="Delete">
                                                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            ` : `
                                <div class="h-full flex items-center justify-center p-[20px]">
                                    <div class="bg-[#f3f3f6] w-full rounded-[6px] px-[16px] py-[366px] flex flex-col items-center text-center gap-[10px]">
                                        <div class="relative w-[88px] h-[88px]">
                                            <i data-lucide="scroll-text" class="w-full h-full text-[#b5bcc8]"></i>
                                        </div>
                                        <p class="font-['Roboto'] font-semibold text-[16px] leading-[20px] text-[#313949]">No Rules Created</p>

                                        <button onclick="app.openTradingRuleDrawer()" class="bg-[#3ec064] hover:bg-[#35a656] flex items-center justify-center gap-[6px] h-[40px] px-[24px] rounded-[6px] text-white transition-colors min-w-[100px]">
                                            <div class="w-[20px] h-[20px] flex items-center justify-center">
                                                <i data-lucide="plus" class="w-[14px] h-[14px]"></i>
                                            </div>
                                            <span class="font-['Roboto'] font-semibold text-[14px] leading-[1.42]">Create</span>
                                        </button>
                                    </div>
                                </div>
                            `}
                    </div>
                </div>
            </div>
        `;
        lucide.createIcons();
    },

    renderAccount(container) {
        const users = Array.isArray(MOCK_DATA.users) ? MOCK_DATA.users : [];
        let filteredUsers = [...users];

        if (state.account.status !== 'All') {
            filteredUsers = filteredUsers.filter(user => user.status === state.account.status);
        }

        if (state.account.keyword) {
            const term = state.account.keyword.toLowerCase();
            filteredUsers = filteredUsers.filter(user =>
                String(user.userName || '').toLowerCase().includes(term) ||
                String(user.email || '').toLowerCase().includes(term)
            );
        }

        const itemsPerPage = state.account.itemsPerPage || 10;
        const totalItems = filteredUsers.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
        const currentPage = Math.min(Math.max(1, state.account.currentPage), totalPages);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentUsers = filteredUsers.slice(startIndex, endIndex);

        // Design Tokens
        const styles = `
            --color-neutral-bluegrey: #313949;
            --color-neutral-black: #1c2026;
            --color-neutral-lightgrey: #b5bcc8;
            --color-neutral-thingrey: #f3f3f6;
            --color-neutral-line: #e6e8ee;
            --color-brand-primary: #3ec064;
            --font-roboto: 'Roboto', sans-serif;
        `;

        // Pagination Logic
        let paginationHTML = '';
        if (totalPages > 0) {
            let pages = [];
            if (totalPages <= 7) {
                pages = Array.from({length: totalPages}, (_, i) => i + 1);
            } else {
                if (currentPage <= 4) {
                    pages = [1, 2, 3, 4, 5, '...', totalPages];
                } else if (currentPage >= totalPages - 3) {
                    pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                } else {
                    pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
                }
            }

            paginationHTML = `
            <div class="flex items-center justify-end gap-[12px] px-[16px] py-[16px] mt-auto bg-white">
                <!-- Page Size Selector -->
                <div class="flex items-center gap-[8px] mr-2">
                     <div class="relative group">
                        <select class="appearance-none bg-white border border-[var(--color-neutral-line)] text-[var(--color-neutral-bluegrey)] text-[14px] rounded-[4px] px-[12px] py-[4px] pr-[32px] focus:outline-none focus:border-[var(--color-brand-primary)] cursor-pointer font-['Roboto']" onchange="app.updateAccountState('itemsPerPage', parseInt(this.value))">
                            <option value="10" ${itemsPerPage === 10 ? 'selected' : ''}>10/page</option>
                            <option value="20" ${itemsPerPage === 20 ? 'selected' : ''}>20/page</option>
                            <option value="50" ${itemsPerPage === 50 ? 'selected' : ''}>50/page</option>
                        </select>
                        <div class="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none">
                            <i data-lucide="chevron-down" class="w-[16px] h-[16px] text-[var(--color-neutral-lightgrey)]"></i>
                        </div>
                     </div>
                </div>

                <!-- Pagination -->
                <div class="flex items-center gap-[4px]">
                    <!-- First Page -->
                    <button onclick="app.updateAccountState('currentPage', 1)" ${currentPage === 1 ? 'disabled' : ''} class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-[var(--color-neutral-thingrey)] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <i data-lucide="chevrons-left" class="w-[16px] h-[16px]"></i>
                    </button>
                    <!-- Prev Page -->
                    <button onclick="app.updateAccountState('currentPage', ${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-[var(--color-neutral-thingrey)] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <i data-lucide="chevron-left" class="w-[16px] h-[16px]"></i>
                    </button>
                    
                    <!-- Page Numbers -->
                    ${pages.map(page => {
                        if (page === '...') {
                            return `<span class="w-[32px] h-[32px] flex items-center justify-center text-[#5f646e] font-['Roboto']">...</span>`;
                        }
                        return `
                            <button onclick="app.updateAccountState('currentPage', ${page})" class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] text-[14px] font-medium transition-colors font-['Roboto'] ${page === currentPage ? 'bg-[var(--color-neutral-thingrey)] text-[var(--color-neutral-bluegrey)]' : 'text-[#5f646e] hover:bg-[var(--color-neutral-thingrey)]'}">
                                ${page}
                            </button>
                        `;
                    }).join('')}

                    <!-- Next Page -->
                    <button onclick="app.updateAccountState('currentPage', ${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''} class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-[var(--color-neutral-thingrey)] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <i data-lucide="chevron-right" class="w-[16px] h-[16px]"></i>
                    </button>
                    <!-- Last Page -->
                    <button onclick="app.updateAccountState('currentPage', ${totalPages})" ${currentPage === totalPages ? 'disabled' : ''} class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-[var(--color-neutral-thingrey)] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <i data-lucide="chevrons-right" class="w-[16px] h-[16px]"></i>
                    </button>
                </div>
            </div>
            `;
        }

        container.className = "w-full h-full bg-[#f8f9fb] p-[8px]";
        container.style.cssText = styles;

        if (users.length === 0) {
            container.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full bg-white rounded-xl border border-gray-200 shadow-sm p-8">
                    <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <i data-lucide="users" class="w-8 h-8 text-gray-400"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">No Users</h3>
                    <p class="text-gray-500 text-sm mb-6 max-w-sm text-center">Create your first account to manage access.</p>
                    <button onclick="app.openCreateUserDrawer()" class="flex items-center gap-2 px-6 py-2.5 bg-manta-primary hover:bg-manta-dark text-white font-medium rounded-lg shadow-sm transition-colors group">
                        <i data-lucide="plus" class="w-5 h-5 group-hover:scale-110 transition-transform"></i>
                        New User
                    </button>
                </div>
            `;
            lucide.createIcons();
            return;
        }

        container.innerHTML = `
            <div class="bg-white rounded-[4px] shadow-sm border border-[var(--color-neutral-line)] h-full flex flex-col p-[16px] font-['Roboto']">
                <!-- Header -->
                <div class="flex flex-col md:flex-row justify-start items-center gap-[8px] mb-[16px] flex-shrink-0">
                    <div class="flex items-center gap-[16px]">
                        <!-- Title -->
                        <h2 class="text-[20px] font-semibold text-[var(--color-neutral-bluegrey)] leading-[28px]">Accounts</h2>
                        
                        <!-- Add Button -->
                        <button onclick="app.openCreateUserDrawer()" class="w-[24px] h-[24px] bg-[var(--color-neutral-thingrey)] rounded-[4px] flex items-center justify-center hover:bg-[#e6e8ee] transition-colors">
                            <i data-lucide="plus" class="w-[14px] h-[14px] text-[var(--color-neutral-bluegrey)]"></i>
                        </button>
                    </div>
                    
                    <!-- Search Group -->
                    <div class="flex items-center gap-[12px]">
                         <!-- Search Input -->
                        <div class="bg-[var(--color-neutral-thingrey)] flex items-center px-[8px] py-[4px] rounded-[4px] h-[32px] w-[240px]">
                            <input type="text" 
                                value="${state.account.keyword}"
                                oninput="app.updateAccountState('keyword', this.value)"
                                class="flex-1 bg-transparent border-none focus:ring-0 p-0 text-[14px] font-normal text-[var(--color-neutral-black)] placeholder-[var(--color-neutral-lightgrey)] leading-normal" 
                                placeholder="Search by Email/User Name">
                            <i data-lucide="search" class="w-[16px] h-[16px] text-[var(--color-neutral-lightgrey)]"></i>
                        </div>
                    </div>
                </div>

                <!-- Content Area -->
                <div class="flex-1 overflow-hidden flex flex-col bg-white rounded-[4px]">
                    <div class="overflow-x-auto h-full">
                        <table class="w-full text-left border-collapse">
                            <thead class="sticky top-0 z-10 bg-white">
                                <tr>
                                    <th class="h-[48px] px-[16px] text-[12px] font-normal text-[var(--color-neutral-lightgrey)] border-b border-[var(--color-neutral-line)]">#</th>
                                    <th class="h-[48px] px-[16px] text-[12px] font-normal text-[var(--color-neutral-lightgrey)] border-b border-[var(--color-neutral-line)]">User Name</th>
                                    <th class="h-[48px] px-[16px] text-[12px] font-normal text-[var(--color-neutral-lightgrey)] border-b border-[var(--color-neutral-line)]">Email</th>
                                    <th class="h-[48px] px-[16px] text-[12px] font-normal text-[var(--color-neutral-lightgrey)] border-b border-[var(--color-neutral-line)]">Status</th>
                                    <th class="h-[48px] px-[16px] text-[12px] font-normal text-[var(--color-neutral-lightgrey)] border-b border-[var(--color-neutral-line)]">Login Count</th>
                                    <th class="h-[48px] px-[16px] text-[12px] font-normal text-[var(--color-neutral-lightgrey)] border-b border-[var(--color-neutral-line)]">Last Login Time</th>
                                    <th class="h-[48px] px-[16px] text-[12px] font-normal text-[var(--color-neutral-lightgrey)] border-b border-[var(--color-neutral-line)]">Last Login IP</th>
                                    <th class="h-[48px] px-[16px] text-[12px] font-normal text-[var(--color-neutral-lightgrey)] border-b border-[var(--color-neutral-line)]">Current Login IP</th>
                                    <th class="h-[48px] px-[16px] text-[12px] font-normal text-[var(--color-neutral-lightgrey)] border-b border-[var(--color-neutral-line)]">Create Time</th>
                                    <th class="h-[48px] px-[16px] text-[12px] font-normal text-[var(--color-neutral-lightgrey)] border-b border-[var(--color-neutral-line)]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${currentUsers.map((user, index) => `
                                    <tr class="h-[48px] hover:bg-[var(--color-neutral-thingrey)] transition-colors group border-b border-[var(--color-neutral-line)] bg-white">
                                        <td class="px-[16px] text-[12px] text-[var(--color-neutral-bluegrey)] font-['Roboto']">${startIndex + index + 1}</td>
                                        <td class="px-[16px] text-[14px] font-semibold text-[var(--color-neutral-black)] font-['Roboto']">${user.userName || '-'}</td>
                                        <td class="px-[16px] text-[14px] font-normal text-[var(--color-neutral-black)] font-['Roboto']">${user.email || '-'}</td>
                                        <td class="px-[16px]">
                                            <span class="inline-flex items-center gap-[4px] px-[8px] py-[2px] rounded-[12px] text-[12px] font-['Roboto'] ${user.status === 'Active' ? 'bg-[var(--color-brand-primary)] text-white' : 'bg-[var(--color-neutral-lightgrey)] text-white'}">
                                                ${(user.status || '-').toUpperCase()}
                                            </span>
                                        </td>
                                        <td class="px-[16px] text-[14px] font-normal text-[var(--color-neutral-black)] font-['Roboto']">${user.loginCount ?? '-'}</td>
                                        <td class="px-[16px] text-[14px] font-normal text-[var(--color-neutral-black)] font-['Roboto']">${user.lastLoginTime || '-'}</td>
                                        <td class="px-[16px] text-[14px] font-normal text-[var(--color-neutral-black)] font-['Roboto']">${user.lastLoginIp || '-'}</td>
                                        <td class="px-[16px] text-[14px] font-normal text-[var(--color-neutral-black)] font-['Roboto']">${user.currentLoginIp || '-'}</td>
                                        <td class="px-[16px] text-[14px] font-normal text-[var(--color-neutral-black)] font-['Roboto']">${user.created || user.createTime || '-'}</td>
                                        <td class="px-[16px]">
                                            <div class="flex items-center justify-start gap-[12px]">
                                                <button onclick="app.openEditUserDrawer(${user.id})" class="text-[var(--color-neutral-bluegrey)] hover:text-[var(--color-brand-primary)] transition-colors" title="Edit">
                                                    <i data-lucide="edit-3" class="w-[16px] h-[16px]"></i>
                                                </button>
                                                <button onclick="app.openChangePasswordDrawer(${user.id})" class="text-[var(--color-neutral-bluegrey)] hover:text-[var(--color-brand-primary)] transition-colors" title="Change Password">
                                                    <i data-lucide="key" class="w-[16px] h-[16px]"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                ${paginationHTML}
            </div>
        `;

        lucide.createIcons();
    },

    updateAccountState(key, value) {
        state.account[key] = value;
        if (key !== 'currentPage') {
            state.account.currentPage = 1;
        }
        this.renderAccount(document.getElementById('content-area'));
    },

    openCreateUserDrawer() {
        const drawerContent = document.getElementById('drawer-content');
        if (!drawerContent) return;

        drawerContent.innerHTML = `
            <div class="bg-white flex flex-col h-full w-full font-['Roboto']">
                <!-- Header -->
                <div class="border-b border-[#e6e8ee] flex items-center justify-between p-[16px] shrink-0 w-full bg-white z-10">
                    <p class="font-bold text-[20px] leading-normal text-[#313949]">New User</p>
                    <button onclick="app.closeDrawer()" class="w-[24px] h-[24px] flex items-center justify-center hover:opacity-70 transition-opacity">
                        <i data-lucide="x" class="w-[16px] h-[16px] text-[#313949]"></i>
                    </button>
                </div>
                <!-- Form Content -->
                <form onsubmit="app.handleCreateUserSubmit(event)" class="flex flex-col flex-1 px-[24px] py-[16px] gap-[16px] overflow-y-auto">
                    <!-- First Name -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                        <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                            <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                            <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">First Name</span>
                        </div>
                        <div class="relative w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <input type="text" name="firstName" required class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal">
                        </div>
                    </div>

                    <!-- Last Name -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                        <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                            <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                            <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Last Name</span>
                        </div>
                        <div class="relative w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <input type="text" name="lastName" required class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal">
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                        <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                            <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                            <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Email</span>
                        </div>
                        <div class="relative w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <input type="email" name="email" required class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal">
                        </div>
                    </div>

                    <!-- Status -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                        <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                            <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Status</span>
                        </div>
                        <div class="flex items-center gap-[24px] h-[32px]">
                            <label class="flex items-center gap-[8px] cursor-pointer">
                                <input type="radio" name="status" value="Active" checked class="accent-[#3ec064] w-[16px] h-[16px]">
                                <span class="text-[14px] text-[#313949] font-normal">Active</span>
                            </label>
                            <label class="flex items-center gap-[8px] cursor-pointer">
                                <input type="radio" name="status" value="Inactive" class="accent-[#3ec064] w-[16px] h-[16px]">
                                <span class="text-[14px] text-[#313949] font-normal">Inactive</span>
                            </label>
                        </div>
                    </div>

                    <!-- Password -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                        <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                            <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                            <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Password</span>
                        </div>
                        <div class="relative w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <input type="password" name="password" id="create-user-password" required class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal pr-[24px]">
                            <button type="button" onclick="app.togglePasswordVisibility('create-user-password', this)" class="absolute right-[8px] top-1/2 -translate-y-1/2 text-[#b5bcc8] hover:text-[#313949] transition-colors">
                                <i data-lucide="eye" class="w-[16px] h-[16px]"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Confirm Password -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                        <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                            <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                            <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Confirmation Password</span>
                        </div>
                        <div class="relative w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <input type="password" name="confirmPassword" id="create-user-confirm-password" required class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal pr-[24px]">
                            <button type="button" onclick="app.togglePasswordVisibility('create-user-confirm-password', this)" class="absolute right-[8px] top-1/2 -translate-y-1/2 text-[#b5bcc8] hover:text-[#313949] transition-colors">
                                <i data-lucide="eye" class="w-[16px] h-[16px]"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Footer Buttons -->
                    <div class="flex items-center gap-[10px] pt-[16px] mt-auto w-full">
                        <button type="button" onclick="app.closeDrawer()" class="flex-1 h-[32px] px-[8px] flex items-center justify-center bg-white border border-[#b5bcc8] rounded-[4px] text-[14px] text-[#313949] hover:bg-gray-50 transition-colors font-normal leading-[1.42] font-['Roboto']">
                            Cancel
                        </button>
                        <button type="submit" class="flex-1 h-[32px] px-[8px] flex items-center justify-center bg-[#3ec064] rounded-[4px] text-[14px] text-white hover:bg-[#35a656] transition-colors font-normal leading-[1.42] font-['Roboto']">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        `;

        this.toggleDrawer(true);
        lucide.createIcons();
    },

    handleCreateUserSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        if (data.password !== data.confirmPassword) {
            this.showToast('Passwords do not match', 'error');
            return;
        }

        const newUser = {
            id: MOCK_DATA.users.length + 1,
            userName: `${data.firstName} ${data.lastName}`,
            email: data.email,
            status: data.status,
            loginCount: 0,
            lastLoginTime: '-',
            lastLoginIp: '-',
            currentLoginIp: '-',
            created: new Date().toISOString().split('T')[0]
        };

        MOCK_DATA.users.unshift(newUser);
        this.closeDrawer();
        this.renderAccount(document.getElementById('content-area'));
        this.showToast('User created successfully', 'success');
    },

    togglePasswordVisibility(inputId, btn) {
        const input = document.getElementById(inputId);
        if (!input) return;
        
        if (input.type === 'password') {
            input.type = 'text';
            btn.innerHTML = '<i data-lucide="eye-off" class="w-[16px] h-[16px]"></i>';
        } else {
            input.type = 'password';
            btn.innerHTML = '<i data-lucide="eye" class="w-[16px] h-[16px]"></i>';
        }
        lucide.createIcons();
    },

    openEditUserDrawer(userId) {
        const user = MOCK_DATA.users.find(u => u.id === userId);
        if (!user) return;

        const drawerContent = document.getElementById('drawer-content');
        if (!drawerContent) return;

        // Split name into first and last
        const nameParts = (user.userName || '').split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        drawerContent.innerHTML = `
            <div class="bg-white flex flex-col h-full w-full font-['Roboto']">
                <!-- Header -->
                <div class="border-b border-[#e6e8ee] flex items-center justify-between p-[16px] shrink-0 w-full bg-white z-10">
                    <p class="font-bold text-[20px] leading-normal text-[#313949]">Edit User</p>
                    <button onclick="app.closeDrawer()" class="w-[24px] h-[24px] flex items-center justify-center hover:opacity-70 transition-opacity">
                        <i data-lucide="x" class="w-[16px] h-[16px] text-[#313949]"></i>
                    </button>
                </div>
                <!-- Form Content -->
                <form onsubmit="app.handleEditUserSubmit(event, ${userId})" class="flex flex-col flex-1 px-[24px] py-[16px] gap-[16px] overflow-y-auto">
                    <!-- First Name -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                        <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                            <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                            <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">First Name</span>
                        </div>
                        <div class="relative w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <input type="text" name="firstName" value="${firstName}" required class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal">
                        </div>
                    </div>

                    <!-- Last Name -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                        <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                            <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                            <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Last Name</span>
                        </div>
                        <div class="relative w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <input type="text" name="lastName" value="${lastName}" required class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal">
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                        <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                            <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                            <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Email</span>
                        </div>
                        <div class="relative w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <input type="email" name="email" value="${user.email || ''}" required class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal">
                        </div>
                    </div>

                    <!-- Status -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                        <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                            <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Status</span>
                        </div>
                        <div class="flex items-center gap-[24px] h-[32px]">
                            <label class="flex items-center gap-[8px] cursor-pointer">
                                <input type="radio" name="status" value="Active" ${user.status === 'Active' ? 'checked' : ''} class="accent-[#3ec064] w-[16px] h-[16px]">
                                <span class="text-[14px] text-[#313949] font-normal">Active</span>
                            </label>
                            <label class="flex items-center gap-[8px] cursor-pointer">
                                <input type="radio" name="status" value="Inactive" ${user.status === 'Inactive' ? 'checked' : ''} class="accent-[#3ec064] w-[16px] h-[16px]">
                                <span class="text-[14px] text-[#313949] font-normal">Inactive</span>
                            </label>
                        </div>
                    </div>

                    <!-- Password fields removed (moved to separate drawer) -->

                    <!-- Footer Buttons -->
                    <div class="flex items-center gap-[10px] pt-[16px] mt-auto w-full">
                        <button type="button" onclick="app.closeDrawer()" class="flex-1 h-[32px] px-[8px] flex items-center justify-center bg-white border border-[#b5bcc8] rounded-[4px] text-[14px] text-[#313949] hover:bg-gray-50 transition-colors font-normal leading-[1.42] font-['Roboto']">
                            Cancel
                        </button>
                        <button type="submit" class="flex-1 h-[32px] px-[8px] flex items-center justify-center bg-[#3ec064] rounded-[4px] text-[14px] text-white hover:bg-[#35a656] transition-colors font-normal leading-[1.42] font-['Roboto']">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        `;

        this.toggleDrawer(true);
        lucide.createIcons();
    },

    handleEditUserSubmit(event, userId) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        // Password validation removed (moved to separate drawer)

        const userIndex = MOCK_DATA.users.findIndex(u => u.id === userId);
        if (userIndex === -1) return;

        MOCK_DATA.users[userIndex] = {
            ...MOCK_DATA.users[userIndex],
            userName: `${data.firstName} ${data.lastName}`,
            email: data.email,
            status: data.status,
        };

        this.closeDrawer();
        this.renderAccount(document.getElementById('content-area'));
        this.showToast('User updated successfully', 'success');
    },

    openChangePasswordDrawer(userId) {
        const user = MOCK_DATA.users.find(u => u.id === userId);
        if (!user) return;

        const drawerContent = document.getElementById('drawer-content');
        if (!drawerContent) return;

        drawerContent.innerHTML = `
            <div class="bg-white flex flex-col h-full w-full font-['Roboto']">
                <!-- Header -->
                <div class="border-b border-[#e6e8ee] flex items-center justify-between p-[16px] shrink-0 w-full bg-white z-10">
                    <p class="font-bold text-[20px] leading-normal text-[#313949]">Change Password</p>
                    <button onclick="app.closeDrawer()" class="w-[24px] h-[24px] flex items-center justify-center hover:opacity-70 transition-opacity">
                        <i data-lucide="x" class="w-[16px] h-[16px] text-[#313949]"></i>
                    </button>
                </div>
                <!-- Form Content -->
                <form onsubmit="app.handleChangePasswordSubmit(event, ${userId})" class="flex flex-col flex-1 px-[24px] py-[16px] gap-[16px] overflow-y-auto">
                    <!-- Password -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                        <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                            <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                            <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Password</span>
                        </div>
                        <div class="relative w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <input type="password" name="password" id="change-password-input" required class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal pr-[24px]">
                            <button type="button" onclick="app.togglePasswordVisibility('change-password-input', this)" class="absolute right-[8px] top-1/2 -translate-y-1/2 text-[#b5bcc8] hover:text-[#313949] transition-colors">
                                <i data-lucide="eye" class="w-[16px] h-[16px]"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Confirm Password -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                        <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                            <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                            <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Confirmation Password</span>
                        </div>
                        <div class="relative w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <input type="password" name="confirmPassword" id="change-password-confirm" required class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal pr-[24px]">
                            <button type="button" onclick="app.togglePasswordVisibility('change-password-confirm', this)" class="absolute right-[8px] top-1/2 -translate-y-1/2 text-[#b5bcc8] hover:text-[#313949] transition-colors">
                                <i data-lucide="eye" class="w-[16px] h-[16px]"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Footer Buttons -->
                    <div class="flex items-center gap-[10px] pt-[16px] mt-auto w-full">
                        <button type="button" onclick="app.closeDrawer()" class="flex-1 h-[32px] px-[8px] flex items-center justify-center bg-white border border-[#b5bcc8] rounded-[4px] text-[14px] text-[#313949] hover:bg-gray-50 transition-colors font-normal leading-[1.42] font-['Roboto']">
                            Cancel
                        </button>
                        <button type="submit" class="flex-1 h-[32px] px-[8px] flex items-center justify-center bg-[#3ec064] rounded-[4px] text-[14px] text-white hover:bg-[#35a656] transition-colors font-normal leading-[1.42] font-['Roboto']">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        `;

        this.toggleDrawer(true);
        lucide.createIcons();
    },

    handleChangePasswordSubmit(event, userId) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        if (data.password !== data.confirmPassword) {
            this.showToast('Passwords do not match', 'error');
            return;
        }

        // In a real app, this would send an API request
        // For now, we just simulate a success
        console.log(`Password changed for user ${userId}`);

        this.closeDrawer();
        this.showToast('Password changed successfully', 'success');
    },

    renderTradingRules(container) {
        // Apply Filters
        let filteredRules = state.tradingRules;
        
        if (state.tradingRulesList.state !== 'All') {
            filteredRules = filteredRules.filter(r => r.state === state.tradingRulesList.state);
        }
        if (state.tradingRulesList.triggerType !== 'All') {
            filteredRules = filteredRules.filter(r => state.tradingRulesList.triggerType === 'Arbitrage Point'
                ? (r.triggerType === 'Arbitrage Point' || r.triggerType === 'Time')
                : r.triggerType === state.tradingRulesList.triggerType);
        }
        if (state.tradingRulesList.vppName) {
            const term = state.tradingRulesList.vppName.toLowerCase();
            filteredRules = filteredRules.filter(r => r.vpp.toLowerCase().includes(term));
        }

        // Pagination Logic
        const itemsPerPage = state.tradingRulesList.itemsPerPage || 10;
        const totalItems = filteredRules.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
        const currentPage = Math.min(Math.max(1, state.tradingRulesList.currentPage), totalPages);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentRules = filteredRules.slice(startIndex, endIndex);

        // Calculate pagination pages
        let pages = [];
        if (totalPages > 0) {
            if (totalPages <= 7) {
                pages = Array.from({length: totalPages}, (_, i) => i + 1);
            } else {
                if (currentPage <= 4) {
                    pages = [1, 2, 3, 4, 5, '...', totalPages];
                } else if (currentPage >= totalPages - 3) {
                    pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                } else {
                    pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
                }
            }
        }

        container.className = "w-full h-full bg-[#f8f9fb] p-[8px]";
        
        if (state.tradingRules.length === 0) {
            // Empty State
            container.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full bg-white rounded-xl border border-gray-200 shadow-sm p-8">
                    <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <i data-lucide="scroll-text" class="w-8 h-8 text-gray-400"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">No Rules Created</h3>
                    <p class="text-gray-500 text-sm mb-6 max-w-sm text-center">Get started by creating your first trading rule to automate your VPP operations.</p>
                    <button onclick="app.openTradingRuleDrawer()" class="flex items-center gap-2 px-6 py-2.5 bg-manta-primary hover:bg-manta-dark text-white font-medium rounded-lg shadow-sm transition-colors group">
                        <i data-lucide="plus" class="w-5 h-5 group-hover:scale-110 transition-transform"></i>
                        Create Trading Rule
                    </button>
                </div>
            `;
        } else {
            // List View
            container.innerHTML = `
                <div class="h-full flex flex-col bg-white rounded-[4px] overflow-hidden border border-gray-200 shadow-sm">
                    <!-- Top Bar -->
                    <div class="flex items-center justify-between bg-white px-4 py-3 border-b border-gray-200">
                        <div class="flex items-center gap-4">
                            <!-- Filter: State -->
                            <div class="flex items-center gap-2">
                                <span class="text-sm font-medium text-gray-500">State:</span>
                                <select onchange="app.updateTradingRulesState('state', this.value)" class="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-manta-primary focus:border-manta-primary block p-2 min-w-[100px]">
                                    <option value="All" ${state.tradingRulesList.state === 'All' ? 'selected' : ''}>All</option>
                                    <option value="Active" ${state.tradingRulesList.state === 'Active' ? 'selected' : ''}>Active</option>
                                    <option value="Inactive" ${state.tradingRulesList.state === 'Inactive' ? 'selected' : ''}>Inactive</option>
                                </select>
                            </div>
                            <!-- Filter: Trigger Type -->
                            <div class="flex items-center gap-2">
                                <span class="text-sm font-medium text-gray-500">Trigger Type:</span>
                                <select onchange="app.updateTradingRulesState('triggerType', this.value)" class="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-manta-primary focus:border-manta-primary block p-2 min-w-[120px]">
                                    <option value="All" ${state.tradingRulesList.triggerType === 'All' ? 'selected' : ''}>All</option>
                                    <option value="Price" ${state.tradingRulesList.triggerType === 'Price' ? 'selected' : ''}>Price</option>
                                    <option value="Signal by Spot" ${state.tradingRulesList.triggerType === 'Signal by Spot' ? 'selected' : ''}>Signal by Spot</option>
                                    <option value="Signal by Forecast" ${state.tradingRulesList.triggerType === 'Signal by Forecast' ? 'selected' : ''}>Signal by Forecast</option>
                                </select>
                            </div>
                            <!-- Search -->
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <i data-lucide="search" class="w-4 h-4 text-gray-500"></i>
                                </div>
                                <input type="text" 
                                    value="${state.tradingRulesList.vppName}"
                                    oninput="app.updateTradingRulesState('vppName', this.value)"
                                    class="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-manta-primary focus:border-manta-primary block w-64 pl-10 p-2" 
                                    placeholder="Search by VPP name...">
                            </div>
                        </div>
                        <button onclick="app.openTradingRuleDrawer()" class="flex items-center gap-2 px-4 py-2 bg-manta-primary hover:bg-manta-dark text-white text-sm font-medium rounded-lg shadow-sm transition-colors">
                            <i data-lucide="plus" class="w-4 h-4"></i>
                            Create Rule
                        </button>
                    </div>

                    <!-- Table -->
                    <div class="flex-1 overflow-auto">
                        <table class="w-full text-sm text-left text-gray-500">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-10">
                                <tr>
                                    <th scope="col" class="px-6 py-3">Rule ID</th>
                                    <th scope="col" class="px-6 py-3">VPP Name</th>
                                    <th scope="col" class="px-6 py-3">Pricing Region</th>
                                    <th scope="col" class="px-6 py-3">Trigger From</th>
                                    <th scope="col" class="px-6 py-3">Details</th>
                                    <th scope="col" class="px-6 py-3">Event</th>
                                    <th scope="col" class="px-6 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${currentRules.length > 0 ? currentRules.map(rule => `
                                    <tr class="bg-white border-b hover:bg-gray-50 transition-colors">
                                        <td class="px-6 py-4 font-medium text-gray-900">#${rule.id}</td>
                                        <td class="px-6 py-4 text-gray-900">${rule.vpp}</td>
                                        <td class="px-6 py-4">
                                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${rule.state === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                                                ${rule.state}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4">${rule.triggerType === 'Price' ? 'Spot Price' : (rule.triggerType === 'Arbitrage' ? 'Arbitrage Point' : rule.triggerType || 'Spot Price')}</td>
                                        <td class="px-6 py-4">
                                            ${rule.triggerType === 'Price' ? `Spot Price ${rule.condition} $${rule.price}` : (rule.triggerType === 'Arbitrage' ? 'Arbitrage Point' : rule.triggerType)}
                                            ${rule.applicableVpps && rule.applicableVpps.some(v => v.ignoreTimeEnabled && v.ignoreTimeStart && v.ignoreTimeEnd) ? `<div class="text-xs text-gray-400 mt-1">${rule.applicableVpps.filter(v => v.ignoreTimeEnabled && v.ignoreTimeStart && v.ignoreTimeEnd).map(v => {
                                                let content = `Ignore ${v.name || 'VPP'}: ${v.ignoreTimeStart} - ${v.ignoreTimeEnd}`;
                                                const frequency = v.ignoreFrequency || 'Everyday';
                                                content += ` (${frequency}`;
                                                if (frequency === 'Custom' && v.ignoreDateStart && v.ignoreDateEnd) {
                                                    content += `: ${v.ignoreDateStart} To ${v.ignoreDateEnd}`;
                                                }
                                                content += ')';
                                                return content;
                                            }).join('<br>')}</div>` : ''}
                                        </td>
                                        <td class="px-6 py-4">
                                            <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
                                                ${rule.action}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 text-left">
                                            <div class="flex items-center justify-start gap-2">
                                                <button onclick="app.toggleTradingRule(${rule.id})" class="p-1 text-gray-500 hover:text-manta-primary transition-colors" title="${rule.state === 'Active' ? 'Deactivate' : 'Activate'}">
                                                    <i data-lucide="${rule.state === 'Active' ? 'pause-circle' : 'play-circle'}" class="w-4 h-4"></i>
                                                </button>
                                                <button onclick="app.openTradingRuleDrawer(${rule.id})" class="p-1 text-gray-500 hover:text-manta-primary transition-colors" title="Edit">
                                                    <i data-lucide="edit-3" class="w-4 h-4"></i>
                                                </button>
                                                <button onclick="app.deleteTradingRule(${rule.id})" class="p-1 text-gray-500 hover:text-red-600 transition-colors" title="Delete">
                                                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('') : ''}
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    ${filteredRules.length > 0 ? `
                    <div class="flex items-center justify-end px-[16px] py-[12px] mt-auto bg-white border-t border-gray-200">
                        <div class="flex items-center gap-[4px]">
                            <!-- Page Size Selector -->
                            <div class="flex items-center gap-[8px] mr-2">
                                <div class="relative group">
                                    <select class="appearance-none bg-white border border-[var(--color-neutral-line)] text-[var(--color-neutral-bluegrey)] text-[14px] rounded-[4px] px-[12px] py-[4px] pr-[32px] focus:outline-none focus:border-[var(--color-brand-primary)] cursor-pointer font-['Roboto']" onchange="app.updateTradingRulesState('itemsPerPage', parseInt(this.value))">
                                        <option value="10" ${itemsPerPage === 10 ? 'selected' : ''}>10/page</option>
                                        <option value="20" ${itemsPerPage === 20 ? 'selected' : ''}>20/page</option>
                                        <option value="50" ${itemsPerPage === 50 ? 'selected' : ''}>50/page</option>
                                        <option value="100" ${itemsPerPage === 100 ? 'selected' : ''}>100/page</option>
                                    </select>
                                    <div class="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none">
                                        <i data-lucide="chevron-down" class="w-[16px] h-[16px] text-[var(--color-neutral-lightgrey)]"></i>
                                    </div>
                                </div>
                            </div>

                            <!-- First Page -->
                            <button onclick="app.updateTradingRulesState('currentPage', 1)" ${currentPage === 1 ? 'disabled' : ''} class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-[var(--color-neutral-thingrey)] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                <i data-lucide="chevrons-left" class="w-[16px] h-[16px]"></i>
                            </button>
                            <!-- Prev Page -->
                            <button onclick="app.updateTradingRulesState('currentPage', ${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-[var(--color-neutral-thingrey)] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                <i data-lucide="chevron-left" class="w-[16px] h-[16px]"></i>
                            </button>
                            
                            <!-- Page Numbers -->
                            ${pages.map(page => {
                                if (page === '...') {
                                    return `<span class="w-[32px] h-[32px] flex items-center justify-center text-[#5f646e] font-['Roboto']">...</span>`;
                                }
                                return `
                                    <button onclick="app.updateTradingRulesState('currentPage', ${page})" class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] text-[14px] font-medium transition-colors font-['Roboto'] ${page === currentPage ? 'bg-[var(--color-neutral-thingrey)] text-[var(--color-neutral-bluegrey)]' : 'text-[#5f646e] hover:bg-[var(--color-neutral-thingrey)]'}">
                                        ${page}
                                    </button>
                                `;
                            }).join('')}

                            <!-- Next Page -->
                            <button onclick="app.updateTradingRulesState('currentPage', ${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''} class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-[var(--color-neutral-thingrey)] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                <i data-lucide="chevron-right" class="w-[16px] h-[16px]"></i>
                            </button>
                            <!-- Last Page -->
                            <button onclick="app.updateTradingRulesState('currentPage', ${totalPages})" ${currentPage === totalPages ? 'disabled' : ''} class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-[var(--color-neutral-thingrey)] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                <i data-lucide="chevrons-right" class="w-[16px] h-[16px]"></i>
                            </button>
                        </div>
                    </div>
                    ` : ''}
                </div>
            `;
        }
        lucide.createIcons();
    },

    updateTradingRulesState(key, value) {
        state.tradingRulesList[key] = value;
        // Reset to page 1 on filter change
        if (key !== 'currentPage') {
            state.tradingRulesList.currentPage = 1;
        }
        this.renderTradingRules(document.getElementById('content-area'));
    },

    openTradingRuleDrawer(ruleId = null) {
        const drawerContent = document.getElementById('drawer-content');
        const rule = ruleId ? state.tradingRules.find(r => r.id === ruleId) : null;
        
        // Mock VPPs for the selector
        const vppOptions = state.vpps.length > 0 ? state.vpps : [
            { id: 1, name: 'Virtual Power Plant 1' },
            { id: 2, name: 'Virtual Power Plant 2' }
        ];

        const initialSelections = rule?.applicableVpps?.length
            ? rule.applicableVpps.map(v => ({
                id: v.id,
                name: v.name,
                ignoreTimeEnabled: !!v.ignoreTimeEnabled,
                ignoreTimeStart: v.ignoreTimeStart || '',
                ignoreTimeEnd: v.ignoreTimeEnd || ''
            }))
            : (rule?.vppId ? [{
                id: rule.vppId,
                name: rule.vpp || 'VPP',
                ignoreTimeEnabled: !!(rule.ignoreTimeStart || rule.ignoreTimeEnd),
                ignoreTimeStart: rule.ignoreTimeStart || '',
                ignoreTimeEnd: rule.ignoreTimeEnd || ''
            }] : []);
        const statusValue = rule && (rule.state === 'Active' || rule.state === 'Inactive') ? rule.state : 'Active';

        state.tradingRuleVppSelections = initialSelections;
        state.tradingRuleVppDropdownOpen = false;
        state.tradingRuleVppOptions = vppOptions;

        drawerContent.innerHTML = `
            <div class="bg-white flex flex-col h-full w-full font-['Roboto']">
                <!-- Header -->
                <div class="border-b border-[#e6e8ee] flex items-center justify-between p-[16px] shrink-0 w-full bg-white z-10">
                    <p class="font-bold text-[20px] leading-normal text-[#313949]">${rule ? 'Edit Rule' : 'Create a Rule'}</p>
                    <button onclick="app.closeDrawer()" class="w-[24px] h-[24px] flex items-center justify-center hover:opacity-70 transition-opacity">
                        <img src="assets/icons/close-drawer.svg" class="w-full h-full block" alt="Close">
                    </button>
                </div>

                <!-- Form Content -->
                <form onsubmit="app.handleTradingRuleSubmit(event)" class="flex flex-col flex-1 px-[24px] py-[16px] gap-[16px] overflow-y-auto">
                    <input type="hidden" name="ruleId" value="${rule ? rule.id : ''}">
                    
                    <div class="grid grid-cols-2 gap-[12px] w-full">
                        <div class="flex flex-col gap-[4px] w-full shrink-0">
                             <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                                 <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                                 <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Pricing Region</span>
                             </div>
                             <div class="relative w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                                <select name="state" required class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] appearance-none z-10 font-normal cursor-pointer invalid:text-[#b5bcc8]">
                                    <option value="NSW" ${!rule || rule.state === 'NSW' ? 'selected' : ''}>NSW</option>
                                    <option value="VIC" ${rule && rule.state === 'VIC' ? 'selected' : ''}>VIC</option>
                                    <option value="QLD" ${rule && rule.state === 'QLD' ? 'selected' : ''}>QLD</option>
                                    <option value="SA" ${rule && rule.state === 'SA' ? 'selected' : ''}>SA</option>
                                    <option value="WA" ${rule && rule.state === 'WA' ? 'selected' : ''}>WA</option>
                                </select>
                                <div class="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center w-[16px] h-[16px]">
                                    <i data-lucide="chevron-down" class="w-[12px] h-[12px] text-[#313949]"></i>
                                </div>
                             </div>
                        </div>
                        <div class="flex flex-col gap-[4px] w-full shrink-0">
                             <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                                 <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                                <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Trigger From</span>
                             </div>
                             <div class="relative w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                               <select name="triggerType" required onchange="app.handleTriggerTypeChange(this.value)" class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] appearance-none z-10 font-normal cursor-pointer invalid:text-[#b5bcc8]">
                                    <option value="Price" ${!rule || rule.triggerType === 'Price' ? 'selected' : ''}>Price</option>
                                    <option value="Arbitrage" ${rule && rule.triggerType === 'Arbitrage' ? 'selected' : ''}>Arbitrage Point</option>
                                </select>
                                <div class="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center w-[16px] h-[16px]">
                                    <i data-lucide="chevron-down" class="w-[12px] h-[12px] text-[#313949]"></i>
                                </div>
                             </div>
                        </div>
                    </div>

                    <!-- Trigger Condition -->
                    <div id="field-trigger-price" class="flex flex-col gap-[4px] w-full shrink-0">
                         <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                             <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                             <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Trigger Condition</span>
                         </div>
                        <div class="flex gap-2">
                            <div class="relative w-28 h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                                <select name="priceSource" id="trigger-source-select" class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] appearance-none z-10 font-normal cursor-pointer">
                                    ${!rule || rule.triggerType === 'Price' ? `
                                        <option value="Spot" ${!rule || rule.priceSource === 'Spot' ? 'selected' : ''}>Spot</option>
                                        <option value="Forecast Spot" ${rule && rule.priceSource === 'Forecast Spot' ? 'selected' : ''}>Forecast Spot</option>
                                    ` : `
                                        <option value="Signal by Spot" ${rule && rule.priceSource === 'Signal by Spot' ? 'selected' : ''}>Signal by Spot</option>
                                        <option value="Signal by Forecast" ${rule && rule.priceSource === 'Signal by Forecast' ? 'selected' : ''}>Signal by Forecast</option>
                                    `}
                                </select>
                               <div class="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center w-[16px] h-[16px]">
                                   <i data-lucide="chevron-down" class="w-[12px] h-[12px] text-[#313949]"></i>
                               </div>
                            </div>
                            <div class="relative w-24 h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                                <select name="condition" id="trigger-condition-select" class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] appearance-none z-10 font-normal cursor-pointer" style="display: ${!rule || rule.triggerType === 'Price' ? 'block' : 'none'}">
                                     <option value=">" ${rule && rule.condition === '>' ? 'selected' : ''}>></option>
                                     <option value="<" ${rule && rule.condition === '<' ? 'selected' : ''}><</option>
                                     <option value=">=" ${rule && rule.condition === '>=' ? 'selected' : ''}>>=</option>
                                     <option value="<=" ${rule && rule.condition === '<=' ? 'selected' : ''}><=</option>
                                 </select>
                                 <div id="trigger-condition-static" class="w-full h-full flex items-center justify-center text-[14px] text-[#313949] font-normal" style="display: ${rule && rule.triggerType === 'Arbitrage' ? 'flex' : 'none'}">
                                    =
                                 </div>
                                <div id="trigger-condition-arrow" class="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center w-[16px] h-[16px]" style="display: ${!rule || rule.triggerType === 'Price' ? 'flex' : 'none'}">
                                    <i data-lucide="chevron-down" class="w-[12px] h-[12px] text-[#313949]"></i>
                                </div>
                             </div>
                             <div class="relative flex-1 h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                                 <input type="number" name="price" id="trigger-price-input" value="${rule ? rule.price || '' : ''}" step="0.01" class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal" placeholder="0.00" ${!rule || rule.triggerType === 'Price' ? 'required' : ''} style="display: ${!rule || rule.triggerType === 'Price' ? 'block' : 'none'}">
                                 
                                 <select name="arbitrageSignal" id="trigger-arbitrage-select" onchange="app.handleArbitrageSignalChange(this.value)" class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] appearance-none z-10 font-normal cursor-pointer invalid:text-[#b5bcc8]" style="display: ${rule && rule.triggerType === 'Arbitrage' ? 'block' : 'none'}" ${rule && rule.triggerType === 'Arbitrage' ? 'required' : ''}>
                                     <option value="Discharge" ${rule && rule.arbitrageSignal === 'Discharge' ? 'selected' : ''}>Discharge</option>
                                     <option value="Charge" ${rule && rule.arbitrageSignal === 'Charge' ? 'selected' : ''}>Charge</option>
                                     <option value="Abnormal" ${rule && rule.arbitrageSignal === 'Abnormal' ? 'selected' : ''}>Abnormal</option>
                                 </select>
                                 <div id="trigger-arbitrage-arrow" class="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center w-[16px] h-[16px]" style="display: ${rule && rule.triggerType === 'Arbitrage' ? 'flex' : 'none'}">
                                    <i data-lucide="chevron-down" class="w-[12px] h-[12px] text-[#313949]"></i>
                                </div>
                             </div>
                             <div class="flex items-center h-[32px]" id="trigger-price-unit" style="display: ${!rule || rule.triggerType === 'Price' ? 'flex' : 'none'}">
                                 <span class="text-[14px] text-[#313949] font-normal">$/MW</span>
                             </div>
                         </div>
                    </div>

                    <!-- Action -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0" id="rule-action-container" style="display: ${rule && rule.triggerType === 'Arbitrage' ? 'none' : 'flex'}">
                         <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                             <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                             <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Event</span>
                         </div>
                         <div class="relative w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                             <select name="action" id="rule-action-select" required class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] appearance-none z-10 font-normal cursor-pointer invalid:text-[#b5bcc8]">
                                 <option value="Discharge" ${!rule || rule.action === 'Discharge' ? 'selected' : ''}>Discharge</option>
                                 <option value="Charge" ${rule && rule.action === 'Charge' ? 'selected' : ''}>Charge</option>
                                 <option value="Stop" ${rule && rule.action === 'Stop' ? 'selected' : ''}>Stop</option>
                             </select>
                            <div class="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center w-[16px] h-[16px]">
                                <i data-lucide="chevron-down" class="w-[12px] h-[12px] text-[#313949]"></i>
                            </div>
                         </div>
                    </div>

                    <div class="flex flex-col gap-[6px] w-full shrink-0">
                         <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                             <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                             <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Status</span>
                         </div>
                         <div class="flex gap-[12px] items-center">
                            <label class="flex items-center gap-[6px] text-[14px] text-[#313949]">
                                <input type="radio" name="status" value="Active" class="accent-[#3ec064]" ${statusValue === 'Active' ? 'checked' : ''} required>
                                 <span>Active</span>
                             </label>
                             <label class="flex items-center gap-[6px] text-[14px] text-[#313949]">
                                <input type="radio" name="status" value="Inactive" class="accent-[#3ec064]" ${statusValue === 'Inactive' ? 'checked' : ''} required>
                                 <span>Inactive</span>
                             </label>
                         </div>
                    </div>

                    <div class="flex flex-col gap-[6px] w-full shrink-0">
                         <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                             <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                             <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Applicable VPP</span>
                         </div>
                         <div class="relative w-full">
                             <button type="button" id="rule-vpp-toggle-btn" onclick="app.toggleRuleVppDropdown()" class="w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center justify-between transition-colors focus-within:border-[#3ec064]">
                                 <span id="rule-vpp-placeholder" class="text-[14px] font-normal ${state.tradingRuleVppSelections.length ? 'text-[#313949]' : 'text-[#b5bcc8]'}">${state.tradingRuleVppSelections.length ? `${state.tradingRuleVppSelections.length} VPP selected` : 'Select VPP'}</span>
                                 <i data-lucide="chevron-down" class="w-[12px] h-[12px] text-[#313949]"></i>
                             </button>
                             <div id="rule-vpp-dropdown" class="absolute left-0 right-0 mt-[6px] bg-white border border-[#e6e8ee] rounded-[6px] shadow-lg z-10 ${state.tradingRuleVppDropdownOpen ? '' : 'hidden'}">
                                <div id="rule-vpp-options" class="max-h-[200px] overflow-y-auto py-[4px]">
                                     ${this.renderRuleVppDropdownOptions()}
                                 </div>
                             </div>
                         </div>
                         <div id="rule-vpp-selections" class="flex flex-col gap-[8px]">
                             ${this.renderRuleVppSelections()}
                         </div>
                    </div>
                    
                    <!-- Footer Buttons -->
                    <div class="flex items-center gap-[10px] pt-[16px] mt-auto w-full">
                         <button type="button" onclick="app.closeDrawer()" class="flex-1 h-[32px] px-[8px] flex items-center justify-center bg-white border border-[#b5bcc8] rounded-[4px] text-[14px] text-[#313949] hover:bg-gray-50 transition-colors font-normal leading-[1.42] font-['Roboto']">
                             Cancel
                         </button>
                        <button type="submit" id="rule-submit-btn" class="flex-1 h-[32px] px-[8px] flex items-center justify-center bg-[#3ec064] rounded-[4px] text-[14px] text-white hover:bg-[#35a656] transition-colors font-normal leading-[1.42] font-['Roboto']">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        `;
        this.toggleDrawer(true);
        this.syncRuleVppUi();
        lucide.createIcons();
    },

    toggleRuleVppDropdown() {
        state.tradingRuleVppDropdownOpen = !state.tradingRuleVppDropdownOpen;
        this.syncRuleVppUi();
    },

    renderRuleVppDropdownOptions() {
        const selectedIds = new Set(state.tradingRuleVppSelections.map(v => v.id));
        return state.tradingRuleVppOptions.map(vpp => `
            <label class="flex items-center gap-[8px] px-[10px] py-[6px] hover:bg-[#f3f3f6] cursor-pointer">
                <input type="checkbox" class="accent-[#3ec064]" ${selectedIds.has(vpp.id) ? 'checked' : ''} onchange="app.toggleRuleVppSelection(${vpp.id})">
                <span class="text-[13px] text-[#313949]">${vpp.name}</span>
            </label>
        `).join('');
    },

    renderRuleVppSelections() {
        if (!state.tradingRuleVppSelections.length) return '';
        return state.tradingRuleVppSelections.map(vpp => `
            <div class="border border-[#e6e8ee] rounded-[6px] p-[8px]">
                <div class="flex items-center justify-between">
                    <span class="text-[13px] text-[#313949] font-medium">${vpp.name}</span>
                    <button type="button" onclick="app.toggleRuleVppSelection(${vpp.id})" class="text-[12px] text-[#7a828f] hover:text-[#313949]">Remove</button>
                </div>
                <label class="flex items-center gap-[6px] mt-[6px]">
                    <input type="checkbox" class="accent-[#3ec064]" ${vpp.ignoreTimeEnabled ? 'checked' : ''} onchange="app.toggleRuleVppIgnore(${vpp.id}, this.checked)">
                    <span class="text-[12px] text-[#5f646e]">Add Ignore Time</span>
                </label>
                <div id="rule-vpp-ignore-${vpp.id}" class="flex flex-col gap-2 mt-[6px]" style="display: ${vpp.ignoreTimeEnabled ? 'flex' : 'none'}">
                    <div class="flex gap-2 items-center">
                        <div class="flex-1 h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <input type="time" value="${vpp.ignoreTimeStart || ''}" onchange="app.updateRuleVppIgnoreDetail(${vpp.id}, 'start', this.value)" class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal">
                        </div>
                        <span class="text-gray-400">-</span>
                        <div class="flex-1 h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <input type="time" value="${vpp.ignoreTimeEnd || ''}" onchange="app.updateRuleVppIgnoreDetail(${vpp.id}, 'end', this.value)" class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal">
                        </div>
                        <div class="w-[120px] h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <select onchange="app.updateRuleVppIgnoreDetail(${vpp.id}, 'frequency', this.value)" class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] font-normal">
                                <option value="Everyday" ${!vpp.ignoreFrequency || vpp.ignoreFrequency === 'Everyday' ? 'selected' : ''}>Everyday</option>
                                <option value="Monday" ${vpp.ignoreFrequency === 'Monday' ? 'selected' : ''}>Monday</option>
                                <option value="Tuesday" ${vpp.ignoreFrequency === 'Tuesday' ? 'selected' : ''}>Tuesday</option>
                                <option value="Wednesday" ${vpp.ignoreFrequency === 'Wednesday' ? 'selected' : ''}>Wednesday</option>
                                <option value="Thursday" ${vpp.ignoreFrequency === 'Thursday' ? 'selected' : ''}>Thursday</option>
                                <option value="Friday" ${vpp.ignoreFrequency === 'Friday' ? 'selected' : ''}>Friday</option>
                                <option value="Saturday" ${vpp.ignoreFrequency === 'Saturday' ? 'selected' : ''}>Saturday</option>
                                <option value="Sunday" ${vpp.ignoreFrequency === 'Sunday' ? 'selected' : ''}>Sunday</option>
                                <option value="Custom" ${vpp.ignoreFrequency === 'Custom' ? 'selected' : ''}>Custom</option>
                            </select>
                        </div>
                    </div>
                    ${vpp.ignoreFrequency === 'Custom' ? `
                    <div class="flex gap-2 items-center">
                         <div class="flex-1 h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <input type="${vpp.ignoreDateStart ? 'date' : 'text'}" lang="en-GB" onfocus="(this.type='date')" onblur="(this.value ? this.type='date' : this.type='text')" value="${vpp.ignoreDateStart || ''}" onchange="app.updateRuleVppIgnoreDetail(${vpp.id}, 'dateStart', this.value)" class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal" placeholder="Start Date">
                        </div>
                        <span class="text-gray-400">To</span>
                        <div class="flex-1 h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <input type="${vpp.ignoreDateEnd ? 'date' : 'text'}" lang="en-GB" onfocus="(this.type='date')" onblur="(this.value ? this.type='date' : this.type='text')" value="${vpp.ignoreDateEnd || ''}" onchange="app.updateRuleVppIgnoreDetail(${vpp.id}, 'dateEnd', this.value)" class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal" placeholder="End Date">
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
    },

    syncRuleVppUi() {
        const placeholder = document.getElementById('rule-vpp-placeholder');
        if (placeholder) {
            placeholder.textContent = state.tradingRuleVppSelections.length
                ? `${state.tradingRuleVppSelections.length} VPP selected`
                : 'Select VPP';
            placeholder.className = `text-[14px] font-normal ${state.tradingRuleVppSelections.length ? 'text-[#313949]' : 'text-[#b5bcc8]'}`;
        }
        const dropdown = document.getElementById('rule-vpp-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('hidden', !state.tradingRuleVppDropdownOpen);
        }
        const options = document.getElementById('rule-vpp-options');
        if (options) {
            options.innerHTML = this.renderRuleVppDropdownOptions();
        }
        const selections = document.getElementById('rule-vpp-selections');
        if (selections) {
            selections.innerHTML = this.renderRuleVppSelections();
        }
        lucide.createIcons();
    },

    toggleRuleVppSelection(vppId) {
        const existingIndex = state.tradingRuleVppSelections.findIndex(v => v.id === vppId);
        if (existingIndex >= 0) {
            state.tradingRuleVppSelections.splice(existingIndex, 1);
        } else {
            const vpp = state.tradingRuleVppOptions.find(v => v.id === vppId);
            if (vpp) {
                state.tradingRuleVppSelections.push({
                    id: vpp.id,
                    name: vpp.name,
                    ignoreTimeEnabled: false,
                    ignoreTimeStart: '',
                    ignoreTimeEnd: '',
                    ignoreFrequency: 'Everyday',
                    ignoreDateStart: '',
                    ignoreDateEnd: ''
                });
            }
        }
        this.syncRuleVppUi();
    },

    toggleRuleVppIgnore(vppId, enabled) {
        const vpp = state.tradingRuleVppSelections.find(v => v.id === vppId);
        if (vpp) {
            vpp.ignoreTimeEnabled = enabled;
            if (!enabled) {
                vpp.ignoreTimeStart = '';
                vpp.ignoreTimeEnd = '';
                vpp.ignoreFrequency = 'Everyday';
                vpp.ignoreDateStart = '';
                vpp.ignoreDateEnd = '';
            }
            this.syncRuleVppUi();
        }
    },

    updateRuleVppIgnoreDetail(vppId, field, value) {
        const vpp = state.tradingRuleVppSelections.find(v => v.id === vppId);
        if (vpp) {
            if (field === 'start') vpp.ignoreTimeStart = value;
            if (field === 'end') vpp.ignoreTimeEnd = value;
            if (field === 'frequency') {
                vpp.ignoreFrequency = value;
                this.syncRuleVppUi(); // Re-render to show/hide custom date inputs
            }
            if (field === 'dateStart') vpp.ignoreDateStart = value;
            if (field === 'dateEnd') vpp.ignoreDateEnd = value;
        }
    },

    handleArbitrageSignalChange(signal) {
        const actionSelect = document.getElementById('rule-action-select');
        if (actionSelect) {
            if (signal === 'Discharge') actionSelect.value = 'Discharge';
            else if (signal === 'Charge') actionSelect.value = 'Charge';
            else if (signal === 'Abnormal') actionSelect.value = 'Stop';
        }
    },

    handleTriggerTypeChange(type) {
        const priceField = document.getElementById('field-trigger-price');
        // Ensure the main field container is visible
        if (priceField) {
            priceField.style.display = 'flex';
        }

        // Toggle Event container visibility
        const actionContainer = document.getElementById('rule-action-container');
        if (actionContainer) {
            actionContainer.style.display = type === 'Arbitrage' ? 'none' : 'flex';
        }

        // Trigger update if switching to Arbitrage
        if (type === 'Arbitrage') {
            const arbitrageSelect = document.getElementById('trigger-arbitrage-select');
            if (arbitrageSelect) {
                this.handleArbitrageSignalChange(arbitrageSelect.value);
            }
        }

        // 1. Update Source Select Options
        const sourceSelect = document.getElementById('trigger-source-select');
        if (sourceSelect) {
            if (type === 'Price') {
                sourceSelect.innerHTML = `
                    <option value="Spot">Spot</option>
                    <option value="Forecast Spot">Forecast Spot</option>
                `;
            } else {
                sourceSelect.innerHTML = `
                    <option value="Signal by Spot">Signal by Spot</option>
                    <option value="Signal by Forecast">Signal by Forecast</option>
                `;
            }
        }

        // 2. Toggle Condition Select vs Static Display
        const conditionSelect = document.getElementById('trigger-condition-select');
        const conditionStatic = document.getElementById('trigger-condition-static');
        const conditionArrow = document.getElementById('trigger-condition-arrow');
        
        if (conditionSelect) conditionSelect.style.display = type === 'Price' ? 'block' : 'none';
        if (conditionStatic) conditionStatic.style.display = type === 'Arbitrage' ? 'flex' : 'none';
        if (conditionArrow) conditionArrow.style.display = type === 'Price' ? 'flex' : 'none';

        // 3. Toggle Price Input vs Arbitrage Select
        const priceInput = document.getElementById('trigger-price-input');
        const arbitrageSelect = document.getElementById('trigger-arbitrage-select');
        const arbitrageArrow = document.getElementById('trigger-arbitrage-arrow');

        if (priceInput) {
            priceInput.style.display = type === 'Price' ? 'block' : 'none';
            if (type === 'Price') priceInput.setAttribute('required', '');
            else priceInput.removeAttribute('required');
        }

        if (arbitrageSelect) {
            arbitrageSelect.style.display = type === 'Arbitrage' ? 'block' : 'none';
            if (type === 'Arbitrage') arbitrageSelect.setAttribute('required', '');
            else arbitrageSelect.removeAttribute('required');
        }
        
        if (arbitrageArrow) arbitrageArrow.style.display = type === 'Arbitrage' ? 'flex' : 'none';

        // 4. Toggle Unit Display
        const unitDiv = document.getElementById('trigger-price-unit');
        if (unitDiv) unitDiv.style.display = type === 'Price' ? 'flex' : 'none';
    },

    handleTradingRuleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const submitBtn = document.getElementById('rule-submit-btn');

        // Validation
        const triggerType = formData.get('triggerType');
        const price = formData.get('price');
        const ruleId = formData.get('ruleId');
        const selections = state.tradingRuleVppSelections;

        if (!selections.length) {
            this.showToast('Please select at least one VPP', 'error');
            return;
        }

        if (triggerType === 'Price' && !price) {
            this.showToast('Please enter a trigger price', 'error');
            return;
        }

        // Loading State
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>';
        lucide.createIcons({ root: submitBtn });

        // Simulate API
        setTimeout(() => {
            const vppNames = selections.map(v => v.name).filter(Boolean);
            const primaryVpp = selections[0];

            const status = formData.get('status') || 'Active';
            const ruleData = {
                vppId: primaryVpp ? primaryVpp.id : null,
                vpp: vppNames.length ? vppNames.join(', ') : 'Unknown VPP',
                state: status,
                region: formData.get('state'),
                triggerType: triggerType,
                priceSource: formData.get('priceSource'),
                arbitrageSignal: formData.get('arbitrageSignal'),
                condition: formData.get('condition'),
                price: price,
                action: formData.get('action'),
                applicableVpps: selections.map(v => ({
                    id: v.id,
                    name: v.name,
                    ignoreTimeEnabled: v.ignoreTimeEnabled,
                    ignoreTimeStart: v.ignoreTimeStart,
                    ignoreTimeEnd: v.ignoreTimeEnd,
                    ignoreFrequency: v.ignoreFrequency,
                    ignoreDateStart: v.ignoreDateStart,
                    ignoreDateEnd: v.ignoreDateEnd
                })),
                updatedAt: new Date().toISOString()
            };

            if (ruleId) {
                // Update existing rule
                const index = state.tradingRules.findIndex(r => r.id == ruleId);
                if (index !== -1) {
                    state.tradingRules[index] = { ...state.tradingRules[index], ...ruleData };
                    this.showToast('Trading rule updated successfully', 'success');
                }
            } else {
                // Create new rule
                const newRule = {
                    id: Date.now(),
                    ...ruleData,
                    createdAt: new Date().toISOString()
                };
                state.tradingRules.unshift(newRule);
                this.showToast('Trading rule created successfully', 'success');
            }
            
            this.closeDrawer();
            const contentArea = document.getElementById('content-area');
            if (state.currentView === 'trading') {
                this.renderTradingOverview(contentArea);
            } else {
                this.renderTradingRules(contentArea);
            }

            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, 1000);
    },

    toggleTradingRule(id) {
        const rule = state.tradingRules.find(r => r.id === id);
        if (rule) {
            rule.state = rule.state === 'Active' ? 'Inactive' : 'Active';
            this.showToast(`Rule ${rule.state === 'Active' ? 'activated' : 'deactivated'}`, 'success');
            const contentArea = document.getElementById('content-area');
            if (state.currentView === 'trading') {
                this.renderTradingOverview(contentArea);
            } else {
                this.renderTradingRules(contentArea);
            }
        }
    },

    deleteTradingRule(id) {
        this.showConfirmModal(
            'Delete?',
            'Are you sure you want to delete this rule?',
            () => {
                state.tradingRules = state.tradingRules.filter(r => r.id !== id);
                this.showToast('Trading rule deleted', 'success');
                const contentArea = document.getElementById('content-area');
                if (state.currentView === 'trading') {
                    this.renderTradingOverview(contentArea);
                } else {
                    this.renderTradingRules(contentArea);
                }
            }
        );
    },

    renderOverview(container) {
        const data = MOCK_DATA.overview;
        
        container.className = "w-full h-full bg-[#f8f9fb] p-[8px]";
        container.innerHTML = `
            <div class="flex flex-col gap-6 w-full h-full overflow-y-auto">
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
                                            <th class="px-4 py-2 font-medium">Pricing Region</th>
                                            <th class="px-4 py-2 font-medium text-left">Charge</th>
                                            <th class="px-4 py-2 font-medium text-left">Discharge</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-100">
                                        ${data.vppEvents.map(event => `
                                            <tr class="hover:bg-gray-50 transition-colors">
                                                <td class="px-4 py-3 font-medium text-gray-900">${event.state}</td>
                                                <td class="px-4 py-3 text-gray-600 text-left font-mono">${event.charge}</td>
                                                <td class="px-4 py-3 text-gray-600 text-left font-mono">${event.discharge}</td>
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
            'Disconnect Sub-VPP',
            'Are you sure you want to disconnect from this Sub-VPP? Note: After disconnection, devices under this Sub-VPP will no longer be controlled by Manta.',
            () => {
                system.status = 'disconnected';
                this.renderDeviceManagement(document.getElementById('content-area'));
            }
        );
    },

    confirmCloseSystem(id, event) {
        if (event) {
            event.stopPropagation();
        }

        const system = state.systems.find(s => s.id === id);
        if (!system) return;

        this.showConfirmModal(
            'Close Access',
            'Are you sure you want to close this Access? Note: After closing, devices under this Access will no longer be controlled by Manta.',
            () => {
                system.status = 'closed';
                this.renderDeviceManagement(document.getElementById('content-area'));
                lucide.createIcons();
            }
        );
    },

    toggleSubVPPViewMode(mode) {
        state.subVPPViewMode = mode;
        this.renderDeviceManagement(document.getElementById('content-area'));
        lucide.createIcons();
    },

    renderDeviceManagement(container) {
        if (!state.cloudBound) {
            // Empty State - Bind Cloud Platform
            container.className = "w-full h-full bg-[#f8f9fb] p-[8px]";
            container.innerHTML = `
                <div class="bg-white w-full h-full rounded-[4px] p-[16px] flex flex-col relative">
                    <div class="bg-[#f3f3f6] flex flex-1 flex-col gap-[8px] items-center justify-center rounded-[4px] w-full relative">
                        <div class="relative w-[80px] h-[80px]">
                            <img src="assets/icons/empty-state.svg" alt="Empty State" class="w-full h-full block">
                        </div>
                        <p class="font-['Roboto'] font-semibold text-[16px] leading-[20px] text-[#313949] text-center">
                            No Access
                        </p>


                        <button onclick="app.openCloudBindDrawer()" class="bg-[#3ec064] hover:bg-[#35a656] flex items-center justify-center gap-[4px] h-[40px] px-[24px] py-[8px] rounded-[4px] text-white transition-colors min-w-[80px]">
                            <div class="w-[24px] h-[24px] flex items-center justify-center">
                                <i data-lucide="link" class="w-[16px] h-[16px]"></i>
                            </div>
                            <span class="font-['Roboto'] font-semibold text-[16px] leading-[1.42]">Create</span>
                        </button>
                    </div>
                </div>
            `;
            lucide.createIcons();
        } else {
            // System List
            container.className = "w-full h-full bg-[#f8f9fb] p-[8px]";
            
            const systems = state.systems || [];

            // Ensure subVPPViewMode is set
            if (!state.subVPPViewMode) state.subVPPViewMode = 'card';
            const isCardView = state.subVPPViewMode === 'card';

            // Filter systems based on subVppList state
            let filteredSystems = systems;

            // Name Filter
            if (state.subVppList && state.subVppList.name) {
                const searchLower = state.subVppList.name.toLowerCase();
                filteredSystems = filteredSystems.filter(sys => 
                    sys.name.toLowerCase().includes(searchLower)
                );
            }

            // Type Filter
            if (state.subVppList && state.subVppList.type && state.subVppList.type !== 'All') {
                filteredSystems = filteredSystems.filter(sys => 
                    sys.type === state.subVppList.type
                );
            }

            // Status Filter
            if (state.subVppList && state.subVppList.status && state.subVppList.status !== 'All') {
                if (state.subVppList.status === 'Opened') {
                    const openedStatuses = ['establishing', 'established', 'disconnected', 'failed'];
                    filteredSystems = filteredSystems.filter(sys => {
                        const sysStatus = (sys.status || 'disconnected').toLowerCase();
                        return openedStatuses.includes(sysStatus);
                    });
                } else if (state.subVppList.status === 'Closed') {
                    filteredSystems = filteredSystems.filter(sys => {
                        const sysStatus = (sys.status || 'disconnected').toLowerCase();
                        return sysStatus === 'closed';
                    });
                }
            }

            // Pagination
            const itemsPerPage = state.subVppList.itemsPerPage || 10;
            const totalItems = filteredSystems.length;
            const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
            const currentPage = Math.min(Math.max(1, state.subVppList.currentPage || 1), totalPages);
            const startIdx = (currentPage - 1) * itemsPerPage;
            const endIdx = startIdx + itemsPerPage;
            const paginatedSystems = filteredSystems.slice(startIdx, endIdx);

            // Pre-calculate stats for paginated systems
            const systemsWithStats = paginatedSystems.map(sys => {
                let iconName = 'cloud';
                if (sys.type === 'SCADA') iconName = 'database';
                if (sys.type === 'Edge') iconName = 'cpu';

                const sysDevices = (state.devices || []).filter(d => d.vendor === sys.vendor);
                const invs = sysDevices.filter(d => d.type === 'Inverter');
                const bats = sysDevices.filter(d => d.type === 'Battery');
                
                const isConnecting = (sys.status || '').toLowerCase() === 'connecting';
                
                const stats = isConnecting ? {
                    inv: { total: 0, online: 0, offline: 0, disconnected: 0, cap: 0, onlineCap: 0, offlineCap: 0, pvCapacity: 0 },
                    bat: { total: 0, online: 0, offline: 0, disconnected: 0, cap: 0, onlineCap: 0, offlineCap: 0, currentEnergy: 0, socPercentage: 0 }
                } : {
                    inv: {
                        total: invs.length,
                        online: invs.filter(d => d.status === 'online').length,
                        offline: invs.filter(d => d.status === 'offline').length,
                        disconnected: invs.filter(d => d.status === 'disconnected').length,
                        cap: invs.reduce((sum, d) => sum + (d.capacity || 0), 0),
                        pvCapacity: invs.reduce((sum, d) => sum + ((d.capacity || 0) * 1.2), 0).toFixed(1),
                        onlineCap: invs.filter(d => d.status === 'online').reduce((sum, d) => sum + (d.capacity || 0), 0),
                        offlineCap: invs.filter(d => d.status === 'offline').reduce((sum, d) => sum + (d.capacity || 0), 0)
                    },
                    bat: {
                        total: bats.length,
                        online: bats.filter(d => d.status === 'online').length,
                        offline: bats.filter(d => d.status === 'offline').length,
                        disconnected: bats.filter(d => d.status === 'disconnected').length,
                        cap: bats.reduce((sum, d) => sum + (d.capacity || 0), 0),
                        currentEnergy: bats.reduce((sum, d) => sum + ((d.capacity || 0) * (d.soc !== undefined ? d.soc : (40 + Math.floor(Math.random() * 40))) / 100), 0),
                        onlineCap: bats.filter(d => d.status === 'online').reduce((sum, d) => sum + (d.capacity || 0), 0),
                        offlineCap: bats.filter(d => d.status === 'offline').reduce((sum, d) => sum + (d.capacity || 0), 0)
                    }
                };
                
                if (!isConnecting) {
                    stats.bat.socPercentage = stats.bat.cap > 0 ? Math.round((stats.bat.currentEnergy / stats.bat.cap) * 100) : 0;
                }

                const getStatusConfig = (s) => {
                    const status = (s || '').toLowerCase();
                    if (status === 'establishing') return { color: 'bg-yellow-500', text: 'Establishing' };
                    if (status === 'established') return { color: 'bg-manta-primary', text: 'Established' };
                    if (status === 'closed') return { color: 'bg-gray-400', text: 'Closed' };
                    if (status === 'disconnected') return { color: 'bg-red-500', text: 'Disconnected' };
                    if (status === 'failed') return { color: 'bg-red-600', text: 'Failed' };
                    
                    if (status === 'connecting') return { color: 'bg-yellow-500', text: 'Connecting' };
                    if (status === 'connected' || status === 'online') return { color: 'bg-manta-primary', text: 'Connected' };
                    return { color: 'bg-gray-400', text: 'Disconnected' };
                };
                const statusConfig = getStatusConfig(sys.status);
                const isEstablished = (sys.status || '').toLowerCase() === 'established';
                const isDisconnected = (sys.status || '').toLowerCase() === 'disconnected';
                // Only allow click navigation if not in a transitional or closed state (optional, but good UX)
                const isClickable = !['establishing', 'closed', 'disconnected', 'failed'].includes((sys.status || '').toLowerCase());
                
                const onclickAttr = isClickable ? `onclick="app.navigate('system_details', { id: ${sys.id} })"` : '';
                const cursorClass = isClickable ? 'cursor-pointer' : 'cursor-default';

                return { sys, sysDevices, stats, statusConfig, isEstablished, isDisconnected, onclickAttr, cursorClass };
            });

            // Calculate pagination pages
            const pages = [];
            if (totalPages <= 7) {
                for (let i = 1; i <= totalPages; i++) pages.push(i);
            } else {
                if (currentPage <= 4) {
                    for (let i = 1; i <= 5; i++) pages.push(i);
                    pages.push('...');
                    pages.push(totalPages);
                } else if (currentPage >= totalPages - 3) {
                    pages.push(1);
                    pages.push('...');
                    for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
                } else {
                    pages.push(1);
                    pages.push('...');
                    for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                    pages.push('...');
                    pages.push(totalPages);
                }
            }

            container.innerHTML = `
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col p-6 font-['Roboto']">
                    <!-- Header -->
                    <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 flex-shrink-0">
                         <div class="flex items-center gap-2">
                             <!-- Title -->
                             <h2 class="text-xl font-bold text-gray-900">Access</h2>
                             
                             <!-- Add Button -->
                             <button onclick="app.openCloudBindDrawer()" class="p-1 text-green-500 hover:text-green-600 transition-colors hover:bg-green-50 rounded-full">
                                 <i data-lucide="plus" class="w-6 h-6"></i>
                             </button>
                         </div>
                             
                             <!-- Center: Search & Filter Group -->
                             <div class="flex-1 w-full md:max-w-xl mx-4 flex justify-end">
                                 <div class="bg-[#f3f3f6] flex gap-[16px] items-center pl-[8px] pr-0 py-0 relative rounded-[4px] shrink-0 w-auto h-[32px]">
                                     <!-- Search Input -->
                                     <input type="text" id="subvpp-name-filter"
                                         value="${state.subVppList.name || ''}"
                                         class="flex-1 bg-transparent border-none focus:ring-0 p-0 text-[14px] font-normal text-[#1c2026] placeholder-[#b5bcc8] leading-normal min-w-[200px]"
                                         placeholder="Search by Name..."
                                         onkeydown="if(event.key === 'Enter') app.filterSubVPPs()">
                                     
                                     <div class="flex gap-0 items-center px-[4px] relative shrink-0 border-l border-gray-200">
                                         <!-- Type Filter -->
                                         <div class="flex gap-[4px] items-center relative shrink-0 group cursor-pointer px-2">
                                            <select id="subvpp-type-filter" class="bg-transparent border-none focus:ring-0 text-[14px] font-normal text-[#313949] cursor-pointer pr-5 py-0 appearance-none leading-normal" onchange="app.filterSubVPPs()">
                                                <option value="All" ${state.subVppList.type === 'All' ? 'selected' : ''}>All</option>
                                                <option value="Cloud" ${state.subVppList.type === 'Cloud' ? 'selected' : ''}>Cloud</option>
                                                <option value="SCADA" ${state.subVppList.type === 'SCADA' ? 'selected' : ''}>SCADA</option>
                                                <option value="Edge" ${state.subVppList.type === 'Edge' ? 'selected' : ''}>Edge</option>
                                            </select>
                                            <div class="absolute right-0 top-1/2 -translate-y-1/2 w-[16px] h-[16px] flex items-center justify-center pointer-events-none">
                                                <i data-lucide="chevron-down" class="w-[12px] h-[12px] text-[#313949]"></i>
                                            </div>
                                         </div>

                                         <!-- Status Filter -->
                                         <div class="flex gap-[4px] items-center relative shrink-0 group cursor-pointer px-2 border-l border-gray-200">
                                            <select id="subvpp-status-filter" class="bg-transparent border-none focus:ring-0 text-[14px] font-normal text-[#313949] cursor-pointer pr-5 py-0 appearance-none leading-normal" onchange="app.filterSubVPPs()">
                                                <option value="All" ${state.subVppList.status === 'All' ? 'selected' : ''}>All</option>
                                                <option value="Opened" ${state.subVppList.status === 'Opened' ? 'selected' : ''}>Opened</option>
                                                <option value="Closed" ${state.subVppList.status === 'Closed' ? 'selected' : ''}>Closed</option>
                                            </select>
                                            <div class="absolute right-0 top-1/2 -translate-y-1/2 w-[16px] h-[16px] flex items-center justify-center pointer-events-none">
                                                <i data-lucide="chevron-down" class="w-[12px] h-[12px] text-[#313949]"></i>
                                            </div>
                                         </div>
                                         
                                         <!-- Search Icon -->
                                         <button onclick="app.filterSubVPPs()" class="relative rounded-[2px] shrink-0 w-[32px] h-[32px] flex items-center justify-center hover:bg-gray-200 transition-colors ml-1">
                                             <i data-lucide="search" class="w-[18px] h-[18px] text-[#313949]"></i>
                                         </button>
                                     </div>
                                </div>
                             </div>
                         
                         <!-- View Switcher -->
                         <div class="flex bg-[#f3f3f6] p-[4px] rounded-[4px] items-center">
                             <button onclick="app.toggleSubVPPViewMode('list')" class="flex gap-[4px] h-[32px] items-center justify-center min-w-[80px] px-[12px] py-[4px] rounded-[4px] transition-all ${!isCardView ? 'bg-white shadow-sm' : ''}">
                                 <div class="flex gap-[2px] items-center justify-center shrink-0 w-[24px] h-[24px]">
                                     <div class="h-[20px] shrink-0 w-[4px] ${!isCardView ? 'bg-[#313949]' : 'bg-[#b5bcc8]'}"></div>
                                     <div class="h-[20px] shrink-0 w-[4px] ${!isCardView ? 'bg-[#313949]' : 'bg-[#b5bcc8]'}"></div>
                                     <div class="h-[20px] shrink-0 w-[4px] ${!isCardView ? 'bg-[#313949]' : 'bg-[#b5bcc8]'}"></div>
                                 </div>
                                 <span class="text-[14px] leading-normal ${!isCardView ? 'font-semibold text-[#313949]' : 'font-normal text-[#b5bcc8]'}">Form</span>
                             </button>
                             <button onclick="app.toggleSubVPPViewMode('card')" class="flex gap-[4px] h-[32px] items-center justify-center min-w-[80px] px-[12px] py-[4px] rounded-[4px] transition-all ${isCardView ? 'bg-white shadow-sm' : ''}">
                                 <div class="flex gap-[2px] items-center justify-center shrink-0 w-[24px] h-[24px]">
                                     <div class="h-[20px] shrink-0 w-[4px] ${isCardView ? 'bg-[#313949]' : 'bg-[#b5bcc8]'}"></div>
                                     <div class="h-[20px] shrink-0 w-[14px] ${isCardView ? 'bg-[#313949]' : 'bg-[#b5bcc8]'}"></div>
                                 </div>
                                 <span class="text-[14px] leading-normal ${isCardView ? 'font-semibold text-[#313949]' : 'font-normal text-[#b5bcc8]'}">Cards</span>
                             </button>
                         </div>
                    </div>

                    <!-- Content Area -->
                    ${isCardView ? `
                        <div class="flex-1 overflow-y-auto bg-gray-50 rounded-xl p-4 border border-gray-100 w-full">
                            <div class="flex flex-wrap gap-[8px] content-start">
                                ${systemsWithStats.map(({ sys, sysDevices, stats, isDisconnected, isEstablished, onclickAttr, cursorClass }) => {
                                    const s = (sys.status || '').toLowerCase();
                                    let st = { bg: 'bg-[#f3f3f6]', text: 'text-[#5f646e]', dot: 'bg-[#b5bcc8]', label: (sys.status || 'Unknown').toUpperCase() };
                                    if (s === 'established' || s === 'connected' || s === 'online') st = { bg: 'bg-[#f3f3f6]', text: 'text-[#5f646e]', dot: 'bg-[#8cda2f]', label: 'ESTABLISHED' };
                                    else if (s === 'establishing') st = { bg: 'bg-[#f3f3f6]', text: 'text-[#ec981c]', dot: 'bg-[#ec981c]', label: 'ESTABLISHING' };
                                    else if (s === 'disconnected') st = { bg: 'bg-[#f3f3f6]', text: 'text-[#ff3434]', dot: 'bg-[#ff3434]', label: 'DISCONNECTED' };
                                    else if (s === 'closed') st = { bg: 'bg-[#f3f3f6]', text: 'text-[#5f646e]', dot: 'bg-[#b5bcc8]', label: 'CLOSED' };
                                    else if (s === 'failed') st = { bg: 'bg-[#f3f3f6]', text: 'text-[#ff3434]', dot: 'bg-[#ff3434]', label: 'FAILED' };
                                    
                                    return `
                                    <div ${onclickAttr} class="bg-white p-[16px] rounded-[4px] ${cursorClass} flex flex-col gap-[16px] w-full md:w-[calc(50%-4px)] lg:w-[calc(33.333%-6px)] xl:w-[calc(25%-6px)] relative group hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)] transition-shadow">
                                        <!-- Card Header -->
                                        <div class="flex items-center gap-[8px] w-full">
                                            <div class="w-[32px] h-[32px] shrink-0 flex items-center justify-center bg-gray-50 rounded-full text-gray-400">
                                                <i data-lucide="cloud" class="w-[20px] h-[20px]"></i>
                                            </div>
                                            <p class="text-[18px] font-semibold text-[#313949] leading-[1.55] line-clamp-1 flex-1" title="${sys.name}">${sys.name}</p>
                                            
                                            <!-- Status Chip -->
                                            <div class="${st.bg} flex items-center justify-center px-[8px] py-[4px] rounded-[12px] gap-[4px] shrink-0">
                                                 <div class="w-[8px] h-[8px] rounded-full ${st.dot}"></div>
                                                 <p class="text-[12px] ${st.text} font-normal leading-[1.33]">${st.label}</p>
                                            </div>
                                            
                                            <!-- Actions -->
                                            <div class="flex items-center gap-[4px] opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                                ${isEstablished ? `
                                                <button onclick="app.confirmCloseSystem(${sys.id}, event)" class="flex items-center justify-center px-[8px] py-[4px] rounded-[12px] hover:bg-[#f3f3f6] text-[#b5bcc8] hover:text-[#ff3434] transition-all" title="Close">
                                                    <i data-lucide="link-2-off" class="w-[24px] h-[24px]"></i>
                                                </button>
                                                ` : ''}
                                                ${s === 'failed' ? `
                                                <button onclick="event.stopPropagation(); app.openCloudBindDrawer(${sys.id})" class="flex items-center justify-center px-[8px] py-[4px] rounded-[12px] hover:bg-[#f3f3f6] text-[#b5bcc8] hover:text-[#313949] transition-all" title="Edit Connection">
                                                    <i data-lucide="edit-2" class="w-[24px] h-[24px]"></i>
                                                </button>
                                                ` : ''}
                                            </div>
                                        </div>

                                        <!-- Stats -->
                                        <div class="flex flex-col gap-[8px] w-full">
                                            <!-- Main Number -->
                                            <div class="flex gap-[16px] items-center">
                                                <div class="w-[32px] h-[32px] flex items-center justify-center">
                                                    <img src="assets/icon-ders.svg" onerror="this.src='';this.nextElementSibling.style.display='block';this.style.display='none'" class="w-full h-full object-contain">
                                                    <i data-lucide="zap" class="w-[24px] h-[24px] text-[#313949] hidden"></i>
                                                </div>
                                                <div class="flex items-end gap-[4px] text-[#313949]">
                                                    <p class="text-[24px] font-extrabold leading-[1.33]">${sysDevices.length}</p>
                                                    <p class="text-[16px] font-semibold italic leading-[1.42]">DERs</p>
                                                </div>
                                            </div>
                                            
                                            <!-- Breakdown -->
                                            <div class="flex flex-wrap items-center justify-between pl-[14px] w-full mt-[8px] gap-y-[8px]">
                                                 <!-- Online -->
                                                 <div class="flex items-center gap-[12px] xl:gap-[24px]">
                                                     <div class="flex gap-[8px] items-center h-[32px]">
                                                         <div class="bg-[#8cda2f] h-[12px] w-[4px] rounded-[2px]"></div>
                                                         <p class="text-[14px] text-[#5f646e]">Online</p>
                                                     </div>
                                                     <p class="text-[14px] font-medium text-[#8cda2f] text-right">${stats.inv.online + stats.bat.online}</p>
                                                 </div>
                                                 <!-- Offline -->
                                                 <div class="flex items-center gap-[12px] xl:gap-[24px]">
                                                     <div class="flex gap-[8px] items-center h-[32px]">
                                                         <div class="bg-[#b5bcc8] h-[12px] w-[4px] rounded-[2px]"></div>
                                                         <p class="text-[14px] text-[#5f646e]">Offline</p>
                                                     </div>
                                                     <p class="text-[14px] font-medium text-[#b5bcc8] text-right">${stats.inv.offline + stats.bat.offline}</p>
                                                 </div>

                                            </div>
                                        </div>
                                    </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                        ` : `
                            <div class="flex-1 overflow-hidden flex flex-col bg-white rounded-[4px]">
                                <div class="overflow-x-auto">
                                    <table class="w-full text-left border-collapse">
                                        <thead class="sticky top-0 z-10 bg-white">
                                            <tr>
                                                <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee] min-w-[120px]">Name</th>
                                                <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee] min-w-[120px]">Type</th>
                                                <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee]">Status</th>
                                                <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee]">DERs</th>
                                                <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee]">Online</th>
                                                <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee]">Offline</th>
                                                <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee] min-w-[140px]">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody class="">
                                            ${systemsWithStats.map(({ sys, sysDevices, stats, statusConfig, isDisconnected, isEstablished }) => {
                                                const s = (sys.status || '').toLowerCase();
                                                let label = (sys.status || 'Unknown').toUpperCase();
                                                if (s === 'established' || s === 'connected' || s === 'online') label = 'ESTABLISHED';
                                                else if (s === 'establishing') label = 'ESTABLISHING';
                                                else if (s === 'disconnected') label = 'DISCONNECTED';
                                                
                                                return `
                                                <tr class="h-[48px] hover:bg-[#f3f3f6] transition-colors group border-b border-[#e6e8ee]">
                                                    <td class="px-[8px]">
                                                        <div class="text-[14px] font-semibold text-[#1c2026] font-['Roboto']">${sys.name}</div>
                                                    </td>
                                                    <td class="px-[8px]">
                                                        <div class="text-[14px] font-normal text-[#1c2026] font-['Roboto']">${sys.type}</div>
                                                    </td>
                                                    <td class="px-[8px]">
                                                        <span class="inline-flex items-center gap-[4px] px-[8px] py-[2px] rounded-[12px] text-[12px] ${statusConfig.color} text-white font-['Roboto']">
                                                            ${label}
                                                        </span>
                                                    </td>
                                                    <td class="px-[8px]">
                                                        <span class="text-[14px] font-normal text-[#1c2026] font-['Roboto']">${sysDevices.length}</span>
                                                    </td>
                                                    <td class="px-[8px]">
                                                        <span class="text-[14px] font-normal text-green-500 font-['Roboto']">${stats.inv.online + stats.bat.online}</span>
                                                    </td>
                                                    <td class="px-[8px]">
                                                        <span class="text-[14px] font-normal text-gray-400 font-['Roboto']">${stats.inv.offline + stats.bat.offline}</span>
                                                    </td>
                                                    <td class="px-[8px]">
                                                        <div class="flex items-center justify-start gap-[12px]">
                                                            ${s !== 'establishing' ? `
                                                            <button onclick="app.navigate('system_details', { id: ${sys.id} })" class="text-[#1c2026] hover:text-[#5f646e] transition-colors" title="View">
                                                                <i data-lucide="eye" class="w-[16px] h-[16px]"></i>
                                                            </button>
                                                            ` : ''}
                                                            ${isEstablished ? `
                                                            <button onclick="app.confirmCloseSystem(${sys.id}, event)" class="text-[#1c2026] hover:text-[#5f646e] transition-colors" title="Close">
                                                                <i data-lucide="link-2-off" class="w-[16px] h-[16px]"></i>
                                                            </button>
                                                            ` : ''}
                                                        </div>
                                                    </td>
                                                </tr>
                                            `;
                                            }).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        `}

                    <!-- Pagination Controls -->
                    ${!isCardView ? `
                    <div class="flex items-center justify-end px-[16px] py-[12px] mt-auto bg-white">
                        <div class="flex items-center gap-[4px]">
                            <!-- Page Size Selector -->
                            <div class="flex items-center gap-[8px] mr-2">
                                <div class="relative group">
                                    <select class="appearance-none bg-white border border-[var(--color-neutral-line)] text-[var(--color-neutral-bluegrey)] text-[14px] rounded-[4px] px-[12px] py-[4px] pr-[32px] focus:outline-none focus:border-[var(--color-brand-primary)] cursor-pointer font-['Roboto']" onchange="app.updateSubVPPListState('itemsPerPage', parseInt(this.value))">
                                        <option value="10" ${itemsPerPage === 10 ? 'selected' : ''}>10/page</option>
                                        <option value="20" ${itemsPerPage === 20 ? 'selected' : ''}>20/page</option>
                                        <option value="50" ${itemsPerPage === 50 ? 'selected' : ''}>50/page</option>
                                        <option value="100" ${itemsPerPage === 100 ? 'selected' : ''}>100/page</option>
                                    </select>
                                    <div class="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none">
                                        <i data-lucide="chevron-down" class="w-[16px] h-[16px] text-[var(--color-neutral-lightgrey)]"></i>
                                    </div>
                                </div>
                            </div>

                            <!-- First Page -->
                            <button onclick="app.updateSubVPPListState('currentPage', 1)" ${currentPage === 1 ? 'disabled' : ''} class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-[var(--color-neutral-thingrey)] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                <i data-lucide="chevrons-left" class="w-[16px] h-[16px]"></i>
                            </button>
                            <!-- Prev Page -->
                            <button onclick="app.updateSubVPPListState('currentPage', ${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-[var(--color-neutral-thingrey)] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                <i data-lucide="chevron-left" class="w-[16px] h-[16px]"></i>
                            </button>
                            
                            <!-- Page Numbers -->
                            ${pages.map(page => {
                                if (page === '...') {
                                    return `<span class="w-[32px] h-[32px] flex items-center justify-center text-[#5f646e] font-['Roboto']">...</span>`;
                                }
                                return `
                                    <button onclick="app.updateSubVPPListState('currentPage', ${page})" class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] text-[14px] font-medium transition-colors font-['Roboto'] ${page === currentPage ? 'bg-[var(--color-neutral-thingrey)] text-[var(--color-neutral-bluegrey)]' : 'text-[#5f646e] hover:bg-[var(--color-neutral-thingrey)]'}">
                                        ${page}
                                    </button>
                                `;
                            }).join('')}

                            <!-- Next Page -->
                            <button onclick="app.updateSubVPPListState('currentPage', ${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''} class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-[var(--color-neutral-thingrey)] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                <i data-lucide="chevron-right" class="w-[16px] h-[16px]"></i>
                            </button>
                            <!-- Last Page -->
                            <button onclick="app.updateSubVPPListState('currentPage', ${totalPages})" ${currentPage === totalPages ? 'disabled' : ''} class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-[var(--color-neutral-thingrey)] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                <i data-lucide="chevrons-right" class="w-[16px] h-[16px]"></i>
                            </button>
                        </div>
                    </div>
                    ` : ''}
                </div>
            `;
        }
    },

    updateDeviceListState(newState, systemId) {
        Object.assign(state.systemDetails.deviceListPagination, newState);
        const contentArea = document.getElementById('content-area');
        this.renderSystemDetails(contentArea, systemId);
        lucide.createIcons();
    },

    renderSystemDetails(container, systemId) {
        const system = state.systems.find(s => s.id == systemId);
        if (!system) return this.navigate('device_management');

        container.innerHTML = '';
        container.className = "w-full flex-1 bg-[#f3f3f6] p-[8px] flex flex-col overflow-hidden min-h-0";

        // Calculate Metrics
        const devices = state.devices || [];
        const { currentPage, itemsPerPage } = state.systemDetails.deviceListPagination;
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedDevices = devices.slice(start, end);
        const totalPages = Math.ceil(devices.length / itemsPerPage);
        
        const totalDevices = devices.length;
        const onlineDevices = devices.filter(d => d.status === 'online').length;
        const offlineCount = totalDevices - onlineDevices;
        
        // Mock Credentials
        const appKey = system.credentials?.appKey || 'manta_cloud_1';
        const appSecret = system.credentials?.appSecret || 'sec_cloud_1';

        // Main Card (Merged Summary + Device List)
        const mainCard = document.createElement('div');
        mainCard.className = "flex-1 flex flex-col bg-white shadow-sm border border-[#e2e6ec] rounded-[4px] overflow-hidden";
        
        mainCard.innerHTML = `
            <!-- Summary Section -->
            <div class="flex flex-col gap-[16px] items-start p-[16px] w-full relative">
                <!-- Top Row: Back Button + Title -->
                <div class="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                    <div class="flex gap-[16px] h-[40px] items-center px-[8px] py-0 relative shrink-0 w-full">
                        <div class="flex flex-1 gap-[4px] items-center min-h-px min-w-px relative">
                            <!-- Back Button -->
                            <button onclick="app.navigate('device_management')" class="flex gap-[4px] items-center justify-center p-[8px] relative rounded-[4px] shrink-0 hover:bg-[#f3f3f6] transition-colors group">
                                <div class="relative shrink-0 w-[24px] h-[24px]">
                                    <i data-lucide="arrow-left" class="w-6 h-6 text-[#313949] group-hover:text-black"></i>
                                </div>
                            </button>
                            <!-- Title -->
                            <div class="flex gap-[16px] items-center relative shrink-0">
                                <p class="font-['Roboto'] font-semibold leading-[1.4] text-[20px] text-[#313949] text-center">
                                    ${system.name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Details Row: Logo + Info + Stats -->
                <div class="flex gap-[40px] items-center py-[8px] relative shrink-0 w-full">
                     <div class="flex flex-1 flex-col gap-[24px] items-start justify-center min-h-px min-w-px relative">
                        <div class="flex gap-[15px] items-center relative shrink-0 w-full">
                            <!-- Logo Box -->
                            <div class="flex items-center justify-center relative rounded-[16px] shrink-0 w-[80px] h-[80px] bg-[#f3f3f6] border border-[#e2e6ec]">
                                 <i data-lucide="server" class="w-10 h-10 text-[#313949]"></i>
                            </div>
                            
                            <!-- Info Column -->
                            <div class="flex flex-1 flex-row items-center self-stretch">
                                <div class="flex flex-1 flex-col gap-[8px] h-full items-start min-h-px min-w-px py-[4px] relative">

                                    
                                    <!-- Credentials Row -->
                                    <div class="flex gap-[32px] items-center relative shrink-0 w-full flex-wrap">
                                        
                                        <!-- Type -->
                                        <div class="flex gap-[16px] items-center min-w-[48px] py-[8px] relative rounded-[12px] shrink-0">
                                            <div class="flex gap-[4px] items-center relative shrink-0">
                                                <div class="relative shrink-0 w-[24px] h-[24px]">
                                                    <i data-lucide="box" class="w-5 h-5 text-[#b5bcc8]"></i>
                                                </div>
                                                <p class="font-['Roboto'] font-normal leading-[1.42] text-[14px] text-[#313949] text-center">Type:</p>
                                            </div>
                                            <p class="font-['Roboto'] font-normal leading-[1.42] text-[14px] text-[#313949] text-center">${system.type || 'CLOUD'}</p>
                                        </div>

                                        <!-- Separator -->
                                        <div class="h-[16px] w-px bg-[#e2e6ec] relative shrink-0"></div>

                                        <!-- ApiKey -->
                                        <div class="flex gap-[16px] items-center min-w-[48px] py-[8px] relative rounded-[12px] shrink-0 group">
                                            <div class="flex gap-[4px] items-center relative shrink-0">
                                                <div class="relative shrink-0 w-[24px] h-[24px]">
                                                    <i data-lucide="key" class="w-5 h-5 text-[#b5bcc8]"></i>
                                                </div>
                                                <p class="font-['Roboto'] font-normal leading-[1.42] text-[14px] text-[#313949] text-center">AppKey:</p>
                                            </div>
                                            <div class="relative shrink-0 w-[120px] bg-[#f3f3f6] rounded-[4px] px-2 py-1">
                                                <input type="password" value="${appKey}" id="details-app-key" readonly class="w-full bg-transparent border-none p-0 text-sm font-mono text-[#313949] focus:ring-0">
                                            </div>
                                            <div class="flex gap-[8px] opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onclick="app.togglePasswordVisibility('details-app-key')" class="text-[#b5bcc8] hover:text-[#313949]">
                                                    <i data-lucide="eye" class="w-4 h-4"></i>
                                                </button>
                                                <button onclick="app.copyToClipboard('details-app-key')" class="text-[#b5bcc8] hover:text-[#313949]">
                                                    <i data-lucide="copy" class="w-4 h-4"></i>
                                                </button>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Stats Row -->
                        <div class="flex gap-[40px] items-start px-[16px] py-[4px] relative shrink-0 w-full pt-4">
                            <!-- Total DERs -->
                            <div class="flex gap-[16px] items-center py-0 relative shrink-0">
                                <div class="relative shrink-0 w-[32px] h-[32px]">
                                    <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <path d="M1.41421 14.5858L14.5858 1.41421C15.3668 0.633165 16.6332 0.633164 17.4142 1.41421L30.5858 14.5858C31.3668 15.3668 31.3668 16.6332 30.5858 17.4142L17.4142 30.5858C16.6332 31.3668 15.3668 31.3668 14.5858 30.5858L1.41421 17.4142C0.633165 16.6332 0.633164 15.3668 1.41421 14.5858Z" fill="#E6E8EE"/>
                                            <path d="M11.5 16.5L16.5 9.50004V15.5L20.5 15.5L15.5 22.5V16.5H11.5Z" fill="#313949" stroke="#313949" stroke-linejoin="round"/>
                                        </g>
                                    </svg>
                                </div>
                                <div class="flex gap-[4px] items-end relative shrink-0 text-[#313949]">
                                    <p class="font-['Roboto'] font-extrabold leading-[1.33] text-[24px]">${totalDevices}</p>
                                    <p class="font-['Roboto'] font-semibold italic leading-[1.42] text-[16px] text-gray-500 mb-1">DERs</p>
                                </div>
                            </div>

                            <!-- Online/Offline Stats -->
                            <div class="flex gap-[24px] items-start p-0 relative shrink-0 h-[32px]">
                                <!-- Online -->
                                <div class="flex gap-[24px] h-full items-center pr-0 py-0 relative shrink-0">
                                    <div class="flex gap-[8px] items-center relative shrink-0">
                                        <div class="bg-[#3ec064] h-[12px] rounded-[2px] shrink-0 w-[4px]"></div>
                                        <p class="font-['Roboto'] font-normal leading-[1.42] text-[14px] text-[#5f646e]">Online</p>
                                    </div>
                                    <p class="font-['Roboto'] font-medium leading-[1.42] text-[14px] text-[#3ec064] text-right">${onlineDevices}</p>
                                </div>

                                <!-- Offline -->
                                <div class="flex gap-[24px] h-full items-center pr-0 relative shrink-0">
                                    <div class="flex gap-[8px] items-center relative shrink-0">
                                        <div class="bg-[#b5bcc8] h-[12px] rounded-[2px] shrink-0 w-[4px]"></div>
                                        <p class="font-['Roboto'] font-normal leading-[1.42] text-[14px] text-[#5f646e]">Offline</p>
                                    </div>
                                    <p class="font-['Roboto'] font-medium leading-[1.42] text-[14px] text-[#b5bcc8] text-right">${offlineCount}</p>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
            </div>

            <!-- Table Header -->
            <div class="flex justify-between items-center px-[16px] py-[16px] bg-white">
                 <div class="flex items-center justify-center h-[32px] px-[8px] py-[4px] rounded-[4px] bg-white">
                    <p class="font-['Roboto'] font-semibold leading-[1.5] text-[16px] text-[#313949] text-center">DERs</p>
                 </div>
                 <div class="flex gap-[16px] items-center pl-[8px] pr-[8px] py-0 relative rounded-[4px] w-[240px] h-[32px] bg-[#f3f3f6]">
                    <input 
                        type="text" 
                        placeholder="Search" 
                        class="flex-1 bg-transparent border-none p-0 text-[14px] text-[#313949] placeholder-[#b5bcc8] focus:ring-0 font-['Roboto'] font-normal leading-[normal]"
                    >
                    <div class="relative shrink-0 w-[18px] h-[18px]">
                        <svg width="100%" height="100%" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.146 12.3707 1.888 11.112C0.63 9.85333 0.000667196 8.316 5.29101e-07 6.5C-0.000666138 4.684 0.628667 3.14667 1.888 1.888C3.14733 0.629333 4.68467 0 6.5 0C8.31533 0 9.853 0.629333 11.113 1.888C12.373 3.14667 13.002 4.684 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.81267 10.5627 9.688 9.688C10.5633 8.81333 11.0007 7.75067 11 6.5C10.9993 5.24933 10.562 4.187 9.688 3.313C8.814 2.439 7.75133 2.00133 6.5 2C5.24867 1.99867 4.18633 2.43633 3.313 3.313C2.43967 4.18967 2.002 5.252 2 6.5C1.998 7.748 2.43567 8.81067 3.313 9.688C4.19033 10.5653 5.25267 11.0027 6.5 11Z" fill="#B5BCC8"/>
                        </svg>
                    </div>
                 </div>
            </div>

            <!-- Device Table -->
            <div class="flex-1 overflow-y-auto">
                <table class="w-full text-left border-collapse">
                    <thead class="sticky top-0 z-10 bg-white">
                        <tr>
                            <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee]">Status</th>
                            <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee]">SN</th>
                            <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee]">State</th>
                            <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee]">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="">
                        ${paginatedDevices.length > 0 ? paginatedDevices.map(dev => {
                            return `
                            <tr class="h-[48px] hover:bg-[#f3f3f6] transition-colors group border-b border-[#e6e8ee]">
                                <td class="px-[8px]">
                                    <span class="inline-flex items-center gap-[6px] px-[8px] py-[2px] rounded-[12px] text-[12px] font-['Roboto'] ${dev.status === 'online' ? 'bg-[#3ec064]/10 text-[#3ec064]' : 'bg-[#b5bcc8]/10 text-[#b5bcc8]'}">
                                        <span class="w-[4px] h-[4px] rounded-full bg-current"></span>
                                        ${dev.status}
                                    </span>
                                </td>
                                <td class="px-[8px]">
                                    <div class="text-[14px] text-[#313949] font-normal font-mono">${dev.sn}</div>
                                </td>
                                <td class="px-[8px]">
                                    <div class="text-[14px] text-[#313949] font-normal font-['Roboto']">${(state.vpps.find(v => v.id === dev.vppId) || {}).state || '-'}</div>
                                </td>
                                <td class="px-[8px]">
                                    <div class="flex items-center justify-start gap-[12px]">
                                        <button onclick="app.openDERDetails('${dev.sn}', event)" class="text-[#b5bcc8] hover:text-[#3ec064] transition-colors">
                                            <i data-lucide="eye" class="w-4 h-4"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `}).join('') : `
                            <tr>
                                <td colspan="4" class="py-8 text-center text-[#b5bcc8] font-['Roboto']">
                                    No devices found.
                                </td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="flex items-center justify-end px-[16px] py-[12px] mt-auto bg-white">
                <div class="flex items-center gap-[4px]">
                    <!-- Page Size Selector -->
                    <div class="flex items-center gap-[8px] mr-2">
                        <div class="relative group">
                            <select class="appearance-none bg-white border border-[var(--color-neutral-line)] text-[var(--color-neutral-bluegrey)] text-[14px] rounded-[4px] px-[12px] py-[4px] pr-[32px] focus:outline-none focus:border-[var(--color-brand-primary)] cursor-pointer font-['Roboto']" onchange="app.updateDeviceListState({ itemsPerPage: parseInt(this.value), currentPage: 1 }, '${systemId}')">
                                <option value="10" ${itemsPerPage === 10 ? 'selected' : ''}>10/page</option>
                                <option value="20" ${itemsPerPage === 20 ? 'selected' : ''}>20/page</option>
                                <option value="50" ${itemsPerPage === 50 ? 'selected' : ''}>50/page</option>
                                <option value="100" ${itemsPerPage === 100 ? 'selected' : ''}>100/page</option>
                            </select>
                            <div class="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none">
                                <i data-lucide="chevron-down" class="w-[16px] h-[16px] text-[var(--color-neutral-lightgrey)]"></i>
                            </div>
                        </div>
                    </div>

                    <!-- First Page -->
                    <button onclick="app.updateDeviceListState({ currentPage: 1 }, '${systemId}')" ${currentPage === 1 ? 'disabled' : ''} class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-[var(--color-neutral-thingrey)] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <i data-lucide="chevrons-left" class="w-[16px] h-[16px]"></i>
                    </button>
                    <!-- Prev Page -->
                    <button onclick="app.updateDeviceListState({ currentPage: ${Math.max(1, currentPage - 1)} }, '${systemId}')" ${currentPage === 1 ? 'disabled' : ''} class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-[var(--color-neutral-thingrey)] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <i data-lucide="chevron-left" class="w-[16px] h-[16px]"></i>
                    </button>
                    
                    <!-- Page Numbers -->
                    ${(() => {
                        let pages = [];
                        if (totalPages <= 7) {
                            for (let i = 1; i <= totalPages; i++) pages.push(i);
                        } else {
                            if (currentPage <= 4) {
                                for (let i = 1; i <= 5; i++) pages.push(i);
                                pages.push('...');
                                pages.push(totalPages);
                            } else if (currentPage >= totalPages - 3) {
                                pages.push(1);
                                pages.push('...');
                                for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
                            } else {
                                pages.push(1);
                                pages.push('...');
                                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                                pages.push('...');
                                pages.push(totalPages);
                            }
                        }
                        
                        return pages.map(page => {
                            if (page === '...') {
                                return `<span class="w-[32px] h-[32px] flex items-center justify-center text-[#5f646e] font-['Roboto']">...</span>`;
                            }
                            return `
                                <button onclick="app.updateDeviceListState({ currentPage: ${page} }, '${systemId}')" class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] text-[14px] font-medium transition-colors font-['Roboto'] ${page === currentPage ? 'bg-[var(--color-neutral-thingrey)] text-[var(--color-neutral-bluegrey)]' : 'text-[#5f646e] hover:bg-[var(--color-neutral-thingrey)]'}">
                                    ${page}
                                </button>
                            `;
                        }).join('');
                    })()}

                    <!-- Next Page -->
                    <button onclick="app.updateDeviceListState({ currentPage: ${Math.min(totalPages, currentPage + 1)} }, '${systemId}')" ${currentPage === totalPages ? 'disabled' : ''} class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-[var(--color-neutral-thingrey)] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <i data-lucide="chevron-right" class="w-[16px] h-[16px]"></i>
                    </button>
                    <!-- Last Page -->
                    <button onclick="app.updateDeviceListState({ currentPage: ${totalPages} }, '${systemId}')" ${currentPage === totalPages ? 'disabled' : ''} class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-[var(--color-neutral-thingrey)] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <i data-lucide="chevrons-right" class="w-[16px] h-[16px]"></i>
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(mainCard);
    },

    // ==========================================
    // RENDERERS
    // ==========================================


    toggleVPPViewMode(mode) {
        state.vppViewMode = mode;
        this.renderVPP(document.getElementById('content-area'));
        lucide.createIcons();
    },

    renderDERManagement(container, filterType = 'All') {
        container.className = "w-full flex-1 bg-[#f8f9fb] p-[8px] flex flex-col overflow-hidden";
        
        let filteredDevices = [...(state.devices || [])];
        if (filterType !== 'All') {
            filteredDevices = filteredDevices.filter(d => d.type === filterType);
        }

        // Mock data generation to simulate display if count is low
        if (filteredDevices.length < 10) {
             const manufacturers = ['Tesla', 'Sungrow', 'BYD', 'Huawei', 'SolarEdge'];
             const statuses = ['online', 'offline', 'disconnected'];
             const states = ['NSW', 'VIC', 'QLD', 'SA', 'WA'];
             
             for (let i = 0; i < 15; i++) {
                 const type = Math.random() > 0.5 ? 'Inverter' : 'Battery';
                 // If specific filter is active, force that type
                 const finalType = filterType !== 'All' ? filterType : type;
                 const isBattery = finalType === 'Battery';
                 const capacity = Math.floor(Math.random() * 50) + 5;
                 
                 filteredDevices.push({
                     sn: `${finalType === 'Inverter' ? 'INV' : 'BAT'}-SIM-${Date.now()}-${i}`,
                     nmi: `NMI${Math.floor(Math.random() * 1000000000)}`,
                     vendor: manufacturers[Math.floor(Math.random() * manufacturers.length)],
                     status: statuses[Math.floor(Math.random() * statuses.length)],
                     type: finalType,
                     capacity: capacity,
                     soc: isBattery ? Math.floor(Math.random() * 100) : undefined,
                     vppId: null,
                     mockState: states[Math.floor(Math.random() * states.length)]
                 });
             }
        }

        const title = filterType === 'All' ? 'DER Management' : `${filterType} Management`;

        // Calculate metrics
        const ratedPowerTotal = filteredDevices.reduce((acc, d) => acc + (d.capacity || 0), 0).toFixed(1);
        const pvCapacityTotal = filteredDevices.reduce((acc, d) => acc + (d.type === 'Inverter' ? (d.capacity || 0) * 1.2 : 0), 0).toFixed(1);
        
        const storageDevices = filteredDevices.filter(d => d.type === 'Battery' || d.type === 'EV');
        const totalStorage = storageDevices.reduce((acc, d) => acc + (d.capacity || 0), 0).toFixed(1);
        const currentStored = storageDevices.reduce((acc, d) => acc + ((d.capacity || 0) * (d.soc || 0) / 100), 0).toFixed(1);
        const avgSOC = totalStorage > 0 ? Math.round((currentStored / totalStorage) * 100) : 0;
        
        const todayYieldTotal = filteredDevices.reduce((acc, d) => acc + ((d.capacity || 0) * 3), 0).toFixed(1);

        container.innerHTML = `
            <!-- Top Container -->
            <div class="w-full bg-white p-4 rounded-xl flex-1 flex flex-col gap-4 overflow-hidden">
                <div class="flex justify-end items-center">
                    <div class="flex gap-2">
                        <!-- Actions can go here -->
                    </div>
                </div>

                <!-- Stats Overview (New Design) -->
                <div class="w-full bg-white px-[8px] py-[12px] rounded-[16px] flex flex-col gap-[16px]">
                    <div class="flex flex-col xl:flex-row gap-[40px] items-start xl:items-center py-[8px] w-full">
                        <!-- 1. Total & Title & Status Breakdown -->
                        <div class="flex flex-col gap-[8px] items-start px-0 py-[0px] relative shrink-0 min-w-[300px]">
                             <div class="flex gap-[16px] items-center py-[12px] relative shrink-0">
                                  <!-- Icon -->
                                  ${filterType === 'Inverter' ? `
                                  <div class="relative shrink-0 size-[32px] flex items-center justify-center">
                                      <div class="relative size-[24px]">
                                          <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-[#313949] h-[23px] left-1/2 rounded-[2px] top-1/2 w-[17px]"></div>
                                          <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-white h-[23px] left-[calc(50%-3px)] top-1/2 w-px"></div>
                                          <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-white h-px left-1/2 top-[calc(50%-6px)] w-[17px]"></div>
                                          <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-white h-px left-1/2 top-1/2 w-[17px]"></div>
                                          <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-white h-px left-1/2 top-[calc(50%+6px)] w-[17px]"></div>
                                          <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-white h-[23px] left-[calc(50%+3px)] top-1/2 w-px"></div>
                                      </div>
                                  </div>
                                  ` : (filterType === 'EV' ? `
                                  <div class="relative shrink-0 size-[32px] flex items-center justify-center">
                                      <div class="relative shrink-0 size-[24px]">
                                          <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-[#313949] h-[22px] left-1/2 rounded-[2px] top-1/2 w-[18px]"></div>
                                          <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-white border border-[#313949] border-solid h-[22px] left-[calc(50%-3px)] rounded-[2px] top-1/2 w-[12px]"></div>
                                          <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-white border border-[#313949] border-solid h-[22px] left-[calc(50%+6px)] rounded-[2px] top-1/2 w-[6px]"></div>
                                          <div class="-translate-x-1/2 -translate-y-1/2 absolute h-[8px] left-[calc(50%-3px)] top-1/2 w-[6px]">
                                              <svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" style="display: block;" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path id="Lighting" d="M3.16564 7.83082L5.93428 3.60121C6.05259 3.43202 6.00527 3.2145 5.83962 3.09366C5.79229 3.04532 5.7213 3.02115 5.65031 3.02115H3.47327V0.362538C3.47327 0.169184 3.30763 0 3.11832 0C3 0 2.88168 0.0725075 2.83436 0.169184L0.0657245 4.39879C-0.052593 4.56798 -0.00526616 4.7855 0.160378 4.90634C0.207705 4.95468 0.278696 4.97885 0.349687 4.97885H2.52673V7.63746C2.52673 7.83082 2.69237 8 2.88168 8C3 8 3.11832 7.92749 3.16564 7.83082Z" fill="#313949"/>
                                              </svg>
                                          </div>
                                      </div>
                                  </div>
                                  ` : `
                                  <div class="relative shrink-0 size-[32px]">
                                      <!-- Battery Panel -->
                                      <div class="contents">
                                          <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-[#313949] border border-white border-solid h-[23px] left-[calc(50%-4.5px)] rounded-[2px] top-[calc(50%-0.5px)] w-[17px]"></div>
                                          <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-white h-[23px] left-[calc(50%-7.5px)] top-[calc(50%-0.5px)] w-px"></div>
                                          <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-white h-px left-[calc(50%-4px)] top-[calc(50%-6.5px)] w-[18px]"></div>
                                          <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-white h-px left-[calc(50%-4px)] top-[calc(50%-0.5px)] w-[18px]"></div>
                                          <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-white h-px left-[calc(50%-4px)] top-[calc(50%+5.5px)] w-[18px]"></div>
                                          <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-white h-[23px] left-[calc(50%-1.5px)] top-[calc(50%-0.5px)] w-px"></div>
                                      </div>
                                      <!-- Battery Icon -->
                                      <div class="-translate-x-1/2 -translate-y-1/2 absolute h-[17px] left-[calc(50%+5.5px)] top-[calc(50%+2.5px)] w-[13px]">
                                          <div class="absolute inset-[-5.88%_-7.69%]">
                                              <svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" style="display: block;" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <g id="Battery">
                                                      <rect id="Rectangle 3" x="0.5" y="0.5" width="14" height="18" rx="2.5" fill="white" stroke="white"/>
                                                      <rect id="Rectangle 7" x="1.5" y="1.5" width="12" height="16" rx="1.5" fill="white" stroke="#313949"/>
                                                      <rect id="Rectangle 6" x="9" y="2" width="2" height="15" fill="#313949"/>
                                                      <path id="Lighting" d="M5.64033 12.8529L7.94599 9.15287C8.04453 9.00487 8.00502 8.81452 7.86696 8.70873C7.82751 8.66642 7.76835 8.64525 7.70919 8.64523L5.89513 8.64457L5.89428 6.31828C5.89422 6.1491 5.75614 6.00101 5.59839 6.00095C5.4998 6.00092 5.40124 6.06432 5.36183 6.1489L3.05617 9.84896C2.95764 9.99696 2.99714 10.1873 3.13521 10.2931C3.17466 10.3354 3.23382 10.3566 3.29297 10.3566L5.10703 10.3573L5.10788 12.6836C5.10795 12.8527 5.24603 13.0008 5.40377 13.0009C5.50236 13.0009 5.60093 12.9375 5.64033 12.8529Z" fill="#313949"/>
                                                  </g>
                                              </svg>
                                          </div>
                                      </div>
                                  </div>
                                  `)}
                                  <div class="flex gap-[4px] items-end relative shrink-0 text-[#313949]">
                                       <p class="font-['Roboto'] font-extrabold leading-[1.33] text-[24px]">${filteredDevices.length}</p>
                                       <p class="font-['Roboto'] font-semibold italic leading-[1.42] text-[16px] whitespace-pre-wrap">DERs</p>
                                  </div>
                             </div>
                             
                             <div class="h-px w-[56px] bg-[#e6e8ee] my-1"></div>
                             
                             <div class="flex gap-[24px] items-center px-[0px] py-[8px] relative shrink-0 h-[32px]">
                                  <div class="flex gap-[8px] items-center relative shrink-0">
                                       <div class="bg-[#8cda2f] h-[12px] rounded-[2px] shrink-0 w-[4px]"></div>
                                       <p class="font-['Roboto'] font-normal leading-[1.42] text-[14px] text-[#5f646e]">Online</p>
                                       <p class="font-['Roboto'] font-medium leading-[1.42] text-[14px] text-[#8cda2f] text-right ml-1">${filteredDevices.filter(d => d.status === 'online').length}</p>
                                  </div>
                                  <div class="flex gap-[8px] items-center relative shrink-0">
                                       <div class="bg-[#b5bcc8] h-[12px] rounded-[2px] shrink-0 w-[4px]"></div>
                                       <p class="font-['Roboto'] font-normal leading-[1.42] text-[14px] text-[#5f646e]">Offline</p>
                                       <p class="font-['Roboto'] font-medium leading-[1.42] text-[14px] text-[#b5bcc8] text-right ml-1">${filteredDevices.filter(d => d.status === 'offline').length}</p>
                                  </div>
                                  <div class="flex gap-[8px] items-center relative shrink-0">
                                       <div class="bg-[#ff3434] h-[12px] rounded-[2px] shrink-0 w-[4px]"></div>
                                       <p class="font-['Roboto'] font-normal leading-[1.42] text-[14px] text-[#5f646e]">Disconnected</p>
                                       <p class="font-['Roboto'] font-medium leading-[1.42] text-[14px] text-[#ff3434] text-right ml-1">${filteredDevices.filter(d => d.status === 'disconnected').length}</p>
                                  </div>
                             </div>
                        </div>

                        <!-- 2. Metric Cards Container (Single Grey Bar) -->
                        <div class="flex flex-1 flex-row flex-wrap items-center self-stretch bg-[#f3f3f6] rounded-[8px] px-[16px] py-[12px] gap-[8px]">
                             <!-- Rated Power -->
                             <div class="flex flex-1 flex-col gap-[8px] h-full items-center justify-center min-w-[140px] relative">
                                  <div class="flex gap-[8px] items-center">
                                       <p class="font-['Roboto'] font-semibold leading-[1.55] text-[18px] text-[#313949]">${ratedPowerTotal}</p>
                                       <p class="font-['Roboto'] font-normal leading-[1.42] text-[14px] text-[#b5bcc8]">kW</p>
                                  </div>
                                  <div class="flex gap-[4px] items-center justify-center px-[12px] py-[2px] rounded-[12px]">
                                       <p class="font-['Roboto'] font-normal leading-[1.42] text-[14px] text-[#5f646e]">Rated Power</p>
                                  </div>
                             </div>

                             ${filterType !== 'EV' ? `
                             <!-- PV Capacity -->
                             <div class="flex flex-1 flex-col gap-[8px] h-full items-center justify-center min-w-[140px] relative">
                                  <div class="flex gap-[8px] items-center">
                                       <p class="font-['Roboto'] font-semibold leading-[1.55] text-[18px] text-[#313949]">${pvCapacityTotal}</p>
                                       <p class="font-['Roboto'] font-normal leading-[1.42] text-[14px] text-[#b5bcc8]">kW</p>
                                  </div>
                                  <div class="flex gap-[4px] items-center justify-center px-[12px] py-[2px] rounded-[12px]">
                                       <p class="font-['Roboto'] font-normal leading-[1.42] text-[14px] text-[#5f646e]">PV Capacity</p>
                                  </div>
                             </div>
                             ` : ''}

                             ${filterType !== 'Inverter' ? `
                             <!-- Rated Capacity (Battery/EV only) -->
                             <div class="flex flex-1 flex-col gap-[8px] h-full items-center justify-center min-w-[140px] relative">
                                  <div class="flex gap-[8px] items-center">
                                       <p class="font-['Roboto'] font-semibold leading-[1.55] text-[18px] text-[#313949]">${totalStorage}</p>
                                       <p class="font-['Roboto'] font-normal leading-[1.42] text-[14px] text-[#b5bcc8]">kWh</p>
                                  </div>
                                  <div class="flex gap-[4px] items-center justify-center px-[12px] py-[2px] rounded-[12px]">
                                       <p class="font-['Roboto'] font-normal leading-[1.42] text-[14px] text-[#5f646e]">Rated Capacity</p>
                                  </div>
                             </div>
                             ` : ''}

                             ${filterType !== 'EV' ? `
                             <!-- Today Yield -->
                             <div class="flex flex-1 flex-col gap-[8px] h-full items-center justify-center min-w-[140px] relative">
                                  <div class="flex gap-[8px] items-center">
                                       <p class="font-['Roboto'] font-semibold leading-[1.55] text-[18px] text-[#313949]">${todayYieldTotal}</p>
                                       <p class="font-['Roboto'] font-normal leading-[1.42] text-[14px] text-[#b5bcc8]">kWh</p>
                                  </div>
                                  <div class="flex gap-[4px] items-center justify-center px-[12px] py-[2px] rounded-[12px]">
                                       <p class="font-['Roboto'] font-normal leading-[1.42] text-[14px] text-[#5f646e]">Today Yield</p>
                                  </div>
                             </div>
                             ` : ''}
                        </div>
                    </div>
                </div>

            <!-- Device List -->
            <div class="flex-1 bg-white rounded-[4px] flex flex-col overflow-hidden">
                <div class="flex justify-between items-center px-[8px] py-[12px] bg-white">
                     <h2 class="text-[16px] font-bold text-[#1c2026] font-['Roboto']">DERs</h2>
                     <div class="flex gap-2">
                        <div class="relative">
                            <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#b5bcc8]"></i>
                            <input type="text" placeholder="Search" class="bg-[#f3f3f6] border-none rounded-[4px] pl-10 pr-4 py-1.5 text-[14px] text-[#313949] focus:outline-none focus:ring-2 focus:ring-[#2e9f58]/20 w-[240px] transition-colors placeholder:text-[#b5bcc8] font-['Roboto']">
                        </div>
                     </div>
                </div>
                <div class="flex-1 overflow-auto">
                    <table class="w-full text-left border-collapse">
                        <thead class="sticky top-0 z-10 bg-white">
                            <tr>
                                <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] font-['Roboto'] border-b border-[#e6e8ee]">Status</th>
                                <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] font-['Roboto'] border-b border-[#e6e8ee]">SN</th>
                                <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] font-['Roboto'] border-b border-[#e6e8ee]">NMI</th>
                                <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] font-['Roboto'] border-b border-[#e6e8ee]">MANUFACTURER</th>
                                <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] font-['Roboto'] border-b border-[#e6e8ee]">STATE</th>
                                <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] font-['Roboto'] border-b border-[#e6e8ee]">RATED POWER</th>
                                ${filterType !== 'EV' ? `
                                <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] font-['Roboto'] border-b border-[#e6e8ee]">PV CAPACITY</th>
                                ` : ''}
                                ${filterType !== 'Inverter' ? `
                                <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] font-['Roboto'] border-b border-[#e6e8ee]">RATED CAPACITY</th>
                                <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] font-['Roboto'] border-b border-[#e6e8ee]">SOC</th>
                                ` : ''}
                                ${filterType !== 'EV' ? `
                                <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] font-['Roboto'] border-b border-[#e6e8ee]">TODAY YIELD</th>
                                ` : ''}
                                <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] font-['Roboto'] border-b border-[#e6e8ee]">ASSIGNED VPP</th>
                                <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] font-['Roboto'] border-b border-[#e6e8ee]">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="">
                            ${filteredDevices.length > 0 ? filteredDevices.map(dev => {
                                const vpp = state.vpps.find(v => v.id === dev.vppId) || {};
                                const capacity = dev.capacity || 5;
                                const ratedPower = capacity.toFixed(1) + ' kW';
                                const pvCapacity = dev.type === 'Inverter' ? (capacity * 1.2).toFixed(1) + ' kW' : '-';
                                const ratedCapacity = dev.type === 'Battery' ? capacity.toFixed(1) + ' kWh' : '-';
                                
                                let socDisplay = '-';
                                if (dev.type === 'Battery') {
                                    const socVal = dev.soc !== undefined ? dev.soc : Math.floor(40 + Math.random() * 40);
                                    const totalCap = capacity;
                                    const currentEn = (totalCap * socVal) / 100;
                                    socDisplay = `
                                        <div class="flex flex-col items-start">
                                            <span class="text-[14px] font-normal text-[#1c2026] font-['Roboto']">${socVal}%</span>
                                            <span class="text-[10px] text-[#b5bcc8] font-['Roboto']">(${currentEn.toFixed(0)}/${totalCap.toFixed(0)})</span>
                                        </div>
                                    `;
                                }
                                
                                const todayYield = (capacity * (2 + Math.random() * 2)).toFixed(1) + ' kWh';
                                
                                let statusClass = 'bg-[#b5bcc8]/20 text-[#b5bcc8]'; // offline default
                                if (dev.status === 'online') statusClass = 'bg-[#8cda2f]/20 text-[#8cda2f]';
                                else if (dev.status === 'disconnected') statusClass = 'bg-[#ff3434]/20 text-[#ff3434]';

                                return `
                                <tr class="h-[48px] hover:bg-[#f3f3f6] transition-colors group border-b border-[#e6e8ee]">
                                    <td class="px-[8px]">
                                        <span class="inline-flex items-center justify-center gap-[4px] px-[8px] py-[4px] rounded-[12px] text-[12px] font-['Roboto'] min-w-[48px] ${statusClass}">
                                            <span class="text-[10px] leading-none">•</span>
                                            ${dev.status.charAt(0).toUpperCase() + dev.status.slice(1)}
                                        </span>
                                    </td>
                                    <td class="px-[8px]">
                                        <div class="text-[14px] text-[#313949] font-normal font-['Roboto']">${dev.sn || '-'}</div>
                                    </td>
                                    <td class="px-[8px]">
                                        <div class="text-[14px] text-[#1c2026] font-normal font-['Roboto']">${dev.nmi || '-'}</div>
                                    </td>
                                    <td class="px-[8px]">
                                        <div class="text-[14px] text-[#1c2026] font-normal font-['Roboto']">${dev.vendor}</div>
                                    </td>
                                    <td class="px-[8px]">
                                        <div class="text-[14px] text-[#1c2026] font-normal font-['Roboto']">${vpp.state || dev.mockState || '-'}</div>
                                    </td>
                                    <td class="px-[8px]">
                                        <div class="text-[14px] text-[#1c2026] font-normal font-['Roboto']">${ratedPower}</div>
                                    </td>
                                    ${filterType !== 'EV' ? `
                                    <td class="px-[8px]">
                                        <div class="text-[14px] text-[#1c2026] font-normal font-['Roboto']">${pvCapacity}</div>
                                    </td>
                                    ` : ''}
                                    ${filterType !== 'Inverter' ? `
                                    <td class="px-[8px]">
                                        <div class="text-[14px] text-[#1c2026] font-normal font-['Roboto']">${ratedCapacity}</div>
                                    </td>
                                    <td class="px-[8px]">
                                        ${socDisplay}
                                    </td>
                                    ` : ''}
                                    ${filterType !== 'EV' ? `
                                    <td class="px-[8px]">
                                        <div class="text-[14px] text-[#1c2026] font-normal font-['Roboto']">${todayYield}</div>
                                    </td>
                                    ` : ''}
                                    <td class="px-[8px]">
                                        <div class="text-[14px] text-[#313949] font-normal font-['Roboto']">${vpp.name || '-'}</div>
                                    </td>
                                    <td class="px-[8px]">
                                        <div class="flex items-center justify-start gap-[12px]">
                                            <button onclick="app.openAssignVppDrawer('${dev.sn}')" class="text-[#b5bcc8] hover:text-[#3ec064] transition-colors" title="Assign VPP" aria-label="Assign VPP">
                                                <i data-lucide="link-2" class="w-[24px] h-[24px]"></i>
                                            </button>
                                            <button onclick="app.navigate('device_details', { sn: '${dev.sn}' })" class="text-[#b5bcc8] hover:text-[#3ec064] transition-colors">
                                                <i data-lucide="eye" class="w-[24px] h-[24px]"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `;
                            }).join('') : `
                                <tr>
                                    <td colspan="12" class="py-8 text-center text-[#b5bcc8] font-['Roboto']">No devices found</td>
                                </tr>
                            `}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        `;
    },

    assignVppDefaults(deviceSn = '') {
        return {
            deviceSn,
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
        };
    },

    openAssignVppDrawer(sn) {
        const device = (state.devices || []).find(d => d.sn === sn);
        let vpp = null;
        if (device && device.vppId) {
            vpp = (state.vpps || []).find(v => v.id === device.vppId) || 
                  (MOCK_DATA.assignableVpps || []).find(v => v.id === device.vppId);
        }

        const defaults = this.assignVppDefaults(sn);
        
        if (vpp) {
            state.assignVpp = {
                ...defaults,
                pricingRegion: vpp.state,
                activeMarket: 'All',
                assignedVppId: vpp.id
            };
        } else {
            // Auto-populate pricing region from device state
            const deviceState = device ? (device.state || device.mockState) : '';
            state.assignVpp = {
                ...defaults,
                pricingRegion: deviceState || ''
            };
        }

        this.renderAssignVppDrawer();
        this.toggleDrawer(true);
        this.loadAssignVppPricingRegions();

        if (state.assignVpp.pricingRegion) {
            this.loadAssignVppMarkets(state.assignVpp.pricingRegion);
        }

        if (vpp) {
            this.loadAssignVppList();
        }
    },

    cancelAssignVpp() {
        state.assignVpp = this.assignVppDefaults();
        const drawerContent = document.getElementById('drawer-content');
        if (drawerContent) drawerContent.style.width = '';
        this.closeDrawer();
    },

    renderAssignVppDrawer() {
        const drawerContent = document.getElementById('drawer-content');
        if (!drawerContent) return;

        drawerContent.style.width = 'min(90vw, 400px)';

        const assign = state.assignVpp;
        const pricingDisabled = assign.loadingRegions;
        const marketDisabled = !assign.pricingRegion || assign.loadingMarkets;
        const vppDisabled = !assign.pricingRegion || !assign.activeMarket || assign.loadingVpps;
        
        const pricingOptions = assign.pricingRegions.map(region => (
            `<option value="${region.id}" ${region.id === assign.pricingRegion ? 'selected' : ''}>${region.id}</option>`
        )).join('');
        
        const marketOptions = assign.marketOptions.map(market => (
            `<option value="${market.id}" ${market.id === assign.activeMarket ? 'selected' : ''}>${market.label}</option>`
        )).join('');

        const vppOptionsHtml = assign.vppOptions.map(vpp => (
            `<option value="${vpp.id}" ${vpp.id === assign.assignedVppId ? 'selected' : ''}>${vpp.name}</option>`
        )).join('');

        drawerContent.innerHTML = `
            <div class="bg-white flex flex-col h-full w-full font-['Roboto']">
                <div class="border-b border-[#e6e8ee] flex items-center justify-between px-[24px] py-[16px] shrink-0 w-full bg-white z-10">
                    <div class="flex flex-col">
                        <p class="font-bold text-[20px] leading-normal text-[#313949]">Assign VPP <span class="text-[14px] font-normal text-[#5f646e]">(${assign.deviceSn})</span></p>
                    </div>
                    <button onclick="app.cancelAssignVpp()" class="w-[32px] h-[32px] rounded-[6px] flex items-center justify-center hover:bg-[#f3f3f6] active:bg-[#e6e8ee] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e9f58]/30" aria-label="Close">
                        <i data-lucide="x" class="w-[16px] h-[16px] text-[#313949]"></i>
                    </button>
                </div>
                <div class="flex-1 overflow-y-auto px-[24px] py-[16px]">
                    <div class="grid grid-cols-1 gap-[16px]">
                        <div class="flex flex-col gap-[8px]">
                            <div class="flex items-center gap-[4px] h-[16px] pl-[4px]">
                                <span class="text-[#ff3434] text-[12px] leading-[16px]">*</span>
                                <span class="text-[#5f646e] text-[12px] font-medium leading-[16px]">Pricing Region</span>
                            </div>
                            <div class="relative w-full h-[32px] bg-white border border-[#e6e8ee] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#2e9f58] focus-within:ring-2 focus-within:ring-[#2e9f58]/20 ${pricingDisabled ? 'bg-[#f3f3f6]' : ''}">
                                <select ${pricingDisabled ? 'disabled' : ''} onchange="app.handleAssignPricingRegionChange(this.value)" class="w-full h-full bg-transparent border-none outline-none text-[14px] ${!assign.pricingRegion ? 'text-[#b5bcc8]' : 'text-[#313949]'} appearance-none z-10 cursor-pointer disabled:cursor-not-allowed disabled:text-[#b5bcc8]">
                                    <option value="" disabled selected hidden>Select Pricing Region</option>
                                    ${pricingOptions}
                                </select>
                                <i data-lucide="chevron-down" class="absolute right-[8px] top-1/2 -translate-y-1/2 w-4 h-4 text-[#b5bcc8] pointer-events-none"></i>
                            </div>
                        </div>
                        <div class="flex flex-col gap-[8px]">
                            <div class="flex items-center gap-[4px] h-[16px] pl-[4px]">
                                <span class="text-[#ff3434] text-[12px] leading-[16px]">*</span>
                                <span class="text-[#5f646e] text-[12px] font-medium leading-[16px]">Active Market</span>
                            </div>
                            <div class="relative w-full h-[32px] bg-white border border-[#e6e8ee] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#2e9f58] focus-within:ring-2 focus-within:ring-[#2e9f58]/20 ${marketDisabled ? 'bg-[#f3f3f6]' : ''}">
                                <select ${marketDisabled ? 'disabled' : ''} onchange="app.handleAssignMarketChange(this.value)" class="w-full h-full bg-transparent border-none outline-none text-[14px] ${!assign.activeMarket ? 'text-[#b5bcc8]' : 'text-[#313949]'} appearance-none z-10 cursor-pointer disabled:cursor-not-allowed disabled:text-[#b5bcc8]">
                                    <option value="" disabled selected hidden>Select Active Market</option>
                                    ${marketOptions}
                                </select>
                                <i data-lucide="chevron-down" class="absolute right-[8px] top-1/2 -translate-y-1/2 w-4 h-4 text-[#b5bcc8] pointer-events-none"></i>
                            </div>
                        </div>
                        <div class="flex flex-col gap-[8px]">
                            <div class="flex items-center gap-[4px] h-[16px] pl-[4px]">
                                <span class="text-[#ff3434] text-[12px] leading-[16px]">*</span>
                                <span class="text-[#5f646e] text-[12px] font-medium leading-[16px]">Assigned VPP</span>
                            </div>
                            <div class="relative w-full h-[32px] bg-white border border-[#e6e8ee] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#2e9f58] focus-within:ring-2 focus-within:ring-[#2e9f58]/20 ${vppDisabled ? 'bg-[#f3f3f6]' : ''}">
                                <select ${vppDisabled ? 'disabled' : ''} onchange="app.selectAssignedVpp(this.value)" class="w-full h-full bg-transparent border-none outline-none text-[14px] ${!assign.assignedVppId ? 'text-[#b5bcc8]' : 'text-[#313949]'} appearance-none z-10 cursor-pointer disabled:cursor-not-allowed disabled:text-[#b5bcc8]">
                                    <option value="" disabled selected hidden>${assign.loadingVpps ? 'Loading...' : 'Select Assigned VPP'}</option>
                                    ${vppOptionsHtml}
                                </select>
                                <i data-lucide="chevron-down" class="absolute right-[8px] top-1/2 -translate-y-1/2 w-4 h-4 text-[#b5bcc8] pointer-events-none"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="border-t border-[#e6e8ee] px-[24px] py-[16px] flex items-center gap-[12px] w-full">
                    <button type="button" onclick="app.cancelAssignVpp()" class="flex-1 h-[32px] px-[12px] flex items-center justify-center bg-white border border-[#e6e8ee] rounded-[4px] text-[14px] text-[#313949] hover:bg-[#f3f3f6] active:bg-[#e6e8ee] transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e9f58]/30">Cancel</button>
                    <button type="button" onclick="app.submitAssignVpp()" ${assign.submitting ? 'disabled' : ''} class="flex-1 h-[32px] px-[12px] flex items-center justify-center bg-[#2e9f58] rounded-[4px] text-[14px] text-white hover:bg-[#258046] active:bg-[#1a6e3b] transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e9f58]/30 ${assign.submitting ? 'opacity-70 cursor-not-allowed' : ''}">Submit</button>
                </div>
            </div>
        `;

        lucide.createIcons();
    },

    async loadAssignVppPricingRegions() {
        state.assignVpp.loadingRegions = true;
        const requestId = ++state.assignVpp.regionRequestId;
        this.renderAssignVppDrawer();
        try {
            const regions = await this.fetchPricingRegions();
            if (requestId !== state.assignVpp.regionRequestId) return;
            state.assignVpp.pricingRegions = regions;
        } catch (error) {
            this.showToast('Failed to load pricing regions', 'error');
        } finally {
            if (requestId === state.assignVpp.regionRequestId) {
                state.assignVpp.loadingRegions = false;
                this.renderAssignVppDrawer();
            }
        }
    },

    async loadAssignVppMarkets(regionId) {
        state.assignVpp.loadingMarkets = true;
        const requestId = ++state.assignVpp.marketRequestId;
        this.renderAssignVppDrawer();
        try {
            const markets = await this.fetchMarketsByRegion(regionId);
            if (requestId !== state.assignVpp.marketRequestId) return;
            state.assignVpp.marketOptions = markets;
        } catch (error) {
            this.showToast('Failed to load markets', 'error');
        } finally {
            if (requestId === state.assignVpp.marketRequestId) {
                state.assignVpp.loadingMarkets = false;
                this.renderAssignVppDrawer();
            }
        }
    },

    async loadAssignVppList() {
        const { pricingRegion, activeMarket, searchQuery } = state.assignVpp;
        if (!pricingRegion || !activeMarket) return;

        state.assignVpp.loadingVpps = true;
        const requestId = ++state.assignVpp.vppRequestId;
        this.renderAssignVppDrawer();
        try {
            const vpps = await this.fetchAssignableVpps(pricingRegion, activeMarket, searchQuery);
            if (requestId !== state.assignVpp.vppRequestId) return;
            state.assignVpp.vppOptions = vpps;
        } catch (error) {
            this.showToast('Failed to load VPPs', 'error');
        } finally {
            if (requestId === state.assignVpp.vppRequestId) {
                state.assignVpp.loadingVpps = false;
                this.renderAssignVppDrawer();
            }
        }
    },

    handleAssignPricingRegionChange(value) {
        state.assignVpp.pricingRegion = value;
        state.assignVpp.activeMarket = '';
        state.assignVpp.assignedVppId = '';
        state.assignVpp.searchQuery = '';
        state.assignVpp.marketOptions = [];
        state.assignVpp.vppOptions = [];
        this.renderAssignVppDrawer();
        if (value) this.loadAssignVppMarkets(value);
    },

    handleAssignMarketChange(value) {
        state.assignVpp.activeMarket = value;
        state.assignVpp.assignedVppId = '';
        state.assignVpp.searchQuery = '';
        state.assignVpp.vppOptions = [];
        this.renderAssignVppDrawer();
        if (value) this.loadAssignVppList();
    },

    handleAssignVppSearch(value) {
        state.assignVpp.searchQuery = value;
        this.loadAssignVppList();
    },

    selectAssignedVpp(vppId) {
        state.assignVpp.assignedVppId = vppId;
        this.renderAssignVppDrawer();
    },

    async submitAssignVpp() {
        const { deviceSn, pricingRegion, activeMarket, assignedVppId, vppOptions } = state.assignVpp;
        if (!pricingRegion) {
            this.showToast('Pricing Region is required', 'error');
            return;
        }
        if (!activeMarket) {
            this.showToast('Active Market is required', 'error');
            return;
        }
        if (!assignedVppId) {
            this.showToast('Assigned VPP is required', 'error');
            return;
        }

        state.assignVpp.submitting = true;
        this.renderAssignVppDrawer();

        try {
            await new Promise(resolve => setTimeout(resolve, 600));
            const device = (state.devices || []).find(d => d.sn === deviceSn);
            const selected = vppOptions.find(vpp => vpp.id === assignedVppId) || (MOCK_DATA.assignableVpps || []).find(vpp => vpp.id === assignedVppId);
            if (!device || !selected) {
                this.showToast('Assignment failed', 'error');
                return;
            }

            if (!state.vpps.find(vpp => vpp.id === selected.id)) {
                state.vpps.unshift({
                    id: selected.id,
                    name: selected.name,
                    state: selected.state || pricingRegion
                });
            }

            device.vppId = selected.id;
            this.showToast('VPP assigned successfully', 'success');
            this.cancelAssignVpp();
            this.refreshDerList();
        } catch (error) {
            this.showToast('Assignment failed', 'error');
        } finally {
            state.assignVpp.submitting = false;
        }
    },

    refreshDerList() {
        const container = document.getElementById('content-area');
        const viewMap = {
            der: 'All',
            der_ess: 'Battery',
            der_pv: 'Inverter',
            der_ev: 'EV'
        };
        const filterType = viewMap[state.currentView] || 'All';
        this.renderDERManagement(container, filterType);
        lucide.createIcons();
    },

    fetchPricingRegions() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(MOCK_DATA.pricingRegions || []);
            }, 300);
        });
    },

    fetchMarketsByRegion(regionId) {
        return new Promise(resolve => {
            setTimeout(() => {
                const markets = (MOCK_DATA.regionMarkets && MOCK_DATA.regionMarkets[regionId]) || ['All', 'Spot', 'FCAS'];
                resolve(markets.map(market => ({ id: market, label: market })));
            }, 300);
        });
    },

    fetchAssignableVpps(regionId, market, query = '') {
        return new Promise(resolve => {
            setTimeout(() => {
                const base = state.vpps.length
                    ? state.vpps.map(vpp => ({
                        id: vpp.id,
                        name: vpp.name,
                        state: vpp.state || regionId,
                        markets: ['Spot', 'FCAS']
                    }))
                    : (MOCK_DATA.assignableVpps || []);
                let results = base.filter(vpp => !regionId || vpp.state === regionId);
                if (market && market !== 'All') {
                    results = results.filter(vpp => (vpp.markets || []).includes(market));
                }
                if (query) {
                    const keyword = query.toLowerCase();
                    results = results.filter(vpp => vpp.name.toLowerCase().includes(keyword));
                }
                resolve(results);
            }, 400);
        });
    },

    openDeviceEditModal(sn) {
        const device = (state.devices || []).find(d => d.sn === sn);
        if (!device) return;

        this.updateModalWidth('max-w-lg');
        const content = document.getElementById('modal-content');
        
        content.innerHTML = `
            <div class="p-6 bg-white rounded-xl">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-900">Edit Device</h3>
                    <button onclick="app.closeModal()" class="text-gray-400 hover:text-gray-900 transition-colors">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                </div>

                <form onsubmit="app.handleDeviceSubmit(event, '${sn}')" class="space-y-4">
                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold text-gray-500">Serial Number</label>
                        <input type="text" value="${device.sn}" disabled class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-500 cursor-not-allowed">
                    </div>

                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold text-gray-500">NMI</label>
                        <input type="text" name="nmi" value="${device.nmi || ''}" class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:border-manta-primary focus:ring-1 focus:ring-manta-primary outline-none transition-all">
                    </div>

                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold text-gray-500">Manufacturer</label>
                        <input type="text" name="vendor" value="${device.vendor || ''}" class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:border-manta-primary focus:ring-1 focus:ring-manta-primary outline-none transition-all">
                    </div>
                    
                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold text-gray-500">Rated Power (kW)</label>
                        <input type="number" step="0.1" name="capacity" value="${device.capacity || 0}" class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:border-manta-primary focus:ring-1 focus:ring-manta-primary outline-none transition-all">
                    </div>

                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold text-gray-500">Assigned VPP</label>
                        <div class="relative">
                            <select name="vppId" class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:border-manta-primary focus:ring-1 focus:ring-manta-primary outline-none transition-all appearance-none cursor-pointer">
                                <option value="">Unassigned</option>
                                ${state.vpps.map(v => `<option value="${v.id}" ${v.id === device.vppId ? 'selected' : ''}>${v.name}</option>`).join('')}
                            </select>
                            <i data-lucide="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"></i>
                        </div>
                    </div>

                    <div class="pt-4 flex justify-end gap-3">
                        <button type="button" onclick="app.closeModal()" class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium">Cancel</button>
                        <button type="submit" class="px-4 py-2 rounded-lg bg-manta-primary text-white hover:bg-manta-dark transition-colors font-medium shadow-sm">Save Changes</button>
                    </div>
                </form>
            </div>
        `;
        
        this.toggleModal(true);
        lucide.createIcons();
    },

    handleDeviceSubmit(event, sn) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const updates = {
            nmi: formData.get('nmi'),
            vendor: formData.get('vendor'),
            capacity: parseFloat(formData.get('capacity')),
            vppId: formData.get('vppId') ? parseInt(formData.get('vppId')) : null
        };

        const deviceIndex = state.devices.findIndex(d => d.sn === sn);
        if (deviceIndex !== -1) {
            state.devices[deviceIndex] = { ...state.devices[deviceIndex], ...updates };
            
            const container = document.getElementById('content-area');
            if (state.currentView === 'der') {
                this.renderDERManagement(container, state.currentFilter || 'All');
            }
            
            this.closeModal();
            this.showToast('Device updated successfully', 'success');
        }
    },

    // Operation Card Methods
    setOperationTab(tab) {
        state.operationTab = tab;
        
        // Update Tab UI
        const tabs = ['status', 'generation', 'consumption'];
        
        const activeBtnClass = "content-stretch flex h-[32px] items-center justify-center min-w-[80px] px-[16px] py-[4px] relative rounded-[4px] shrink-0 bg-white shadow-sm transition-all";
        const defaultBtnClass = "content-stretch flex h-[32px] items-center justify-center min-w-[80px] px-[16px] py-[4px] relative rounded-[4px] shrink-0 hover:bg-white/50 transition-all";
        
        const activeTextClass = "font-['Roboto'] font-semibold leading-[1.42] relative shrink-0 text-[14px] text-[#313949] text-center";
        const defaultTextClass = "font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#313949] text-center";

        tabs.forEach(t => {
            const btn = document.getElementById(`tab-${t}`);
            if (btn) {
                const isActive = t === tab;
                btn.className = isActive ? activeBtnClass : defaultBtnClass;
                
                const text = btn.querySelector('p');
                if (text) {
                    text.className = isActive ? activeTextClass : defaultTextClass;
                }
            }
        });
        
        this.updateOperationChart();
    },

    handleGranularityChange(granularity) {
        state.operationGranularity = granularity;
        
        // Update Granularity Text Display
        const textDisplay = document.getElementById('operation-granularity-text');
        const selectEl = document.getElementById('operation-granularity');
        if (textDisplay && selectEl) {
             textDisplay.textContent = selectEl.options[selectEl.selectedIndex].text;
        }
        
        // Handle Date Input Type and Visibility
        const dateInput = document.getElementById('operation-date');
        const yearSelect = document.getElementById('operation-year-select');
        const separator = document.getElementById('operation-separator');
        const dateControlGroup = document.getElementById('operation-date-control-group');
        
        const showControls = granularity !== 'total';
        const isYear = granularity === 'year';

        // Toggle visibility of separator and date control group
        if (dateControlGroup) dateControlGroup.style.display = showControls ? 'flex' : 'none';
        if (separator) separator.style.display = showControls ? 'block' : 'none';

        if (dateInput && showControls) {
            // Toggle Input vs Select
            if (isYear) {
                dateInput.classList.add('hidden');
                if (yearSelect) yearSelect.classList.remove('hidden');
            } else {
                dateInput.classList.remove('hidden');
                if (yearSelect) yearSelect.classList.add('hidden');
            }
            
            if (granularity === 'day') {
                dateInput.type = 'date';
                if (!dateInput.value || dateInput.value.length !== 10) {
                    dateInput.value = new Date().toISOString().split('T')[0];
                }
            } else if (granularity === 'month') {
                dateInput.type = 'month';
                if (!dateInput.value || dateInput.value.length !== 7) {
                    dateInput.value = new Date().toISOString().slice(0, 7);
                }
            } else if (isYear) {
                // Change input type to text to hold year value
                dateInput.type = 'text';

                // Populate Year Select if needed
                if (yearSelect && yearSelect.options.length === 0) {
                     const currentYear = new Date().getFullYear();
                     for(let y = currentYear + 10; y >= currentYear - 10; y--) {
                         const opt = document.createElement('option');
                         opt.value = y;
                         opt.text = y;
                         yearSelect.add(opt);
                     }
                }
                const currentVal = dateInput.value.substring(0, 4);
                if (yearSelect) yearSelect.value = currentVal || new Date().getFullYear();
                dateInput.value = yearSelect ? yearSelect.value : new Date().getFullYear();
            }
        }
        
        // Handle Status Tab Visibility
        const statusTab = document.getElementById('tab-status');
        if (statusTab) {
            if (granularity !== 'day') {
                statusTab.style.display = 'none';
                if (state.operationTab === 'status') {
                    this.setOperationTab('generation');
                }
            } else {
                statusTab.style.display = 'block';
            }
        }
        
        this.updateOperationChart();
    },

    triggerDatePicker() {
        const granularity = state.operationGranularity || 'day';
        if (granularity === 'year') {
             const sel = document.getElementById('operation-year-select');
             if (sel) sel.showPicker ? sel.showPicker() : sel.click();
        } else {
             const inp = document.getElementById('operation-date');
             if (inp) inp.showPicker ? inp.showPicker() : inp.click();
        }
    },

    handleDateChange(val) {
        const dateInput = document.getElementById('operation-date');
        if (dateInput && state.operationGranularity === 'year') {
             dateInput.value = val;
        }
        this.updateOperationChart();
    },

    adjustDate(delta) {
        const granularity = state.operationGranularity || 'day';
        const dateInput = document.getElementById('operation-date');
        const yearSelect = document.getElementById('operation-year-select');
        if (!dateInput) return;

        if (granularity === 'year') {
            let year = parseInt(dateInput.value) || new Date().getFullYear();
            year += delta;
            dateInput.value = year;
            if (yearSelect) yearSelect.value = year;
        } else {
            let date = new Date(dateInput.value);
            // If invalid date (e.g. empty), use today
            if (isNaN(date.getTime())) date = new Date();

            if (granularity === 'day') {
                date.setDate(date.getDate() + delta);
                dateInput.value = date.toISOString().split('T')[0];
            } else if (granularity === 'month') {
                date.setMonth(date.getMonth() + delta);
                dateInput.value = date.toISOString().slice(0, 7);
            }
        }
        
        this.updateOperationChart();
    },

    updateOperationChart() {
        const dateInput = document.getElementById('operation-date');
        const dateDisplay = document.getElementById('operation-date-display');
        const chartDom = document.getElementById('operation-chart');
        const granularity = state.operationGranularity || 'day';

        // Update Date Display Text
        if (dateDisplay && dateInput) {
             const val = dateInput.value;
             if (val) {
                 if (granularity === 'day') {
                     // val is YYYY-MM-DD -> DD / MM / YYYY
                     const parts = val.split('-');
                     if (parts.length === 3) {
                         dateDisplay.textContent = `${parts[2]} / ${parts[1]} / ${parts[0]}`;
                     }
                 } else if (granularity === 'month') {
                     // val is YYYY-MM -> MM / YYYY
                     const parts = val.split('-');
                     if (parts.length === 2) {
                         dateDisplay.textContent = `${parts[1]} / ${parts[0]}`;
                     }
                 } else if (granularity === 'year') {
                     // val is YYYY
                     dateDisplay.textContent = val;
                 }
             }
        }
        
        if (!chartDom || typeof echarts === 'undefined') return;
        
        const myChart = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);
        
        // Calculate max bar width based on Year view (12 data points)
        const chartWidth = chartDom.clientWidth || 1000;
        const gridWidth = chartWidth * 0.93; 
        const yearDataCount = 12;
        const maxBarWidthStack = (gridWidth / yearDataCount) * 0.25;
        const maxBarWidthGen = (gridWidth / yearDataCount) * 0.40;

        // Determine granularity and date
        const selectedDate = dateInput ? new Date(dateInput.value) : new Date();
        
        let xAxisData = [];
        let dataLength = 0;

        // Generate Axis Data based on Granularity
        if (granularity === 'day') {
            xAxisData = [];
            for (let h = 0; h < 24; h++) {
                for (let m = 0; m < 60; m += 5) {
                    xAxisData.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
                }
            }
            dataLength = xAxisData.length;
        } else if (granularity === 'month') {
            const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
            xAxisData = Array.from({length: daysInMonth}, (_, i) => `${i + 1}`);
            dataLength = daysInMonth;
        } else if (granularity === 'year') {
            xAxisData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            dataLength = 12;
        } else if (granularity === 'total') {
            const currentYear = new Date().getFullYear();
            xAxisData = Array.from({length: 5}, (_, i) => (currentYear - 4 + i).toString());
            dataLength = 5;
        }

        let option;
        
        const isDay = granularity === 'day';
        const dataScale = isDay ? 1000 : 1;
        
        if (state.operationTab === 'generation') {
            // Mock Data for Generation
            // Generation = Grid + Battery + Consumed
            const powerToGrid = Array.from({length: dataLength}, () => parseFloat((Math.random() * 5 * dataScale).toFixed(2)));
            const powerToBattery = Array.from({length: dataLength}, () => parseFloat((Math.random() * 3 * dataScale).toFixed(2)));
            const consumed = Array.from({length: dataLength}, () => parseFloat((Math.random() * 4 * dataScale).toFixed(2)));
            const generation = powerToGrid.map((val, i) => parseFloat((val + powerToBattery[i] + consumed[i]).toFixed(2)));
            
            // Calculate Self consumption = (To Battery + Direct Consumption) / Generation
            const selfConsumption = generation.map((gen, i) => {
                if (gen === 0) return 0;
                const val = ((powerToBattery[i] + consumed[i]) / gen) * 100;
                return parseFloat(val.toFixed(2));
            });
            
            option = {
                title: {
                    text: isDay ? 'Generation Series' : 'Generation',
                    left: '2%',
                    top: '2%'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: isDay ? 'line' : 'shadow' }
                },
                legend: {
                    data: ['To Grid', 'To Battery', 'Direct consumption', 'Self consumption'],
                    top: '6%',
                    textStyle: { padding: [0, 0, 0, 4] },
                    itemGap: 24
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    top: '120',
                    bottom: '10%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: xAxisData,
                    axisLine: { lineStyle: { color: '#e5e7eb' } },
                    axisLabel: { color: '#6b7280' },
                    boundaryGap: !isDay
                },
                yAxis: [
                    {
                        type: 'value',
                        name: isDay ? 'Power (W)' : 'Energy (kWh)',
                        splitLine: { lineStyle: { type: 'dashed' } }
                    },
                    {
                        type: 'value',
                        name: 'Self Consumption (%)',
                        min: 0,
                        max: 100,
                        axisLabel: { formatter: '{value}' },
                        splitLine: { show: false }
                    }
                ],
                color: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'],
                series: [
                    {
                        name: 'To Grid',
                        type: isDay ? 'line' : 'bar',
                        stack: 'total',
                        ...(isDay ? { smooth: true, showSymbol: false, areaStyle: { opacity: 0.8 } } : { barWidth: '25%', barMaxWidth: maxBarWidthStack, z: 2 }),
                        emphasis: { focus: 'series' },
                        data: powerToGrid
                    },
                    {
                        name: 'To Battery',
                        type: isDay ? 'line' : 'bar',
                        stack: 'total',
                        ...(isDay ? { smooth: true, showSymbol: false, areaStyle: { opacity: 0.8 } } : { barWidth: '25%', barMaxWidth: maxBarWidthStack, z: 2 }),
                        emphasis: { focus: 'series' },
                        data: powerToBattery
                    },
                    {
                        name: 'Direct consumption',
                        type: isDay ? 'line' : 'bar',
                        stack: 'total',
                        ...(isDay ? { smooth: true, showSymbol: false, areaStyle: { opacity: 0.8 } } : { barWidth: '25%', barMaxWidth: maxBarWidthStack, z: 2 }),
                        emphasis: { focus: 'series' },
                        data: consumed
                    },
                    {
                        name: 'Generation',
                        type: isDay ? 'line' : 'bar',
                        ...(isDay ? { smooth: true, showSymbol: false, lineStyle: { width: 2, color: '#E5E7EB' }, areaStyle: { color: '#E5E7EB', opacity: 0.3 }, itemStyle: { color: '#E5E7EB' }, z: 1 } : { barWidth: '40%', barMaxWidth: maxBarWidthGen, barGap: '-130%', itemStyle: { color: '#E5E7EB' }, z: 1 }),
                        data: generation
                    },
                    {
                        name: 'Self consumption',
                        type: 'line',
                        yAxisIndex: 1,
                        smooth: true,
                        showSymbol: true,
                        lineStyle: { width: 2 },
                        itemStyle: { color: '#8B5CF6' },
                        tooltip: {
                            valueFormatter: (value) => value + ' %'
                        },
                        data: selfConsumption
                    }
                ]
            };
        } else if (state.operationTab === 'consumption') {
            // Mock Data for Consumption
            // Consumption = From grid + From battery + Direct consumption
            const fromGrid = Array.from({length: dataLength}, () => parseFloat((Math.random() * 5 * dataScale).toFixed(2)));
            const fromBattery = Array.from({length: dataLength}, () => parseFloat((Math.random() * 3 * dataScale).toFixed(2)));
            const directConsumption = Array.from({length: dataLength}, () => parseFloat((Math.random() * 4 * dataScale).toFixed(2)));
            const consumption = fromGrid.map((val, i) => parseFloat((val + fromBattery[i] + directConsumption[i]).toFixed(2)));
            
            // Calculate Self Sufficiency = (From Battery + Direct Consumption) / Consumption * 100
            const selfSufficiency = consumption.map((con, i) => {
                if (con === 0) return 0;
                const val = ((fromBattery[i] + directConsumption[i]) / con) * 100;
                return parseFloat(val.toFixed(2));
            });
            
            option = {
                title: {
                    text: isDay ? 'Consumption Series' : 'Consumption',
                    left: '2%',
                    top: '2%'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: isDay ? 'line' : 'shadow' }
                },
                legend: {
                    data: ['From grid', 'From battery', 'Direct consumption', 'Self Sufficiency'],
                    top: '6%',
                    textStyle: { padding: [0, 0, 0, 4] },
                    itemGap: 24
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    top: '120',
                    bottom: '10%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: xAxisData,
                    axisLine: { lineStyle: { color: '#e5e7eb' } },
                    axisLabel: { color: '#6b7280' },
                    boundaryGap: !isDay
                },
                yAxis: [
                    {
                        type: 'value',
                        name: isDay ? 'Power (W)' : 'Energy (kWh)',
                        splitLine: { lineStyle: { type: 'dashed' } }
                    },
                    {
                        type: 'value',
                        name: 'Self Sufficiency (%)',
                        min: 0,
                        max: 100,
                        axisLabel: { formatter: '{value}' },
                        splitLine: { show: false }
                    }
                ],
                color: ['#6366F1', '#EC4899', '#F59E0B', '#E5E7EB', '#8B5CF6'],
                series: [
                    {
                        name: 'From grid',
                        type: isDay ? 'line' : 'bar',
                        stack: 'total',
                        ...(isDay ? { smooth: true, showSymbol: false, areaStyle: { opacity: 0.8 } } : { barWidth: '25%', barMaxWidth: maxBarWidthStack, z: 2 }),
                        emphasis: { focus: 'series' },
                        data: fromGrid
                    },
                    {
                        name: 'From battery',
                        type: isDay ? 'line' : 'bar',
                        stack: 'total',
                        ...(isDay ? { smooth: true, showSymbol: false, areaStyle: { opacity: 0.8 } } : { barWidth: '25%', barMaxWidth: maxBarWidthStack, z: 2 }),
                        emphasis: { focus: 'series' },
                        data: fromBattery
                    },
                    {
                        name: 'Direct consumption',
                        type: isDay ? 'line' : 'bar',
                        stack: 'total',
                        ...(isDay ? { smooth: true, showSymbol: false, areaStyle: { opacity: 0.8 } } : { barWidth: '25%', barMaxWidth: maxBarWidthStack, z: 2 }),
                        emphasis: { focus: 'series' },
                        data: directConsumption
                    },
                    {
                        name: 'Consumption',
                        type: isDay ? 'line' : 'bar',
                        ...(isDay ? { smooth: true, showSymbol: false, lineStyle: { width: 2, color: '#E5E7EB' }, areaStyle: { color: '#E5E7EB', opacity: 0.3 }, itemStyle: { color: '#E5E7EB' }, z: 1 } : { barWidth: '40%', barMaxWidth: maxBarWidthGen, barGap: '-130%', itemStyle: { color: '#E5E7EB' }, z: 1 }),
                        data: consumption
                    },
                    {
                        name: 'Self Sufficiency',
                        type: 'line',
                        yAxisIndex: 1,
                        smooth: true,
                        showSymbol: true,
                        lineStyle: { width: 2 },
                        itemStyle: { color: '#8B5CF6' },
                        tooltip: {
                            valueFormatter: (value) => value + ' %'
                        },
                        data: selfSufficiency
                    }
                ]
            };
        } else {
            // Mock Data for Status
            // Status: 1=Online, 0=Offline, -1=Disconnected
            const statusData = Array.from({length: dataLength}, () => {
                const rand = Math.random();
                if (rand > 0.9) return 'Disconnected'; 
                if (rand > 0.8) return 'Offline'; 
                return 'Online'; 
            });
            
            option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        const status = params[0].value;
                        const color = status === 'Online' ? '#10B981' : (status === 'Offline' ? '#EF4444' : '#9CA3AF');
                        return `${params[0].axisValue}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>${status}`;
                    }
                },
                legend: {
                    show: false,
                    data: ['Status'],
                    top: '6%',
                    textStyle: { padding: [0, 0, 0, 4] },
                    itemGap: 24
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    top: '120',
                    bottom: '10%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: xAxisData,
                    axisLine: { lineStyle: { color: '#e5e7eb' } },
                    axisLabel: { color: '#6b7280' }
                },
                yAxis: {
                    type: 'category',
                    data: ['Offline', 'Online', 'Disconnected'],
                    splitLine: { show: true, lineStyle: { type: 'dashed' } }
                },
                series: [
                    {
                        name: 'Status',
                        type: 'line',
                        step: 'start',
                        data: statusData,
                        itemStyle: {
                            color: function(params) {
                                const status = params.value;
                                if (status === 'Online') return '#10B981';
                                if (status === 'Offline') return '#EF4444';
                                return '#9CA3AF';
                            }
                        },
                        lineStyle: {
                            color: '#6366F1',
                            width: 2
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                              { offset: 0, color: 'rgba(99, 102, 241, 0.2)' },
                              { offset: 1, color: 'rgba(99, 102, 241, 0)' }
                            ])
                        }
                    }
                ]
            };
        }
        
        myChart.setOption(option, true);
        
        // Handle resize
        if (!chartDom.hasAttribute('data-resize-attached')) {
            window.addEventListener('resize', () => myChart.resize());
            chartDom.setAttribute('data-resize-attached', 'true');
        }
    },

    initOperationChart() {
        state.operationTab = 'status'; // Default
        state.operationGranularity = 'day'; // Default granularity
        
        const attemptInit = (count = 0) => {
            const chartDom = document.getElementById('operation-chart');
            if (chartDom) {
                this.updateOperationChart();
            } else if (count < 10) {
                setTimeout(() => attemptInit(count + 1), 200);
            }
        };
        attemptInit();
    },

    renderDeviceDetails(container, sn) {
        const device = (state.devices || []).find(d => d.sn === sn);
        if (!device) {
            container.innerHTML = '<div class="p-8 text-center text-gray-500">Device not found</div>';
            return;
        }

        const vpp = state.vpps.find(v => v.id === device.vppId) || {};
        
        container.innerHTML = `
            <div class="h-full overflow-y-auto bg-white pb-24">
                <div class="flex items-center px-[8px] py-[8px] gap-[16px]">
                    <button onclick="app.navigate('der_ess')" class="p-[8px] rounded-[4px] hover:bg-gray-100 transition-colors flex items-center justify-center">
                        <i data-lucide="arrow-left" class="w-[24px] h-[24px] text-[#313949]"></i>
                    </button>
                    <span class="text-[20px] font-bold text-[#1c2026] font-['Roboto']">${sn}</span>
                </div>
                <!-- Header Removed -->



                    <!-- Content -->
                        <div class="bg-white p-[8px] flex flex-col gap-[8px]">
                            <div class="bg-white content-stretch flex flex-col lg:flex-row gap-[40px] items-center px-[40px] relative w-full rounded-[4px] overflow-hidden">
                                <!-- Visuals -->
                                <div class="aspect-[816/432] w-full max-w-[816px] relative mx-auto">
                                    <div class="relative w-full h-full">
                                        <div class="-scale-y-100 flex-none h-full rotate-180 w-full relative">
                                            <div class="relative size-full">
                                                <div class="absolute inset-0 overflow-hidden pointer-events-none">
                                                    <img alt="" class="absolute h-[164.2%] left-[0.1%] max-w-none top-[-26.19%] w-[99.96%] object-contain" src="assets/images/topology-house.png" />
                                                </div>
                                            </div>
                                        </div>
                                    
                                    <!-- Vector Overlays -->
                                    <div class="absolute inset-[67.01%_12.3%_7.06%_59.01%]">
                                        <div class="absolute inset-[-0.89%_-0.43%]">
                                            <img alt="" class="block max-w-none size-full" src="assets/images/topology-vector-1064.svg" />
                                        </div>
                                    </div>
                                    <div class="absolute h-[8%] left-[54.6%] top-[39%] w-0">
                                        <div class="absolute inset-[-2.86%_-1px]">
                                            <img alt="" class="block max-w-none size-full" src="assets/images/topology-vector-1069.svg" />
                                        </div>
                                    </div>
                                    <div class="absolute inset-[27.81%_45.41%_60.99%_48.55%]">
                                        <div class="absolute inset-[-2.07%_-2.03%]">
                                            <img alt="" class="block max-w-none size-full" src="assets/images/topology-vector-1061.svg" />
                                        </div>
                                    </div>
                                    <div class="absolute h-[8%] left-[54.6%] top-[39%] w-0">
                                        <div class="absolute inset-[-2.86%_-1px]">
                                            <img alt="" class="block max-w-none size-full" src="assets/images/topology-vector-1070.svg" />
                                        </div>
                                    </div>
                                    <div class="absolute inset-[68.17%_43.14%_13.43%_19.12%]">
                                        <div class="absolute inset-[-1.26%_-0.32%]">
                                            <img alt="" class="block max-w-none size-full" src="assets/images/topology-vector-1066.svg" />
                                        </div>
                                    </div>
                                    <div class="absolute inset-[34.95%_28.19%_53.47%_58.03%]">
                                        <div class="absolute inset-[-2%_-0.89%]">
                                            <img alt="" class="block max-w-none size-full" src="assets/images/topology-vector-1067.svg" />
                                        </div>
                                    </div>
                                    <div class="absolute inset-[67.01%_12.3%_7.06%_59.01%]">
                                        <div class="absolute inset-[-0.89%_-0.43%]">
                                            <img alt="" class="block max-w-none size-full" src="assets/images/topology-vector-1072.svg" />
                                        </div>
                                    </div>
                                    <div class="absolute inset-[27.81%_45.41%_60.99%_48.55%]">
                                        <div class="absolute inset-[-2.07%_-2.03%]">
                                            <img alt="" class="block max-w-none size-full" src="assets/images/topology-vector-1065.svg" />
                                        </div>
                                    </div>
                                    <div class="absolute inset-[68.17%_43.14%_13.43%_19.12%]">
                                        <div class="absolute inset-[-1.26%_-0.32%]">
                                            <img alt="" class="block max-w-none size-full" src="assets/images/topology-vector-1068.svg" />
                                        </div>
                                    </div>
                                    <div class="absolute inset-[34.95%_28.19%_53.47%_58.03%]">
                                        <div class="absolute inset-[-2%_-0.89%]">
                                            <img alt="" class="block max-w-none size-full" src="assets/images/topology-vector-1071.svg" />
                                        </div>
                                    </div>
                                    
                                    <!-- Labels -->
                                    <div class="absolute bottom-[58%] left-[52.5%] flex items-center justify-center">
                                        <div class="-rotate-[13deg] -skew-x-[13deg] flex-none scale-y-[0.97] backdrop-blur-[4px] bg-[rgba(255,255,255,0.7)] border border-[#3ec064] flex h-[16px] items-center justify-center px-[8px] rounded-[12px]">
                                            <span class="text-[12px] text-[#3ec064] font-['Roboto']">DC</span>
                                        </div>
                                    </div>
                                    <div class="absolute bottom-[59%] left-[62.5%] flex items-center justify-center">
                                        <div class="-rotate-[15deg] -skew-x-[15deg] flex-none scale-y-[0.97] backdrop-blur-[4px] bg-[rgba(255,255,255,0.7)] border border-[#3ec064] flex h-[16px] items-center justify-center px-[8px] rounded-[12px]">
                                            <span class="text-[12px] text-[#3ec064] font-['Roboto']">DC</span>
                                        </div>
                                    </div>
                                    <div class="absolute bottom-[12%] left-[68.8%] flex items-center justify-center">
                                        <div class="rotate-[18deg] scale-y-[0.95] skew-x-[18deg] backdrop-blur-[4px] bg-[rgba(255,255,255,0.7)] border border-[#346aff] flex h-[16px] items-center justify-center px-[8px] rounded-[12px]">
                                            <span class="text-[12px] text-[#346aff] font-['Roboto']">AC</span>
                                        </div>
                                    </div>
                                    <div class="absolute bottom-[13.5%] left-[45.7%] flex items-center justify-center">
                                        <div class="-rotate-[15deg] -skew-x-[15deg] flex-none scale-y-[0.97] backdrop-blur-[4px] bg-[rgba(255,255,255,0.7)] border border-[#346aff] flex h-[16px] items-center justify-center px-[8px] rounded-[12px]">
                                            <span class="text-[12px] text-[#346aff] font-['Roboto']">AC</span>
                                        </div>
                                    </div>
                                    </div>
                                </div>

                                <!-- Info Panel -->
                                <div class="backdrop-blur-[25px] bg-[rgba(255,255,255,0.7)] flex gap-0 items-start px-[16px] py-[8px] relative rounded-[8px] shrink-0 w-full lg:w-[232px]">
                                    <div class="flex flex-col gap-[16px] items-start relative shrink-0 w-[24px]">
                                        ${[1,2,3,4,5].map(() => `
                                        <div class="flex flex-col h-[60px] items-center py-[8px] w-full">
                                            <div class="size-[4px]"><img src="assets/images/topology-ellipse.svg" class="block size-full"/></div>
                                        </div>`).join('')}
                                    </div>
                                    
                                    <div class="flex flex-[1_0_0] flex-col gap-[16px] items-start relative">
                                        <div class="flex flex-col items-start min-w-[160px] relative shrink-0">
                                            <div class="flex gap-[4px] items-center"><span class="text-[14px] text-[#5f646e] font-['Roboto'] uppercase">ASSIGNED VPP</span></div>
                                            <div class="flex items-center h-[40px]"><span class="text-[18px] font-semibold text-[#313949] font-['Roboto']">${vpp.name || 'Unassigned'}</span></div>
                                        </div>
                                        <div class="flex flex-col items-start min-w-[160px] relative shrink-0">
                                            <div class="flex gap-[4px] items-center"><span class="text-[14px] text-[#5f646e] font-['Roboto'] uppercase">NMI</span></div>
                                            <div class="flex items-center h-[40px]"><span class="text-[18px] font-semibold text-[#313949] font-['Roboto'] font-mono">${device.nmi || '-'}</span></div>
                                        </div>
                                        <div class="flex flex-col items-start min-w-[160px] relative shrink-0">
                                            <div class="flex gap-[4px] items-center"><span class="text-[14px] text-[#5f646e] font-['Roboto'] uppercase">STATE</span></div>
                                            <div class="flex items-center justify-center h-[40px]"><span class="text-[18px] font-semibold text-[#313949] font-['Roboto']">${vpp.state || '-'}</span></div>
                                        </div>
                                        <div class="flex flex-col items-start min-w-[160px] relative shrink-0">
                                            <div class="flex gap-[4px] items-center"><span class="text-[14px] text-[#5f646e] font-['Roboto'] uppercase">GRID STATUS</span></div>
                                            <div class="flex gap-[8px] items-center h-[40px]">
                                                <div class="h-[12px] w-[4px] rounded-[2px] ${device.status === 'online' ? 'bg-[#8cda2f]' : 'bg-[#b5bcc8]'}"></div>
                                                <span class="text-[18px] font-semibold text-[#313949] font-['Roboto']">${device.status.charAt(0).toUpperCase() + device.status.slice(1)}</span>
                                            </div>
                                        </div>
                                        <div class="flex flex-col items-start min-w-[160px] relative shrink-0">
                                            <div class="flex gap-[4px] items-center"><span class="text-[14px] text-[#5f646e] font-['Roboto'] uppercase">Operating Mode</span></div>
                                            <div class="flex items-center h-[40px]"><span class="text-[18px] font-semibold text-[#313949] font-['Roboto']">Normal</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <!-- PV ESS & Environmental Benefits Section -->
                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-[16px] items-start relative size-full mt-[16px]">
                                <!-- PV ESS (Frame 1000003628) -->
                                <div class="bg-[#f8f9fb] content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-[300px] p-[16px] relative rounded-[4px]">
                                    <div class="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[0px] py-[4px] relative rounded-[4px] shrink-0 w-full">
                                        <!-- PV Icon (Frame1) -->
                                        <div class="relative shrink-0 size-[24px]">
                                            <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-[#313949] h-[23px] left-1/2 rounded-[2px] top-1/2 w-[17px]"></div>
                                            <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-white h-[23px] left-[calc(50%-3px)] top-1/2 w-px"></div>
                                            <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-white h-px left-1/2 top-[calc(50%-6px)] w-[17px]"></div>
                                            <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-white h-px left-1/2 top-1/2 w-[17px]"></div>
                                            <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-white h-px left-1/2 top-[calc(50%+6px)] w-[17px]"></div>
                                            <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-white h-[23px] left-[calc(50%+3px)] top-1/2 w-px"></div>
                                        </div>
                                        <p class="flex-[1_0_0] font-['Roboto'] font-semibold leading-[1.4] min-h-px min-w-px relative text-[20px] text-[#313949] whitespace-pre-wrap" style="font-variation-settings: 'wdth' 100">PV</p>
                                    </div>
                                    <div class="backdrop-blur-[25px] gap-x-[8px] gap-y-[8px] grid grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))] p-[8px] relative rounded-[8px] shrink-0 w-full">
                                        <!-- Capacity -->
                                        <div class="flex flex-col gap-[0px] items-start min-w-[120px] px-[0px] relative shrink-0">
                                            <div class="flex gap-[0px] items-center relative shrink-0">
                                                <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#5f646e]" style="font-variation-settings: 'wdth' 100">Capacity</p>
                                            </div>
                                            <div class="flex gap-[0px] h-[40px] items-center relative shrink-0">
                                                <p class="font-['Roboto'] font-semibold leading-[1.55] relative shrink-0 text-[18px] text-[#313949]" style="font-variation-settings: 'wdth' 100">${device.capacity} kW</p>
                                            </div>
                                        </div>
                                        <!-- Today Yield -->
                                        <div class="flex flex-col gap-[0px] items-start min-w-[120px] px-[0px] relative shrink-0">
                                            <div class="flex gap-[0px] items-center relative shrink-0">
                                                <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#5f646e]" style="font-variation-settings: 'wdth' 100">Today Yield</p>
                                            </div>
                                            <div class="flex flex-col gap-[0px] h-[40px] items-center justify-center relative shrink-0">
                                                <p class="font-['Roboto'] font-semibold leading-[1.55] relative shrink-0 text-[18px] text-[#313949]" style="font-variation-settings: 'wdth' 100">${(device.capacity * 4.2).toFixed(1)} kWh</p>
                                            </div>
                                        </div>
                                        <!-- Today Full Hours -->
                                        <div class="flex flex-col gap-[0px] items-start min-w-[120px] px-[0px] relative shrink-0">
                                            <div class="flex gap-[0px] items-center relative shrink-0">
                                                <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#5f646e]" style="font-variation-settings: 'wdth' 100">Today Full Hours</p>
                                            </div>
                                            <div class="flex gap-[0px] h-[40px] items-center relative shrink-0">
                                                <p class="font-['Roboto'] font-semibold leading-[1.55] relative shrink-0 text-[18px] text-[#313949]" style="font-variation-settings: 'wdth' 100">4.2 h</p>
                                            </div>
                                        </div>
                                        <!-- Month Yield -->
                                        <div class="flex flex-col gap-[0px] items-start min-w-[120px] px-[0px] relative shrink-0">
                                            <div class="flex gap-[0px] items-center relative shrink-0">
                                                <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#5f646e]" style="font-variation-settings: 'wdth' 100">MTD Yield</p>
                                            </div>
                                            <div class="flex gap-[0px] h-[40px] items-center relative shrink-0">
                                                <p class="font-['Roboto'] font-semibold leading-[1.55] relative shrink-0 text-[18px] text-[#313949]" style="font-variation-settings: 'wdth' 100">${(device.capacity * 120).toFixed(1)} kWh</p>
                                            </div>
                                        </div>
                                        <!-- Annual Yield -->
                                        <div class="flex flex-col gap-[0px] items-start min-w-[120px] px-[0px] relative shrink-0">
                                            <div class="flex gap-[0px] items-center relative shrink-0">
                                                <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#5f646e]" style="font-variation-settings: 'wdth' 100">YTD Yield</p>
                                            </div>
                                            <div class="flex gap-[0px] h-[40px] items-center relative shrink-0">
                                                <p class="font-['Roboto'] font-semibold leading-[1.55] relative shrink-0 text-[18px] text-[#313949]" style="font-variation-settings: 'wdth' 100">${(device.capacity * 1.4).toFixed(2)} MWh</p>
                                            </div>
                                        </div>
                                        <!-- Total Yield -->
                                        <div class="flex flex-col gap-[0px] items-start min-w-[120px] px-[0px] relative shrink-0">
                                            <div class="flex gap-[0px] items-center relative shrink-0">
                                                <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#5f646e]" style="font-variation-settings: 'wdth' 100">Total Yield</p>
                                            </div>
                                            <div class="flex gap-[0px] h-[40px] items-center relative shrink-0">
                                                <p class="font-['Roboto'] font-semibold leading-[1.55] relative shrink-0 text-[18px] text-[#313949]" style="font-variation-settings: 'wdth' 100">${(device.capacity * 5).toFixed(2)} MWh</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Environmental Benefits (Frame 1000003634) -->
                                <div class="bg-[#f8f9fb] content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-[300px] p-[16px] relative rounded-[4px] size-full">
                                    <div class="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[0px] py-[4px] relative rounded-[4px] shrink-0 w-full">
                                        <div class="relative shrink-0 size-[24px]">
                                            <div class="absolute inset-[0_12.5%]">
                                                <img alt="" class="block max-w-none size-full" src="assets/images/env-benefits-icon-new.svg">
                                            </div>
                                        </div>
                                        <p class="flex-[1_0_0] font-['Roboto'] font-semibold leading-[1.4] min-h-px min-w-px relative text-[20px] text-[#313949] whitespace-pre-wrap" style="font-variation-settings: 'wdth' 100">Environmental Benefits</p>
                                    </div>
                                    <div class="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative w-full">
                                        <!-- CO2 Reduction -->
                                        <div class="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-h-px min-w-px relative">
                                            <div class="relative shrink-0 size-[48px]">
                                                <img alt="" class="block max-w-none size-full" src="assets/images/co2-icon-new.svg">
                                            </div>
                                            <div class="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 text-center w-full whitespace-pre-wrap">
                                                <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#5f646e] w-full" style="font-variation-settings: 'wdth' 100">CO₂ Reduction</p>
                                                <p class="font-['Roboto'] font-semibold leading-[1.55] relative shrink-0 text-[18px] text-[#313949] w-full" style="font-variation-settings: 'wdth' 100">${(device.capacity * 3.5).toFixed(1)} t</p>
                                            </div>
                                        </div>
                                        <!-- Trees Planted -->
                                        <div class="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-h-px min-w-px relative">
                                            <div class="relative shrink-0 size-[48px]">
                                                <img alt="" class="block max-w-none size-full" src="assets/images/trees-icon-new.svg">
                                            </div>
                                            <div class="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 text-center w-full whitespace-pre-wrap">
                                                <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#5f646e] w-full" style="font-variation-settings: 'wdth' 100">Trees Planted</p>
                                                <p class="font-['Roboto'] font-semibold leading-[1.55] relative shrink-0 text-[18px] text-[#313949] w-full" style="font-variation-settings: 'wdth' 100">${Math.floor(device.capacity * 15)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Inverter Section (Frame 955:17691) -->
                            <div class="bg-[#f8f9fb] content-stretch flex flex-col gap-[16px] items-start p-[16px] relative rounded-[4px] size-full mt-[16px]">
                                <div class="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[0px] py-[4px] relative rounded-[4px] shrink-0 w-full">
                                    <!-- Icon -->
                                    <div class="relative shrink-0 size-[24px]">
                                        <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-[#f3f3f6] border-2 border-[#f3f3f6] border-solid h-[22px] left-1/2 rounded-[2px] top-[calc(50%-1px)] w-[16px]"></div>
                                        <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-white border border-[#313949] border-solid h-[22px] left-1/2 rounded-[2px] top-[calc(50%-1px)] w-[16px]"></div>
                                        <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-[#f3f3f6] border border-[#313949] border-solid h-[2px] left-1/2 rounded-[2px] top-[calc(50%+6px)] w-[10px]"></div>
                                        <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-[#313949] h-px left-[calc(50%+3px)] rounded-[2px] top-[calc(50%-6.5px)] w-[4px]"></div>
                                        <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-[#313949] h-[2px] left-[calc(50%+3px)] rounded-[2px] top-[calc(50%+10px)] w-[4px]"></div>
                                        <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-[#313949] h-[2px] left-[calc(50%-4.5px)] rounded-[2px] top-[calc(50%+10px)] w-px"></div>
                                    </div>
                                    <p class="flex-[1_0_0] font-['Roboto'] font-semibold leading-[1.4] min-h-px min-w-px relative text-[20px] text-[#313949] whitespace-pre-wrap" style="font-variation-settings: 'wdth' 100">Inverter</p>
                                </div>
                                
                                <div class="backdrop-blur-[25px] gap-x-[8px] gap-y-[8px] grid grid-cols-2 lg:flex lg:justify-between lg:flex-nowrap p-[8px] relative rounded-[8px] shrink-0 w-full">
                                    <!-- SN -->
                                    <div class="flex flex-col gap-[0px] items-start min-w-[120px] lg:min-w-0 px-[0px] relative shrink-0">
                                        <div class="flex gap-[0px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#5f646e]" style="font-variation-settings: 'wdth' 100">SN</p>
                                        </div>
                                        <div class="flex gap-[0px] h-[40px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-semibold leading-[1.55] relative shrink-0 text-[18px] text-[#313949] truncate" title="${device.sn}" style="font-variation-settings: 'wdth' 100">${device.sn}</p>
                                        </div>
                                    </div>
                                    <!-- Manufacturer -->
                                    <div class="flex flex-col gap-[0px] items-start min-w-[120px] lg:min-w-0 px-[0px] relative shrink-0">
                                        <div class="flex gap-[0px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#5f646e]" style="font-variation-settings: 'wdth' 100">Manufacturer</p>
                                        </div>
                                        <div class="flex flex-col gap-[0px] h-[40px] items-center justify-center relative shrink-0">
                                            <p class="font-['Roboto'] font-semibold leading-[1.55] relative shrink-0 text-[18px] text-[#313949] truncate" title="${device.vendor}" style="font-variation-settings: 'wdth' 100">${device.vendor}</p>
                                        </div>
                                    </div>
                                    <!-- Model -->
                                    <div class="flex flex-col gap-[0px] items-start min-w-[120px] lg:min-w-0 px-[0px] relative shrink-0">
                                        <div class="flex gap-[0px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#5f646e]" style="font-variation-settings: 'wdth' 100">Model</p>
                                        </div>
                                        <div class="flex gap-[0px] h-[40px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-semibold leading-[1.55] relative shrink-0 text-[18px] text-[#313949] truncate" title="${device.model || 'Unknown'}" style="font-variation-settings: 'wdth' 100">${device.model || 'Unknown'}</p>
                                        </div>
                                    </div>
                                    <!-- Type -->
                                    <div class="flex flex-col gap-[0px] items-start min-w-[120px] lg:min-w-0 px-[0px] relative shrink-0">
                                        <div class="flex gap-[0px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#5f646e]" style="font-variation-settings: 'wdth' 100">Type</p>
                                        </div>
                                        <div class="flex gap-[0px] h-[40px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-semibold leading-[1.55] relative shrink-0 text-[18px] text-[#313949]" style="font-variation-settings: 'wdth' 100">String Inverter</p>
                                        </div>
                                    </div>
                                    <!-- Rated Power -->
                                    <div class="flex flex-col gap-[0px] items-start min-w-[120px] lg:min-w-0 px-[0px] relative shrink-0">
                                        <div class="flex gap-[0px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#5f646e]" style="font-variation-settings: 'wdth' 100">Rated Power</p>
                                        </div>
                                        <div class="flex gap-[0px] h-[40px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-semibold leading-[1.55] relative shrink-0 text-[18px] text-[#313949]" style="font-variation-settings: 'wdth' 100">${device.capacity} kW</p>
                                        </div>
                                    </div>
                                    <!-- Input Power -->
                                    <div class="flex flex-col gap-[0px] items-start min-w-[120px] lg:min-w-0 px-[0px] relative shrink-0">
                                        <div class="flex gap-[0px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#5f646e]" style="font-variation-settings: 'wdth' 100">Input Power</p>
                                        </div>
                                        <div class="flex gap-[0px] h-[40px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-semibold leading-[1.55] relative shrink-0 text-[18px] text-[#313949]" style="font-variation-settings: 'wdth' 100">${(device.capacity * 0.85).toFixed(1)} kW</p>
                                        </div>
                                    </div>
                                    <!-- Output Power -->
                                    <div class="flex flex-col gap-[0px] items-start min-w-[120px] lg:min-w-0 px-[0px] relative shrink-0">
                                        <div class="flex gap-[0px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#5f646e]" style="font-variation-settings: 'wdth' 100">Output Power</p>
                                        </div>
                                        <div class="flex gap-[0px] h-[40px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-semibold leading-[1.55] relative shrink-0 text-[18px] text-[#313949]" style="font-variation-settings: 'wdth' 100">${(device.capacity * 0.8).toFixed(1)} kW</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <!-- Battery Section (Frame 955:17736) -->
                            <div class="bg-[#f8f9fb] content-stretch flex flex-col gap-[16px] items-start p-[16px] relative rounded-[4px] size-full mt-[16px]">
                                <div class="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[0px] py-[4px] relative rounded-[4px] shrink-0 w-full">
                                    <!-- Icon -->
                                    <div class="relative shrink-0 size-[24px]">
                                        <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-[#313949] h-[22px] left-1/2 rounded-[2px] top-1/2 w-[18px]"></div>
                                        <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-white border border-[#313949] border-solid h-[22px] left-[calc(50%-3px)] rounded-[2px] top-1/2 w-[12px]"></div>
                                        <div class="-translate-x-1/2 -translate-y-1/2 absolute bg-white border border-[#313949] border-solid h-[22px] left-[calc(50%+6px)] rounded-[2px] top-1/2 w-[6px]"></div>
                                        <div class="-translate-x-1/2 -translate-y-1/2 absolute h-[8px] left-[calc(50%-3px)] top-1/2 w-[6px]">
                                            <img alt="" class="block max-w-none size-full" src="assets/images/battery-lightning.svg">
                                        </div>
                                    </div>
                                    <p class="flex-[1_0_0] font-['Roboto'] font-semibold leading-[1.4] min-h-px min-w-px relative text-[20px] text-[#313949] whitespace-pre-wrap" style="font-variation-settings: 'wdth' 100">Battery</p>
                                </div>
                                
                                <div class="backdrop-blur-[25px] gap-x-[8px] gap-y-[8px] grid grid-cols-2 lg:flex lg:justify-between lg:flex-nowrap p-[8px] relative rounded-[8px] shrink-0 w-full">
                                    <!-- Model -->
                                    <div class="flex flex-col gap-[0px] items-start min-w-[120px] lg:min-w-0 px-[0px] relative shrink-0">
                                        <div class="flex gap-[0px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#5f646e]" style="font-variation-settings: 'wdth' 100">Model</p>
                                        </div>
                                        <div class="flex gap-[0px] h-[40px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-semibold leading-[1.4] relative shrink-0 text-[20px] text-[#313949]" style="font-variation-settings: 'wdth' 100">LFP-200</p>
                                        </div>
                                    </div>
                                    <!-- Rated Capacity -->
                                    <div class="flex flex-col gap-[0px] items-start min-w-[120px] lg:min-w-0 px-[0px] relative shrink-0">
                                        <div class="flex gap-[0px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#5f646e]" style="font-variation-settings: 'wdth' 100">Rated Capacity</p>
                                        </div>
                                        <div class="flex flex-col gap-[0px] h-[40px] items-center justify-center relative shrink-0">
                                            <p class="font-['Roboto'] font-semibold leading-[1.55] relative shrink-0 text-[18px] text-[#313949]" style="font-variation-settings: 'wdth' 100">${device.capacity * 2} kWh</p>
                                        </div>
                                    </div>
                                    <!-- Rated Charge Power -->
                                    <div class="flex flex-col gap-[0px] items-start min-w-[120px] lg:min-w-0 px-[0px] relative shrink-0">
                                        <div class="flex gap-[0px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#5f646e]" style="font-variation-settings: 'wdth' 100">Rated Charge Power</p>
                                        </div>
                                        <div class="flex flex-col gap-[0px] h-[40px] items-center justify-center relative shrink-0">
                                            <p class="font-['Roboto'] font-semibold leading-[1.55] relative shrink-0 text-[18px] text-[#313949]" style="font-variation-settings: 'wdth' 100">${device.capacity} kW</p>
                                        </div>
                                    </div>
                                    <!-- Rated Discharge Power -->
                                    <div class="flex flex-col gap-[0px] items-start min-w-[120px] lg:min-w-0 px-[0px] relative shrink-0">
                                        <div class="flex gap-[0px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#5f646e]" style="font-variation-settings: 'wdth' 100">Rated Discharge Power</p>
                                        </div>
                                        <div class="flex flex-col gap-[0px] h-[40px] items-center justify-center relative shrink-0">
                                            <p class="font-['Roboto'] font-semibold leading-[1.55] relative shrink-0 text-[18px] text-[#313949]" style="font-variation-settings: 'wdth' 100">${device.capacity} kW</p>
                                        </div>
                                    </div>
                                    <!-- SOC Floor -->
                                    <div class="flex flex-col gap-[0px] items-start min-w-[120px] lg:min-w-0 px-[0px] relative shrink-0">
                                        <div class="flex gap-[0px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#5f646e]" style="font-variation-settings: 'wdth' 100">SOC Floor</p>
                                        </div>
                                        <div class="flex gap-[0px] h-[40px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-semibold leading-[1.55] relative shrink-0 text-[18px] text-[#313949]" style="font-variation-settings: 'wdth' 100">10%</p>
                                        </div>
                                    </div>
                                    <!-- Active Power -->
                                    <div class="flex flex-col gap-[0px] items-start min-w-[120px] lg:min-w-0 px-[0px] relative shrink-0">
                                        <div class="flex gap-[0px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#5f646e]" style="font-variation-settings: 'wdth' 100">Active Power</p>
                                        </div>
                                        <div class="flex flex-col gap-[0px] h-[40px] items-center justify-center relative shrink-0">
                                            <p class="font-['Roboto'] font-semibold leading-[1.55] relative shrink-0 text-[18px] text-[#313949]" style="font-variation-settings: 'wdth' 100">${(device.capacity * 0.6).toFixed(1)} kW</p>
                                        </div>
                                    </div>
                                    <!-- Available Charge -->
                                    <div class="flex flex-col gap-[0px] items-start min-w-[120px] lg:min-w-0 px-[0px] relative shrink-0">
                                        <div class="flex gap-[0px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#5f646e]" style="font-variation-settings: 'wdth' 100">Available Charge</p>
                                        </div>
                                        <div class="flex gap-[0px] h-[40px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-semibold leading-[1.55] relative shrink-0 text-[18px] text-[#313949]" style="font-variation-settings: 'wdth' 100">${(device.capacity * 2 * 0.8).toFixed(1)} kWh</p>
                                        </div>
                                    </div>
                                    <!-- Available Discharge -->
                                    <div class="flex flex-col gap-[0px] items-start min-w-[120px] lg:min-w-0 px-[0px] relative shrink-0">
                                        <div class="flex gap-[0px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#5f646e]" style="font-variation-settings: 'wdth' 100">Available Discharge</p>
                                        </div>
                                        <div class="flex gap-[0px] h-[40px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-semibold leading-[1.55] relative shrink-0 text-[18px] text-[#313949]" style="font-variation-settings: 'wdth' 100">${(device.capacity * 2 * 0.15).toFixed(1)} kWh</p>
                                        </div>
                                    </div>
                                    <!-- SOC -->
                                    <div class="flex flex-col gap-[0px] items-start min-w-[120px] lg:min-w-0 px-[0px] relative shrink-0">
                                        <div class="flex gap-[0px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#5f646e]" style="font-variation-settings: 'wdth' 100">SOC</p>
                                        </div>
                                        <div class="flex gap-[0px] h-[40px] items-center relative shrink-0">
                                            <p class="font-['Roboto'] font-semibold leading-[1.55] relative shrink-0 text-[18px] text-[#313949]" style="font-variation-settings: 'wdth' 100">85%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Operation Section (Figma Node 1018:6626) -->
                            <div class="bg-[#f8f9fb] content-stretch flex flex-col gap-[16px] items-start p-[16px] relative rounded-[4px] size-full mt-[16px] mb-6">
                                <!-- Header: Title + Controls -->
                                <div class="content-stretch flex gap-[8px] items-center justify-center px-[0px] py-[0px] relative rounded-[4px] shrink-0 w-full">
                                    <!-- Icon -->
                                    <div class="content-stretch flex flex-col gap-[0px] items-center justify-center p-[0px] relative rounded-[12px] shrink-0 size-[24px]">
                                        <div class="h-[10px] relative shrink-0 w-[18px]">
                                            <img alt="" class="block max-w-none size-full" src="assets/images/operation-icon-new.svg">
                                        </div>
                                    </div>
                                    <!-- Title -->
                                    <p class="flex-[1_0_0] font-['Roboto'] font-semibold leading-[1.4] min-h-px min-w-px relative text-[20px] text-[#313949] whitespace-pre-wrap" style="font-variation-settings: 'wdth' 100">Operation</p>
                                    
                                    <!-- Controls Group -->
                                    <div class="bg-white border border-[#cacfd8] border-solid content-stretch flex gap-[16px] items-center px-[16px] py-[8px] relative rounded-[8px] shrink-0">
                                        <!-- Granularity Select -->
                                        <div class="content-stretch flex gap-[8px] items-center relative shrink-0">
                                            <p id="operation-granularity-text" class="font-['Roboto'] font-normal leading-[24px] relative shrink-0 text-[16px] text-[#313949]" style="font-variation-settings: 'wdth' 100">Daily</p>
                                            <div class="relative w-[8px] h-[4px] pointer-events-none">
                                                <img src="assets/images/operation-arrow-new.svg" class="block max-w-none size-full">
                                            </div>
                                            <select id="operation-granularity" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full" onchange="app.handleGranularityChange(this.value)">
                                                <option value="day">Daily</option>
                                                <option value="month">Monthly</option>
                                                <option value="year">Yearly</option>
                                                <option value="total">Total</option>
                                            </select>
                                        </div>
                                        
                                        <!-- Separator -->
                                        <div id="operation-separator" class="h-[16px] relative shrink-0 w-[1px]">
                                            <img alt="" class="block max-w-none size-full" src="assets/images/operation-separator.svg">
                                        </div>

                                        <!-- Date Control -->
                                        <div id="operation-date-control-group" class="content-stretch flex gap-[8px] items-center relative shrink-0">
                                            <button id="operation-date-prev" onclick="app.adjustDate(-1)" class="overflow-clip relative shrink-0 size-[24px] flex items-center justify-center hover:bg-gray-50 rounded-[4px] transition-colors">
                                                <div class="flex-none h-[4px] rotate-90 w-[8px]">
                                                    <div class="relative size-full">
                                                        <img alt="" class="block max-w-none size-full" src="assets/images/operation-arrow-new.svg">
                                                    </div>
                                                </div>
                                            </button>

                                            <div class="content-stretch flex gap-[16px] items-center relative shrink-0">
                                                <div class="content-stretch flex font-['Roboto'] font-normal gap-[8px] items-center leading-[24px] relative shrink-0 text-[16px] text-[#313949]">
                                                    <div class="relative flex items-center min-w-[120px] justify-center">
                                                        <!-- Custom Date Display -->
                                                        <p id="operation-date-display" class="font-['Roboto'] font-normal text-[16px] text-[#313949] leading-[24px] whitespace-nowrap text-center cursor-pointer" style="font-variation-settings: 'wdth' 100" onclick="app.triggerDatePicker()">
                                                            2026 / 02 / 17
                                                        </p>
                                                        
                                                        <!-- Hidden Inputs for Pickers -->
                                                        <input type="date" id="operation-date" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" value="${new Date().toISOString().split('T')[0]}" onchange="app.handleDateChange(this.value)" onclick="try{this.showPicker()}catch(e){}">
                                                        <select id="operation-year-select" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10 hidden" onchange="app.handleDateChange(this.value)">
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="overflow-clip relative shrink-0 size-[24px] pointer-events-none">
                                                    <img alt="" class="block max-w-none size-full" src="assets/images/operation-calendar-new.svg">
                                                </div>
                                            </div>

                                            <button id="operation-date-next" onclick="app.adjustDate(1)" class="overflow-clip relative shrink-0 size-[24px] flex items-center justify-center hover:bg-gray-50 rounded-[4px] transition-colors">
                                                <div class="flex-none h-[4px] -rotate-90 w-[8px]">
                                                    <div class="relative size-full">
                                                        <img alt="" class="block max-w-none size-full" src="assets/images/operation-arrow-new.svg">
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <!-- Chart Area -->
                                <div class="bg-white content-stretch flex flex-col gap-[24px] items-start p-[16px] relative shrink-0 w-full rounded-[4px]">
                                    <!-- Tabs -->
                                    <div class="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                                        <div class="bg-[#f3f3f6] content-stretch flex items-center p-[4px] relative rounded-[4px] shrink-0">
                                            <button onclick="app.setOperationTab('status')" id="tab-status" class="content-stretch flex h-[32px] items-center justify-center min-w-[80px] px-[16px] py-[4px] relative rounded-[4px] shrink-0 bg-white shadow-sm transition-all">
                                                <p class="font-['Roboto'] font-semibold leading-[1.42] relative shrink-0 text-[14px] text-[#313949] text-center" style="font-variation-settings: 'wdth' 100">Status</p>
                                            </button>
                                            <button onclick="app.setOperationTab('generation')" id="tab-generation" class="content-stretch flex h-[32px] items-center justify-center min-w-[80px] px-[16px] py-[4px] relative rounded-[4px] shrink-0 hover:bg-white/50 transition-all">
                                                <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#313949] text-center" style="font-variation-settings: 'wdth' 100">Generation</p>
                                            </button>
                                            <button onclick="app.setOperationTab('consumption')" id="tab-consumption" class="content-stretch flex h-[32px] items-center justify-center min-w-[80px] px-[16px] py-[4px] relative rounded-[4px] shrink-0 hover:bg-white/50 transition-all">
                                                <p class="font-['Roboto'] font-normal leading-[1.42] relative shrink-0 text-[14px] text-[#313949] text-center" style="font-variation-settings: 'wdth' 100">Consumption</p>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <!-- Chart Container -->
                                    <div class="relative shrink-0 w-full h-[360px]">
                                         <div id="operation-chart" class="w-full h-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>`;

        lucide.createIcons();

        // Initialize Chart
        setTimeout(() => {
            this.initOperationChart();

        }, 100);
    },

    renderVPP(container) {
        container.innerHTML = ''; 

        if (state.vpps.length === 0) {
            // Outer Main Container (Page Background & Padding)
            container.className = "w-full h-full bg-[#f8f9fb] p-[8px]";
            
            container.innerHTML = `
                <div class="bg-white w-full h-full rounded-[6px] p-[20px] flex flex-col">
                    <div class="bg-[#f3f3f6] flex flex-1 flex-col gap-[10px] items-center justify-center rounded-[6px] w-full px-[16px] py-[16px]">
                        <div class="relative w-[88px] h-[88px]">
                            <img src="assets/icons/empty-state.svg" alt="Empty State" class="w-full h-full block">
                        </div>
                        <p class="font-['Roboto'] font-semibold text-[16px] leading-[20px] text-[#313949] text-center">
                            No VPPs Created
                        </p>
                        <button onclick="app.openVPPDrawer()" class="bg-[#3ec064] hover:bg-[#35a656] flex items-center justify-center gap-[6px] h-[40px] px-[24px] py-[4px] rounded-[6px] text-white transition-colors min-w-[100px]">
                            <div class="w-[20px] h-[20px] flex items-center justify-center">
                                 <i data-lucide="plus" class="w-[14px] h-[14px]"></i>
                            </div>
                            <span class="font-['Roboto'] font-semibold text-[14px] leading-[1.42]">Create</span>
                        </button>
                    </div>
                </div>
            `;
            lucide.createIcons();
            return;
        }

        // Layout: Left (VPP List) | Right (Device Discovery)
        container.className = "w-full h-full bg-[#f8f9fb] p-[8px]";
        
        // Ensure selectedVppId is valid
        if (!state.vpps.find(v => v.id === state.selectedVppId)) {
            state.selectedVppId = state.vpps[0].id;
        }

        // Ensure vppViewMode is set
        if (!state.vppViewMode) state.vppViewMode = 'card';
        const isCardView = state.vppViewMode === 'card';

        // Filter VPPs
        const filteredVPPs = state.vpps.filter(vpp => {
            const nameMatch = !state.vppList.vppName || vpp.name.toLowerCase().includes(state.vppList.vppName.toLowerCase());
            const stateMatch = !state.vppList.state || vpp.state === state.vppList.state;
            return nameMatch && stateMatch;
        });

        // Pagination
        const itemsPerPage = state.vppList.itemsPerPage || 10;
        const totalItems = filteredVPPs.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const currentPage = state.vppList.currentPage || 1;
        const startIdx = (currentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const paginatedVPPs = isCardView ? filteredVPPs : filteredVPPs.slice(startIdx, endIdx);

        // Calculate pages
        let pages = [];
        if (totalPages <= 7) {
            pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        } else {
            if (currentPage <= 4) {
                pages = [1, 2, 3, 4, 5, '...', totalPages];
            } else if (currentPage >= totalPages - 3) {
                pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            } else {
                pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
            }
        }

        container.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col p-6">
            <!-- Toolbar -->
            <div class="flex flex-col md:flex-row justify-start items-center gap-[8px] mb-[8px] flex-shrink-0">
                <!-- Left: Title & Add -->
                <div class="flex items-center gap-2">
                    <h2 class="text-xl font-bold text-gray-900">VPPs</h2>
                    <button onclick="app.openVPPDrawer()" class="p-1 text-green-500 hover:text-green-600 transition-colors hover:bg-green-50 rounded-full">
                        <i data-lucide="plus" class="w-6 h-6"></i>
                    </button>
                </div>

                <!-- Center: Search & Filter Group -->
                <div class="flex items-center">
                    <div class="bg-[#f3f3f6] flex gap-[16px] items-center pl-[8px] pr-0 py-0 relative rounded-[4px] shrink-0 w-[320px] h-[32px]">
                         <!-- Search Input -->
                         <input type="text" id="vpp-name-filter" 
                            value="${state.vppList.vppName}"
                            class="flex-1 bg-transparent border-none focus:ring-0 p-0 text-[14px] font-normal text-[#1c2026] placeholder-[#b5bcc8] leading-normal" 
                            placeholder="Search by VPP Name..."
                            onkeydown="if(event.key === 'Enter') app.filterVPPs()">
                         
                         <div class="flex gap-0 items-center px-[4px] relative shrink-0">
                             <!-- State Select -->
                             <div class="flex gap-[4px] items-center relative shrink-0 group cursor-pointer">
                                 <select id="vpp-state-filter" class="bg-transparent border-none focus:ring-0 text-[14px] font-normal text-[#313949] cursor-pointer pr-5 py-0 appearance-none leading-normal" onchange="app.filterVPPs()">
                                     <option value="">all</option>
                                     ${MOCK_DATA.overview.regions.map(r => `<option value="${r.name}" ${state.vppList.state === r.name ? 'selected' : ''}>${r.name}</option>`).join('')}
                                 </select>
                                 <div class="absolute right-0 top-1/2 -translate-y-1/2 w-[16px] h-[16px] flex items-center justify-center pointer-events-none">
                                    <i data-lucide="chevron-down" class="w-[12px] h-[12px] text-[#313949]"></i>
                                 </div>
                             </div>
                             
                             <!-- Search Icon -->
                             <button onclick="app.filterVPPs()" class="relative rounded-[2px] shrink-0 w-[32px] h-[32px] flex items-center justify-center hover:bg-gray-200 transition-colors">
                                 <i data-lucide="search" class="w-[18px] h-[18px] text-[#313949]"></i>
                             </button>
                         </div>
                    </div>
                </div>

                <!-- Right: View Switcher -->
                <div class="flex bg-[#f3f3f6] p-[4px] rounded-[4px] items-center ml-auto">
                    <button onclick="app.toggleVPPViewMode('list')" class="flex gap-[4px] h-[32px] items-center justify-center min-w-[80px] px-[12px] py-[4px] rounded-[4px] transition-all ${!isCardView ? 'bg-white shadow-sm' : ''}">
                        <div class="flex gap-[2px] items-center justify-center shrink-0 w-[24px] h-[24px]">
                            <div class="h-[20px] shrink-0 w-[4px] ${!isCardView ? 'bg-[#313949]' : 'bg-[#b5bcc8]'}"></div>
                            <div class="h-[20px] shrink-0 w-[4px] ${!isCardView ? 'bg-[#313949]' : 'bg-[#b5bcc8]'}"></div>
                            <div class="h-[20px] shrink-0 w-[4px] ${!isCardView ? 'bg-[#313949]' : 'bg-[#b5bcc8]'}"></div>
                        </div>
                        <span class="text-[14px] leading-normal ${!isCardView ? 'font-semibold text-[#313949]' : 'font-normal text-[#b5bcc8]'}">Form</span>
                    </button>
                    <button onclick="app.toggleVPPViewMode('card')" class="flex gap-[4px] h-[32px] items-center justify-center min-w-[80px] px-[12px] py-[4px] rounded-[4px] transition-all ${isCardView ? 'bg-white shadow-sm' : ''}">
                        <div class="flex gap-[2px] items-center justify-center shrink-0 w-[24px] h-[24px]">
                            <div class="h-[20px] shrink-0 w-[4px] ${isCardView ? 'bg-[#313949]' : 'bg-[#b5bcc8]'}"></div>
                            <div class="h-[20px] shrink-0 w-[14px] ${isCardView ? 'bg-[#313949]' : 'bg-[#b5bcc8]'}"></div>
                        </div>
                        <span class="text-[14px] leading-normal ${isCardView ? 'font-semibold text-[#313949]' : 'font-normal text-[#b5bcc8]'}">Cards</span>
                    </button>
                </div>
            </div>

                
                ${filteredVPPs.length === 0 ? `
                <div class="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-gray-200 border-dashed p-12 m-4">
                     <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm border border-gray-100">
                        <i data-lucide="search" class="w-6 h-6 text-gray-400"></i>
                     </div>
                     <h3 class="text-base font-medium text-gray-900 mb-1">No VPPs found</h3>
                     <p class="text-sm text-gray-500 mb-4 text-center">
                        No VPPs match your current filters.
                     </p>
                     <button onclick="app.resetVPPFilters()" class="px-3 py-1.5 bg-white border border-gray-300 shadow-sm rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        Clear Filters
                     </button>
                </div>
                ` : isCardView ? `
                <div class="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 content-start bg-gray-50 rounded-xl p-4 border border-gray-100">
                    ${paginatedVPPs.map((vpp) => {
                        const isSelected = vpp.id === state.selectedVppId;
                        const vppDevices = [
                            ...(MOCK_DATA.assignedDevices || []),
                            ...(state.devices || [])
                        ].filter(d => d.vppId == vpp.id);
                        
                        const invs = vppDevices.filter(d => d.type === 'Inverter');
                        const bats = vppDevices.filter(d => d.type === 'Battery');
                        
                        const stats = {
                            inv: {
                                total: invs.length,
                                online: invs.filter(d => d.status === 'online').length,
                                offline: invs.filter(d => d.status === 'offline').length,
                                disconnected: invs.filter(d => d.status === 'disconnected').length,
                                cap: invs.reduce((sum, d) => sum + (d.capacity || 0), 0),
                                pvCapacity: invs.reduce((sum, d) => sum + ((d.capacity || 0) * 1.2), 0).toFixed(1),
                                onlineCap: invs.filter(d => d.status === 'online').reduce((sum, d) => sum + (d.capacity || 0), 0),
                                offlineCap: invs.filter(d => d.status === 'offline').reduce((sum, d) => sum + (d.capacity || 0), 0)
                            },
                            bat: {
                                total: bats.length,
                                online: bats.filter(d => d.status === 'online').length,
                                offline: bats.filter(d => d.status === 'offline').length,
                                disconnected: bats.filter(d => d.status === 'disconnected').length,
                                cap: bats.reduce((sum, d) => sum + (d.capacity || 0), 0),
                                onlineCap: bats.filter(d => d.status === 'online').reduce((sum, d) => sum + (d.capacity || 0), 0),
                                offlineCap: bats.filter(d => d.status === 'offline').reduce((sum, d) => sum + (d.capacity || 0), 0),
                                currentEnergy: bats.reduce((sum, d) => sum + ((d.capacity || 0) * (d.soc !== undefined ? d.soc : (40 + Math.floor(Math.random() * 40))) / 100), 0)
                            }
                        };
                        
                        // Calculate Battery SOC percentage based on energy
                        stats.bat.socPercentage = stats.bat.cap > 0 ? Math.round((stats.bat.currentEnergy / stats.bat.cap) * 100) : 0;

                        // VPP Card Template
                        return `
                        <div onclick="app.navigate('vpp_details', { id: ${vpp.id} })" class="group bg-white rounded-[4px] cursor-pointer shadow-[0px_4px_12px_0px_rgba(0,0,0,0.2)] hover:shadow-[0px_6px_16px_0px_rgba(0,0,0,0.25)] transition-all duration-300 relative h-full flex flex-col p-[16px] gap-[16px]">
                            <!-- Header Section -->
                            <div class="flex justify-between items-center w-full h-[32px]">
                                <div class="flex items-center gap-[8px]">
                                    <div class="w-[8px] h-[8px] rounded-full bg-[#313949]"></div> <!-- BlueGrey Dot -->
                                    <h3 class="font-['Roboto'] font-semibold text-[20px] leading-[1.4] text-[#313949] line-clamp-1">${vpp.name}</h3>
                                    <div class="bg-[#f3f3f6] px-[8px] py-[4px] rounded-[12px] flex items-center justify-center min-w-[48px]">
                                        <span class="font-['Roboto'] font-normal text-[12px] leading-[1.33] text-[#5f646e] text-center">${vpp.state || 'NSW'}</span>
                                    </div>
                                </div>
                                <div class="flex items-center gap-[8px] opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onclick="event.stopPropagation(); app.openVPPDrawer(${vpp.id})" class="w-[32px] h-[32px] bg-[#f3f3f6] rounded-[16px] flex items-center justify-center hover:bg-[#e0e0e0] transition-colors">
                                        <i data-lucide="edit-2" class="w-[14px] h-[14px] text-[#5f646e]"></i>
                                    </button>
                                    <button onclick="event.stopPropagation(); app.confirmDeleteVPP(${vpp.id})" class="w-[32px] h-[32px] bg-[rgba(255,52,52,0.1)] rounded-[16px] flex items-center justify-center hover:bg-[rgba(255,52,52,0.2)] transition-colors">
                                        <i data-lucide="trash-2" class="w-[14px] h-[14px] text-[#ff3434]"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Content Grid -->
                            <div class="flex gap-[40px] h-full w-full items-center">
                                <!-- Left: DERs Stats -->
                                <div class="flex flex-col w-[160px] shrink-0 gap-[8px]">
                                    <!-- Header -->
                                    <div class="flex items-center gap-[8px] py-[12px]">
                                        <!-- Icon -->
                                        <div class="w-[32px] h-[32px] flex items-center justify-center shrink-0">
                                            <i data-lucide="zap" class="w-[24px] h-[24px] text-[#313949] fill-[#313949]"></i>
                                        </div>
                                        
                                        <div class="flex items-end gap-[4px] text-[#313949]">
                                            <span class="font-['Roboto'] font-extrabold text-[24px] leading-[1.33]">${vppDevices.length}</span>
                                            <span class="font-['Roboto'] font-semibold italic text-[16px] leading-[1.42] mb-[2px]">DERs</span>
                                        </div>
                                    </div>
                                    
                                    <!-- Separator -->
                                    <div class="w-[56px] h-px bg-[#e0e0e0]"></div>
                                    
                                    <!-- Status List -->
                                    <div class="flex flex-col gap-[4px] w-full">
                                        <!-- Online -->
                                        <div class="flex items-center justify-between h-[32px] py-[4px] pr-[8px]">
                                            <div class="flex items-center gap-[8px]">
                                                <div class="w-[4px] h-[12px] bg-[#8cda2f] rounded-[2px]"></div>
                                                <span class="font-['Roboto'] font-normal text-[14px] text-[#5f646e]">Online</span>
                                            </div>
                                            <span class="font-['Roboto'] font-medium text-[14px] text-[#8cda2f]">${stats.inv.online + stats.bat.online}</span>
                                        </div>
                                        
                                        <!-- Offline -->
                                        <div class="flex items-center justify-between h-[32px] py-[4px] pr-[8px]">
                                            <div class="flex items-center gap-[8px]">
                                                <div class="w-[4px] h-[12px] bg-[#b5bcc8] rounded-[2px]"></div>
                                                <span class="font-['Roboto'] font-normal text-[14px] text-[#5f646e]">Offline</span>
                                            </div>
                                            <span class="font-['Roboto'] font-medium text-[14px] text-[#b5bcc8]">${stats.inv.offline + stats.bat.offline}</span>
                                        </div>
                                        
                                        <!-- Disconnected -->
                                        <div class="flex items-center justify-between h-[32px] py-[4px] pr-[8px]">
                                            <div class="flex items-center gap-[8px]">
                                                <div class="w-[4px] h-[12px] bg-[#ff3434] rounded-[2px]"></div>
                                                <span class="font-['Roboto'] font-normal text-[14px] text-[#5f646e]">Disconnected</span>
                                            </div>
                                            <span class="font-['Roboto'] font-medium text-[14px] text-[#ff3434]">${stats.inv.disconnected + stats.bat.disconnected}</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Right: Energy Details -->
                                <div class="bg-[#f8f9fb] flex flex-1 flex-col justify-center px-[24px] py-[12px] rounded-[8px] gap-[8px]">
                                    <div class="flex justify-between items-center h-[32px]">
                                        <span class="font-['Roboto'] font-normal text-[14px] text-[#5f646e]">Rated Power</span>
                                        <div class="flex items-center gap-[8px]">
                                            <span class="font-['Roboto'] font-medium text-[14px] text-[#313949]">${stats.inv.cap}</span>
                                            <span class="font-['Roboto'] font-normal text-[14px] text-[#b5bcc8]">kW</span>
                                        </div>
                                    </div>
                                    <div class="flex justify-between items-center h-[32px]">
                                        <span class="font-['Roboto'] font-normal text-[14px] text-[#5f646e]">PV Capacity</span>
                                        <div class="flex items-center gap-[8px]">
                                            <span class="font-['Roboto'] font-medium text-[14px] text-[#313949]">${stats.inv.pvCapacity}</span>
                                            <span class="font-['Roboto'] font-normal text-[14px] text-[#b5bcc8]">kW</span>
                                        </div>
                                    </div>
                                    <div class="flex justify-between items-center h-[32px]">
                                        <span class="font-['Roboto'] font-normal text-[14px] text-[#5f646e]">Rated Capacity</span>
                                        <div class="flex items-center gap-[8px]">
                                            <span class="font-['Roboto'] font-medium text-[14px] text-[#313949]">${stats.bat.cap.toFixed(1)}</span>
                                            <span class="font-['Roboto'] font-normal text-[14px] text-[#b5bcc8]">kWh</span>
                                        </div>
                                    </div>
                                    <div class="flex justify-between items-center h-[32px]">
                                        <span class="font-['Roboto'] font-normal text-[14px] text-[#5f646e]">Today Yield</span>
                                        <div class="flex items-center gap-[8px]">
                                            <span class="font-['Roboto'] font-medium text-[14px] text-[#313949]">${(stats.inv.cap * (2 + Math.random() * 2)).toFixed(1)}</span>
                                            <span class="font-['Roboto'] font-normal text-[14px] text-[#b5bcc8]">kWh</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `}).join('')}
                </div>
                ` : `
                <div class="flex-1 overflow-hidden flex flex-col bg-white rounded-[4px]">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead class="sticky top-0 z-10 bg-white">
                                <tr>
                                    <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee] min-w-[120px]">VPP Name</th>
                                    <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee] min-w-[120px]">Pricing Region</th>
                                    <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee] min-w-[120px]">Active Market</th>
                                    <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee]">DERs</th>
                                    <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee]">Rated Power</th>
                                    <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee]">PV Capacity</th>
                                    <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee]">Rated Capacity</th>
                                    <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee]">Today Yield</th>
                                    <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee] min-w-[140px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="">
                                ${paginatedVPPs.map((vpp, index) => {
                                    const vppDevices = MOCK_DATA.assignedDevices.filter(d => d.vppId === vpp.id);
                                    
                                    const invs = vppDevices.filter(d => d.type === 'Inverter');
                                    const bats = vppDevices.filter(d => d.type === 'Battery');
                                    
                                    const stats = {
                                        inv: {
                                            total: invs.length,
                                            online: invs.filter(d => d.status === 'online').length,
                                            offline: invs.filter(d => d.status === 'offline').length,
                                            disconnected: invs.filter(d => d.status === 'disconnected').length,
                                            cap: invs.reduce((sum, d) => sum + (d.capacity || 0), 0),
                                            pvCapacity: invs.reduce((sum, d) => sum + ((d.capacity || 0) * 1.2), 0).toFixed(1),
                                        },
                                        bat: {
                                            total: bats.length,
                                            online: bats.filter(d => d.status === 'online').length,
                                            offline: bats.filter(d => d.status === 'offline').length,
                                            disconnected: bats.filter(d => d.status === 'disconnected').length,
                                            cap: bats.reduce((sum, d) => sum + (d.capacity || 0), 0),
                                            currentEnergy: bats.reduce((sum, d) => sum + ((d.capacity || 0) * (d.soc !== undefined ? d.soc : (40 + Math.floor(Math.random() * 40))) / 100), 0)
                                        }
                                    };
                                    
                                    stats.bat.socPercentage = stats.bat.cap > 0 ? Math.round((stats.bat.currentEnergy / stats.bat.cap) * 100) : 0;
                                    
                                    return `
                                        <tr class="h-[48px] hover:bg-[#f3f3f6] transition-colors group border-b border-[#e6e8ee]">
                                            <td class="px-[8px]">
                                                <div class="text-[14px] font-semibold text-[#1c2026] font-['Roboto']">${vpp.name}</div>
                                            </td>
                                            <td class="px-[8px]">
                                                <div class="text-[14px] font-normal text-[#1c2026] font-['Roboto']">${vpp.state || 'NSW'}</div>
                                            </td>
                                            <td class="px-[8px]">
                                                <div class="text-[14px] font-normal text-[#1c2026] font-['Roboto']">${vpp.activeMarket || 'All'}</div>
                                            </td>
                                            <td class="px-[8px]">
                                                <div class="flex flex-col gap-0.5">
                                                    <span class="text-[14px] font-normal text-[#1c2026] font-['Roboto']">${vppDevices.length}</span>
                                                    <div class="flex gap-1 text-[10px]">
                                                        <span class="text-green-500 font-bold">${stats.inv.online + stats.bat.online}</span>
                                                        <span class="text-gray-300">/</span>
                                                        <span class="text-gray-400 font-bold">${stats.inv.offline + stats.bat.offline}</span>
                                                        <span class="text-gray-300">/</span>
                                                        <span class="text-red-500 font-bold">${stats.inv.disconnected + stats.bat.disconnected}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-[8px] text-[14px] font-normal text-[#1c2026] font-['Roboto']">${stats.inv.cap} kW</td>
                                            <td class="px-[8px] text-[14px] font-normal text-[#1c2026] font-['Roboto']">${stats.inv.pvCapacity} kW</td>
                                            <td class="px-[8px] text-[14px] font-normal text-[#1c2026] font-['Roboto']">${stats.bat.cap.toFixed(1)} kWh</td>
                                            <td class="px-[8px] text-[14px] font-normal text-[#1c2026] font-['Roboto']">${(stats.inv.cap * (2 + Math.random() * 2)).toFixed(1)} kWh</td>
                                            <td class="px-[8px]">
                                                <div class="flex items-center justify-start gap-[12px]">
                                                    <button onclick="event.stopPropagation(); app.navigate('vpp_details', { id: ${vpp.id} })" class="text-[#1c2026] hover:text-[#5f646e] transition-colors">
                                                        <i data-lucide="eye" class="w-[16px] h-[16px]"></i>
                                                    </button>
                                                    <button onclick="event.stopPropagation(); app.openVPPDrawer(${vpp.id})" class="text-[#1c2026] hover:text-[#5f646e] transition-colors">
                                                        <i data-lucide="edit-2" class="w-[16px] h-[16px]"></i>
                                                    </button>
                                                    <button onclick="event.stopPropagation(); app.confirmDeleteVPP(${vpp.id})" class="text-[#1c2026] hover:text-[#5f646e] transition-colors">
                                                        <i data-lucide="trash-2" class="w-[16px] h-[16px]"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                `}
                
                ${!isCardView ? `
                <div class="flex items-center justify-end px-[16px] py-[12px] mt-auto bg-white rounded-b-[4px]">
                    <div class="flex items-center gap-[4px]">
                        <!-- Page Size Selector -->
                        <div class="flex items-center gap-[8px] mr-2">
                             <div class="relative group">
                                <select class="appearance-none bg-white border border-[var(--color-neutral-line)] text-[var(--color-neutral-bluegrey)] text-[14px] rounded-[4px] px-[12px] py-[4px] pr-[32px] focus:outline-none focus:border-[var(--color-brand-primary)] cursor-pointer font-['Roboto']" onchange="app.updateVPPListState('itemsPerPage', parseInt(this.value))">
                                    <option value="10" ${itemsPerPage === 10 ? 'selected' : ''}>10/page</option>
                                    <option value="20" ${itemsPerPage === 20 ? 'selected' : ''}>20/page</option>
                                    <option value="50" ${itemsPerPage === 50 ? 'selected' : ''}>50/page</option>
                                </select>
                                <div class="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none">
                                    <i data-lucide="chevron-down" class="w-[16px] h-[16px] text-[var(--color-neutral-lightgrey)]"></i>
                                </div>
                             </div>
                        </div>

                        <!-- First Page -->
                        <button onclick="app.updateVPPListState('currentPage', 1)" ${currentPage === 1 ? 'disabled' : ''} class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-[var(--color-neutral-thingrey)] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            <i data-lucide="chevrons-left" class="w-[16px] h-[16px]"></i>
                        </button>
                        <!-- Prev Page -->
                        <button onclick="app.updateVPPListState('currentPage', ${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-[var(--color-neutral-thingrey)] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            <i data-lucide="chevron-left" class="w-[16px] h-[16px]"></i>
                        </button>
                        
                        <!-- Page Numbers -->
                        ${pages.map(page => {
                            if (page === '...') {
                                return `<span class="w-[32px] h-[32px] flex items-center justify-center text-[#5f646e] font-['Roboto']">...</span>`;
                            }
                            return `
                                <button onclick="app.updateVPPListState('currentPage', ${page})" class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] text-[14px] font-medium transition-colors font-['Roboto'] ${page === currentPage ? 'bg-[var(--color-neutral-thingrey)] text-[var(--color-neutral-bluegrey)]' : 'text-[#5f646e] hover:bg-[var(--color-neutral-thingrey)]'}">
                                    ${page}
                                </button>
                            `;
                        }).join('')}

                        <!-- Next Page -->
                        <button onclick="app.updateVPPListState('currentPage', ${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''} class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-[var(--color-neutral-thingrey)] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            <i data-lucide="chevron-right" class="w-[16px] h-[16px]"></i>
                        </button>
                        <!-- Last Page -->
                        <button onclick="app.updateVPPListState('currentPage', ${totalPages})" ${currentPage === totalPages ? 'disabled' : ''} class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-[var(--color-neutral-thingrey)] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            <i data-lucide="chevrons-right" class="w-[16px] h-[16px]"></i>
                        </button>
                    </div>
                </div>
                ` : ''}
            </div>
        `;
        lucide.createIcons();
    },

    renderVPPDetails(container, vppId) {
        container.innerHTML = '';
        container.className = "w-full h-full flex flex-col gap-[8px] bg-[#f8f9fb] p-[8px]";
        const vpp = state.vpps.find(v => v.id == vppId);
        if (!vpp) return this.navigate('vpp');
        
        state.selectedVppId = vppId; // Ensure selectedVppId is updated

        // Initialize assignedDevices from MOCK_DATA if not set
        if (!state.assignedDevices || state.assignedDevices.length === 0) {
             state.assignedDevices = [...MOCK_DATA.assignedDevices];
        }

        const allVppDevices = [
            ...(state.assignedDevices || []),
            ...(state.devices || [])
        ].filter(d => d.vppId == vpp.id);
        const totalDevices = allVppDevices.length;
        const onlineDevices = allVppDevices.filter(d => d.status === 'online').length;
        const offlineDevices = allVppDevices.filter(d => d.status === 'offline').length;
        const disconnectedDevices = allVppDevices.filter(d => d.status === 'disconnected').length;

        const invs = allVppDevices.filter(d => d.type === 'Inverter');
        const bats = allVppDevices.filter(d => d.type === 'Battery');
        
        const ratedPower = invs.reduce((sum, d) => sum + (d.capacity || 0), 0);
        const pvCapacity = invs.reduce((sum, d) => sum + ((d.capacity || 0) * 1.2), 0);
        
        const batCap = bats.reduce((sum, d) => sum + (d.capacity || 0), 0);
        const currentEnergy = bats.reduce((sum, d) => sum + ((d.capacity || 0) * (d.soc !== undefined ? d.soc : (40 + Math.floor(Math.random() * 40))) / 100), 0);
        const socPercentage = batCap > 0 ? Math.round((currentEnergy / batCap) * 100) : 0;
        
        const todayYield = ratedPower * (2 + Math.random() * 2);

        const filteredDevices = allVppDevices
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

        const { currentPage, itemsPerPage } = state.derListPagination;
        const totalPages = Math.ceil(filteredDevices.length / itemsPerPage);
        const startIdx = (currentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const assignedDevices = filteredDevices.slice(startIdx, endIdx);

        // Content
        const content = document.createElement('div');
        content.className = 'flex-1 flex flex-col gap-[24px] slide-up min-h-0';
        
        content.innerHTML = `
            <!-- Unified Panel -->
            <div class="flex-1 flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h-0">
                <!-- Merged Header, Summary, and Tabs -->
                <div class="flex flex-col w-full">
                    <!-- Header -->
                    <div class="flex gap-[16px] items-center px-[24px] py-[16px] w-full">
                        <div class="flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
                            <button onclick="app.navigate('vpp')" class="flex gap-[4px] items-center justify-center p-[8px] relative rounded-[4px] shrink-0 hover:bg-gray-100 transition-colors">
                                <div class="relative shrink-0 size-[24px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#5f646e]"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                                </div>
                            </button>
                            <div class="flex gap-[16px] items-center relative shrink-0">
                                <p class="font-semibold leading-[1.4] relative shrink-0 text-[20px] text-[#313949] text-center">
                                    ${vpp.name}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Summary Section -->
                    <div class="flex flex-col lg:flex-row gap-[40px] items-center px-[24px] py-[24px] w-full">
                        <!-- Left Group: Company Info & DERs Status -->
                        <div class="flex flex-col gap-[24px] items-start justify-center relative shrink-0 w-full lg:w-auto">
                            <!-- Company Info -->
                            <div class="flex gap-[15px] items-center relative shrink-0 w-full">
                                <div class="flex items-center justify-center relative rounded-[16px] shrink-0 size-[80px] bg-gray-100 overflow-hidden">
                                     <i data-lucide="building-2" class="w-8 h-8 text-gray-400"></i>
                                </div>
                                <div class="flex flex-col gap-[8px] items-start py-[4px]">
                                     <p class="font-semibold leading-[1.4] text-[20px] text-[#313949]">
                                        ${vpp.company || 'Unknown Company'}
                                     </p>
                                     <div class="flex gap-[8px] items-center">
                                         <div class="bg-[#f3f3f6] flex gap-[4px] items-center justify-center px-[8px] py-[4px] rounded-[12px] text-[12px] text-[#5f646e]">
                                            <p>${vpp.state || '-'}</p>
                                            <p>•</p>
                                            <p>${vpp.country || '-'}</p>
                                         </div>
                                         <div class="bg-[#f3f3f6] flex gap-[4px] items-center justify-center px-[8px] py-[4px] rounded-[12px] text-[12px] text-[#5f646e]">
                                            <p>Active Market:</p>
                                            <p>${vpp.activeMarket || 'All'}</p>
                                         </div>
                                     </div>
                                </div>
                            </div>
                            
                            <!-- DERs & Status -->
                            <div class="flex flex-wrap gap-[40px] items-start px-[16px] py-[4px]">
                                <!-- Total DERs -->
                                <div class="flex gap-[16px] items-center">
                                    <div class="relative size-[32px]">
                                        <img src="assets/icons/system.svg" class="w-full h-full" onerror="this.style.display='none'">
                                    </div>
                                    <div class="flex gap-[4px] items-end text-[#313949]">
                                        <p class="font-extrabold leading-[1.33] text-[24px]">${totalDevices}</p>
                                        <p class="font-semibold italic leading-[1.42] text-[16px] mb-[3px]">DERs</p>
                                    </div>
                                </div>
                                
                                <!-- Status Breakdown -->
                                <div class="flex gap-[24px] items-start">
                                     <!-- Online -->
                                     <div class="flex gap-[24px] h-[32px] items-center">
                                         <div class="flex gap-[8px] items-center">
                                             <div class="bg-[#8cda2f] h-[12px] rounded-[2px] w-[4px]"></div>
                                             <p class="text-[14px] text-[#5f646e]">Online</p>
                                         </div>
                                         <p class="font-medium text-[14px] text-[#8cda2f] text-right">${onlineDevices}</p>
                                     </div>
                                     <!-- Offline -->
                                     <div class="flex gap-[24px] h-[32px] items-center">
                                         <div class="flex gap-[8px] items-center">
                                             <div class="bg-[#b5bcc8] h-[12px] rounded-[2px] w-[4px]"></div>
                                             <p class="text-[14px] text-[#5f646e]">Offline</p>
                                         </div>
                                         <p class="font-medium text-[14px] text-[#b5bcc8] text-right">${offlineDevices}</p>
                                     </div>
                                     <!-- Disconnected -->
                                     <div class="flex gap-[24px] h-[32px] items-center">
                                         <div class="flex gap-[8px] items-center">
                                             <div class="bg-[#ff3434] h-[12px] rounded-[2px] w-[4px]"></div>
                                             <p class="text-[14px] text-[#5f646e]">Disconnected</p>
                                         </div>
                                         <p class="font-medium text-[14px] text-[#ff3434] text-right">${disconnectedDevices}</p>
                                     </div>
                                </div>
                            </div>
                        </div>

                        <!-- Right Group: Metrics (Gray Box) -->
                        <div class="flex-1 bg-[#f3f3f6] flex flex-col gap-[0px] px-[16px] py-[8px] rounded-[8px] min-w-[300px] h-full justify-center">
                            <!-- Row 1 -->
                            <div class="flex gap-[40px] items-center w-full flex-1">
                                <!-- Rated Power -->
                                <div class="flex-1 flex justify-between items-center min-w-[160px] h-full px-[16px]">
                                     <div class="flex gap-[4px] items-center">
                                         <div class="size-[24px] flex items-center justify-center">
                                            <i data-lucide="zap" class="w-5 h-5 text-[#5f646e]"></i>
                                         </div>
                                         <p class="text-[14px] text-[#5f646e]">Rated Power</p>
                                     </div>
                                     <div class="flex gap-[8px] items-center">
                                         <p class="font-semibold text-[18px] text-[#313949]">${ratedPower.toFixed(1)}</p>
                                         <p class="text-[14px] text-[#b5bcc8]">kW</p>
                                     </div>
                                </div>
                                <!-- PV Capacity -->
                                <div class="flex-1 flex justify-between items-center min-w-[160px] h-full px-[16px]">
                                     <div class="flex gap-[4px] items-center">
                                         <div class="size-[24px] flex items-center justify-center">
                                            <i data-lucide="sun" class="w-5 h-5 text-[#5f646e]"></i>
                                         </div>
                                         <p class="text-[14px] text-[#5f646e]">PV Capacity</p>
                                     </div>
                                     <div class="flex gap-[8px] items-center">
                                         <p class="font-semibold text-[18px] text-[#313949]">${pvCapacity.toFixed(1)}</p>
                                         <p class="text-[14px] text-[#b5bcc8]">kW</p>
                                     </div>
                                </div>
                            </div>
                            
                            <!-- Row 2 -->
                            <div class="flex gap-[40px] items-center w-full flex-1">
                                <!-- SOC -->
                                <div class="flex-1 flex justify-between items-center min-w-[160px] h-full px-[16px]">
                                     <div class="flex gap-[4px] items-center">
                                         <div class="size-[24px] flex items-center justify-center">
                                            <i data-lucide="battery" class="w-5 h-5 text-[#5f646e]"></i>
                                         </div>
                                         <p class="text-[14px] text-[#5f646e]">Rated Capacity</p>
                                     </div>
                                     <div class="flex gap-[8px] items-center">
                                         <p class="font-semibold text-[18px] text-[#313949]">${batCap.toFixed(1)}</p>
                                         <p class="text-[14px] text-[#b5bcc8]">kWh</p>
                                     </div>
                                </div>
                                 <!-- Today Yield -->
                                <div class="flex-1 flex justify-between items-center min-w-[160px] h-full px-[16px]">
                                     <div class="flex gap-[4px] items-center">
                                         <div class="size-[24px] flex items-center justify-center">
                                            <i data-lucide="bar-chart-3" class="w-5 h-5 text-[#5f646e]"></i>
                                         </div>
                                         <p class="text-[14px] text-[#5f646e]">Today Yield</p>
                                     </div>
                                     <div class="flex gap-[8px] items-center">
                                         <p class="font-semibold text-[18px] text-[#313949]">${todayYield.toFixed(1)}</p>
                                         <p class="text-[14px] text-[#b5bcc8]">kWh</p>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Header (Figma 168-2975) -->
                    <div class="flex justify-start gap-2 items-center px-[24px] py-[16px] bg-white">
                         <!-- Tab Group -->
                         <div class="bg-[#f3f3f6] p-[4px] rounded-[4px] flex items-center">
                            <button onclick="app.setVPPDetailsTab('der-list')" class="min-w-[80px] h-[32px] flex items-center justify-center rounded-[4px] px-[16px] text-[14px] transition-all ${state.vppDetailsTab === 'der-list' ? 'bg-white font-semibold text-[#313949] shadow-sm' : 'font-normal text-[#313949] hover:bg-gray-100'}">
                                DERs
                            </button>
                            <button onclick="app.setVPPDetailsTab('event-list')" class="min-w-[80px] h-[32px] flex items-center justify-center rounded-[4px] px-[16px] text-[14px] transition-all ${state.vppDetailsTab === 'event-list' ? 'bg-white font-semibold text-[#313949] shadow-sm' : 'font-normal text-[#313949] hover:bg-gray-100'}">
                                Events
                            </button>
                         </div>

                        <div class="ml-auto flex items-center gap-2">
                            ${(state.vppDetailsTab === 'der-list') ? `
                            <button onclick="app.toggleAddDeviceDrawer(true)" class="bg-[#0052ff] text-white px-[16px] py-[6px] rounded-[4px] hover:bg-[#0043cc] transition-colors text-[14px] font-medium flex items-center gap-[4px]">
                               <i data-lucide="plus" class="w-[16px] h-[16px]"></i>
                               Add
                            </button>
                            ` : ''}

                            ${(state.vppDetailsTab === 'der-list') ? `
                            <div class="bg-[#f3f3f6] rounded-[4px] flex items-center w-[240px] h-[32px] px-[8px] gap-[8px]">
                                <input 
                                    type="text" 
                                    id="assigned-search-input"
                                    placeholder="Search" 
                                    value="${state.assignedSearchQuery || ''}"
                                    oninput="app.setAssignedSearch(this.value)"
                                    class="bg-transparent border-none focus:outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] w-full h-full p-0"
                                >
                                <div class="flex items-center justify-center size-[24px] shrink-0">
                                    <i data-lucide="search" class="w-[18px] h-[18px] text-[#b5bcc8]"></i>
                                </div>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                </div>

                <!-- Content -->
                <div class="flex-1 px-[24px] overflow-y-auto min-h-0">
                    ${(state.vppDetailsTab === 'der-list') ? `
                    <table class="w-full text-left border-collapse font-['Roboto']">
                        <thead class="sticky top-0 bg-white z-10">
                            <tr class="h-[48px] text-[12px] text-[#b5bcc8] font-normal border-b border-[#e6e8ee]">
                                <th class="px-[8px] font-normal">Status</th>
                                <th class="px-[8px] font-normal">SN</th>
                                <th class="px-[8px] font-normal">Type</th>
                                <th class="px-[8px] font-normal">Manufacturer</th>
                                <th class="px-[8px] font-normal">State</th>
                                <th class="px-[8px] font-normal">Rated Power</th>
                                <th class="px-[8px] font-normal">PV Capacity</th>
                                <th class="px-[8px] font-normal">Rated Capacity</th>
                                <th class="px-[8px] font-normal">SOC</th>
                                <th class="px-[8px] font-normal">Today Yield</th>
                                <th class="px-[8px] font-normal">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="text-[14px] text-[#313949]">
                            ${assignedDevices.length > 0 ? assignedDevices.map(dev => {
                                const capacity = dev.capacity || 5;
                                const ratedPower = capacity.toFixed(1) + ' kW';
                                const pvCapacity = dev.type === 'Inverter' ? (capacity * 1.2).toFixed(1) + ' kW' : '-';
                                const ratedCapacity = dev.type === 'Battery' ? capacity.toFixed(1) + ' kWh' : '-';
                                let socDisplay = '-';
                                if (dev.type === 'Battery') {
                                    const socVal = dev.soc !== undefined ? dev.soc : Math.floor(40 + Math.random() * 40);
                                    const totalCap = capacity;
                                    const currentEn = (totalCap * socVal) / 100;
                                    socDisplay = `
                                        <div class="flex flex-col">
                                            <span class="text-[#313949]">${socVal}%</span>
                                            <span class="text-[10px] text-[#b5bcc8]">(${currentEn.toFixed(0)}/${totalCap.toFixed(0)} kWh)</span>
                                        </div>
                                    `;
                                }
                                const todayYield = (capacity * (2 + Math.random() * 2)).toFixed(1) + ' kWh';
                                const displayType = dev.type === 'Inverter' ? 'Single PV' : (dev.type === 'Battery' ? 'Single ESS' : (dev.type === 'Hybrid' ? 'PV Plus ESS' : (dev.type || '-')));
                                
                                return `
                                <tr class="h-[48px] hover:bg-[#f3f3f6] transition-colors border-b border-[#e6e8ee] last:border-0">
                                    <td class="px-[8px] py-[12px]">
                                        <span class="inline-flex items-center gap-[6px] px-[8px] py-[2px] rounded-[12px] text-[12px] ${dev.status === 'online' ? 'bg-[rgba(140,218,47,0.2)] text-[#8cda2f]' : 'bg-[#e6e8ee] text-[#b5bcc8]'}">
                                            <span class="w-[6px] h-[6px] rounded-full bg-current"></span>
                                            ${dev.status}
                                        </span>
                                    </td>
                                    <td class="px-[8px] py-[12px] font-mono text-[#313949]">${dev.sn}</td>
                                    <td class="px-[8px] py-[12px] text-[#5f646e]">${displayType}</td>
                                    <td class="px-[8px] py-[12px] text-[#5f646e]">${dev.vendor}</td>
                                    <td class="px-[8px] py-[12px] text-[#5f646e]">${vpp.state || '-'}</td>
                                    <td class="px-[8px] py-[12px] text-[#313949] font-mono">${ratedPower}</td>
                                    <td class="px-[8px] py-[12px] text-[#313949] font-mono">${pvCapacity}</td>
                                    <td class="px-[8px] py-[12px] text-[#313949] font-mono">${ratedCapacity}</td>
                                    <td class="px-[8px] py-[12px] font-mono">${socDisplay}</td>
                                    <td class="px-[8px] py-[12px] text-[#313949] font-mono">${todayYield}</td>
                                    <td class="px-[8px] py-[12px]">
                                        <div class="flex items-center gap-[8px]">
                                            <button onclick="app.openDERDetails('${dev.sn}', event)" class="text-[#b5bcc8] hover:text-[#313949] transition-colors" title="View Details">
                                                <i data-lucide="eye" class="w-[16px] h-[16px]"></i>
                                            </button>
                                            <button onclick="app.confirmRemoveDER('${dev.sn}', event)" class="text-[#b5bcc8] hover:text-red-600 transition-colors" title="Remove">
                                                <i data-lucide="trash-2" class="w-[16px] h-[16px]"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `}).join('') : `
                                <tr>
                                    <td colspan="11" class="py-[32px] text-center text-[#5f646e]">
                                        No devices available
                                    </td>
                                </tr>
                            `}
                        </tbody>
                    </table>
                    ` : state.vppDetailsTab === 'event-list' ? `
                    <table class="w-full text-left border-collapse">
                        <thead class="sticky top-0 bg-white z-10">
                            <tr class="h-[48px] text-[12px] text-[#5f646e] border-b border-[#e6e8ee]">
                                <th class="px-[16px] font-medium">Date</th>
                                <th class="px-[16px] font-medium">Start Time - End Time</th>
                                <th class="px-[16px] font-medium">Event Type</th>
                                <th class="px-[16px] font-medium">Power</th>
                                <th class="px-[16px] font-medium">Spot Price</th>
                                <th class="px-[16px] font-medium">Volume</th>
                                <th class="px-[16px] font-medium">VPP Income</th>
                                <th class="px-[16px] font-medium">Status</th>
                                <th class="px-[16px] font-medium">Notes</th>
                                <th class="px-[16px] font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="text-[14px] text-[#313949]">
                            ${MOCK_DATA.tradingEvents.map(event => `
                                <tr class="h-[48px] hover:bg-[#f3f3f6] transition-colors border-b border-[#e6e8ee] last:border-0">
                                    <td class="px-[16px] py-[12px] text-[#313949]">${event.date.split(' ')[0]}</td>
                                    <td class="px-[16px] py-[12px] text-[#5f646e]">${event.timeRange}</td>
                                    <td class="px-[16px] py-[12px] text-[#313949]">${event.eventType}</td>
                                    <td class="px-[16px] py-[12px] text-[#313949] font-mono">${event.power}</td>
                                    <td class="px-[16px] py-[12px] text-[#313949] font-mono">${event.spotPrice}</td>
                                    <td class="px-[16px] py-[12px] text-[#313949] font-mono">${event.volume}</td>
                                    <td class="px-[16px] py-[12px] text-[#313949] font-mono">${event.vppIncome}</td>
                                    <td class="px-[16px] py-[12px]">
                                        <span class="inline-flex items-center gap-[6px] px-[8px] py-[2px] rounded-[12px] text-[12px] ${event.status === 'Success' ? 'bg-[#e6f4d0] text-[#4b7b0f]' : event.status === 'Partially Success' ? 'bg-[#fff7ed] text-[#c2410c]' : 'bg-[#e6e8ee] text-[#5f646e]'}">
                                            <span class="w-[6px] h-[6px] rounded-full bg-current"></span>
                                            ${event.status}
                                        </span>
                                    </td>
                                    <td class="px-[16px] py-[12px] text-[#5f646e] max-w-xs truncate" title="${event.notes}">${event.notes || '-'}</td>
                                    <td class="px-[16px] py-[12px]">
                                        <button class="text-[#b5bcc8] hover:text-[#313949] transition-colors">
                                            <i data-lucide="external-link" class="w-[16px] h-[16px]"></i>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    ` : `
                    <div class="flex flex-col items-center justify-center h-full text-[#5f646e]">
                        <i data-lucide="calendar-off" class="w-[48px] h-[48px] mb-[16px] text-[#e6e8ee]"></i>
                        <p class="text-[14px]">No events found</p>
                    </div>
                    `}
                </div>
                ${(state.vppDetailsTab === 'der-list') ? `
                <div class="flex items-center justify-end px-[16px] py-[12px] mt-auto bg-white rounded-b-[4px]">
                    <div class="flex items-center gap-[12px]">
                        <div class="relative mr-2">
                            <select 
                                onchange="app.updateDERListState('itemsPerPage', parseInt(this.value))"
                                class="appearance-none bg-white border border-[#e6e8ee] rounded-[4px] h-[32px] pl-[12px] pr-[32px] text-[14px] text-[#313949] focus:outline-none focus:border-[#0052ff] cursor-pointer hover:border-[#b5bcc8] transition-colors"
                            >
                                <option value="10" ${itemsPerPage === 10 ? 'selected' : ''}>10/page</option>
                                <option value="20" ${itemsPerPage === 20 ? 'selected' : ''}>20/page</option>
                                <option value="50" ${itemsPerPage === 50 ? 'selected' : ''}>50/page</option>
                            </select>
                            <div class="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none text-[#5f646e]">
                                <i data-lucide="chevron-down" class="w-[16px] h-[16px]"></i>
                            </div>
                        </div>

                        <div class="flex items-center gap-[8px]">
                            <button 
                                onclick="app.updateDERListState('currentPage', 1)"
                                class="p-[6px] rounded-[4px] hover:bg-[#f3f3f6] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                ${currentPage === 1 ? 'disabled' : ''}
                            >
                                <i data-lucide="chevrons-left" class="w-[16px] h-[16px]"></i>
                            </button>
                            <button 
                                onclick="app.updateDERListState('currentPage', ${currentPage - 1})"
                                class="p-[6px] rounded-[4px] hover:bg-[#f3f3f6] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                ${currentPage === 1 ? 'disabled' : ''}
                            >
                                <i data-lucide="chevron-left" class="w-[16px] h-[16px]"></i>
                            </button>
                            
                            <span class="text-[14px] text-[#313949] font-medium min-w-[32px] text-center">${currentPage}</span>
                            <span class="text-[14px] text-[#5f646e]">/ ${totalPages || 1}</span>

                            <button 
                                onclick="app.updateDERListState('currentPage', ${currentPage + 1})"
                                class="p-[6px] rounded-[4px] hover:bg-[#f3f3f6] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                ${currentPage >= totalPages ? 'disabled' : ''}
                            >
                                <i data-lucide="chevron-right" class="w-[16px] h-[16px]"></i>
                            </button>
                            <button 
                                onclick="app.updateDERListState('currentPage', ${totalPages})"
                                class="p-[6px] rounded-[4px] hover:bg-[#f3f3f6] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                ${currentPage >= totalPages ? 'disabled' : ''}
                            >
                                <i data-lucide="chevrons-right" class="w-[16px] h-[16px]"></i>
                            </button>
                        </div>
                    </div>
                </div>
                ` : ''}
            </div>
        `;
        
        container.appendChild(content);

        // Append Drawer
        const drawerHtml = app.renderAddDeviceDrawer();
        if (drawerHtml) {
            const drawerContainer = document.createElement('div');
            drawerContainer.id = 'vpp-add-device-drawer';
            drawerContainer.innerHTML = drawerHtml;
            container.appendChild(drawerContainer);
        }
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

    setVPPDetailsTab(tab) {
        state.vppDetailsTab = tab;
        this.renderVPPDetails(document.getElementById('content-area'), state.selectedVppId);
        lucide.createIcons();
    },

    setAssignedSearch(query) {
        state.assignedSearchQuery = query;
        state.derListPagination.currentPage = 1;
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

    confirmDeleteVPP(vppId) {
        const vpp = state.vpps.find(v => v.id === vppId);
        if (!vpp) return;

        const deviceCount = MOCK_DATA.assignedDevices.filter(d => d.vppId === vpp.id).length;

        if (deviceCount > 0) {
            // Cannot delete modal
            this.updateModalWidth('max-w-md');
            const content = document.getElementById('modal-content');
            content.innerHTML = `
                <div class="p-8 text-center bg-white rounded-2xl">
                    <div class="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-orange-100">
                        <i data-lucide="alert-circle" class="w-8 h-8"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">Delete a VPP?</h3>
                    <p class="text-gray-500 mb-8 text-base leading-relaxed">Cannot delete VPP while devices are assigned.</p>
                    <button onclick="app.toggleModal(false)" class="w-full py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-all font-bold shadow-lg shadow-gray-900/20">OK</button>
                </div>
            `;
            this.toggleModal(true);
            lucide.createIcons();
        } else {
            // Confirm delete modal
            this.showConfirmModal(
                'Delete?',
                'Are you sure you want to delete this VPP?',
                () => this.deleteVPP(vppId)
            );
        }
    },

    deleteVPP(vppId) {
        // Remove VPP from state
        state.vpps = state.vpps.filter(v => v.id !== vppId);
        
        // Re-render VPP list
        this.renderVPP(document.getElementById('content-area'));
        lucide.createIcons();
        
        this.showToast('VPP deleted successfully', 'success');
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



    openDERDetails(sn, event) {
        if (event) event.stopPropagation();
        window.open(`index.html?view=der_details&sn=${sn}`, '_blank');
    },

    confirmRemoveDER(sn, event) {
        if (event) event.stopPropagation();
        this.showConfirmModal(
            'Remove Device?',
            'Are you sure you want to remove this device from the VPP?',
            () => this.removeDER(sn)
        );
    },

    removeDER(sn) {
        // Remove from assignedDevices in state
        const deviceIndex = state.assignedDevices.findIndex(d => d.sn === sn);
        if (deviceIndex > -1) {
            state.assignedDevices.splice(deviceIndex, 1);
            
            // Re-render VPP details
            this.renderVPPDetails(document.getElementById('content-area'), state.selectedVppId);
            lucide.createIcons();
            
            this.showToast('Device removed successfully', 'success');
        } else {
             this.showToast('Device not found', 'error');
        }
    },



    openVPPDrawer(vppId = null) {
        const isEdit = !!vppId;
        // Use loose equality (==) because vppId from onclick is string, but stored ID might be number
        const vpp = isEdit ? state.vpps.find(v => v.id == vppId) : null;
        const title = isEdit ? 'Edit VPP' : 'Create a VPP';

        // Check if VPP has any assigned devices in either state.devices or MOCK_DATA.assignedDevices
        const hasDevices = isEdit && (
            (state.devices || []).some(d => d.vppId == vppId) || 
            (MOCK_DATA.assignedDevices || []).some(d => d.vppId == vppId)
        );
        
        const drawerContent = document.getElementById('drawer-content');
        drawerContent.innerHTML = `
            <div class="bg-white flex flex-col h-full w-full font-['Roboto'] text-[#313949]">
                <div class="border-b border-[#e6e8ee] flex items-center justify-between px-[24px] py-[16px] shrink-0 w-full bg-white z-10">
                    <p class="font-semibold text-[20px] leading-[28px] text-[#313949]">${title}</p>
                    <button onclick="app.closeDrawer()" class="w-[32px] h-[32px] rounded-[6px] flex items-center justify-center hover:bg-[#f3f3f6] active:bg-[#e6e8ee] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e9f58]/30">
                        <img src="assets/icons/close-drawer.svg" class="w-[16px] h-[16px] block" alt="Close">
                    </button>
                </div>

                <form onsubmit="app.handleVPPSubmit(event, ${vppId})" class="flex flex-col flex-1 px-[24px] py-[16px] gap-[16px] overflow-y-auto">
                    <div class="flex flex-col gap-[8px] w-full shrink-0">
                         <div class="flex items-center gap-[4px] h-[16px] pl-[4px]">
                             <span class="text-[#ff3434] text-[12px] leading-[16px]">*</span>
                             <span class="text-[#5f646e] text-[12px] font-medium leading-[16px]">VPP Name</span>
                         </div>
                         <div class="w-full h-[32px] bg-white border border-[#e6e8ee] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#2e9f58] focus-within:ring-2 focus-within:ring-[#2e9f58]/20">
                             <input type="text" name="name" value="${isEdit ? vpp.name : ''}" required 
                                 class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal" 
                                 placeholder="e.g. Virtual Power Plant X">
                         </div>
                    </div>

                    <div class="flex flex-col gap-[8px] w-full shrink-0">
                         <div class="flex items-center gap-[4px] h-[16px] pl-[4px]">
                             <span class="text-[#5f646e] text-[12px] font-medium leading-[16px]">Company</span>
                         </div>
                         <div class="w-full h-[32px] px-[8px] bg-[#f3f3f6] border border-[#e6e8ee] rounded-[4px] flex items-center">
                             <span class="text-[14px] text-[#b5bcc8] font-normal leading-[20px] truncate">${isEdit ? (vpp.company || '') : (state.currentUser?.company || '')}</span>
                         </div>
                         <input type="hidden" name="company" value="${isEdit ? (vpp.company || '') : (state.currentUser?.company || '')}">
                    </div>

                    <div class="flex flex-col md:flex-row gap-[16px] w-full shrink-0">
                        <div class="flex flex-col gap-[8px] flex-1 min-w-0">
                             <div class="flex items-center gap-[4px] h-[16px] pl-[4px]">
                                 <span class="text-[#5f646e] text-[12px] font-medium leading-[16px]">Country</span>
                             </div>
                             <div class="w-full h-[32px] px-[8px] bg-[#f3f3f6] border border-[#e6e8ee] rounded-[4px] flex items-center">
                                 <span class="text-[14px] text-[#b5bcc8] font-normal leading-[20px] truncate">${isEdit ? (vpp.country || '') : (state.currentUser?.country || '')}</span>
                             </div>
                             <input type="hidden" name="country" value="${isEdit ? (vpp.country || '') : (state.currentUser?.country || '')}">
                        </div>
                        <div class="flex flex-col gap-[8px] flex-1 min-w-0">
                             <div class="flex items-center gap-[4px] h-[16px] pl-[4px]">
                                 <span class="text-[#5f646e] text-[12px] font-medium leading-[16px]">ABN/VAT</span>
                             </div>
                             <div class="w-full h-[32px] px-[8px] bg-[#f3f3f6] border border-[#e6e8ee] rounded-[4px] flex items-center">
                                 <span class="text-[14px] text-[#b5bcc8] font-normal leading-[20px] truncate">${isEdit ? (vpp.abn || '') : (state.currentUser?.abn || '')}</span>
                             </div>
                             <input type="hidden" name="abn" value="${isEdit ? (vpp.abn || '') : (state.currentUser?.abn || '')}">
                        </div>
                    </div>

                    <div class="flex flex-col gap-[16px] w-full shrink-0">
                        <div class="flex flex-col gap-[8px] flex-1 min-w-0">
                             <div class="flex items-center gap-[4px] h-[16px] pl-[4px]">
                                 <span class="text-[#ff3434] text-[12px] leading-[16px]">*</span>
                                 <span class="text-[#5f646e] text-[12px] font-medium leading-[16px]">Pricing Region</span>
                             </div>
                             <div class="relative w-full h-[32px] ${hasDevices ? 'bg-[#f3f3f6] pointer-events-none' : 'bg-white'} border border-[#e6e8ee] rounded-[4px] px-[8px] flex items-center transition-colors ${hasDevices ? '' : 'focus-within:border-[#2e9f58] focus-within:ring-2 focus-within:ring-[#2e9f58]/20'}">
                                 <select name="state" required ${hasDevices ? 'disabled' : ''} class="w-full h-full bg-transparent border-none outline-none text-[14px] ${hasDevices ? 'text-[#b5bcc8] cursor-not-allowed' : 'text-[#313949] cursor-pointer'} appearance-none z-10 font-normal invalid:text-[#b5bcc8]">
                                     <option value="" disabled ${!isEdit && !vpp?.state ? 'selected' : ''}>Select Pricing Region</option>
                                     ${['NSW', 'VIC', 'QLD', 'SA'].map(s => `<option value="${s}" ${vpp?.state === s ? 'selected' : ''} class="text-[#313949]">${s}</option>`).join('')}
                                 </select>
                                 <div class="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center w-4 h-4">
                                     <img src="assets/icons/chevron-down.svg" class="w-full h-full block" alt="Arrow">
                                 </div>
                             </div>
                        </div>
                        <div class="flex flex-col gap-[8px] flex-1 min-w-0">
                             <div class="flex items-center gap-[4px] h-[16px] pl-[4px]">
                                 <span class="text-[#5f646e] text-[12px] font-medium leading-[16px]">Active Market</span>
                             </div>
                             <div class="relative w-full h-[32px] ${hasDevices ? 'bg-[#f3f3f6] pointer-events-none' : 'bg-white'} border border-[#e6e8ee] rounded-[4px] px-[8px] flex items-center transition-colors ${hasDevices ? '' : 'focus-within:border-[#2e9f58] focus-within:ring-2 focus-within:ring-[#2e9f58]/20'}">
                                 <select name="activeMarket" onchange="app.handleActiveMarketChange(this.value)" ${hasDevices ? 'disabled' : ''} class="w-full h-full bg-transparent border-none outline-none text-[14px] ${hasDevices ? 'text-[#b5bcc8] cursor-not-allowed' : 'text-[#313949] cursor-pointer'} appearance-none z-10 font-normal" aria-label="Active Market">
                                     <option value="All" ${(!isEdit || !vpp?.activeMarket || vpp?.activeMarket === 'All') ? 'selected' : ''}>All</option>
                                     <option value="Spot" ${vpp?.activeMarket === 'Spot' ? 'selected' : ''}>Spot</option>
                                     <option value="FCAS" ${vpp?.activeMarket === 'FCAS' ? 'selected' : ''}>FCAS</option>
                                 </select>
                                 <div class="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center w-4 h-4">
                                     <img src="assets/icons/chevron-down.svg" class="w-full h-full block" alt="Arrow">
                                 </div>
                             </div>
                        </div>
                        <div class="flex flex-col gap-[8px] flex-1 min-w-0">
                             <div class="flex items-center gap-[4px] h-[16px] pl-[4px]">
                                 <span class="text-[#5f646e] text-[12px] font-medium leading-[16px]">DNSP</span>
                             </div>
                             <div class="w-full h-[32px] bg-white border border-[#e6e8ee] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#2e9f58] focus-within:ring-2 focus-within:ring-[#2e9f58]/20">
                                 <input type="text" name="dnsp" value="${isEdit ? (vpp.dnsp || '') : ''}"
                                     class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal" 
                                     placeholder="e.g. Energy Provider Name">
                             </div>
                        </div>
                    </div>

                    <div class="flex flex-col gap-[8px] w-full shrink-0">
                         <div class="flex items-center gap-[4px] h-[16px] pl-[4px]">
                             <span class="text-[#5f646e] text-[12px] font-medium leading-[16px]">Description</span>
                         </div>
                         <div class="w-full bg-white border border-[#e6e8ee] rounded-[4px] px-[8px] py-[8px] flex items-start transition-colors focus-within:border-[#2e9f58] focus-within:ring-2 focus-within:ring-[#2e9f58]/20">
                             <textarea name="description" rows="4" class="w-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] resize-none font-normal leading-[20px]" placeholder="Enter VPP description...">${isEdit ? vpp.description : ''}</textarea>
                         </div>
                    </div>
                    
                    <div class="flex items-center gap-[12px] pt-[16px] mt-auto w-full">
                         <button type="button" onclick="app.closeDrawer()" class="flex-1 h-[32px] px-[12px] flex items-center justify-center bg-white border border-[#e6e8ee] rounded-[4px] text-[14px] text-[#313949] hover:bg-[#f3f3f6] active:bg-[#e6e8ee] transition-colors font-medium leading-[20px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e9f58]/30">
                             Cancel
                         </button>
                         <button type="submit" id="vpp-submit-btn" class="flex-1 h-[32px] px-[12px] flex items-center justify-center bg-[#3ec064] rounded-[4px] text-[14px] text-white hover:bg-[#2e9f58] active:bg-[#1a6e3b] transition-colors font-medium leading-[20px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e9f58]/30">
                             Submit
                         </button>
                    </div>
                </form>
            </div>
        `;
        lucide.createIcons();
        this.toggleDrawer(true);
    },

    openCloudBindDrawer(isEdit = false) {
        const title = isEdit ? 'Edit System Configuration' : 'Create a Connection';
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
        // const manufacturers = getOptions('CLOUD');
        const allManufacturers = [
            'Sungrow',
            'Huawei', 
            'Growatt',
            'Ginlong (Solis)',
            'GoodWe',
            'SofarSolar',
            'SolaX Power',
            'Tesla', 
            'Fronius',
            'SMA',
            'Delta', 
            'Enphase'
        ];

        const manufacturers = allManufacturers.filter(m => !connectedSystemNames.includes(m));

        drawerContent.innerHTML = `
            <div class="bg-white h-full flex flex-col font-['Roboto']">
                <!-- Header -->
                <div class="flex items-center justify-between p-[16px] border-b border-[#e6e8ee] shrink-0">
                    <h3 class="font-bold text-[20px] text-[#313949] leading-normal">Create Access</h3>
                    <button onclick="app.closeDrawer()" class="w-[24px] h-[24px] flex items-center justify-center text-[#313949] hover:text-gray-600 transition-colors">
                        <i data-lucide="x" class="w-[24px] h-[24px]"></i>
                    </button>
                </div>

                <!-- Form Content -->
                <form onsubmit="app.handleCloudBindSubmit(event)" class="flex-1 overflow-y-auto px-[24px] py-[16px] flex flex-col gap-[16px]">
                    <!-- Row 1: Type & Country -->
                    <div class="flex gap-[16px]">
                        <!-- Type -->
                        <div class="flex-1 flex flex-col gap-[4px]">
                            <div class="flex items-center gap-[4px] h-[16px]">
                                <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                                <span class="text-[#5f646e] text-[12px] leading-normal">Type</span>
                            </div>
                            <div class="h-[32px]">
                                <select name="systemType" onchange="app.handleSystemTypeChange(this.value)" class="w-full h-full bg-white border border-[#cacfd8] rounded-[4px] px-[8px] text-[14px] text-[#313949] focus:border-[#3ec064] outline-none appearance-none transition-colors">
                                    <option value="cloud">Manufacturer Cloud</option>
                                </select>
                            </div>
                        </div>

                        <!-- Country -->
                        <div class="flex-1 flex flex-col gap-[4px]">
                            <div class="flex items-center gap-[4px] h-[16px]">
                                <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                                <span class="text-[#5f646e] text-[12px] leading-normal">Country (Company Region)</span>
                            </div>
                            <div class="h-[32px]">
                                <input type="text" name="country" value="${country}" readonly class="w-full h-full bg-[#e6e8ee] border border-[#b5bcc8] rounded-[4px] px-[8px] text-[14px] text-[#b5bcc8] outline-none cursor-not-allowed">
                            </div>
                        </div>
                    </div>

                    <!-- Cloud Section -->
                    <div id="section-cloud" class="flex flex-col gap-[16px]">
                        <!-- Manufacturer Cloud -->
                        <div class="flex flex-col gap-[4px]">
                            <div class="flex items-center gap-[4px] h-[16px]">
                                <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                                <span class="text-[#5f646e] text-[12px] leading-normal">Manufacturer Cloud</span>
                            </div>
                            <div class="h-[32px]">
                                <select name="manufacturers" class="w-full h-full bg-white border border-[#cacfd8] rounded-[4px] px-[8px] text-[14px] text-[#313949] focus:border-[#3ec064] outline-none appearance-none transition-colors">
                                    ${manufacturers.length > 0 ? manufacturers.map(m => `
                                        <option value="${m}">${m}</option>
                                    `).join('') : '<option value="" disabled selected>No cloud nodes found for your company.</option>'}
                                </select>
                            </div>
                        </div>

                        <!-- Connection Mode Radio -->


                        <!-- Credentials -->
                        <div id="cloud-credentials" class="flex flex-col gap-[16px] pt-[4px]">
                            <!-- AppKey -->
                            <div class="flex flex-col gap-[4px]">
                                <div class="flex items-center h-[16px] pl-[4px]">
                                    <span class="text-[#5f646e] text-[12px] leading-normal">AppKey</span>
                                </div>
                                <div class="relative h-[32px]">
                                    <input type="password" name="appKey" id="input-app-key" class="w-full h-full bg-white border border-[#cacfd8] rounded-[4px] pl-[8px] pr-[60px] text-[14px] text-[#313949] placeholder-[#b5bcc8] focus:border-[#3ec064] outline-none transition-colors" placeholder="Enter AppKey">
                                    <div class="absolute right-[8px] top-1/2 -translate-y-1/2 flex items-center gap-[4px]">
                                        <button type="button" onclick="app.togglePasswordVisibility('input-app-key')" class="text-[#b5bcc8] hover:text-[#3ec064] transition-colors p-0.5">
                                            <i data-lucide="eye" class="w-[16px] h-[16px]"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- AppSecret -->
                            <div class="flex flex-col gap-[4px]">
                                <div class="flex items-center h-[16px] pl-[4px]">
                                    <span class="text-[#5f646e] text-[12px] leading-normal">AppSecret</span>
                                </div>
                                <div class="relative h-[32px]">
                                    <input type="password" name="appSecret" id="input-app-secret" class="w-full h-full bg-white border border-[#cacfd8] rounded-[4px] pl-[8px] pr-[60px] text-[14px] text-[#313949] placeholder-[#b5bcc8] focus:border-[#3ec064] outline-none transition-colors" placeholder="Enter AppSecret">
                                    <div class="absolute right-[8px] top-1/2 -translate-y-1/2 flex items-center gap-[4px]">
                                        <button type="button" onclick="app.togglePasswordVisibility('input-app-secret')" class="text-[#b5bcc8] hover:text-[#3ec064] transition-colors p-0.5">
                                            <i data-lucide="eye" class="w-[16px] h-[16px]"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- SCADA Section (Hidden by default) -->
                    <div id="section-scada" class="flex flex-col gap-[4px] hidden">
                         <div class="flex items-center gap-[4px] h-[16px]">
                            <span class="text-[#5f646e] text-[12px] leading-normal">SCADA</span>
                         </div>
                         <div class="bg-white border border-[#cacfd8] rounded-[4px] p-[8px] max-h-48 overflow-y-auto">
                            ${scadaOptions.length > 0 ? scadaOptions.map(s => `
                                <label class="flex items-center gap-[8px] p-[4px] hover:bg-[#f3f3f6] rounded-[2px] cursor-pointer transition-colors">
                                    <input type="checkbox" name="scada" value="${s}" class="w-[14px] h-[14px] rounded border-[#cacfd8] text-[#3ec064] focus:ring-[#3ec064]">
                                    <span class="text-[14px] text-[#313949]">${s}</span>
                                </label>
                            `).join('') : '<div class="text-[12px] text-[#5f646e]">No SCADA systems found for your company.</div>'}
                         </div>
                    </div>

                    <!-- Edge Section (Hidden by default) -->
                    <div id="section-edge" class="flex flex-col gap-[4px] hidden">
                         <div class="flex items-center gap-[4px] h-[16px]">
                            <span class="text-[#5f646e] text-[12px] leading-normal">Edge</span>
                         </div>
                         <div class="bg-white border border-[#cacfd8] rounded-[4px] p-[8px] max-h-48 overflow-y-auto">
                            ${edgeOptions.length > 0 ? edgeOptions.map(e => `
                                <label class="flex items-center gap-[8px] p-[4px] hover:bg-[#f3f3f6] rounded-[2px] cursor-pointer transition-colors">
                                    <input type="checkbox" name="edge" value="${e}" class="w-[14px] h-[14px] rounded border-[#cacfd8] text-[#3ec064] focus:ring-[#3ec064]">
                                    <span class="text-[14px] text-[#313949]">${e}</span>
                                </label>
                            `).join('') : '<div class="text-[12px] text-[#5f646e]">No edge nodes found for your company.</div>'}
                         </div>
                    </div>

                    <!-- Footer Buttons -->
                    <div class="flex items-center gap-[10px] pt-[16px] mt-auto">
                         <button type="button" onclick="app.closeDrawer()" class="flex-1 h-[32px] flex items-center justify-center bg-white border border-[#b5bcc8] rounded-[4px] text-[14px] text-[#313949] hover:bg-gray-50 transition-colors leading-[1.42]">
                             Cancel
                         </button>
                         <button type="submit" id="cloud-submit-btn" class="flex-1 h-[32px] flex items-center justify-center bg-[#3ec064] rounded-[4px] text-[14px] text-white hover:bg-[#35a656] transition-colors leading-[1.42]">
                             ${isEdit ? 'Update' : 'Submit'}
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
                <label class="flex items-center gap-[8px] p-[4px] hover:bg-[#f3f3f6] rounded-[2px] cursor-pointer transition-colors">
                    <input type="radio" name="manufacturers" value="${m}" class="w-[14px] h-[14px] rounded-full border-[#cacfd8] text-[#3ec064] focus:ring-[#3ec064]">
                    <span class="text-[14px] text-[#313949]">${m}</span>
                </label>
            `).join('') : '<div class="text-[12px] text-[#5f646e]">No cloud nodes found for your company.</div>';
        }

        // Update SCADA Options
        const scadaContainer = document.querySelector('#section-scada .overflow-y-auto');
        if (scadaContainer) {
            const options = getOptions('SCADA');
            scadaContainer.innerHTML = options.length ? options.map(s => `
                <label class="flex items-center gap-[8px] p-[4px] hover:bg-[#f3f3f6] rounded-[2px] cursor-pointer transition-colors">
                    <input type="checkbox" name="scada" value="${s}" class="w-[14px] h-[14px] rounded border-[#cacfd8] text-[#3ec064] focus:ring-[#3ec064]">
                    <span class="text-[14px] text-[#313949]">${s}</span>
                </label>
            `).join('') : '<div class="text-[12px] text-[#5f646e]">No SCADA systems found for your company.</div>';
        }

        // Update Edge Options
        const edgeContainer = document.querySelector('#section-edge .overflow-y-auto');
        if (edgeContainer) {
            const options = getOptions('EDGE');
            edgeContainer.innerHTML = options.length ? options.map(e => `
                <label class="flex items-center gap-[8px] p-[4px] hover:bg-[#f3f3f6] rounded-[2px] cursor-pointer transition-colors">
                    <input type="checkbox" name="edge" value="${e}" class="w-[14px] h-[14px] rounded border-[#cacfd8] text-[#3ec064] focus:ring-[#3ec064]">
                    <span class="text-[14px] text-[#313949]">${e}</span>
                </label>
            `).join('') : '<div class="text-[12px] text-[#5f646e]">No edge devices found for your company.</div>';
        }
    },

    toggleConnectionMode(mode) {
        const credentialsDiv = document.getElementById('cloud-credentials');
        if (mode === 'add') {
            credentialsDiv.classList.remove('hidden');
        } else {
            credentialsDiv.classList.add('hidden');
        }
    },

    togglePasswordVisibility(inputId) {
        const input = document.getElementById(inputId);
        const btn = input.nextElementSibling.nextElementSibling; // Adjust based on DOM structure
        const icon = btn.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            // icon replacement handled by lucide, simpler to just replace innerHTML
            btn.innerHTML = '<i data-lucide="eye-off" class="w-4 h-4"></i>';
        } else {
            input.type = 'password';
            btn.innerHTML = '<i data-lucide="eye" class="w-4 h-4"></i>';
        }
        lucide.createIcons();
    },

    copyToClipboard(elementId) {
        const element = document.getElementById(elementId);
        if (!element) return;
        const text = element.value;
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                this.showToast('Copied to clipboard', 'success');
            }).catch(() => {
                // Fallback
                element.select();
                document.execCommand('copy');
                this.showToast('Copied to clipboard', 'success');
            });
        } else {
             // Fallback for older browsers
             element.select();
             document.execCommand('copy');
             this.showToast('Copied to clipboard', 'success');
        }
    },

    handleSystemTypeChange(type) {
        const cloudSection = document.getElementById('section-cloud');
        const scadaSection = document.getElementById('section-scada');
        const edgeSection = document.getElementById('section-edge');

        cloudSection.classList.add('hidden');
        scadaSection.classList.add('hidden');
        edgeSection.classList.add('hidden');

        if (['cloud', 'aggregator_cloud', 'private_cloud'].includes(type)) {
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

            if (['cloud', 'aggregator_cloud', 'private_cloud'].includes(systemType)) {
                const manufacturers = formData.getAll('manufacturers');
                const connectionMode = formData.get('connectionMode') || 'add';
                const appKey = formData.get('appKey');
                const appSecret = formData.get('appSecret');

                state.cloudVendor = manufacturers.join(', '); // Keep legacy support
                
                manufacturers.forEach((m, index) => {
                    let typeLabel = 'Cloud';
                    if (systemType === 'aggregator_cloud') typeLabel = 'Aggregator Cloud';
                    if (systemType === 'private_cloud') typeLabel = 'Private Cloud';

                    const systemData = {
                        id: timestamp + index,
                        name: m,
                        type: typeLabel,
                        vendor: m,
                        deviceCount: Math.floor(Math.random() * 10) + 1, // Random mock count
                        status: 'establishing'
                    };

                    if (connectionMode === 'add') {
                        systemData.credentials = { appKey, appSecret };
                        // Mock validation or behavior difference for 'Add' vs 'Create'
                    }

                    newSystems.push(systemData);
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

            // Auto-update establishing status after 10s
            newSystems.forEach(sys => {
                if (sys.status === 'establishing') {
                    setTimeout(() => {
                        const targetSys = state.systems.find(s => s.id === sys.id);
                        if (targetSys) {
                            targetSys.status = 'established';
                            // Re-render if we are in device management view
                            if (state.currentView === 'device_management') {
                                this.renderDeviceManagement(document.getElementById('content-area'));
                                lucide.createIcons();
                            }
                        }
                    }, 10000);
                }
            });

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

    filterVPPs() {
        const nameInput = document.getElementById('vpp-name-filter');
        const stateInput = document.getElementById('vpp-state-filter');
        
        state.vppList.vppName = nameInput.value;
        state.vppList.state = stateInput.value;
        state.vppList.currentPage = 1;
        
        this.renderVPP(document.getElementById('content-area'));
    },

    resetVPPFilters() {
        state.vppList.vppName = '';
        state.vppList.state = '';
        state.vppList.currentPage = 1;
        this.renderVPP(document.getElementById('content-area'));
    },

    filterSubVPPs() {
        const name = document.getElementById('subvpp-name-filter').value;
        const type = document.getElementById('subvpp-type-filter').value;
        const status = document.getElementById('subvpp-status-filter').value;
        
        state.subVppList.name = name;
        state.subVppList.type = type;
        state.subVppList.status = status;
        state.subVppList.currentPage = 1;
        
        this.renderDeviceManagement(document.getElementById('content-area'));
        lucide.createIcons();
    },

    resetSubVPPFilters() {
        state.subVppList.name = '';
        state.subVppList.type = 'All';
        state.subVppList.status = 'All';
        state.subVppList.currentPage = 1;
        
        this.renderDeviceManagement(document.getElementById('content-area'));
        lucide.createIcons();
    },

    handleActiveMarketChange(val) {
        console.log('Active Market changed:', val);
        // Trigger data screening or page refresh logic if needed
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
            const stateField = formData.get('state');
            const address = formData.get('address');
            const dnsp = formData.get('dnsp');
            const description = formData.get('description');
            const activeMarket = formData.get('activeMarket');
            
            if (isEdit) {
                const vpp = state.vpps.find(v => v.id === vppId);
                if (vpp) {
                    vpp.name = name;
                    vpp.company = company;
                    vpp.country = country;
                    vpp.abn = abn;
                    vpp.state = stateField || vpp.state;
                    vpp.address = address;
                    vpp.dnsp = dnsp !== null ? dnsp : vpp.dnsp;
                    vpp.description = description;
                    vpp.activeMarket = activeMarket || vpp.activeMarket;
                }
            } else {
                const newVPP = {
                    id: Date.now(),
                    name: name,
                    company: company,
                    country: country,
                    abn: abn,
                    state: stateField,
                    address: address,
                    dnsp: dnsp,
                    description: description,
                    activeMarket: activeMarket || 'All',
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
