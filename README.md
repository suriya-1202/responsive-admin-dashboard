# NexusPulse • Enterprise Admin Dashboard

A clean, solid-color, high-performance, and responsive **Enterprise Admin Dashboard** built with **React.js, HTML5, and CSS3**.

Designed with **Stripe / AWS / Linear-grade enterprise aesthetics**:
- **Pure, professional Light Theme** (zero dark mode).
- **Solid, authoritative color palette** (zero tacky gradients).
- **100% Vector Profile Icons** (zero external photos/broken links).
- **Pixel-perfect Collapsible Sidebar** (zero footer clipping/overflow in collapsed mode).
- **Advanced Executive Settings Panel** (custom switch toggles, active sessions, API keys).
- **Responsive Layout** (Desktop, Tablet, Mobile).
- **Dynamic timeframe analytics** ('7D', '30D', '90D', '1Y').
- **Interactive SVG metrics and charts**.
- **12-record table** with multi-field search, status filtering, sorting, bulk actions, pagination, and real CSV download.

---

## 🌟 Requirements & Features Matrix

| Requirement | Implementation Details | Status |
| :--- | :--- | :---: |
| **Pure Professional Light Mode** | Dark mode removed. Pristine `#ffffff` card containers on a subtle `#f8fafc` enterprise slate background. | ✅ |
| **Solid Colors (No Gradients)** | Replaced all gradients with solid, authoritative enterprise colors (`#2563eb`, `#0f172a`, `#16a34a`, `#d97706`, `#dc2626`). | ✅ |
| **100% Vector Profile Icons** | Replaced all stock photos with clean, solid SVG profile icon containers (`.user-avatar-icon-box`, `.profile-avatar-icon`, `.customer-avatar-box`). | ✅ |
| **Flawless Collapsed Sidebar** | Fixed footer clipping: in collapsed mode, the user pill is hidden and the collapse toggle button is mathematically centered with zero overflow. | ✅ |
| **Sidebar Navigation Links** | Core navigation with links to **Dashboard**, **Users** (with badge), **Reports** (with badge), and **Settings**, plus API quota indicator. | ✅ |
| **Header with Search & Profile** | Instant search bar (`⌘K` shortcut), notifications bell with unread badge/dropdown, and profile pill with dropdown menu. | ✅ |
| **At Least 4 Summary Cards** | **Total Users**, **Total Revenue**, **Total Orders**, and **Growth Rate** with dynamic metrics, trend pills, subtext, and solid mini SVG sparklines. | ✅ |
| **Data Table with 10+ Records** | 12 detailed enterprise transactions with multi-field filtering, column sorting, solid status badges, row checkboxes, bulk actions, and pagination. | ✅ |
| **Responsive Layout** | Pixel-perfect layout tailored for **Desktop** (1280px+), **Tablet** (768px - 1199px), and **Mobile** (< 768px). | ✅ |
| **Advanced Executive Settings** | Modern switch toggles for 2FA, detailed active device sessions, and production API key management. | ✅ |

---

## 🚀 How to Run & Preview

### Option 1: Live Development Server (Vite)

In your terminal:
```powershell
cd c:\Users\suriy\OneDrive\Desktop\ASSESSEMNT
npm run dev
```
Open **`http://localhost:3000`** in your browser.

---

### Option 2: Instant Standalone Preview (No Server Required)

Double-click or open [**`preview.html`**](file:///c:/Users/suriy/OneDrive/Desktop/ASSESSEMNT/preview.html) directly in Google Chrome, Microsoft Edge, or any modern web browser to interact with the full dashboard immediately.

---

### Option 3: Production Build & Preview

```powershell
npm run build
npm run preview
```
