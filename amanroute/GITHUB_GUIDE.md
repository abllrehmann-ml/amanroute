# Push to GitHub — 3 Min Guide

## Already done for you in this workspace:
- .gitignore created (no node_modules)
- App + PPT + README ready

## Steps for YOU (on your laptop/phone):

### Step 1: Create Repo on GitHub (1 min)
1. Go to https://github.com/new
2. Repository name: `AmanRoute-Safe-Karachi` or `amanroute`
3. Description: `AmanRoute — AI Guardian for Karachi night commuters | CSS IBA Genesis Hackathon 2025 | Next.js + Gemini + roadmap.sh`
4. Keep it PUBLIC (judges need to see)
5. DO NOT check "Add README" — we already have one
6. Click "Create repository"

### Step 2: Push from your laptop (2 min)
Download this `amanroute` folder to your laptop, then open Terminal / VS Code:

```bash
cd amanroute
git init
git add .
git commit -m "AmanRoute - Safe Karachi - Genesis Hackathon - Initial build"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/AmanRoute-Safe-Karachi.git
git push -u origin main
```

Replace YOUR_USERNAME with your GitHub username!

If it asks for password → use Personal Access Token, not password:
- GitHub > Settings > Developer settings > Personal access tokens > Generate token (classic) > check `repo` > Generate > copy > paste as password.

### Step 3: Verify (30 sec)
- Go to https://github.com/YOUR_USERNAME/AmanRoute-Safe-Karachi
- You should see: app/, lib/, README.md, AmanRoute_Genesis_Pitch.pptx
- Add Vercel live link to repo description after deploy

## Alternative: Upload without terminal (easier)
1. At https://github.com/new create repo
2. On repo page click "uploading an existing file"
3. Drag & drop ALL files from amanroute folder (zip it first if large)
4. Commit

## After GitHub → Deploy to Vercel (also 1 min)
1. https://vercel.com/new → Import your GitHub repo → Deploy → Done
2. Copy Vercel URL (https://amanroute-xxx.vercel.app) → Add to GitHub README + Hackathon submission form

Need help? Paste your GitHub username and we'll give exact command.
