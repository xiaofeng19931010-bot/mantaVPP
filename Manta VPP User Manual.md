# Manta VPP User Manual

## 1. Introduction

**Manta VPP** (Virtual Power Plant) is an intelligent virtual power plant management platform designed to aggregate Distributed Energy Resources (DERs) and participate in electricity market trading. Through a unified semantic model and a plug-and-play driver framework, the system achieves rapid access, monitoring, and intelligent dispatch of devices such as photovoltaics and energy storage.

This manual will guide you on how to log in to the system, manage devices, view reports, and monitor market trading data.

## 2. Quick Start

### 2.1 Login

1.  **URL**: Open your browser and visit [Manta VPP Platform](https://mantaweb.vercel.app/index.html).
2.  **Enter Credentials**:
    *   **Email**: Enter your registered email (e.g., `liam.liu@client.com.au`)
    *   **Password**: Enter your login password
3.  **Login**: Click the "Login" button to enter the system.

> **Note**: If you forget your password, please contact the system administrator to reset it.

### 2.2 Interface Overview

After logging in successfully, you will see the main system interface, which primarily includes the following areas:

*   **Sidebar**: The main entry point for system functions, including Overview, Spot Market, DER Management, System Settings, etc.
*   **Header**: Displays breadcrumb navigation, system time, notification center, and user avatar.
*   **Main Content**: Displays specific data and operation interfaces for the current functional module.

## 3. Core Features

### 3.1 VPP Management
Click **VPP Management** in the navigation bar to enter. This module is used to create and manage Virtual Power Plant instances.

*   **VPP List**:
    *   Supports switching between **Card View** and **List View**.
    *   **Filter**: Search by VPP name or filter by region (State).
    *   **Key Metrics**: Each VPP card displays the online/offline status of its subordinate devices, total rated power, PV capacity, and daily yield.
*   **Operation Path**:
    1.  **Create VPP**:
        *   Click the **"+"** button in the top right corner to open the creation sidebar.
        *   Fill in **VPP Name** (Required) and **Company** information.
        *   Select **Pricing Region** (e.g., NSW) and **Active Market** (Spot/FCAS).
        *   Click **Submit** to complete creation.
    2.  **View Details**: Click any VPP card or the eye icon in the list to enter the details page.
    3.  **Edit/Delete**: Hover over the top right corner of the card or the operation column in the list, and click the **Edit** (pen) or **Delete** (trash can) icon.

#### 3.1.1 VPP Details
Click the "View" icon in the VPP list or the VPP name to enter the details page.

*   **Header Overview**:
    *   **Basic Info**: Displays VPP name, affiliated company, region (State/Country), and current active market (Active Market).
    *   **Status Statistics**: Real-time display of the number of Online, Offline, and Disconnected DERs under this VPP.
    *   **Key Metrics**:
        *   **Rated Power**: Total rated power (kW).
        *   **PV Capacity**: PV installed capacity (kW).
        *   **Rated Capacity**: Total battery capacity (kWh).
        *   **Today Yield**: Daily yield (kWh).

*   **Function Tabs**:
    *   **DERs (Device List)**:
        *   **List Display**: Includes detailed fields such as status, SN, type, manufacturer, SOC, daily yield, etc.
        *   **Search & Filter**: Supports searching devices by keywords such as SN, manufacturer, type, etc.
        *   **Operation Path**:
            *   **Add Devices**:
                1. Click the **Add** button in the top right corner of the list to open the sidebar.
                2. Check the devices to be added in the list (supports searching by SN).
                3. Click **Confirm** to complete the addition.
            *   **View Device**: Click the **View** (eye) icon in the list to jump to the device details page.
            *   **Remove Device**: Click the **Remove** (trash can) icon in the list and confirm to remove the device from the current VPP.

### 3.2 DER Management
Click **DER Management** in the navigation bar to expand the submenu, containing **PV Plus ESS**, **Single PV**, and **Single ESS** modules, used for managing different types of distributed energy devices respectively.

#### 3.2.1 PV Plus ESS
Click **PV Plus ESS** to enter. This module is used to manage hybrid systems containing both photovoltaics and energy storage.

*   **Statistics Cards**:
    *   **Total Devices**: Total number of devices.
    *   **Status Breakdown**: Number of Online, Offline, and Disconnected devices.
    *   **Aggregated Capacity**: Aggregated Rated Power, PV Capacity, and Rated Capacity.
*   **Device List**:
    *   Displays Status, SN, Manufacturer, State, Rated Power, PV Capacity, Rated Capacity, SOC, etc.
    *   **Operation Path**:
        *   **View Details**: Click the **View** (eye) icon in the operation column to enter the device details page.
        *   **Assign VPP**:
            *   *Note*: VPP assignment for devices needs to be completed via the "Add Device" operation on the **VPP Management** -> **VPP Details** page. This list is primarily for viewing status.
*   **Device Details**:
    *   **Energy Topology**: Dynamically displays energy flow between PV, Battery, Inverter, Grid, and Load.
    *   **Component Details**: Displays detailed telemetry data for Inverter and Battery (e.g., power, SOC, voltage).
    *   **Operational Data**: Provides historical data chart analysis for generation, consumption, and self-consumption rate.

#### 3.2.2 Single PV
Click **Single PV** to enter. This module is used to manage devices with only photovoltaic generation systems.

*   **Features**:
    *   Focuses on monitoring PV generation data.
    *   **Topology**: Displays only PV Array, Inverter, Grid, and Load.
    *   **Key Metrics**: Focuses on PV Capacity and Today Yield.

#### 3.2.3 Single ESS
Click **Single ESS** to enter. This module is used to manage standalone battery energy storage systems.

*   **Features**:
    *   Focuses on battery charge/discharge and SOC management.
    *   **Topology**: Displays only Battery, Inverter, Grid, and Load.
    *   **Key Metrics**: Focuses on Rated Capacity and SOC (State of Charge).

### 3.3 Spot Market
Click **Spot Market** in the navigation bar to expand the submenu, containing **Spot Trading**, **Trading Rules**, and **Arbitrage Points** modules, providing real-time electricity spot market data monitoring, automated trading strategy configuration, and arbitrage opportunity analysis functions.

#### 3.3.1 Spot Trading
Click **Spot Trading** to enter. This module displays real-time price trends, key market indicators, and automatically triggered trading events.

*   **Top Controls & Stats**:
    *   **Pricing Region**: Switch pricing region (NSW, VIC, QLD, SA, TAS).
    *   **Time Mode**: Switch between **Real-time** or **Historical** mode.
    *   **Settings**: Overlay weather data (Weather) or arbitrage point signals (Arbitrage Point).
    *   **Key Metrics Bar**: Displays current Spot Price, Pre-Dispatch Price, Forecast Spot Price, Total Charge/Discharge Capacity, Trading Opportunities, and Estimated Revenue.
*   **Price Trend Chart**:
    *   **Curve Display**: Includes Spot Price (bar background), Pre-Dispatch Price (line), and Forecast Price (bar foreground).
    *   **Interaction**: Supports zooming, panning, full-screen viewing, and hovering to display detailed data (Tooltip).
    *   **Operation Path**:
        *   **Switch Time Mode**: Click top **Time Mode** to switch Real-time / Historical.
        *   **View Historical Data**: After selecting Historical mode, click the date picker to select a specific date.
        *   **Full Screen**: Click the **Full Screen Icon** in the top right of the chart to enlarge.
*   **Trading Events**:
    *   Records trading history automatically triggered by the system based on rules.
    *   **List Fields**: Date, VPP Name, Status, Pricing Region, Event (Charge/Discharge), Volume, Est. Revenue, etc.

#### 3.4.2 Trading Rules
Click **Trading Rules** to enter. This module is used to configure automated trading rules.

*   **Rules List**:
    *   Displays created trading strategy rules.
    *   **Fields**: Name, Trigger From (Price/Signal), Trigger Condition, Event, Status (Active/Inactive).
    *   **Operations**:
        *   **Create**: Create a new rule.
        *   **Edit**: Modify existing rule's trigger condition, status, or applicable VPP.
        *   **History**: View rule change history.
        *   **Delete**: Delete inactive rules.
*   **Create/Edit Rules**:
    *   **Operation Path**:
        1.  Click the **Create Rule** button in the top right or the **Edit** button on a list item.
        2.  **Basic Info**: Enter Name, select Pricing Region.
        3.  **Configure Trigger**:
            *   If **Price**: Set price threshold (e.g., > 300) and action (e.g., Discharge).
            *   If **Arbitrage Point**: Set signal condition (e.g., Signal by Spot = Discharge).
        4.  **Set Scope**: Select Applicable VPP and Ignore Time.
        5.  Click **Submit** to save the rule.
    *   **Field Description**:
        *   **Trigger From**: Select trigger source.
        *   **Name**: Rule name (Required).
        *   **Pricing Region**: Applicable region (NSW, VIC, QLD, SA, WA), default is NSW.
        *   **Description**: Detailed description of the rule.
    *   **Trigger Configuration**:
        *   **Trigger From**: Select trigger source.
            *   **Price**: Trigger based on price. Requires **Trigger Condition** (e.g., Spot Price > 300 $/MW) and **Event** (Charge/Discharge/Stop).
            *   **Arbitrage Point**: Trigger based on arbitrage signal. Requires **Trigger Condition** (e.g., Signal by Spot = Discharge). Such rules automatically execute the corresponding signal action.
    *   **Scope & Constraints**:
        *   **Status**: Active / Inactive.
        *   **Applicable VPP**: Select VPPs to apply this rule (supports multiple selection).
        *   **Ignore Time**: Set time periods when the rule does not apply for specific VPPs.
            *   Supports setting Start and End Time.
            *   Supports setting ignore frequency (Everyday, Weekly, Custom Date Range).

#### 3.3.3 Arbitrage Points
Click **Arbitrage Points** to enter. This module provides high-frequency (5-minute granularity) market arbitrage signal analysis to help users identify and verify trading strategies.

*   **Top Controls & Filters**:
    *   **Pricing Region**: Switch pricing region (NSW, VIC, QLD, SA, TAS).
    *   **Time Mode**:
        *   **Real-time**: Display real-time arbitrage signals for the current day and future periods.
        *   **Historical**: Query historical arbitrage point data by date range (Start Date - End Date).
    *   **Signal Filters**: Quickly filter different types of arbitrage signals.
        *   **Discharge**: Green indicator (Discharge signal).
        *   **Charge**: Blue indicator (Charge signal).
        *   **Normal**: Gray indicator (Normal price range).
        *   **Abnormal**: Red indicator (Abnormal signal).
    *   **Operation Path**:
        *   **Analyze Signals**: Switch to **Historical** mode, select a date, check **Discharge/Charge** filters to view high-revenue opportunities.

*   **Data Table**:
    *   **Time**: Settlement time point (5-minute interval).
    *   **Spot Price**: Real-time spot price ($/MW).
    *   **Forecast Spot**: Forecast spot price ($/MW).
    *   **Time / Forecast Spot**: Rolling forecast price sequence for the next four 5-minute periods.
    *   **Signal by Forecast**: Trading signal generated based on forecast price.
    *   **Signal by Spot**: Final trading signal confirmed based on actual spot price.
    *   **Pagination**: Supports switching rows per page (10/20/50/100) and page navigation.

### 3.4 Reports
Click **Reports** in the navigation bar to expand the submenu, containing **VPP Events** and **DER Events** modules, providing detailed event records and execution analysis reports from VPP aggregation level to device level.

#### 3.4.1 VPP Events
Click **VPP Events** to enter. This module displays dispatch events at the VPP aggregation level, supporting multi-dimensional filtering and export by time and status.

*   **Top Controls & Filters**:
    *   **Time Mode**:
        *   **Real-time**: Real-time mode, view dispatch events of the day.
        *   **Historical**: Historical mode, supports querying historical records by date range (Start Date - End Date).
    *   **Status Filter**: Filter by execution status (All / Completed / Executing / Partially Completed / Incompleted).
    *   **Search**: Supports fuzzy search by keywords like VPP Name, Event Type, etc.
    *   **Export**: Click the export button to export current filter results as Excel/CSV file.
*   **Data Table**:
    *   **Date**: Event date.
    *   **VPP**: VPP name.
    *   **Status**: Execution status (e.g., Completed, Executing).
    *   **Pricing Region**: Price region (e.g., NSW, VIC).
    *   **Event**: Event type (e.g., Charge, Discharge).
    *   **Time Range**: Event execution time period (Start Time - End Time).
    *   **Metrics**: Includes Participated Power, Est. Volume, Avg. Price, Est. Revenue.
    *   **Actions**: Click **View Details** (eye icon) to view device-level execution details associated with the event.

#### 3.4.2 DER Events
Click **DER Events** to enter. This module displays execution logs for specific devices (DER), used for troubleshooting single device response.

*   **Top Controls & Filters**:
    *   **Time Mode**: Supports **Real-time** and **Historical** mode switching.
    *   **Status Filter**: Filter by device execution status (All / Completed / Executing / Incompleted).
    *   **Search**: Supports searching by keywords like SN, VPP Name, Event Type, etc.
    *   **Export**: Supports exporting current filtered device-level event data.
*   **Data Table**:
    *   **Date**: Event occurrence date.
    *   **SN**: Device serial number.
    *   **VPP**: Affiliated VPP name.
    *   **Status**: Device execution status.
    *   **Pricing Region**: Located price region.
    *   **Trigger From**: Trigger source (User / Price / System).
    *   **Trigger Condition**: Trigger condition description.
    *   **Event**: Action type (Charge / Discharge).
    *   **Time Range**: Execution start and end time.
    *   **Metrics**: Includes Participated Power, Est. Volume, Avg. Price, Est. Revenue.

## 4. System Settings

### 4.1 DER Access
Click **System** -> **DER Access** in the navigation bar to enter. This module is used to manage connections with third-party cloud platforms or hardware gateways ("Access"), achieving centralized access and management of Distributed Energy Resources (DERs).

#### 4.1.1 Access List
The system displays all created connections in Card View by default.

*   **View Switch**: Click the toggle button in the top right to switch between **Card View** and **List View**.
*   **Access Card Info**:
    *   **Name**: Access name (i.e., data platform name).
    *   **Status**: Connection status.
        *   **Establishing** (Yellow): Connection is being established.
        *   **Established** (Green): Connection established, running normally.
        *   **Disconnected** (Red/Gray): Connection lost or network interruption.
        *   **Closed** (Gray): Connection manually closed.
        *   **Failed** (Red): Connection failed.
    *   **Statistics**: Displays total associated DERs, and number of Online/Offline devices.
*   **Filter & Search**:
    *   **Name**: Search Access by name keywords.
    *   **Type**: Filter access type (e.g., Cloud, SCADA, Edge).
    *   **Status**: Filter connection status (All, Opened, Closed).
*   **Operations**:
    *   **View Details**: Click card or list item to enter details page.
    *   **Edit**: Edit connection configuration (Limited to Failed status or specific configurations).
    *   **Close**: Disconnect (Limited to Established status).

#### 4.1.2 Create/Connect Access
Click the **Create** or **New** button in the top right to open the connection configuration sidebar.

1.  **Type**: Select access type (e.g., Cloud).
2.  **Manufacturer**: Select device manufacturer or data platform (e.g., Tesla, Sungrow).
3.  **Connection Mode**:
    *   **Create New**: Create a new connection.
    *   **Add Existing**: Add an existing connection.
4.  **Credentials**: Enter **AppKey** and **AppSecret** (Supports encrypted display/plaintext toggle and copy).
5.  Click **Submit** to complete creation. The system will automatically attempt to establish the connection, changing status from Establishing to Established.

#### 4.1.3 Access Details
Click **View** button on Access card or list to enter details page.

*   **Overview**:
    *   Displays Access basic info (Type, AppKey, AppSecret).
    *   Displays key statistics: DERs (Total), Online, Offline.
*   **Device List**:
    *   Displays detailed info of all associated devices under this Access.
    *   **Fields**: Status, SN, State.
    *   **Operations**: Supports searching device by SN, click **View** (eye icon) to jump to device details page.

#### 4.1.4 Close Access
For connections no longer needed, execute the close operation.

1.  Find the target Access in the list page.
2.  Click **Close** button (disconnect icon).
3.  Click **Confirm** in the popup dialog.
    *   *Note*: After closing Access, all devices under this connection will no longer be controlled by the Manta system.

### 4.2 Account
Click **System** -> **Account** in the navigation bar to enter. This module is used to manage platform user accounts, including creating new users, editing existing user info, and resetting passwords.

#### 4.2.1 User List
*   **Fields Included**:
    *   **User Name**: User name.
    *   **Email**: Login email.
    *   **Status**: Account status (Active/Inactive).
    *   **Login Count**: Login count statistics.
    *   **Last Login Time/IP**: Time and IP address of the last login.
    *   **Current Login IP**: IP address of the current session.
    *   **Create Time**: Account creation time.
*   **Search & Pagination**:
    *   Supports keyword search by **Email** or **User Name**.
    *   Supports customizing rows per page (10/20/50) and page navigation.

#### 4.2.2 Create User
1.  Click the **Create** button (or plus icon) above the list.
2.  Fill in user info in the sidebar:
    *   **First Name / Last Name**: Required.
    *   **Email**: Required, will be used as login account.
    *   **Status**: Default is Active.
    *   **Password / Confirmation**: Set initial login password.
3.  Click **Submit** to complete creation.

#### 4.2.3 Edit User
1.  Click the **Edit** icon (pen button) for the target user in the list.
2.  Supports modifying First Name, Last Name, Email, and Status.
3.  Click **Submit** to save changes.

#### 4.2.4 Change Password
1.  Click the **Key** icon (key button) for the target user in the list.
2.  Enter new password and confirm.
3.  Click **Submit** to complete reset.

## 6. Glossary

The table below summarizes key metrics and list fields appearing in the document, sorted by functional module.

| Module | Term | Description |
| :--- | :--- | :--- |
| **Common** | **Pricing Region** | Applicable pricing region (e.g., NSW, VIC, QLD, SA, TAS). |
| | **Date / Time** | Date and time when record was generated or event occurred. |
| | **Status** | Current status of object, e.g., Active/Inactive (Rule/User), Online/Offline (Device), Completed/Executing (Event). |
| | **Description** | Detailed text description of Rule, VPP, or Device. |
| | **Type** | Access type (Cloud/Edge) or device type (PV/ESS). |
| | **Time Mode** | Time dimension selection, Real-time or Historical. |
| **VPP Management** | **Name / VPP Name** | Name of the Virtual Power Plant instance. |
| | **Company** | Operating company or entity owning the VPP. |
| | **Active Market** | Electricity market type the VPP is currently participating in, e.g., Spot or FCAS. |
| | **Rated Power** | Total rated power of VPP (kW). |
| | **PV Capacity** | Total PV installed capacity of VPP (kW). |
| | **Rated Capacity** | Total battery capacity of VPP (kWh). |
| | **Today Yield** | Cumulative daily generation of VPP (kWh). |
| **DER Management** | **DER** | Distributed Energy Resource, generally refers to devices like PV, ESS. |
| | **SN (Serial Number)** | Unique serial number of the device. |
| | **Manufacturer** | Device manufacturer (e.g., Tesla, Sungrow). |
| | **Online / Offline / Disconnected** | Communication connection status of the device. |
| | **SOC (State of Charge)** | Remaining battery percentage (%). |
| | **Aggregated Capacity** | Aggregated total capacity metric. |
| | **Energy Topology** | Topology map showing energy flow, including PV, Battery, Grid, Load, etc. |
| | **Inverter** | Core device converting DC to AC. |
| **Spot Market** | **Spot Price** | Real-time electricity spot market price ($/MWh). |
| | **Forecast Spot** | Forecasted future electricity spot market price. |
| | **Avg. Price** | Average market price during transaction or event execution ($/MWh). |
| | **Est. Revenue** | Estimated economic revenue. |
| | **Est. Volume** | Estimated transaction or execution volume (MWh). |
| | **Volume** | Actual transaction or execution volume. |
| | **Trigger From** | Data source triggering the rule, e.g., Price or Arbitrage Point. |
| | **Trigger Condition** | Specific logic condition triggering rule execution (e.g., Price > 300). |
| | **Event** | Specific action triggered, e.g., Charge, Discharge, Stop. |
| | **Applicable VPP** | Scope of Virtual Power Plant instances applicable to the rule. |
| | **Ignore Time** | Time period set in rule configuration when the rule does not apply. |
| | **Signal by Forecast** | Trading signal generated based on forecast price. |
| | **Signal by Spot** | Trading signal generated based on real-time spot price. |
| **Reports** | **Participated Power** | Actual power value participating in response or transaction (kW/MW). |
| | **Time Range** | Start and end time period of event duration. |
| **System Settings** | **Connection Mode** | Access mode of device or platform, e.g., "Create New" or "Add Existing". |
| | **AppKey / AppSecret** | Authentication credentials for third-party API access. |
| | **Credentials** | Authentication info, usually refers to username/password or API key. |
| | **User Name** | Display name of system user. |
| | **Email** | User's login email account. |
| | **Login Count** | Cumulative count of user logins. |
| | **Last Login Time/IP** | Time and IP address of user's last login. |
| | **Current Login IP** | IP address of user's current session. |

---
*Version: v1.0 | Updated: 2026-03-13*
