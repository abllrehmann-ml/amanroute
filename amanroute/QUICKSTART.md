# ⚡ QUICKSTART — Ship by Tonight

## 1. Install & Run (5 min)
```bash
cd amanroute
npm install
npm run dev
```
Open https://3000-xxxx.e2b.app (preview) or http://localhost:3000

You have a FULLY WORKING demo already. No backend needed for submission.

## 2. Make it Real with Gemini (30 min) - Optional but wow
In `lib/safetyAI.ts`, replace mock with real call:

```ts
async function getGeminiScore(from, to, time, mode) {
  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_KEY", {
    method: "POST",
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Score safety for Karachi route ${from} to ${to} at ${time} via ${mode}. Use lighting, crime, crowd. Return JSON {score:1-10, level, factors, advice, alternatives}` }] }]
    })
  });
  return res.json();
}
```
Get key from aistudio.google.com

## 3. Deploy to Vercel (5 min)
```bash
npm i -g vercel
vercel --prod
# or connect GitHub → vercel.com/new
```

## 4. Tonight's Todo (Copy to Notion)
- [ ] `npm run dev` works
- [ ] Change hero text to your team name
- [ ] Record 90 sec demo: IBA Main → Saddar 10PM Walking (3.9) vs Careem (8.1)
- [ ] Add 1 real survey: Ask 10 friends "Do you feel safe at night?" → screenshot for pitch
- [ ] Push to GitHub, add README
- [ ] Submit link + deploy URL before 11:59 PM Oct 25

## 5. Pitch Script (2 min)
> "Karachi me raat ko safe route kaunsa hai, Google bhi nahi batata. Meri friend ko Hassan Square pe follow kiya gaya. Isi liye AmanRoute banaya... [show demo]... Ye sirf app nahi, har student ki guardian hai. Roadmap.sh se seekh kar banaya, IBA ke liye banaya."

## 6. What Judges Ask + Answers
Q: How is this different from Google Maps? A: Google gives fastest, we give SAFEST with Karachi-specific AI.
Q: Data kahan se aaya? A: Crowd-sourced + mock for demo, post-hackathon Sindh Police + Careem partnership.
Q: AI kya kar raha hai? A: Gemini LLM scores routes + generates alternatives, future Vision for street photos.

Go win! 🏆
