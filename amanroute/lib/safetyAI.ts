import { KARACHI_AREAS, getTimePenalty } from "./data";

export type SafetyResult = {
  score: number; // 1-10
  level: "safe" | "moderate" | "unsafe";
  color: string;
  factors: { label: string; value: string; risk: "low" | "med" | "high" }[];
  aiAdvice: string;
  alternatives: string[];
  estimatedTime: string;
};

export function calculateSafetyScore(fromId: string, toId: string, time: string, mode: string): SafetyResult {
  const from = KARACHI_AREAS.find(a => a.id === fromId) || KARACHI_AREAS[0];
  const to = KARACHI_AREAS.find(a => a.id === toId) || KARACHI_AREAS[1];
  
  const avgBase = (from.baseScore + to.baseScore) / 2;
  const timePenalty = getTimePenalty(time);
  const modeBonus = mode === "careem" ? 0.8 : mode === "auto" ? 0.3 : mode === "bus" ? -0.5 : 0; // walking lowest
  const lightingAvg = (from.lighting + to.lighting) / 2;
  const lightingPenalty = lightingAvg < 5 ? 1.2 : 0;

  let raw = avgBase - timePenalty - lightingPenalty + modeBonus;
  // clamp 1-10
  let score = Math.max(1, Math.min(10, Math.round(raw * 10) / 10));

  let level: SafetyResult["level"] = score >= 7 ? "safe" : score >= 4.5 ? "moderate" : "unsafe";
  let color = level === "safe" ? "#14b8a6" : level === "moderate" ? "#f59e0b" : "#ff3b5c";

  const hour = parseInt(time.split(":")[0]);
  const isNight = hour >= 20 || hour <= 5;

  const factors: SafetyResult["factors"] = [
    { label: "Lighting", value: lightingAvg >= 7 ? "Well-lit main roads" : lightingAvg >= 5 ? "Mixed lighting" : "Poorly lit streets reported", risk: lightingAvg >=7 ? "low" : lightingAvg >=5 ? "med" : "high" },
    { label: "Crowd & Activity", value: isNight && to.baseScore < 6 ? "Isolated after 9PM, fewer shops open" : "Active area with shops/traffic", risk: isNight && to.baseScore <6 ? "high" : "low" },
    { label: "Recent Reports", value: to.baseScore < 5 ? `23 people flagged issues near ${to.name} this week` : `No major incidents in ${to.name} today`, risk: to.baseScore <5 ? "high" : "low" },
    { label: "Police Presence", value: to.police >=7 ? "Regular patrolling" : "Limited patrolling after 10PM", risk: to.police >=7 ? "low":"med" },
  ];

  const aiAdvice = generateAIAdvice(score, from.name, to.name, time, isNight, mode);
  const alternatives = generateAlternatives(from.name, to.name, score, isNight);
  const estimatedTime = `${12 + Math.floor(Math.random()*25)} min via safest route`;

  return { score, level, color, factors, aiAdvice, alternatives, estimatedTime };
}

function generateAIAdvice(score: number, from: string, to: string, time: string, isNight: boolean, mode: string): string {
  if (score >= 7) {
    return `This route from ${from} to ${to} at ${time} is considered SAFE. Stick to main roads (Shahrah-e-Faisal / University Road). Keep location sharing ON with a trusted contact. ${mode === 'walking' ? 'Walking is okay, but prefer a rickshaw after 10PM.' : 'Your transport choice is good for this time.'} AmanRoute will live-track you till you reach.`;
  }
  if (score >= 4.5) {
    return `MODERATE RISK for ${time}. The route passes through some poorly lit patches near ${to}. Avoid inner streets and mobile phone use while walking. Take a Careem/Auto instead of walking alone. Share live location with family. If you feel followed, use the Fake Call button instantly.`;
  }
  return `HIGH RISK - Avoid this route alone at ${time}, especially via ${to}. Strongly recommend: 1) Change time to before 8PM if possible, 2) Take official Careem/Bykea with number plate sharing, 3) Travel with a companion. Tap SOS if you feel unsafe - your live location will be sent to 3 trusted contacts + nearest police station data.`;
}

function generateAlternatives(from: string, to: string, score: number, isNight: boolean): string[] {
  if (score >=7) return [
    `Main Road Priority: Take Shahrah-e-Faisal → ${to} (better lights, +1.2 safety)`,
    `Share Live Location: Auto-share with Ammi/Trusted contact for this trip`,
  ];
  return [
    `Safer Detour: ${from} → PECHS → Shaheed-e-Millat → ${to} (+1.8 safety, +6 min) - Better lit`,
    `Transport Switch: Change from Walking to Auto/Careem (+1.5 safety after 9PM)`,
    `Time Shift: Leave at 6:30 PM instead of 10 PM (+2.5 safety) - Markets active`,
  ];
}

// For the pitch: Show how this would call Gemini
export const GEMINI_PROMPT_EXAMPLE = `
You are AmanRoute Safety AI. Given: FROM={from}, TO={to}, TIME={time}, MODE={mode}
Karachi context: {area data}. Return JSON: {score:1-10, factors:[], advice:"", alternatives:[]}
Use real Karachi crime patterns, lighting, time-of-day risk. Be concise, empathetic, actionable.
`;
