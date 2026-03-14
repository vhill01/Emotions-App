# Emotion Explorer

A clinical reference guide to emotions and feelings, grounded in Jonice Webb's
Childhood Emotional Neglect framework (*Running on Empty*, 2012).

---

## Folder Structure

```
emotion-explorer/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
└── src/
    ├── main.jsx          ← React entry point
    ├── index.css         ← Global reset
    ├── App.jsx           ← Full UI component
    └── emotionData.js    ← All 273 feelings (data only)
```

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

---

## Deploy to Vercel

### Option A — Vercel CLI (fastest)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel will detect Vite automatically.

### Option B — GitHub + Vercel Dashboard

1. Push this folder to a GitHub repository
2. Go to https://vercel.com and sign in
3. Click **Add New Project**
4. Import your GitHub repository
5. Vercel detects Vite automatically — no settings to change
6. Click **Deploy**

Your app will be live at a `.vercel.app` URL within 60 seconds.
You can add a custom domain later from the Vercel dashboard.

---

## Deploy to Replit

1. Go to https://replit.com and create a new Repl
2. Choose **React** as the template
3. Delete the default files in `src/`
4. Upload or paste in `App.jsx`, `emotionData.js`, `main.jsx`, `index.css`
5. Replace the default `index.html` with the one provided
6. Click **Run**

---

## Attribution

Based upon Jonice Webb's Childhood Emotional Neglect work found in
*Running on Empty* (2012) and *Running on Empty No More* (2017).
