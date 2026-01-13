# Manta Web - Device Management 产品需求文档

## 1. 产品概述
Device Management 模块旨在为用户提供跨平台的设备接入与管理能力。通过连接云平台（Cloud）、SCADA 系统或边缘设备（Edge），实现设备的集中化同步、状态监控与数据分析。该模块是虚拟电厂（VPP）资源聚合的基础。

## 2. 功能架构

### 2.1 核心功能模块
1.  **平台管理 (Platform Management)**
    -   平台连接（Connect Platform）：支持 Cloud、SCADA、Edge 三种接入方式。
    -   系统列表（System List）：卡片式展示已连接系统及其状态。
    -   系统断开（Disconnect）：解除平台绑定。
2.  **系统详情 (System Details)**
    -   系统概览：显示系统类型、厂商、国家及核心统计指标。
    -   设备列表：分页/滚动展示该系统下的所有设备（逆变器、电池）。
    -   设备搜索：支持基于关键字的设备检索。
3.  **设备分析 (Device Analysis)**
    -   实时数据：展示功率、电压、电流等实时指标。
    -   历史趋势：可视化图表展示多时间维度的数据趋势。

## 3. 详细功能说明

### 3.1 平台列表 (Platform List)
**页面入口**: `Device Management` 菜单
**渲染函数**: `renderDeviceManagement`

#### 3.1.1 空状态 (Empty State)
-   **触发条件**: 当前未绑定任何云平台 (`!state.cloudBound`)。
-   **界面元素**:
    -   图标与提示文案 ("No Platform Connected")。
    -   "Connect Platform" 按钮：点击调用 `openCloudBindDrawer()`。

#### 3.1.2 列表状态 (List View)
-   **界面布局**: 响应式网格布局（Grid），展示系统卡片。
-   **顶部操作栏**:
    -   标题: "Platform List"
    -   "New" 按钮：点击打开连接抽屉。
-   **系统卡片 (System Card)**:
    -   **状态指示**:
        -   Connecting (Yellow): 连接中，卡片不可点击。
        -   Connected (Primary Color): 已连接，点击跳转详情。
        -   Disconnected (Gray): 已断开。
    -   **核心信息**: 系统名称、类型（Cloud/SCADA/Edge）、厂商。
    -   **统计面板**:
        -   Inverters: 总数、总容量、在线/离线数量。
        -   Batteries: 总数、总容量、在线/离线数量。
    -   **交互操作**:
        -   点击卡片: 跳转系统详情 (`navigate('system_details')`)。
        -   断开连接: Hover 卡片右上角显示 "Disconnect" 按钮 (`disconnectSystem`)。

### 3.2 连接平台 (Connect Platform)
**组件类型**: 侧边抽屉 (Drawer)
**渲染函数**: `openCloudBindDrawer`, `updateSystemOptions`

#### 3.2.1 权限校验
-   在打开抽屉前进行校验：
    1.  用户必须关联公司 (`state.currentUser.company`)。
    2.  公司必须在授权列表 (`MOCK_DATA.companies` 或 `MOCK_COMPANIES`) 中。
    3.  公司状态必须为 "Active"。
    -   校验失败提示 Toast Error。

#### 3.2.2 表单交互
-   **系统类型选择**:
    -   Cloud (Default)
    -   SCADA
    -   Edge Device
    -   *交互*: 切换类型时动态更新下方的选项列表 (`handleSystemTypeChange`)。
-   **选项列表**:
    -   根据当前用户所属公司 (`company`) 和系统类型 (`type`) 过滤。
    -   排除已连接的系统。
    -   数据源: `MOCK_ACCESS_NODES`。
-   **提交处理 (`handleCloudBindSubmit`)**:
    -   模拟连接过程（Loading 状态）。
    -   生成模拟系统数据（System Object）和关联设备数据（Device Objects）。
    -   更新全局状态并刷新列表。

### 3.3 系统详情 (System Details)
**页面入口**: 点击系统卡片
**渲染函数**: `renderSystemDetails`

#### 3.3.1 概览信息
-   **头部**: 返回按钮、系统名称、系统类型标签。
-   **统计卡片 (Summary Cards)**:
    1.  **Info**: 类型、国家、厂商。
    2.  **Total Devices**: 设备总数。
    3.  **Online**: 在线设备数。
    4.  **Offline**: 离线设备数。

#### 3.3.2 设备列表 (Device List)
-   **工具栏**: 搜索框（支持本地过滤）。
-   **表格字段**:
    -   SN (序列号)
    -   Type (图标 + 文本: Inverter/Battery)
    -   Manufacturer (厂商)
    -   NMI (国家计量标识)
    -   VPP (所属 VPP 名称)
    -   Status (在线/离线状态点)
    -   Owner (用户名称)
    -   Email
    -   DNSP (配电网服务商)
    -   Retailer (零售商)

### 3.4 设备数据分析 (Device Analysis)
**组件类型**: 模态框 (Modal)
**渲染函数**: `renderDeviceDataModalContent`

#### 3.4.1 功能特性
-   **设备选择**: 下拉框切换当前查看的设备（SN）。
-   **指标选择 (Data Metric)**:
    -   Power (kW)
    -   Voltage (V)
    -   Current (A)
    -   Frequency (Hz)
    -   Temperature (°C)
    -   SOC (%) - 仅电池
-   **时间维度 (Time Range)**:
    -   24H (默认): 00:00 - 24:00
    -   7D: 最近7天
    -   30D: 最近30天
    -   Custom: 自定义日期范围选择器
-   **数据可视化**:
    -   集成 ECharts 折线图。
    -   支持区域渐变填充效果。
    -   动态 X 轴/Y 轴更新。
-   **统计摘要**:
    -   Current (当前值)
    -   Average (平均值)
    -   Peak (峰值)

## 4. 数据模型 (Data Models)

### 4.1 System (Platform)
```typescript
interface System {
  id: number;           // 唯一标识
  name: string;         // 系统名称 (e.g., "Sungrow Cloud")
  type: 'Cloud' | 'SCADA' | 'Edge';
  vendor: string;       // 厂商 (e.g., "Sungrow")
  deviceCount: number;  // 设备数量
  status: 'connecting' | 'connected' | 'disconnected';
}
```

### 4.2 Device
```typescript
interface Device {
  sn: string;           // 序列号 (Primary Key)
  type: 'Inverter' | 'Battery';
  vendor: string;
  status: 'online' | 'offline';
  capacity: number;     // 容量 (kW/kWh)
  address: string;
  nmi?: string;         // National Meter Identifier
  dnsp?: string;
  retailer?: string;
  vppId?: number;       // 关联的 VPP ID
  userName?: string;
  email?: string;
}
```

### 4.3 DeviceData (TimeSeries)
```typescript
interface DeviceData {
  unit: string;         // 单位 (e.g., "kW")
  color: string;        // 图表颜色 Hex
  data: number[];       // 数值数组
}
```
