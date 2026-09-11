/* ==========================================================================
   Balaxi HR Enterprise Core Engine — Multi-Role & Interactive State
   ========================================================================== */

const USERS = {
  hr: {
    email: "hr@balaxipharma.in",
    password: "HR@12345",
    role: "HR",
    name: "Ananya Rao",
    title: "HR Director",
    department: "People Operations",
    id: "EMP-0012",
    avatar: "../assets/avatar.svg"
  },
  manager: {
    email: "manager@balaxipharma.in",
    password: "Manager@123",
    role: "Manager",
    name: "Rohan Mehta",
    title: "QA & Formulations Lead",
    department: "Operations",
    id: "EMP-1004",
    avatar: "../assets/avatar.svg"
  },
  employee: {
    email: "employee@balaxipharma.in",
    password: "Employee@123",
    role: "Employee",
    name: "Vijay Harde",
    title: "Lead Formulations Scientist",
    department: "R&D Operations",
    id: "EMP-1024",
    avatar: "../assets/avatar.svg"
  }
};

const PAGES = {
  hr: [
    "dashboard",
    "employees",
    "employee-add",
    "organization",
    "approvals",
    "attendance",
    "leave",
    "payroll",
    "documents",
    "reports",
    "offboarding",
    "holidays",
    "audit-logs",
    "administration"
  ],
  manager: [
    "dashboard",
    "team",
    "approvals",
    "attendance",
    "leave",
    "reports",
    "holidays",
    "organization"
  ],
  employee: [
    "dashboard",
    "profile",
    "attendance",
    "leave",
    "payslips",
    "documents",
    "holidays"
  ]
};

const LABELS = {
  dashboard: "Dashboard",
  employees: "Employee Directory",
  "employee-add": "Add Employee",
  organization: "Org Structure",
  approvals: "Approvals Hub",
  team: "My Team",
  profile: "My Profile",
  documents: "Documents Vault",
  attendance: "Attendance & Time",
  leave: "Leave & Time Off",
  payroll: "Payroll Processing",
  payslips: "My Payslips",
  reports: "Reports & Analytics",
  offboarding: "Offboarding & Exits",
  holidays: "Holiday Calendar",
  "audit-logs": "Audit Trail",
  administration: "System Settings"
};

const ICONS = {
  dashboard: "⌂",
  employees: "👥",
  "employee-add": "＋",
  organization: "🏛",
  approvals: "✓",
  team: "👥",
  profile: "👤",
  documents: "📁",
  attendance: "⏱",
  leave: "📅",
  payroll: "💳",
  payslips: "📄",
  reports: "📊",
  offboarding: "🚪",
  holidays: "🎉",
  "audit-logs": "🛡",
  administration: "⚙"
};

const BADGES = {
  approvals: "3",
  documents: "1"
};

const NOTIFICATIONS = [
  { id: 1, type: "approval", title: "Leave Request Submitted", desc: "Vijay Harde applied for 3 days Annual Leave (21–23 Sep)", time: "10 mins ago", unread: true, icon: "📅", bg: "var(--accent-light)" },
  { id: 2, type: "alert", title: "Document Expiring Soon", desc: "Work Permit for Vijay Harde expires in 9 days (18 Sep 2026)", time: "1 hour ago", unread: true, icon: "⚠️", bg: "var(--warning-light)" },
  { id: 3, type: "payroll", title: "Payroll Period Ready for Review", desc: "August 2026 payroll batch is prepared for HR locking", time: "3 hours ago", unread: true, icon: "💳", bg: "var(--info-light)" },
  { id: 4, type: "system", title: "Attendance Regularization Approved", desc: "Manager Rohan Mehta approved 07 Sep check-in adjustment", time: "Yesterday", unread: false, icon: "⏱", bg: "var(--success-light)" }
];

function currentUser() {
  try {
    const raw = localStorage.getItem("hrmUser");
    if (!raw) return USERS.employee;
    return JSON.parse(raw);
  } catch (e) {
    return USERS.employee;
  }
}

function page() {
  return document.body.dataset.page || "dashboard";
}

function go(p) {
  location.href = `${p}.html`;
}

function switchRole(roleKey) {
  const user = USERS[roleKey];
  if (!user) return;
  localStorage.setItem("hrmUser", JSON.stringify(user));
  toast(`Switched role to ${user.role} (${user.name})`);
  
  // If current page is allowed for this role, reload; otherwise redirect to dashboard
  const allowed = PAGES[roleKey] || [];
  if (allowed.includes(page())) {
    setTimeout(() => location.reload(), 400);
  } else {
    setTimeout(() => location.href = "dashboard.html", 400);
  }
}

function requireAuth() {
  const u = currentUser();
  if (!u) {
    location.href = "../index.html";
    return false;
  }
  const roleKey = u.role.toLowerCase();
  const allowed = PAGES[roleKey] || [];
  
  if (!allowed.includes(page())) {
    // If accessing a non-permitted page, route to dashboard
    location.href = "dashboard.html";
    return false;
  }
  
  // Populate user data
  document.querySelectorAll("[data-user]").forEach(e => e.textContent = u.name);
  document.querySelectorAll("[data-role]").forEach(e => e.textContent = u.role);
  document.querySelectorAll("[data-user-title]").forEach(e => e.textContent = u.title || u.role);
  document.querySelectorAll("[data-user-id]").forEach(e => e.textContent = u.id || "EMP-1024");
  
  return true;
}

function logout() {
  localStorage.removeItem("hrmUser");
  location.href = "../index.html";
}

function toast(msg, type = "success") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  container.appendChild(t);
  
  setTimeout(() => {
    t.style.opacity = "0";
    t.style.transform = "translateY(10px)";
    t.style.transition = "all 0.3s ease";
    setTimeout(() => t.remove(), 300);
  }, 3000);
}

function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add("open");
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove("open");
}

function toggleDrawer(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle("open");
}

function showRoleUI() {
  const u = currentUser();
  if (!u) return;
  const role = u.role.toLowerCase();
  
  document.querySelectorAll(".role-dashboard").forEach(x => x.style.display = "none");
  document.querySelectorAll(`.role-dashboard.role-${role}`).forEach(x => x.style.display = "block");
  
  document.querySelectorAll(".role-manager, .role-hr, .role-employee").forEach(x => {
    if (!x.classList.contains("role-dashboard")) {
      x.style.display = "none";
    }
  });
  
  document.querySelectorAll(`.role-${role}`).forEach(x => {
    if (!x.classList.contains("role-dashboard")) {
      if (x.tagName === "TR" || x.tagName === "TD" || x.tagName === "TH") {
        x.style.display = "";
      } else {
        x.style.display = "block";
      }
    }
  });
}

function buildHeader() {
  const u = currentUser();
  const currentRole = u.role.toLowerCase();
  
  // Render Role Switcher
  const switcherHtml = `
    <div class="role-switcher" title="Switch role to preview different views">
      <button class="role-switcher-btn employee ${currentRole === 'employee' ? 'active' : ''}" onclick="switchRole('employee')">Employee</button>
      <button class="role-switcher-btn manager ${currentRole === 'manager' ? 'active' : ''}" onclick="switchRole('manager')">Manager</button>
      <button class="role-switcher-btn hr ${currentRole === 'hr' ? 'active' : ''}" onclick="switchRole('hr')">HR Admin</button>
    </div>
  `;
  
  // Render notification bell with unread indicator
  const notifBellHtml = `
    <div class="icon-btn-badge" onclick="toggleDrawer('notifDrawer')" title="Notifications">
      🔔
      <span class="badge-dot"></span>
    </div>
  `;
  
  const rightContainer = document.querySelector(".header-right");
  if (rightContainer) {
    // Inject role switcher and notif bell before user chip
    const userChip = rightContainer.querySelector(".user-chip");
    const existingSwitcher = rightContainer.querySelector(".role-switcher");
    if (!existingSwitcher) {
      const temp = document.createElement("div");
      temp.style.display = "flex";
      temp.style.alignItems = "center";
      temp.style.gap = "12px";
      temp.innerHTML = switcherHtml + notifBellHtml;
      rightContainer.insertBefore(temp, userChip);
    }
  }
}

function buildDrawer() {
  let drawer = document.getElementById("notifDrawer");
  if (!drawer) {
    drawer = document.createElement("div");
    drawer.id = "notifDrawer";
    drawer.className = "drawer-backdrop";
    drawer.onclick = (e) => { if (e.target === drawer) drawer.classList.remove("open"); };
    
    drawer.innerHTML = `
      <div class="drawer">
        <div class="drawer-head">
          <div>
            <h3 style="font-size:16px;font-weight:800">Notifications</h3>
            <span class="muted" style="font-size:11.5px">3 unread notifications</span>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn sm" onclick="toast('All notifications marked as read');document.querySelectorAll('.notification-item.unread').forEach(e=>e.classList.remove('unread'))">Mark read</button>
            <button class="icon-btn" onclick="toggleDrawer('notifDrawer')">×</button>
          </div>
        </div>
        <div class="drawer-body">
          ${NOTIFICATIONS.map(n => `
            <div class="notification-item ${n.unread ? 'unread' : ''}" onclick="toast('${n.title} details')">
              <div class="notif-icon" style="background:${n.bg}">${n.icon}</div>
              <div class="notif-body">
                <b>${n.title}</b>
                <p>${n.desc}</p>
                <small>${n.time}</small>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    document.body.appendChild(drawer);
  }
}

function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  if (!sidebar) return;
  if (window.innerWidth <= 768) {
    sidebar.classList.toggle("open");
  } else {
    sidebar.classList.toggle("collapsed");
    const isCollapsed = sidebar.classList.contains("collapsed");
    localStorage.setItem("hrmSidebarCollapsed", isCollapsed ? "true" : "false");
    toast(isCollapsed ? "Sidebar collapsed (Icon mode)" : "Sidebar expanded");
  }
}

function renderSidebar() {
  const u = currentUser();
  if (!u) return;
  const items = PAGES[u.role.toLowerCase()] || [];
  const sidebar = document.querySelector(".sidebar");
  if (!sidebar) return;

  // Restore collapsed preference on desktop
  if (window.innerWidth > 768 && localStorage.getItem("hrmSidebarCollapsed") === "true") {
    sidebar.classList.add("collapsed");
  }

  // Inject sidebar header with toggle button if not already present
  let sidebarHeader = sidebar.querySelector(".sidebar-header");
  if (!sidebarHeader) {
    sidebarHeader = document.createElement("div");
    sidebarHeader.className = "sidebar-header";
    sidebarHeader.innerHTML = `
      <span class="nav-label sidebar-nav-title" style="margin-bottom:0;padding:0">Workspace Menu</span>
      <button class="sidebar-toggle-btn" onclick="toggleSidebar()" title="Collapse / Expand Menu">◀</button>
    `;
    sidebar.insertBefore(sidebarHeader, sidebar.firstChild);
  }

  const nav = document.querySelector("#nav");
  if (nav) {
    nav.innerHTML = items.map(p => {
      const isCurrent = page() === p;
      const badge = BADGES[p] ? `<span class="nav-badge">${BADGES[p]}</span>` : '';
      return `
        <a href="${p}.html" class="${isCurrent ? 'active' : ''}" data-title="${LABELS[p]}">
          <span class="icon">${ICONS[p] || "•"}</span>
          <span>${LABELS[p]}</span>
          ${badge}
        </a>
      `;
    }).join("");
  }
  
  document.querySelectorAll("#mobileMenu, .header-menu-toggle").forEach(btn => {
    btn.onclick = toggleSidebar;
  });
  
  document.querySelector("#logout")?.addEventListener("click", logout);
}

function initProfileTabs() {
  document.querySelectorAll("#profileTabs [data-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#profileTabs [data-tab]").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("tab-" + btn.dataset.tab)?.classList.add("active");
    });
  });
}

function initAttendanceClock() {
  const clockTimer = document.querySelector(".clock-timer");
  if (clockTimer) {
    let now = new Date();
    function tick() {
      now = new Date();
      let hrs = String(now.getHours()).padStart(2, '0');
      let mins = String(now.getMinutes()).padStart(2, '0');
      let secs = String(now.getSeconds()).padStart(2, '0');
      clockTimer.innerHTML = `${hrs}:${mins} <span style="font-size:20px;opacity:0.8">${secs}</span>`;
    }
    tick();
    setInterval(tick, 1000);
  }
}

function setupTableSearch() {
  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const val = e.target.value.toLowerCase().trim();
      const rows = document.querySelectorAll(".table tbody tr");
      rows.forEach(r => {
        const text = r.textContent.toLowerCase();
        r.style.display = text.includes(val) ? "" : "none";
      });
    });
  }
}

function showSelectedFile(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  const preview = document.getElementById("filePreview");
  const name = document.getElementById("fileName");
  const size = document.getElementById("fileSize");
  if (preview) {
    preview.classList.add("show");
    if (name) name.textContent = file.name;
    if (size) size.textContent = (file.size / 1024 / 1024).toFixed(2) + " MB";
  }
}

// Global initialization
document.addEventListener("DOMContentLoaded", () => {
  if (page() !== "login") {
    if (!requireAuth()) return;
    renderSidebar();
    buildHeader();
    buildDrawer();
    showRoleUI();
    initProfileTabs();
    initAttendanceClock();
    setupTableSearch();
    
    // Close modal on click backdrop or escape
    document.querySelectorAll(".modal-backdrop").forEach(m => {
      m.addEventListener("click", e => {
        if (e.target === m) m.classList.remove("open");
      });
    });
    
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-backdrop.open, .drawer-backdrop.open").forEach(m => m.classList.remove("open"));
      }
    });
  }
});
