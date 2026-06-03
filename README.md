# ✦ My Tasks — Portfolio To-Do App

A modern, responsive, and internship-ready To-Do app built with **React + Vite**.

## Features
- ✅ Add, edit, delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Filter by All / Active / Completed
- ✅ Progress bar and task stats
- ✅ Data persists via `localStorage`
- ✅ Responsive for mobile & desktop
- ✅ Dark theme with animations

## Tech Stack
- React 18 (functional components + hooks)
- Vite (build tool)
- CSS Variables & Animations (no UI library)

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

## Build for Production

```bash
npm run build
```

## Deploy to Vercel

1. Push this folder to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Vercel auto-detects Vite — click **Deploy**

## Folder Structure

```
todo-app/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx          ← App entry point
    ├── App.jsx           ← Root component + state management
    ├── App.css           ← All styles
    └── components/
        ├── Todo.jsx      ← Main container (input, filters, list)
        └── TodoItem.jsx  ← Individual task card
```
