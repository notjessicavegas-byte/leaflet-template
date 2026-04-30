# Agent Context & Rules (leaflet example)

## 1. 🎯 Project Overview
- **Name:** leaflet example
- **Purpose:** A Progressive Web App (PWA) displaying tracks and Points of Interest (POIs) across a city. Users can view their real-time location on a map and track which POIs they have visited or unlocked.
- **Target Audience:** Users navigating the city via mobile devices.
- **Core Philosophy:** Utmost simplicity. Zero bloat. Pure vanilla web technologies.

## 2. 🛠️ Tech Stack & STRICT Constraints
- **Frontend:** Pure HTML5, CSS3, and Vanilla JavaScript (ES6+).
- **Map Library:** Leaflet.js (loaded via CDN, no bundling).
- **Backend/Database:** NONE. Entirely static, hosted on GitHub Pages.
- **State Management:** `localStorage` ONLY (used strictly to track progression and unlocked POIs).
- **CRITICAL RULE:** DO NOT introduce `npm`, `package.json`, Node.js, Webpack, Vite, React, or ANY build tools. The project has NO build step. Do not suggest modern framework paradigms; stick to native DOM manipulation.

## 3. 📱 PWA, Map, & Data Specifics
- **PWA Setup:** Hand-written `manifest.json` and `sw.js`. 
- **Service Worker Caching:** Cache the app shell (HTML, CSS, JS, local icons, and local JSON files) so the UI loads offline.
- **Map Tiles:** DO NOT attempt to cache map tiles in the Service Worker or `localStorage`. Map tiles rely strictly on standard browser caching/network availability.
- **Geolocation:** Use the native browser `navigator.geolocation.watchPosition` to update the user's location on the Leaflet map in real-time.
- **Data Source:** Tracks and POI data are stored in static `.json` files so non-technical users can edit them easily. Data is fetched natively via `fetch('/data/pois.json')`.

## 4. 📂 Architecture & Directory Structure
The project uses a flat, simple directory structure suitable for GitHub Pages.

```text
/
├── index.html           # Main map interface
├── manifest.json        # PWA manifest
├── sw.js                # Hand-written Service Worker
├── css/
│   └── style.css        # Pure CSS, no preprocessors
├── js/
│   ├── main.js          # App initialization, localStorage logic, state
│   ├── map.js           # Leaflet setup, geolocation, and marker logic
│   └── pwa.js           # Service worker registration
├── data/
│   └── pois.json        # JSON files defining tracks and POIs
├── pois/
│   ├── poi-1.html       # Individual static HTML pages for each POI
│   └── poi-2.html
└── assets/
    └── icons/           # PWA icons and custom map markers
```

## 5. 🧑‍💻 Coding Conventions & Rules

    JavaScript: Use ES6 modules if necessary, but keep scripts simple. Use standard document.querySelector and native events.

    Storage: When user visits a POI, save its ID to localStorage. Read this on load to visually update map markers (e.g., change color for "visited").

    Error Handling: Gracefully handle permissions for Geolocation. If the user denies GPS access, default to a static view of the map.

    Styling: Mobile-first approach. Standard CSS variables for colors. Ensure map takes up the main viewport efficiently.

## 6. 🤖 Agent Instructions (Behavioral Rules)

    THINK BEFORE WRITING: Always respect the "Vanilla Only" constraint.

    NO BUNDLERS: If asked to add a library, use a CDN link (<script src="...">) in the HTML file.

    CODE OUTPUT: Output only the necessary code changes. Do not rewrite entire files unless structural changes are requested.

    SIMPLICITY: If there are two ways to solve a problem, always choose the one requiring the least amount of code and zero external dependencies.

## 7. 🚀 Local Development

    Running the App: The app is served locally using the VS Code "Live Server" extension. No terminal commands are required for compilation.