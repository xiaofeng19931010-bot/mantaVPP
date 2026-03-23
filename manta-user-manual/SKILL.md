---
name: manta-user-manual
description: Provide comprehensive user guidance and domain knowledge for the Manta VPP (Virtual Power Plant) platform. Use this skill when users ask questions about how to use the Manta VPP system, need explanations of platform features (like VPP Management, DER Management, Spot Market, Reports, or System Settings), or require definitions of specific terms and metrics within the platform.
---

# Manta VPP User Manual Skill

This skill provides comprehensive user documentation and domain knowledge for the Manta VPP platform.

## Available Resources

The core knowledge is stored in the `references/` directory in both Chinese and English:

- **[Manta_VPP_User_Manual.md](references/Manta_VPP_User_Manual.md)**: The complete user manual in Chinese.
- **[Manta VPP User Manual.md](references/Manta VPP User Manual.md)**: The complete user manual in English.

## When and How to Use

When a user asks a question about the Manta VPP platform:

1. **Identify the Intent**: Determine if the user is asking a "how-to" question, looking for feature details, or needing a term defined.
2. **Consult the References**: Read the appropriate reference file based on the user's preferred language. Use grep or read specific sections if the question targets a known module (e.g., "Spot Market" or "DER Access").
3. **Provide Accurate Answers**: Base your answers strictly on the provided manuals. Do not invent features or workflows that are not documented.
4. **Use the Glossary**: If a user asks what a specific metric or term means (e.g., "What is Arbitrage Point?" or "What does SOC mean?"), refer to the Glossary section (Section 6) at the end of the manuals.

## Key Modules Covered

*   **VPP Management**: Creating, editing, and managing Virtual Power Plant instances and assigning devices.
*   **DER Management**: Managing PV Plus ESS, Single PV, and Single ESS devices, viewing topologies and metrics.
*   **Spot Market**: Monitoring real-time/historical prices, configuring trading rules (Price vs. Arbitrage Point triggers), and analyzing arbitrage signals.
*   **Reports**: Viewing and exporting VPP-level and DER-level execution events.
*   **System Settings**: Managing DER Access (cloud/gateway connections) and User Accounts.
