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
-   `/src/components`: Contains UI components organized by screens (e.g., `LockScreen/`, `LoginScreen/`, `DesktopScreen/`, `MobileView/`).
-   `/src/config`: Configuration files (e.g., `apps.js` for the App Registry, `wallpapers.js` for background assets).
-   `App.jsx`: The root component orchestrating state transitions (`lock`, `login`, `loading`, `desktop`).
-   `index.css`: Global baseline resets.
-   `App.css`: Root layer alignment and transition animations.

# Architecture & Systems

## App Registry & Configuration System
- **Central Registry (`src/config/apps.js`)**: A centralized source of truth defining all applications.
  - Apps support `window` (renders an interactive window containing a dedicated component) and `link` (executes external actions like opening LinkedIn or Gmail) types.
- **Wallpaper Configuration (`src/config/wallpapers.js`)**: A simple array configuration for wallpaper assets.

## Window Management System
- **Centralized State**: Active window state is managed within [DesktopScreen.jsx](file:///c:/Users/User/Desktop/Project/PORTFOLIO%20windows/portfolio/src/components/DesktopScreen/DesktopScreen.jsx), tracking open windows and properties (`id`, `title`, `isOpen`, `isMinimized`, `isFullscreen`, `isActive`, `zIndex`).
- **Lifecycle**: Windows are unmounted from the DOM when closed (`!isOpen`). Minimizing a window hides it from view.
- **Draggable Window Wrapper**: Dragging is implemented using `react-draggable` in uncontrolled mode (`defaultPosition`) to ensure optimal performance. Dragging is disabled when a window is maximized (fullscreen). Focus resets the active window and increments its `zIndex`.

## Taskbar System
- **Start Menu Button**: Toggles the custom Windows-like Start Menu.
- **App Group Container**: Dynamically lists Pinned Links followed by active Window tasks.
- **Indicators**: Visual cues show window states: active windows have a dark translucent background highlight, while minimized windows show a bottom highlight bar.
- **System Info Clock**: Displays live local date and time.

## Start Menu & Desktop Interactions
- **Start Menu**: Renders a Windows 11 style grid of all registered applications. Closes automatically upon outside clicks or when pressing the `Escape` key.
- **Desktop Icons**: Single-click focus and double-click open behaviors mapped over the App Registry.
- **Context Menu**: Custom right-click menu providing quick actions: 'Refresh', 'Close All Windows', and 'Next Wallpaper'. The browser's default context menu is globally disabled.

## Content Width Strategy
- Centers window contents within a maximum width of `1700px` to prevent stretching on ultra-wide screens, while maintaining responsive layout scaling.

# State Management

- **Boot Sequence State**: Managed in [App.jsx](file:///c:/Users/User/Desktop/Project/PORTFOLIO%20windows/portfolio/src/App.jsx) via a simple screen string state (`lock` | `login` | `loading` | `desktop`).
- **OS Simulation State**: Managed entirely inside [DesktopScreen.jsx](file:///c:/Users/User/Desktop/Project/PORTFOLIO%20windows/portfolio/src/components/DesktopScreen/DesktopScreen.jsx), including:
  - `windows`: Array of open window objects.
  - `highestZIndex`: Running counter tracking the forefront layer index.
  - `windowPositions`: Key-value map representing the positions of active windows.
  - `contextMenu`: Object storing coordinates and open/close state of the desktop context menu.
  - `bgIndex`: Index tracking the current desktop background.

# Features Implemented

- **Seamless Boot Loader Flow**: Interactive lock screen with ticking clock, username login panel with Windows loading spinner, and screen-fade transitions.
- **About App**: Custom two-panel bio including Focus Areas, Technical Domains, and Technology Stack.
- **Work Experience App**: Chronological interactive work history. Selecting a role on the left updates the detailed responsibilities, metrics, and key projects panel on the right.
- **Projects App**: Professional portfolio presentation grouped by company/organization, highlighting roles, tech tags, bulleted contributions, and external demo links.
- **Skills App**: High-fidelity Task Manager replication with three tabs:
  - **Processes**: Hierarchical accordion list grouping skills by domain (Foundation, Stack, AI, DevOps) with live status tags. Includes detail view panel.
  - **Services**: Dynamic grid cards representing individual micro-skills and competencies.
  - **Performance**: Visualization of domain composition using responsive colored progress bars.
- **Certifications App**: Document grid view showing verified badges, issue dates, detail descriptions, and clickable external verify / local PDF download links.

# Technical Decisions

1. **Vanilla CSS Modules**: Opted for native CSS Modules instead of frameworks like Tailwind. This maximizes visual customizability, allows direct usage of standard CPU-accelerated transform/opacity animations, and matches the strict visual requirements of a Windows 11 replica.
2. **Uncontrolled Position for Draggable**: Positions are stored in state on drag completion (`onDragStop`), but the active dragging is left uncontrolled via `react-draggable`'s `nodeRef` property to prevent React render cycles during pixel-by-pixel updates, keeping frame rates at 60 FPS.
3. **DOM Cleanliness via Unmounting**: Closed windows are fully unmounted (`win.isOpen === false`) to prevent the DOM tree from ballooning and degrading browser memory during extended navigation.
4. **Preventing Code Inspector Casual Escapes**: Global key listener disables `F12` and standard Inspector combinations (`Ctrl+Shift+I/J/C`) alongside right-click defaults to maintain the immersion of a standalone OS desktop environment.

# Known Limitations

1. **Responsive Windowing (Mobile Breakpoint)**: At resolutions under `400px` width, full windowing and desktop dragging are disabled due to screen size constraints, showing a static placeholder view.
2. **No Dynamic Window Resizing**: Windows support maximizing/minimizing and dragging, but cannot be manually resized by dragging margins.
3. **Z-Index Uncapped Increment**: The focus system increments a global counter `highestZIndex` indefinitely instead of recycling or layering relative values.
4. **Minimized Window Unmounting**: In the current implementation, minimizing a window returns `null` from the `Window` component, which unmounts the child content and resets its internal component state (e.g. scroll position or active tabs).

# Development Guidelines

1. **Registry First**: To add new items, shortcuts, or programs, define them inside the App Registry in `src/config/apps.js`. The Desktop, Start Menu, and Taskbar will automatically update.
2. **Encapsulated Styles**: Keep CSS rules inside local `.module.css` files to prevent global pollution. Use CSS class names in camelCase.
3. **Draggable Boundary Constraints**: Always preserve the `bounds="parent"` parameter in `Draggable` components to prevent windows from being dragged completely off-screen.

# Window Implementation Progress & Roadmap

- **About** ✅
- **Certifications** ✅
- **Work Experience** ✅
- **Projects** ✅
- **Skills** ✅
- **Mobile View Responsive Fallback** ⏳ *(WIP / Planned)*

---

# Professional Improvement Suggestions

### High Impact

1. **Responsive Mobile Dashboard Fallback (`MobileView.jsx` redesign)**
   - *Why it matters:* Currently, mobile users under 400px wide are greeted with a static "Under Development" placeholder. Over half of recruitment clicks come from mobile devices. Showing an empty screen severely hurts recruiter engagement and conversion.
   - *Estimated effort:* Medium (1 - 2 days).
   - *Expected benefit:* Retains mobile traffic, allowing hiring managers to seamlessly view Ashmeet's profile, contact details, experiences, and projects on their phones.

2. **Asset Compression and modern formats conversion**
   - *Why it matters:* The PDF certificate (`Data-Science-Course-Certificate.pdf`) is **11.5 MB**, which will fail to load or timeout on slow mobile networks. The profile images and wallpapers are uncompressed JPGs (up to 580 KB).
   - *Estimated effort:* Low (1 - 2 hours).
   - *Expected benefit:* Compresses the PDF to < 500 KB and converts images to `.webp` (reducing wallpaper size to 30-50 KB), cutting LCP (Largest Contentful Paint) times and drastically speeding up initial page loads.

3. **Shorten Boot-up Wait Time or Add a Skip Action**
   - *Why it matters:* To get to the core content, a user has to click "Unlock", then click "Sign In", and then wait through a hardcoded 2.0-second fake spinner animation. Recruiter attention spans are extremely short; fake delays add unnecessary friction.
   - *Estimated effort:* Low (30 minutes).
   - *Expected benefit:* Reducing the timer to 500ms or adding a "Skip Boot Sequence" link lets users view the portfolio instantly, reducing bounce rates.

### Medium Impact

4. **WAI-ARIA Accessibility & Keyboard Navigation (A11y)**
   - *Why it matters:* Custom desktop icons, taskbar pins, and context menu items are custom `div` structures with click triggers but no keyboard focus (`tabIndex={0}`), ARIA roles, or Enter/Space keyboard handlers. This blocks assistive technology and keyboard-only users.
   - *Estimated effort:* Medium (1 day).
   - *Expected benefit:* Makes the entire desktop accessible via keyboard navigation, projecting professional, high-standard frontend craftsmanship.

5. **Context Menu Repositioning Flicker Prevention**
   - *Why it matters:* Right-clicking close to window edges triggers a layout shift, rendering the menu at the cursor coordinates before adjusting position in `useEffect`. This causes a noticeable visual jump/flicker.
   - *Estimated effort:* Low (2 hours).
   - *Expected benefit:* Constraining coordinates inside the event handler before updating state (or using `useLayoutEffect`) results in smooth, instant context menu rendering.

6. **Consistent Wallpapers across Lock and Login Screens**
   - *Why it matters:* Lock and Login screens select wallpapers independently on mount. Unlocking shifts the wallpaper immediately, creating a jarring, discontinuous visual experience during startup.
   - *Estimated effort:* Low (1 hour).
   - *Expected benefit:* Lifting the random background selection state to `App.jsx` ensures the same wallpaper flows smoothly from Lock Screen to Desktop, polishing the boot immersion.

### Low Impact

7. **Taskbar Clock Time Syncing**
   - *Why it matters:* The taskbar clock updates on a static 60,000ms interval. Since mount time is random, the clock display can lag behind the system clock by up to 59 seconds.
   - *Estimated effort:* Low (30 minutes).
   - *Expected benefit:* Updating the clock every second (or aligning the interval directly to the start of the minute) ensures perfect clock accuracy.

8. **Relative Focus Layering (Z-Index Overflow Prevention)**
   - *Why it matters:* Clicking active windows increments the global `highestZIndex` by 1 indefinitely. While integer limit issues are rare, it is cleaner to normalize the z-index list relative to active window counts.
   - *Estimated effort:* Low (1 hour).
   - *Expected benefit:* Clean, robust state tracking that avoids uncapped integer progression.
