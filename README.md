# 🎙️ MIC

<p align="center">
  <img src="https://img.shields.io/github/license/zennstrom/mic?style=for-the-badge&color=blue" alt="License" />
  <img src="https://img.shields.io/github/stars/zennstrom/mic?style=for-the-badge&color=gold" alt="Stars" />
  <img src="https://img.shields.io/github/issues/zennstrom/mic?style=for-the-badge&color=red" alt="Issues" />
  <img src="https://img.shields.io/github/last-commit/zennstrom/mic?style=for-the-badge&color=green" alt="Last Commit" />
</p>

<p align="center">
  A modern, type-safe web application powered by <b>React</b>, <b>TypeScript</b>, <b>Vite</b>, and <b>Supabase</b>.
</p>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture & Directory Structure](#-architecture--directory-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Setup](#environment-setup)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Available Scripts](#-available-scripts)
- [Supabase Configuration](#-supabase-configuration)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**MIC** is a full-featured web client engineered for fast page loads, responsive navigation, and robust cloud data persistence. It leverages Vite's blazing-fast build pipeline, modern React design patterns (including Providers, Router switches, and custom Error Boundaries), and Supabase for backend integration.

---

## ✨ Key Features

- ⚡ **Instant HMR & Build Speed**: Bundled with Vite for optimized developer experience.
- 🛡️ **End-to-End Type Safety**: Written entirely in TypeScript to reduce runtime exceptions.
- 🗄️ **Seamless Database Connectivity**: Out-of-the-box Supabase integration using `@supabase/supabase-js`.
- 🎨 **Theme & Context Management**: Built-in Theme and Product context providers with global error handling (`ErrorBoundary`).
- 📱 **Responsive UI**: Adaptive layout across mobile, tablet, and desktop interfaces.

---

## 🛠 Tech Stack

| Domain | Technology |
|---|---|
| **Framework** | [React 18+](https://reactjs.org/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool / Bundler** | [Vite](https://vitejs.dev/) |
| **Backend & Auth** | [Supabase](https://supabase.com/) |
| **Routing** | [React Router / Wouter](https://github.com/molefrog/wouter) |
| **Styling** | Modern CSS / Tailwind CSS |

---

## 📂 Architecture & Directory Structure

```text
mic/
├── client/
│   ├── src/
│   │   ├── assets/           # Static assets (images, icons, fonts)
│   │   ├── components/       # Reusable UI components & layouts
│   │   ├── context/          # Global state (Theme, Product contexts)
│   │   ├── pages/            # Page components (Home, About, Contact, Admin)
│   │   ├── services/         # API hooks and fetch utilities
│   │   ├── App.tsx           # Application root & Router configuration
│   │   ├── main.tsx          # React DOM entry point
│   │   └── supabaseClient.ts # Supabase client instance & initialization
│   ├── index.html            # Vite HTML template
│   ├── package.json          # Frontend dependencies & scripts
│   └── vite.config.ts        # Vite build & plugin configuration
├── .env.example              # Environment variables template
├── .gitignore
└── README.md
