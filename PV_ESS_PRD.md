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

---

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

---

## 3. 功能需求 (Functional Requirements)

### 3.1 模块一：PV ESS 概览与列表 (Dashboard & List)

#### 3.1.1 统计概览卡片 (Statistics Cards)
在页面顶部展示关键业务指标，帮助用户快速了解舰队健康度。
*   **总设备数 (Total Devices)**: 当前筛选条件下的设备总量。
*   **状态分布 (Status Breakdown)**:
    *   Online (在线): 绿色指示灯。
    *   Offline (离线): 灰色指示灯。
    *   Disconnected (断开连接): 红色/警告色。
*   **容量聚合 (Aggregated Capacity)**:
    *   Rated Power (额定功率): 单位 kW/MW。
    *   PV Capacity (光伏容量): 单位 kWp/MWp。
    *   Rated Capacity (额定容量): 单位 kWh/MWh。

#### 3.1.2 设备列表表格 (Device Table)
提供详细的设备台账信息，支持滚动和分页。
*   **列定义**:
    *   **Status**: 设备在线状态 (带颜色圆点标识)。
    *   **SN**: 设备序列号 (唯一标识)。
    *   **NMI**: 国家计量标识符 (National Metering Identifier)。
    *   **Manufacturer**: 设备制造商 (如 Tesla, Sungrow 等)。
    *   **Model**: 设备型号。
    *   **Capacity**: 当前可用容量。
    *   **Rated Power**: 额定功率。
    *   **SOC**: 荷电状态 (State of Charge, %)。
    *   **Firmware**: 固件版本。
    *   **Tags**: 自定义标签。
    *   **Last Seen**: 最后上报时间。

#### 3.1.3 搜索与过滤
*   **全局搜索**: 支持通过 SN (序列号) 或 NMI 进行模糊搜索。
*   **设备类型过滤**: 默认过滤为 "Battery" (针对 PV ESS 视图)。

---

### 3.2 模块二：设备详情页 (Device Details)

#### 3.2.1 头部信息 (Header Info)
展示设备的基础归属和状态信息。
*   **Assigned VPP**: 设备当前归属的虚拟电厂名称。
*   **NMI**: 计量点标识。
*   **State**: 设备所在州/地区 (用于电网区域划分)。
*   **Grid Status**: 实时并网状态 (Online/Offline)。

#### 3.2.2 能源拓扑可视化 (Energy Topology Visualization)
**核心功能**：通过动态动画展示能源流向，辅助运维人员理解系统运行状态。
*   **组件展示**:
    *   **PV Array (光伏阵列)**: 左侧显示，展示太阳能发电状态。
    *   **Battery (电池)**: 左侧显示，展示充放电状态及剩余电量。
    *   **Inverter (逆变器)**: 中间核心组件，负责 DC/AC 转换。
    *   **Grid (电网)**: 右侧显示，展示馈网或取电状态。
    *   **House Load (家庭负载)**: (可选) 展示本地负载消耗。
*   **动态流向 (Dynamic Flow)**:
    *   使用动画线条表示电流方向 (如 PV -> Inverter, Battery <-> Inverter, Inverter <-> Grid)。
    *   **DC 流向**: PV/Battery 与 Inverter 之间。
    *   **AC 流向**: Inverter 与 Grid/Load 之间。
*   **交互效果**:
    *   组件悬停效果 (Hover effects)。
    *   实时数据刷新 (适配高频遥测数据)。

#### 3.2.3 关键组件详情 (Component Details)
在拓扑图下方，展示核心硬件组件的详细遥测数据卡片。

*   **Inverter (逆变器) 卡片**:
    *   **标识信息**: SN (序列号), Manufacturer (厂商), Model (型号), Type (类型, 如 String Inverter)。
    *   **功率指标**:
        *   **Rated Power**: 额定功率。
        *   **Input Power**: 实时输入功率 (DC端)。
        *   **Output Power**: 实时输出功率 (AC端)。
    *   **状态**: Operating mode (运行模式, 如 Normal)。

*   **Battery (电池) 卡片**:
    *   **基本信息**: Model (型号)。
    *   **容量指标**:
        *   **Rated Capacity**: 额定容量。
        *   **Available Charge**: 可充电量 (剩余空闲容量)。
        *   **Available Discharge**: 可放电量 (当前剩余电量)。
    *   **SOC 指标**:
        *   **SOC**: 当前荷电状态百分比。
        *   **SOC Floor**: 设定的放电深度保护下限。

#### 3.2.4 运行数据分析 (Operation Analysis)
提供设备历史运行数据的可视化分析模块。

*   **控制栏 (Control Bar)**:
    *   **Granularity (时间粒度)**: 下拉选择 Day (日), Month (月), Year (年), Total (累计)。
    *   **Date Navigation (日期导航)**: 支持日期前后切换及日历控件选择。
    *   **Data Tabs (数据维度)**:
        *   **Status**: 设备在线/离线状态图表。
        *   **Generation**: 发电功率/电量曲线。
        *   **Consumption**: 用电/充电功率曲线。

*   **交互式图表 (Interactive Chart)**:
    *   基于 ECharts 实现的时间序列图。
    *   **Tooltip**: 鼠标悬停显示具体时间点的数据（如 "18:35 Online"）。
    *   **缩放与平移**: 支持对时间轴进行缩放查看细节。

---

## 4. 非功能需求 (Non-Functional Requirements)

### 4.1 性能要求
*   **海量设备支持**: 列表页需支持 10,000+ 设备的高效渲染 (需采用虚拟滚动或分页优化)。
*   **渲染响应**: 拓扑图动画需流畅 (60fps)，无明显卡顿。

### 4.2 兼容性
*   **多厂商适配**: 系统需兼容不同品牌的设备协议 (Vendor Agnostic)，在界面上统一展示标准化的数据模型。
*   **响应式设计**: 适配 Desktop (主) 及 Tablet/Mobile (辅) 访问。

### 4.3 数据时效性
*   状态和功率数据应支持准实时更新 (Real-time updates)，延迟控制在秒级/分钟级 (视协议而定)。

---

## 5. 附录：数据字典与映射 (Data Dictionary)

| 字段名 | 含义 | 数据类型 | 备注 |
| :--- | :--- | :--- | :--- |
| SN | Serial Number | String | 设备唯一物理标识 |
| NMI | National Metering Identifier | String | 澳洲电力市场标准计量点ID |
| SOC | State of Charge | Percentage | 0-100% |
| Rated Power | 额定功率 | Number | 单位 kW |
| Rated Capacity | 额定容量 | Number | 单位 kWh |
