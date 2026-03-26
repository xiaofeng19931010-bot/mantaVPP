# Manta Web - 项目重构说明

## 当前项目结构

```
manta_web/
├── index.html          # 主页面 (~600行，包含完整导航和布局)
├── login.html          # 登录页面
├── dashboard.html       # 仪表板
├── app.js              # 主逻辑 (~900KB，单文件)
├── users.js            # 用户数据
├── assets/
│   ├── design-tokens.json    # 设计令牌 (未充分利用)
│   └── icons/               # SVG图标
├── lib/
│   └── echarts.min.js
└── tests/
    └── backstop.json         # 视觉回归测试
```

## 已完成的模块化重构

### 新目录结构

```
src/
├── config/
│   ├── constants.js     # 常量定义 (标题、区域、状态等)
│   └── mock-data.js     # Mock数据集中管理
├── components/
│   ├── table.js         # 通用表格组件 (DataTable)
│   ├── modal.js         # 模态框组件 (Modal)
│   ├── drawer.js        # 抽屉组件 (Drawer)
│   └── toast.js         # Toast通知组件 (Toast)
├── utils/
│   ├── format.js        # 格式化工具 (货币、日期、数字等)
│   └── dom.js           # DOM操作工具
├── styles/
│   └── tokens.css       # CSS设计令牌变量
├── app.js               # 应用入口 (展示模块整合)
└── index.js             # 模块导出索引
```

## 重构原则

1. **渐进式迁移** - 不破坏现有功能，逐步替换
2. **保持简单** - 不引入不必要的复杂度
3. **可读性优先** - 清晰的代码结构，易于产品经理理解
4. **零依赖** - 纯原生JS实现，无构建工具要求

## 使用方式

### 1. 开发服务器

```bash
# 方式1: 使用 npx (推荐)
npm run dev

# 方式2: 使用 Python
npm run serve

# 方式3: 直接打开 index.html (部分功能受限)
```

### 2. 在现有代码中使用模块

```javascript
// 直接引入需要的模块 (通过 script type="module")
import { formatCurrency, formatDate } from './src/utils/format.js';
import { DataTable, Toast } from './src/components/table.js';

// 使用
Toast.success('操作成功');
const formatted = formatCurrency(123.45); // '$123.45'
```

### 3. CSS 设计令牌

在 HTML 中引入 tokens.css:

```html
<link rel="stylesheet" href="src/styles/tokens.css">
```

然后在 CSS/HTML 中使用变量:

```html
<div class="bg-surface text-primary">
    <button class="btn btn-primary">Click</button>
</div>
```

## 组件使用示例

### DataTable

```javascript
const table = new DataTable('#container', {
    columns: [
        { key: 'name', label: 'Name' },
        { key: 'status', label: 'Status', format: (v) => `<span class="status-badge ${v}">${v}</span>` }
    ],
    data: myData,
    pagination: { enabled: true, pageSize: 10 }
});

table.setData(newData); // 更新数据
```

### Modal

```javascript
const modal = new Modal({
    title: 'Confirm Action',
    content: '<p>Are you sure?</p>',
    footer: '<button data-action="cancel">Cancel</button><button data-action="confirm">OK</button>'
});

modal.open();

// 或者使用 confirm 快捷方法
const confirmed = await modal.confirm({ message: 'Delete this item?' });
```

### Toast

```javascript
Toast.success('Operation completed');
Toast.error('Something went wrong', 'Error');
Toast.warning('Please review your input');
Toast.info('New notification received');
```

## 下一步计划

- [ ] 迁移 index.html 中的内联样式到 CSS 变量
- [ ] 将 app.js 中的视图函数拆分到 src/views/ 目录
- [ ] 统一所有页面的头部导航组件
- [ ] 添加更多的组件 (如图表封装、分页组件等)

## 注意事项

1. 当前 ES Module 需要通过 HTTP 服务器访问，直接打开文件会报 CORS 错误
2. 建议使用 `npx serve` 或 VSCode Live Server 插件
3. 现有 app.js 和 index.html 保持兼容，新旧代码可以共存
