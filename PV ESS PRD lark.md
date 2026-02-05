# PV ESS 产品需求文档

## 1. 产品概述 (Product Overview)
PV ESS (Photovoltaic Energy Storage System) 模块主要用于管理和监控分布式储能设备（电池）。该模块作为虚拟电厂（VPP）资源管理的核心组成部分，允许运营人员查看电池设备的实时状态、性能指标、关联的 VPP 信息，并深入查看单台设备的详细运行拓扑和遥测数据。

## 2. 用户故事 (User Stories)
*   **作为资产管理员**，我希望能够查看所有电池储能系统的在线/离线状态概览，以便及时发现设备连接故障。
*   **作为运维工程师**，我希望能够通过 SN 或 NMI 快速搜索特定的电池设备，查看其额定容量和当前荷电状态 (SOC)，以评估其健康度。
*   **作为交易员**，我希望能看到各区域（State）的电池资源分布和总可用容量，以辅助制定电力市场的竞价策略。
*   **作为系统分析师**，我希望点击特定设备能看到其详细的能源流向拓扑图（PV、电池、逆变器之间的关系），以诊断能源转换效率问题。

## 3. 功能规格说明 (Functional Specifications)

### 3.1 设备列表页 (DER Management - Battery View)
**入口**: 点击侧边栏 "PV ESS" 菜单。

#### 3.1.1 核心指标看板 (Stats Overview)
在页面顶部展示关键统计数据，支持自适应布局。
*   **设备状态统计**:
    *   展示 "PV ESS" 总数。
    *   **Online**: 在线设备数（绿色高亮）。
    *   **Offline**: 离线设备数（灰色）。
    *   **Disconnected**: 断连设备数（红色高亮）。
*   **Rated Power (额定功率)**: 所有电池设备的额定功率总和 (kW)。
*   **Rated Capacity (额定容量)**: 所有电池设备的额定容量总和 (kWh)。
*   **Today Yield (今日发电/放电量)**: 预估今日产出电量 (kWh)。

#### 3.1.2 设备数据列表
*   **筛选与搜索**:
    *   **Search**: 支持通过 SN (序列号) 或 VPP Name 进行模糊搜索。
*   **列表字段**:
    *   **Status**: 设备通讯状态 (Online/Offline/Disconnected)，带颜色指示点。
    *   **SN**: 设备序列号，唯一标识。
    *   **NMI**: 国家计量标识符。
    *   **Manufacturer**: 设备厂商 (如 Tesla, Sungrow, BYD 等)。
    *   **State**: 设备所在区域 (NSW, VIC, QLD, SA, WA)。
    *   **Rated Power**: 额定功率 (kW)。
    *   **Rated Capacity**: 额定容量 (kWh)。
    *   **SOC**: 当前荷电状态百分比 (%) 及 能量值 (kWh)。展示格式如 `85% (11/13 kWh)`。
    *   **Assigned VPP**: 所属虚拟电厂名称。
    *   **Actions**: 操作列。
        *   **View Details**: "眼睛"图标，点击跳转至设备详情页。

### 3.2 设备详情页 (Device Details)
**入口**: 点击列表页的 View Details 按钮。

#### 3.2.1 头部信息 (Header)
*   **Assigned VPP**: 显示关联 VPP 名称。
*   **NMI**: 显示 NMI 编号。
*   **State**: 显示所在区域。
*   **Grid Status**: 显示当前并网状态 (Online/Offline)。

#### 3.2.2 能源拓扑图 (Energy Topology)
*   展示设备内部及与电网的能源流向动态图。
*   **组件**:
    *   **PV Array**: 光伏阵列图标。
    *   **Battery**: 电池图标，显示充电/放电状态。
    *   **Inverter**: 逆变器（中心节点）。
    *   **Grid**: 电网连接点。
*   **动态效果**:
    *   显示 DC (直流) 和 AC (交流) 侧的能量流动方向（动画箭头）。
    *   根据实时功率流向（充电/放电/光伏发电）改变流动方向。

## 4. 界面交互流程 (UI/UX Flow)
1.  **进入页面**: 用户点击 "PV ESS"，系统加载 `renderDERManagement`，默认过滤类型为 `Battery`。
2.  **查看概览**: 用户扫视顶部卡片，获取整体资产健康度和容量规模。
3.  **查找设备**: 用户在搜索框输入 SN，列表实时过滤（前端过滤）。
4.  **查看详情**: 用户点击某行的 "View Details"，页面路由至 `device_details`，传入 SN 参数。
5.  **返回列表**: 用户点击浏览器后退或再次点击 "PV ESS" 菜单。

## 5. 数据逻辑 (Data Logic)
*   **数据源**: `state.devices` 数组。
*   **过滤逻辑**: 仅显示 `type === 'Battery'` 的设备。
*   **Mock 数据生成** (当设备数 < 10 时触发):
    *   自动生成 15 条模拟数据。
    *   厂商随机取自: ['Tesla', 'Sungrow', 'BYD', 'Huawei', 'SolarEdge']。
    *   SOC 随机生成 0-100%。
    *   Capacity 随机生成 5-55 kWh。
*   **聚合计算**:
    *   Rated Power = Sum(device.capacity)。
    *   Rated Capacity = Sum(device.capacity) (针对电池)。
    *   Today Yield = Sum(device.capacity * 3) (模拟算法)。

## 6. 异常处理机制 (Exception Handling)
*   **空数据**: 若列表过滤后无数据，表格显示 "No devices found" 占位行。
*   **设备未找到**: 进入详情页时若 SN 不存在，显示 "Device not found" 提示。
*   **数值异常**: 若 Capacity 为空或非数值，显示 "-" 或 0，避免页面崩溃。

## 7. 性能指标要求 (Performance Requirements)
*   **加载速度**: 页面渲染时间应 < 1秒（基于当前 Mock 数据量）。
*   **列表容量**: 支持至少 100 条数据的流畅滚动。
*   **动画性能**: 拓扑图动画应保持 60fps，不引起浏览器卡顿。

## 8. 安全规范 (Security Specifications)
*   **权限控制**: 仅授权用户可见敏感信息（如 NMI）。
*   **数据脱敏**: 在演示模式下，SN 和 NMI 可使用生成的模拟数据。

## 9. 兼容性要求 (Compatibility)
*   **浏览器**: 支持 Chrome, Safari, Firefox, Edge 最新版本。
*   **响应式**:
    *   Desktop (1920x1080): 6列布局。
    *   Tablet (iPad): 2列或4列网格布局。
    *   Mobile: 列表支持横向滚动，卡片堆叠显示。

## 10. 验收标准 (Acceptance Criteria)
1.  **概览准确性**: 顶部统计卡片的数字与列表实际数据求和一致。
2.  **筛选有效性**: 列表仅显示 Battery 类型设备，不混入 Pure Inverter 或 EV。
3.  **详情跳转**: 点击任意设备的详情按钮，能正确加载该设备的 NMI 和拓扑图。
4.  **SOC显示**: 电池设备必须显示 SOC 列，且格式正确 (百分比 + 容量)。
5.  **搜索功能**: 输入存在的 SN 片段，列表能正确过滤出目标设备。
