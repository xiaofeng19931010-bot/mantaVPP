# Manta VPP Management 产品需求文档

## 1. 文档概述
本文档旨在详细描述 Manta Web 项目中 VPP (Virtual Power Plant) Management 模块的功能需求、交互逻辑及数据结构，以便于开发团队理解和实施，并可直接导入飞书（Lark）文档进行协作。

## 2. 功能架构
VPP Management 模块主要包含以下核心功能：
- **VPP 列表展示**：以卡片网格形式展示所有 VPP 实例及其运行状态。
- **VPP 创建与编辑**：通过侧边抽屉（Drawer）形式新建或修改 VPP 信息。
- **VPP 详情概览**：展示特定 VPP 的详细信息、关键指标统计及关联设备列表。
- **设备检索**：在详情页支持对关联设备的多维度搜索。

## 3. 功能模块详解

### 3.1 VPP 列表 (VPP List)
#### 3.1.1 界面布局
- **整体布局**：采用响应式网格布局（Grid）。
  - 移动端：单列显示
  - 平板端：双列显示
  - 桌面端：三列显示
- **空状态**：
  - 当无 VPP 数据时，居中显示 "No VPPs Created" 提示及图标。
  - 提供 "Create" 按钮，点击触发新建流程。

#### 3.1.2 VPP 卡片内容
每个 VPP 卡片包含以下信息：
- **头部**：
  - **VPP 名称**：加粗显示，超出部分省略。
  - **选中状态**：当前选中的 VPP 显示蓝色左边框及选中圆点。
  - **编辑入口**：鼠标悬停（Hover）时显示 "Edit" 按钮。
- **统计数据区域**（底部两栏）：
  - **Inverters (逆变器)**：
    - 总数量及总容量 (kW)。
    - 在线数量/容量 (绿色指示点)。
    - 离线数量/容量 (灰色指示点)。
  - **Batteries (电池)**：
    - 总数量及总容量 (kWh)。
    - 在线数量/容量。
    - 离线数量/容量。

#### 3.1.3 交互逻辑
- **点击卡片**：跳转至该 VPP 的详情页面 (`vpp_details`)。
- **点击 Edit 按钮**：阻止冒泡，打开编辑抽屉。
- **点击 New 按钮**（列表右上角）：打开新建抽屉。

---

### 3.2 VPP 创建与编辑 (Create/Edit VPP)
#### 3.2.1 交互形式
- 采用右侧滑出抽屉（Drawer）组件。
- 包含表单区域及底部操作栏（Cancel / Submit）。

#### 3.2.2 表单字段
| 字段名称 | 类型 | 必填 | 默认值/逻辑 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| **VPP Name** | Text | 是 | 编辑时回显 | VPP 名称，如 "Virtual Power Plant X" |
| **Company** | Text | 否 | 当前用户公司 | 所属公司 |
| **Country** | Text | 否 | 当前用户国家 | 所属国家 |
| **ABN/VAT** | Text | 否 | 当前用户 ABN | 税号/商业编号 |
| **Business Address** | Text | 否 | 当前用户地址 | 商业地址 |
| **DNSP** | Text | 否 | - | 分销网络服务提供商 |
| **Description** | Textarea | 否 | - | 描述信息 |

#### 3.2.3 提交逻辑 (`handleVPPSubmit`)
- **加载状态**：点击提交后，按钮显示 Loading 动画，文案变为 "Creating..." 或 "Saving..."。
- **模拟延迟**：前端模拟 1000ms 网络请求延迟。
- **新建逻辑**：
  - 生成唯一 `id` (timestamp)。
  - **自动生成模拟设备**：
    - 自动创建 **5个逆变器** (Inverter) 和 **3个电池** (Battery)。
    - 设备属性（SN, Vendor, Status, User Info）随机生成。
    - 自动计算 VPP 总容量 (Capacity) 和设备总数。
    - 将新设备追加到全局 `MOCK_DATA` 中。
  - 自动选中新建的 VPP 并插入列表顶部。
- **编辑逻辑**：
  - 更新现有 VPP 对象的字段信息。
- **反馈**：操作成功后显示 Toast 提示 ("VPP Created/Updated successfully") 并关闭抽屉。

---

### 3.3 VPP 详情页 (VPP Details)
#### 3.3.1 顶部导航
- **返回按钮**：点击返回 VPP 列表页。
- **标题**：显示当前 VPP 名称。

#### 3.3.2 概览卡片 (Summary Cards)
页面顶部展示 4 个关键指标卡片：
1.  **基础信息 (Info)**：展示 Company, Country, ABN/VAT, DNSP。
2.  **设备总数 (Total Devices)**：关联设备总数量。
3.  **在线设备 (Online)**：状态为 'online' 的设备数量（绿色图标）。
4.  **离线设备 (Offline)**：状态为 'offline' 的设备数量（灰色图标）。

#### 3.3.3 设备列表 (Device List)
- **搜索功能**：
  - 支持字段：SN, Vendor, Type, User Name, Phone, Email, Address。
  - 实时过滤：输入内容即时筛选列表。
- **表格列定义**：
  - **SN**：设备序列号。
  - **Type**：设备类型（带图标区分 Inverter/Battery）。
  - **Manufacturer**：厂商。
  - **NMI**：国家计量标识符。
  - **Status**：在线/离线状态徽章。
  - **Owner**：用户姓名。
  - **Owner Email**：用户邮箱。
  - **DNSP**：服务提供商。
  - **Retailer**：零售商。
- **空状态**：搜索无结果或无设备时显示 "当前暂无设备"。

## 4. 数据模型 (Data Models)

### 4.1 VPP 对象结构
```json
{
  "id": "number (timestamp)",
  "name": "string",
  "company": "string",
  "country": "string",
  "state": "string",
  "abn": "string",
  "address": "string",
  "dnsp": "string",
  "description": "string",
  "capacity": "string (e.g., '1.5 MWh')",
  "devices": "number",
  "createdAt": "number (timestamp)"
}
```

### 4.2 设备对象结构 (Device)
```json
{
  "id": "number",
  "sn": "string (e.g., 'INV-SIM-...')",
  "vendor": "string (e.g., 'Sungrow', 'Tesla')",
  "type": "string ('Inverter' | 'Battery')",
  "status": "string ('online' | 'offline')",
  "vppId": "number (关联 VPP ID)",
  "capacity": "number",
  "userName": "string",
  "phone": "string",
  "email": "string",
  "address": "string",
  "nmi": "string",
  "dnsp": "string",
  "retailer": "string"
}
```

## 5. 交互细节补充
- **动画效果**：
  - 列表加载时有 `slide-up` 动画。
  - VPP 卡片悬停有阴影加深及边框变化效果。
  - 抽屉开关有平滑过渡动画。
- **Toast 通知**：
  - 使用 `app.showToast(message, type)` 显示操作结果。
- **图标系统**：
  - 使用 `lucide` 图标库 (Server, Zap, Battery, Edit-2, Plus, Search, etc.)。
