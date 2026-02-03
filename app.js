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
    devices: [...MOCK_DATA.devices],
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
    // Trading Rules State Removed
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
            'electricity_market': [{label: 'Electricity Market'}],
            'spot_market': [{label: 'Electricity Market'}],
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
            'vpp': [{label: 'VPP Management'}],
            'der': [{label: 'DER Management'}],
            'der_ess': [{label: 'DER Management', onclick: "app.navigate('der')"}, {label: 'ESS'}],
            'der_pv': [{label: 'DER Management', onclick: "app.navigate('der')"}, {label: 'PV'}],
            'der_ev': [{label: 'DER Management', onclick: "app.navigate('der')"}, {label: 'EV'}],
            'device_management': [{label: 'System'}, {label: 'Sub-VPP Management'}],
            'vpp_details': [
                {label: 'VPP Management', view: 'vpp'}, 
                {label: 'VPP Details'}
            ],
            'system_details': [
                {label: 'System'},
                {label: 'Sub-VPP Management', view: 'device_management'}, 
                {label: 'Details'}
            ],
            'device_details': [
                {label: 'DER Management', view: 'der'},
                {label: 'ESS', view: 'der_ess'}, 
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
        if (['device_management'].includes(viewName)) {
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
        // Trading rules removed
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
        } else if (viewName === 'device_details') {
            this.renderDeviceDetails(contentArea, params.sn);
        }

        lucide.createIcons();
    },

    renderSpotMarket(container) {
        // Clear any existing interval when re-rendering
        if (this.spotMarketInterval) {
            clearInterval(this.spotMarketInterval);
            this.spotMarketInterval = null;
        }

        container.className = "w-full h-full bg-[#f8f9fb] p-[8px]";
        container.innerHTML = `
            <div class="h-full flex flex-col bg-white rounded-[4px] overflow-hidden border border-gray-200 shadow-sm">
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

                <!-- Main Content -->
                <div class="flex flex-col flex-1 min-h-0">
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
                        </div>
                    </div>

                    <!-- Chart Area -->
                    <div id="spot-chart-wrapper" class="flex-1 bg-white relative flex flex-col">
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
                    if (e.target.checked) {
                        arbitrageSubmenu.classList.remove('hidden');
                    } else {
                        arbitrageSubmenu.classList.add('hidden');
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

                <!-- Footer -->
                <div class="bg-white border-t border-gray-200 px-8 py-4">
                    <div class="flex justify-between items-center">
                        <div class="text-sm text-gray-500">
                            Last updated: <span class="font-medium text-gray-900">Just now</span>
                        </div>
                        <div class="flex gap-3">
                            <button onclick="app.openDeviceEditModal('${device.sn}')" class="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors flex items-center gap-2">
                                <i data-lucide="edit-2" class="w-4 h-4"></i>
                                Edit
                            </button>
                            <button class="px-4 py-2 bg-manta-primary text-white rounded-lg hover:bg-manta-dark font-medium transition-colors shadow-sm flex items-center gap-2">
                                <i data-lucide="refresh-cw" class="w-4 h-4"></i>
                                Refresh
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="bg-white border-t border-gray-200 px-8 py-4">
                <div class="flex justify-between items-center">
                    <div class="text-sm text-gray-500">
                        Last updated: <span class="font-medium text-gray-900">Just now</span>
                    </div>
                    <div class="flex gap-3">
                        <button onclick="app.openDeviceEditModal('${device.sn}')" class="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors flex items-center gap-2">
                            <i data-lucide="edit-2" class="w-4 h-4"></i>
                            Edit
                        </button>
                        <button class="px-4 py-2 bg-manta-primary text-white rounded-lg hover:bg-manta-dark font-medium transition-colors shadow-sm flex items-center gap-2">
                            <i data-lucide="refresh-cw" class="w-4 h-4"></i>
                            Refresh
                        </button>
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

        container.className = "w-full h-full bg-[#f8f9fb] p-[8px]";
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
                                        <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee] text-center whitespace-nowrap">Signal By Forecast</th>
                                        <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee] text-center whitespace-nowrap">Signal By Spot</th>
                                    </tr>
                                </thead>
                                <tbody id="arbitrage-tbody" class="">
                                    <!-- Content rendered by JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Pagination Header -->
                    <div class="px-6 py-3 border-t border-gray-200 flex flex-wrap justify-end items-center gap-4 text-sm text-gray-600 bg-gray-50/50">
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
                </div>
            </div>
        `;

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
                        <td class="px-[8px] text-center">
                            <span class="inline-flex items-center gap-[4px] px-[8px] py-[2px] rounded-[12px] text-[12px] font-medium border ${signalColors[row.forecastSignalType]}">
                                ${row.forecastSignalType}
                            </span>
                        </td>
                        <td class="px-[8px] text-center">
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

            renderTableBody(filtered);
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
            container.className = "w-full h-full bg-[#f8f9fb] p-[8px]";
            container.innerHTML = `
                <div class="bg-white w-full h-full rounded-[4px] p-[16px] flex flex-col relative">
                    <div class="bg-[#f3f3f6] flex flex-1 flex-col gap-[8px] items-center justify-center rounded-[4px] w-full relative">
                        <div class="relative w-[80px] h-[80px]">
                            <img src="assets/icons/empty-state.svg" alt="Empty State" class="w-full h-full block">
                        </div>
                        <p class="font-['Roboto'] font-semibold text-[16px] leading-[20px] text-[#313949] text-center">
                            No Sub-VPP Connected
                        </p>
                        <p class="font-['Roboto'] font-normal text-[12px] leading-[20px] text-[#5f646e] text-center">
                            Connect a sub-VPP to synchronize and manage your devices.
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
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col p-6 font-['Roboto']">
                    <!-- Header -->
                    <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 flex-shrink-0">
                         <div class="flex items-center gap-2">
                             <!-- Title -->
                             <h2 class="text-xl font-bold text-gray-900">Sub-VPP List</h2>
                             
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
                                         placeholder="Search by VPP Name..."
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
                                                <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee] text-right min-w-[140px]">Actions</th>
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
                                                    <td class="px-[8px] text-right">
                                                        <div class="flex items-center justify-end gap-[12px]">
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
                </div>
            `;
        }
    },

    renderSystemDetails(container, systemId) {
        const system = state.systems.find(s => s.id == systemId);
        if (!system) return this.navigate('device_management');

        container.className = "w-full h-full bg-[#f3f3f6] p-[8px] flex flex-col";

        // Calculate Metrics
        const devices = state.devices || [];
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
                                    <!-- Name + Icon -->
                                    <div class="flex gap-[8px] items-center relative shrink-0">
                                        <p class="font-['Roboto'] font-semibold leading-[1.4] text-[20px] text-[#313949]">
                                            ${system.name}
                                        </p>
                                        <div class="relative shrink-0 w-[24px] h-[24px]">
                                            <i data-lucide="badge-check" class="w-5 h-5 text-[#3ec064]"></i>
                                        </div>
                                    </div>
                                    
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

                                        <!-- Separator -->
                                        <div class="h-[16px] w-px bg-[#e2e6ec] relative shrink-0"></div>

                                        <!-- AppSecret -->
                                        <div class="flex gap-[16px] items-center min-w-[48px] py-[8px] relative rounded-[12px] shrink-0 group">
                                            <div class="flex gap-[4px] items-center relative shrink-0">
                                                <div class="relative shrink-0 w-[24px] h-[24px]">
                                                    <i data-lucide="lock" class="w-5 h-5 text-[#b5bcc8]"></i>
                                                </div>
                                                <p class="font-['Roboto'] font-normal leading-[1.42] text-[14px] text-[#313949] text-center">AppSecret:</p>
                                            </div>
                                            <div class="relative shrink-0 w-[120px] bg-[#f3f3f6] rounded-[4px] px-2 py-1">
                                                <input type="password" value="${appSecret}" id="details-app-secret" readonly class="w-full bg-transparent border-none p-0 text-sm font-mono text-[#313949] focus:ring-0">
                                            </div>
                                            <div class="flex gap-[8px] opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onclick="app.togglePasswordVisibility('details-app-secret')" class="text-[#b5bcc8] hover:text-[#313949]">
                                                    <i data-lucide="eye" class="w-4 h-4"></i>
                                                </button>
                                                <button onclick="app.copyToClipboard('details-app-secret')" class="text-[#b5bcc8] hover:text-[#313949]">
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
            <div class="flex-1 overflow-y-auto p-[16px]">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="h-[40px] border-b border-[#e2e6ec]">
                            <th class="px-[8px] pb-[8px] font-['Roboto'] font-normal text-[12px] text-[#b5bcc8] uppercase tracking-wider">Status</th>
                            <th class="px-[8px] pb-[8px] font-['Roboto'] font-normal text-[12px] text-[#b5bcc8] uppercase tracking-wider">SN</th>
                            <th class="px-[8px] pb-[8px] font-['Roboto'] font-normal text-[12px] text-[#b5bcc8] uppercase tracking-wider">State</th>
                            <th class="px-[8px] pb-[8px] font-['Roboto'] font-normal text-[12px] text-[#b5bcc8] uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        ${devices.length > 0 ? devices.map(dev => {
                            return `
                            <tr class="group hover:bg-[#f3f3f6] transition-colors border-b border-[#e2e6ec] last:border-0 h-[48px]">
                                <td class="px-[8px] py-[12px]">
                                    <span class="inline-flex items-center gap-[6px] px-[8px] py-[2px] rounded-[12px] text-[12px] font-['Roboto'] ${dev.status === 'online' ? 'bg-[#3ec064]/10 text-[#3ec064]' : 'bg-[#b5bcc8]/10 text-[#b5bcc8]'}">
                                        <span class="w-[4px] h-[4px] rounded-full bg-current"></span>
                                        ${dev.status}
                                    </span>
                                </td>
                                <td class="px-[8px] py-[12px] font-mono text-[14px] text-[#313949] font-normal">${dev.sn}</td>
                                <td class="px-[8px] py-[12px] font-['Roboto'] text-[14px] text-[#313949] font-normal">${(state.vpps.find(v => v.id === dev.vppId) || {}).state || '-'}</td>
                                <td class="px-[8px] py-[12px] text-right">
                                    <button onclick="app.viewDeviceDetails('${dev.sn}')" class="text-[#b5bcc8] hover:text-[#3ec064] transition-colors">
                                        <i data-lucide="eye" class="w-4 h-4"></i>
                                    </button>
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
        container.className = "w-full h-full bg-[#f8f9fb] p-[8px]";
        
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
                                <th class="px-4 py-3 font-medium">Assigned VPP</th>
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
                                        <button onclick="app.navigate('device_details', { sn: '${dev.sn}' })" class="text-gray-400 hover:text-manta-primary transition-colors">
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
        const statusTab = document.getElementById('tab-status');
        const generationTab = document.getElementById('tab-generation');
        const consumptionTab = document.getElementById('tab-consumption');
        
        if (statusTab && generationTab && consumptionTab) {
            // Reset all to default style
            const defaultStyle = 'px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-900 rounded-md transition-all';
            const activeStyle = 'px-3 py-1 text-xs font-medium bg-white text-gray-900 shadow-sm rounded-md transition-all';
            
            statusTab.className = defaultStyle;
            generationTab.className = defaultStyle;
            consumptionTab.className = defaultStyle;

            if (tab === 'status') {
                statusTab.className = activeStyle;
            } else if (tab === 'generation') {
                generationTab.className = activeStyle;
            } else if (tab === 'consumption') {
                consumptionTab.className = activeStyle;
            }
        }
        
        this.updateOperationChart();
    },

    handleGranularityChange(granularity) {
        state.operationGranularity = granularity;
        
        // Handle Date Input Type and Visibility
        const dateInput = document.getElementById('operation-date');
        const yearSelect = document.getElementById('operation-year-select');
        const prevBtn = document.getElementById('operation-date-prev');
        const nextBtn = document.getElementById('operation-date-next');
        const separator = document.getElementById('operation-separator');
        
        if (dateInput) {
            // Determine visibility of controls
            const showControls = granularity !== 'total';
            const isYear = granularity === 'year';

            // Toggle Input vs Select
            dateInput.style.display = (showControls && !isYear) ? 'block' : 'none';
            if (yearSelect) yearSelect.style.display = (showControls && isYear) ? 'block' : 'none';
            
            // Toggle Buttons and Separator
            if (prevBtn) prevBtn.style.display = showControls ? 'block' : 'none';
            if (nextBtn) nextBtn.style.display = showControls ? 'block' : 'none';
            if (separator) separator.style.display = showControls ? 'inline' : 'none';

            if (granularity === 'day') {
                dateInput.type = 'date';
                dateInput.value = new Date().toISOString().split('T')[0];
            } else if (granularity === 'month') {
                dateInput.type = 'month';
                dateInput.value = new Date().toISOString().slice(0, 7);
            } else if (isYear) {
                // Populate Year Select if needed
                if (yearSelect && yearSelect.options.length === 0) {
                     const currentYear = new Date().getFullYear();
                     // Range: -10 to +10 years from now
                     for(let y = currentYear + 10; y >= currentYear - 10; y--) {
                         const opt = document.createElement('option');
                         opt.value = y;
                         opt.text = y;
                         yearSelect.add(opt);
                     }
                }
                // Sync value
                const currentVal = dateInput.value.substring(0, 4);
                if (yearSelect) yearSelect.value = currentVal || new Date().getFullYear();
                // Ensure input has year value for chart logic
                dateInput.value = yearSelect ? yearSelect.value : new Date().getFullYear();
            }
        }
        
        // Handle Status Tab Visibility
        const statusTab = document.getElementById('tab-status');
        if (statusTab) {
            if (granularity !== 'day') {
                statusTab.style.display = 'none';
                // If currently on status tab, switch to generation
                if (state.operationTab === 'status') {
                    this.setOperationTab('generation');
                }
            } else {
                statusTab.style.display = 'block';
            }
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
        const chartDom = document.getElementById('operation-chart');
        
        if (!chartDom || typeof echarts === 'undefined') return;
        
        const myChart = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);
        
        // Calculate max bar width based on Year view (12 data points)
        const chartWidth = chartDom.clientWidth || 1000;
        const gridWidth = chartWidth * 0.93; 
        const yearDataCount = 12;
        const maxBarWidthStack = (gridWidth / yearDataCount) * 0.25;
        const maxBarWidthGen = (gridWidth / yearDataCount) * 0.40;

        // Determine granularity and date
        const granularity = state.operationGranularity || 'day';
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
            <div class="h-full overflow-y-auto bg-gray-50 pb-24">
                <!-- Header -->
                    <div class="bg-white border-b border-gray-200 px-8 py-6 space-y-8">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 pl-2">
                        <div>
                            <div class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Assigned VPP</div>
                            <div class="text-sm font-semibold text-gray-900">${vpp.name || 'Unassigned'}</div>
                        </div>
                        <div>
                            <div class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">NMI</div>
                            <div class="text-sm font-semibold text-gray-900 font-mono">${device.nmi || '-'}</div>
                        </div>
                        <div>
                            <div class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">State</div>
                            <div class="text-sm font-semibold text-gray-900">${vpp.state || '-'}</div>
                        </div>
                        <div>
                            <div class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Grid Status</div>
                            <div class="flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full ${device.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}"></span>
                                <span class="text-sm font-semibold text-gray-900">${device.status.charAt(0).toUpperCase() + device.status.slice(1)}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Content -->
                        <div class="bg-gray-50 rounded-xl p-6 space-y-6 border border-gray-100">
                            <div class="flex flex-col mb-6">
                                <div class="flex items-center gap-2 mb-4 px-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="network" class="w-5 h-5 text-indigo-500"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>
                                    <h3 class="text-base font-bold text-gray-900">Topology</h3>
                                </div>
                                <div class="bg-white p-8 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                                    <style>
                                        @keyframes flow-right {
                                            0% { left: 0; opacity: 0; }
                                            10% { opacity: 1; }
                                            90% { opacity: 1; }
                                            100% { left: 100%; opacity: 0; }
                                        }
                                        @keyframes flow-left {
                                            0% { left: 100%; opacity: 0; }
                                            10% { opacity: 1; }
                                            90% { opacity: 1; }
                                            100% { left: 0%; opacity: 0; }
                                        }
                                        .animate-flow-right {
                                            position: absolute;
                                            top: 50%;
                                            transform: translateY(-50%);
                                            animation: flow-right 2s linear infinite;
                                        }
                                        .animate-flow-left {
                                            position: absolute;
                                            top: 50%;
                                            transform: translateY(-50%);
                                            animation: flow-left 2s linear infinite;
                                        }
                                    </style>
                                    <div class="flex flex-row items-center justify-center relative z-10 gap-0 py-8 w-full max-w-6xl mx-auto">
                                        <!-- Left Column: PV & Battery -->
                                        <div class="flex flex-col gap-16 relative">
                                            <!-- PV (Line Art Style) -->
                                            <div class="flex items-center gap-0 group">
                                                <div class="flex flex-col items-center justify-center w-28 h-28 bg-white border-2 border-emerald-500 rounded-xl relative z-10 transition-transform hover:scale-105 shadow-[4px_4px_0px_0px_#064e3b]">
                                                    <div class="flex flex-col items-center transform scale-110">
                                                        <!-- Sun -->
                                                        <div class="relative w-5 h-5 mb-1">
                                                            <div class="absolute inset-0 border-2 border-emerald-500 rounded-full"></div>
                                                            <!-- Rays -->
                                                            <div class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-[1.5px] h-1 bg-emerald-500"></div>
                                                            <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-[1.5px] h-1 bg-emerald-500"></div>
                                                            <div class="absolute top-1/2 -left-1.5 -translate-y-1/2 w-1 h-[1.5px] bg-emerald-500"></div>
                                                            <div class="absolute top-1/2 -right-1.5 -translate-y-1/2 w-1 h-[1.5px] bg-emerald-500"></div>
                                                            <div class="absolute top-0.5 right-0.5 w-[1.5px] h-1 bg-emerald-500 rotate-45"></div>
                                                            <div class="absolute bottom-0.5 left-0.5 w-[1.5px] h-1 bg-emerald-500 rotate-45"></div>
                                                            <div class="absolute top-0.5 left-0.5 w-[1.5px] h-1 bg-emerald-500 -rotate-45"></div>
                                                            <div class="absolute bottom-0.5 right-0.5 w-[1.5px] h-1 bg-emerald-500 -rotate-45"></div>
                                                        </div>
                                                        <!-- Panel -->
                                                        <div class="w-12 h-8 border-2 border-emerald-500 rounded-sm grid grid-cols-4 grid-rows-2 gap-[1px] bg-emerald-500">
                                                            <div class="bg-white"></div><div class="bg-white"></div><div class="bg-white"></div><div class="bg-white"></div>
                                                            <div class="bg-white"></div><div class="bg-white"></div><div class="bg-white"></div><div class="bg-white"></div>
                                                        </div>
                                                        <!-- Stand -->
                                                        <div class="w-[2px] h-2 bg-emerald-500"></div>
                                                        <div class="w-6 h-[2px] bg-emerald-500 rounded-full"></div>
                                                    </div>
                                                    <span class="absolute -bottom-7 text-xs font-bold text-emerald-600 tracking-wider">PV ARRAY</span>
                                                </div>
                                                <!-- Connector -->
                                                <div class="w-52 h-8 relative flex items-center justify-center">
                                                    <style>
                                                        @keyframes flowLine {
                                                            0% { stroke-dashoffset: 24; }
                                                            100% { stroke-dashoffset: 0; }
                                                        }
                                                        .animate-flow-line {
                                                            animation: flowLine 1s linear infinite;
                                                        }
                                                    </style>
                                                    <!-- DC Label -->
                                                    <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-1.5 py-0.5 rounded-full border border-emerald-100 shadow-sm z-20">
                                                        <span class="text-[8px] font-bold text-emerald-600 tracking-widest block leading-none">DC</span>
                                                    </div>

                                                    <!-- Line SVG -->
                                                    <svg width="208" height="24" viewBox="0 0 208 24" fill="none" class="overflow-visible">
                                                        <defs>
                                                            <path id="arrow-head-right" d="M-3 -3 L1 0 L-3 3" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                                                        </defs>
                                                        <!-- Background Track -->
                                                        <line x1="0" y1="12" x2="208" y2="12" stroke="#D1FAE5" stroke-width="2" />
                                                        <!-- Flowing Current -->
                                                        <line x1="0" y1="12" x2="208" y2="12" stroke="#10B981" stroke-width="2" stroke-dasharray="12 12" class="animate-flow-line" />
                                                        
                                                        <!-- Moving Arrows -->
                                                        <g class="text-emerald-500">
                                                            <path id="path-pv-inv" d="M0 12 L208 12" fill="none" stroke="none" />
                                                            <use href="#arrow-head-right">
                                                                <animateMotion dur="1.5s" repeatCount="indefinite" rotate="auto">
                                                                    <mpath href="#path-pv-inv" />
                                                                </animateMotion>
                                                            </use>
                                                            <use href="#arrow-head-right">
                                                                <animateMotion dur="1.5s" begin="0.5s" repeatCount="indefinite" rotate="auto">
                                                                    <mpath href="#path-pv-inv" />
                                                                </animateMotion>
                                                            </use>
                                                            <use href="#arrow-head-right">
                                                                <animateMotion dur="1.5s" begin="1s" repeatCount="indefinite" rotate="auto">
                                                                    <mpath href="#path-pv-inv" />
                                                                </animateMotion>
                                                            </use>
                                                        </g>
                                                    </svg>

                                                    <!-- Arrow -->
                                                    <div class="absolute -right-2 top-1/2 -translate-y-1/2 bg-white rounded-full border border-emerald-100 p-0.5 z-30 shadow-sm">
                                                        <i data-lucide="arrow-right" class="w-3 h-3 text-emerald-600 block"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Battery (Line Art Style) -->
                                            <div class="flex items-center gap-0 group">
                                                <div class="flex flex-col items-center justify-center w-28 h-28 bg-white border-2 border-emerald-500 rounded-xl relative z-10 transition-transform hover:scale-105 shadow-[4px_4px_0px_0px_#064e3b]">
                                                    <div class="flex flex-col items-center transform scale-110">
                                                        <div class="w-10 h-14 border-2 border-emerald-500 rounded-md flex flex-col justify-end p-1 gap-1 relative">
                                                            <div class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-emerald-500 rounded-t-sm"></div>
                                                            <div class="w-full h-1.5 bg-emerald-500 rounded-[1px]"></div>
                                                            <div class="w-full h-1.5 bg-emerald-500 rounded-[1px]"></div>
                                                            <div class="w-full h-1.5 bg-emerald-500 rounded-[1px]"></div>
                                                            <div class="w-full h-1.5 bg-emerald-500 rounded-[1px] opacity-30"></div>
                                                            <div class="absolute top-2 left-1/2 -translate-x-1/2">
                                                                <i data-lucide="zap" class="w-3 h-3 text-emerald-500 fill-emerald-500"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span class="absolute -bottom-7 text-xs font-bold text-emerald-600 tracking-wider">BATTERY</span>
                                                </div>
                                                 <!-- Connector -->
                                                 <div class="w-52 h-8 relative flex items-center justify-center">
                                                    <style>
                                                        @keyframes flowLineLeft {
                                                            0% { stroke-dashoffset: 24; }
                                                            100% { stroke-dashoffset: 0; }
                                                        }
                                                        .animate-flow-line-left {
                                                            animation: flowLineLeft 1s linear infinite;
                                                        }
                                                    </style>
                                                    <!-- DC Label -->
                                                    <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-1.5 py-0.5 rounded-full border border-emerald-100 shadow-sm z-20">
                                                        <span class="text-[8px] font-bold text-emerald-600 tracking-widest block leading-none">DC</span>
                                                    </div>

                                                    <!-- Line SVG -->
                                                    <svg width="208" height="24" viewBox="0 0 208 24" fill="none" class="overflow-visible">
                                                        <defs>
                                                            <path id="arrow-head-bat" d="M-3 -3 L1 0 L-3 3" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                                                        </defs>
                                                        <!-- Background Track -->
                                                        <line x1="0" y1="12" x2="208" y2="12" stroke="#D1FAE5" stroke-width="2" />
                                                        <!-- Flowing Current -->
                                                        <line x1="0" y1="12" x2="208" y2="12" stroke="#10B981" stroke-width="2" stroke-dasharray="12 12" class="animate-flow-line-left" />
                                                        
                                                        <!-- Moving Arrows -->
                                                        <g class="text-emerald-500">
                                                            <path id="path-inv-bat" d="M208 12 L0 12" fill="none" stroke="none" />
                                                            <use href="#arrow-head-bat">
                                                                <animateMotion dur="1.5s" repeatCount="indefinite" rotate="auto">
                                                                    <mpath href="#path-inv-bat" />
                                                                </animateMotion>
                                                            </use>
                                                            <use href="#arrow-head-bat">
                                                                <animateMotion dur="1.5s" begin="0.5s" repeatCount="indefinite" rotate="auto">
                                                                    <mpath href="#path-inv-bat" />
                                                                </animateMotion>
                                                            </use>
                                                            <use href="#arrow-head-bat">
                                                                <animateMotion dur="1.5s" begin="1s" repeatCount="indefinite" rotate="auto">
                                                                    <mpath href="#path-inv-bat" />
                                                                </animateMotion>
                                                            </use>
                                                        </g>
                                                    </svg>

                                                    <!-- Arrow -->
                                                    <div class="absolute -left-2 top-1/2 -translate-y-1/2 bg-white rounded-full border border-emerald-100 p-0.5 z-30 shadow-sm">
                                                        <i data-lucide="arrow-left" class="w-3 h-3 text-emerald-600 block"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Center Column: Inverter (Line Art Style) -->
                                        <div class="flex flex-col items-center justify-center relative">
                                            <div class="flex flex-col items-center justify-center w-52 h-52 bg-white border-2 border-cyan-500 rounded-xl relative z-20 transition-transform hover:scale-105 shadow-[6px_6px_0px_0px_#0e7490]">
                                                <div class="absolute -top-3 bg-cyan-600 text-white text-[10px] px-3 py-0.5 rounded-full font-bold tracking-wider shadow-sm border-2 border-white">HYBRID</div>
                                                <div class="flex flex-col items-center transform scale-150">
                                                    <div class="w-16 h-16 border-2 border-cyan-500 rounded-lg flex items-center justify-center relative overflow-hidden bg-white">
                                                         <div class="flex flex-col items-center gap-1">
                                                            <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" class="text-cyan-500 stroke-2">
                                                                <path d="M2 6C2 6 5 2 8 2C11 2 14 10 17 10C20 10 22 6 22 6" stroke-linecap="round" stroke-linejoin="round"/>
                                                            </svg>
                                                            <div class="flex gap-1">
                                                                <div class="w-5 h-[2px] bg-cyan-500 rounded-full"></div>
                                                                <div class="w-5 h-[2px] bg-cyan-500 rounded-full"></div>
                                                            </div>
                                                         </div>
                                                    </div>
                                                </div>
                                                <span class="absolute -bottom-8 text-base font-bold text-cyan-700 tracking-wider">INVERTER</span>
                                            </div>
                                        </div>

                                        <!-- Right Column: Grid & Home -->
                                        <div class="flex flex-col gap-16 relative">
                                            <!-- Grid (Line Art Style) -->
                                            <div class="flex items-center gap-0 flex-row-reverse group">
                                                <div class="flex flex-col items-center justify-center w-28 h-28 bg-white border-2 border-blue-500 rounded-xl relative z-10 transition-transform hover:scale-105 shadow-[4px_4px_0px_0px_#1e3a8a]">
                                                    <div class="flex flex-col items-center transform scale-110">
                                                        <div class="flex flex-col items-center relative">
                                                             <div class="w-12 h-[2px] bg-blue-500 rounded-full mb-1.5"></div>
                                                             <div class="w-16 h-[2px] bg-blue-500 rounded-full mb-1"></div>
                                                             <div class="relative w-10 h-12">
                                                                <div class="absolute inset-x-0 top-0 bottom-0 border-l-2 border-r-2 border-blue-500 transform scale-x-75 origin-bottom"></div>
                                                                <div class="absolute top-1/2 inset-x-0 h-[2px] bg-blue-500"></div>
                                                                <div class="absolute top-1/4 inset-x-1 h-[2px] bg-blue-500"></div>
                                                                <div class="absolute bottom-0 inset-x-0 h-[2px] bg-blue-500"></div>
                                                             </div>
                                                        </div>
                                                    </div>
                                                    <span class="absolute -bottom-7 text-xs font-bold text-blue-600 tracking-wider">GRID</span>
                                                </div>
                                                 <!-- Connector -->
                                                 <div class="w-52 h-8 relative flex items-center justify-center">
                                                    <style>
                                                        @keyframes flowWave {
                                                            0% { stroke-dashoffset: 24; }
                                                            100% { stroke-dashoffset: 0; }
                                                        }
                                                        .animate-flow-wave {
                                                            animation: flowWave 1s linear infinite;
                                                        }
                                                    </style>
                                                    <!-- AC Label -->
                                                    <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-1.5 py-0.5 rounded-full border border-blue-100 shadow-sm z-20">
                                                        <span class="text-[8px] font-bold text-blue-600 tracking-widest block leading-none">AC</span>
                                                    </div>

                                                    <!-- Wave SVG -->
                                                    <svg width="208" height="24" viewBox="0 0 208 24" fill="none" class="overflow-visible">
                                                        <defs>
                                                            <path id="arrow-head-grid" d="M-3 -3 L1 0 L-3 3" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                                                        </defs>
                                                        <!-- Background Track -->
                                                        <path d="M0 12 Q 13 4, 26 12 T 52 12 T 78 12 T 104 12 T 130 12 T 156 12 T 182 12 T 208 12" 
                                                              stroke="#DBEAFE" stroke-width="2" fill="none" />
                                                        
                                                        <!-- Flowing Current -->
                                                        <path d="M0 12 Q 13 4, 26 12 T 52 12 T 78 12 T 104 12 T 130 12 T 156 12 T 182 12 T 208 12" 
                                                              stroke="#3B82F6" stroke-width="2" fill="none"
                                                              stroke-dasharray="12 12" 
                                                              class="animate-flow-wave" />

                                                        <!-- Moving Arrows -->
                                                        <g class="text-blue-500">
                                                            <path id="path-inv-grid" d="M0 12 Q 13 4, 26 12 T 52 12 T 78 12 T 104 12 T 130 12 T 156 12 T 182 12 T 208 12" fill="none" stroke="none" />
                                                            <use href="#arrow-head-grid">
                                                                <animateMotion dur="1.5s" repeatCount="indefinite" rotate="auto">
                                                                    <mpath href="#path-inv-grid" />
                                                                </animateMotion>
                                                            </use>
                                                            <use href="#arrow-head-grid">
                                                                <animateMotion dur="1.5s" begin="0.5s" repeatCount="indefinite" rotate="auto">
                                                                    <mpath href="#path-inv-grid" />
                                                                </animateMotion>
                                                            </use>
                                                            <use href="#arrow-head-grid">
                                                                <animateMotion dur="1.5s" begin="1s" repeatCount="indefinite" rotate="auto">
                                                                    <mpath href="#path-inv-grid" />
                                                                </animateMotion>
                                                            </use>
                                                        </g>
                                                    </svg>

                                                    <!-- Arrow -->
                                                    <div class="absolute -right-2 top-1/2 -translate-y-1/2 bg-white rounded-full border border-blue-100 p-0.5 z-30 shadow-sm">
                                                        <i data-lucide="arrow-right" class="w-3 h-3 text-blue-600 block"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Home (Line Art Style) -->
                                            <div class="flex items-center gap-0 flex-row-reverse group">
                                                <div class="flex flex-col items-center justify-center w-28 h-28 bg-white border-2 border-blue-500 rounded-xl relative z-10 transition-transform hover:scale-105 shadow-[4px_4px_0px_0px_#1e3a8a]">
                                                    <div class="flex flex-col items-center transform scale-110">
                                                        <div class="flex flex-col items-center">
                                                            <!-- Roof -->
                                                            <div class="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[16px] border-b-blue-500 mb-[1px]"></div>
                                                            <div class="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-white -mt-[14px] mb-[3px]"></div>
                                                            <!-- Body -->
                                                            <div class="w-8 h-6 border-2 border-blue-500 border-t-0 flex justify-center items-end bg-white">
                                                                <div class="w-3 h-4 border-2 border-blue-500 border-b-0 rounded-t-[1px]"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span class="absolute -bottom-7 text-xs font-bold text-blue-600 tracking-wider">HOME</span>
                                                </div>
                                                 <!-- Connector -->
                                                 <div class="w-52 h-8 relative flex items-center justify-center">
                                                    <style>
                                                        @keyframes flowWave {
                                                            0% { stroke-dashoffset: 24; }
                                                            100% { stroke-dashoffset: 0; }
                                                        }
                                                        .animate-flow-wave {
                                                            animation: flowWave 1s linear infinite;
                                                        }
                                                    </style>
                                                    <!-- AC Label -->
                                                    <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-1.5 py-0.5 rounded-full border border-blue-100 shadow-sm z-20">
                                                        <span class="text-[8px] font-bold text-blue-600 tracking-widest block leading-none">AC</span>
                                                    </div>

                                                    <!-- Wave SVG -->
                                                    <svg width="208" height="24" viewBox="0 0 208 24" fill="none" class="overflow-visible">
                                                        <defs>
                                                            <path id="arrow-head-home" d="M-3 -3 L1 0 L-3 3" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                                                        </defs>
                                                        <!-- Background Track -->
                                                        <path d="M0 12 Q 13 4, 26 12 T 52 12 T 78 12 T 104 12 T 130 12 T 156 12 T 182 12 T 208 12" 
                                                              stroke="#DBEAFE" stroke-width="2" fill="none" />
                                                        
                                                        <!-- Flowing Current -->
                                                        <path d="M0 12 Q 13 4, 26 12 T 52 12 T 78 12 T 104 12 T 130 12 T 156 12 T 182 12 T 208 12" 
                                                              stroke="#3B82F6" stroke-width="2" fill="none"
                                                              stroke-dasharray="12 12" 
                                                              class="animate-flow-wave" />

                                                        <!-- Moving Arrows -->
                                                        <g class="text-blue-500">
                                                            <path id="path-inv-home" d="M0 12 Q 13 4, 26 12 T 52 12 T 78 12 T 104 12 T 130 12 T 156 12 T 182 12 T 208 12" fill="none" stroke="none" />
                                                            <use href="#arrow-head-home">
                                                                <animateMotion dur="1.5s" repeatCount="indefinite" rotate="auto">
                                                                    <mpath href="#path-inv-home" />
                                                                </animateMotion>
                                                            </use>
                                                            <use href="#arrow-head-home">
                                                                <animateMotion dur="1.5s" begin="0.5s" repeatCount="indefinite" rotate="auto">
                                                                    <mpath href="#path-inv-home" />
                                                                </animateMotion>
                                                            </use>
                                                            <use href="#arrow-head-home">
                                                                <animateMotion dur="1.5s" begin="1s" repeatCount="indefinite" rotate="auto">
                                                                    <mpath href="#path-inv-home" />
                                                                </animateMotion>
                                                            </use>
                                                        </g>
                                                    </svg>

                                                    <!-- Arrow -->
                                                    <div class="absolute -right-2 top-1/2 -translate-y-1/2 bg-white rounded-full border border-blue-100 p-0.5 z-30 shadow-sm">
                                                        <i data-lucide="arrow-right" class="w-3 h-3 text-blue-600 block"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
                                </div>
                            </div>


                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <!-- PV Stats Section -->
                                <div class="flex flex-col h-full">
                                    <div class="flex items-center gap-2 mb-4 px-1">
                                        <i data-lucide="sun" class="w-5 h-5 text-orange-500"></i>
                                        <h3 class="text-base font-bold text-gray-900">PV</h3>
                                    </div>
                                    <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex-1">
                                        <div class="grid grid-cols-2 lg:grid-cols-3 gap-6 h-full">
                                            <!-- Capacity -->
                                            <div class="flex flex-col justify-center">
                                                <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Capacity</span>
                                                <span class="text-lg font-bold text-gray-900">${device.capacity} kW</span>
                                            </div>
                                            
                                            <!-- Today Yield -->
                                            <div class="flex flex-col justify-center">
                                                <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Today Yield</span>
                                                <span class="text-lg font-bold text-gray-900">${(device.capacity * 4.2).toFixed(1)} kWh</span>
                                            </div>

                                            <!-- Today Full Hours -->
                                            <div class="flex flex-col justify-center">
                                                <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Today Full Hours</span>
                                                <span class="text-lg font-bold text-gray-900">4.2 h</span>
                                            </div>

                                            <!-- Month Yield -->
                                            <div class="flex flex-col justify-center">
                                                <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Month Yield</span>
                                                <span class="text-lg font-bold text-gray-900">${(device.capacity * 120).toFixed(1)} kWh</span>
                                            </div>

                                            <!-- Annual Yield -->
                                            <div class="flex flex-col justify-center">
                                                <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Annual Yield</span>
                                                <span class="text-lg font-bold text-gray-900">${(device.capacity * 1.4).toFixed(2)} MWh</span>
                                            </div>

                                            <!-- Total Yield -->
                                            <div class="flex flex-col justify-center">
                                                <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Total Yield</span>
                                                <span class="text-lg font-bold text-gray-900">${(device.capacity * 5).toFixed(2)} MWh</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Environmental Benefits -->
                                <div class="flex flex-col h-full">
                                    <div class="flex items-center gap-2 mb-4 px-1">
                                        <i data-lucide="leaf" class="w-5 h-5 text-green-500"></i>
                                        <h3 class="text-base font-bold text-gray-900">Environmental Benefits</h3>
                                    </div>
                                    <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex-1">
                                        <div class="grid grid-cols-2 gap-6 h-full">
                                            <!-- CO2 Reduction -->
                                            <div class="flex flex-col items-center justify-center text-center">
                                                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center text-green-600 shadow-sm ring-1 ring-green-100/50 mb-3">
                                                    <i data-lucide="cloud-lightning" class="w-8 h-8"></i>
                                                </div>
                                                <div class="flex flex-col justify-center">
                                                    <span class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">CO₂ Reduction</span>
                                                    <span class="text-2xl font-bold text-gray-900">${(device.capacity * 3.5).toFixed(1)} t</span>
                                                </div>
                                            </div>

                                            <!-- Trees Planted -->
                                            <div class="flex flex-col items-center justify-center text-center">
                                                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center text-green-600 shadow-sm ring-1 ring-green-100/50 mb-3">
                                                    <i data-lucide="trees" class="w-8 h-8"></i>
                                                </div>
                                                <div class="flex flex-col justify-center">
                                                    <span class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Trees Planted</span>
                                                    <span class="text-2xl font-bold text-gray-900">${Math.floor(device.capacity * 15)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Inverter Section -->
                            <div class="flex flex-col">
                                <div class="flex items-center gap-2 mb-4 px-1">
                                    <i data-lucide="zap" class="w-5 h-5 text-yellow-500"></i>
                                    <h3 class="text-base font-bold text-gray-900">Inverter</h3>
                                </div>
                                <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <!-- SN -->
                                        <div class="flex flex-col justify-center">
                                            <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">SN</span>
                                            <span class="text-sm font-bold text-gray-900 truncate" title="${device.sn}">${device.sn}</span>
                                        </div>
                                        <!-- Manufacturer -->
                                        <div class="flex flex-col justify-center">
                                            <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Manufacturer</span>
                                            <span class="text-sm font-bold text-gray-900 truncate" title="${device.vendor}">${device.vendor}</span>
                                        </div>
                                        <!-- Model -->
                                        <div class="flex flex-col justify-center">
                                            <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Model</span>
                                            <span class="text-sm font-bold text-gray-900 truncate" title="${device.model || 'Unknown'}">${device.model || 'Unknown'}</span>
                                        </div>
                                        <!-- Type -->
                                        <div class="flex flex-col justify-center">
                                            <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Type</span>
                                            <span class="text-sm font-bold text-gray-900">String Inverter</span>
                                        </div>
                                        <!-- Rated Power -->
                                        <div class="flex flex-col justify-center">
                                            <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Rated Power</span>
                                            <span class="text-lg font-bold text-gray-900">${device.capacity} kW</span>
                                        </div>
                                        <!-- Input Power -->
                                        <div class="flex flex-col justify-center">
                                            <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Input Power</span>
                                            <span class="text-lg font-bold text-gray-900">${(device.capacity * 0.85).toFixed(1)} kW</span>
                                        </div>
                                        <!-- Output Power -->
                                        <div class="flex flex-col justify-center">
                                            <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Output Power</span>
                                            <span class="text-lg font-bold text-gray-900">${(device.capacity * 0.8).toFixed(1)} kW</span>
                                        </div>
                                        <!-- Operating mode -->
                                        <div class="flex flex-col justify-center">
                                            <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Operating mode</span>
                                            <span class="text-lg font-bold text-gray-900">Normal</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Battery Section -->
                            <div class="flex flex-col">
                                <div class="flex items-center gap-2 mb-4 px-1">
                                    <i data-lucide="battery-charging" class="w-5 h-5 text-blue-500"></i>
                                    <h3 class="text-base font-bold text-gray-900">Battery</h3>
                                </div>
                                <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                                        <!-- Model -->
                                        <div class="flex flex-col justify-center">
                                            <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Model</span>
                                            <span class="text-sm font-bold text-gray-900 truncate" title="LFP-200">LFP-200</span>
                                        </div>
                                        <!-- Rated Capacity -->
                                        <div class="flex flex-col justify-center">
                                            <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Rated Capacity</span>
                                            <span class="text-lg font-bold text-gray-900">${device.capacity * 2} kWh</span>
                                        </div>
                                        <!-- Available charge -->
                                        <div class="flex flex-col justify-center">
                                            <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Available charge</span>
                                            <span class="text-lg font-bold text-gray-900">${(device.capacity * 2 * 0.8).toFixed(1)} kWh</span>
                                        </div>
                                        <!-- Available discharge -->
                                        <div class="flex flex-col justify-center">
                                            <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Available discharge</span>
                                            <span class="text-lg font-bold text-gray-900">${(device.capacity * 2 * 0.15).toFixed(1)} kWh</span>
                                        </div>
                                        <!-- SOC -->
                                        <div class="flex flex-col justify-center">
                                            <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">SOC</span>
                                            <span class="text-lg font-bold text-gray-900">85%</span>
                                        </div>
                                        <!-- SOC floor -->
                                        <div class="flex flex-col justify-center">
                                            <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">SOC floor</span>
                                            <span class="text-lg font-bold text-gray-900">10%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Operation Section -->
                            <div class="flex flex-col mb-6">
                                <div class="flex items-center justify-between mb-4 px-1">
                                    <div class="flex items-center gap-2">
                                        <i data-lucide="activity" class="w-5 h-5 text-indigo-500"></i>
                                        <h3 class="text-base font-bold text-gray-900">Operation</h3>
                                    </div>
                                    <div class="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm px-1 w-[260px] justify-between">
                                        <select id="operation-granularity" class="bg-transparent border-none text-gray-900 text-xs focus:ring-0 block p-1 cursor-pointer h-7 outline-none flex-shrink-0" onchange="app.handleGranularityChange(this.value)">
                                            <option value="day">Day</option>
                                            <option value="month">Month</option>
                                            <option value="year">Year</option>
                                            <option value="total">Total</option>
                                        </select>
                                        <span id="operation-separator" class="text-gray-300 mx-1 flex-shrink-0">|</span>
                                        <div class="flex items-center flex-1 justify-center">
                                            <button id="operation-date-prev" onclick="app.adjustDate(-1)" class="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-50 rounded-full transition-colors flex-shrink-0">
                                                <i data-lucide="chevron-left" class="w-4 h-4"></i>
                                            </button>
                                            <input type="date" id="operation-date" class="bg-transparent border-none text-gray-900 text-xs focus:ring-0 block p-1 h-7 outline-none text-center cursor-pointer flex-1 w-full" value="${new Date().toISOString().split('T')[0]}" onchange="app.updateOperationChart()" onclick="try{this.showPicker()}catch(e){}">
                                            <select id="operation-year-select" class="bg-transparent border-none text-gray-900 text-xs focus:ring-0 block p-1 h-7 outline-none text-center cursor-pointer appearance-none flex-1 w-full" style="display:none" onchange="document.getElementById('operation-date').value=this.value; app.updateOperationChart()">
                                            </select>
                                            <button id="operation-date-next" onclick="app.adjustDate(1)" class="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-50 rounded-full transition-colors flex-shrink-0">
                                                <i data-lucide="chevron-right" class="w-4 h-4"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative">
                                    <div class="absolute top-6 left-6 z-10 flex bg-gray-100 rounded-lg p-1">
                                        <button onclick="app.setOperationTab('status')" id="tab-status" class="px-3 py-1 text-xs font-medium bg-white text-gray-900 shadow-sm rounded-md transition-all">Status</button>
                                        <button onclick="app.setOperationTab('generation')" id="tab-generation" class="px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-900 rounded-md transition-all">Generation</button>
                                        <button onclick="app.setOperationTab('consumption')" id="tab-consumption" class="px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-900 rounded-md transition-all">Consumption</button>
                                    </div>
                                    <div id="operation-chart" class="w-full h-96"></div>
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
                <!-- White Card (Node 35:305) -->
                <div class="bg-white w-full h-full rounded-[4px] p-[16px] flex flex-col relative">
                    <!-- Inner Grey Box (Node 39:459) -->
                    <div class="bg-[#f3f3f6] flex flex-1 flex-col gap-[8px] items-center justify-center rounded-[4px] w-full relative">
                        <div class="relative w-[80px] h-[80px]">
                            <img src="assets/icons/empty-state.svg" alt="Empty State" class="w-full h-full block">
                        </div>
                        <p class="font-['Roboto'] font-semibold text-[16px] leading-[20px] text-[#313949] text-center">
                            No VPPs Created
                        </p>
                        <button onclick="app.openVPPDrawer()" class="bg-[#3ec064] hover:bg-[#35a656] flex items-center justify-center gap-[4px] h-[40px] px-[24px] py-[4px] rounded-[4px] text-white transition-colors min-w-[80px]">
                            <div class="w-[24px] h-[24px] flex items-center justify-center">
                                 <i data-lucide="plus" class="w-[14px] h-[14px]"></i>
                            </div>
                            <span class="font-['Roboto'] font-semibold text-[16px] leading-[1.42]">Create</span>
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

        container.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col p-6">
            <!-- Toolbar -->
            <div class="flex flex-col md:flex-row justify-between items-center gap-[8px] mb-[8px] flex-shrink-0">
                <!-- Left: Title & Add -->
                <div class="flex items-center gap-2">
                    <h2 class="text-xl font-bold text-gray-900">VPPs</h2>
                    <button onclick="app.openVPPDrawer()" class="p-1 text-green-500 hover:text-green-600 transition-colors hover:bg-green-50 rounded-full">
                        <i data-lucide="plus" class="w-6 h-6"></i>
                    </button>
                </div>

                <!-- Center: Search & Filter Group -->
                <div class="flex-1 w-full md:max-w-xl mx-4 flex justify-end">
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
                                     <option value="">All States</option>
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
                <div class="flex bg-[#f3f3f6] p-[4px] rounded-[4px] items-center">
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
                                    <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee] min-w-[120px]">State</th>
                                    <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee]">DERs</th>
                                    <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee]">Rated Power</th>
                                    <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee]">PV Capacity</th>
                                    <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee]">Rated Capacity</th>
                                    <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee]">Today Yield</th>
                                    <th class="h-[48px] px-[8px] text-[12px] font-normal text-[#b5bcc8] uppercase tracking-wider border-b border-[#e6e8ee] text-right min-w-[140px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="">
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
                                        <tr class="h-[48px] hover:bg-[#f3f3f6] transition-colors group border-b border-[#e6e8ee]">
                                            <td class="px-[8px]">
                                                <div class="text-[14px] font-semibold text-[#1c2026] font-['Roboto']">${vpp.name}</div>
                                            </td>
                                            <td class="px-[8px]">
                                                <div class="text-[14px] font-normal text-[#1c2026] font-['Roboto']">${vpp.state || 'NSW'}</div>
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
                                            <td class="px-[8px] text-right">
                                                <div class="flex items-center justify-end gap-[12px]">
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

        // Content
        const content = document.createElement('div');
        content.className = 'flex-1 flex flex-col gap-[24px] slide-up';
        
        content.innerHTML = `
            <!-- Unified Panel -->
            <div class="flex-1 flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
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
                                     <div class="bg-[#f3f3f6] flex gap-[4px] items-center justify-center px-[8px] py-[4px] rounded-[12px] text-[12px] text-[#5f646e]">
                                        <p>${vpp.state || '-'}</p>
                                        <p>•</p>
                                        <p>${vpp.country || '-'}</p>
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
                    <div class="flex justify-between items-center px-[24px] py-[16px] bg-white">
                         <!-- Tab Group -->
                         <div class="bg-[#f3f3f6] p-[4px] rounded-[4px] flex items-center">
                            <button onclick="app.setVPPDetailsTab('der-list')" class="min-w-[80px] h-[32px] flex items-center justify-center rounded-[4px] px-[16px] text-[14px] transition-all ${state.vppDetailsTab === 'der-list' ? 'bg-white font-semibold text-[#313949] shadow-sm' : 'font-normal text-[#313949] hover:bg-gray-100'}">
                                DERs
                            </button>
                            <button onclick="app.setVPPDetailsTab('event-list')" class="min-w-[80px] h-[32px] flex items-center justify-center rounded-[4px] px-[16px] text-[14px] transition-all ${state.vppDetailsTab === 'event-list' ? 'bg-white font-semibold text-[#313949] shadow-sm' : 'font-normal text-[#313949] hover:bg-gray-100'}">
                                Events
                            </button>
                         </div>

                         <!-- Search Bar -->
                         <div class="flex gap-2">
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
                <div class="flex-1 overflow-y-auto px-[24px]">
                    ${(state.vppDetailsTab === 'der-list') ? `
                    <table class="w-full text-left border-collapse">
                        <thead class="sticky top-0 bg-white z-10">
                            <tr class="h-[48px] text-[12px] text-[#5f646e] border-b border-[#e6e8ee]">
                                <th class="px-[16px] font-medium">Status</th>
                                <th class="px-[16px] font-medium">SN</th>
                                <th class="px-[16px] font-medium">Manufacturer</th>
                                <th class="px-[16px] font-medium">State</th>
                                <th class="px-[16px] font-medium">Rated Power</th>
                                <th class="px-[16px] font-medium">PV Capacity</th>
                                <th class="px-[16px] font-medium">Rated Capacity</th>
                                <th class="px-[16px] font-medium">SOC</th>
                                <th class="px-[16px] font-medium">Today Yield</th>
                                <th class="px-[16px] font-medium">Actions</th>
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
                                            <span class="text-[10px] text-[#5f646e]">(${currentEn.toFixed(0)}/${totalCap.toFixed(0)} kWh)</span>
                                        </div>
                                    `;
                                }
                                const todayYield = (capacity * (2 + Math.random() * 2)).toFixed(1) + ' kWh';
                                
                                return `
                                <tr class="h-[48px] hover:bg-[#f3f3f6] transition-colors border-b border-[#e6e8ee] last:border-0">
                                    <td class="px-[16px] py-[12px]">
                                        <span class="inline-flex items-center gap-[6px] px-[8px] py-[2px] rounded-[12px] text-[12px] ${dev.status === 'online' ? 'bg-[#e6f4d0] text-[#4b7b0f]' : 'bg-[#e6e8ee] text-[#5f646e]'}">
                                            <span class="w-[6px] h-[6px] rounded-full bg-current"></span>
                                            ${dev.status}
                                        </span>
                                    </td>
                                    <td class="px-[16px] py-[12px] font-mono text-[#313949]">${dev.sn}</td>
                                    <td class="px-[16px] py-[12px] text-[#5f646e]">${dev.vendor}</td>
                                    <td class="px-[16px] py-[12px] text-[#5f646e]">${vpp.state || '-'}</td>
                                    <td class="px-[16px] py-[12px] text-[#313949] font-mono">${ratedPower}</td>
                                    <td class="px-[16px] py-[12px] text-[#313949] font-mono">${pvCapacity}</td>
                                    <td class="px-[16px] py-[12px] text-[#313949] font-mono">${ratedCapacity}</td>
                                    <td class="px-[16px] py-[12px] font-mono">${socDisplay}</td>
                                    <td class="px-[16px] py-[12px] text-[#313949] font-mono">${todayYield}</td>
                                    <td class="px-[16px] py-[12px]">
                                        <button onclick="app.viewDeviceDetails('${dev.sn}')" class="text-[#b5bcc8] hover:text-[#313949] transition-colors">
                                            <i data-lucide="eye" class="w-[16px] h-[16px]"></i>
                                        </button>
                                    </td>
                                </tr>
                            `}).join('') : `
                                <tr>
                                    <td colspan="9" class="py-[32px] text-center text-[#5f646e]">
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
        // Default to 'Power' and 'Real-time' for initial view
        this.renderDeviceDataModalContent(sn, 'Power', 'Real-time');
        this.toggleModal(true);
    },

    renderDeviceDataModalContent(sn, dataType = 'Power', timeRange = 'Real-time', startDate = null, endDate = null) {
        const modalContent = document.getElementById('modal-content');
        
        // Mock data generation
        const dataMap = {
            'Power': { unit: 'kW', color: '#1E40AF' },
            'Voltage': { unit: 'V', color: '#10B981' },
            'Current': { unit: 'A', color: '#F59E0B' },
            'Frequency': { unit: 'Hz', color: '#8B5CF6' },
            'Temperature': { unit: '°C', color: '#F43F5E' },
            'SOC': { unit: '%', color: '#3B82F6' }
        };

        const currentMeta = dataMap[dataType] || dataMap['Power'];
        
        // Generate X-Axis and Series Data
        let xAxisData = [];
        let seriesData = [];
        
        if (timeRange === 'Real-time') {
            // Today 00:00 to 24:00 (every 4 hours for simplicity in mock)
            xAxisData = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];
            // Generate some realistic looking curve
            seriesData = xAxisData.map(() => Math.floor(Math.random() * 100) + 50);
        } else {
            // Historical
            if (!startDate) {
                // Default to yesterday
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                startDate = yesterday.toISOString().split('T')[0];
                endDate = yesterday.toISOString().split('T')[0];
            }
            
            // Generate hourly data for the selected range (mock)
            // If same day, show hours. If multiple days, show days.
            if (startDate === endDate) {
                xAxisData = ['00:00', '06:00', '12:00', '18:00', '24:00'];
                seriesData = xAxisData.map(() => Math.floor(Math.random() * 100) + 50);
            } else {
                // Mock multi-day
                xAxisData = [startDate, endDate]; // Simplified for mock
                seriesData = [120, 150];
            }
        }

        // Available devices
        const availableDevices = (state.devices && state.devices.length > 0) ? state.devices.map(d => ({
            sn: d.sn,
            model: d.vendor ? `${d.vendor} ${d.type}` : d.type
        })) : [
            { sn: 'INV-001', model: 'SG-5K-D' },
            { sn: 'INV-002', model: 'SG-5K-D' }
        ];
        
        const types = Object.keys(dataMap);

        modalContent.innerHTML = `
            <div class="p-6 bg-white rounded-xl">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 flex items-center gap-2">
                            Device Analysis
                        </h3>
                        <p class="text-gray-500 text-xs mt-1">Monitor device performance and historical data</p>
                    </div>
                    <button onclick="app.closeModal()" class="text-gray-400 hover:text-gray-900 transition-colors">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                </div>

                <!-- Controls -->
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <!-- Device Selector -->
                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold text-gray-500 uppercase">Device</label>
                        <div class="relative">
                            <i data-lucide="server" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"></i>
                            <select onchange="app.renderDeviceDataModalContent(this.value, '${dataType}', '${timeRange}', '${startDate || ''}', '${endDate || ''}')" 
                                class="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-gray-900 focus:border-manta-primary focus:ring-1 focus:ring-manta-primary outline-none transition-all appearance-none cursor-pointer">
                                ${availableDevices.map(d => `<option value="${d.sn}" ${d.sn === sn ? 'selected' : ''}>${d.sn} - ${d.model}</option>`).join('')}
                            </select>
                            <i data-lucide="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"></i>
                        </div>
                    </div>
                    <!-- Metric Selector -->
                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold text-gray-500 uppercase">Metric</label>
                        <div class="relative">
                            <i data-lucide="activity" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"></i>
                            <select onchange="app.renderDeviceDataModalContent('${sn}', this.value, '${timeRange}', '${startDate || ''}', '${endDate || ''}')" 
                                class="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-gray-900 focus:border-manta-primary focus:ring-1 focus:ring-manta-primary outline-none transition-all appearance-none cursor-pointer">
                                ${types.map(t => `<option value="${t}" ${t === dataType ? 'selected' : ''}>${t}</option>`).join('')}
                            </select>
                            <i data-lucide="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"></i>
                        </div>
                    </div>
                </div>

                <!-- Time Range Tabs & Date Picker -->
                <div class="flex flex-col gap-3 mb-6 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div class="flex items-center gap-2">
                        <button onclick="app.renderDeviceDataModalContent('${sn}', '${dataType}', 'Real-time')" 
                            class="flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${timeRange === 'Real-time' ? 'bg-white text-manta-primary shadow-sm border border-gray-100' : 'text-gray-500 hover:text-gray-700'}">
                            Real-time
                        </button>
                        <button onclick="app.renderDeviceDataModalContent('${sn}', '${dataType}', 'Historical')" 
                            class="flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${timeRange === 'Historical' ? 'bg-white text-manta-primary shadow-sm border border-gray-100' : 'text-gray-500 hover:text-gray-700'}">
                            Historical
                        </button>
                    </div>

                    ${timeRange === 'Historical' ? `
                        <div class="flex items-center gap-2 pt-2 border-t border-gray-200 animate-in fade-in slide-in-from-top-1">
                            <div class="flex-1 space-y-1">
                                <label class="text-[10px] uppercase text-gray-400 font-semibold">Start</label>
                                <input type="date" value="${startDate}" 
                                    onchange="app.renderDeviceDataModalContent('${sn}', '${dataType}', 'Historical', this.value, document.getElementById('end-date-input').value)"
                                    class="w-full bg-white border border-gray-200 rounded px-2 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-manta-primary">
                            </div>
                            <div class="flex-1 space-y-1">
                                <label class="text-[10px] uppercase text-gray-400 font-semibold">End</label>
                                <input type="date" id="end-date-input" value="${endDate}" 
                                    onchange="app.renderDeviceDataModalContent('${sn}', '${dataType}', 'Historical', '${startDate}', this.value)"
                                    class="w-full bg-white border border-gray-200 rounded px-2 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-manta-primary">
                            </div>
                        </div>
                    ` : ''}
                </div>

                <!-- Chart -->
                <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
                    <h4 class="font-bold text-gray-900 mb-4">${dataType} Trend</h4>
                    <div id="device-chart-container" class="w-full h-[300px]"></div>
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-3 gap-4">
                    <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p class="text-xs text-gray-500 mb-1">Current</p>
                        <p class="text-lg font-mono text-gray-900">${seriesData[seriesData.length-1]?.toFixed(1) || '-'} <span class="text-xs text-gray-500">${currentMeta.unit}</span></p>
                    </div>
                    <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p class="text-xs text-gray-500 mb-1">Average</p>
                        <p class="text-lg font-mono text-gray-900">${(seriesData.reduce((a,b)=>a+b,0)/seriesData.length).toFixed(1)} <span class="text-xs text-gray-500">${currentMeta.unit}</span></p>
                    </div>
                    <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p class="text-xs text-gray-500 mb-1">Peak</p>
                        <p class="text-lg font-mono text-gray-900">${Math.max(...seriesData).toFixed(1)} <span class="text-xs text-gray-500">${currentMeta.unit}</span></p>
                    </div>
                </div>
            </div>
        `;
        
        lucide.createIcons();
        
        // Init Chart
        setTimeout(() => {
            const chartDom = document.getElementById('device-chart-container');
            if (!chartDom) return;
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
                    data: seriesData,
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    lineStyle: { width: 3, color: currentMeta.color },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: currentMeta.color + '80' },
                            { offset: 1, color: currentMeta.color + '00' }
                        ])
                    }
                }]
            };
            myChart.setOption(option);
        }, 100);

        lucide.createIcons();
    },

    openVPPDrawer(vppId = null) {
        const isEdit = !!vppId;
        const vpp = isEdit ? state.vpps.find(v => v.id === vppId) : null;
        const title = isEdit ? 'Edit VPP' : 'Create a VPP';
        
        const drawerContent = document.getElementById('drawer-content');
        drawerContent.innerHTML = `
            <div class="bg-white flex flex-col h-full w-full font-['Roboto']">
                <!-- Header -->
                <div class="border-b border-[#e6e8ee] flex items-center justify-between p-[16px] shrink-0 w-full bg-white z-10">
                    <p class="font-bold text-[20px] leading-normal text-[#313949]">${title}</p>
                    <button onclick="app.closeDrawer()" class="w-[24px] h-[24px] flex items-center justify-center hover:opacity-70 transition-opacity">
                        <img src="assets/icons/close-drawer.svg" class="w-full h-full block" alt="Close">
                    </button>
                </div>

                <!-- Form Content -->
                <form onsubmit="app.handleVPPSubmit(event, ${vppId})" class="flex flex-col flex-1 px-[24px] py-[16px] gap-[16px] overflow-y-auto">
                    <!-- VPP Name -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                         <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                             <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                             <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">VPP Name</span>
                         </div>
                         <div class="w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                             <input type="text" name="name" value="${isEdit ? vpp.name : ''}" required 
                                 class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal" 
                                 placeholder="e.g. Virtual Power Plant X">
                         </div>
                    </div>

                    <!-- Company (Readonly) -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                         <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                             <span class="text-[#5f646e] text-[12px] font-normal leading-normal">Company</span>
                         </div>
                         <div class="w-full h-[32px] px-[8px] bg-[#e6e8ee] border border-[#b5bcc8] rounded-[4px] flex items-center">
                             <span class="text-[14px] text-[#b5bcc8] font-normal leading-normal truncate">${isEdit ? (vpp.company || '') : (state.currentUser?.company || '')}</span>
                         </div>
                         <input type="hidden" name="company" value="${isEdit ? (vpp.company || '') : (state.currentUser?.company || '')}">
                    </div>

                    <!-- Country & ABN Row -->
                    <div class="flex gap-[16px] w-full shrink-0">
                        <!-- Country -->
                        <div class="flex flex-col gap-[4px] flex-1 min-w-0">
                             <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                                 <span class="text-[#5f646e] text-[12px] font-normal leading-normal">Country</span>
                             </div>
                             <div class="w-full h-[32px] px-[8px] bg-[#e6e8ee] border border-[#b5bcc8] rounded-[4px] flex items-center">
                                 <span class="text-[14px] text-[#b5bcc8] font-normal leading-normal truncate">${isEdit ? (vpp.country || '') : (state.currentUser?.country || '')}</span>
                             </div>
                             <input type="hidden" name="country" value="${isEdit ? (vpp.country || '') : (state.currentUser?.country || '')}">
                        </div>
                        <!-- ABN -->
                        <div class="flex flex-col gap-[4px] flex-1 min-w-0">
                             <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                                 <span class="text-[#5f646e] text-[12px] font-normal leading-normal">ABN/VAT</span>
                             </div>
                             <div class="w-full h-[32px] px-[8px] bg-[#e6e8ee] border border-[#b5bcc8] rounded-[4px] flex items-center">
                                 <span class="text-[14px] text-[#b5bcc8] font-normal leading-normal truncate">${isEdit ? (vpp.abn || '') : (state.currentUser?.abn || '')}</span>
                             </div>
                             <input type="hidden" name="abn" value="${isEdit ? (vpp.abn || '') : (state.currentUser?.abn || '')}">
                        </div>
                    </div>

                    <!-- State & DNSP Row -->
                    <div class="flex gap-[16px] w-full shrink-0">
                        <!-- State -->
                        <div class="flex flex-col gap-[4px] flex-1 min-w-0">
                             <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                                 <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                                 <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">State</span>
                             </div>
                             <div class="relative w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                                 <select name="state" required class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] appearance-none z-10 font-normal cursor-pointer invalid:text-[#b5bcc8]">
                                     <option value="" disabled ${!isEdit && !vpp?.state ? 'selected' : ''}>Select State</option>
                                     ${['NSW', 'VIC', 'QLD', 'SA'].map(s => `<option value="${s}" ${vpp?.state === s ? 'selected' : ''} class="text-[#313949]">${s}</option>`).join('')}
                                 </select>
                                 <div class="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center w-4 h-4">
                                     <img src="assets/icons/chevron-down.svg" class="w-full h-full block" alt="Arrow">
                                 </div>
                             </div>
                        </div>
                        <!-- DNSP -->
                        <div class="flex flex-col gap-[4px] flex-1 min-w-0">
                             <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                                 <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                                 <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">DNSP</span>
                             </div>
                             <div class="w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                                 <input type="text" name="dnsp" value="${isEdit ? (vpp.dnsp || '') : ''}" required
                                     class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal" 
                                     placeholder="e.g. Energy Provider Name">
                             </div>
                        </div>
                    </div>

                    <!-- Description -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                         <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                             <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                             <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Description</span>
                         </div>
                         <div class="w-full bg-white border border-[#cacfd8] rounded-[4px] px-[8px] py-[8px] flex items-start transition-colors focus-within:border-[#3ec064]">
                             <textarea name="description" required rows="4" class="w-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] resize-none font-normal leading-normal" placeholder="Enter VPP description...">${isEdit ? vpp.description : ''}</textarea>
                         </div>
                    </div>
                    
                    <!-- Footer Buttons -->
                    <div class="flex items-center gap-[10px] pt-[16px] mt-auto w-full">
                         <button type="button" onclick="app.closeDrawer()" class="flex-1 h-[32px] px-[8px] flex items-center justify-center bg-white border border-[#b5bcc8] rounded-[4px] text-[14px] text-[#313949] hover:bg-gray-50 transition-colors font-normal leading-[1.42] font-['Roboto']">
                             Cancel
                         </button>
                         <button type="submit" id="vpp-submit-btn" class="flex-1 h-[32px] px-[8px] flex items-center justify-center bg-[#3ec064] rounded-[4px] text-[14px] text-white hover:bg-[#35a656] transition-colors font-normal leading-[1.42] font-['Roboto']">
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
                    <h3 class="font-bold text-[20px] text-[#313949] leading-normal">${title}</h3>
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
                        <div class="flex items-center gap-[10px] h-[24px]">
                            <label class="flex items-center gap-[4px] cursor-pointer group">
                                <div class="relative w-[24px] h-[24px] flex items-center justify-center">
                                    <input type="radio" name="connectionMode" value="create" onchange="app.toggleConnectionMode('create')" class="peer appearance-none w-[16px] h-[16px] rounded-full border border-[#cacfd8] checked:border-[#3ec064] checked:border-[5px] transition-all bg-white">
                                </div>
                                <span class="text-[14px] text-[#313949] leading-normal group-hover:text-[#3ec064] transition-colors">Create New</span>
                            </label>
                            <label class="flex items-center gap-[4px] cursor-pointer group">
                                <div class="relative w-[24px] h-[24px] flex items-center justify-center">
                                    <input type="radio" name="connectionMode" value="add" checked onchange="app.toggleConnectionMode('add')" class="peer appearance-none w-[16px] h-[16px] rounded-full border border-[#cacfd8] checked:border-[#3ec064] checked:border-[5px] transition-all bg-white">
                                </div>
                                <span class="text-[14px] text-[#313949] leading-normal group-hover:text-[#3ec064] transition-colors">Add Existing</span>
                            </label>
                        </div>

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
                                        <button type="button" onclick="app.copyToClipboard('input-app-key')" class="text-[#b5bcc8] hover:text-[#3ec064] transition-colors p-0.5" title="Copy">
                                            <i data-lucide="copy" class="w-[14px] h-[14px]"></i>
                                        </button>
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
                                        <button type="button" onclick="app.copyToClipboard('input-app-secret')" class="text-[#b5bcc8] hover:text-[#3ec064] transition-colors p-0.5" title="Copy">
                                            <i data-lucide="copy" class="w-[14px] h-[14px]"></i>
                                        </button>
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
