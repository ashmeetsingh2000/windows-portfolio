# Mobile Responsiveness Implementation Plan

## 1. Executive Summary

This document presents a comprehensive analysis and architectural plan to transform the Windows 11 interactive portfolio into a fully responsive, touch-optimized mobile experience. 

### Current Architecture Overview
The portfolio is built as a single-page React 19 application using Vite 8 and vanilla CSS Modules. It mimics a Windows 11 desktop environment featuring a boot flow (**Lock Screen → Login Screen → Desktop Screen**) with window management (draggable, minimizable, maximizable windows), a central taskbar, start menu, desktop icons, and custom context menus.

### Current Mobile State
* Users visiting on screens under `400px` width currently see a static placeholder screen (`MobileView.jsx`) stating: *"This portfolio is designed for a larger screen. Please visit on a laptop or desktop for the best experience."*
* On devices between `400px` and `768px` (portrait smartphones like iPhone 14/15, Samsung Galaxy S23, Google Pixel, and small tablets), the application attempts to render the desktop Windows 11 interface. This results in cut-off windows (`500px` minimum width), broken layouts, unclickable double-touch icons, massive font overflows on the lock screen (`12rem`), and desktop-dependent controls.
* The dynamic resize listener in `App.jsx` is currently commented out.

### Recommended Mobile Strategy
Rather than forcing a desktop multi-window paradigm onto small touchscreens, we will implement a **purpose-built mobile layout boundary at `768px`**:
* **Desktop (`> 768px`)**: Completely unchanged. Preserves all Windows 11 window dragging, taskbar, start menu, double-click desktop icons, and desktop context menu behaviors.
* **Mobile (`<= 768px`)**: Renders an intuitive, touch-first mobile portfolio shell (`MobileView.jsx`) that retains the portfolio's visual identity (wallpapers, glassmorphism, accent styling, profile data) while serving content in clean full-screen modal cards with dedicated top navigation, back buttons, single-tap controls, and natural full-page vertical scrolling.

---

## 2. Current Architecture

### Project Structure & Component Hierarchy
```
src/
├── main.jsx (React DOM Root)
├── App.jsx (Boot Flow Orchestration & Viewport Listener)
├── App.css (Screen Layering & Fade Transitions)
├── index.css (Global Baseline Resets)
├── config/
│   ├── apps.js (Central App Registry: Windows & External Links)
│   └── wallpapers.js (Wallpaper Asset Array)
└── components/
    ├── LockScreen/
    │   ├── LockScreen.jsx (Ticking Clock & Keyboard/Click Listener)
    │   └── LockScreen.module.css (Full-bleed Overlay, 12rem Time Font)
    ├── LoginScreen/
    │   ├── LoginScreen.jsx (Avatar, Username, Sign In & Spinner)
    │   └── LoginScreen.module.css (Blurred Backdrop, Action Container)
    ├── DesktopScreen/
    │   ├── DesktopScreen.jsx (OS State: Windows, Positions, Z-Index, Wallpaper Interval)
    │   ├── DesktopScreen.module.css (Desktop Workspace Grid & Layout)
    │   ├── Window.jsx (React-Draggable Wrapper & Titlebar Controls)
    │   ├── Window.module.css (500px Min-Width, Absolute Offsets)
    │   ├── Taskbar.jsx (Start Button, Quick Launch, Window Badges, Live Clock)
    │   ├── Taskbar.module.css (Fixed Bottom Bar 54px, Glassmorphism)
    │   ├── DesktopIcons.jsx (Icon Grid, Single-click Focus, Double-click Launch)
    │   ├── DesktopIcons.module.css (Icon Grid Layout)
    │   ├── StartMenuGrid.jsx (Apps Menu Popup)
    │   ├── DesktopContextMenu.jsx (Custom Right-click Context Menu)
    │   ├── DesktopAbout.jsx / module.css (Bio, Profile, Tags)
    │   ├── DesktopExperience.jsx / module.css (Master-Detail Work History)
    │   ├── DesktopProjects.jsx / module.css (Accordion Explorer & Project Cards)
    │   ├── DesktopSkills.jsx / module.css (Task Manager Replica with 3 Tabs)
    │   └── DesktopCertifications.jsx / module.css (Certificates Grid & Verification Links)
    └── MobileView/
        ├── MobileView.jsx (Current Fallback Placeholder)
        └── MobileView.module.css (Centered Warning Overlay)
```

### Application State & Data Flow
1. **Boot Sequence (`App.jsx`)**: Manages top-level state `screen` (`'lock'` | `'login'` | `'loading'` | `'desktop'`).
2. **OS Environment State (`DesktopScreen.jsx`)**:
   * `windows`: Array of active window objects (`{ id, title, isOpen, isMinimized, isFullscreen, isActive, zIndex }`).
   * `windowPositions`: Coordinate map (`{ [id]: { x, y } }`).
   * `getNextZIndex()`: Function computing highest z-index.
   * `bgIndex`: Index pointer into `WALLPAPERS`.
   * `contextMenu`: State controlling right-click context menu coordinates.
3. **App Registry (`src/config/apps.js`)**: Single source of truth containing 5 window apps (`about`, `experience`, `projects`, `skills`, `certifications`) and 2 external link apps (`linkedin`, `gmail`).

---

## 3. Current Mobile Audit

| Area | Current State | Problem on Mobile | Recommended Action |
| :--- | :--- | :--- | :--- |
| **Viewport Boundary** | `window.innerWidth < 400` checked once on mount; resize listener commented out. | Devices 400px–768px get broken desktop UI; orientation changes aren't tracked. | Enable dynamic window resize listener in `App.jsx` with standard `768px` breakpoint threshold. |
| **Mobile Fallback** | `MobileView.jsx` shows static "Designed for larger screen" message. | Recruiter traffic on mobile is blocked with no access to portfolio content. | Transform `MobileView.jsx` into a full-featured, interactive mobile portfolio dashboard. |
| **Lock Screen** | Time font is `12rem` (192px), padding `60px 80px`. | Text spills off right/bottom edges on screens < 500px wide. | Add responsive CSS media queries: downscale font-size (`4.5rem–6rem`) and scale padding to `24px 20px`. |
| **Login Screen** | Avatar is `210px`, spacing assumes full height. | Fits vertically on high-res phones, but can overflow on landscape/short mobile screens. | Add mobile responsive scale (`avatar 140px`, adjusted margins) and tap-friendly button targets. |
| **Window Management** | `Window.module.css` sets `min-width: 500px`, `min-height: 400px`, absolute desktop positioning. | Windows overflow viewport; controls (close `X`, min `_`) are too small for fingers. | On mobile shell, replace windowing with full-screen container views with clear top headers and close/back buttons. |
| **Desktop Icons** | Requires `onDoubleClick` to launch app windows. | Touch devices struggle with double-taps (causes page zoom or missed input). | Mobile shell uses single-tap activation for all app cards and launcher icons. |
| **Taskbar & Start Menu** | `Taskbar` is fixed at bottom (`54px`), Start menu pops up in bottom-center. | Occupies valuable vertical screen real estate; Start menu spills off screen edge. | On mobile, replace taskbar with a streamlined mobile header and bottom action bar. |
| **Work Experience App** | Split layout with `280px` fixed left sidebar and detail card right panel. | Horizontal overflow or squished content on mobile. | Mobile adaptation: stack role selector horizontally or as a top tab bar, displaying details below. |
| **Projects App** | Tree explorer sidebar (`projectsData.js` accordion) with right detail view. | Accordion sidebar steals screen width on mobile. | Mobile adaptation: full-width accordion listing that expands project cards smoothly inline. |
| **Skills App** | Complex Task Manager layout (TreeGrid, Services Grid, Performance Progress Bars). | Desktop table columns (`Name`, `Type`, `Status`, `Domain`) overflow on portrait screens. | Mobile adaptation: turn table into responsive stacked card rows while preserving all 3 tabs (Processes, Services, Performance). |
| **Certifications App** | Grid layout `grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))`. | Single column works well, but buttons and card padding need touch optimizations. | Retain grid layout, ensure 100% width on `< 480px`, and enlarge touch target buttons. |
| **Context Menu** | Triggered via `onContextMenu` (right-click). | Long-pressing on mobile triggers native browser context menus (text select/copy). | Disable custom desktop context menu on mobile view; expose wallpaper change & actions in mobile settings menu. |

---

## 4. Proposed Mobile Architecture

### Mobile Entry & State Flow
```
                                 [ Window Resize / Load ]
                                            │
                           ┌────────────────┴────────────────┐
                           ▼                                 ▼
                 Width <= 768px                     Width > 768px
               (Mobile View Mode)                (Desktop View Mode)
                           │                                 │
           ┌───────────────┴───────────────┐                 │
           ▼                               ▼                 │
     Lock Screen                      Login Screen           │
  (Responsive Clock)               (Responsive Form)         │
           │                               │                 │
           └───────────────┬───────────────┘                 │
                           ▼                                 ▼
                     Mobile Shell                  Windows 11 Desktop
              (Dashboard & Quick Dock)              (Unchanged OS UI)
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
      Full-Screen App               External Link
        Modal View                 (Open New Tab)
    (With Back Button)
```

### Mobile Shell Design Concept
The mobile shell will be built inside `MobileView.jsx` (and child components) to act as a purpose-built Windows 11 Fluent Mobile environment:

1. **Mobile Status Header**:
   * Displays greeting ("Ashmeet Singh"), current local clock time, and wallpaper switcher toggle.
2. **Profile Hero Card**:
   * Quick summary of Ashmeet Singh (Full-Stack Software Developer), profile avatar, and quick contact buttons (LinkedIn, Gmail, PDF Resume download).
3. **Mobile App Launcher Grid**:
   * Grid of high-touch cards for all portfolio applications:
     * 👤 **About**
     * 💼 **Work Experience**
     * 🚀 **Projects**
     * 🛠️ **Skills**
     * 📜 **Certifications**
4. **Full-Screen App View Container**:
   * When an app is tapped, a full-screen view slides up covering the dashboard.
   * **Top Navigation Bar**: Features an explicit `← Back` button, current App Icon, App Title, and `✕ Close` button.
   * **Scrollable Content Body**: Houses the active app content, enabling natural vertical touch scrolling with zero horizontal scrollbars or trapped overflow containers.
5. **Mobile Navigation Bar / Dock**:
   * Floating bottom navigation bar providing instant single-tap access to Home, About, Experience, Projects, Skills, and Certifications.

---

## 5. Component-Level Changes

### Modified Existing Components

#### 1. `src/App.jsx`
* **Current Responsibility**: Boot state management, keyboard shortcuts.
* **Required Change**: 
  * Re-enable dynamic window resize listener for `window.innerWidth`.
  * Set breakpoint logic: `const isMobile = windowWidth <= 768;`.
  * Ensure smooth transitions when resizing browser window between mobile and desktop modes.
* **Desktop Impact**: None.
* **Mobile Behavior**: Triggers mobile layout when screen width is `768px` or below.

#### 2. `src/components/LockScreen/LockScreen.jsx` & `LockScreen.module.css`
* **Current Responsibility**: Lock screen ticking clock and unlock trigger.
* **Required Change**:
  * Add CSS media queries for `@media (max-width: 768px)`.
  * Scale `.lock-time` from `12rem` down to `4.5rem - 5.5rem`.
  * Adjust `.lock-date` font size to `1.25rem`.
  * Scale padding from `60px 80px` down to `32px 24px`.
  * Add subtle animated text hint: *"Tap anywhere to unlock"*.
* **Desktop Impact**: Zero change on desktop width (`> 768px`).
* **Mobile Behavior**: Fully legible, centered/aligned responsive clock that fits neatly on phone screens.

#### 3. `src/components/LoginScreen/LoginScreen.jsx` & `LoginScreen.module.css`
* **Current Responsibility**: User login profile panel and login spinner.
* **Required Change**:
  * Scale profile avatar down to `140px` on small screens (`<= 480px`).
  * Enlarge touch area for `Sign In` button (min target height `48px`).
  * Ensure container centers properly without vertical overflow on landscape mobile screens.
* **Desktop Impact**: Zero change on desktop width (`> 768px`).
* **Mobile Behavior**: Tap-friendly login experience.

#### 4. `src/components/DesktopScreen/DesktopAbout.module.css`
* **Current Responsibility**: Styling for About app.
* **Required Change**:
  * Enhance existing `@media (max-width: 500px)` rules to support mobile view container width.
  * Allow profile image to resize down to `160px` centered on mobile.
  * Stack tags flexibly with touch-friendly spacing.
* **Desktop Impact**: None.
* **Mobile Behavior**: Clean, single-column vertical layout.

#### 5. `src/components/DesktopScreen/DesktopExperience.module.css`
* **Current Responsibility**: Styling for Work Experience master-detail view.
* **Required Change**:
  * Refine `@media (max-width: 768px)` rules so role selector tabs scroll horizontally at the top, and detail panel displays directly beneath.
  * Increase font-size and padding on mobile role tabs for easy touch selection.
* **Desktop Impact**: None.
* **Mobile Behavior**: Intuitive top-scroll tab bar + stacked experience details.

#### 6. `src/components/DesktopScreen/DesktopProjects.module.css`
* **Current Responsibility**: Explorer accordion navigation and project detail card.
* **Required Change**:
  * Add `@media (max-width: 768px)` layout rules to stack explorer accordion above detail card or convert sidebar into top accordion view.
  * Ensure tech tags and action link pills wrapped in flexbox have full tap targets.
* **Desktop Impact**: None.
* **Mobile Behavior**: Single-column responsive accordion view.

#### 7. `src/components/DesktopScreen/DesktopSkills.module.css`
* **Current Responsibility**: Styling for Task Manager Skills view.
* **Required Change**:
  * Add responsive mobile views for the 3 tabs:
    * **Processes**: Hide non-essential table headers on mobile (`Type`, `Domain`), displaying `Name` and `Status` clearly.
    * **Services**: Adjust grid to `repeat(auto-fill, minmax(140px, 1fr))` on mobile.
    * **Performance**: Stack domain summary cards vertically.
* **Desktop Impact**: None.
* **Mobile Behavior**: Task Manager experience adapted seamlessly for phone screens.

#### 8. `src/components/DesktopScreen/DesktopCertifications.module.css`
* **Current Responsibility**: Grid layout of certification document cards.
* **Required Change**:
  * Set grid columns to `1fr` on screens `<= 500px`.
  * Ensure "View Certificate" buttons are full-width on mobile with 48px height touch target.
* **Desktop Impact**: None.
* **Mobile Behavior**: Card list layout with full-width action buttons.

---

### New Created Components

#### 1. `src/components/MobileView/MobileView.jsx` & `MobileView.module.css` (Refactored / Rewritten)
* **Responsibility**: Serves as the master mobile shell for the portfolio when `isMobile` is true.
* **Features**:
  * Manages lock/login/loading/dashboard internal boot states (or syncs with main app state).
  * Renders Mobile Dashboard with hero profile banner, application cards, and bottom dock.
  * Handles full-screen app view rendering when an app is active.
  * Provides top bar navigation with Back button support.
  * Handles wallpaper background cycling.

#### 2. `src/components/MobileView/MobileAppContainer.jsx` & `MobileAppContainer.module.css`
* **Responsibility**: Reusable wrapper component for rendering portfolio apps on mobile.
* **Features**:
  * Replaces desktop `Window.jsx` on mobile devices.
  * Renders full-screen fixed overlay with slide-up entrance animation.
  * Header bar with App Icon, App Title, Back Button (`← Back`), and Close Button (`✕`).
  * Accessible scrollable container body for the wrapped app component (`DesktopAbout`, `DesktopExperience`, etc.).

---

### Unchanged Components (Desktop Safety)
The following components remain completely untouched to guarantee zero regression on desktop devices (`> 768px`):
* `src/components/DesktopScreen/DesktopScreen.jsx`
* `src/components/DesktopScreen/Window.jsx`
* `src/components/DesktopScreen/Window.module.css`
* `src/components/DesktopScreen/Taskbar.jsx`
* `src/components/DesktopScreen/Taskbar.module.css`
* `src/components/DesktopScreen/DesktopIcons.jsx`
* `src/components/DesktopScreen/DesktopIcons.module.css`
* `src/components/DesktopScreen/StartMenuGrid.jsx`
* `src/components/DesktopScreen/DesktopContextMenu.jsx`

---

## 6. CSS Changes

### Breakpoint Strategy
We adopt a single primary layout breakpoint supported by small device sub-steps:
* `> 768px`: Desktop Mode (Windows 11 OS view).
* `<= 768px`: Mobile Mode (Purpose-built Mobile Shell).
* `<= 480px`: Small Mobile (Extra padding/font scaling tweaks for narrow devices like 320px–390px).

### Responsive CSS Guidelines
1. **Viewport units**: Use `min-height: 100dvh` (dynamic viewport height) instead of `100vh` on mobile to prevent browser address bar clipping.
2. **Overflow prevention**: Set `max-width: 100%` and `overflow-x: hidden` on root mobile containers.
3. **Typography**: Use standard rem/em units with fluid bounds (`clamp()`) for headings on mobile.
4. **Spacing**: Reduce desktop padding (`2rem-3rem`) to mobile padding (`1rem-1.25rem`).
5. **Touch Targets**: Minimum interactive element height/width of `44px x 44px`.

---

## 7. JavaScript Changes

1. **Dynamic Viewport Detection (`App.jsx`)**:
   ```javascript
   useEffect(() => {
     const checkMobile = () => setIsMobile(window.innerWidth <= 768);
     checkMobile();
     window.addEventListener('resize', checkMobile);
     return () => window.removeEventListener('resize', checkMobile);
   }, []);
   ```
2. **Mobile Navigation State (`MobileView.jsx`)**:
   * State tracking `activeMobileApp` (e.g., `'about'`, `'experience'`, `'projects'`, `'skills'`, `'certifications'`).
   * Back button handler: `setActiveMobileApp(null)` returns user to Mobile Dashboard.
3. **Single-Tap Event Handlers**:
   * Map all app launches to single `onClick` handlers. Eliminate double-click dependency on mobile.
4. **Body Scroll Lock**:
   * Prevent underlying dashboard scroll when full-screen mobile app container is open.

---

## 8. Interaction Mapping

| Desktop Interaction | Mobile Equivalent | Rationale |
| :--- | :--- | :--- |
| **Double Click Desktop Icon** | **Single Tap App Card / Icon** | Touch devices do not handle double clicks reliably. Single tap provides instant response. |
| **Drag Window via Titlebar** | **Fixed Full-Screen View** | Window dragging is frustrating on small touch screens. Full-screen maximizes readability. |
| **Minimize Window (`_`)** | **Tap Back Button (`←`) or Swipe** | Minimizing makes little sense without a taskbar; returning to dashboard achieves same goal. |
| **Maximize Window (`□`)** | **Default Full-Screen State** | Mobile views are maximized by default for optimal screen real estate. |
| **Close Window (`X`)** | **Tap Close / Back Button (`✕` or `←`)** | Explicit touch button at top-left and top-right of mobile app view. |
| **Hover State Effects** | **Always-Visible UI / Tap State** | Hover does not exist on touch; critical info (labels, stats) is permanently visible. |
| **Right-Click Context Menu** | **Top Header Settings / Action Buttons**| Native long-press menus interfere with custom context menus; actions are placed in header. |

---

## 9. Performance Considerations

1. **Asset Compression**:
   * The PDF certificate (`public/Data-Science-Course-Certificate.pdf`) is **11.5 MB**. On mobile networks, this can cause major delays. Compress PDF or serve a high-efficiency preview page.
   * Ensure wallpapers (`.webp`) are preloaded or lazy-loaded cleanly.
2. **GPU Acceleration**:
   * Use CSS `transform: translateY()` and `opacity` for mobile modal open/close animations. Avoid animating height/top/left properties to maintain 60 FPS.
3. **Unmounting Inactive Views**:
   * When an app modal is closed on mobile, unmount the content component to save memory and DOM nodes.

---

## 10. Accessibility Considerations

1. **Touch Target Sizing**: All buttons, links, tabs, and interactive cards will have a minimum touch size of `44px x 44px`.
2. **Semantic HTML**: Use standard `<button>`, `<nav>`, `<header>`, `<main>`, `<section>` elements.
3. **ARIA Roles & State**:
   * Full-screen mobile app modal: `role="dialog"`, `aria-label="{App Title}"`, `aria-modal="true"`.
   * Tabs & accordions: preserve existing `role="tab"`, `aria-expanded`, `aria-selected` attributes.
4. **Focus Management**: Trap focus inside active full-screen mobile modals and return focus to triggering card upon closing.
5. **Reduced Motion**: Respect `@media (prefers-reduced-motion: reduce)` by turning off slide animations for users with motion sensitivity.

---

## 11. Files Expected to Change

### Files to Modify
1. `src/App.jsx` (Add dynamic viewport resize listener, update `isMobile` threshold to 768px)
2. `src/components/LockScreen/LockScreen.jsx` & `LockScreen.module.css` (Responsive font scaling & padding)
3. `src/components/LoginScreen/LoginScreen.jsx` & `LoginScreen.module.css` (Responsive scaling & touch target sizes)
4. `src/components/DesktopScreen/DesktopAbout.module.css` (Mobile width styling)
5. `src/components/DesktopScreen/DesktopExperience.module.css` (Mobile horizontal tab scroll styling)
6. `src/components/DesktopScreen/DesktopProjects.module.css` (Mobile accordion layout)
7. `src/components/DesktopScreen/DesktopSkills.module.css` (Mobile Task Manager card styling)
8. `src/components/DesktopScreen/DesktopCertifications.module.css` (Mobile single-column card styling)

### Files to Create
1. `src/components/MobileView/MobileView.jsx` (Complete mobile shell dashboard replacement)
2. `src/components/MobileView/MobileView.module.css` (Mobile shell layout & dashboard styling)
3. `src/components/MobileView/MobileAppContainer.jsx` (Full-screen mobile app window container)
4. `src/components/MobileView/MobileAppContainer.module.css` (Mobile container header, back button & slide animation)

### Files Remaining Untouched (Desktop Safety)
* `src/components/DesktopScreen/DesktopScreen.jsx`
* `src/components/DesktopScreen/Window.jsx`
* `src/components/DesktopScreen/Window.module.css`
* `src/components/DesktopScreen/Taskbar.jsx`
* `src/components/DesktopScreen/Taskbar.module.css`
* `src/components/DesktopScreen/DesktopIcons.jsx`
* `src/components/DesktopScreen/DesktopIcons.module.css`
* `src/components/DesktopScreen/StartMenuGrid.jsx`
* `src/components/DesktopScreen/DesktopContextMenu.jsx`

---

## 12. Implementation Order

```
Step 1: Mobile Boundary Setup
 └── Update App.jsx with active 768px resize listener.

Step 2: Lock & Login Mobile Responsiveness
 └── Adapt LockScreen & LoginScreen CSS for responsive font sizes and touch targets.

Step 3: Mobile Shell & Dashboard Core
 └── Build MobileView.jsx & MobileAppContainer.jsx with Fluent Mobile styling.

Step 4: Portfolio Content Mobile Adaptation
 └── Add responsive CSS rules to DesktopAbout, DesktopExperience, DesktopProjects, DesktopSkills, and DesktopCertifications.

Step 5: Touch & Navigation Polish
 └── Connect single-tap app launch, back button, smooth slide transitions, and body scroll locking.

Step 6: Verification & Cross-Device Testing
 └── Test desktop regression (> 768px) and verify mobile breakpoints (320px, 375px, 390px, 412px, 430px).
```

---

## 13. Risk Assessment

| Risk | Likelihood | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Accidentally breaking desktop windowing logic** | Low | High | Desktop components (`DesktopScreen`, `Window`, `Taskbar`) will be left untouched. Mobile logic is encapsulated in `MobileView.jsx` and media queries scoped to `max-width: 768px`. |
| **Window resize listener causing performance lag** | Low | Medium | Use lightweight `window.innerWidth` checks inside clean `useEffect` listeners. |
| **Scroll trapping inside mobile app views** | Medium | Medium | Use `overflow-y: auto`, `-webkit-overflow-scrolling: touch`, and dynamic dynamic viewport height (`100dvh`) on `MobileAppContainer`. |
| **Large asset download delays on mobile networks** | Medium | Medium | Lazy load PDF files and compress images where possible. |

---

## 14. Testing Plan

### Desktop Regression Testing (`> 768px`)
Verify that all existing desktop functionality operates with zero side effects:
* Lock screen ticking clock & keypress unlock
* Login screen sign-in & 2.0s loader spinner
* Wallpaper background interval & right-click wallpaper change
* Desktop icon selection and double-click window launch
* Window dragging via titlebar & parent boundary constraints
* Window minimize, maximize/restore, and close buttons
* Taskbar window indicator bars and Start Menu toggle
* Context menu right-click position and actions
* All 5 portfolio apps rendering inside desktop windows

### Mobile Testing Matrix
Test at standard mobile device widths:
* **320px** (Small mobile / iPhone SE)
* **375px** (iPhone 12/13 Mini)
* **390px** (iPhone 12/13/14 Pro)
* **412px** (Samsung Galaxy S20/S21, Google Pixel)
* **430px** (iPhone 14/15 Pro Max)
* **768px** (Tablet portrait boundary)

#### Mobile Verification Checklist:
* [ ] Lock screen clock fits comfortably without text wrapping or overflow.
* [ ] Login screen sign-in button is easily clickable with finger tap.
* [ ] Mobile dashboard renders clear profile hero card and app launcher grid.
* [ ] Tapping any app card opens full-screen view with slide animation.
* [ ] Top bar displays App Title, App Icon, and working `← Back` button.
* [ ] Tapping Back button or pressing Escape closes the app view cleanly.
* [ ] App content scrolls vertically with natural touch inertia.
* [ ] External links (LinkedIn, Gmail, Certificate links) open properly in new tabs.
* [ ] Rotating between portrait and landscape modes dynamically switches layout boundaries cleanly.
