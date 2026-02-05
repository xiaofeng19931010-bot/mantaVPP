# Spot Market 产品需求文档

## 1. 产品概述 (Product Overview)
Spot Market (现货市场) 模块是虚拟电厂（VPP）参与电力市场交易的核心指挥中心。该模块提供实时的市场价格监控、自动化的交易规则配置、套利机会分析以及交易事件的追踪功能。旨在帮助运营人员最大化电力资产的经济效益，通过智能化的策略在价格高点放电、低点充电，并参与辅助服务市场。

## 2. 用户故事 (User Stories)
*   **作为交易员**，我希望能够实时监控各区域（NSW, VIC, QLD, SA, TAS）的现货价格和预调度价格，以便快速做出手动调度决策。
*   **作为策略分析师**，我希望能够配置自动化的交易规则（例如：当价格低于 $0/MWh 时充电，高于 $300/MWh 时放电），以实现 24/7 的无人值守交易。
*   **作为资产管理者**，我希望能查看历史的套利点（Arbitrage Points）和预测准确性，以评估算法模型的有效性。
*   **作为合规专员**，我需要查看所有的交易事件日志（Trading Events），包括触发原因、执行时间、功率和成交量，以满足审计要求。

## 3. 功能规格说明 (Functional Specifications)

### 3.1 现货价格监控 (Spot Price)
**入口**: 点击侧边栏 "Spot Market" -> "Spot Price"。

#### 3.1.1 市场状态看板 (Market Status)
*   **区域选择**: 下拉选择定价区域 (NSW, VIC, QLD, SA, TAS)。
*   **核心指标**:
    *   **Spot Price**: 当前现货价格 ($/MWh)。
    *   **Pre-Dispatch**: 预调度价格 ($/MWh)。
    *   **Forecast Spot**: 预测现货价格 ($/MWh)，带涨跌幅指示。
    *   **Available Discharge**: 当前可放电容量 (MWh)。
    *   **Available Charge**: 当前可充电容量 (MWh)。
*   **交易绩效**:
    *   **Trading Opportunities**: 总机会数 / 已捕获机会数。
    *   **Est. Revenue**: 预估收益 (带颜色标识，正收益为绿色)。

#### 3.1.2 价格趋势图表 (Price Chart)
*   **时间维度**:
    *   **Real-time**: 展示过去 24h 及未来预测曲线。
    *   **Historical**: 选择特定日期查看历史曲线。
*   **图表内容**:
    *   **Spot Price**: 实际现货价格曲线。
    *   **Dispatch Price**: 调度价格曲线。
    *   **Forecast Price**: 预测价格曲线（虚线）。
*   **图表设置 (Settings)**:
    *   **Weather**: 叠加天气数据层（开关）。
    *   **Arbitrage Point**: 叠加套利信号点（开关）。支持选择信号源：
        *   *Signal by Forecast*: 基于预测产生的信号。
        *   *Signal by Spot*: 基于实际现货价格产生的信号。

### 3.2 现货交易管理 (Spot Trading)
**入口**: 点击侧边栏 "Spot Market" -> "Spot Trading"。
包含两个标签页：**Trading Rules** 和 **Trading Events**。

#### 3.2.1 交易规则 (Trading Rules)
用于配置自动化的 VPP 响应策略。
*   **筛选栏**:
    *   **State**: Active / Inactive / All。
    *   **Trigger Type**: Price / Signal by Spot / Signal by Forecast / All。
    *   **Search**: 按 VPP 名称搜索。
    *   **Create Rule**: 新建规则按钮。
*   **规则列表字段**:
    *   **Rule ID**: 规则唯一标识。
    *   **VPP Name**: 适用 VPP 名称。
    *   **State**: 规则状态 (Active/Inactive)。
    *   **Trigger From**: 触发源 (Spot Price / Arbitrage Point)。
    *   **Details**: 触发条件详情 (e.g., "Spot Price >= $300" 或 "Arbitrage Point = Discharge")。
    *   **Action**: 执行动作 (Charge / Discharge / FCAS)。
    *   **Actions**: 启用/禁用开关、编辑、删除。
*   **新建/编辑规则抽屉 (Drawer)**:
    *   **State**: 选择适用区域。
    *   **Trigger Type**: 选择触发类型 (Price / Arbitrage)。
    *   **Condition**: 设置阈值 (>, <, =) 和价格。
    *   **Action**: 设置响应动作。
    *   **Applicable VPPs**: 选择应用该规则的 VPP 列表。
    *   **Ignore Time**: 设置规则不生效的时间段 (e.g., 00:00 - 06:00)。

#### 3.2.2 交易事件 (Trading Events)
记录所有由规则触发或手动执行的交易行为。
*   **列表字段**:
    *   **Date**: 事件日期。
    *   **VPP**: 响应 VPP 名称。
    *   **State**: 所在区域。
    *   **Trigger From**: 触发来源。
    *   **Action**: 执行动作 (Charge/Discharge)。
    *   **Start/End Time**: 执行起止时间。
    *   **Rated Power**: 响应功率 (kW)。
    *   **Volume**: 响应电量 (kWh)。
    *   **Spot**: 结算价格 ($/MWh)。
    *   **Status**: 状态 (Completed / Pending / Failed)。
*   **分页**: 支持每页 10/20/50/100 条数据。

### 3.3 套利点分析 (Arbitrage Points)
**入口**: 点击侧边栏 "Spot Market" -> "Arbitrage Points"。

#### 3.3.1 信号概览与筛选
*   **信号类型筛选**: 点击卡片快速筛选列表。
    *   **Discharge**: 放电信号 (绿色)。
    *   **Normal**: 无操作 (灰色)。
    *   **Charge**: 充电信号 (蓝色)。
    *   **FCAS**: 辅助服务 (紫色)。
    *   **Abnormal**: 异常信号 (红色)。
*   **时间控制**: Real-time / Historical (日期选择器)。

#### 3.3.2 套利明细表
*   **列表字段**:
    *   **Time**: 结算时间点 (5分钟粒度)。
    *   **Spot ($/MW)**: 实际现货价格。
    *   **Forecast Spot ($/MW)**: 预测价格。
    *   **Time / Forecast Spot**: 迷你柱状图，展示未来 4 个时间步的预测价格趋势。
    *   **Signal By Forecast**: 基于预测生成的建议信号。
    *   **Signal By Spot**: 基于实际价格确认的最终信号。

## 4. 界面交互流程 (UI/UX Flow)
1.  **监控市场**: 用户进入 "Spot Price"，选择区域，观察价格走势。若发现价格飙升，进入 "Spot Trading" 查看是否有规则触发。
2.  **配置策略**: 用户在 "Trading Rules" 中点击 "Create Rule"，设置 "当 NSW 价格 > $500 时全力放电"，选择关联的 VPP，保存规则。
3.  **验证执行**: 规则激活后，用户切换到 "Trading Events" 标签，等待并确认系统是否在价格满足条件时自动生成了 "Discharge" 事件。
4.  **复盘分析**: 次日，用户进入 "Arbitrage Points"，选择 "Historical" 查看昨日数据，对比 "Signal By Forecast" 和 "Signal By Spot" 的一致性，以优化预测模型。

## 5. 数据逻辑 (Data Logic)
*   **价格数据**: 模拟澳洲 NEM 市场价格曲线（Duck Curve 特征），包含早晚高峰和中午低谷。
*   **信号生成**:
    *   Charge: 价格 < 阈值A (e.g., $0) 或 时间在 11:00-14:00 (光伏高峰)。
    *   Discharge: 价格 > 阈值B (e.g., $300) 或 时间在 18:00-21:00 (晚高峰)。
*   **Mock 数据**: 前端生成模拟数据，支持 3 天范围内的历史回溯。
*   **聚合计算**:
    *   Available Discharge = Sum(Battery SOC * Capacity)。
    *   Est. Revenue = Sum(Event Volume * Spot Price)。

## 6. 异常处理机制 (Exception Handling)
*   **网络断连**: 价格数据无法更新时，显示 "Last updated: [Time]" 并置灰图表。
*   **规则冲突**: 若同一 VPP 命中多条规则（如同时满足 Charge 和 Discharge），优先执行保护性规则或最新创建的规则（需后端逻辑支持，前端提示冲突风险）。
*   **无数据**: 新建 VPP 或新区域无历史数据时，图表和列表显示 Empty State 占位符。

## 7. 性能指标要求 (Performance Requirements)
*   **图表渲染**: ECharts 图表加载时间 < 800ms，拖拽缩放帧率 > 30fps。
*   **实时性**: 现货价格数据每 5 分钟自动刷新一次。
*   **列表性能**: "Arbitrage Points" 列表需支持单日 288 个点（5分钟间隔）的流畅渲染。

## 8. 安全规范 (Security Specifications)
*   **操作审计**: 所有的规则创建、修改、删除操作均需记录操作人 IP 和时间。
*   **权限隔离**: 普通用户只能查看 Trading Events，只有管理员可修改 Trading Rules。

## 9. 兼容性要求 (Compatibility)
*   **分辨率**: 适配 1366x768 及以上分辨率，关键图表在低分辨率下保持可读性。
*   **浏览器**: Chrome 90+, Edge 90+, Safari 14+, Firefox 88+。

## 10. 验收标准 (Acceptance Criteria)
1.  **价格监控**: 切换区域时，顶部看板数据和下方图表应同步更新为该区域数据。
2.  **规则执行**: 创建一条规则后，在 "Trading Rules" 列表中应立即可见，且状态默认为 Active。
3.  **事件记录**: 模拟触发一个事件，"Trading Events" 列表应新增一条记录，且状态流转（Pending -> Completed）正确。
4.  **套利分析**: "Arbitrage Points" 列表中的迷你图表（Forecast Bars）应正确渲染，且信号颜色与图例一致。
