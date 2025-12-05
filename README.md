# 📸 Elcractic Insta-Matic 9000

> **A retro-futuristic instant camera experience for the modern web.**

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![React](https://img.shields.io/badge/react-v18-cyan) ![Tailwind](https://img.shields.io/badge/style-tailwind-pink)


[Preview](https://instamatic.elcractic.qzz.io/)

**Elcractic Insta-Matic** is an interactive web experiment that simulates the tactile joy of instant photography. Built with React and Tailwind CSS, it transforms digital images into nostalgic, developed polaroids directly in your browser. It features a satisfying physical UI, immersive sound-bite visuals, and dynamic photo-processing effects.

## ✨ Features

* **Tactile UI:** A fully modeled camera body with skeuomorphic buttons, satisfying click animations, and realistic shadows.
* **Immersive Atmosphere:** Set against an animated "void grid" background with a CRT vignette.
* **Live Preview Effects:**
    * **Handheld Shake:** Subtle motion simulates the imperfection of human grip.
    * **CRT Scanlines:** Low-fi digital overlays.
* **Six Distinct Film Modes:**
    * 📼 **80s (Sepia):** Warm, faded, and nostalgic.
    * 👾 **90s (Neon):** High contrast, saturated, cool-toned cyberpunk look.
    * 🕵️ **50s (Noir):** Classic high-contrast black and white.
    * 🕷️ **SPIDEY:** Comic book halftone colors with a hero mask overlay.
    * 🟢 **MATRIX:** Deep green digital rain overlay.
    * 📺 **GLITCH:** Chromatic aberration and signal distortion.
* **Instant Developing:** Watch the photo physically slide out of the camera and chemically "develop" from black to color over several seconds.
* **Export to PNG:** Download your developed masterpiece with a generated polaroid frame and timestamp.

## 🚀 How to Use

1.  **Load Film:** Click the "LOAD FILM" button (or click the screen) to upload your own image.
2.  **Select Mode:** Choose your desired filter era or effect from the keypad (e.g., 90s, SPIDEY).
3.  **Snap:** Press the large red shutter button.
4.  **Develop:** Wait for the photo to eject and process.
5.  **Save:** Once developed, click the "SAVE PRINT" button on the photo to download it.

## 🛠️ Tech Stack

* React 18
* Tailwind CSS (v3 via CDN)
* babel-standalone (for in-browser JSX compilation)

---
*Created by Elcractic.*








# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
