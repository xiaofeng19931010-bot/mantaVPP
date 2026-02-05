const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, BorderStyle, WidthType, AlignmentType } = require("docx");
const fs = require("fs");

const doc = new Document({
    styles: {
        paragraphStyles: [
            {
                id: "Normal",
                name: "Normal",
                run: {
                    font: "Calibri",
                    size: 24, // 12pt
                },
                paragraph: {
                    spacing: {
                        line: 276, // 1.15 spacing
                    },
                },
            },
            {
                id: "Heading1",
                name: "Heading 1",
                run: {
                    font: "Calibri Light",
                    size: 32, // 16pt
                    bold: true,
                    color: "2E74B5",
                },
                paragraph: {
                    spacing: {
                        before: 240,
                        after: 120,
                    },
                },
            },
            {
                id: "Heading2",
                name: "Heading 2",
                run: {
                    font: "Calibri Light",
                    size: 28, // 14pt
                    bold: true,
                    color: "2E74B5",
                },
                paragraph: {
                    spacing: {
                        before: 240,
                        after: 120,
                    },
                },
            },
        ],
    },
    sections: [
        {
            properties: {},
            children: [
                new Paragraph({
                    text: "PV ESS Product Marketing Strategy & Analysis",
                    heading: HeadingLevel.TITLE,
                    alignment: AlignmentType.CENTER,
                }),
                new Paragraph({
                    text: "Manta VPP Management System",
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 400 },
                }),
                
                // Executive Summary
                new Paragraph({
                    text: "1. Executive Summary",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    text: "The PV ESS (Photovoltaic Energy Storage System) module is the cornerstone of the Manta Virtual Power Plant (VPP) platform. It provides comprehensive real-time monitoring, asset management, and topological analysis for distributed energy storage devices. By aggregating fragmented battery resources into a unified, controllable virtual asset, PV ESS enables energy operators to maximize grid stability and trading revenue.",
                }),

                // Product Overview
                new Paragraph({
                    text: "2. Product Overview",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    text: "PV ESS serves as the central command center for battery assets. It connects individual household and commercial batteries to the grid operator's control room, offering granular visibility from the fleet level down to individual cells.",
                }),
                new Paragraph({
                    text: "Key Capabilities:",
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({
                    text: "• Fleet-wide Monitoring: Instant visibility into Online, Offline, and Disconnected assets.",
                    bullet: { level: 0 },
                }),
                new Paragraph({
                    text: "• Deep Diagnostics: Drill-down views with energy topology (PV, Battery, Inverter, Grid flow).",
                    bullet: { level: 0 },
                }),
                new Paragraph({
                    text: "• Smart Search: Rapid asset location via Serial Number (SN) or National Metering Identifier (NMI).",
                    bullet: { level: 0 },
                }),
                new Paragraph({
                    text: "• Capacity Aggregation: Real-time summation of Rated Power and Capacity for VPP trading.",
                    bullet: { level: 0 },
                }),

                // Target Market & Personas
                new Paragraph({
                    text: "3. Market Analysis",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    text: "Target Audience:",
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({
                    text: "1. VPP Operators & Aggregators: Need to manage thousands of distributed assets.",
                }),
                new Paragraph({
                    text: "2. Grid Service Providers: Need visibility into local grid stability and voltage support.",
                }),
                new Paragraph({
                    text: "3. Asset Managers: Responsible for O&M and device health.",
                }),
                
                new Paragraph({
                    text: "User Personas:",
                    heading: HeadingLevel.HEADING_2,
                }),
                createTable([
                    ["Role", "Pain Point", "PV ESS Solution"],
                    ["Asset Manager", "Hard to track connection faults across thousands of devices.", "Real-time status dashboard with 'Disconnected' alerts."],
                    ["O&M Engineer", "Diagnosing energy flow issues is complex without visualization.", "Visual Energy Topology showing real-time DC/AC flow."],
                    ["Energy Trader", "Lack of real-time capacity data for bidding.", "Aggregated Rated Power & Capacity views by State/Region."],
                ]),

                // Competitive Advantage
                new Paragraph({
                    text: "4. Competitive Advantage",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    text: "Unlike basic monitoring apps provided by hardware manufacturers (which only show their own devices), Manta PV ESS is vendor-agnostic and VPP-centric.",
                }),
                new Paragraph({
                    text: "• Vendor Agnostic: Unified view for Tesla, Sungrow, BYD, and more.",
                    bullet: { level: 0 },
                }),
                new Paragraph({
                    text: "• Topology Visualization: Not just numbers, but dynamic energy flow animation.",
                    bullet: { level: 0 },
                }),
                new Paragraph({
                    text: "• High Performance: Optimized for managing 10,000+ devices with sub-second rendering.",
                    bullet: { level: 0 },
                }),

                // Business Model
                new Paragraph({
                    text: "5. Business Model & ROI",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    text: "Pricing Strategy:",
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({
                    text: "• SaaS Subscription: Monthly fee per connected MW or per device.",
                    bullet: { level: 0 },
                }),
                new Paragraph({
                    text: "• VPP Revenue Share: Percentage of trading revenue generated through the platform.",
                    bullet: { level: 0 },
                }),
                new Paragraph({
                    text: "ROI Analysis:",
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({
                    text: "• Reduced O&M Costs: Remote diagnosis reduces truck rolls by 30%.",
                    bullet: { level: 0 },
                }),
                new Paragraph({
                    text: "• Increased Trading Yield: Accurate SOC data improves bidding accuracy by 15%.",
                    bullet: { level: 0 },
                }),

                // Conclusion
                new Paragraph({
                    text: "6. Conclusion",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    text: "Manta PV ESS transforms passive battery assets into active, profitable grid resources. It is the essential tool for the modern smart grid.",
                }),
            ],
        },
    ],
});

function createTable(rows) {
    return new Table({
        width: {
            size: 100,
            type: WidthType.PERCENTAGE,
        },
        rows: rows.map((row, i) => 
            new TableRow({
                children: row.map(cellText => 
                    new TableCell({
                        children: [new Paragraph({ text: cellText, run: { bold: i === 0 } })],
                        width: {
                            size: 100 / row.length,
                            type: WidthType.PERCENTAGE,
                        },
                    })
                ),
            })
        ),
    });
}

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("marketing_materials/PV_ESS_Marketing_Strategy.docx", buffer);
    console.log("Document created successfully");
});
