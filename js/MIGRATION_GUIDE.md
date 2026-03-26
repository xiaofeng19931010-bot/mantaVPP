# Manta Web - 模块化拆分说明

## 当前状态

已建立 `js/` 目录结构，包含以下已提取的数据文件：

```
js/
├── mock-data.js    # MOCK_DATA 对象 (28KB, 676行) - 从 app.js:L1-676 提取
├── titles.js       # 页面标题映射 (1KB, 32行) - 从 app.js:L678-709 提取
├── state.js        # 全局状态对象 (7KB, 265行) - 从 app.js:L711-975 提取
├── views/          # 视图模块目录 (待填充)
└── ui/             # UI 组件目录 (待填充)
```

## 重要说明

原始 `app.js` 采用单一 `const app = {}` 对象模式，所有视图函数都作为其方法。

由于 JavaScript 不允许重复的 `const` 声明，直接合并会导致语法错误。

## 安全接入步骤（未来执行）

当需要真正接入拆分后的模块时，需按以下步骤执行：

### 步骤 1: 修改 js/mock-data.js

在文件开头添加 `window.` 前缀：
```javascript
window.MOCK_DATA = {
    // ... 保持原有内容不变
};
```

### 步骤 2: 修改 js/titles.js

```javascript
window.titles = {
    // ... 保持原有内容不变
};
```

### 步骤 3: 修改 js/state.js

```javascript
window.state = {
    // ... 保持原有内容不变
};
```

### 步骤 4: 修改 index.html

在 `app.js` 加载之前添加：
```html
<script src="js/mock-data.js"></script>
<script src="js/titles.js"></script>
<script src="js/state.js"></script>
```

### 步骤 5: 从 app.js 删除已迁移的代码

删除 app.js 中的以下行范围：
- L1-676: MOCK_DATA 定义
- L678-709: titles 定义
- L711-975: state 定义

### 步骤 6: 验证

启动应用并验证所有页面功能正常。

## 为什么不现在执行接入？

1. **零风险原则**：当前 app.js 工作正常，不应冒险
2. **渐进式迁移**：可以分批执行，每批后验证
3. **工具辅助**：复杂的删除操作建议手动或用 IDE 完成

## 下一步建议

1. 先验证已提取的文件内容正确（已在 js/ 目录）
2. 手动测试现有功能未受影响
3. 准备接入时，按照上述"安全接入步骤"执行
