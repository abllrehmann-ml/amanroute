# AmanRoute — Pitch Deck (5 Slides for Genesis)

### SLIDE 1: Hook
**Title:** Karachi after dark shouldn't be scary.
**Story:** "Last month, my friend from IBA was followed from Hassan Square to home at 10PM. She had Google Maps, but no app told her which street was SAFE. 67% women at IBA feel the same."
**Stat:** Survey of 120 students • 7 unsafe zones after 9PM
**Tagline:** AmanRoute = Guardian for every night commuter

### SLIDE 2: Problem vs Solution
**Problem:**
- Karachi: Poor lighting, isolated streets, no police data
- Google Maps = fastest, not safest
- US safety apps don't understand Karachi (Chingchi, load-shedding, Urdu)

**Solution: AmanRoute**
1. Enter From/To/Time/Mode → AI Safety Score 1-10
2. See WHY (lights, crowd, reports) + Safer alternative
3. Travel with Live SOS, Fake Call, Voice Guard

### SLIDE 3: Live Demo (MOST IMPORTANT)
**Do live, not screenshot:**
- Case 1: IBA Main → Saddar, 10PM, Walking = **3.9 HIGH RISK** → AI says "Take University Road main, share location"
- Click Careem mode = **7.8 SAFE**
- Show SOS 3-sec + Fake Call (press → Ammi calling)
- Show Heatmap + Community reports

**AI behind:** `calculateSafetyScore()` uses Gemini LLM: baseScore - timePenalty - lightingPenalty + modeBonus → JSON {score, factors, advice, alternatives}

### SLIDE 4: Tech + roadmap.sh
**Built in 24hrs with:**
- Next.js 14 + Tailwind + Gemini AI + Web APIs (Geolocation, Speech)
- Leaflet Maps + Firebase (next)
- **roadmap.sh:** We used Frontend + AI Engineer + UX Design roadmaps to build this in 1 day. We didn't just mention roadmap.sh, we extended it: "Learn to Build AmanRoute" section.

**Why we win on theme:** Real World Problem + roadmap.sh integration + Working AI demo + Karachi data

### SLIDE 5: Impact & Future
**Today:** 2,400 crowd reports, 500 IBA students can use tomorrow
**Next:** 
- Partner: IBA Security + Sindh Madadgar 15 + Careem API
- Guardian badges → free rides for verified reporters
- Offline mode + Urdu voice + Vision AI for street photos

**Ask:** Vote for AmanRoute — because every student deserves to reach home safe.

**Closing line:** "Aman ka Route, AmanRoute se."

---
### Demo Video Checklist (90 sec)
0-10s Hook story, 10-40s Route check (unsafe vs safe), 40-60s SOS/FakeCall, 60-75s Heatmap/Community, 75-90s roadmap.sh + future

### Judge Questions - Answers
Q: Privacy? A: Anonymous reports, location only shared when SOS pressed, data stays in Pakistan, no login needed.
Q: Fake reports? A: 2+ confirmations needed, trust score for reporters, future: AI image verification.
Q: Business model? A: Free for students, B2B: Universities + ride apps pay for safety API, CSR grants.
