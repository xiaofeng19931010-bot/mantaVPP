# Manta VPP 用户操作手册 (User Manual)

## 1. 产品简介 (Introduction)

**Manta VPP** (Virtual Power Plant) 是一个智能化的虚拟电厂管理平台，旨在将分布式能源 (DERs) 聚合并参与电力市场交易。系统通过统一的语义模型和即插即用的驱动框架，实现了对光伏、储能等设备的快速接入、监控与智能调度。

本手册将指导您如何登录系统、管理设备、查看报表以及监控市场交易数据。

## 2. 快速开始 (Quick Start)

### 2.1 登录系统 (Login)

1.  **访问地址**: 打开浏览器，访问 [Manta VPP 平台](https://mantaweb.vercel.app/index.html)。
2.  **输入凭证**:
    *   **Email**: 输入您的注册邮箱 (例如: `liam.liu@client.com.au`)
    *   **Password**: 输入您的登录密码
3.  **登录**: 点击 "Login" 按钮进入系统。

> **注意**: 如果您忘记密码，请联系系统管理员重置。

### 2.2 界面概览 (Interface Overview)

登录成功后，您将看到系统主界面，主要包含以下区域：

*   **左侧导航栏 (Sidebar)**: 系统的主要功能入口，包括总览、电力市场、智能馈入、系统管理等。
*   **顶部状态栏 (Header)**: 显示面包屑导航、系统时间、通知中心及个人头像。
*   **主内容区 (Main Content)**: 展示当前功能模块的具体数据和操作界面。

## 3. 核心功能指南 (Core Features)

### 3.1 VPP 管理 (VPP Management)
点击导航栏的 **VPP Management** 进入。该模块用于创建和管理虚拟电厂实例。

*   **VPP 列表 (VPP List)**:
    *   支持 **卡片视图 (Card)** 和 **列表视图 (Form)** 切换。
    *   **筛选**: 可按 VPP 名称搜索或按区域 (State) 筛选。
    *   **关键指标**: 每个 VPP 卡片展示其下属设备的在线/离线状态、总额定功率、光伏容量及当日发电量。
*   **操作路径**:
    1.  **新建 VPP (Create VPP)**:
        *   点击页面右上角的 **"+"** 按钮打开创建侧边栏。
        *   填写 **VPP Name** (必填) 和 **Company** 信息。
        *   选择 **Pricing Region** (如 NSW) 和 **Active Market** (Spot/FCAS)。
        *   点击 **Submit** 完成创建。
    2.  **查看详情 (View Details)**: 点击任意 VPP 卡片或列表中的眼睛图标，进入详情页。
    3.  **编辑/删除 (Edit/Delete)**: 悬停在卡片右上角或列表操作列，点击 **Edit** (笔形) 或 **Delete** (垃圾桶) 图标。

#### 3.1.1 VPP 详情页 (VPP Details)
点击 VPP 列表中的 "查看" 图标或 VPP 名称进入详情页。

*   **头部概览 (Header Overview)**:
    *   **基础信息**: 显示 VPP 名称、所属公司、区域 (State/Country) 及当前活跃市场 (Active Market)。
    *   **状态统计**: 实时展示该 VPP 下所有 DER 的在线 (Online)、离线 (Offline) 和断连 (Disconnected) 数量。
    *   **核心指标 (Key Metrics)**:
        *   **Rated Power**: 总额定功率 (kW)。
        *   **PV Capacity**: 光伏装机容量 (kW)。
        *   **Rated Capacity**: 电池总容量 (kWh)。
        *   **Today Yield**: 当日发电量 (kWh)。

*   **功能选项卡 (Tabs)**:
    *   **DERs (设备列表)**:
        *   **列表展示**: 包含状态、SN、类型、厂商、SOC、当日发电量等详细字段。
        *   **搜索与筛选**: 支持按 SN、厂商、类型等关键词搜索设备。
        *   **操作路径**:
            *   **添加设备 (Add Devices)**:
                1. 点击列表右上角的 **Add** 按钮打开侧边栏。
                2. 在列表中勾选需添加的设备（支持通过 SN 搜索）。
                3. 点击 **Confirm** 完成添加。
            *   **查看设备 (View Device)**: 点击列表中的 **View** (眼睛) 图标跳转至设备详情页。
            *   **移除设备 (Remove Device)**: 点击列表中的 **Remove** (垃圾桶) 图标，确认后将设备从当前 VPP 移除。

### 3.2 DER Management (设备管理)
点击导航栏的 **DER Management** 展开子菜单，包含 **PV Plus ESS**、**Single PV** 和 **Single ESS** 三个模块，分别用于管理不同类型的分布式能源设备。

#### 3.2.1 PV Plus ESS (光储一体)
点击 **PV Plus ESS** 进入。该模块用于管理同时包含光伏和储能的混合系统。

*   **统计概览 (Statistics Cards)**:
    *   **Total Devices**: 设备总量。
    *   **Status Breakdown**: 在线 (Online)、离线 (Offline)、断连 (Disconnected) 的设备数量。
    *   **Aggregated Capacity**: 汇总的额定功率 (Rated Power)、光伏容量 (PV Capacity) 和额定容量 (Rated Capacity)。
*   **设备列表 (Device List)**:
    *   展示 Status, SN, Manufacturer, State, Rated Power, PV Capacity, Rated Capacity, SOC 等信息。
    *   **操作路径**:
        *   **查看详情 (View Details)**: 点击列表操作列的 **View** (眼睛) 图标进入设备详情页。
        *   **分配 VPP (Assign VPP)**:
            *   *注意*: 设备的 VPP 分配需在 **VPP Management** -> **VPP Details** 页面中通过 "Add Device" 操作完成。此处列表主要用于查看状态。
*   **设备详情页 (Device Details)**:
    *   **Energy Topology**: 动态展示 PV、Battery、Inverter、Grid 和 Load 之间的能源流向。
    *   **Component Details**: 展示 Inverter 和 Battery 的详细遥测数据（如功率、SOC、电压等）。
    *   **Operational Data**: 提供发电量、用电量及自用率的历史数据图表分析。

#### 3.2.2 Single PV (纯光伏)
点击 **Single PV** 进入。该模块用于管理仅有光伏发电系统的设备。

*   **功能特点 (Features)**:
    *   专注于光伏发电数据的监控。
    *   **Topology**: 仅展示 PV Array、Inverter、Grid 和 Load。
    *   **Key Metrics**: 重点关注 PV Capacity (光伏容量) 和 Today Yield (当日发电量)。

#### 3.2.3 Single ESS (纯储能)
点击 **Single ESS** 进入。该模块用于管理独立的电池储能系统。

*   **功能特点 (Features)**:
    *   专注于电池充放电及 SOC 管理。
    *   **Topology**: 仅展示 Battery、Inverter、Grid 和 Load。
    *   **Key Metrics**: 重点关注 Rated Capacity (额定容量) 和 SOC (荷电状态)。

### 3.3 电力现货市场 (Spot Market)
点击导航栏的 **Spot Market** 展开子菜单，包含 **Spot Trading**、**Trading Rules** 和 **Arbitrage Points** 三个模块，为用户提供实时的电力现货市场数据监控、自动交易策略配置以及套利机会分析功能。

#### 3.3.1 Spot Trading (现货交易)
点击 **Spot Trading** 进入。该模块展示实时价格趋势和关键市场指标，以及自动触发的交易事件。

*   **顶部控制与指标 (Top Controls & Stats)**:
    *   **Pricing Region**: 切换价格区域 (NSW, VIC, QLD, SA, TAS)。
    *   **Time Mode**: 切换 **Real-time** (实时) 或 **Historical** (历史) 模式。
    *   **Settings**: 叠加天气数据 (Weather) 或套利点信号 (Arbitrage Point)。
    *   **核心指标栏**: 展示当前现货价格 (Spot)、预调度价格 (Pre-Dispatch)、预测价格 (Forecast Spot)、总可充/放电容量、交易机会及预计收益。
*   **价格趋势图表 (Price Trend Chart)**:
    *   **曲线展示**: 包含 Spot Price (柱状背景)、Pre-Dispatch Price (折线) 和 Forecast Price (柱状前景)。
    *   **交互**: 支持缩放、平移、全屏查看及悬停显示详细数据 (Tooltip)。
    *   **操作路径**:
        *   **切换时间模式**: 点击顶部 **Time Mode** 切换 Real-time / Historical。
        *   **查看历史数据**: 选择 Historical 模式后，点击日期选择器选择特定日期。
        *   **全屏查看**: 点击图表右上角的 **全屏图标** 放大图表。
*   **交易事件记录 (Trading Events)**:
    *   记录系统根据规则自动触发的交易历史。
    *   **列表字段**: Date, VPP Name, Status, Pricing Region, Event (Charge/Discharge), Volume, Est. Revenue 等。

#### 3.4.2 Trading Rules (交易规则)
点击 **Trading Rules** 进入。该模块用于配置自动化交易规则。

*   **规则列表 (Rules List)**:
    *   展示已创建的交易策略规则。
    *   **字段**: Name, Trigger From (价格/信号), Trigger Condition (触发条件), Event (动作), Status (Active/Inactive)。
    *   **操作**:
        *   **Create**: 新建规则。
        *   **Edit**: 修改现有规则的触发条件、状态或适用 VPP。
        *   **History**: 查看规则的历史变更记录。
        *   **Delete**: 删除非活跃规则。
*   **创建/编辑规则 (Create/Edit Rules)**:
    *   **操作路径**:
        1.  点击列表右上角的 **Create Rule** 按钮，或点击列表项的 **Edit** 按钮。
        2.  **基本信息**: 输入 Name, 选择 Pricing Region。
        3.  **配置触发**:
            *   若选 **Price**: 设置价格阈值 (如 > 300) 和动作 (如 Discharge)。
            *   若选 **Arbitrage Point**: 设置信号条件 (如 Signal by Spot = Discharge)。
        4.  **设置范围**: 选择 Applicable VPP 和 Ignore Time。
        5.  点击 **Submit** 保存规则。
    *   **字段说明**:
        *   **Trigger From**: 选择触发源。
        *   **Name**: 规则名称 (必填)。
        *   **Pricing Region**: 适用区域 (NSW, VIC, QLD, SA, WA)，默认为 NSW。
        *   **Description**: 规则的详细描述。
    *   **触发配置 (Trigger Configuration)**:
        *   **Trigger From**: 选择触发源。
            *   **Price**: 基于价格触发。需配置 **Trigger Condition** (如 Spot Price > 300 $/MW) 和 **Event** (Charge/Discharge/Stop)。
            *   **Arbitrage Point**: 基于套利信号触发。需配置 **Trigger Condition** (如 Signal by Spot = Discharge)。此类规则自动执行对应信号动作。
    *   **生效范围 (Scope & Constraints)**:
        *   **Status**: Active (启用) / Inactive (停用)。
        *   **Applicable VPP**: 选择应用该规则的 VPP (支持多选)。
        *   **Ignore Time**: 为特定 VPP 设置不响应规则的时间段。
            *   支持设置开始与结束时间 (Start - End Time)。
            *   支持设置屏蔽频率 (Everyday, Weekly, Custom Date Range)。

#### 3.3.3 Arbitrage Points (套利点)
点击 **Arbitrage Points** 进入。该模块提供高频 (5分钟粒度) 的市场套利信号分析，帮助用户识别并验证交易策略。

*   **顶部筛选与控制 (Top Controls & Filters)**:
    *   **Pricing Region**: 切换价格区域 (NSW, VIC, QLD, SA, TAS)。
    *   **Time Mode**:
        *   **Real-time**: 展示当日及未来时段的实时套利信号。
        *   **Historical**: 按日期范围 (Start Date - End Date) 查询历史套利点数据。
    *   **Signal Filters**: 快速筛选不同类型的套利信号。
        *   **Discharge**: 绿色标识 (放电信号)。
        *   **Charge**: 蓝色标识 (充电信号)。
        *   **Normal**: 灰色标识 (正常价格区间)。
        *   **Abnormal**: 红色标识 (异常信号)。
    *   **操作路径**:
        *   **分析信号**: 切换至 **Historical** 模式，选择日期，勾选 **Discharge/Charge** 过滤器，查看高收益机会。

*   **数据列表 (Data Table)**:
    *   **Time**: 结算时间点 (5分钟间隔)。
    *   **Spot Price**: 实时现货价格 ($/MW)。
    *   **Forecast Spot**: 预测现货价格 ($/MW)。
    *   **Time / Forecast Spot**: 未来四个 5 分钟时间段的滚动预测价格序列。
    *   **Signal by Forecast**: 基于预测价格生成的交易信号。
    *   **Signal by Spot**: 基于实际现货价格确认的最终交易信号。
    *   **分页控制**: 支持切换每页显示行数 (10/20/50/100) 及翻页操作。

### 3.4 报表管理 (Reports)
点击导航栏的 **Reports** 展开子菜单，包含 **VPP Events** 和 **DER Events** 两个模块，提供从 VPP 聚合层级到设备层级的详细事件记录和执行分析报表。

#### 3.4.1 VPP Events (VPP 事件)
点击 **VPP Events** 进入。该模块展示 VPP 聚合层级的调度事件，支持按时间和状态进行多维度筛选与导出。

*   **顶部筛选与控制 (Top Controls & Filters)**:
    *   **Time Mode**:
        *   **Real-time**: 实时模式，查看当天的调度事件。
        *   **Historical**: 历史模式，支持选择日期范围 (Start Date - End Date) 查询历史记录。
    *   **Status Filter**: 按执行状态筛选 (All / Completed / Executing / Partially Completed / Incompleted)。
    *   **Search**: 支持对 VPP 名称、事件类型等关键词进行模糊搜索。
    *   **Export**: 点击导出按钮将当前筛选结果导出为 Excel/CSV 文件。
*   **数据列表 (Data Table)**:
    *   **Date**: 事件日期。
    *   **VPP**: VPP 名称。
    *   **Status**: 执行状态 (如 Completed, Executing)。
    *   **Pricing Region**: 价格区域 (如 NSW, VIC)。
    *   **Event**: 事件类型 (如 Charge, Discharge)。
    *   **Time Range**: 事件执行的时间段 (Start Time - End Time)。
    *   **Metrics**: 包含 Participated Power (参与功率), Est. Volume (预估电量), Avg. Price (平均价格), Est. Revenue (预估收益)。
    *   **Actions**: 点击 **View Details** (眼睛图标) 查看该事件关联的设备级执行明细。

#### 3.4.2 DER Events (设备事件)
点击 **DER Events** 进入。该模块展示具体设备 (DER) 的执行日志，用于排查单台设备的响应情况。

*   **顶部筛选与控制 (Top Controls & Filters)**:
    *   **Time Mode**: 支持 **Real-time** (实时) 和 **Historical** (历史) 模式切换。
    *   **Status Filter**: 按设备执行状态筛选 (All / Completed / Executing / Incompleted)。
    *   **Search**: 支持对 SN (序列号)、VPP 名称、事件类型等关键词进行搜索。
    *   **Export**: 支持导出当前筛选的设备级事件数据。
*   **数据列表 (Data Table)**:
    *   **Date**: 事件发生日期。
    *   **SN**: 设备序列号。
    *   **VPP**: 所属 VPP 名称。
    *   **Status**: 设备执行状态。
    *   **Pricing Region**: 所在价格区域。
    *   **Trigger From**: 触发来源 (User / Price / System)。
    *   **Trigger Condition**: 触发条件说明。
    *   **Event**: 动作类型 (Charge / Discharge)。
    *   **Time Range**: 执行起止时间。
    *   **Metrics**: 包含 Participated Power, Est. Volume, Avg. Price, Est. Revenue。

## 4. 系统设置 (System Settings)

### 4.1 设备接入管理 (DER Access)
点击导航栏 **System** -> **DER Access** 进入。该模块用于管理与第三方云平台或硬件网关的连接（即 "Access"），实现对分布式能源设备 (DER) 的集中接入与管理。

#### 4.1.1 Access 列表 (Access List)
系统默认以卡片视图展示所有已创建的连接。

*   **视图切换**: 点击右上角的切换按钮，可在 **Card View** (卡片视图) 和 **List View** (列表视图) 之间切换。
*   **Access 卡片信息**:
    *   **Name**: Access 名称 (即数据平台名称)。
    *   **Status**: 连接状态。
        *   **Establishing** (黄色): 连接建立中。
        *   **Established** (绿色): 连接已建立，正常运行。
        *   **Disconnected** (红色/灰色): 连接断开或网络中断。
        *   **Closed** (灰色): 连接已手动关闭。
        *   **Failed** (红色): 连接失败。
    *   **Statistics**: 展示关联的 DER 总数 (DERs) 以及在线 (Online)、离线 (Offline) 的设备数量。
*   **筛选与搜索**:
    *   **Name**: 通过名称关键词搜索 Access。
    *   **Type**: 筛选接入类型 (如 Cloud, SCADA, Edge)。
    *   **Status**: 筛选连接状态 (All, Opened, Closed)。
*   **操作**:
    *   **View Details**: 点击卡片或列表项进入详情页。
    *   **Edit**: 编辑连接配置 (仅限 Failed 状态或特定配置)。
    *   **Close**: 断开连接 (仅限 Established 状态)。

#### 4.1.2 新建/连接 Access (Create/Connect Access)
点击页面右上角的 **Create** 或 **New** 按钮，打开连接配置侧边栏。

1.  **Type**: 选择接入类型 (如 Cloud)。
2.  **Manufacturer**: 选择设备厂商或数据平台 (如 Tesla, Sungrow 等)。
3.  **Connection Mode**:
    *   **Create New**: 创建新的连接。
    *   **Add Existing**: 添加已存在的连接。
4.  **Credentials**: 输入 **AppKey** 和 **AppSecret** (支持加密显示/明文切换及复制)。
5.  点击 **Submit** 完成创建。系统将自动尝试建立连接，状态从 Establishing 变为 Established。

#### 4.1.3 Access 详情 (Access Details)
点击 Access 卡片或列表中的 **View** 按钮进入详情页。

*   **概览 (Overview)**:
    *   展示 Access 的基本信息 (Type, AppKey, AppSecret)。
    *   显示核心统计指标：DERs (总数), Online (在线数), Offline (离线数)。
*   **设备列表 (Device List)**:
    *   展示该 Access 下所有关联设备的详细信息。
    *   **字段**: Status (状态), SN (序列号), State (所在州/区域)。
    *   **操作**: 支持通过 SN 搜索设备，点击 **View** (眼睛图标) 可跳转至设备详情页。

#### 4.1.4 关闭 Access (Close Access)
对于不再需要的连接，可以执行关闭操作。

1.  在列表页找到目标 Access。
2.  点击 **Close** 按钮 (链接断开图标)。
3.  在弹出的确认框中点击 **Confirm**。
    *   *注意*: 关闭 Access 后，该连接下的所有设备将不再受 Manta 系统控制。

### 4.2 账户管理 (Account)
点击导航栏 **System** -> **Account** 进入。该模块用于管理平台用户账号，包括创建新用户、编辑现有用户信息及重置密码。

#### 4.2.1 用户列表 (User List)
*   **字段包含**:
    *   **User Name**: 用户名。
    *   **Email**: 登录邮箱。
    *   **Status**: 账号状态 (Active/Inactive)。
    *   **Login Count**: 登录次数统计。
    *   **Last Login Time/IP**: 最后一次登录的时间和 IP 地址。
    *   **Current Login IP**: 当前会话的 IP 地址。
    *   **Create Time**: 账号创建时间。
*   **搜索与分页**:
    *   支持通过 **Email** 或 **User Name** 进行关键词搜索。
    *   支持自定义每页显示数量 (10/20/50 条) 及翻页操作。

#### 4.2.2 创建新用户 (Create User)
1.  点击列表上方的 **Create** 按钮 (或加号图标)。
2.  在侧边栏中填写用户信息：
    *   **First Name / Last Name**: 必填。
    *   **Email**: 必填，将作为登录账号。
    *   **Status**: 默认为 Active (启用)。
    *   **Password / Confirmation**: 设置初始登录密码。
3.  点击 **Submit** 完成创建。

#### 4.2.3 编辑用户 (Edit User)
1.  在用户列表中点击目标用户的 **Edit** 图标 (笔形按钮)。
2.  支持修改 First Name, Last Name, Email 及 Status。
3.  点击 **Submit** 保存更改。

#### 4.2.4 修改密码 (Change Password)
1.  在用户列表中点击目标用户的 **Key** 图标 (钥匙按钮)。
2.  输入新密码并确认。
3.  点击 **Submit** 完成重置。

## 6. 名词解释 (Glossary)

下表汇总了文档中出现的关键指标和列表字段，按功能模块顺序排列。

| 功能模块 (Module) | 字段/指标 (Term) | 描述 (Description) |
| :--- | :--- | :--- |
| **Common (通用)** | **Pricing Region** | 适用的电价区域 (如 NSW, VIC, QLD, SA, TAS)。 |
| | **Date / Time** | 记录生成或事件发生的日期和时间。 |
| | **Status** | 对象当前的状态，如 Active/Inactive (规则/用户), Online/Offline (设备), Completed/Executing (事件)。 |
| | **Description** | 对规则、VPP 或设备的详细文本描述。 |
| | **Type** | 接入类型 (Cloud/Edge) 或设备类型 (PV/ESS)。 |
| | **Time Mode** | 时间维度选择，Real-time (实时) 或 Historical (历史)。 |
| **VPP Management** | **Name / VPP Name** | 虚拟电厂实例的名称。 |
| | **Company** | VPP 所属的运营公司或实体。 |
| | **Active Market** | VPP 当前参与的电力市场类型，如 Spot (现货市场) 或 FCAS (频率控制辅助服务)。 |
| | **Rated Power** | VPP 总额定功率 (kW)。 |
| | **PV Capacity** | VPP 总光伏装机容量 (kW)。 |
| | **Rated Capacity** | VPP 总储能电池容量 (kWh)。 |
| | **Today Yield** | VPP 当日的累计发电量 (kWh)。 |
| **DER Management** | **DER** | 分布式能源资源 (Distributed Energy Resource)，泛指光伏、储能等设备。 |
| | **SN (Serial Number)** | 设备的唯一序列号。 |
| | **Manufacturer** | 设备制造厂商 (如 Tesla, Sungrow)。 |
| | **Online / Offline / Disconnected** | 设备的通讯连接状态。 |
| | **SOC (State of Charge)** | 电池的剩余电量百分比 (%)。 |
| | **Aggregated Capacity** | 聚合后的总容量指标。 |
| | **Energy Topology** | 展示能源流向的拓扑图，包括 PV、Battery、Grid、Load 等组件。 |
| | **Inverter** | 逆变器，将直流电 (DC) 转换为交流电 (AC) 的核心设备。 |
| **Spot Market** | **Spot Price** | 实时电力现货市场价格 ($/MWh)。 |
| | **Forecast Spot** | 预测的未来电力现货市场价格。 |
| | **Avg. Price** | 交易或事件执行期间的平均市场价格 ($/MWh)。 |
| | **Est. Revenue** | 预计产生的经济收益。 |
| | **Est. Volume** | 预计交易或执行的电量体积 (MWh)。 |
| | **Volume** | 实际成交或执行的电量。 |
| | **Trigger From** | 触发规则的数据来源，如 Price (价格) 或 Arbitrage Point (套利信号)。 |
| | **Trigger Condition** | 触发规则执行的具体逻辑条件 (如 Price > 300)。 |
| | **Event** | 触发的具体动作，如 Charge (充电)、Discharge (放电)、Stop (停止)。 |
| | **Applicable VPP** | 规则适用的虚拟电厂实例范围。 |
| | **Ignore Time** | 规则配置中设置的不生效时间段。 |
| | **Signal by Forecast** | 基于预测价格生成的交易信号。 |
| | **Signal by Spot** | 基于实时现货价格生成的交易信号。 |
| **Reports** | **Participated Power** | 实际参与响应或交易的功率值 (kW/MW)。 |
| | **Time Range** | 事件持续的起止时间段。 |
| **System Settings** | **Connection Mode** | 设备或平台的接入模式，如 "Create New" (新建) 或 "Add Existing" (添加现有)。 |
| | **AppKey / AppSecret** | 用于第三方 API 接入的认证凭证。 |
| | **Credentials** | 身份验证信息，通常指用户名/密码或 API 密钥。 |
| | **User Name** | 系统用户的显示名称。 |
| | **Email** | 用户登录系统的邮箱账号。 |
| | **Login Count** | 用户累计登录系统的次数。 |
| | **Last Login Time/IP** | 用户上一次登录系统的时间和 IP 地址。 |
| | **Current Login IP** | 用户当前会话的 IP 地址。 |

---
*文档版本: v1.0 | 更新日期: 2026-03-13*
