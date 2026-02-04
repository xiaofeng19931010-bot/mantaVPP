# Electricity Market 产品需求文档

## 1. 产品概述
Electricity Market provides a unified entry for spot price trends and arbitrage signal insights across real-time and historical views. The current implementation uses mock data to validate interaction flows, filtering logic, and table information architecture for Spot Market, Arbitrage Points, and Trading Overview.

## 2. 核心功能
| 功能 | 描述 | Demo | UI |
| --- | --- | --- | --- |
| Spot Market | Visualize spot price trends with weather and arbitrage signal overlays. | Yes (mock data) | Yes |
| Arbitrage Points | List arbitrage points with signal filters and date range controls. | Yes (mock data) | Yes |
| Trading Overview | Review recent trading rules and trading events in tabs. | Yes (mock data) | Yes |
| Electricity Market 占位页 | Show under-development placeholder on the landing page. | Yes | Yes |

## 3. 详细功能

### 3.1 Spot Market
| 功能点 | 功能描述 | 内容 | 全局逻辑 |
| --- | --- | --- | --- |
| 顶部控制区 | Switch region and toggle real-time/historical views. | Pricing Region dropdown, Real-time/Historical tabs, date picker, chart settings button. | Region change refreshes chart and stats; Historical shows date picker defaulted to yesterday; settings menu toggles and closes on outside click. |
| 图表设置 | Configure weather and arbitrage signal overlays. | Weather checkbox; Arbitrage Point checkbox with submenu for Signal by Forecast/Signal by Spot. | Weather shows a popup in the chart area; Arbitrage Point defaults to Signal by Forecast; switching signal types clears old markers before rendering new ones. |
| 统计条 | Display key spot market indicators. | Spot, Pre-Dispatch, Forecast Spot, Available Discharge/Charge, Trading Opportunities, Est. Revenue. | Real-time values refresh with current time; Historical uses the last timestamp of the selected range; region/date change refreshes all values. |
| 图表交互 | Interact with spot price chart and signal markers. | Pre-Dispatch line, Forecast Spot bars, Spot bars, tooltips, mark points. | Hover shows tooltip with all series values; real-time auto-refresh every 5 minutes; double-click on a signal shows alert only, no navigation. |
| 天气弹层 | Show weather context in the chart area. | Temperature, humidity, wind speed, warning status, close button. | Popup stays at top-right; region change refreshes weather content; on failure shows “Weather data fetch failed” with retry. |

### 3.2 Arbitrage Points
| 功能点 | 功能描述 | 内容 | 全局逻辑 |
| --- | --- | --- | --- |
| 顶部控制区 | Switch region and time range mode. | Pricing Region dropdown, Real-time/Historical tabs, date range inputs. | Mode switch toggles date picker visibility, resets filters, and refreshes data; Historical defaults to yesterday and maxes at today. |
| 信号过滤 | Filter arbitrage points by signal type. | Signal cards: Discharge, Normal, Charge, FCAS, Abnormal. | Single-selection filter; clicking a new card clears the previous highlight; clearing restores full data in the selected time range. |
| 明细表 | Present arbitrage point details. | Columns: Time, Spot ($/MW), Forecast Spot ($/MW), Time / Forecast Spot, Signal By Forecast, Signal By Spot. | Real-time shows today through the next 5 minutes; Historical uses the selected range; future rows show “-” for Signal By Spot; table is sorted descending by time. |

### 3.3 Trading Overview
| 功能点 | 功能描述 | 内容 | 全局逻辑 |
| --- | --- | --- | --- |
| 标签切换 | Toggle between rules and events. | Trading Rules tab, Trading Events tab, New button (rules only). | Switching tabs updates table and empty state; active tab is highlighted; New button only appears when rules exist. |
| Trading Rules 表格 | Show recent trading rules and actions. | Fields: State, Trigger Type, Trigger Price, Arbitrage Signal, Action, Status, Applicable VPP, Action. | Edit/Delete actions show prompts only; when empty, a guided empty state is shown; up to 5 rows. |
| Trading Events 表格 | Show recent trading events and actions. | Fields: Date, VPP, State, Trigger Type, Action, Spot, Start Time, End Time, Power, Volume, Status, Action. | Trigger Type matches VPP from rules when available; detail icon shows prompt only; empty state appears when no events; up to 5 rows. |

### 3.4 Electricity Market 占位页
| 功能点 | 功能描述 | 内容 | 全局逻辑 |
| --- | --- | --- | --- |
| 占位页提示 | Provide a landing placeholder for the module. | Construction icon, title, and “This feature is currently under development.” message. | Landing page has no interactive entry points and only communicates status. |

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
