// Overview View
// Extracted from app.js lines 7953-8162
(function() {
    Object.assign(app, {
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
                                        <thead class="text-xs text-gray-500 tracking-wider border-b border-gray-100">
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
                        itemStyle: { color: '#A3E635', borderRadius: [4, 4, 0, 0] },
                        data: data.series[1].data
                    },
                    {
                        name: 'EV Charger',
                        type: 'bar',
                        barWidth: 8,
                        itemStyle: { color: '#F59E0B', borderRadius: [4, 4, 0, 0] },
                        data: data.series[2].data
                    }
                ]
            };

            myChart.setOption(option);

            window.addEventListener('resize', () => myChart.resize());

            this.overviewChart = myChart;
        }
    });
})();
