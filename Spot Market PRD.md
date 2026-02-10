# Spot Market 产品需求文档 (PRD)

## 1. 概述
Spot Market 模块旨在为用户提供实时的电力现货市场数据监控、自动交易策略配置以及套利机会分析功能。通过直观的图表和数据表格，帮助用户做出更明智的电力交易决策，并利用自动化规则最大化 VPP（虚拟电厂）的收益。

## 2. 菜单结构
Spot Market 模块包含以下三个子菜单页面：
1.  **Spot Price (现货价格)**: 监控实时和历史的现货价格、预调度价格及预测价格。
2.  **Spot Trading (现货交易)**: 配置自动交易规则，查看交易事件记录。
3.  **Arbitrage Points (套利点)**: 分析细粒度（5分钟）的套利机会和信号。

---

## 3. 详细功能说明

### 3.1 Spot Price (现货价格)
该页面提供核心的市场价格概览和趋势图表。

#### 3.1.1 页面布局与交互
*   **顶部控制栏**:
    *   **Pricing Region (区域选择)**: 下拉选择定价区域 (NSW, VIC, QLD, SA, TAS)。
    *   **时间维度切换**: 
        *   **Real-time (实时)**: 显示当前实时的市场数据。
        *   **Historical (历史)**: 切换到历史模式，显示日期选择器 (Date Picker)，允许用户查看过去日期的市场表现。
    *   **图表设置 (Settings)**:
        *   **Weather (天气)**: 开关，在图表中叠加天气数据。
        *   **Arbitrage Point (套利点)**: 开关，在图表中标记套利机会。支持选择信号源：
            *   *Signal by Forecast (基于预测)*
            *   *Signal by Spot (基于现货)*
    *   **全屏模式**: 按钮支持图表区域全屏显示。

*   **核心指标栏 (Stats Bar)**:
    展示当前市场的关键实时数据：
    *   **Spot**: 当前现货价格 ($/MWh)。
    *   **Pre-Dispatch**: 预调度价格 ($/MWh)。
    *   **Forecast Spot**: 预测现货价格及涨跌幅 ($/MWh)。
    *   **Available Discharge**: 可用放电量 (MWh)。
    *   **Available Charge**: 可用充电量 (MWh)。
    *   **Trading Opportunities**: 交易机会次数 (总数/已捕获数)。
    *   **Est. Revenue**: 预估收益。

*   **图表区域**:
    *   使用 ECharts 渲染的交互式图表。
    *   展示 Spot Price, Pre-dispatch Price, Forecast Price 曲线。
    *   根据设置叠加天气信息和套利信号点。

#### 3.1.2 业务逻辑
*   **数据刷新**: 实时模式下定时刷新数据。
*   **区域联动**: 切换区域会更新所有价格指标和图表数据。

---

### 3.2 Spot Trading (现货交易)
该页面是自动化交易的核心管理界面，分为 "Trading Rules" 和 "Trading Events" 两个标签页。

#### 3.2.1 Trading Rules (交易规则)
管理自动交易策略规则。

*   **列表展示**:
    *   **State**: 规则适用的州/区域。
    *   **Trigger From**: 触发源 (Price / Arbitrage Point)。
    *   **Trigger Condition**: 触发条件详情 (例如: `Spot > 100 $/MW` 或 `Forecast Spot = Charge`)。
    *   **Action**: 执行动作 (Charge / Discharge / Stop)。
    *   **Status**: 规则状态 (Active / Inactive)。
    *   **Applicable VPP**: 适用的 VPP 名称列表。
    *   **Ignore Time**: 忽略时间段设置。
    *   **Action**: 编辑 (Edit) 和 删除 (Delete) 操作。

*   **创建/编辑规则 (Drawer)**:
    点击 "New" 或编辑按钮滑出抽屉，包含以下字段：
    *   **State**: 必选，选择适用区域 (NSW, VIC, QLD, SA, WA)。
    *   **Trigger From**: 必选，选择触发类型：
        *   *Price*: 基于价格触发。
        *   *Arbitrage Point*: 基于套利信号触发。
    *   **Trigger Condition**:
        *   若选 *Price*: 配置 价格源 (Spot/Forecast Spot) + 操作符 (>, <, >=, <=) + 价格阈值 ($/MW)。
        *   若选 *Arbitrage Point*: 配置 信号源 (Signal by Spot/Signal by Forecast) + 信号类型 (Discharge/Charge/Abnormal)。
    *   **Action**: 必选，选择执行动作 (Discharge/Charge/Stop)。
    *   **Status**: 必选，设置规则状态 (Active/Inactive)。
    *   **Applicable VPP**: 多选 VPP。
        *   针对每个选中的 VPP，支持开启 **Ignore Time**，并配置具体的开始时间和结束时间 (例如 12:00 - 14:00 不执行)。

#### 3.2.2 Trading Events (交易事件)
记录系统根据规则自动触发的交易历史。

*   **列表展示**:
    *   **Date**: 事件日期。
    *   **VPP**: 关联 VPP 名称。
    *   **State**: 所在区域。
    *   **Trigger From**: 触发来源说明。
    *   **Action**: 执行的动作类型。
    *   **Start/End Time**: 事件持续时间段。
    *   **Rated Power**: 额定功率。
    *   **Volume**: 交易量。
    *   **Spot**: 触发时的现货价格。
    *   **Status**: 事件状态 (Completed / Pending)。
    *   **Action**: 查看详情 (View Details)。

---

### 3.3 Arbitrage Points (套利点)
提供高频（5分钟粒度）的市场信号分析列表。

#### 3.3.1 页面布局与交互
*   **顶部控制**:
    *   **Pricing Region**: 区域选择。
    *   **Real-time / Historical**: 实时与历史模式切换 (含日期范围选择)。

*   **信号过滤器 (Signal Filters)**:
    顶部展示 5 种信号类型的卡片，点击可过滤表格数据：
    *   **Discharge (放电)**: 绿色标识。
    *   **Normal (正常)**: 灰色标识。
    *   **Charge (充电)**: 蓝色标识。
    *   **FCAS (频率控制辅助服务)**: 紫色标识。
    *   **Abnormal (异常)**: 红色标识。

*   **数据表格**:
    *   **Time**: 时间点 (5分钟间隔)。
    *   **Spot ($/MW)**: 实际现货价格。
    *   **Forecast Spot ($/MW)**: 预测现货价格。
    *   **Time / Forecast Spot ($/MW)**: 横向滚动的未来时段预测价格序列。
    *   **Signal By Forecast**: 基于预测的信号类型 (带颜色标签)。
    *   **Signal By Spot**: 基于实际现货的信号类型 (带颜色标签)。

*   **分页**:
    *   支持每页行数设置 (10/20/50/100)。
    *   页码跳转。

#### 3.3.2 业务逻辑
*   **数据粒度**: 表格每一行代表一个 5 分钟的结算周期 (Settlement Interval)。
*   **信号计算**: 系统根据价格预测或实际价格，结合时间段（如高峰/低谷），自动打标生成 Charge/Discharge 等信号。
*   **预测序列**: 展示该时间点后续多个间隔的预测价格趋势，辅助判断信号准确性。
