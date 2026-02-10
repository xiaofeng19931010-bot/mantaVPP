# Spot Market 产品需求文档 (PRD)

| 文档版本 | 修改日期 | 修改人 | 备注 |
| :--- | :--- | :--- | :--- |
| v1.0 | 2026-02-05 | Liam | 初始版本创建 |

## 1. 产品概述 (Product Overview)

### 1.1 产品简介
Spot Market 模块旨在为用户提供实时的电力现货市场数据监控、自动交易策略配置以及套利机会分析功能。通过直观的图表和数据表格，帮助用户做出更明智的电力交易决策，并利用自动化规则最大化 VPP（虚拟电厂）的收益。

### 1.2 目标用户
*   **电力交易员 (Energy Traders)**: 负责监控市场价格波动并执行买卖策略。
*   **VPP 运营经理 (VPP Operations Managers)**: 需要根据市场信号优化资产调度。
*   **策略分析师 (Strategy Analysts)**: 分析历史数据和套利机会以优化交易规则。

### 1.3 核心价值
*   **市场洞察**: 实时可视化现货与预测价格，辅助快速决策。
*   **自动化套利**: 通过灵活的交易规则自动捕捉价格波动带来的收益。
*   **精细化分析**: 5分钟粒度的信号分析，精准定位最佳交易时机。
*   **风险规避**: 及时识别异常价格信号，减少市场波动风险。

## 2. 交互与流程 (User Flow & Navigation)

### 2.1 站点地图 (Site Map)
*   **一级菜单**: Electricity Market (电力市场)
    *   **二级菜单**: Spot Market (现货市场)
        *   **页面 A**: Spot Price (现货价格) - *默认落地页*
        *   **页面 B**: Spot Trading (现货交易)
        *   **页面 C**: Arbitrage Points (套利点)

### 2.2 用户路径
1.  用户点击侧边栏 "Electricity Market" -> "Spot Market"。
2.  系统默认进入 **Spot Price** 页面，展示实时价格趋势和关键指标。
3.  用户分析图表后，切换至 **Spot Trading** 页面配置自动化交易规则。
4.  或者，用户进入 **Arbitrage Points** 页面深入分析具体的 5 分钟级套利信号。

## 3. 功能需求 (Functional Requirements)

| 功能点 | 功能描述 | 内容 | 全局逻辑 |
| :--- | :--- | :--- | :--- |
| **3.1.1 顶部控制与指标**<br>(Top Controls & Stats) | 现货价格页面的顶部筛选与核心指标展示。 | <ul><li><b>顶部控制栏 (Top Control)</b>:<ul><li><b>Pricing Region</b>: 下拉选择定价区域 (NSW, VIC, QLD, SA, TAS)。</li><li><b>时间维度 (Time Mode)</b>:<ul><li>Real-time (实时): 显示当前实时数据。</li><li>Historical (历史): 日期选择器 (Date Picker) 查看历史数据。</li></ul></li><li><b>图表设置 (Settings)</b>:<ul><li>Weather: 叠加天气数据开关。</li><li>Arbitrage Point: 叠加套利点开关 (支持 Signal by Forecast / Signal by Spot)。</li></ul></li></ul></li><li><b>核心指标栏 (Stats Bar)</b>:<ul><li><b>Spot</b>: 当前现货价格 ($/MWh)。</li><li><b>Pre-Dispatch</b>: 预调度价格 ($/MWh)。</li><li><b>Forecast Spot</b>: 预测现货价格及涨跌幅 ($/MWh)。</li><li><b>Available Capacity</b>: Available Discharge / Charge (MWh)。</li><li><b>Trading</b>: Opportunities (Total/Captured), Est. Revenue。</li></ul></li></ul> | - |
| **3.1.2 价格趋势图表**<br>(Price Trend Chart) | 核心交互式图表，展示市场价格走势。 | <ul><li><b>可视化组件 (Visualization)</b>:<ul><li>基于 ECharts 渲染的交互式图表。</li><li><b>曲线展示</b>: Spot Price, Pre-dispatch Price, Forecast Price。</li><li><b>数据叠加</b>: 根据设置叠加 Weather 图标和 Arbitrage Signal 点。</li></ul></li><li><b>交互功能</b>:<ul><li>支持全屏模式 (Fullscreen)。</li><li>鼠标悬停显示详细数据 (Tooltip)。</li></ul></li></ul> | <ul><li><b>数据刷新</b>: 实时模式下定时刷新数据。</li><li><b>区域联动</b>: 切换 Pricing Region 会同步更新所有价格指标和图表数据。</li></ul> |
| **3.2.1 交易规则管理**<br>(Trading Rules) | 管理自动交易策略规则，支持灵活的触发条件配置。 | <ul><li><b>规则列表 (Rules List)</b>:<ul><li><b>Columns</b>: State, Trigger From, Trigger Condition, Action, Status, Applicable VPP, Ignore Time。</li><li><b>Actions</b>: Edit, Delete。</li></ul></li><li><b>创建/编辑抽屉 (Drawer)</b>:<ul><li><b>State</b>: 必选 (NSW, VIC, QLD, SA, WA)。</li><li><b>Trigger From</b>:<ul><li>Price: 基于价格 (Spot / Forecast Spot) + 阈值 (>, <, >=, <=)。</li><li>Arbitrage Point: 基于信号 (Signal by Spot / Forecast) + 类型 (Discharge/Charge/Abnormal)。</li></ul></li><li><b>Action</b>: Discharge / Charge / Stop。</li><li><b>Applicable VPP</b>: 多选 VPP，支持针对每个 VPP 配置 <b>Ignore Time</b> (开始-结束时间)。</li></ul></li></ul> | - |
| **3.2.2 交易事件记录**<br>(Trading Events) | 记录系统根据规则自动触发的交易历史。 | <ul><li><b>事件列表 (Events List)</b>:<ul><li><b>Columns</b>: Date, VPP Name, State, Trigger From, Action, Start/End Time, Rated Power, Volume, Spot Price ($/MWh), Status (Completed/Pending)。</li><li><b>Interaction</b>: View Details 按钮查看详情。</li></ul></li></ul> | - |
| **3.3.1 套利点分析表**<br>(Arbitrage Analysis) | 提供高频（5分钟粒度）的市场信号分析列表与过滤功能。 | <ul><li><b>信号过滤器 (Signal Filters)</b>:<ul><li><b>Discharge</b>: 绿色标识 (放电信号)。</li><li><b>Normal</b>: 灰色标识 (正常)。</li><li><b>Charge</b>: 蓝色标识 (充电信号)。</li><li><b>FCAS</b>: 紫色标识 (频率服务)。</li><li><b>Abnormal</b>: 红色标识 (异常)。</li></ul></li><li><b>数据表格 (Data Table)</b>:<ul><li><b>Time</b>: 5分钟间隔时间点。</li><li><b>Prices</b>: Spot ($/MW), Forecast Spot ($/MW)。</li><li><b>Forecast Sequence</b>: 横向滚动的未来预测价格序列 (Time / Forecast Spot)。</li><li><b>Signals</b>: Signal By Forecast vs Signal By Spot (带颜色标签)。</li></ul></li></ul> | <ul><li><b>数据粒度</b>: 表格每一行代表一个 5 分钟的结算周期 (Settlement Interval)。</li><li><b>分页逻辑</b>: 支持每页行数设置 (10/20/50/100) 及页码跳转。</li></ul> |
| **3.3.2 信号逻辑**<br>(Signal Logic) | 核心业务逻辑说明。 | <ul><li><b>信号计算</b>: 系统根据价格预测或实际价格，结合时间段（如高峰/低谷），自动打标生成 Charge/Discharge 等信号。</li><li><b>预测序列</b>: 展示该时间点后续多个间隔的预测价格趋势，辅助判断信号准确性。</li></ul> | - |

## 4. 非功能需求 (Non-Functional Requirements)

| 类别 | 需求描述 |
| :--- | :--- |
| **性能要求** | 图表需支持实时数据流的高效渲染；套利点表格需支持大数据量的分页加载。 |
| **数据精度** | 价格数据保留两位小数；时间粒度精确到分钟。 |
| **兼容性** | 响应式设计，适配不同屏幕尺寸。 |
