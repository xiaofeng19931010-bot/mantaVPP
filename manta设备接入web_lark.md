# 产品需求文档 (PRD): Manta VPP 设备接入管理平台 (Web)

## 1. 项目概述
`manta_web` 是 Manta 生态的核心 Web 管理端，用于管理虚拟电厂 (VPP) 及接入设备（逆变器、电池）。系统面向 **系统管理员 (Admin)** 和 **VPP 运营人员 (Operator)**，提供接入点管理、VPP 资源池构建以及设备的全生命周期管理（发现、授权、批量导入）。

设计目标是构建一个轻量级、响应式且具有现代科技感（Tech-focused）的单页应用，无需复杂的构建流程即可快速部署和预览。

## 2. 用户角色
- **Admin (系统管理员)**: 负责基础设施建设，管理物理接入点 (Manta Edge) 及云端集成 (Cloud API)。拥有 "Admin Mode" 权限，可查看所有敏感信息。
- **Operator (运营人员)**: 负责业务运营，创建 VPP 实例，分配和管理设备资源，监控运行状态。

## 3. 核心模块与功能

### 3.1 仪表盘 (Dashboard) - Access Points
**场景**: 管理员查看和管理所有设备接入通道。

*   **筛选 (Filter)**：
    *   顶部工具栏支持按类型筛选：`All` (全部), `Cloud` (云端接入), `Manta` (硬件接入)。
    *   筛选切换时实时更新节点列表。
*   **新建接入点 (New Access)**：
    *   **交互**：点击 "New" 按钮弹出模态框。
    *   **类型**：支持 `Cloud` 或 `Manta` 类型。
    *   **Cloud 类型表单**：
        *   **Authorization Method**: 下拉选择 "Batch Authorization" (批量授权) 或 "Single Authorization" (单个授权)。
        *   **API Endpoint**: 云平台接口地址。
        *   **Vendor & Region**: 厂商和区域选择。
        *   **App Key & Secret**: 自动生成或录入。
    *   **Manta 类型表单**：
        *   **IP Address & Port**: 硬件网关地址。
        *   **Assigned VPP**: 可选关联 VPP。
    *   **验证**：包含表单必填校验及模拟的创建加载 (Loading) 状态。
*   **节点卡片 (Node Card)**：
    *   **展示**：厂商图标（根据厂商名称自动匹配 Lucide 图标）、节点名称、在线/离线状态、关联设备数量（Inverters/Batteries）。
    *   **交互**：点击卡片跳转至该节点的详情页面 (Details View)。
    *   **停用逻辑**：
        *   点击卡片上的状态指示灯或开关。
        *   **二次确认**：系统首先弹出确认对话框（"Are you sure you want to disable..."）。
        *   **依赖检查**：用户确认后，系统检查该节点下是否存在关联的 VPP 或设备。
            *   **存在关联**：弹出错误提示（Alert），告知操作失败并说明原因（"Cannot disable... has associated VPP or devices"）。
            *   **无关联**：直接切换为离线状态。

### 3.2 接入详情 (Access Details)
**场景**: 查看特定接入点的详细配置及下属设备状态。

*   **Header**: 返回按钮、节点名称、类型标签。
*   **信息面板 (Info Panel)**：
    *   **Cloud 节点**：
        *   显示 "Authorization Method" (Batch/Single)。
        *   显示 App Key。
        *   **App Access (Secret)**: 默认隐藏 (••••••)，点击眼睛图标可显示/隐藏。
    *   **Manta 节点**：
        *   显示 "Authorization Method" (Local Connection)。
        *   显示 IP 和 Port。
*   **设备列表 (Device List)**：
    *   **Tabs**: `Inverters` (逆变器) / `Batteries` (电池) 切换。
    *   **列表字段**：SN、Model (型号)、Status (在线状态)、Capacity (容量)、User Name (用户名)、Phone、Email、Address、以及动态数据列 (如 Power, Voltage)。
    *   **智能搜索 (Smart Search)**：
        *   列表右上角提供搜索输入框。
        *   **支持多字段模糊搜索**：SN码、型号、用户名、电话、邮箱、地址。
        *   输入时实时过滤列表，且保持输入框焦点。
    *   **数据可视化**：点击列表中的数据列（如 Power, Voltage），弹出 ECharts 图表模态框，展示模拟的历史趋势数据（支持 24H, 7D, 30D, Custom 范围）。
    *   **用户信息加密**：
        *   默认对用户敏感信息（姓名、电话、邮箱、地址）进行加密显示（如 `L***m`）。
        *   **Admin Mode**: 若当前用户拥有 Admin 权限，所有加密信息自动转为明文显示。

### 3.3 VPP 管理 (VPP Management)
**场景**: 核心业务区域，采用分栏布局，左侧为 VPP 列表，右侧为设备管理。

#### 3.3.1 左侧：VPP 列表 (VPP List)
*   **列表展示**：
    *   以卡片形式展示 VPP 列表。
    *   卡片包含：VPP 名称、描述、选中状态指示条。
    *   **统计面板**：卡片内部内嵌逆变器和电池的统计数据（在线/离线数量、总容量）。
*   **新建/编辑 VPP**：
    *   **新建**：点击顶部工具栏的 "New" 按钮，从右侧滑出抽屉 (Drawer)，填写名称和描述。
    *   **编辑**：鼠标悬停在 VPP 卡片上，点击出现的 "Edit" 按钮，同样通过抽屉进行编辑。
*   **选择 VPP**：
    *   点击卡片选中 VPP，右侧设备管理区域将自动刷新为该 VPP 下的数据。

#### 3.3.2 右侧：设备管理 (Device Management)
包含两个主要标签页：`Joined Devices` (已加入设备) 和 `Joinable Devices` (可加入/发现设备)。

**A. Joined Devices (已加入设备)**
*   **列表展示**：
    *   显示当前选中 VPP 下的已授权设备。
    *   **字段**：SN, Type, Vendor, Status, Capacity (容量), User Name, Phone, Email, Address。
*   **用户信息可见性**：
    *   **特权逻辑**：当前 VPP 的用户（运营者）可以看到加入到自己 VPP 的设备的用户信息（**明文显示**，不受 Admin Mode 关闭的影响）。
*   **搜索**：
    *   支持对已加入设备的**多字段模糊搜索**。
    *   搜索框位于工具栏中间，支持实时过滤。
*   **添加设备 (Add Device)**：
    *   点击 "Add Device" 按钮，从右侧滑出抽屉。
    *   **表单录入**：设备类型、厂商、SN码、用户信息（姓名、电话、邮箱、地址）。
    *   **模拟授权**：提交后系统模拟请求云平台授权，显示 Loading 状态，成功后自动刷新列表。
*   **批量添加 (Batch Add)**：
    *   点击 "Batch Add" 按钮弹出模态框。
    *   **Step 1**: 下载 CSV/Excel 模板。
    *   **Step 2**: 拖拽或点击上传文件。
    *   **处理流程**：文件解析 -> 数据校验 -> 模拟云端批量授权 -> 结果反馈（Toast）并刷新列表。

**B. Joinable Devices (可加入设备)**
*   **列表展示**：
    *   显示网络中已发现但未分配到当前 VPP 的设备。
    *   **字段**：SN, Type, Vendor, Status, Capacity (容量), User Name, Phone, Email, Address。
    *   **交互限制**：此列表仅用于**设备发现与查看**，不支持在此处直接勾选或添加设备（需通过 "Add Device" 或 "Batch Add" 在 Joined Devices 页面进行操作）。
*   **用户信息可见性**：
    *   默认加密显示（`L***m`）。
    *   仅在开启 **Admin Mode** 时显示明文。
*   **搜索**：支持对发现列表的快速搜索过滤。

## 4. 全局交互与设计规范

### 4.1 顶部导航与 Admin Mode
*   **Global Navigation**: Dashboard / VPP Management。
*   **Admin Mode**:
    *   Admin Mode 不再通过 UI 按钮手动切换。
    *   系统根据当前登录用户的角色（Admin 或 Operator）自动决定权限。
    *   **Admin 角色**: 默认开启 Admin Mode，所有敏感信息明文显示。
    *   **Operator 角色**: 敏感信息（Secret, 非 VPP 归属用户信息）加密显示。

### 4.2 视觉风格 (Visual Identity)
*   **主题**：深色模式 (Dark Mode)，背景色 `bg-slate-900`。
*   **质感**：**Glassmorphism** (毛玻璃)，大量使用半透明背景 (`bg-white/5`)、模糊效果 (`backdrop-blur`) 和细边框 (`border-white/10`)。
*   **色彩**：
    *   **Brand**: `#4F46E5` (Indigo-600) 用于主要按钮和激活状态。
    *   **Status**: Emerald (在线/成功), Rose (离线/错误), Slate (文本/背景), Amber (警告)。
    *   **Icons**：统一使用 Lucide Icons。

### 4.3 布局规范 (Layout Specs)
*   **响应式**：采用 Flexbox 和 Grid 布局，确保适配主流桌面分辨率。
*   **高度对齐**：VPP 列表头部工具栏与设备管理工具栏高度保持一致，视觉对齐。

### 4.4 反馈机制
*   **Loading**：按钮操作（如提交、授权）时显示旋转 Loading 图标。
*   **Toast**：操作成功（如批量添加成功）时右上角弹出 Toast 提示。
*   **Modal/Drawer**：复杂表单使用右侧抽屉，确认/警告信息使用居中模态框。

## 5. 技术栈 (Technical Stack)
*   **Core**: 原生 JavaScript (ES6+), HTML5
*   **Styling**: Tailwind CSS (通过 CDN 引入)
*   **Icons**: Lucide Icons (CDN 引入)
*   **Charts**: Apache ECharts
*   **Deployment**: 静态文件直接部署，无需 Build 步骤。
