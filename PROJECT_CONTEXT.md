# Project Overview

This project is a highly polished, interactive portfolio website designed to mimic the Windows 11 desktop experience. It provides a multi-stage user flow (Lock Screen -> Login Screen -> Desktop) and fully functional OS-like window management, complete with a taskbar, start menu, and dynamic desktop icons to present portfolio content creatively.

# Tech Stack

- **Framework:** React 19.x with Vite 8.x
- **Language:** JavaScript
- **Styling:** Vanilla CSS (CSS Modules with GPU-accelerated animations, glassmorphism UI)
- **Tooling:** ESLint 9

# Folder Structure

- `/public`: Contains static assets (backgrounds, profile pictures, icons, PDF certificates).
- `/src`: Main application source code.
  - `/src/components`: Contains UI components organized by screens (e.g., `LockScreen/`, `LoginScreen/`, `DesktopScreen/`).
  - `/src/config`: Configuration files (e.g., `apps.js` for the App Registry).
  - `App.jsx`: The root component orchestrating state transitions (`lock`, `login`, `loading`, `desktop`).

# Architecture & Systems

- **App Registry (`apps.js`)**: A centralized source of truth defining all apps.
  - Apps support `window` (renders an interactive window) and `link` (executes external actions like opening LinkedIn or Gmail) types.
- **Window Management System**: Centralized state within `DesktopScreen.jsx` tracking open windows (`isOpen`, `isMinimized`, `isFullscreen`, `isActive`, `zIndex`).
  - **Lifecycle**: Windows are fully unmounted from the DOM when closed. Minimizing a window hides it but keeps it mounted. Fullscreen toggle allows windows to snap to full desktop bounds (no resize support).
  - **Draggable**: Windows are draggable via the title bar with strict boundary constraints. The system utilizes `react-draggable` in uncontrolled mode (`defaultPosition`) to ensure high-performance dragging. Dragging is automatically disabled in fullscreen mode. Window positions are securely managed and cascaded in state. Z-index dynamically updates on focus and drag.
- **Taskbar System**:
  - **Left Section**: Features a custom SVG Start button and dynamically maps Pinned Apps (external links) followed by running Windows.
  - **Right Section**: Contains a live updating clock and date display.
  - **Indicators**: Taskbar items reflect states visually: active windows have a colored highlight, and minimized windows show a subtle bottom underline indicator.
  - **Click Behavior**: Clicking a taskbar icon restores minimized windows, minimizes active windows, and brings inactive windows to the front.
- **Desktop Icons**: Rendered via a dedicated `DesktopIcons` component mapping over the App Registry with single-click select and double-click open behaviors.
- **Start Menu Grid**: Toggled from the Taskbar, displaying a Windows 11 style grid of all available apps with outside-click and ESC key closure behavior.
- **Wallpaper System**: Centralized shared wallpaper configuration array.
  - **Desktop**: Features a random wallpaper on load, auto wallpaper rotation every 10 seconds, and manual "Next Wallpaper" functionality that correctly resets the auto-rotation timer.
  - **Lock Screen**: Selects a fresh random wallpaper on each mount (no auto-rotation).
- **Desktop Interactions**:
  - **Context Menu**: Custom Windows-style right-click context menu offering actions like 'Refresh' (visual only), 'Close All Windows', and 'Next Wallpaper'.
  - **UX Restrictions**: Default browser context menus are globally disabled. Common DevTools keyboard shortcuts (F12, Ctrl+Shift+I/J/C) are blocked at the UX level to discourage casual inspection and prioritize the custom OS environment.
- **Content Width Strategy**:
  - Introduced a centered content wrapper pattern (`.contentWrapper`) applied across window contents to constrain maximum reading/layout width to `1700px`.
  - Centers content automatically on ultra-wide and high-resolution monitors to prevent overly stretched text and cards.
  - Windows remain fully resizable and responsive, keeping the outer OS desktop experience completely native.

# Features Implemented

- **Seamless Transitions**: Fluid animations between Lock Screen, Login Screen, and Desktop environments using CSS layers.
- **System Polish**: 
  - **Glassmorphism**: High-quality dark theme implementation relying on `rgba()` transparencies and `backdrop-filter: blur` to achieve modern OS aesthetics consistency.
  - **Improved UX**: Realistic OS behaviors including minimizing, maximizing, drag limits, and taskbar indicators.
  - **Performance**: Improved heavily by utilizing uncontrolled drag positions and fully unmounting closed windows to maintain a clean DOM tree.
- **About Window**:
  - Expanded content highlighting full-stack systems, backend architecture, desktop apps, and system integrations.
  - Organizes developer profile information with focused segments: Profile, Focus Areas, Currently Exploring, Technical Domains, and Technology Stack.
- **Certifications Window**:
  - Built a fully operational document explorer interface (`DesktopCertifications`) registered in `appRegistry`.
  - Implemented responsive glassmorphic certificate cards featuring provider badges, metadata, comprehensive outcomes, and tech tags.
  - Configured automatic chronological sorting (newest first) based on issuance dates.
  - Supports external verification links and local PDF downloads (e.g. `Data-Science-Course-Certificate.pdf`).
  - Completed Milestones:
    1. Responsive Web Design (freeCodeCamp - September 2021)
    2. JavaScript Algorithms and Data Structures (freeCodeCamp - October 2021)
    3. Front End Development Libraries (freeCodeCamp - November 2021)
    4. Data Visualization (freeCodeCamp - December 2022)
    5. The Ultimate Job Ready Data Science Course (CodeWithHarry - October 2025)

# Work In Progress / TODO

- **Content Integration**: Transition remaining placeholder components (e.g., Work Experience, Projects, Skills) inside the active Windows to load dynamic, real portfolio data.
- **Mobile View Enhancements**: Refine `MobileView.jsx` to map the App Registry links smoothly for `< 400px` screen widths where full windowing is disabled.

# Window Implementation Progress & Roadmap

Priority order:
- **About** ✅
- **Certifications** ✅
- **Work Experience** ⏳ *(Next Planned Window)*
- **Projects** ⏳ *(Next Planned Window)*
- **Skills** ⏳ *(Next Planned Window)*

# Notes for Future Development

- **Single Source of Truth**: When extending the system, always update `src/config/apps.js`—the Desktop, Taskbar, and Start Menu are completely driven by this registry.
- **Styling**: All components encapsulate styles using CSS Modules (`.module.css`).
