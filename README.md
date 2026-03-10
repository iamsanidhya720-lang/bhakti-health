# 🧠 Bhakti — AI Mental Wellness App

Dr. Aisha, your GenZ Hinglish mental health buddy — powered by Gemini 2.5 Flash.

---

## 🚀 Deploy to Vercel (Step by Step)

### Step 1 — Get your Gemini API Key
1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Sign in with Google
3. Click **Get API Key** → **Create API Key**
4. Copy the key — save it somewhere safe

---

### Step 2 — Put code on GitHub
1. Go to [github.com](https://github.com) → **New Repository**
2. Name it `bhakti` → Set to **Private** → Click **Create Repository**
3. Upload ALL files keeping the exact folder structure:
```
bhakti/
├── public/
│   └── index.html
├── api/
│   └── chat.js
└── vercel.json
```

---

### Step 3 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub (free)
2. Click **Add New Project**
3. Select your `bhakti` repo → Click **Import**
4. Click **Deploy** (no settings to change)
5. Wait ~1 minute ✅

---

### Step 4 — Add your Gemini API Key (IMPORTANT)
1. After deploy, go to your project on Vercel
2. Click **Settings** → **Environment Variables**
3. Add:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** your key here
4. Click **Save**
5. Go to **Deployments** → Click **Redeploy**

---

### Step 5 — Done! 🎉
Your live URL: `bhakti.vercel.app`

---

## 📁 Files

| File | Purpose |
|------|---------|
| `public/index.html` | Frontend UI |
| `api/chat.js` | Secure backend (holds API key) |
| `vercel.json` | Vercel routing config |

---

## 💰 Cost
- Vercel → **Free**
- Gemini 2.5 Flash → **Free tier: 500 requests/day**

## 🔒 Security
API key is NEVER visible in browser or source code. Lives only in Vercel's environment.

## ⚠️ Troubleshooting
- AI not working? Check `GEMINI_API_KEY` is set in Vercel → Settings → Environment Variables, then Redeploy
- Don't open index.html directly from your computer — always use the Vercel URL
