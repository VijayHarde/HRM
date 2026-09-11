# Balaxi HR — Enterprise HRM Prototype v5.0

Modern, high-performance Human Resource Management Portal prototype for **Balaxi Pharmaceuticals Limited** with trending UI/UX aesthetics, multi-role RBAC persona switching, micro-animations, and complete business workflow coverage.

---

## 🌟 Trending UI/UX Features & Design System
- **Typography & Aesthetics**: Google Font *Plus Jakarta Sans*, sleek glassmorphism top navigation (`backdrop-filter: blur(14px)`), luminous gradient card surfaces, outlined floating input labels, and elevation shadows.
- **Micro-Animations**: Smooth page transitions (`fadeInUp`), pulsing live indicators, animated SVG charts, and interactive progress rings.
- **Universal Top-Bar Role Switcher**: Instant switching between **Employee (Vijay Harde)**, **Manager (Rohan Mehta)**, and **HR Admin (Ananya Rao)** personas.
- **Slide-Out Notification Drawer**: Real-time notification tray with category filtering, unread badge counters, and action links.
- **Interactive Modals & Tools**: Live punch clock with ticking timer, leave deduction business-day calculator, 6-step payroll engine lifecycle, drag & drop document upload with live file preview, and real-time table search filters.

---

## 🎯 Role-Based Access Matrix & Test Credentials

The prototype features a 1-click credential selector and persona switcher on the sign-in screen, enabling live testing across all organizational tiers:

| Persona | Demo Credentials | Primary Functional Scope & Navigation |
|---|---|---|
| **HR Administrator**<br>*(Ananya Rao)* | `hr@balaxipharma.in`<br>`HR@12345` | Full domain administration: Employee Directory & 4-Stage Onboarding, Organization Hierarchy, Approvals Hub, Attendance, Leave, 6-Step Payroll Engine, Document Vault, Analytics Reports, Offboarding & Exit Clearances, Holiday Calendar, Audit Trail & System Settings. |
| **Team Manager**<br>*(Rohan Mehta)* | `manager@balaxipharma.in`<br>`Manager@123` | Team-scoped management: Team Presence Hub, Unified Approvals (Leave, Punch corrections, Documents), Team Attendance Timesheets, Team Leave Schedules, Team Analytics Reports, Organization Chart, and Holidays. |
| **Employee**<br>*(Vijay Harde)* | `employee@balaxipharma.in`<br>`Employee@123` | Self-service portal: Executive Dashboard with Live Clock In/Out, Profile & Banking (5 tabs), My Attendance & Regularizations, My Leave & Quotas, My Payslips (Official Printable PDF statements), My Documents Vault, and Holiday Calendar. |

---

## 📄 Complete Pages Directory (18 Screens)

1. `index.html` — Modern Split-Screen Login with 1-Click Persona Selectors
2. `pages/dashboard.html` — Role-Aware Executive Dashboard (Employee / Manager / HR)
3. `pages/attendance.html` — Live Web Clock In/Out, Monthly Calendar Heatmap, Regularizations
4. `pages/leave.html` — Leave Quota Breakdown, Working Days Calculator & Applications
5. `pages/approvals.html` — Unified Approvals Hub for Managers and HR (Leave, Attendance, Documents)
6. `pages/employees.html` — Employee Directory with Live Search and Department/Status Filters
7. `pages/employee-add.html` — 4-Stage Interactive Talent Onboarding Wizard
8. `pages/organization.html` — Interactive Organizational Hierarchy Tree, Departments & Hubs
9. `pages/payroll.html` — 6-Stage Payroll Processing Pipeline with Statutory Deductions & Publishing
10. `pages/payslips.html` — Employee Salary Statement Viewer & Downloadable PDF Payslip Modal
11. `pages/documents.html` — Drag-and-Drop Document Vault with Expiry Countdown & Verification Badges
12. `pages/reports.html` — Visual Workforce Analytics, Growth Trends & Operational Reports Catalog
13. `pages/team.html` — Manager Team Portal with Real-Time Presence & 1:1 Check-in Notes
14. `pages/offboarding.html` — Employee Separation & Clearance Workflow Manager
15. `pages/holidays.html` — 2026 Company Holiday Calendar with Outlook Sync & Countdown
16. `pages/audit-logs.html` — Immutable Security & Compliance Audit Ledger with JSON Payload Viewer
17. `pages/notifications.html` — Dedicated Notification Center with Category Filters
18. `pages/profile.html` — 5-Tab Employee Profile (Personal, Job, Emergency, Experience, Banking)
