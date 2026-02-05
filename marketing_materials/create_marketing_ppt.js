const PptxGenJS = require("pptxgenjs");

const pres = new PptxGenJS();

// Design Tokens
const colors = {
    brandPrimary: "2E9F58",
    brandAccent: "3EC064",
    textPrimary: "313949",
    textSecondary: "64748B",
    surface: "FFFFFF",
    surfaceAlt: "F9FAFB",
    surfaceCanvas: "F3F3F6",
    gradientStart: "00E944",
    gradientEnd: "0066FF"
};

// Common layout
pres.layout = "LAYOUT_16x9";

// Title Slide
let slide = pres.addSlide();
slide.background = { color: colors.surfaceCanvas };
slide.addText("PV ESS", {
    x: 0.5, y: 2.5, w: 8.5, h: 1,
    fontSize: 54, bold: true, color: colors.brandPrimary, fontFace: "Arial"
});
slide.addText("Intelligent Distributed Energy Storage Management", {
    x: 0.5, y: 3.5, w: 9, h: 0.5,
    fontSize: 24, color: colors.textSecondary, fontFace: "Arial"
});
slide.addText("Manta VPP Platform", {
    x: 0.5, y: 4.5, w: 5, h: 0.5,
    fontSize: 18, color: colors.textSecondary, fontFace: "Arial"
});

// Agenda
slide = pres.addSlide();
slide.addText("Agenda", { x: 0.5, y: 0.5, fontSize: 32, bold: true, color: colors.brandPrimary });
slide.addText([
    { text: "1. Market Challenge", options: { breakLine: true } },
    { text: "2. Manta PV ESS Solution", options: { breakLine: true } },
    { text: "3. Key Features & Capabilities", options: { breakLine: true } },
    { text: "4. Technical Architecture", options: { breakLine: true } },
    { text: "5. Business Value & ROI", options: { breakLine: true } },
    { text: "6. Future Roadmap", options: { breakLine: true } }
], { x: 1, y: 1.5, w: 8, h: 4, fontSize: 20, color: colors.textPrimary, bullet: true, lineSpacing: 40 });

// Market Challenge
slide = pres.addSlide();
slide.addText("The Challenge: Fragmented Energy Assets", { x: 0.5, y: 0.5, fontSize: 32, bold: true, color: colors.brandPrimary });
slide.addText("As distributed energy resources (DERs) grow, grid operators face:", { x: 0.5, y: 1.5, fontSize: 18, color: colors.textSecondary });
slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 2.5, w: 2.8, h: 3, fill: { color: "FFFFFF" }, line: { color: colors.border } });
slide.addText("Visibility Gap", { x: 0.6, y: 2.6, fontSize: 16, bold: true, color: colors.brandPrimary });
slide.addText("Unable to see real-time status of thousands of small batteries.", { x: 0.6, y: 3.0, w: 2.6, fontSize: 14 });

slide.addShape(pres.ShapeType.rect, { x: 3.6, y: 2.5, w: 2.8, h: 3, fill: { color: "FFFFFF" }, line: { color: colors.border } });
slide.addText("Control Complexity", { x: 3.7, y: 2.6, fontSize: 16, bold: true, color: colors.brandPrimary });
slide.addText("Difficult to coordinate charging/discharging for VPP events.", { x: 3.7, y: 3.0, w: 2.6, fontSize: 14 });

slide.addShape(pres.ShapeType.rect, { x: 6.7, y: 2.5, w: 2.8, h: 3, fill: { color: "FFFFFF" }, line: { color: colors.border } });
slide.addText("Data Silos", { x: 6.8, y: 2.6, fontSize: 16, bold: true, color: colors.brandPrimary });
slide.addText("Disparate protocols from different manufacturers (Tesla, Sungrow, BYD).", { x: 6.8, y: 3.0, w: 2.6, fontSize: 14 });

// Solution Overview
slide = pres.addSlide();
slide.addText("The Solution: Manta PV ESS", { x: 0.5, y: 0.5, fontSize: 32, bold: true, color: colors.brandPrimary });
slide.addText("A unified management layer connecting assets to the market.", { x: 0.5, y: 1.5, fontSize: 18, color: colors.textSecondary });
slide.addShape(pres.ShapeType.roundRect, { x: 2, y: 2.5, w: 6, h: 3, fill: { color: colors.surfaceAlt }, line: { color: colors.brandPrimary } });
slide.addText("PV ESS Core Module", { x: 2.5, y: 3.5, w: 5, fontSize: 24, align: "center", bold: true, color: colors.brandPrimary });
slide.addText("Monitor • Analyze • Optimize", { x: 2.5, y: 4.2, w: 5, fontSize: 16, align: "center", color: colors.textSecondary });

// Key Feature 1: Monitoring
slide = pres.addSlide();
slide.addText("Real-time Fleet Monitoring", { x: 0.5, y: 0.5, fontSize: 32, bold: true, color: colors.brandPrimary });
slide.addText([
    { text: "Instant visibility into fleet health:", options: { breakLine: true } },
    { text: "Online / Offline / Disconnected status tracking", options: { breakLine: true } },
    { text: "Aggregated Rated Power & Capacity metrics", options: { breakLine: true } },
    { text: "Global search by SN, NMI, or VPP Name", options: { breakLine: true } }
], { x: 0.5, y: 1.5, w: 5, h: 4, fontSize: 16, color: colors.textPrimary, bullet: true });
slide.addShape(pres.ShapeType.rect, { x: 6, y: 1.5, w: 6, h: 4, fill: { color: "EEEEEE" } });
slide.addText("[Dashboard Screenshot Placeholder]", { x: 6, y: 3.5, w: 6, align: "center", color: "999999" });

// Key Feature 2: Topology
slide = pres.addSlide();
slide.addText("Deep Dive: Energy Topology", { x: 0.5, y: 0.5, fontSize: 32, bold: true, color: colors.brandPrimary });
slide.addText("Visualize energy flow from PV to Grid.", { x: 0.5, y: 1.2, fontSize: 18, color: colors.textSecondary });
slide.addText([
    { text: "Dynamic animation of DC/AC flows", options: { breakLine: true } },
    { text: "Visualizes PV generation, Battery charging/discharging, and Inverter conversion", options: { breakLine: true } },
    { text: "Crucial for O&M diagnosis and efficiency analysis", options: { breakLine: true } }
], { x: 0.5, y: 1.8, w: 5, h: 3, fontSize: 16, color: colors.textPrimary, bullet: true });
slide.addShape(pres.ShapeType.rect, { x: 6, y: 1.8, w: 6, h: 3.5, fill: { color: "EEEEEE" } });
slide.addText("[Topology Diagram Placeholder]", { x: 6, y: 3.5, w: 6, align: "center", color: "999999" });

// User Personas
slide = pres.addSlide();
slide.addText("Empowering Key Stakeholders", { x: 0.5, y: 0.5, fontSize: 32, bold: true, color: colors.brandPrimary });
slide.addTable([
    [{ text: "Role", options: { bold: true, fill: colors.brandPrimary, color: "FFFFFF" } }, { text: "Pain Point", options: { bold: true, fill: colors.brandPrimary, color: "FFFFFF" } }, { text: "PV ESS Benefit", options: { bold: true, fill: colors.brandPrimary, color: "FFFFFF" } }],
    ["Asset Manager", "Unknown device faults", "Instant alerts on connection loss"],
    ["O&M Engineer", "Complex remote diagnosis", "Visual topology of energy flows"],
    ["Energy Trader", "Uncertain capacity availability", "Real-time aggregated SOC data"]
], { x: 0.5, y: 1.5, w: 9, fontSize: 14, border: { color: colors.border } });

// Architecture
slide = pres.addSlide();
slide.addText("Technical Architecture", { x: 0.5, y: 0.5, fontSize: 32, bold: true, color: colors.brandPrimary });
slide.addText([
    { text: "Frontend: Modern Web (React/Vanilla JS)", options: { breakLine: true } },
    { text: "Performance: Handles 10,000+ devices with sub-second rendering", options: { breakLine: true } },
    { text: "Compatibility: Responsive design for Desktop, Tablet, and Mobile", options: { breakLine: true } },
    { text: "Security: Role-based access control (RBAC) and data masking", options: { breakLine: true } }
], { x: 0.5, y: 1.5, w: 9, h: 4, fontSize: 18, color: colors.textPrimary, bullet: true });

// Business Value
slide = pres.addSlide();
slide.addText("Business Value & ROI", { x: 0.5, y: 0.5, fontSize: 32, bold: true, color: colors.brandPrimary });
slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 1.5, w: 4, h: 4, fill: { color: colors.surfaceAlt } });
slide.addText("Operational Efficiency", { x: 0.7, y: 1.8, fontSize: 20, bold: true, color: colors.brandPrimary });
slide.addText("Reduce truck rolls by 30% via remote diagnosis.", { x: 0.7, y: 2.5, w: 3.5, fontSize: 16 });

slide.addShape(pres.ShapeType.rect, { x: 5, y: 1.5, w: 4, h: 4, fill: { color: colors.surfaceAlt } });
slide.addText("Revenue Maximization", { x: 5.2, y: 1.8, fontSize: 20, bold: true, color: colors.brandPrimary });
slide.addText("Improve VPP trading yield by 15% with accurate SOC data.", { x: 5.2, y: 2.5, w: 3.5, fontSize: 16 });

// Roadmap
slide = pres.addSlide();
slide.addText("Product Roadmap", { x: 0.5, y: 0.5, fontSize: 32, bold: true, color: colors.brandPrimary });
slide.addShape(pres.ShapeType.line, { x: 1, y: 3, w: 8, h: 0, line: { color: colors.brandPrimary, width: 3 } });
slide.addText("Q1 2026", { x: 1, y: 2.5, fontSize: 16, bold: true });
slide.addText("Basic Monitoring", { x: 1, y: 3.2, fontSize: 14 });

slide.addText("Q2 2026", { x: 3.5, y: 2.5, fontSize: 16, bold: true });
slide.addText("Topology & VPP V1", { x: 3.5, y: 3.2, fontSize: 14 });

slide.addText("Q3 2026", { x: 6, y: 2.5, fontSize: 16, bold: true });
slide.addText("AI Forecasting", { x: 6, y: 3.2, fontSize: 14 });

slide.addText("Q4 2026", { x: 8.5, y: 2.5, fontSize: 16, bold: true });
slide.addText("Auto-Trading", { x: 8.5, y: 3.2, fontSize: 14 });

// Team (Placeholder)
slide = pres.addSlide();
slide.addText("Our Team", { x: 0.5, y: 0.5, fontSize: 32, bold: true, color: colors.brandPrimary });
slide.addText("Experts in Energy, AI, and Software Engineering", { x: 0.5, y: 1.5, fontSize: 18, color: colors.textSecondary });
slide.addText("[Team Photos Placeholder]", { x: 0.5, y: 2.5, fontSize: 16, color: "999999" });

// Contact
slide = pres.addSlide();
slide.background = { color: colors.brandPrimary };
slide.addText("Thank You", { x: 3, y: 2, w: 4, h: 1, fontSize: 48, align: "center", color: "FFFFFF", bold: true });
slide.addText("Contact us for a demo", { x: 3, y: 3, w: 4, h: 0.5, fontSize: 24, align: "center", color: "FFFFFF" });
slide.addText("info@mantaweb.com", { x: 3, y: 3.5, w: 4, h: 0.5, fontSize: 20, align: "center", color: "FFFFFF" });

// Save
pres.writeFile({ fileName: "marketing_materials/PV_ESS_Marketing_Presentation.pptx" })
    .then(fileName => {
        console.log(`Created file: ${fileName}`);
    });
