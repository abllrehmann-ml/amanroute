// Karachi area safety base scores (1-10, 10 safest) - Mock for demo, replace with real crowd data
export const KARACHI_AREAS = [
  { id: "clifton", name: "Clifton", baseScore: 8.2, lighting: 9, police: 8 },
  { id: "dha", name: "DHA Phase 6", baseScore: 8.5, lighting: 9, police: 8.5 },
  { id: "gulshan", name: "Gulshan-e-Iqbal", baseScore: 6.8, lighting: 6, police: 6 },
  { id: "johar", name: "Gulistan-e-Johar", baseScore: 6.5, lighting: 5.5, police: 5.8 },
  { id: "saddar", name: "Saddar", baseScore: 4.2, lighting: 4, police: 5 },
  { id: "korangi", name: "Korangi", baseScore: 5.0, lighting: 4.5, police: 5 },
  { id: "lyari", name: "Lyari", baseScore: 3.8, lighting: 3.5, police: 4 },
  { id: "north_nazimabad", name: "North Nazimabad", baseScore: 5.8, lighting: 5, police: 5.5 },
  { id: "orangi", name: "Orangi Town", baseScore: 4.5, lighting: 4, police: 4.2 },
  { id: "malir", name: "Malir Cantt", baseScore: 7.5, lighting: 7, police: 8 },
  { id: "fb_area", name: "FB Area", baseScore: 6.2, lighting: 6, police: 5.8 },
  { id: "bahadurabad", name: "Bahadurabad", baseScore: 6.9, lighting: 7, police: 6.5 },
  { id: "pechs", name: "PECHS", baseScore: 7.2, lighting: 7.5, police: 6.8 },
  { id: "shaheed_millat", name: "Shah Faisal Colony", baseScore: 5.2, lighting: 5, police: 5 },
  { id: "iba_city", name: "IBA City Campus (Saddar)", baseScore: 4.5, lighting: 5, police: 6 },
  { id: "iba_main", name: "IBA Main Campus (University Road)", baseScore: 6.8, lighting: 6, police: 6 },
];

export const MOCK_REPORTS = [
  { id: 1, area: "Saddar", type: "Poor Lighting", time: "10:30 PM", reports: 23, trend: "up", lat: 24.861, lng: 67.009, severity: "high" },
  { id: 2, area: "Gulistan-e-Johar Block 13", type: "Snatching Reported", time: "Yesterday 11 PM", reports: 12, trend: "down", lat: 24.92, lng: 67.12, severity: "high" },
  { id: 3, area: "North Nazimabad", type: "Safe - Police Patrolling", time: "Today 9 PM", reports: 8, trend: "safe", lat: 24.93, lng: 67.04, severity: "safe" },
  { id: 4, area: "Clifton Teen Talwar", type: "Well Lit & Crowded", time: "Today 8 PM", reports: 15, trend: "safe", lat: 24.813, lng: 67.032, severity: "safe" },
  { id: 5, area: "Korangi Crossing", type: "Isolated After 10PM", time: "2 hours ago", reports: 18, trend: "up", lat: 24.83, lng: 67.12, severity: "medium" },
  { id: 6, area: "IBA Main Campus Road", type: "Students: Safe with Friends", time: "Today 7 PM", reports: 5, trend: "safe", lat: 24.92, lng: 67.11, severity: "medium" },
];

export const TIME_RISK: Record<string, number> = {
  "06:00": 0, "09:00": 0, "12:00": 0, "15:00": 0, "18:00": 1, "21:00": 2.5, "23:00": 4, "02:00": 5
};

export function getTimePenalty(timeStr: string) {
  const hour = parseInt(timeStr.split(":")[0]);
  if (hour >= 6 && hour < 18) return 0;
  if (hour >= 18 && hour < 21) return 1.5;
  if (hour >= 21 && hour < 24) return 3;
  return 4.5; // 12am-6am
}
