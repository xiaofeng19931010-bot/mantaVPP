# Reports 产品需求文档 (PRD)

## 1. 概述
Reports 模块用于呈现 VPP 与 DER 两个维度的事件执行结果，支持实时/历史查看、状态与多条件筛选、关键词检索、明细下钻与导出，帮助运营人员完成事件复盘、执行质量追踪与收益核对。

## 2. 菜单结构
Reports 模块中与本需求相关的两个子菜单页面如下：
1.  **VPP Events**: 查看 VPP 级别事件列表，并下钻到单个 VPP 事件详情。
2.  **DER Events**: 查看 DER 级别事件列表，跟踪设备执行结果。

---

## 3. 详细功能说明

### 3.1 VPP Events
VPP Events 由“列表页”和“详情页”组成，详情页由列表 Action 触发进入。

#### 3.1.1 页面布局与交互（列表页）
*   **时间模式切换**:
    *   **Real-time (实时)**: 自动按最新日期过滤，仅展示最新交易日数据。
    *   **Historical (历史)**: 展示日期区间控件（开始/结束日期），按区间过滤事件。
*   **状态快捷筛选（Tab）**:
    *   支持 **All / Completed / Executing / Partially Completed / Incompleted**。
    *   状态色标：Completed(绿)、Executing(蓝)、Partially Completed(橙)、Incompleted(红)。
*   **工具区**:
    *   **Export** 按钮：弹出二次确认框，确认后导出当前筛选结果（`.xls`）。
    *   **Search** 输入框：按关键词模糊检索多字段内容。
*   **数据表格列**:
    *   Date、VPP、Status、Pricing Region、Trigger From、Trigger Condition、Event、Start Time、End Time、Participated Power、Est. Volume、Avg.Price、Est. Revenue、Actions。
*   **表头过滤菜单**:
    *   **Status**（多选复选框）
    *   **Pricing Region**（多选复选框）
    *   **Event**（多选复选框）
    *   点击表头过滤图标展开，点击页面空白处自动收起。
*   **行级操作**:
    *   Action 列提供 **View Details**，进入该条 VPP 事件详情页。
*   **空状态**:
    *   无结果时显示插画与 `No Event` 文案。

#### 3.1.2 页面布局与交互（详情页）
*   **顶部结构**:
    *   返回按钮（回到 VPP Events 列表）。
    *   详情状态标签（颜色随状态变化）。
*   **概览信息卡**:
    *   展示字段：VPP、Pricing Region、Participated DERs、Trigger From、Trigger Condition、Event、Participated Power、Est. Volume、Avg.Price、Est. Revenue。
*   **详情内筛选区**:
    *   状态 Tab：**All / Completed / Executing / Incompleted**。
    *   Export 按钮：二次确认后导出详情页汇总数据（`.xls`）。
    *   Search 输入框：对详情下 DER 明细执行模糊检索。
*   **DER 明细子表**:
    *   列：Date、SN、Status、Start Time、End Time、Participated Power、Est. Volume、Avg.Price、Est. Revenue、Actions。
    *   表头当前仅开放 **Status** 下拉过滤。
    *   行 Action 为查看图标（仅视觉占位，当前无进一步跳转逻辑）。
*   **空状态**:
    *   无匹配 DER 记录时显示 `No Event`。

#### 3.1.3 核心业务逻辑
*   **数据基线**:
    *   事件来源于 `reportsVppEvents` 数据集；为演示分页，内部复制扩展至至少 55 条。
*   **实时与历史规则**:
    *   实时模式：取事件中的最新日期数据。
    *   历史模式：按 `[start, end]` 日期区间过滤。
*   **状态归一化**:
    *   `Success -> Completed`
    *   `Partially Success -> Partially Completed`
    *   `Failed -> Incompleted`
*   **Pricing Region 推断**:
    *   优先使用 `pricingRegion`，其次 `region`，否则从 `vppName` 前缀解析（NSW/VIC/QLD/SA/WA）。
*   **Avg.Price 计算**:
    *   以 `Est. Revenue / Est. Volume(MWh)` 计算。
    *   支持 `kWh` 自动换算为 `MWh`，无有效值则显示 `-`。
*   **详情页 DER 关联规则**:
    *   通过 `eventType + date + timeRange` 从 DER 事件集中关联同批事件。
    *   详情中的 `Participated DERs` 为唯一 SN 计数。
*   **Trigger 字段逻辑**:
    *   列表页当前 `Trigger From`、`Trigger Condition` 固定展示 `-`（预留字段）。
    *   详情页 `Trigger From` 由数据推断（含 Price/User），`Trigger Condition` 显示 notes（特定失败文案做隐藏处理）。
*   **导出逻辑**:
    *   列表导出文件名：`VPP Events [日期标签].xls`。
    *   详情导出文件名：`VPP Event Details.xls`。
    *   导出内容与当前筛选结果保持一致。

---

### 3.2 DER Events
DER Events 提供设备级事件执行视图，重点用于定位 SN 维度的执行结果。

#### 3.2.1 页面布局与交互
*   **时间模式切换**:
    *   **Real-time**：仅显示最新日期数据。
    *   **Historical**：显示日期区间控件并按区间过滤。
*   **状态快捷筛选（Tab）**:
    *   支持 **All / Completed / Executing / Incompleted**。
*   **工具区**:
    *   **Export**：二次确认导出当前筛选结果（`.xls`）。
    *   **Search**：关键词模糊检索。
*   **数据表格列**:
    *   Date、SN、VPP、Status、Pricing Region、Trigger From、Trigger Condition、Event、Start Time、End Time、Participated Power、Est. Volume、Avg.Price、Est. Revenue、Actions。
*   **表头过滤菜单**:
    *   支持 **Status / Pricing Region / Event** 三类多选过滤。
*   **空状态**:
    *   无数据时显示 `No Event`。

#### 3.2.2 核心业务逻辑
*   **数据基线**:
    *   事件来源于 `reportsDerEvents` 数据集；内部复制扩展至至少 55 条用于分页演示。
*   **实时/历史过滤逻辑**:
    *   与 VPP Events 一致：实时取最新日期，历史按日期区间筛选。
*   **状态归一化**:
    *   `Success/Partially Success/Failed` 映射规则与 VPP Events 一致。
*   **Trigger From 映射**:
    *   `System -> Price`
    *   `User -> User`
    *   其他值原样显示。
*   **Avg.Price 计算**:
    *   与 VPP Events 一致，基于收入与电量换算得到。
*   **导出逻辑**:
    *   文件名：`DER Events [日期标签].xls`。
    *   导出字段：ID、SN、Event Type、Date、Start/End Time、From、Power、Spot Price、Volume、VPP Income、Notes、Status。

---

## 4. 关键交互流程

### 4.1 VPP Events 列表到详情流程
1. 用户进入 Reports -> VPP Events。
2. 用户选择实时/历史、状态、表头过滤或关键词检索。
3. 用户在某条记录点击 View Details。
4. 系统进入详情页并加载该事件关联 DER 明细。
5. 用户可继续筛选明细或导出详情数据，随后返回列表。

### 4.2 DER Events 分析流程
1. 用户进入 Reports -> DER Events。
2. 用户进行时间模式、状态、表头过滤与关键词检索。
3. 用户查看设备级执行结果并按需导出。

---

## 5. 非功能与约束说明
*   **交互响应**: 过滤、搜索、模式切换均为前端即时重渲染。
*   **导出格式**: 使用 HTML Table 方式导出 Excel 兼容文件（`.xls`）。
*   **时区展示**: 日期字段包含 `(+11:00)` 文本，历史筛选按归一化日期键进行比较。
*   **当前实现限制**:
    *   VPP/DER 列表存在分页计算逻辑，但页面未呈现分页控件与每页条数切换控件。
    *   DER Events 的 Pricing Region 当前固定为 `-`（区域映射逻辑尚未接入真实字段）。
    *   DER Events 表格中 VPP 列当前固定显示 `-`（未绑定 VPP 名称数据）。
    *   VPP Events 列表中的 Trigger From / Trigger Condition 当前为占位展示（`-`）。
