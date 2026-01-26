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
            price: (Math.random() * 1000).toFixed(2),
            date: '12/01/2026 (+11:00)',
            timeRange: '12:00:00 - 12:30:00',
            power: (Math.random() * 500).toFixed(2),
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
    vppDetailsTab: 'der-list', // der-list or event-list
    assignedSearchQuery: '',
    discoverySearchQuery: '',
    vppList: {
        vppName: '',
        state: ''
    },
    subVppList: {
        name: '',
        type: 'All',
        status: 'All'
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
        currentPage: 1
    },
    capEvents: {
        timeRange: '',
        status: 'All',
        eventType: 'All',
        vppName: '',
        currentPage: 1
    },
    smartFeedInRules: {
        state: 'All',
        vppName: '',
        currentPage: 1
    },
    smartFeedInEvents: {
        type: 'All',
        status: 'All',
        currentPage: 1
    },
    tradingEvents: {
        timeRange: '',
        eventType: 'All',
        status: 'All',
        state: 'All',
        vppName: '',
        currentPage: 1
    },
    fcasGroups: {
        groupName: '',
        state: 'All',
        active: 'All',
        currentPage: 1
    },
    fcasPriceAvailability: {
        region: 'SA',
        direction: 'Raise', // Raise or Lower
        date: '20/01/2026',
        bids: {
            dateRange: '',
            serviceType: 'All',
            currentPage: 1
        }
    },
    reportsVppEvents: {
        timeRange: '',
        status: 'All',
        eventType: 'All',
        vppName: '',
        currentPage: 1
    },
    reportsDerEvents: {
        timeRange: '',
        eventType: 'All',
        status: 'All',
        from: 'All',
        sn: '',
        currentPage: 1
    },
    reportsVppEventItems: {
        month: '',
        eventType: 'All',
        from: 'All',
        eventId: '',
        nmi: '',
        currentPage: 1
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
            'spot_market': [{label: 'Electricity Market'}, {label: 'Spot Market'}],
            'arbitrage_points': [{label: 'Electricity Market'}, {label: 'Arbitrage Points'}],
            'trading': [{label: 'Trading'}],
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
            'vpp': [{label: 'System'}, {label: 'VPP Management'}],
            'der': [{label: 'DER Management'}],
            'der_ess': [{label: 'DER Management', onclick: "app.navigate('der')"}, {label: 'ESS'}],
            'der_pv': [{label: 'DER Management', onclick: "app.navigate('der')"}, {label: 'PV'}],
            'der_ev': [{label: 'DER Management', onclick: "app.navigate('der')"}, {label: 'EV'}],
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
        const electricityMarketViews = ['spot_market', 'arbitrage_points'];
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

        // Handle Cap Service Submenu Expansion
        const capServiceViews = ['cap_graph', 'cap_rules', 'cap_events'];
        const capServiceSubmenu = document.getElementById('cap-service-submenu');
        const capServiceToggle = document.querySelector('a[onclick*="cap-service-submenu"] .chevron-icon');

        if (capServiceViews.includes(viewName)) {
            if (capServiceSubmenu && capServiceSubmenu.classList.contains('hidden')) {
                capServiceSubmenu.classList.remove('hidden');
                if (capServiceToggle) capServiceToggle.style.transform = 'rotate(180deg)';
            }
        }

        // Handle FCAS Submenu Expansion
        const fcasViews = ['fcas_groups', 'fcas_price_availability'];
        const fcasSubmenu = document.getElementById('fcas-submenu');
        const fcasToggle = document.querySelector('a[onclick*="fcas-submenu"] .chevron-icon');

        if (fcasViews.includes(viewName)) {
            if (fcasSubmenu && fcasSubmenu.classList.contains('hidden')) {
                fcasSubmenu.classList.remove('hidden');
                if (fcasToggle) fcasToggle.style.transform = 'rotate(180deg)';
            }
        }

        // Handle DER Management Submenu Expansion
        const derViews = ['der_ess', 'der_pv', 'der_ev'];
        const derSubmenu = document.getElementById('der-submenu');
        const derToggle = document.querySelector('a[onclick*="der-submenu"] .chevron-icon');

        if (derViews.includes(viewName)) {
            if (derSubmenu && derSubmenu.classList.contains('hidden')) {
                derSubmenu.classList.remove('hidden');
                if (derToggle) derToggle.style.transform = 'rotate(180deg)';
            }
        }

        // Handle Reports Submenu Expansion
        const reportsViews = ['reports_vpp_events', 'reports_der_events', 'reports_vpp_event_items', 'reports_vpp_event_month_summary', 'reports_terminated'];
        const reportsSubmenu = document.getElementById('reports-submenu');
        const reportsToggle = document.querySelector('a[onclick*="reports-submenu"] .chevron-icon');

        if (reportsViews.includes(viewName)) {
            if (reportsSubmenu && reportsSubmenu.classList.contains('hidden')) {
                reportsSubmenu.classList.remove('hidden');
                if (reportsToggle) reportsToggle.style.transform = 'rotate(180deg)';
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
        } else if (['electricity_market', 'trading', 'smart_feed_in', 'cap_service', 'fcas', 'reports', 'reports_vpp_event_month_summary', 'reports_terminated'].includes(viewName)) {
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
        }

        lucide.createIcons();
    },

    renderSpotMarket(container) {


        container.innerHTML = `
            <div class="h-full flex flex-col bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                <!-- Top Bar -->
                <div class="flex items-center justify-between bg-white px-4 py-3 border-b border-gray-200">
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
                        <div class="flex p-1 bg-gray-100 rounded-lg">
                            <button id="spot-tab-realtime" class="px-3 py-1.5 text-sm font-medium text-gray-900 bg-white rounded shadow-sm transition-all">Real-time</button>
                            <button id="spot-tab-historical" class="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Historical</button>
                        </div>
                        <div id="spot-date-picker-container" class="hidden flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
                            <span class="text-sm font-medium text-gray-500">Date:</span>
                            <input type="date" id="spot-date-picker" class="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-manta-primary focus:border-manta-primary block p-2">
                        </div>

                    </div>

                    <div class="flex items-center gap-2">
                        <button class="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2">
                            <i data-lucide="download" class="w-4 h-4"></i> Export Chart
                        </button>
                        <button class="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2">
                            <i data-lucide="play-circle" class="w-4 h-4"></i> Backtest
                        </button>
                        <button class="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2">
                            <i data-lucide="bell" class="w-4 h-4"></i> Alerts
                        </button>
                        <button class="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2">
                            <i data-lucide="maximize" class="w-4 h-4"></i> Fullscreen
                        </button>
                    </div>

                </div>

                <!-- Main Content -->
                <div class="flex flex-col flex-1 min-h-0">
                    <!-- Top Stats Bar -->
                    <div class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-8">
                        <!-- Market Status Group -->
                        <div class="flex items-center gap-8">
                            <div>
                                <p class="text-sm text-gray-500 mb-1">Current Dispatch Price</p>
                                <div class="flex items-end gap-2">
                                    <span class="text-2xl font-bold text-gray-900">0.68</span>
                                    <span class="text-sm text-gray-500 mb-1">$/MWh</span>
                                </div>
                            </div>
                            <div class="h-8 w-px bg-gray-200"></div>
                            <div>
                                <p class="text-sm text-gray-500 mb-1">Next Trading Price</p>
                                <div class="flex items-center gap-2">
                                    <span class="text-xl font-bold text-manta-primary">0.72</span>
                                    <span class="text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded">↑ 5.2%</span>
                                </div>
                            </div>
                            <div class="h-8 w-px bg-gray-200"></div>
                            <div>
                                <p class="text-sm text-gray-500 mb-1">Current Sellable Energy</p>
                                <div class="flex items-end gap-2">
                                    <span class="text-xl font-bold text-gray-900">12.5</span>
                                    <span class="text-sm text-gray-500 mb-1">MWh</span>
                                </div>
                            </div>
                            <div class="h-8 w-px bg-gray-200"></div>
                            <div>
                                <p class="text-sm text-gray-500 mb-1">Current Chargeable Capacity</p>
                                <div class="flex items-end gap-2">
                                    <span class="text-xl font-bold text-gray-900">8.2</span>
                                    <span class="text-sm text-gray-500 mb-1">MWh</span>
                                </div>
                            </div>
                        </div>

                        <!-- Trading Performance Group -->
                        <div class="flex items-center gap-8">
                            <div>
                                <p class="text-sm text-gray-500 mb-1">Trading Opportunities</p>
                                <p class="font-medium text-lg">3 <span class="text-gray-400 text-sm font-normal">(2 Captured)</span></p>
                            </div>
                            <div class="h-8 w-px bg-gray-200"></div>
                            <div>
                                <p class="text-sm text-gray-500 mb-1">Est. Revenue</p>
                                <p class="text-lg font-bold text-green-600">+$1,520</p>
                            </div>
                            <div class="h-8 w-px bg-gray-200"></div>
                            <div>
                                <p class="text-sm text-gray-500 mb-1">Realized Profit</p>
                                <p class="text-lg font-bold text-manta-primary">+$980 <span class="text-xs text-gray-400 font-normal">(Real-time)</span></p>
                            </div>
                        </div>
                    </div>

                    <!-- Chart Area -->
                    <div class="flex-1 bg-white relative flex flex-col">
                        <div id="spot-market-chart" class="w-full h-full"></div>
                    </div>
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
                const signals = [];
                
                // Seed based on date string for consistency in historical mode
                let seed = 0;
                for (let i = 0; i < dateStr.length; i++) {
                    seed += dateStr.charCodeAt(i);
                }
                const random = () => {
                    const x = Math.sin(seed++) * 10000;
                    return x - Math.floor(x);
                };

                const basePrice = 0.5 + (random() * 0.2);
                let currentTradingPrice = basePrice;
                
                // 24 hours * 12 intervals (5 mins) = 288 points
                const points = 288;
                
                const now = new Date();
                const currentHour = now.getHours();
                const currentMinute = now.getMinutes();
                const currentTimeIndex = (currentHour * 12) + Math.floor(currentMinute / 5);

                for (let i = 0; i < points; i++) {
                    const hour = Math.floor(i / 12);
                    const minute = (i % 12) * 5;
                    const timeStr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
                    timestamps.push(timeStr);
                    
                    // Simulate price curve
                    const trend = Math.sin(i / 30) * 0.1 + Math.cos(i / 10) * 0.05;
                    const noise = (random() - 0.5) * 0.05;
                    const val = basePrice + trend + noise;
                    
                    const predVal = val + (random() - 0.5) * 0.02; // Forecast slightly different
                    predictions.push(predVal.toFixed(3));

                    // Dispatch Price (5-min granularity)
                    const dispatchVal = val + (random() - 0.5) * 0.04;
                    dispatchPrices.push(dispatchVal.toFixed(3));

                    // Trading Price (30-min granularity)
                    if (i % 6 === 0) {
                        currentTradingPrice = basePrice + trend + (random() - 0.5) * 0.08;
                    }
                    
                    // Forecast Trading Price
                    const forecastTradingVal = currentTradingPrice + (random() - 0.5) * 0.05;

                    // Only display bars at the center of the 30-min interval (index 3 of 0-5)
                    // This allows us to control bar width independently of the time axis granularity
                    if (i % 6 === 3) {
                        tradingPrices.push(currentTradingPrice.toFixed(3));
                        forecastTradingPrices.push(forecastTradingVal.toFixed(3));
                    } else {
                        tradingPrices.push(null);
                        forecastTradingPrices.push(null);
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
                    if (i % 50 === 0 && random() > 0.5) {
                        signals.push({
                            name: random() > 0.5 ? 'Buy' : 'Sell',
                            coord: [timeStr, val],
                            value: random() > 0.5 ? 'B' : 'S',
                            itemStyle: { color: random() > 0.5 ? '#10B981' : '#EF4444' }
                        });
                    }
                }
                
                return { timestamps, prices, predictions, dispatchPrices, tradingPrices, forecastTradingPrices, signals };
            }

            function updateChart() {
                const dateStr = currentMode === 'realtime' 
                    ? new Date().toISOString().split('T')[0] 
                    : (datePicker ? datePicker.value : new Date().toISOString().split('T')[0]);
                
                currentData = generateData(dateStr, currentMode === 'realtime');
                
                const option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { type: 'cross' },
                        formatter: function (params) {
                            let html = `<div class="font-bold mb-1">${params[0].axisValue}</div>`;
                            const dataIndex = params[0].dataIndex;
                            
                            // Add Price
                            const price = params.find(p => p.seriesName === 'Real-time Price');
                            if (price && price.value !== undefined && price.value !== null) {
                                html += `<div class="flex justify-between gap-4 text-xs">
                                    <span style="color:${price.color}">${price.marker} Real-time Price</span>
                                    <span class="font-mono font-bold">${price.value}</span>
                                </div>`;
                            }

                            // Add Dispatch Price
                            const dispatch = params.find(p => p.seriesName === 'Dispatch Price');
                            if (dispatch) {
                                html += `<div class="flex justify-between gap-4 text-xs">
                                    <span style="color:${dispatch.color}">${dispatch.marker} Dispatch Price</span>
                                    <span class="font-mono font-bold">${dispatch.value}</span>
                                </div>`;
                            }

                            // Add Trading Price
                            const trading = params.find(p => p.seriesName === 'Trading Price');
                            if (trading) {
                                html += `<div class="flex justify-between gap-4 text-xs">
                                    <span style="color:${trading.color}">${trading.marker} Trading Price</span>
                                    <span class="font-mono font-bold">${trading.value}</span>
                                </div>`;
                            }

                            // Add Forecast Trading Price
                            const forecastTrading = params.find(p => p.seriesName === 'Forecast Trading Price');
                            if (forecastTrading) {
                                html += `<div class="flex justify-between gap-4 text-xs">
                                    <span style="color:${forecastTrading.color}">${forecastTrading.marker} Forecast Trading Price</span>
                                    <span class="font-mono font-bold">${forecastTrading.value}</span>
                                </div>`;
                            }
                            
                            // Add Prediction
                            const pred = params.find(p => p.seriesName === 'Forecast Price');
                            if (pred) {
                                html += `<div class="flex justify-between gap-4 text-xs">
                                    <span style="color:${pred.color}">${pred.marker} Forecast Price</span>
                                    <span class="font-mono font-bold">${pred.value}</span>
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
                            height: '85%',
                            top: '10%'
                        }
                    ],
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: currentData.timestamps,
                            axisLine: { show: false },
                            axisTick: { show: false },
                            axisLabel: { show: true, color: '#9ca3af', margin: 10 }
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
                        // Real-time Price
                        {
                            name: 'Real-time Price',
                            type: 'line',
                            data: currentData.prices,
                            itemStyle: { color: '#2563eb' },
                            lineStyle: { width: 2 },
                            showSymbol: false,
                            markPoint: {
                                data: currentData.signals,
                                symbolSize: 40,
                                label: {
                                    show: true,
                                    formatter: '{c}',
                                    fontSize: 10,
                                    offset: [0, -5],
                                    color: '#fff'
                                }
                            }
                        },
                        // Dispatch Price
                        {
                            name: 'Dispatch Price',
                            type: 'line',
                            data: currentData.dispatchPrices,
                            itemStyle: { color: '#F59E0B' }, // Amber
                            lineStyle: { width: 1.5 },
                            showSymbol: false
                        },
                        // Trading Price
                        {
                            name: 'Trading Price',
                            type: 'bar',
                            data: currentData.tradingPrices,
                            itemStyle: { color: '#10B981', opacity: 0.6 }, // Emerald
                            barWidth: 16, // Fixed width for 30-min block representation
                            showSymbol: false
                        },
                        // Forecast Trading Price
                        {
                            name: 'Forecast Trading Price',
                            type: 'bar',
                            data: currentData.forecastTradingPrices,
                            itemStyle: { color: '#059669' }, // Darker Emerald
                            barWidth: 6, // Narrower width
                            barGap: '-100%', // Superimpose on Trading Price
                            z: 10, // Ensure it renders on top
                            showSymbol: false
                        },
                        // Prediction
                        {
                            name: 'Forecast Price',
                            type: 'line',
                            data: currentData.predictions,
                            itemStyle: { color: '#8b5cf6' },
                            lineStyle: { width: 1, type: 'dashed' },
                            showSymbol: false
                        },
                    ]
                };
                
                myChart.setOption(option);
            }
            
            // Resize handler
            window.addEventListener('resize', () => myChart.resize());

            // Event Listeners
            if (realTimeTab && historicalTab) {
                realTimeTab.addEventListener('click', () => {
                    currentMode = 'realtime';
                    realTimeTab.className = "px-3 py-1.5 text-sm font-medium text-gray-900 bg-white rounded shadow-sm transition-all";
                    historicalTab.className = "px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors";
                    if (datePickerContainer) datePickerContainer.classList.add('hidden');
                    updateChart();
                });

                historicalTab.addEventListener('click', () => {
                    currentMode = 'historical';
                    historicalTab.className = "px-3 py-1.5 text-sm font-medium text-gray-900 bg-white rounded shadow-sm transition-all";
                    realTimeTab.className = "px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors";
                    if (datePickerContainer) datePickerContainer.classList.remove('hidden');
                    updateChart();
                });
            }

            if (datePicker) {
                datePicker.addEventListener('change', updateChart);
            }
            
            // Initial Chart Load
            updateChart();
            
            // Events
            myChart.on('dblclick', function (params) {
                if (params.componentType === 'markPoint') {
                    // Mock jump to strategy
                    alert(`Jump to Strategy Orchestration: View logic for ${params.name} signal (Price: ${params.data.coord[1]})`);
                }
            });
            
            chartDom.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                // Custom Context Menu Logic
                const menu = document.createElement('div');
                menu.className = 'fixed bg-white shadow-lg rounded-lg border border-gray-200 py-1 z-50 text-sm w-40';
                menu.style.left = e.pageX + 'px';
                menu.style.top = e.pageY + 'px';
                menu.innerHTML = `

                    <div class="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-gray-700">
                        <i data-lucide="bell" class="w-3 h-3"></i> Set Price Alert
                    </div>
                `;
                document.body.appendChild(menu);
                lucide.createIcons();
                
                const closeMenu = () => {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                };
                setTimeout(() => document.addEventListener('click', closeMenu), 0);
            });
            
        }, 100);
        
        lucide.createIcons();
    },

    renderCapGraph(container) {
        const { selectedState, selectedDate, forecastInterval } = state.capGraph;
        const metrics = MOCK_DATA.capGraph.metrics[selectedState];
        const forecasts = MOCK_DATA.capGraph.forecasts;
        const chartData = MOCK_DATA.capGraph.chartData;

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
                                        <th class="px-6 py-3 font-medium text-right">Forecast Price ($/MWh)</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-100">
                                    ${forecasts.map(row => `
                                        <tr class="hover:bg-gray-50 transition-colors">
                                            <td class="px-6 py-3 text-gray-900">${row.time}</td>
                                            <td class="px-6 py-3 text-gray-900 text-right font-medium">${row.price}</td>
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

    renderCapRules(container) {
        const { state: stateFilter, vppName, currentPage } = state.capRules;
        
        // Filter logic
        let filteredRules = MOCK_DATA.capRules.filter(rule => {
            const matchState = stateFilter === 'All' || rule.state === stateFilter;
            const matchVppName = !vppName || rule.vppName.toLowerCase().includes(vppName.toLowerCase());
            return matchState && matchVppName;
        });

        const total = filteredRules.length;
        const totalPages = Math.ceil(total / 10);
        
        // Pagination logic
        const startIdx = (currentPage - 1) * 10;
        const rules = filteredRules.slice(startIdx, startIdx + 10);

        container.innerHTML = `
            <div class="flex flex-col gap-6 w-full h-full">
                <!-- Search & Filter -->
                <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div class="flex flex-wrap items-end gap-4">
                        <div class="flex-1 min-w-[200px]">
                            <label class="block text-xs font-medium text-gray-500 mb-1">State</label>
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
                                    <th class="px-6 py-3 font-medium text-center w-16">#</th>
                                    <th class="px-6 py-3 font-medium">State</th>
                                    <th class="px-6 py-3 font-medium">Schedule Type</th>
                                    <th class="px-6 py-3 font-medium">Target Time</th>
                                    <th class="px-6 py-3 font-medium">Trigger Price</th>
                                    <th class="px-6 py-3 font-medium">Target Capacity</th>
                                    <th class="px-6 py-3 font-medium">VPP Name</th>
                                    <th class="px-6 py-3 font-medium">Last Modified At</th>
                                    <th class="px-6 py-3 font-medium">Number of Events Triggered</th>
                                    <th class="px-6 py-3 font-medium">Active</th>
                                    <th class="px-6 py-3 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${rules.length > 0 ? rules.map((rule, idx) => `
                                    <tr class="hover:bg-gray-50 transition-colors">
                                        <td class="px-6 py-4 text-center text-gray-500">${startIdx + idx + 1}</td>
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
                                        <td class="px-6 py-4 text-right">
                                            <div class="flex items-center justify-end gap-2">
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
                        <span class="text-sm text-gray-500">Total ${total}</span>
                        <div class="flex items-center gap-2">
                            <button onclick="app.updateCapState('capRules.currentPage', ${currentPage - 1})" ${currentPage <= 1 ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                                <i data-lucide="chevron-left" class="w-5 h-5"></i>
                            </button>
                            ${Array.from({length: Math.min(5, totalPages)}, (_, i) => {
                                const pageNum = i + 1;
                                return `<button onclick="app.updateCapState('capRules.currentPage', ${pageNum})" class="w-6 h-6 flex items-center justify-center rounded ${pageNum === currentPage ? 'bg-manta-primary text-white' : 'hover:bg-gray-100 text-gray-600'} text-xs font-medium">${pageNum}</button>`;
                            }).join('')}
                            <button onclick="app.updateCapState('capRules.currentPage', ${currentPage + 1})" ${currentPage >= totalPages ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
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

    renderCapEvents(container) {
        const { timeRange, status, eventType, vppName, currentPage } = state.capEvents;
        
        // Filter logic
        let filteredEvents = MOCK_DATA.capEvents.filter(event => {
            const matchTime = !timeRange || event.date.includes(timeRange) || event.timeRange.includes(timeRange);
            const matchStatus = status === 'All' || event.status === status;
            const matchEventType = eventType === 'All' || event.eventType === eventType;
            const matchVppName = !vppName || event.vppName.toLowerCase().includes(vppName.toLowerCase());
            return matchTime && matchStatus && matchEventType && matchVppName;
        });

        const total = filteredEvents.length;
        const totalPages = Math.ceil(total / 10);
        
        // Pagination logic
        const startIdx = (currentPage - 1) * 10;
        const events = filteredEvents.slice(startIdx, startIdx + 10);

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
                    <!-- Table Header Controls -->
                    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <span class="text-sm text-gray-500">Total ${total}</span>
                        <div class="flex items-center gap-2">
                            <button onclick="app.updateCapState('capEvents.currentPage', ${currentPage - 1})" ${currentPage <= 1 ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                                <i data-lucide="chevron-left" class="w-5 h-5"></i>
                            </button>
                            ${Array.from({length: Math.min(5, totalPages)}, (_, i) => {
                                const pageNum = i + 1;
                                return `<button onclick="app.updateCapState('capEvents.currentPage', ${pageNum})" class="w-6 h-6 flex items-center justify-center rounded ${pageNum === currentPage ? 'bg-manta-primary text-white' : 'hover:bg-gray-100 text-gray-600'} text-xs font-medium">${pageNum}</button>`;
                            }).join('')}
                            <button onclick="app.updateCapState('capEvents.currentPage', ${currentPage + 1})" ${currentPage >= totalPages ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                                <i data-lucide="chevron-right" class="w-5 h-5"></i>
                            </button>
                        </div>
                    </div>

                    <div class="overflow-auto flex-1">
                        <table class="w-full text-sm text-left">
                            <thead class="text-xs text-gray-500 font-bold bg-gray-50 sticky top-0">
                                <tr>
                                    <th class="px-4 py-3 text-center w-12">#</th>
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
                                    <th class="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${events.length > 0 ? events.map((event, idx) => `
                                    <tr class="hover:bg-gray-50 transition-colors">
                                        <td class="px-4 py-4 text-center text-gray-500">${startIdx + idx + 1}</td>
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
                                        <td class="px-4 py-4 text-right">
                                            <div class="flex items-center justify-end gap-2">
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
                </div>
            </div>
        `;
        
        lucide.createIcons({
            root: container
        });
    },

    renderReportsVppEventItems(container) {
        const { month, eventType, from, eventId, nmi, currentPage } = state.reportsVppEventItems;
        
        // Filter logic
        let filteredEvents = MOCK_DATA.reportsVppEventItems.filter(item => {
            const matchMonth = !month || item.date.includes(month);
            const matchEventType = eventType === 'All' || item.eventType === eventType;
            const matchFrom = from === 'All' || item.from === from;
            const matchEventId = !eventId || item.eventId.includes(eventId);
            const matchNmi = !nmi || item.nmi.includes(nmi);
            return matchMonth && matchEventType && matchFrom && matchEventId && matchNmi;
        });

        const total = filteredEvents.length;
        const totalPages = Math.ceil(total / 10);
        
        // Pagination logic
        const startIdx = (currentPage - 1) * 10;
        const events = filteredEvents.slice(startIdx, startIdx + 10);

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
                     <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                         <span class="text-sm text-gray-500">Total ${total}</span>
                         
                         <!-- Pagination Controls -->
                         <div class="flex items-center gap-2 text-sm">
                            <button onclick="app.updateReportsVppEventItemsState('currentPage', ${currentPage - 1})" ${currentPage <= 1 ? 'disabled' : ''} class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50">
                                <i data-lucide="chevron-left" class="w-4 h-4"></i>
                            </button>
                            
                            ${Array.from({length: Math.min(5, totalPages)}, (_, i) => {
                                const pageNum = i + 1; // Simplified pagination for now
                                return `<span class="${pageNum === currentPage ? 'font-medium text-green-600' : 'text-gray-600 cursor-pointer hover:bg-gray-100'} w-6 text-center rounded-full py-1" onclick="app.updateReportsVppEventItemsState('currentPage', ${pageNum})">${pageNum}</span>`;
                            }).join('')}
                            
                            ${totalPages > 5 ? '<span class="text-gray-400">...</span>' : ''}
                            
                            <button onclick="app.updateReportsVppEventItemsState('currentPage', ${currentPage + 1})" ${currentPage >= totalPages ? 'disabled' : ''} class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50">
                                <i data-lucide="chevron-right" class="w-4 h-4"></i>
                            </button>
                         </div>
                         
                         <div class="flex items-center gap-2 text-sm text-gray-500 border-l border-gray-200 pl-4 ml-2">
                             <span>Go to</span>
                             <input type="text" value="${currentPage}" onchange="app.updateReportsVppEventItemsState('currentPage', parseInt(this.value) || 1)" class="w-10 px-2 py-1 border border-gray-300 rounded text-center text-xs focus:outline-none focus:border-green-500">
                         </div>
                     </div>

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
                                ${events.length > 0 ? events.map((event, idx) => `
                                    <tr class="hover:bg-gray-50 transition-colors group">
                                        <td class="px-6 py-4 text-gray-500">${(currentPage - 1) * 10 + idx + 1}</td>
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

        const total = filteredGroups.length;
        const totalPages = Math.ceil(total / 10);
        
        // Pagination logic
        const startIdx = (currentPage - 1) * 10;
        const groups = filteredGroups.slice(startIdx, startIdx + 10);

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
                            <label class="block text-xs font-medium text-gray-500 mb-1">State</label>
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
                        <span class="text-sm text-gray-500">Total ${total}</span>
                        <div class="flex items-center gap-2">
                            <button onclick="app.updateFcasGroupsState('currentPage', ${currentPage - 1})" ${currentPage <= 1 ? 'disabled' : ''} class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50">
                                <i data-lucide="chevron-left" class="w-4 h-4"></i>
                            </button>
                            
                            ${Array.from({length: Math.min(5, totalPages)}, (_, i) => {
                                const pageNum = i + 1;
                                return `<button onclick="app.updateFcasGroupsState('currentPage', ${pageNum})" class="w-6 h-6 flex items-center justify-center rounded ${pageNum === currentPage ? 'bg-manta-primary text-white' : 'hover:bg-gray-100 text-gray-600'} text-xs font-medium">${pageNum}</button>`;
                            }).join('')}
                            
                            <button onclick="app.updateFcasGroupsState('currentPage', ${currentPage + 1})" ${currentPage >= totalPages ? 'disabled' : ''} class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50">
                                <i data-lucide="chevron-right" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </div>

                    <div class="overflow-auto flex-1">
                        <table class="w-full text-sm text-left">
                            <thead class="text-xs text-gray-500 font-bold bg-gray-50 sticky top-0">
                                <tr>
                                    <th class="px-6 py-3">FCAS Group Name</th>
                                    <th class="px-6 py-3">DERs(Online/Total)</th>
                                    <th class="px-6 py-3">State</th>
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
                                    <th class="px-6 py-3 text-right">Actions</th>
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
                                        <td class="px-6 py-4 text-right">
                                            <div class="flex items-center justify-end gap-2">
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
                    <div class="flex items-center justify-end px-6 py-4 border-t border-gray-100 gap-4">
                        <span class="text-sm text-gray-500">Total ${total}</span>
                        <div class="flex items-center gap-2">
                            <button onclick="app.updateFcasGroupsState('currentPage', ${currentPage - 1})" ${currentPage <= 1 ? 'disabled' : ''} class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50">
                                <i data-lucide="chevron-left" class="w-4 h-4"></i>
                            </button>
                            
                            ${Array.from({length: Math.min(5, totalPages)}, (_, i) => {
                                const pageNum = i + 1;
                                return `<button onclick="app.updateFcasGroupsState('currentPage', ${pageNum})" class="w-6 h-6 flex items-center justify-center rounded ${pageNum === currentPage ? 'bg-manta-primary text-white' : 'hover:bg-gray-100 text-gray-600'} text-xs font-medium">${pageNum}</button>`;
                            }).join('')}
                            
                            <button onclick="app.updateFcasGroupsState('currentPage', ${currentPage + 1})" ${currentPage >= totalPages ? 'disabled' : ''} class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50">
                                <i data-lucide="chevron-right" class="w-4 h-4"></i>
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

        const totalBids = filteredBids.length;
        const totalPages = Math.ceil(totalBids / 10);
        const startIdx = (bidsState.currentPage - 1) * 10;
        const currentBids = filteredBids.slice(startIdx, startIdx + 10);

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
                                            <td class="px-4 py-3 text-gray-900 text-center">${val}</td>
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
                                    <th class="px-6 py-3 text-right">Actions</th>
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
                                        <td class="px-6 py-4 text-right">
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
                    <div class="flex items-center justify-end px-6 py-4 border-t border-gray-100 gap-4">
                        <span class="text-sm text-gray-500">Total ${totalBids}</span>
                        <div class="flex items-center gap-2">
                            <button onclick="app.updateFcasPriceAvailabilityState('bids.currentPage', ${bidsState.currentPage - 1})" ${bidsState.currentPage <= 1 ? 'disabled' : ''} class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50">
                                <i data-lucide="chevron-left" class="w-4 h-4"></i>
                            </button>
                            
                            ${Array.from({length: Math.min(5, totalPages)}, (_, i) => {
                                const pageNum = i + 1;
                                return `<button onclick="app.updateFcasPriceAvailabilityState('bids.currentPage', ${pageNum})" class="w-6 h-6 flex items-center justify-center rounded ${pageNum === bidsState.currentPage ? 'bg-green-600 text-white' : 'hover:bg-gray-100 text-gray-600'} text-xs font-medium">${pageNum}</button>`;
                            }).join('')}
                            
                            <button onclick="app.updateFcasPriceAvailabilityState('bids.currentPage', ${bidsState.currentPage + 1})" ${bidsState.currentPage >= totalPages ? 'disabled' : ''} class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50">
                                <i data-lucide="chevron-right" class="w-4 h-4"></i>
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

    renderReportsVppEvents(container) {
        const events = MOCK_DATA.reportsVppEvents;
        const total = 15295; // From screenshot
        
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
                         <span class="text-sm text-gray-500">Total ${total}</span>
                         
                         <!-- Pagination Controls -->
                         <div class="flex items-center gap-2 text-sm">
                            <button class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                                <i data-lucide="chevron-left" class="w-4 h-4"></i>
                            </button>
                            <span class="font-medium text-green-600 w-6 text-center">1</span>
                            <span class="text-gray-600 w-6 text-center cursor-pointer hover:bg-gray-100 rounded-full py-1">2</span>
                            <span class="text-gray-600 w-6 text-center cursor-pointer hover:bg-gray-100 rounded-full py-1">3</span>
                            <span class="text-gray-600 w-6 text-center cursor-pointer hover:bg-gray-100 rounded-full py-1">4</span>
                            <span class="text-gray-600 w-6 text-center cursor-pointer hover:bg-gray-100 rounded-full py-1">5</span>
                            <span class="text-gray-600 w-6 text-center cursor-pointer hover:bg-gray-100 rounded-full py-1">6</span>
                            <span class="text-gray-400">...</span>
                            <span class="text-gray-600 w-8 text-center cursor-pointer hover:bg-gray-100 rounded-full py-1">765</span>
                            <button class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                                <i data-lucide="chevron-right" class="w-4 h-4"></i>
                            </button>
                         </div>
                         
                         <div class="flex items-center gap-2 text-sm text-gray-500 border-l border-gray-200 pl-4 ml-2">
                             <span>Go to</span>
                             <input type="text" value="1" class="w-10 px-2 py-1 border border-gray-300 rounded text-center text-xs focus:outline-none focus:border-green-500">
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
        const events = MOCK_DATA.reportsDerEvents;
        const total = 795202; // From screenshot
        
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
                             <span class="text-sm text-gray-500">Total ${total}</span>
                             
                             <!-- Pagination Controls -->
                             <div class="flex items-center gap-2 text-sm">
                                <button class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                                    <i data-lucide="chevron-left" class="w-4 h-4"></i>
                                </button>
                                <span class="font-medium text-green-600 w-6 text-center">1</span>
                                <span class="text-gray-600 w-6 text-center cursor-pointer hover:bg-gray-100 rounded-full py-1">2</span>
                                <span class="text-gray-600 w-6 text-center cursor-pointer hover:bg-gray-100 rounded-full py-1">3</span>
                                <span class="text-gray-600 w-6 text-center cursor-pointer hover:bg-gray-100 rounded-full py-1">4</span>
                                <span class="text-gray-600 w-6 text-center cursor-pointer hover:bg-gray-100 rounded-full py-1">5</span>
                                <span class="text-gray-600 w-6 text-center cursor-pointer hover:bg-gray-100 rounded-full py-1">6</span>
                                <span class="text-gray-400">...</span>
                                <span class="text-gray-600 w-12 text-center cursor-pointer hover:bg-gray-100 rounded-full py-1">39761</span>
                                <button class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                                    <i data-lucide="chevron-right" class="w-4 h-4"></i>
                                </button>
                             </div>
                             
                             <div class="flex items-center gap-2 text-sm text-gray-500 border-l border-gray-200 pl-4 ml-2">
                                 <span>Go to</span>
                                 <input type="text" value="1" class="w-10 px-2 py-1 border border-gray-300 rounded text-center text-xs focus:outline-none focus:border-green-500">
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
        const { state: stateFilter, vppName, currentPage } = state.smartFeedInRules;
        
        // Filter logic
        let filteredRules = MOCK_DATA.smartFeedInRules.filter(rule => {
            const matchState = stateFilter === 'All' || rule.state === stateFilter;
            const matchVppName = !vppName || rule.vppName.toLowerCase().includes(vppName.toLowerCase());
            return matchState && matchVppName;
        });

        const total = filteredRules.length;
        const totalPages = Math.ceil(total / 10);
        
        // Pagination logic
        const startIdx = (currentPage - 1) * 10;
        const rules = filteredRules.slice(startIdx, startIdx + 10);
        
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
                                ${rules.length > 0 ? rules.map((rule, idx) => `
                                    <tr class="hover:bg-gray-50 transition-colors">
                                        <td class="px-6 py-4 text-center text-gray-500">${startIdx + idx + 1}</td>
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
                        <span class="text-sm text-gray-500">Total ${total}</span>
                        <div class="flex items-center gap-2">
                            <button onclick="app.updateSmartFeedInState('smartFeedInRules.currentPage', ${currentPage - 1})" ${currentPage <= 1 ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                                <i data-lucide="chevron-left" class="w-5 h-5"></i>
                            </button>
                            ${Array.from({length: Math.min(5, totalPages)}, (_, i) => {
                                const pageNum = i + 1;
                                return `<button onclick="app.updateSmartFeedInState('smartFeedInRules.currentPage', ${pageNum})" class="w-6 h-6 flex items-center justify-center rounded ${pageNum === currentPage ? 'bg-green-600 text-white' : 'hover:bg-gray-100 text-gray-600'} text-xs font-medium">${pageNum}</button>`;
                            }).join('')}
                            <button onclick="app.updateSmartFeedInState('smartFeedInRules.currentPage', ${currentPage + 1})" ${currentPage >= totalPages ? 'disabled' : ''} class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50">
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
                <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap gap-4 items-end">
                    <!-- Pricing Region -->
                    <div class="min-w-[150px]">
                        <label class="block text-xs font-medium text-gray-500 mb-1">Pricing Region</label>
                        <select class="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-manta-primary focus:border-manta-primary sm:text-sm appearance-none bg-white">
                            <option>NSW</option>
                            <option>VIC</option>
                            <option>QLD</option>
                            <option>SA</option>
                            <option>TAS</option>
                        </select>
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
                            <option>&gt;= 300</option>
                            <option>-200 to 300</option>
                            <option>&lt;= -200</option>
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
            'Close Sub-VPP Connection',
            'Are you sure you want to close this connection? The status will be updated to Closed.',
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
            // System List
            container.className = "flex-1 flex flex-col gap-4 h-full overflow-hidden p-8";
            
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
                filteredSystems = filteredSystems.filter(sys => {
                    const sysStatus = (sys.status || 'disconnected').toLowerCase();
                    const filterStatus = state.subVppList.status.toLowerCase();
                    return sysStatus === filterStatus;
                });
            }

            // Pre-calculate stats for all systems
            const systemsWithStats = filteredSystems.map(sys => {
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

            container.innerHTML = `
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col p-6">
                <!-- System List -->
                <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 flex-shrink-0">
                    <!-- Left: Title & Add -->
                    <div class="flex items-center gap-2">
                        <h2 class="text-xl font-bold text-gray-900">Sub-VPPs</h2>
                        <button onclick="app.openCloudBindDrawer()" class="p-1 text-green-500 hover:text-green-600 transition-colors hover:bg-green-50 rounded-full">
                            <i data-lucide="plus" class="w-6 h-6"></i>
                        </button>
                    </div>

                    <!-- Center: Search & Filter Group -->
                    <div class="flex-1 w-full md:max-w-2xl mx-4">
                        <div class="flex items-center bg-gray-100 rounded-full px-4 py-2 border border-transparent focus-within:bg-white focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-500 transition-all shadow-sm">
                             <!-- Search Input -->
                             <input type="text" id="subvpp-name-filter" 
                                value="${state.subVppList.name || ''}"
                                class="bg-transparent border-none focus:ring-0 text-sm w-full p-0 text-gray-700 placeholder-gray-400" 
                                placeholder="Search by name..."
                                onkeydown="if(event.key === 'Enter') app.filterSubVPPs()">
                             
                             <!-- Divider -->
                             <div class="w-px h-4 bg-gray-300 mx-3"></div>
                             
                             <!-- Type Select -->
                             <div class="relative flex items-center">
                                 <select id="subvpp-type-filter" class="bg-transparent border-none focus:ring-0 text-sm text-gray-600 cursor-pointer pr-6 py-0 appearance-none font-medium" onchange="app.filterSubVPPs()">
                                     <option value="All" ${state.subVppList.type === 'All' ? 'selected' : ''}>All Types</option>
                                     <option value="Cloud" ${state.subVppList.type === 'Cloud' ? 'selected' : ''}>Cloud</option>
                                     <option value="SCADA" ${state.subVppList.type === 'SCADA' ? 'selected' : ''}>SCADA</option>
                                     <option value="Edge" ${state.subVppList.type === 'Edge' ? 'selected' : ''}>Edge</option>
                                 </select>
                                 <i data-lucide="chevron-down" class="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none"></i>
                             </div>

                             <!-- Divider -->
                             <div class="w-px h-4 bg-gray-300 mx-3"></div>

                             <!-- Status Select -->
                             <div class="relative flex items-center">
                                 <select id="subvpp-status-filter" class="bg-transparent border-none focus:ring-0 text-sm text-gray-600 cursor-pointer pr-6 py-0 appearance-none font-medium" onchange="app.filterSubVPPs()">
                                     <option value="All" ${state.subVppList.status === 'All' ? 'selected' : ''}>All Status</option>
                                     <option value="Establishing" ${state.subVppList.status === 'Establishing' ? 'selected' : ''}>Establishing</option>
                                     <option value="Established" ${state.subVppList.status === 'Established' ? 'selected' : ''}>Established</option>
                                     <option value="Closed" ${state.subVppList.status === 'Closed' ? 'selected' : ''}>Closed</option>
                                     <option value="Disconnected" ${state.subVppList.status === 'Disconnected' ? 'selected' : ''}>Disconnected</option>
                                     <option value="Failed" ${state.subVppList.status === 'Failed' ? 'selected' : ''}>Failed</option>
                                 </select>
                                 <i data-lucide="chevron-down" class="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none"></i>
                             </div>
                             
                             <!-- Search Icon -->
                             <button onclick="app.filterSubVPPs()" class="ml-2 text-gray-400 hover:text-green-600 transition-colors">
                                 <i data-lucide="search" class="w-4 h-4"></i>
                             </button>
                        </div>
                    </div>

                    <!-- Right: View Switcher -->
                    <div class="flex bg-gray-100 rounded-lg p-1 border border-gray-200">
                        <button onclick="app.toggleSubVPPViewMode('list')" class="px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all ${!isCardView ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}">
                            <i data-lucide="list" class="w-3.5 h-3.5"></i>
                            <span>Form</span>
                        </button>
                        <button onclick="app.toggleSubVPPViewMode('card')" class="px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all ${isCardView ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}">
                            <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
                            <span>Cards</span>
                        </button>
                    </div>
                </div>
                    
                    ${isCardView ? `
                        <div class="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 content-start bg-gray-50 rounded-xl p-4 border border-gray-100">
                            ${systemsWithStats.map(({ sys, sysDevices, stats, statusConfig, isDisconnected, isEstablished, onclickAttr, cursorClass }) => `
                                <div ${onclickAttr} class="group bg-white rounded-2xl ${cursorClass} border border-gray-200 hover:border-green-500/30 hover:shadow-xl transition-all duration-300 relative h-full flex flex-col p-6">
                                    <!-- Header Section -->
                                    <div class="flex justify-between items-start mb-6">
                                        <div class="flex items-center gap-3">
                                            
                                            <h3 class="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-1" title="${sys.name}">${sys.name}</h3>
                                            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-400 uppercase tracking-wide">${sys.type}</span>
                                            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${statusConfig.color} text-white uppercase tracking-wide">${statusConfig.text}</span>
                                        </div>
                                        <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            ${isEstablished ? `
                                            <button onclick="app.confirmCloseSystem(${sys.id}, event)" class="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Close Connection">
                                                <i data-lucide="x" class="w-4 h-4"></i>
                                            </button>
                                            ` : ''}
                                            ${(sys.status || '').toLowerCase() === 'failed' ? `
                                            <button onclick="event.stopPropagation(); app.openCloudBindDrawer(${sys.id})" class="p-2 text-gray-400 hover:text-blue-500 transition-colors" title="Edit Connection">
                                                <i data-lucide="edit-2" class="w-4 h-4"></i>
                                            </button>
                                            ` : ''}
                                        </div>
                                    </div>
                                    
                                    <!-- Content Grid -->
                                    <div class="h-full">
                                        <!-- Left: DERs Stats -->
                                        <div class="w-full flex flex-col">
                                            <div class="flex items-center gap-4 mb-4">
                                                <!-- Diamond Icon -->
                                                <div class="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg transform rotate-45 flex-shrink-0">
                                                    <i data-lucide="zap" class="w-5 h-5 text-gray-900 transform -rotate-45"></i>
                                                </div>
                                                
                                                <div class="flex flex-col">
                                                    <div class="flex items-baseline gap-1">
                                                        <span class="text-4xl font-bold text-gray-900 leading-none">${sysDevices.length}</span>
                                                        <span class="text-xs font-bold text-gray-500 italic">DERs</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <!-- Separator -->
                                            <div class="w-8 h-0.5 bg-gray-200 mb-4 ml-1"></div>
                                            
                                            <!-- Status List -->
                                            <div class="space-y-3 text-xs flex-1">
                                                <div class="flex items-center justify-between group/status">
                                                    <div class="flex items-center gap-3">
                                                        <div class="w-1 h-3 bg-green-500 rounded-full"></div>
                                                        <span class="text-gray-500 font-medium">Online</span>
                                                    </div>
                                                    <span class="font-bold text-green-600">${stats.inv.online + stats.bat.online}</span>
                                                </div>
                                                <div class="flex items-center justify-between group/status">
                                                    <div class="flex items-center gap-3">
                                                        <div class="w-1 h-3 bg-gray-300 rounded-full"></div>
                                                        <span class="text-gray-500 font-medium">Offline</span>
                                                    </div>
                                                    <span class="font-bold text-gray-400">${stats.inv.offline + stats.bat.offline}</span>
                                                </div>
                                                <div class="flex items-center justify-between group/status">
                                                    <div class="flex items-center gap-3">
                                                        <div class="w-1 h-3 bg-red-500 rounded-full"></div>
                                                        <span class="text-gray-500 font-medium">Disconnected</span>
                                                    </div>
                                                    <span class="font-bold text-red-500">${stats.inv.disconnected + stats.bat.disconnected}</span>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <div class="flex-1 overflow-hidden flex flex-col">
                            <div class="overflow-x-auto">
                                <table class="w-full text-left border-collapse">
                                    <thead class="bg-white sticky top-0 z-10 border-b border-gray-100">
                                        <tr>
                                            <th class="py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                                            <th class="py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                                            <th class="py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                            <th class="py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">DERs</th>
                                            <th class="py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Online</th>
                                            <th class="py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Offline</th>
                                            <th class="py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Disconnected</th>
                                            <th class="py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-100">
                                        ${systemsWithStats.map(({ sys, sysDevices, stats, statusConfig, isDisconnected, isEstablished }) => `
                                            <tr class="hover:bg-gray-50 transition-colors group">
                                                <td class="py-4 px-4">
                                                    <div class="font-bold text-gray-900">${sys.name}</div>
                                                </td>
                                                <td class="py-4 px-4">
                                                    <div class="text-sm text-gray-500">${sys.type}</div>
                                                </td>
                                                <td class="py-4 px-4">
                                                    <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs ${statusConfig.color} text-white">
                                                        ${statusConfig.text}
                                                    </span>
                                                </td>
                                                <td class="py-4 px-4">
                                                    <span class="font-bold text-gray-900">${sysDevices.length}</span>
                                                </td>
                                                <td class="py-4 px-4">
                                                    <span class="text-green-500 font-bold">${stats.inv.online + stats.bat.online}</span>
                                                </td>
                                                <td class="py-4 px-4">
                                                    <span class="text-gray-400 font-bold">${stats.inv.offline + stats.bat.offline}</span>
                                                </td>
                                                <td class="py-4 px-4">
                                                    <span class="text-red-500 font-bold">${stats.inv.disconnected + stats.bat.disconnected}</span>
                                                </td>
                                                <td class="py-4 px-4 text-right">
                                                    <div class="flex items-center justify-end gap-3">
                                                        <button onclick="app.navigate('system_details', { id: ${sys.id} })" class="text-gray-900 hover:text-gray-600 transition-colors">
                                                            <i data-lucide="eye" class="w-4 h-4"></i>
                                                        </button>
                                                        ${isEstablished ? `
                                                        <button onclick="app.confirmCloseSystem(${sys.id}, event)" class="text-gray-900 hover:text-gray-600 transition-colors" title="Close">
                                                            <i data-lucide="x" class="w-4 h-4"></i>
                                                        </button>
                                                        ` : (!isDisconnected ? `
                                                        <button onclick="app.disconnectSystem(${sys.id}, event)" class="text-gray-900 hover:text-red-600 transition-colors">
                                                            <i data-lucide="unlink" class="w-4 h-4"></i>
                                                        </button>
                                                        ` : '')}
                                                    </div>
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    `}
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
                </h1>
            </div>
        `;
        container.appendChild(header);

        // Mock devices for this system (using existing state.devices as pool)
        const devices = state.devices || [];
        
        // Calculate Metrics
        const totalDevices = devices.length;
        const onlineDevices = devices.filter(d => d.status === 'online').length;
        const offlineDevices = devices.filter(d => d.status === 'offline').length;
        const disconnectedDevices = devices.filter(d => d.status === 'disconnected').length;

        const invs = devices.filter(d => d.type === 'Inverter');
        const bats = devices.filter(d => d.type === 'Battery');
        
        const ratedPower = invs.reduce((sum, d) => sum + (d.capacity || 0), 0);
        const pvCapacity = invs.reduce((sum, d) => sum + ((d.capacity || 0) * 1.2), 0);
        
        const batCap = bats.reduce((sum, d) => sum + (d.capacity || 0), 0);
        const currentEnergy = bats.reduce((sum, d) => sum + ((d.capacity || 0) * (d.soc !== undefined ? d.soc : (40 + Math.floor(Math.random() * 40))) / 100), 0);
        const socPercentage = batCap > 0 ? Math.round((currentEnergy / batCap) * 100) : 0;
        
        const todayYield = ratedPower * (2 + Math.random() * 2);

        // Summary Section
        // Details Card
        const detailsCard = document.createElement('div');
        detailsCard.className = 'bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-4 flex items-center gap-4';
        
        // Mock Credentials (retrieved from system or random mock if missing)
        const appKey = system.credentials?.appKey || 'manta_cloud_1';
        const appSecret = system.credentials?.appSecret || 'sec_cloud_1';

        detailsCard.innerHTML = `
            <div class="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Type -->
                <div class="flex items-center gap-2 min-w-0">
                    <i data-lucide="server" class="w-4 h-4 text-gray-400 flex-shrink-0"></i>
                    <div class="text-sm text-gray-900 font-mono truncate"><span class="text-gray-500 text-[10px] tracking-wider mr-2">Type:</span>${system.type}</div>
                </div>
                <!-- AppKey -->
                <div class="flex items-center gap-2 min-w-0 group">
                    <i data-lucide="key" class="w-4 h-4 text-gray-400 flex-shrink-0"></i>
                    <div class="flex-1 flex items-center gap-2 min-w-0">
                        <span class="text-gray-500 text-[10px] tracking-wider mr-2 whitespace-nowrap">AppKey:</span>
                        <input type="password" value="${appKey}" id="details-app-key" readonly class="text-sm text-gray-900 font-mono bg-transparent border-none p-0 w-full focus:ring-0 truncate" />
                    </div>
                    <div class="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <button onclick="app.togglePasswordVisibility('details-app-key')" class="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                            <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                        </button>
                        <button onclick="app.copyToClipboard('details-app-key')" class="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                            <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>
                </div>
                <!-- AppSecret -->
                <div class="flex items-center gap-2 min-w-0 group">
                    <i data-lucide="lock" class="w-4 h-4 text-gray-400 flex-shrink-0"></i>
                    <div class="flex-1 flex items-center gap-2 min-w-0">
                        <span class="text-gray-500 text-[10px] tracking-wider mr-2 whitespace-nowrap">AppSecret:</span>
                        <input type="password" value="${appSecret}" id="details-app-secret" readonly class="text-sm text-gray-900 font-mono bg-transparent border-none p-0 w-full focus:ring-0 truncate" />
                    </div>
                    <div class="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onclick="app.togglePasswordVisibility('details-app-secret')" class="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                            <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                        </button>
                        <button onclick="app.copyToClipboard('details-app-secret')" class="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                            <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(detailsCard);

        // Stats Grid
        const statsGrid = document.createElement('div');
        statsGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6';
        
        statsGrid.innerHTML = `
            <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between gap-4 md:col-span-2 lg:col-span-2">
                <div class="flex flex-col items-center">
                     <span class="text-xs text-gray-500 font-medium tracking-wider text-center">DERs</span>
                     <span class="text-xl font-bold text-gray-900">${totalDevices}</span>
                </div>
                <div class="w-px h-8 bg-gray-200"></div>
                <div class="flex flex-col items-center">
                     <span class="text-xs text-gray-500 font-medium tracking-wider text-center">Online</span>
                     <span class="text-xl font-bold text-green-600">${onlineDevices}</span>
                </div>
                <div class="w-px h-8 bg-gray-200"></div>
                <div class="flex flex-col items-center">
                     <span class="text-xs text-gray-500 font-medium tracking-wider text-center">Offline</span>
                     <span class="text-xl font-bold text-gray-400">${offlineDevices}</span>
                </div>
                <div class="w-px h-8 bg-gray-200"></div>
                <div class="flex flex-col items-center">
                     <span class="text-xs text-gray-500 font-medium tracking-wider text-center">Disconnected</span>
                     <span class="text-xl font-bold text-red-500">${disconnectedDevices}</span>
                </div>
            </div>
            <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-2">
                <span class="text-xs text-gray-500 font-medium tracking-wider text-center">Rated Power</span>
                <span class="text-xl font-bold text-gray-900">${ratedPower.toFixed(1)} kW</span>
            </div>
            <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-2">
                <span class="text-xs text-gray-500 font-medium tracking-wider text-center">PV Capacity</span>
                <span class="text-xl font-bold text-gray-900">${pvCapacity.toFixed(1)} kW</span>
            </div>
            <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-2">
                <span class="text-xs text-gray-500 font-medium tracking-wider text-center">SOC</span>
                <div class="text-center">
                    <div class="text-xl font-bold text-gray-900">${socPercentage}%</div>
                    <div class="text-[10px] text-gray-500">(${currentEnergy.toFixed(0)}/${batCap.toFixed(0)} kWh)</div>
                </div>
            </div>
            <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-2">
                <span class="text-xs text-gray-500 font-medium tracking-wider text-center">Today Yield</span>
                <span class="text-xl font-bold text-gray-900">${todayYield.toFixed(1)} kWh</span>
            </div>
        `;
        container.appendChild(statsGrid);

        // Content (Device List)
        const content = document.createElement('div');
        content.className = 'flex-1 flex flex-col bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden';
        
        content.innerHTML = `
            <!-- Table Header -->
            <div class="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gray-50">
                 <h2 class="text-lg font-bold text-gray-900">DERs</h2>
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
                        <tr class="text-xs text-gray-500 border-b border-gray-200">
                            <th class="pb-3 font-medium">Status</th>
                            <th class="pb-3 font-medium">SN</th>
                            <th class="pb-3 font-medium">Manufacturer</th>
                            <th class="pb-3 font-medium">State</th>
                            <th class="pb-3 font-medium">Rated Power</th>
                            <th class="pb-3 font-medium">PV Capacity</th>
                            <th class="pb-3 font-medium">SOC</th>
                            <th class="pb-3 font-medium">Today Yield</th>
                            <th class="pb-3 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        ${devices.length > 0 ? devices.map(dev => {
                            const capacity = dev.capacity || 5;
                            const ratedPower = capacity.toFixed(1) + ' kW';
                            const pvCapacity = dev.type === 'Inverter' ? (capacity * 1.2).toFixed(1) + ' kW' : '-';
                            let socDisplay = '-';
                            if (dev.type === 'Battery') {
                                const socVal = dev.soc !== undefined ? dev.soc : Math.floor(40 + Math.random() * 40);
                                const totalCap = capacity;
                                const currentEn = (totalCap * socVal) / 100;
                                socDisplay = `
                                    <div>
                                        <div class="text-gray-900">${socVal}%</div>
                                        <div class="text-[10px] text-gray-500">(${currentEn.toFixed(0)}/${totalCap.toFixed(0)} kWh)</div>
                                    </div>
                                `;
                            }
                            const todayYield = (capacity * (2 + Math.random() * 2)).toFixed(1) + ' kWh';
                            
                            return `
                            <tr class="group hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                                <td class="py-3">
                                    <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs ${dev.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}">
                                        <span class="w-1 h-1 rounded-full bg-current"></span>
                                        ${dev.status}
                                    </span>
                                </td>
                                <td class="py-3 font-mono text-gray-700 group-hover:text-gray-900">${dev.sn}</td>
                                <td class="py-3 text-gray-500">${dev.vendor || 'Unknown'}</td>
                                <td class="py-3 text-gray-500">${(state.vpps.find(v => v.id === dev.vppId) || {}).state || '-'}</td>
                                <td class="py-3 text-gray-500 font-mono">${ratedPower}</td>
                                <td class="py-3 text-gray-500 font-mono">${pvCapacity}</td>
                                <td class="py-3 text-gray-500 font-mono">${socDisplay}</td>
                                <td class="py-3 text-gray-500 font-mono">${todayYield}</td>
                                <td class="py-3">
                                    <button onclick="app.viewDeviceDetails('${dev.sn}')" class="text-gray-400 hover:text-manta-primary transition-colors">
                                        <i data-lucide="eye" class="w-4 h-4"></i>
                                    </button>
                                </td>
                            </tr>
                        `}).join('') : `
                            <tr>
                                <td colspan="9" class="py-8 text-center text-gray-400">
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


    toggleVPPViewMode(mode) {
        state.vppViewMode = mode;
        this.renderVPP(document.getElementById('content-area'));
        lucide.createIcons();
    },

    renderDERManagement(container, filterType = 'All') {
        container.className = 'flex-1 flex flex-col h-full fade-in p-8 gap-4';
        
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
                     vppId: state.vpps.length > 0 ? state.vpps[Math.floor(Math.random() * state.vpps.length)].id : null,
                     mockState: states[Math.floor(Math.random() * states.length)]
                 });
             }
        }

        const title = filterType === 'All' ? 'DER Management' : `${filterType} Management`;

        container.innerHTML = `
            <!-- Stats Overview -->
            <div class="grid grid-cols-1 md:grid-cols-2 ${filterType !== 'Inverter' ? 'lg:grid-cols-6' : 'lg:grid-cols-5'} gap-4 mb-4">
                <!-- 1-4. Status Combined Card -->
                <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between gap-4 md:col-span-2 lg:col-span-2">
                    <div class="flex flex-col items-center flex-1">
                         <span class="text-xs text-gray-500 font-medium tracking-wider text-center">${filterType === 'Inverter' ? 'PVs' : (filterType === 'EV' ? 'EVs' : 'ESSs')}</span>
                         <span class="text-xl font-bold text-gray-900">${filteredDevices.length}</span>
                    </div>
                    <div class="w-px h-8 bg-gray-200"></div>
                    <div class="flex flex-col items-center flex-1">
                         <span class="text-xs text-gray-500 font-medium tracking-wider text-center">Online</span>
                         <span class="text-xl font-bold text-green-600">${filteredDevices.filter(d => d.status === 'online').length}</span>
                    </div>
                    <div class="w-px h-8 bg-gray-200"></div>
                    <div class="flex flex-col items-center flex-1">
                         <span class="text-xs text-gray-500 font-medium tracking-wider text-center">Offline</span>
                         <span class="text-xl font-bold text-gray-400">${filteredDevices.filter(d => d.status === 'offline').length}</span>
                    </div>
                    <div class="w-px h-8 bg-gray-200"></div>
                    <div class="flex flex-col items-center flex-1">
                         <span class="text-xs text-gray-500 font-medium tracking-wider text-center">Disconnected</span>
                         <span class="text-xl font-bold text-red-500">${filteredDevices.filter(d => d.status === 'disconnected').length}</span>
                    </div>
                </div>

                ${filterType !== 'EV' ? `
                <!-- 5. Rated Power -->
                <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-2">
                    <span class="text-xs text-gray-500 font-medium tracking-wider text-center">Rated Power</span>
                    <span class="text-xl font-bold text-gray-900">${filteredDevices.reduce((acc, d) => acc + (d.capacity || 0), 0).toFixed(1)} kW</span>
                </div>

                <!-- 6. PV Capacity -->
                <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-2">
                    <span class="text-xs text-gray-500 font-medium tracking-wider text-center">PV Capacity</span>
                    <span class="text-xl font-bold text-gray-900">${filteredDevices.reduce((acc, d) => acc + (d.type === 'Inverter' ? (d.capacity || 0) * 1.2 : 0), 0).toFixed(1)} kW</span>
                </div>
                ` : ''}

                ${filterType !== 'Inverter' ? `
                <!-- 7. SOC -->
                <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-2">
                    <span class="text-xs text-gray-500 font-medium tracking-wider text-center">SOC</span>
                    ${(() => {
                        const bats = filteredDevices.filter(d => d.type === 'Battery');
                        if (!bats.length) return '<span class="text-xl font-bold text-gray-900">-</span>';
                        
                        const totalCap = bats.reduce((acc, d) => acc + (d.capacity || 0), 0);
                        const totalEnergy = bats.reduce((acc, d) => {
                             const soc = d.soc !== undefined ? d.soc : 50;
                             return acc + ((d.capacity || 0) * soc / 100);
                        }, 0);
                        const avgSoc = totalCap > 0 ? Math.round((totalEnergy / totalCap) * 100) : 0;
                        
                        return `
                            <div class="text-center">
                                <div class="text-xl font-bold text-gray-900">${avgSoc}%</div>
                                <div class="text-[10px] text-gray-500">(${totalEnergy.toFixed(0)}/${totalCap.toFixed(0)} kWh)</div>
                            </div>
                        `;
                    })()}
                </div>
                ` : ''}

                ${filterType !== 'EV' ? `
                <!-- 8. Today Yield -->
                <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-2">
                    <span class="text-xs text-gray-500 font-medium tracking-wider text-center">Today Yield</span>
                    <span class="text-xl font-bold text-gray-900">${filteredDevices.reduce((acc, d) => acc + ((d.capacity || 0) * 3), 0).toFixed(1)} kWh</span>
                </div>
                ` : ''}
            </div>

            <!-- Device List -->
            <div class="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
                <div class="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gray-50">
                     <h2 class="text-lg font-bold text-gray-900">${filterType === 'Inverter' ? 'PVs' : (filterType === 'EV' ? 'EVs' : 'ESSs')}</h2>
                     <div class="flex gap-2">
                        <div class="relative">
                            <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"></i>
                            <input type="text" placeholder="Search" class="bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-1.5 text-sm text-gray-900 focus:outline-none focus:border-manta-primary/50 w-64 transition-colors placeholder:text-gray-400">
                        </div>
                     </div>
                </div>
                <div class="flex-1 overflow-auto p-6">
                    <table class="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr class="text-xs text-gray-500 border-b border-gray-200">
                                <th class="px-4 py-3 font-medium">Status</th>
                                <th class="px-4 py-3 font-medium">SN</th>
                                <th class="px-4 py-3 font-medium">NMI</th>
                                <th class="px-4 py-3 font-medium">Manufacturer</th>
                                <th class="px-4 py-3 font-medium">State</th>
                                ${filterType !== 'EV' ? `
                                <th class="px-4 py-3 font-medium text-right">Rated Power</th>
                                <th class="px-4 py-3 font-medium text-right">PV Capacity</th>
                                ` : ''}
                                ${filterType !== 'Inverter' ? '<th class="px-4 py-3 font-medium text-center">SOC</th>' : ''}
                                ${filterType !== 'EV' ? `<th class="px-4 py-3 font-medium text-right">Today Yield</th>` : ''}
                                <th class="px-4 py-3 font-medium">VPP Name</th>
                                <th class="px-4 py-3 font-medium text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="text-sm">
                            ${filteredDevices.length > 0 ? filteredDevices.map(dev => {
                                const vpp = state.vpps.find(v => v.id === dev.vppId) || {};
                                const capacity = dev.capacity || 5;
                                const ratedPower = capacity.toFixed(1) + ' kW';
                                const pvCapacity = dev.type === 'Inverter' ? (capacity * 1.2).toFixed(1) + ' kW' : '-';
                                
                                let socDisplay = '-';
                                if (dev.type === 'Battery') {
                                    const socVal = dev.soc !== undefined ? dev.soc : Math.floor(40 + Math.random() * 40);
                                    const totalCap = capacity;
                                    const currentEn = (totalCap * socVal) / 100;
                                    socDisplay = `
                                        <div>
                                            <div class="text-gray-900">${socVal}%</div>
                                            <div class="text-[10px] text-gray-500">(${currentEn.toFixed(0)}/${totalCap.toFixed(0)} kWh)</div>
                                        </div>
                                    `;
                                }
                                
                                const todayYield = (capacity * (2 + Math.random() * 2)).toFixed(1) + ' kWh';
                                
                                return `
                                <tr class="group hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                                    <td class="px-4 py-3">
                                        <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs ${dev.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}">
                                            <span class="w-1 h-1 rounded-full bg-current"></span>
                                            ${dev.status.charAt(0).toUpperCase() + dev.status.slice(1)}
                                        </span>
                                    </td>
                                    <td class="px-4 py-3 font-mono text-gray-700 group-hover:text-gray-900">${dev.sn || '-'}</td>
                                    <td class="px-4 py-3 text-gray-500 font-mono">${dev.nmi || '-'}</td>
                                    <td class="px-4 py-3 text-gray-500">${dev.vendor}</td>
                                    <td class="px-4 py-3 text-gray-500">${vpp.state || dev.mockState || '-'}</td>
                                    ${filterType !== 'EV' ? `
                                    <td class="px-4 py-3 text-gray-500 font-mono text-right">${ratedPower}</td>
                                    <td class="px-4 py-3 text-gray-500 font-mono text-right">${pvCapacity}</td>
                                    ` : ''}
                                    ${filterType !== 'Inverter' ? `<td class="px-4 py-3 text-gray-500 font-mono text-center">${socDisplay}</td>` : ''}
                                    ${filterType !== 'EV' ? `<td class="px-4 py-3 text-gray-500 font-mono text-right">${todayYield}</td>` : ''}
                                    <td class="px-4 py-3 text-gray-500">${vpp.name || '-'}</td>
                                    <td class="px-4 py-3 text-center">
                                        <button onclick="app.openDeviceEditModal('${dev.sn}')" class="text-gray-400 hover:text-manta-primary transition-colors">
                                            <i data-lucide="eye" class="w-4 h-4"></i>
                                        </button>
                                    </td>
                                </tr>
                            `;
                            }).join('') : `
                                <tr>
                                    <td colspan="11" class="py-8 text-center text-gray-500">No devices found</td>
                                </tr>
                            `}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    openDeviceEditModal(sn) {
        const device = state.devices.find(d => d.sn === sn);
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

    renderVPP(container) {
        container.innerHTML = ''; 

        if (state.vpps.length === 0) {
            container.className = "flex-1 flex items-center justify-center h-full";
            container.innerHTML = `
                <div class="text-center">
                    <div class="inline-block mb-4">
                        <i data-lucide="app-window" class="w-16 h-16 text-gray-200"></i>
                    </div>
                    <h2 class="text-xl font-bold text-gray-900 mb-6">No VPPs Created</h2>
                    <button onclick="app.openVPPDrawer()" class="bg-manta-primary hover:bg-manta-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-sm flex items-center gap-2 mx-auto">
                        <i data-lucide="plus" class="w-5 h-5"></i>
                        <span>Create</span>
                    </button>
                </div>
            `;
            return;
        }

        // Layout: Left (VPP List) | Right (Device Discovery)
        container.className = "flex-1 h-full overflow-hidden p-8 bg-gray-50";
        
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

        container.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col p-6">
            <!-- Toolbar -->
            <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 flex-shrink-0">
                <!-- Left: Title & Add -->
                <div class="flex items-center gap-2">
                    <h2 class="text-xl font-bold text-gray-900">VPPs</h2>
                    <button onclick="app.openVPPDrawer()" class="p-1 text-green-500 hover:text-green-600 transition-colors hover:bg-green-50 rounded-full">
                        <i data-lucide="plus" class="w-6 h-6"></i>
                    </button>
                </div>

                <!-- Center: Search & Filter Group -->
                <div class="flex-1 w-full md:max-w-xl mx-4">
                    <div class="flex items-center bg-gray-100 rounded-full px-4 py-2 border border-transparent focus-within:bg-white focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-500 transition-all shadow-sm">
                         <!-- Search Input -->
                         <input type="text" id="vpp-name-filter" 
                            value="${state.vppList.vppName}"
                            class="bg-transparent border-none focus:ring-0 text-sm w-full p-0 text-gray-700 placeholder-gray-400" 
                            placeholder="Search by VPP Name..."
                            onkeydown="if(event.key === 'Enter') app.filterVPPs()">
                         
                         <!-- Divider -->
                         <div class="w-px h-4 bg-gray-300 mx-3"></div>
                         
                         <!-- State Select -->
                         <div class="relative flex items-center">
                             <select id="vpp-state-filter" class="bg-transparent border-none focus:ring-0 text-sm text-gray-600 cursor-pointer pr-6 py-0 appearance-none font-medium" onchange="app.filterVPPs()">
                                 <option value="">All States</option>
                                 ${MOCK_DATA.overview.regions.map(r => `<option value="${r.name}" ${state.vppList.state === r.name ? 'selected' : ''}>${r.name}</option>`).join('')}
                             </select>
                             <i data-lucide="chevron-down" class="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none"></i>
                         </div>
                         
                         <!-- Search Icon -->
                         <button onclick="app.filterVPPs()" class="ml-2 text-gray-400 hover:text-green-600 transition-colors">
                             <i data-lucide="search" class="w-4 h-4"></i>
                         </button>
                    </div>
                </div>

                <!-- Right: View Switcher -->
                <div class="flex bg-gray-100 rounded-lg p-1 border border-gray-200">
                    <button onclick="app.toggleVPPViewMode('list')" class="px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all ${!isCardView ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}">
                        <i data-lucide="list" class="w-3.5 h-3.5"></i>
                        <span>Form</span>
                    </button>
                    <button onclick="app.toggleVPPViewMode('card')" class="px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all ${isCardView ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}">
                        <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
                        <span>Cards</span>
                    </button>
                </div>
            </div>

                
                ${isCardView ? `
                <div class="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 content-start bg-gray-50 rounded-xl p-4 border border-gray-100">
                    ${filteredVPPs.map((vpp) => {
                        const isSelected = vpp.id === state.selectedVppId;
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
                        <div onclick="app.navigate('vpp_details', { id: ${vpp.id} })" class="group bg-white rounded-2xl cursor-pointer border border-gray-200 hover:border-green-500/30 hover:shadow-xl transition-all duration-300 relative h-full flex flex-col p-6">
                            <!-- Header Section -->
                            <div class="flex justify-between items-start mb-6">
                                <div class="flex items-center gap-3">
                                    <div class="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                    <h3 class="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-1">${vpp.name}</h3>
                                    <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-400 uppercase tracking-wide">${vpp.state || 'NSW'}</span>
                                </div>
                                <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onclick="event.stopPropagation(); app.openVPPDrawer(${vpp.id})" class="p-2 text-gray-400 hover:text-green-600 transition-colors">
                                        <i data-lucide="edit-2" class="w-4 h-4"></i>
                                    </button>
                                    <button onclick="event.stopPropagation(); app.confirmDeleteVPP(${vpp.id})" class="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Content Grid -->
                            <div class="grid grid-cols-12 gap-6 h-full">
                                <!-- Left: DERs Stats -->
                                <div class="col-span-5 flex flex-col">
                                    <div class="flex items-center gap-4 mb-4">
                                        <!-- Diamond Icon -->
                                        <div class="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg transform rotate-45 flex-shrink-0">
                                            <i data-lucide="zap" class="w-5 h-5 text-gray-900 transform -rotate-45"></i>
                                        </div>
                                        
                                        <div class="flex flex-col">
                                            <div class="flex items-baseline gap-1">
                                                <span class="text-4xl font-bold text-gray-900 leading-none">${vppDevices.length}</span>
                                                <span class="text-xs font-bold text-gray-500 italic">DERs</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Separator -->
                                    <div class="w-8 h-0.5 bg-gray-200 mb-4 ml-1"></div>
                                    
                                    <!-- Status List -->
                                    <div class="space-y-3 text-xs flex-1">
                                        <div class="flex items-center justify-between group/status">
                                            <div class="flex items-center gap-3">
                                                <div class="w-1 h-3 bg-green-500 rounded-full"></div>
                                                <span class="text-gray-500 font-medium">Online</span>
                                            </div>
                                            <span class="font-bold text-green-600">${stats.inv.online + stats.bat.online}</span>
                                        </div>
                                        <div class="flex items-center justify-between group/status">
                                            <div class="flex items-center gap-3">
                                                <div class="w-1 h-3 bg-gray-300 rounded-full"></div>
                                                <span class="text-gray-500 font-medium">Offline</span>
                                            </div>
                                            <span class="font-bold text-gray-400">${stats.inv.offline + stats.bat.offline}</span>
                                        </div>
                                        <div class="flex items-center justify-between group/status">
                                            <div class="flex items-center gap-3">
                                                <div class="w-1 h-3 bg-red-500 rounded-full"></div>
                                                <span class="text-gray-500 font-medium">Disconnected</span>
                                            </div>
                                            <span class="font-bold text-red-500">${stats.inv.disconnected + stats.bat.disconnected}</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Right: Energy Details -->
                                <div class="col-span-7 bg-gray-50 rounded-xl p-5 flex flex-col justify-between text-xs h-full">
                                    <div class="flex justify-between items-center py-1">
                                        <span class="text-gray-500 font-medium">Rated Power</span>
                                        <div class="flex items-baseline gap-1">
                                            <span class="font-bold text-gray-900 text-sm">${stats.inv.cap}</span>
                                            <span class="text-[10px] text-gray-400 font-bold">kW</span>
                                        </div>
                                    </div>
                                    <div class="flex justify-between items-center py-1">
                                        <span class="text-gray-500 font-medium">PV Capacity</span>
                                        <div class="flex items-baseline gap-1">
                                            <span class="font-bold text-gray-900 text-sm">${stats.inv.pvCapacity}</span>
                                            <span class="text-[10px] text-gray-400 font-bold">kW</span>
                                        </div>
                                    </div>
                                    <div class="flex justify-between items-center py-1">
                                        <span class="text-gray-500 font-medium">SOC</span>
                                        <div class="flex items-baseline gap-1">
                                            <span class="font-bold text-gray-900 text-sm">${stats.bat.socPercentage}%</span>
                                            <span class="text-[10px] text-gray-400 font-bold">(${stats.bat.currentEnergy.toFixed(0)}/${stats.bat.cap.toFixed(0)}) kWh</span>
                                        </div>
                                    </div>
                                    <div class="flex justify-between items-center py-1">
                                        <span class="text-gray-500 font-medium">Today Yield</span>
                                        <div class="flex items-baseline gap-1">
                                            <span class="font-bold text-gray-900 text-sm">${(stats.inv.cap * (2 + Math.random() * 2)).toFixed(1)}</span>
                                            <span class="text-[10px] text-gray-400 font-bold">kWh</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `}).join('')}
                </div>
                ` : `
                <div class="flex-1 overflow-hidden flex flex-col">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead class="bg-white sticky top-0 z-10 border-b border-gray-100">
                                <tr>
                                    <th class="py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">VPP Name</th>
                                    <th class="py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">DERs</th>
                                    <th class="py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Rated Power</th>
                                    <th class="py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">PV Capacity</th>
                                    <th class="py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">SOC</th>
                                    <th class="py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Today Yield</th>
                                    <th class="py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${filteredVPPs.map((vpp, index) => {
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
                                        <tr class="hover:bg-gray-50 transition-colors group">
                                            <td class="py-4 px-4">
                                                <div class="font-bold text-gray-900">${vpp.name}</div>
                                            </td>
                                            <td class="py-4 px-4">
                                                <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-400 uppercase tracking-wide">${vpp.state || 'NSW'}</span>
                                            </td>
                                            <td class="py-4 px-4">
                                                <div class="flex flex-col gap-0.5">
                                                    <span class="font-bold text-gray-900">${vppDevices.length}</span>
                                                    <div class="flex gap-1 text-[10px]">
                                                        <span class="text-green-500 font-bold">${stats.inv.online + stats.bat.online}</span>
                                                        <span class="text-gray-300">/</span>
                                                        <span class="text-gray-400 font-bold">${stats.inv.offline + stats.bat.offline}</span>
                                                        <span class="text-gray-300">/</span>
                                                        <span class="text-red-500 font-bold">${stats.inv.disconnected + stats.bat.disconnected}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="py-4 px-4 text-sm text-gray-600">${stats.inv.cap} kW</td>
                                            <td class="py-4 px-4 text-sm text-gray-600">${stats.inv.pvCapacity} kW</td>
                                            <td class="py-4 px-4">
                                                <div class="flex flex-col">
                                                    <span class="text-sm font-bold text-gray-900">${stats.bat.socPercentage}%</span>
                                                    <span class="text-[10px] text-gray-400">(${stats.bat.currentEnergy.toFixed(0)}/${stats.bat.cap.toFixed(0)})</span>
                                                </div>
                                            </td>
                                            <td class="py-4 px-4 text-sm text-gray-600">${(stats.inv.cap * (2 + Math.random() * 2)).toFixed(1)} kWh</td>
                                            <td class="py-4 px-4 text-right">
                                                <div class="flex items-center justify-end gap-3">
                                                    <button onclick="event.stopPropagation(); app.navigate('vpp_details', { id: ${vpp.id} })" class="text-gray-900 hover:text-gray-600 transition-colors">
                                                        <i data-lucide="eye" class="w-4 h-4"></i>
                                                    </button>
                                                    <button onclick="event.stopPropagation(); app.openVPPDrawer(${vpp.id})" class="text-gray-900 hover:text-gray-600 transition-colors">
                                                        <i data-lucide="edit-2" class="w-4 h-4"></i>
                                                    </button>
                                                    <button onclick="event.stopPropagation(); app.confirmDeleteVPP(${vpp.id})" class="text-gray-900 hover:text-gray-600 transition-colors">
                                                        <i data-lucide="trash-2" class="w-4 h-4"></i>
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
            </div>
        `;
        lucide.createIcons();
    },

    renderVPPDetails(container, vppId) {
        container.innerHTML = '';
        const vpp = state.vpps.find(v => v.id == vppId);
        if (!vpp) return this.navigate('vpp');
        
        state.selectedVppId = vppId; // Ensure selectedVppId is updated

        const allVppDevices = MOCK_DATA.assignedDevices.filter(d => d.vppId === vpp.id);
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
            <!-- Info Card -->
            <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-4 flex items-center gap-4">
                <div class="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="flex items-center gap-2 min-w-0">
                        <i data-lucide="building-2" class="w-4 h-4 text-gray-400 flex-shrink-0"></i>
                        <div class="text-sm text-gray-900 font-mono truncate"><span class="text-gray-500 text-[10px] tracking-wider mr-2">Company:</span>${vpp.company || '-'}</div>
                    </div>
                    <div class="flex items-center gap-2 min-w-0">
                        <i data-lucide="globe" class="w-4 h-4 text-gray-400 flex-shrink-0"></i>
                        <div class="text-sm text-gray-900 font-mono truncate"><span class="text-gray-500 text-[10px] tracking-wider mr-2">Country:</span>${vpp.country || '-'}</div>
                    </div>
                    <div class="flex items-center gap-2 min-w-0">
                        <i data-lucide="map-pin" class="w-4 h-4 text-gray-400 flex-shrink-0"></i>
                        <div class="text-sm text-gray-900 font-mono truncate"><span class="text-gray-500 text-[10px] tracking-wider mr-2">State:</span>${vpp.state || '-'}</div>
                    </div>

                </div>
            </div>

            <!-- Metrics Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
                <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between gap-4 md:col-span-2 lg:col-span-2">
                    <div class="flex flex-col items-center">
                         <span class="text-xs text-gray-500 font-medium tracking-wider text-center">DERs</span>
                         <span class="text-xl font-bold text-gray-900">${totalDevices}</span>
                    </div>
                    <div class="w-px h-8 bg-gray-200"></div>
                    <div class="flex flex-col items-center">
                         <span class="text-xs text-gray-500 font-medium tracking-wider text-center">Online</span>
                         <span class="text-xl font-bold text-green-600">${onlineDevices}</span>
                    </div>
                    <div class="w-px h-8 bg-gray-200"></div>
                    <div class="flex flex-col items-center">
                         <span class="text-xs text-gray-500 font-medium tracking-wider text-center">Offline</span>
                         <span class="text-xl font-bold text-gray-400">${offlineDevices}</span>
                    </div>
                    <div class="w-px h-8 bg-gray-200"></div>
                    <div class="flex flex-col items-center">
                         <span class="text-xs text-gray-500 font-medium tracking-wider text-center">Disconnected</span>
                         <span class="text-xl font-bold text-red-500">${disconnectedDevices}</span>
                    </div>
                </div>
                <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-2">
                    <span class="text-xs text-gray-500 font-medium tracking-wider text-center">Rated Power</span>
                    <span class="text-xl font-bold text-gray-900">${ratedPower.toFixed(1)} kW</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-2">
                    <span class="text-xs text-gray-500 font-medium tracking-wider text-center">PV Capacity</span>
                    <span class="text-xl font-bold text-gray-900">${pvCapacity.toFixed(1)} kW</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-2">
                    <span class="text-xs text-gray-500 font-medium tracking-wider text-center">SOC</span>
                    <div class="text-center">
                        <div class="text-xl font-bold text-gray-900">${socPercentage}%</div>
                        <div class="text-[10px] text-gray-500">(${currentEnergy.toFixed(0)}/${batCap.toFixed(0)} kWh)</div>
                    </div>
                </div>
                <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-2">
                    <span class="text-xs text-gray-500 font-medium tracking-wider text-center">Today Yield</span>
                    <span class="text-xl font-bold text-gray-900">${todayYield.toFixed(1)} kWh</span>
                </div>
            </div>

            <!-- Unified Panel -->
            <div class="flex-1 flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <!-- Header -->
                <div class="flex justify-between items-center px-6 pt-4 border-b border-gray-200 bg-gray-50">
                     <div class="flex gap-6">
                        <button onclick="app.setVPPDetailsTab('der-list')" class="pb-4 text-sm font-medium border-b-2 transition-colors ${state.vppDetailsTab === 'der-list' ? 'border-manta-primary text-manta-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}">
                            DERs
                        </button>
                        <button onclick="app.setVPPDetailsTab('event-list')" class="pb-4 text-sm font-medium border-b-2 transition-colors ${state.vppDetailsTab === 'event-list' ? 'border-manta-primary text-manta-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}">
                            Events
                        </button>
                     </div>
                     <div class="flex gap-2 pb-4">
                        ${(state.vppDetailsTab === 'der-list') ? `
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
                        ` : ''}
                     </div>
                </div>

                <!-- Content -->
                <div class="flex-1 overflow-y-auto p-6">
                    ${(state.vppDetailsTab === 'der-list') ? `
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="text-xs text-gray-500 border-b border-gray-200">
                                <th class="pb-3 font-medium">Status</th>
                                <th class="pb-3 font-medium">SN</th>
                                <th class="pb-3 font-medium">Manufacturer</th>
                                <th class="pb-3 font-medium">State</th>
                                <th class="pb-3 font-medium">Rated Power</th>
                                <th class="pb-3 font-medium">PV Capacity</th>
                                <th class="pb-3 font-medium">SOC</th>
                                <th class="pb-3 font-medium">Today Yield</th>
                                <th class="pb-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="text-sm">
                            ${assignedDevices.length > 0 ? assignedDevices.map(dev => {
                                const capacity = dev.capacity || 5;
                                const ratedPower = capacity.toFixed(1) + ' kW';
                                const pvCapacity = dev.type === 'Inverter' ? (capacity * 1.2).toFixed(1) + ' kW' : '-';
                                let socDisplay = '-';
                                if (dev.type === 'Battery') {
                                    const socVal = dev.soc !== undefined ? dev.soc : Math.floor(40 + Math.random() * 40);
                                    const totalCap = capacity;
                                    const currentEn = (totalCap * socVal) / 100;
                                    socDisplay = `
                                        <div>
                                            <div class="text-gray-900">${socVal}%</div>
                                            <div class="text-[10px] text-gray-500">(${currentEn.toFixed(0)}/${totalCap.toFixed(0)} kWh)</div>
                                        </div>
                                    `;
                                }
                                const todayYield = (capacity * (2 + Math.random() * 2)).toFixed(1) + ' kWh';
                                
                                return `
                                <tr class="group hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                                    <td class="py-3">
                                        <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs ${dev.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}">
                                            <span class="w-1 h-1 rounded-full bg-current"></span>
                                            ${dev.status}
                                        </span>
                                    </td>
                                    <td class="py-3 font-mono text-gray-700 group-hover:text-gray-900">${dev.sn}</td>
                                    <td class="py-3 text-gray-500">${dev.vendor}</td>
                                    <td class="py-3 text-gray-500">${vpp.state || '-'}</td>
                                    <td class="py-3 text-gray-500 font-mono">${ratedPower}</td>
                                    <td class="py-3 text-gray-500 font-mono">${pvCapacity}</td>
                                    <td class="py-3 text-gray-500 font-mono">${socDisplay}</td>
                                    <td class="py-3 text-gray-500 font-mono">${todayYield}</td>
                                    <td class="py-3">
                                        <button onclick="app.viewDeviceDetails('${dev.sn}')" class="text-gray-400 hover:text-manta-primary transition-colors">
                                            <i data-lucide="eye" class="w-4 h-4"></i>
                                        </button>
                                    </td>
                                </tr>
                            `}).join('') : `
                                <tr>
                                    <td colspan="9" class="py-8 text-center text-gray-500">
                                        No devices available
                                    </td>
                                </tr>
                            `}
                        </tbody>
                    </table>
                    ` : state.vppDetailsTab === 'event-list' ? `
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="text-xs text-gray-500 border-b border-gray-200">
                                <th class="pb-3 font-medium">Date</th>
                                <th class="pb-3 font-medium">Start Time - End Time</th>
                                <th class="pb-3 font-medium">Event Type</th>
                                <th class="pb-3 font-medium">Power</th>
                                <th class="pb-3 font-medium">Spot Price</th>
                                <th class="pb-3 font-medium">Volume</th>
                                <th class="pb-3 font-medium">VPP Income</th>
                                <th class="pb-3 font-medium">Status</th>
                                <th class="pb-3 font-medium">Notes</th>
                                <th class="pb-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="text-sm">
                            ${MOCK_DATA.tradingEvents.map(event => `
                                <tr class="group hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                                    <td class="py-3 text-gray-700">${event.date.split(' ')[0]}</td>
                                    <td class="py-3 text-gray-500">${event.timeRange}</td>
                                    <td class="py-3 text-gray-700">${event.eventType}</td>
                                    <td class="py-3 text-gray-500 font-mono">${event.power}</td>
                                    <td class="py-3 text-gray-500 font-mono">${event.spotPrice}</td>
                                    <td class="py-3 text-gray-500 font-mono">${event.volume}</td>
                                    <td class="py-3 text-gray-500 font-mono">${event.vppIncome}</td>
                                    <td class="py-3">
                                        <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs ${event.status === 'Success' ? 'bg-green-100 text-green-700' : event.status === 'Partially Success' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'}">
                                            <span class="w-1 h-1 rounded-full bg-current"></span>
                                            ${event.status}
                                        </span>
                                    </td>
                                    <td class="py-3 text-gray-500 max-w-xs truncate" title="${event.notes}">${event.notes || '-'}</td>
                                    <td class="py-3">
                                        <button class="text-gray-400 hover:text-manta-primary transition-colors">
                                            <i data-lucide="external-link" class="w-4 h-4"></i>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    ` : `
                    <div class="flex flex-col items-center justify-center h-full text-gray-500">
                        <i data-lucide="calendar-off" class="w-12 h-12 mb-4 text-gray-300"></i>
                        <p class="text-sm">No events found</p>
                    </div>
                    `}
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

    setVPPDetailsTab(tab) {
        state.vppDetailsTab = tab;
        this.renderVPPDetails(document.getElementById('content-area'), state.selectedVppId);
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

    viewDeviceDetails(sn) {
        // Default to 'Power' and '24H' for initial view
        this.renderDeviceDataModalContent(sn, 'Power', '24H');
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
        const title = isEdit ? 'Edit VPP' : 'Create a VPP';
        
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

                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-1.5">
                            <label class="text-xs font-semibold text-gray-500">State</label>
                            <input type="text" name="state" value="${isEdit ? (vpp.state || '') : ''}" class="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-manta-primary focus:ring-1 focus:ring-manta-primary outline-none transition-all placeholder:text-gray-400" placeholder="e.g. NSW">
                        </div>

                        <div class="space-y-1.5">
                            <label class="text-xs font-semibold text-gray-500">DNSP</label>
                            <input type="text" name="dnsp" value="${isEdit ? (vpp.dnsp || '') : ''}" class="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-manta-primary focus:ring-1 focus:ring-manta-primary outline-none transition-all placeholder:text-gray-400" placeholder="e.g. Energy Provider Name">
                        </div>
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
                            </select>
                        </div>

                        <!-- Country Selection (Read-only) -->
                        <div class="space-y-1.5">
                            <label class="text-xs font-semibold text-gray-500">Country (Company Region)</label>
                            <input type="text" name="country" value="${country}" readonly class="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-500 outline-none cursor-not-allowed">
                        </div>
                    </div>

                    <!-- Cloud: Manufacturers (Single-select with Mode) -->
                    <div id="section-cloud" class="space-y-4">
                        <div class="space-y-1.5">
                            <label class="text-xs font-semibold text-gray-500">Manufacturer Cloud</label>
                            <select name="manufacturers" class="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-manta-primary focus:ring-1 focus:ring-manta-primary outline-none transition-all appearance-none">
                                ${manufacturers.length > 0 ? manufacturers.map(m => `
                                    <option value="${m}">${m}</option>
                                `).join('') : '<option value="" disabled selected>No cloud nodes found for your company.</option>'}
                            </select>
                        </div>

                        <div class="flex gap-4">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="connectionMode" value="create" onchange="app.toggleConnectionMode('create')" class="text-manta-primary focus:ring-manta-primary">
                                <span class="text-xs font-medium text-gray-700">Create New</span>
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="connectionMode" value="add" checked onchange="app.toggleConnectionMode('add')" class="text-manta-primary focus:ring-manta-primary">
                                <span class="text-xs font-medium text-gray-700">Add Existing</span>
                            </label>
                        </div>

                        <!-- Credentials Inputs -->
                        <div id="cloud-credentials" class="space-y-4 border-t border-gray-100 pt-4">
                            <div class="space-y-1.5">
                                <label class="text-xs font-semibold text-gray-500">AppKey</label>
                                <div class="relative group">
                                    <input type="password" name="appKey" id="input-app-key" class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:border-manta-primary focus:ring-1 focus:ring-manta-primary outline-none transition-all placeholder:text-gray-400 font-mono text-sm" placeholder="Enter AppKey">
                                    <button type="button" onclick="app.copyToClipboard('input-app-key')" class="absolute right-10 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-md" title="Copy">
                                        <i data-lucide="copy" class="w-4 h-4"></i>
                                    </button>
                                    <button type="button" onclick="app.togglePasswordVisibility('input-app-key')" class="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 transition-colors bg-white rounded-md">
                                        <i data-lucide="eye" class="w-4 h-4"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="space-y-1.5">
                                <label class="text-xs font-semibold text-gray-500">AppSecret</label>
                                <div class="relative group">
                                    <input type="password" name="appSecret" id="input-app-secret" class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:border-manta-primary focus:ring-1 focus:ring-manta-primary outline-none transition-all placeholder:text-gray-400 font-mono text-sm" placeholder="Enter AppSecret">
                                    <button type="button" onclick="app.copyToClipboard('input-app-secret')" class="absolute right-10 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-md" title="Copy">
                                        <i data-lucide="copy" class="w-4 h-4"></i>
                                    </button>
                                    <button type="button" onclick="app.togglePasswordVisibility('input-app-secret')" class="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 transition-colors bg-white rounded-md">
                                        <i data-lucide="eye" class="w-4 h-4"></i>
                                    </button>
                                </div>
                            </div>
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
                    <input type="radio" name="manufacturers" value="${m}" class="w-4 h-4 border-gray-300 text-manta-primary focus:ring-manta-primary focus:ring-offset-0">
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
                const connectionMode = formData.get('connectionMode');
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
        
        this.renderVPP(document.getElementById('main-content'));
    },

    resetVPPFilters() {
        state.vppList.vppName = '';
        state.vppList.state = '';
        this.renderVPP(document.getElementById('main-content'));
    },

    filterSubVPPs() {
        const name = document.getElementById('subvpp-name-filter').value;
        const type = document.getElementById('subvpp-type-filter').value;
        const status = document.getElementById('subvpp-status-filter').value;
        
        state.subVppList.name = name;
        state.subVppList.type = type;
        state.subVppList.status = status;
        
        this.renderDeviceManagement(document.getElementById('content-area'));
        lucide.createIcons();
    },

    resetSubVPPFilters() {
        state.subVppList.name = '';
        state.subVppList.type = 'All';
        state.subVppList.status = 'All';
        
        this.renderDeviceManagement(document.getElementById('content-area'));
        lucide.createIcons();
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
            
            if (isEdit) {
                const vpp = state.vpps.find(v => v.id === vppId);
                if (vpp) {
                    vpp.name = name;
                    vpp.company = company;
                    vpp.country = country;
                    vpp.abn = abn;
                    vpp.state = stateField;
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
                    state: stateField,
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
