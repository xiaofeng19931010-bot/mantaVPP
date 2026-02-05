const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, BorderStyle, WidthType, HeadingLevel, AlignmentType, LevelFormat, TableOfContents, PageBreak, Header, Footer, PageNumber } = require('docx');

// Define Constants
const FONT_FAMILY = "Arial";
const COLOR_BLACK = "000000";
const COLOR_HEADER_BG = "D5E8F0"; // Light blue-gray for table headers

// Helper to create a standard paragraph
function createPara(text, options = {}) {
    return new Paragraph({
        children: [new TextRun({ text: text, font: FONT_FAMILY, size: 21, color: COLOR_BLACK })], // 10.5pt
        spacing: { line: 276, after: 120 }, // 1.15 line height, 6pt after
        indent: { firstLine: 420 }, // First line indent
        ...options
    });
}

// Helper to create list item
function createListItem(text, level = 0, numbered = false) {
    return new Paragraph({
        children: [new TextRun({ text: text, font: FONT_FAMILY, size: 21, color: COLOR_BLACK })],
        spacing: { line: 276, after: 120 },
        numbering: {
            reference: numbered ? "default-numbered" : "default-bullet",
            level: level
        }
    });
}

// Helper to create a table row
function createRow(cells, isHeader = false) {
    return new TableRow({
        tableHeader: isHeader,
        children: cells.map(cellText => new TableCell({
            width: { size: 100 / cells.length, type: WidthType.PERCENTAGE },
            shading: isHeader ? { fill: COLOR_HEADER_BG, val: "clear", color: "auto" } : undefined,
            borders: {
                top: { style: BorderStyle.SINGLE, size: isHeader ? 12 : 4, color: "CCCCCC" }, // 1.5pt top for header
                bottom: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
                left: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
                right: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
            },
            children: [new Paragraph({
                children: [new TextRun({ text: cellText, font: FONT_FAMILY, size: 21, bold: isHeader })],
                alignment: isHeader ? AlignmentType.CENTER : AlignmentType.LEFT
            })]
        }))
    });
}

// Main Document Definition
const doc = new Document({
    creator: "Manta Product Team",
    title: "现货市场产品需求文档",
    description: "Spot Market Product Requirements Document",
    styles: {
        default: {
            document: {
                run: {
                    font: FONT_FAMILY,
                    size: 21, // 10.5pt
                    color: COLOR_BLACK,
                },
                paragraph: {
                    spacing: { line: 276, after: 120 }, // 1.15 line height, 6pt after
                },
            },
        },
        paragraphStyles: [
            {
                id: "Heading1",
                name: "Heading 1",
                basedOn: "Normal",
                next: "Normal",
                quickFormat: true,
                run: { size: 32, bold: true, font: FONT_FAMILY, color: COLOR_BLACK }, // 16pt
                paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 },
            },
            {
                id: "Heading2",
                name: "Heading 2",
                basedOn: "Normal",
                next: "Normal",
                quickFormat: true,
                run: { size: 28, bold: true, font: FONT_FAMILY, color: COLOR_BLACK }, // 14pt
                paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 },
            },
            {
                id: "Heading3",
                name: "Heading 3",
                basedOn: "Normal",
                next: "Normal",
                quickFormat: true,
                run: { size: 24, bold: true, font: FONT_FAMILY, color: COLOR_BLACK }, // 12pt
                paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 },
            },
            {
                id: "Normal",
                name: "Normal",
                run: { font: FONT_FAMILY, size: 21, color: COLOR_BLACK },
                paragraph: { spacing: { line: 276, after: 120 } }
            }
        ]
    },
    numbering: {
        config: [
            {
                reference: "default-bullet",
                levels: [
                    { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }
                ]
            },
            {
                reference: "default-numbered",
                levels: [
                    { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }
                ]
            }
        ]
    },
    sections: [{
        properties: {
            page: {
                pageNumbers: {
                    start: 1,
                    formatType: "decimal"
                }
            }
        },
        headers: {
            default: new Header({
                children: [
                    new Paragraph({
                        children: [new TextRun("Spot Market Product Requirements Document")],
                        alignment: AlignmentType.RIGHT
                    })
                ]
            })
        },
        footers: {
            default: new Footer({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun("Page "),
                            new TextRun({ children: [PageNumber.CURRENT] }),
                            new TextRun(" of "),
                            new TextRun({ children: [PageNumber.TOTAL_PAGES] })
                        ],
                        alignment: AlignmentType.RIGHT
                    })
                ]
            })
        },
        children: [
            // Title
            new Paragraph({
                text: "现货市场产品需求文档",
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER,
                spacing: { after: 480 }
            }),

            // Table of Contents
            new TableOfContents("目录", {
                hyperlink: true,
                headingStyleRange: "1-3"
            }),
            new Paragraph({ children: [new PageBreak()] }),

            // 1. 业务背景
            new Paragraph({
                text: "1. 业务背景",
                heading: HeadingLevel.HEADING_1
            }),
            createPara("Spot Market (现货市场) 模块是虚拟电厂（VPP）参与电力市场交易的核心指挥中心。该模块提供实时的市场价格监控、自动化的交易规则配置、套利机会分析以及交易事件的追踪功能。旨在帮助运营人员最大化电力资产的经济效益，通过智能化的策略在价格高点放电、低点充电，并参与辅助服务市场。"),

            // 2. 目标用户
            new Paragraph({
                text: "2. 目标用户",
                heading: HeadingLevel.HEADING_1
            }),
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                    createRow(["角色", "用户故事 (需求描述)"], true),
                    createRow(["交易员", "实时监控各区域（NSW, VIC, QLD, SA, TAS）的现货价格和预调度价格，以便快速做出手动调度决策。"]),
                    createRow(["策略分析师", "配置自动化的交易规则（例如：当价格低于 $0/MWh 时充电，高于 $300/MWh 时放电），以实现 24/7 的无人值守交易。"]),
                    createRow(["资产管理者", "查看历史的套利点（Arbitrage Points）和预测准确性，以评估算法模型的有效性。"]),
                    createRow(["合规专员", "查看所有的交易事件日志（Trading Events），包括触发原因、执行时间、功率和成交量，以满足审计要求。"])
                ]
            }),

            // 3. 核心场景
            new Paragraph({
                text: "3. 核心场景",
                heading: HeadingLevel.HEADING_1
            }),
            createPara("以下为本模块的核心业务交互流程："),
            createListItem("监控市场: 用户进入 \"Spot Price\"，选择区域，观察价格走势。若发现价格飙升，进入 \"Spot Trading\" 查看是否有规则触发。", 0, true),
            createListItem("配置策略: 用户在 \"Trading Rules\" 中点击 \"Create Rule\"，设置 \"当 NSW 价格 > $500 时全力放电\"，选择关联的 VPP，保存规则。", 0, true),
            createListItem("验证执行: 规则激活后，用户切换到 \"Trading Events\" 标签，等待并确认系统是否在价格满足条件时自动生成了 \"Discharge\" 事件。", 0, true),
            createListItem("复盘分析: 次日，用户进入 \"Arbitrage Points\"，选择 \"Historical\" 查看昨日数据，对比 \"Signal By Forecast\" 和 \"Signal By Spot\" 的一致性，以优化预测模型。", 0, true),

            // 4. 功能范围
            new Paragraph({
                text: "4. 功能范围",
                heading: HeadingLevel.HEADING_1
            }),
            
            // 4.1 Spot Price
            new Paragraph({
                text: "4.1 现货价格监控 (Spot Price)",
                heading: HeadingLevel.HEADING_2
            }),
            createPara("入口: 点击侧边栏 \"Spot Market\" -> \"Spot Price\"。"),
            
            new Paragraph({
                text: "4.1.1 市场状态看板 (Market Status)",
                heading: HeadingLevel.HEADING_3
            }),
            createListItem("区域选择: 下拉选择定价区域 (NSW, VIC, QLD, SA, TAS)。"),
            createListItem("核心指标: Spot Price, Pre-Dispatch, Forecast Spot, Available Discharge, Available Charge。"),
            createListItem("交易绩效: Trading Opportunities, Est. Revenue。"),

            new Paragraph({
                text: "4.1.2 价格趋势图表 (Price Chart)",
                heading: HeadingLevel.HEADING_3
            }),
            createListItem("时间维度: Real-time (24h + forecast), Historical (特定日期)。"),
            createListItem("图表内容: Spot Price, Dispatch Price, Forecast Price。"),
            createListItem("图表设置: Weather (天气叠加), Arbitrage Point (信号点叠加)。"),

            // 4.2 Spot Trading
            new Paragraph({
                text: "4.2 现货交易管理 (Spot Trading)",
                heading: HeadingLevel.HEADING_2
            }),
            createPara("入口: 点击侧边栏 \"Spot Market\" -> \"Spot Trading\"。"),

            new Paragraph({
                text: "4.2.1 交易规则 (Trading Rules)",
                heading: HeadingLevel.HEADING_3
            }),
            createListItem("筛选栏: State, Trigger Type, Search, Create Rule。"),
            createListItem("规则列表: Rule ID, VPP Name, State, Trigger From, Details, Action。"),
            createListItem("新建/编辑规则抽屉: State, Trigger Type, Condition, Action, Applicable VPPs, Ignore Time。"),

            new Paragraph({
                text: "4.2.2 交易事件 (Trading Events)",
                heading: HeadingLevel.HEADING_3
            }),
            createListItem("列表字段: Date, VPP, State, Trigger From, Action, Start/End Time, Rated Power, Volume, Spot, Status。"),
            createListItem("分页: 支持每页 10/20/50/100 条数据。"),

            // 4.3 Arbitrage Points
            new Paragraph({
                text: "4.3 套利点分析 (Arbitrage Points)",
                heading: HeadingLevel.HEADING_2
            }),
            createPara("入口: 点击侧边栏 \"Spot Market\" -> \"Arbitrage Points\"。"),
            
            new Paragraph({
                text: "4.3.1 信号概览与筛选",
                heading: HeadingLevel.HEADING_3
            }),
            createListItem("信号类型: Discharge, Normal, Charge, FCAS, Abnormal。"),
            createListItem("时间控制: Real-time / Historical。"),

            new Paragraph({
                text: "4.3.2 套利明细表",
                heading: HeadingLevel.HEADING_3
            }),
            createListItem("列表字段: Time, Spot ($/MW), Forecast Spot, Time / Forecast Spot (Bar Chart), Signal By Forecast, Signal By Spot。"),

            // 5. 数据要求
            new Paragraph({
                text: "5. 数据要求",
                heading: HeadingLevel.HEADING_1
            }),
            createListItem("价格数据: 模拟澳洲 NEM 市场价格曲线（Duck Curve 特征）。"),
            createListItem("信号生成: Charge (<阈值A 或 光伏高峰), Discharge (>阈值B 或 晚高峰)。"),
            createListItem("Mock 数据: 支持 3 天范围内的历史回溯。"),
            createListItem("聚合计算: Available Discharge = Sum(Battery SOC * Capacity); Est. Revenue = Sum(Event Volume * Spot Price)。"),

            // 6. 异常流程
            new Paragraph({
                text: "6. 异常流程",
                heading: HeadingLevel.HEADING_1
            }),
            createListItem("网络断连: 显示 \"Last updated: [Time]\" 并置灰图表。"),
            createListItem("规则冲突: 若同一 VPP 命中多条规则，优先执行保护性规则或最新创建的规则。"),
            createListItem("无数据: 显示 Empty State 占位符。"),

            // 7. 非功能需求
            new Paragraph({
                text: "7. 非功能需求",
                heading: HeadingLevel.HEADING_1
            }),
            
            new Paragraph({
                text: "7.1 性能指标",
                heading: HeadingLevel.HEADING_2
            }),
            createListItem("图表渲染: 加载时间 < 800ms，帧率 > 30fps。"),
            createListItem("实时性: 价格数据每 5 分钟刷新。"),
            
            new Paragraph({
                text: "7.2 安全规范",
                heading: HeadingLevel.HEADING_2
            }),
            createListItem("操作审计: 记录所有规则变更的操作人 IP 和时间。"),
            createListItem("权限隔离: 普通用户仅查看，管理员可修改规则。"),

            new Paragraph({
                text: "7.3 兼容性",
                heading: HeadingLevel.HEADING_2
            }),
            createListItem("分辨率: 适配 1366x768 及以上。"),
            createListItem("浏览器: Chrome 90+, Edge 90+, Safari 14+, Firefox 88+。"),

            // 8. 验收标准
            new Paragraph({
                text: "8. 验收标准",
                heading: HeadingLevel.HEADING_1
            }),
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                    createRow(["ID", "验收标准描述", "优先级"], true),
                    createRow(["AC-01", "价格监控: 切换区域时，数据和图表同步更新为该区域数据。", "P0"]),
                    createRow(["AC-02", "规则执行: 创建规则后，列表立即可见且默认为 Active。", "P0"]),
                    createRow(["AC-03", "事件记录: 模拟触发事件后，列表新增记录且状态流转正确。", "P0"]),
                    createRow(["AC-04", "套利分析: Forecast Bars 正确渲染，信号颜色与图例一致。", "P1"])
                ]
            }),

            // 9. 运营计划
            new Paragraph({
                text: "9. 运营计划",
                heading: HeadingLevel.HEADING_1
            }),
            createPara("[待补充]"),

            // 10. 合规要求
            new Paragraph({
                text: "10. 合规要求",
                heading: HeadingLevel.HEADING_1
            }),
            createPara("[待补充]"),

            // 11. 附录
            new Paragraph({
                text: "11. 附录",
                heading: HeadingLevel.HEADING_1
            }),
            createPara("[待补充]")
        ]
    }]
});

// Generate Document
const fileName = `SpotMarket_PRD_v1.0_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}.docx`;

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(fileName, buffer);
    console.log(`Document created successfully: ${fileName}`);
}).catch((err) => {
    console.error("Error creating document:", err);
});
