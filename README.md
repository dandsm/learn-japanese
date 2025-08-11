# vue-japanese

A tiny **Vue 3** single-page app to practice Japanese vocabulary with flash-card style prompts. Type the **kana** for a given meaning, get instant feedback, and track your score. Designed to be fast, accessible, and easy to deploy on **Azure Static Web Apps**.

## ✨ Features

- ⚡️ Vue 3 + Vite SPA  
- 🃏 Flash-card flow: prompt → answer → feedback → next  
- 🔤 IME-friendly input (`lang="ja"`)  
- 📝 Simple JSON deck (`/src/data/vocabulary.json`)  
- 🧪 Built-in ESLint script  
- 🖋 Uses **Noto Sans JP** for all Japanese text (inputs included)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## 🤝 Contributing
PRs and issues are welcome! If you add new features (e.g., categories, SRS), include a brief note in this README and sample data in vocabulary.json.

## 📄 License
MIT ©
