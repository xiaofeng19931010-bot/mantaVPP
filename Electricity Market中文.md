# Electricity Market 产品需求文档（中文）

## 1. 产品概述
Electricity Market 提供现货价格趋势与套利信号洞察的统一入口，覆盖实时与历史视图。当前实现使用模拟数据，用于验证 Spot Market、Arbitrage Points 与 Trading Overview 的交互流程、筛选逻辑和表格信息架构。

## 2. 核心功能
| 功能 | 描述 | Demo | UI |
| --- | --- | --- | --- |
| Spot Market | 展示现货价格趋势，并叠加天气与套利信号。 | Yes（模拟数据） | Yes |
| Arbitrage Points | 提供套利点列表，支持信号筛选与日期范围。 | Yes（模拟数据） | Yes |
| Trading Overview | 以标签页查看交易规则与交易事件。 | Yes（模拟数据） | Yes |
| Electricity Market 占位页 | Landing 页展示开发中占位提示。 | Yes | Yes |

## 3. 详细功能

### 3.1 Spot Market
| 功能点 | 功能描述 | 内容 | 全局逻辑 |
| --- | --- | --- | --- |
| 顶部控制区 | 切换区域并在实时/历史视图之间切换。 | Pricing Region 下拉、Real-time/Historical 切换、日期选择器、图表设置按钮。 | 区域变更刷新图表与统计条；Historical 默认显示昨日并展示日期；设置菜单点击展开，点击空白关闭。 |
| 图表设置 | 配置天气与套利信号叠加。 | Weather 复选框；Arbitrage Point 复选框及 Signal by Forecast/Signal by Spot 子菜单。 | Weather 在图表区域展示弹层；Arbitrage Point 默认选 Signal by Forecast；切换信号类型先清空旧标记再渲染新标记。 |
| 统计条 | 展示现货关键指标。 | Spot、Pre-Dispatch、Forecast Spot、Available Discharge/Charge、Trading Opportunities、Est. Revenue。 | Real-time 按当前时间刷新；Historical 取所选区间最后时间点快照；区域或日期变化时全部刷新。 |
| 图表交互 | 现货图表与信号标记交互。 | Pre-Dispatch 折线、Forecast Spot 柱状、Spot 柱状、Tooltip、信号标记。 | Hover 显示各序列数值；实时每 5 分钟自动刷新；双击信号仅弹出提示不跳转。 |
| 天气弹层 | 在图表区域展示天气信息。 | 温度、湿度、风速、预警、关闭按钮。 | 弹层固定在右上角；区域切换时刷新；失败显示“Weather data fetch failed”与重试按钮。 |

### 3.2 Arbitrage Points
| 功能点 | 功能描述 | 内容 | 全局逻辑 |
| --- | --- | --- | --- |
| 顶部控制区 | 切换区域与时间范围模式。 | Pricing Region 下拉、Real-time/Historical 切换、日期范围输入。 | 模式切换时显示/隐藏日期并清空过滤；Historical 默认昨日且最大为今日。 |
| 信号过滤 | 按信号类型筛选套利点。 | 信号卡片：Discharge、Normal、Charge、FCAS、Abnormal。 | 单选过滤；点击新卡片会清除旧高亮；清除后恢复当前时间范围全量数据。 |
| 明细表 | 展示套利点明细。 | Time、Spot ($/MW)、Forecast Spot ($/MW)、Time / Forecast Spot、Signal By Forecast、Signal By Spot。 | Real-time 展示今日至未来 5 分钟；Historical 使用选择区间；未来行 Signal By Spot 显示“-”；按时间倒序。 |

### 3.3 Trading Overview
| 功能点 | 功能描述 | 内容 | 全局逻辑 |
| --- | --- | --- | --- |
| 标签切换 | 在规则与事件之间切换。 | Trading Rules/Trading Events 标签、New 按钮（仅规则存在）。 | 切换后更新表格与空状态；活跃标签高亮；仅规则存在时显示 New。 |
| Trading Rules 表格 | 展示近期交易规则与操作。 | 字段：State、Trigger Type、Trigger Price、Arbitrage Signal、Action、Status、Applicable VPP、Action。 | 编辑/删除仅弹提示；空数据显示引导空状态；最多 5 行。 |
| Trading Events 表格 | 展示近期交易事件与操作。 | 字段：Date、VPP、State、Trigger Type、Action、Spot、Start Time、End Time、Power、Volume、Status、Action。 | Trigger Type 优先匹配规则中的 VPP；详情图标仅弹提示；空数据展示空状态；最多 5 行。 |

### 3.4 Electricity Market 占位页
| 功能点 | 功能描述 | 内容 | 全局逻辑 |
| --- | --- | --- | --- |
| 占位页提示 | 模块入口占位提示。 | 施工图标、标题与“This feature is currently under development.”。 | Landing 页无交互入口，仅用于状态提示。 |

## 4. 文案
| 中文 | 英文 |
| --- | --- |
| - | Electricity Market |
| - | Spot Market |
| - | Arbitrage Points |
| - | Trading Overview |
| - | Trading Rules |
| - | Trading Events |
| - | Pricing Region: |
| - | Real-time |
| - | Historical |
| - | Weather |
| - | Arbitrage Point |
| - | Signal by Forecast |
| - | Signal by Spot |
| - | Jump to Strategy Orchestration: View logic for {signal} signal (Price: {price}) |
| - | This feature is currently under development. |
| - | Weather data fetch failed |
| - | Retry |
| - | New |
