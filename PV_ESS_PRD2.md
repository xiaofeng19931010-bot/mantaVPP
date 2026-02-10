# PV ESS 产品需求文档 (PRD)

| 文档版本 | 修改日期 | 修改人 | 备注 |
| :--- | :--- | :--- | :--- |
| v1.0 | 2026-02-05 | Liam | 初始版本创建 |

## 1. 产品概述 (Product Overview)

### 1.1 产品简介
PV ESS (Photovoltaic Energy Storage System) 模块是 Manta 虚拟电厂 (VPP) 平台的核心组件。它为分布式储能设备提供全面的实时监控、资产管理和拓扑分析功能。该模块连接家庭和商业电池储能系统与电网运营商的控制室，提供从舰队级到单个电芯级的精细化可视性。

### 1.2 目标用户
*   **VPP 运营商 & 聚合商**: 需要管理成千上万的分布式资产。
*   **电网服务提供商**: 需要监控本地电网稳定性和电压支持情况。
*   **资产管理者**: 负责运维 (O&M) 和设备健康管理。

### 1.3 核心价值
*   **全舰队监控**: 即时掌握在线、离线及断连资产状态。
*   **深度诊断**: 通过能源拓扑图（PV、电池、逆变器、电网流向）进行下钻分析。
*   **智能搜索**: 通过序列号 (SN) 或 NMI 快速定位资产。
*   **容量聚合**: 实时汇总用于 VPP 交易的额定功率和容量。

## 2. 交互与流程 (User Flow & Navigation)

### 2.1 站点地图 (Site Map)
*   **一级菜单**: DERs (分布式能源)
    *   **二级菜单**: ESS (储能系统) -> 对应视图 `der_ess`
        *   **页面 A**: 设备列表与概览 (Device List & Dashboard)
        *   **页面 B**: 设备详情页 (Device Details) - *点击列表行进入*

### 2.2 用户路径
1.  用户点击侧边栏 "DERs" -> "ESS"。
2.  系统加载 PV ESS 概览页，展示关键指标卡片和设备列表。
3.  用户通过搜索框或状态筛选定位特定设备。
4.  用户点击设备行，进入设备详情页查看实时拓扑和遥测数据。

## 3. 功能需求 (Functional Requirements)

| 功能点 | 功能描述 | 内容 | 全局逻辑 |
| :--- | :--- | :--- | :--- |
| **3.1.1 统计概览卡片**<br>(Statistics Cards) | 在页面顶部展示关键业务指标，帮助用户快速了解舰队健康度。 | <ul><li><b>总设备数 (Total Devices)</b>: 当前筛选条件下的设备总量。</li><li><b>状态分布 (Status Breakdown)</b>:<ul><li>Online (在线): 绿色指示灯</li><li>Offline (离线): 灰色指示灯</li><li>Disconnected (断开连接): 红色/警告色</li></ul></li><li><b>容量聚合 (Aggregated Capacity)</b>:<ul><li>Rated Power (额定功率): 单位 kW/MW</li><li>PV Capacity (光伏容量): 单位 kWp/MWp</li><li>Rated Capacity (额定容量): 单位 kWh/MWh</li></ul></li></ul> | - |
| **3.1.2 设备列表表格**<br>(Device Table) | 提供详细的设备台账信息，支持滚动和分页。 | <ul><li><b>列定义</b>:<ul><li><b>Status</b>: 设备在线状态 (带颜色圆点标识)</li><li><b>SN</b>: 设备序列号 (唯一标识)</li><li><b>NMI</b>: 国家计量标识符</li><li><b>Manufacturer</b>: 设备制造商 (如 Tesla, Sungrow 等)</li><li><b>Model</b>: 设备型号</li><li><b>Capacity</b>: 当前可用容量</li><li><b>Rated Power</b>: 额定功率</li><li><b>SOC</b>: 荷电状态 (%)</li><li><b>Firmware</b>: 固件版本</li><li><b>Tags</b>: 自定义标签</li><li><b>Last Seen</b>: 最后上报时间</li></ul></li></ul> | <ul><li><b>海量设备支持</b>: 列表页需支持 10,000+ 设备的高效渲染 (需采用虚拟滚动或分页优化)。</li></ul> |
| **3.1.3 搜索与过滤**<br>(Search & Filter) | 快速定位和筛选设备。 | <ul><li><b>全局搜索</b>: 支持通过 SN (序列号) 或 NMI 进行模糊搜索。</li><li><b>设备类型过滤</b>: 默认过滤为 "Battery" (针对 PV ESS 视图)。</li></ul> | <ul><li><b>空状态</b>: 搜索无结果或无设备时显示 "No Devices"。</li></ul> |
| **3.2.1 头部信息**<br>(Header Info) | 展示设备详情页的基础归属和状态信息。 | <ul><li><b>Assigned VPP</b>: 设备当前归属的虚拟电厂名称。</li><li><b>NMI</b>: 计量点标识。</li><li><b>State</b>: 设备所在州/地区。</li><li><b>Grid Status</b>: 实时并网状态 (Online/Offline)。</li></ul> | - |
| **3.2.2 能源拓扑可视化**<br>(Energy Topology) | 通过动态动画展示能源流向，辅助运维人员理解系统运行状态。 | <ul><li><b>组件展示</b>:<ul><li><b>PV Array</b>: 光伏阵列 (发电状态)</li><li><b>Battery</b>: 电池 (充放电状态及剩余电量)</li><li><b>Inverter</b>: 逆变器 (DC/AC 转换)</li><li><b>Grid</b>: 电网 (馈网/取电)</li><li><b>House Load</b>: 家庭负载 (可选)</li></ul></li><li><b>动态流向</b>:<ul><li>使用动画线条表示电流方向</li><li>DC 流向: PV/Battery 与 Inverter 之间</li><li>AC 流向: Inverter 与 Grid/Load 之间</li></ul></li><li><b>交互效果</b>: 组件悬停效果 (Hover effects)</li></ul> | <ul><li><b>渲染响应</b>: 拓扑图动画需流畅 (60fps)，无明显卡顿。</li><li><b>数据刷新</b>: 适配高频遥测数据。</li></ul> |
| **3.2.3 关键组件详情**<br>(Component Details) | 在拓扑图下方，展示核心硬件组件的详细遥测数据卡片。 | <ul><li><b>Inverter (逆变器) 卡片</b>:<ul><li><b>标识信息</b>: SN, Manufacturer, Model, Type</li><li><b>功率指标</b>: Rated Power, Input Power (DC), Output Power (AC)</li><li><b>状态</b>: Operating mode</li></ul></li><li><b>Battery (电池) 卡片</b>:<ul><li><b>基本信息</b>: Model</li><li><b>容量指标</b>: Rated Capacity, Available Charge, Available Discharge</li><li><b>SOC 指标</b>: SOC (%), SOC Floor</li></ul></li></ul> | <ul><li><b>数据时效性</b>: 状态和功率数据应支持准实时更新，延迟控制在秒级/分钟级。</li></ul> |
| **3.2.4 运行数据分析**<br>(Operation Analysis) | 提供设备历史运行数据的可视化分析模块。 | <ul><li><b>控制栏 (Control Bar)</b>:<ul><li><b>Granularity</b>: Day, Month, Year, Total</li><li><b>Date Navigation</b>: 日期前后切换及日历控件</li><li><b>Data Tabs</b>: Status, Generation, Consumption</li></ul></li><li><b>交互式图表 (Interactive Chart)</b>:<ul><li>基于 ECharts 实现的时间序列图</li><li><b>Tooltip</b>: 鼠标悬停显示具体时间点数据</li><li><b>缩放与平移</b>: 支持时间轴操作</li></ul></li></ul> | <ul><li><b>兼容性</b>: 适配 Desktop (主) 及 Tablet/Mobile (辅) 访问。</li></ul> |

## 4. 非功能需求 (Non-Functional Requirements)

| 类别 | 需求描述 |
| :--- | :--- |
| **性能要求** | 海量设备支持 10,000+ 高效渲染；拓扑图动画流畅 (60fps)。 |
| **兼容性** | 多厂商适配 (Vendor Agnostic)；响应式设计 (Desktop/Tablet/Mobile)。 |
| **数据时效性** | 状态和功率数据支持准实时更新，延迟控制在秒级/分钟级。 |

## 5. 附录：数据字典与映射 (Data Dictionary)

| 字段名 | 含义 | 数据类型 | 备注 |
| :--- | :--- | :--- | :--- |
| SN | Serial Number | String | 设备唯一物理标识 |
| NMI | National Metering Identifier | String | 澳洲电力市场标准计量点ID |
| SOC | State of Charge | Percentage | 0-100% |
| Rated Power | 额定功率 | Number | 单位 kW |
| Rated Capacity | 额定容量 | Number | 单位 kWh |
