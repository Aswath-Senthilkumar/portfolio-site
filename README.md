# Portfolio Website 2025

A high-performance, immersive portfolio website built with modern web technologies. This project demonstrates advanced frontend development practices, 3D integrations, and optimized rendering techniques.

## 🚀 Tech Stack

### Core

- **React 19**: Leveraging the latest concurrent features and compiler optimizations.
- **TypeScript**: Strict type safety for robust code quality.
- **Vite**: Next-generation frontend tooling for blazing fast builds.

### State Management & Architecture

- **Zustand**: Lightweight, scalable global state management (used for Navigation and Drawer states).
- **Custom Hooks**: Encapsulated logic for reusability and cleaner components:
  - \`useSectionTracker\`: Efficient scroll spying and navigation syncing.
  - \`useContactForm\`: Form logic abstraction.
  - \`useSkillRowAnimation\`: Orchestrated animation sequences.
- **Modular Architecture**: Component-driven development with clear separation of concerns (`/sections`, `/components`, `/stores`).

### Styling & UI

- **Tailwind CSS v4**: Utility-first styling with the latest engine.
- **Emotion**: CSS-in-JS solutions for dynamic component styling.
- **Responsive Design**: Adaptive layouts with device-specific optimization (`isMobile` detection via `react-responsive`).

## ✨ Animations & 3D Experience

### Graphics Engine

- **Three.js & React Three Fiber (R3F)**: 3D scene rendering and canvas management.
- **Drei**: Helper abstractions for rapid R3F development.
- **Spline**: Interactive 3D assets integration.

### Motion & Transitions

- **GSAP (GreenSock)**: Industry-standard library for high-performance complex timelines.
- **Framer Motion**: React-native animations for layout transitions and gestures.
- **Lenis**: Smooth logic-based scrolling for a premium feel.
- **Physics**: `matter-js` and `canvas-confetti` for interactive particle effects.

## ⚡ Performance Optimization

### Load Time & Bundle Size

- **Code Splitting**: Route-based lazy loading using `React.lazy` and `Suspense` to split Desktop and Mobile bundles.
- **Asset Optimization**: Intelligent loading of heavy assets and 3D models.
- **Vite Configuration**: custom build optimizations.

### Monitoring

- **Vercel Speed Insights**: Real-time user experience monitoring (Core Web Vitals).
- **Vercel Analytics**: Privacy-friendly traffic analysis.

## 🔍 SEO & Meta Data

- **Structured Data**: JSON-LD injection for rich search results (Person, WebSite schemas).
- **Automated Sitemap**: `vite-plugin-sitemap` for ensuring search engines index all pages.
- **Semantic HTML**: Accessible and crawler-friendly markup structure.

## 🛠️ Development

To run this project locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 📄 License

[MIT](LICENSE)
