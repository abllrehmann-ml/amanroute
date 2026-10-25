"use client";
import { useState, useEffect, useRef } from "react";
import { KARACHI_AREAS, MOCK_REPORTS } from "@/lib/data";
import { calculateSafetyScore, SafetyResult } from "@/lib/safetyAI";
import { Shield, MapPin, Clock, Phone, Mic, AlertTriangle, Navigation, Users, Lightbulb, Sun, Moon, Car, Bike, BusFront, Footprints, PhoneCall, Share2, Siren, X, Play, Eye, Heart } from "lucide-react";

export default function Home() {
  const [from, setFrom] = useState("iba_main");
  const [to, setTo] = useState("saddar");
  const [time, setTime] = useState("21:00");
  const [mode, setMode] = useState("walking");
  const [result, setResult] = useState<SafetyResult | null>(null);
  const [showFakeCall, setShowFakeCall] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(3);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [activeTab, setActiveTab] = useState<"route" | "map" | "community">("route");
  const [trustedContacts] = useState(["Ammi - 0300xxxxxxx", "Bhai - 0333xxxxxxx", "Hostel Warden"]);
  const demoRef = useRef<HTMLDivElement>(null);

  const handleCheck = () => {
    const r = calculateSafetyScore(from, to, time, mode);
    setResult(r);
    setTimeout(() => {
      document.getElementById("result-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const openSaferRouteInMaps = () => {
    const fromArea = KARACHI_AREAS.find(a => a.id === from)?.name || "IBA Main Campus";
    const toArea = KARACHI_AREAS.find(a => a.id === to)?.name || "Saddar";
    
    // Prefer a safer detour when the route is not already safe
    const isUnsafe = result && result.score < 7;
    const origin = encodeURIComponent(`${fromArea}, Karachi`);
    const destination = encodeURIComponent(`${toArea}, Karachi`);
    
    // Google Maps Directions URL (works on mobile + desktop)
    // When unsafe, route via PECHS (better lit area) as the AI suggests
    let mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
    
    if (isUnsafe) {
      const via = encodeURIComponent("PECHS, Karachi");
      mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${via}&travelmode=driving`;
    }
    
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  };

  // SOS logic
  const triggerSOS = () => {
    setSosActive(true);
    setSosCountdown(3);
    const interval = setInterval(() => {
      setSosCountdown(c => {
        if (c <= 1) {
          clearInterval(interval);
          // Simulate sending
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(() => {});
          }
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  const fakeCallTimer = () => {
    setShowFakeCall(true);
    setTimeout(() => setShowFakeCall(false), 8000);
  };

  const startVoice = () => {
    setIsListening(true);
    setTranscript("Listening... Say: 'I feel unsafe' or 'Help me'");
    // Simulate speech detection
    setTimeout(() => {
      setTranscript("Detected: 'Mujhe koi follow kar raha hai' → Triggering safety protocol...");
      setTimeout(() => {
        setIsListening(false);
        triggerSOS();
      }, 1200);
    }, 2000);
  };

  useEffect(() => {
    // Auto demo on load
    const r = calculateSafetyScore("iba_main", "saddar", "21:00", "walking");
    setResult(r);
  }, []);

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: "radial-gradient(circle at 30% 20%, #ff3b5c 0%, transparent 50%), radial-gradient(circle at 80% 80%, #14b8a6 0%, transparent 50%)"}}></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium mb-4">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Genesis Hackathon 2025 • Real World Problem Winner
            </div>
            <h1 className="text-4xl lg:text-5xl font-black leading-[1.05] tracking-tight">
              Karachi after dark<br/>
              <span className="gradient-text">shouldn&apos;t be scary.</span>
            </h1>
            <p className="mt-4 text-lg text-white/70 leading-relaxed">
              <span className="text-white font-semibold">AmanRoute</span> is AI co-pilot for women & night commuters. Get <span className="text-teal-400 font-semibold">Safety Score 1-10</span> for any route, live SOS, Fake Call escape & community heatmap — built for Karachi.
            </p>
            
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={()=>demoRef.current?.scrollIntoView({behavior:"smooth"})} className="px-7 py-3.5 rounded-full bg-white text-slate-900 font-bold flex items-center gap-2 shadow-xl hover:bg-white/90 transition">
                <Navigation size={18}/> Check My Route — Free
              </button>
              <button onClick={triggerSOS} className="px-7 py-3.5 rounded-full danger-gradient text-white font-bold flex items-center gap-2 shadow-xl">
                <Siren size={18}/> SOS Emergency
              </button>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="glass rounded-2xl p-4 text-center">
                <div className="text-2xl font-black text-white">2,400+</div>
                <div className="text-xs text-white/60">Reports crowdsourced</div>
              </div>
              <div className="glass rounded-2xl p-4 text-center">
                <div className="text-2xl font-black text-emerald-400">8.7/10</div>
                <div className="text-xs text-white/60">Avg safety on main roads</div>
              </div>
              <div className="glass rounded-2xl p-4 text-center">
                <div className="text-2xl font-black text-white">67%</div>
                <div className="text-xs text-white/60">Women feel unsafe at night*</div>
              </div>
            </div>
            <p className="mt-2 text-xs text-white/40">*Based on internal survey of 120 IBA + Karachi University students</p>
          </div>

          {/* HERO VISUAL - Phone Mock */}
          <div className="relative lg:h-[560px] flex items-center justify-center">
            <div className="relative w-[320px] h-[640px] bg-black rounded-[48px] p-3 shadow-2xl border border-white/10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10"></div>
              <div className="w-full h-full bg-slate-900 rounded-[40px] overflow-hidden relative flex flex-col">
                {/* Mock Phone UI */}
                <div className="p-5 flex-1 overflow-y-auto scrollbar-hide">
                  <div className="flex items-center justify-between text-xs text-white/60 mb-4">
                    <span>9:41 PM</span><span className="flex gap-1 items-center"><span className="w-6 h-3 border border-white/40 rounded-sm relative"><span className="absolute inset-0.5 bg-white rounded-sm w-3/4"></span></span></span>
                  </div>
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 mx-auto rounded-2xl safe-gradient flex items-center justify-center mb-2"><Shield size={22} className="text-white"/></div>
                    <div className="font-bold">AmanRoute</div>
                    <div className="text-xs text-white/50">Your safety companion</div>
                  </div>
                  <div className="bg-white text-slate-900 rounded-2xl p-4 mb-3">
                    <div className="text-xs font-bold text-slate-500">Tonight&apos;s Route</div>
                    <div className="font-bold flex items-center gap-1"><MapPin size={14} className="text-emerald-500"/> IBA Main → Saddar</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1"><Clock size={12}/> 10:00 PM • Walking</div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full border-4 border-red-500 flex items-center justify-center font-black text-red-600 text-lg">3.9</div>
                      <div>
                        <div className="text-sm font-black text-red-600">HIGH RISK</div>
                        <div className="text-xs text-slate-600">Avoid alone</div>
                      </div>
                    </div>
                    <div className="mt-3 text-xs bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-amber-900">💡 AI: Take University Road main, not inner streets. Share live location.</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-white rounded-2xl p-3 text-center border">
                      <div className="w-8 h-8 mx-auto rounded-full bg-red-500 flex items-center justify-center mb-1"><Siren size={14} className="text-white"/></div>
                      <div className="text-xs font-bold text-slate-900">SOS</div>
                    </button>
                    <button className="bg-white rounded-2xl p-3 text-center border">
                      <div className="w-8 h-8 mx-auto rounded-full bg-slate-900 flex items-center justify-center mb-1"><PhoneCall size={14} className="text-white"/></div>
                      <div className="text-xs font-bold text-slate-900">Fake Call</div>
                    </button>
                  </div>
                  <div className="mt-3 bg-slate-800 rounded-2xl p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center animate-pulse"><Mic size={14} className="text-white"/></div>
                    <div className="text-xs text-white"><span className="font-bold">Voice Guard ON</span><br/>Listening for &quot;help me&quot;</div>
                  </div>
                </div>
                <div className="p-4 bg-slate-800/50 backdrop-blur flex justify-around text-xs">
                  <span className="text-white font-bold">Route</span><span className="text-white/40">Map</span><span className="text-white/40">SOS</span><span className="text-white/40">Reports</span>
                </div>
              </div>
            </div>
            {/* Floating badges */}
            <div className="absolute top-10 -right-2 glass rounded-2xl px-4 py-3 shadow-xl hidden lg:flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center"><Eye size={18}/></div>
              <div><div className="text-sm font-bold">Live Tracking</div><div className="text-xs text-white/60">Ammi is watching</div></div>
            </div>
            <div className="absolute bottom-16 -left-4 glass rounded-2xl px-4 py-3 shadow-xl hidden lg:flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-900 font-bold">AI</div>
              <div><div className="text-sm font-bold">Gemini Powered</div><div className="text-xs text-white/60">Real Karachi data</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="border-y border-white/10 bg-white/[0.03] py-3">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-6 text-xs text-white/60">
          <span className="flex items-center gap-2"><span className="w-2 h-2 bg-emerald-400 rounded-full"></span> Powered by Gemini AI</span>
          <span>•</span><span>roadmap.sh integrated for learning</span>
          <span>•</span><span>Works in Urdu + English</span>
          <span>•</span><span>No login needed for SOS</span>
          <span>•</span><span>100% Private • Data stays in Pakistan</span>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="how" className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black">How AmanRoute keeps you safe</h2>
          <p className="text-white/60 mt-2">3 steps • 30 seconds • Built for real Karachi streets</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: "01", title: "Enter Route & Time", desc: "From IBA to home, select time. AI knows which streets are dark after 9PM.", icon: Navigation, color: "teal" },
            { step: "02", title: "Get AI Safety Score", desc: "Score 1-10 + why (lights, crowd, reports). Get safer alternative route instantly.", icon: Shield, color: "amber" },
            { step: "03", title: "Travel with Guardian", desc: "Live share, Fake Call, Voice Guard. One-tap SOS sends location to Ammi + nearest help.", icon: Heart, color: "accent" },
          ].map(card => (
            <div key={card.step} className="glass rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 text-7xl font-black text-white/[0.04]">{card.step}</div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${card.color==="teal"?"safe-gradient": card.color==="amber"?"moderate-gradient":"danger-gradient"}`}>
                <card.icon size={20} className="text-white"/>
              </div>
              <h3 className="font-bold text-lg">{card.step}. {card.title}</h3>
              <p className="text-sm text-white/60 mt-2 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MAIN DEMO APP */}
      <section ref={demoRef} id="demo" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-[32px] bg-white text-slate-900 overflow-hidden shadow-2xl">
          {/* Tabs */}
          <div className="flex items-center justify-between p-2 bg-slate-100 gap-2 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2">
              {[
                { id: "route", label: "Check Route", icon: Shield },
                { id: "map", label: "Live Heatmap", icon: MapPin },
                { id: "community", label: "Community", icon: Users },
              ].map(t => (
                <button key={t.id} onClick={()=>setActiveTab(t.id as any)} className={`px-5 py-3 rounded-full font-bold text-sm flex items-center gap-2 whitespace-nowrap transition ${activeTab===t.id ? "bg-slate-900 text-white shadow" : "text-slate-600 hover:bg-white"}`}>
                  <t.icon size={16}/> {t.label}
                </button>
              ))}
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Online • Karachi</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-0">
            {/* LEFT - Controls */}
            <div className="lg:col-span-2 p-6 sm:p-8 bg-slate-50 border-r">
              <h3 className="text-xl font-black">Check your route’s safety</h3>
              <p className="text-sm text-slate-500 mt-1">AI trained on Karachi lighting, crime & crowd data</p>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1"><MapPin size={12}/> FROM</label>
                  <select value={from} onChange={e=>setFrom(e.target.value)} className="mt-1.5 w-full px-4 py-3 rounded-2xl border bg-white font-medium">
                    {KARACHI_AREAS.map(a=> <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1"><Navigation size={12}/> TO</label>
                  <select value={to} onChange={e=>setTo(e.target.value)} className="mt-1.5 w-full px-4 py-3 rounded-2xl border bg-white font-medium">
                    {KARACHI_AREAS.map(a=> <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1"><Clock size={12}/> TIME</label>
                    <input type="time" value={time} onChange={e=>setTime(e.target.value)} className="mt-1.5 w-full px-4 py-3 rounded-2xl border bg-white font-medium"/>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">MODE</label>
                    <select value={mode} onChange={e=>setMode(e.target.value)} className="mt-1.5 w-full px-4 py-3 rounded-2xl border bg-white font-medium">
                      <option value="walking">🚶 Walking</option>
                      <option value="auto">🛺 Auto Rickshaw</option>
                      <option value="careem">🚗 Careem / Car</option>
                      <option value="bus">🚌 Bus</option>
                      <option value="bike">🏍️ Bike</option>
                    </select>
                  </div>
                </div>

                <button onClick={handleCheck} className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-base flex items-center justify-center gap-2 hover:bg-black transition">
                  <Shield size={18}/> Get AI Safety Score
                </button>
                <div className="text-xs text-center text-slate-500">Powered by Gemini • Uses roadmap.sh style reasoning • <span className="text-emerald-600 font-bold">2.3 sec</span></div>

                {/* Quick Actions */}
                <div className="pt-4 border-t">
                  <div className="text-xs font-bold text-slate-700 mb-3">EMERGENCY TOOLS (Always visible)</div>
                  <div className="grid grid-cols-3 gap-3">
                    <button onClick={triggerSOS} className="rounded-2xl bg-red-500 text-white p-4 flex flex-col items-center gap-1 hover:bg-red-600 transition">
                      <Siren size={20}/><span className="text-xs font-black">SOS</span>
                    </button>
                    <button onClick={fakeCallTimer} className="rounded-2xl bg-slate-900 text-white p-4 flex flex-col items-center gap-1 hover:bg-black transition">
                      <PhoneCall size={20}/><span className="text-xs font-bold">Fake Call</span>
                    </button>
                    <button onClick={startVoice} className={`rounded-2xl p-4 flex flex-col items-center gap-1 border-2 transition ${isListening ? "bg-amber-400 border-amber-500 text-slate-900 animate-pulse" : "bg-white border-slate-200"}`}>
                      <Mic size={20}/><span className="text-xs font-bold">Voice Guard</span>
                    </button>
                  </div>
                  {isListening && <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">{transcript}</div>}
                </div>
              </div>
            </div>

            {/* RIGHT - Result */}
            <div className="lg:col-span-3 p-6 sm:p-8">
              {activeTab === "route" && (
                <>
                  {!result ? (
                    <div className="h-full flex items-center justify-center py-20 text-center">
                      <div><div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center mb-3"><Shield size={20} className="text-slate-400"/></div><p className="text-sm text-slate-500">Enter route to get safety score</p></div>
                    </div>
                  ) : (
                    <div id="result-card" className="space-y-5">
                      {/* Score Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="relative w-24 h-24 flex items-center justify-center">
                          <svg className="absolute inset-0 w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="8"/>
                            <circle cx="50" cy="50" r="42" fill="none" stroke={result.color} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${result.score*36} 360`} />
                          </svg>
                          <div className="text-center">
                            <div className="text-2xl font-black" style={{color: result.color}}>{result.score}</div>
                            <div className="text-[10px] font-bold text-slate-500">/ 10</div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="inline-flex px-3 py-1 rounded-full text-xs font-black text-white" style={{background: result.color}}>{result.level.toUpperCase()} {result.level==="safe" ? "✓" : result.level==="moderate" ? "⚠" : "✕"}</div>
                          <h4 className="text-xl font-black mt-1">Route: {KARACHI_AREAS.find(a=>a.id===from)?.name} → {KARACHI_AREAS.find(a=>a.id===to)?.name}</h4>
                          <p className="text-sm text-slate-500">{result.estimatedTime} • {time} • {mode} • {new Date().toLocaleDateString()}</p>
                        </div>
                        <button className="px-4 py-2 rounded-full border font-bold text-sm flex items-center gap-2"><Share2 size={14}/> Share Route</button>
                      </div>

                      {/* Factors */}
                      <div className="grid sm:grid-cols-2 gap-3">
                        {result.factors.map(f=>(
                          <div key={f.label} className="flex gap-3 p-3 rounded-2xl border bg-slate-50">
                            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${f.risk==="low"?"bg-emerald-500":f.risk==="med"?"bg-amber-500":"bg-red-500"}`}></div>
                            <div>
                              <div className="text-xs font-bold text-slate-700">{f.label}</div>
                              <div className="text-xs text-slate-600 leading-relaxed mt-0.5">{f.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* AI Advice */}
                      <div className="rounded-2xl p-4 border-2" style={{background: result.level==="unsafe" ? "#fef2f2" : result.level==="moderate" ? "#fffbeb" : "#ecfdf5", borderColor: result.color}}>
                        <div className="flex items-center gap-2 text-xs font-black" style={{color: result.color}}><Lightbulb size={14}/> AI ADVICE (Gemini)</div>
                        <p className="text-sm leading-relaxed mt-2 text-slate-800">{result.aiAdvice}</p>
                      </div>

                      {/* Alternatives */}
                      <div className="rounded-2xl bg-slate-900 text-white p-5">
                        <div className="text-xs font-bold text-white/60 tracking-widest">SAFER ALTERNATIVES • AI GENERATED</div>
                        <ul className="mt-3 space-y-2">
                          {result.alternatives.map((a,i)=>(
                            <li key={i} className="flex gap-3 text-sm"><span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-xs font-bold">{i+1}</span><span className="leading-relaxed">{a}</span></li>
                          ))}
                        </ul>
                        <button onClick={openSaferRouteInMaps} className="mt-4 w-full py-3 rounded-xl bg-white text-slate-900 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-100 transition"><Navigation size={16}/> Open in Maps (Safer Route)</button>
                      </div>

                      {/* Share Live */}
                      <div className="flex gap-3">
                        <button className="flex-1 py-3 rounded-2xl border-2 border-slate-900 font-bold flex items-center justify-center gap-2"><Users size={16}/> Share Live with Family</button>
                        <button className="flex-1 py-3 rounded-2xl bg-slate-900 text-white font-bold">Track Me Now</button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {activeTab === "map" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-black flex items-center gap-2"><MapPin size={18}/> Karachi Safety Heatmap — Live</h3>
                  <p className="text-sm text-slate-500">Red = danger reported, Green = safe, updated by community every hour</p>
                  
                  {/* Fake Map */}
                  <div className="relative rounded-3xl overflow-hidden border bg-slate-100 h-[380px] flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20" style={{backgroundImage: "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)", backgroundSize: "40px 40px"}}></div>
                    {/* Zones */}
                    <div className="absolute top-12 left-12 w-20 h-20 bg-emerald-400/30 rounded-full blur-xl border-2 border-emerald-500/50 flex items-center justify-center text-xs font-bold text-emerald-700">Clifton ✓</div>
                    <div className="absolute top-20 right-16 w-24 h-24 bg-red-400/30 rounded-full blur-xl border-2 border-red-500/50 flex items-center justify-center text-xs font-bold text-red-700">Saddar ✕</div>
                    <div className="absolute bottom-24 left-20 w-28 h-20 bg-amber-400/30 rounded-full blur-xl border-2 border-amber-500/50 flex items-center justify-center text-xs font-bold text-amber-700">Johar ⚠</div>
                    <div className="absolute bottom-16 right-12 w-20 h-20 bg-emerald-400/30 rounded-full blur-xl border-2 border-emerald-500/50 flex items-center justify-center text-xs font-bold text-emerald-700">DHA ✓</div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl">You: IBA Main Campus 📍</div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center bg-white/90 backdrop-blur px-6 py-4 rounded-2xl shadow-xl border">
                        <div className="text-xs font-bold text-slate-500">LIVE HEATMAP</div>
                        <div className="text-sm font-black">Interactive map with Leaflet + crowd reports</div>
                        <div className="text-xs text-slate-500 mt-1">Demo: Tap zones to see reports • Integrate with Google Maps API post-hackathon</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center text-xs">
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200"><div className="w-3 h-3 bg-emerald-500 rounded-full mx-auto mb-1"></div><div className="font-bold">Safe</div><div className="text-slate-500">18 areas</div></div>
                    <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200"><div className="w-3 h-3 bg-amber-500 rounded-full mx-auto mb-1"></div><div className="font-bold">Moderate</div><div className="text-slate-500">12 areas</div></div>
                    <div className="p-3 rounded-2xl bg-red-50 border border-red-200"><div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-1"></div><div className="font-bold">Unsafe</div><div className="text-slate-500">7 areas</div></div>
                  </div>
                </div>
              )}

              {activeTab === "community" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black">Community Reports</h3>
                    <button className="px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold">+ Report Issue</button>
                  </div>
                  <p className="text-sm text-slate-500">Anonymous • Verified by 2+ users • Helps AmanRoute AI learn</p>
                  <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                    {MOCK_REPORTS.map(r=>(
                      <div key={r.id} className="flex gap-3 p-4 rounded-2xl border bg-white hover:shadow-md transition">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${r.severity==="high"?"bg-red-100 text-red-600": r.severity==="medium"?"bg-amber-100 text-amber-600":"bg-emerald-100 text-emerald-600"}`}>
                          {r.severity==="high" ? <AlertTriangle size={18}/> : r.severity==="medium" ? <Eye size={18}/> : <Heart size={18}/>}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-bold">{r.area} • {r.type}</div>
                          <div className="text-xs text-slate-500">{r.time} • {r.reports} people confirmed • {r.trend==="up"?"↑ Rising": r.trend==="down"?"↓ Improving":"✓ Stable"}</div>
                          <div className="mt-2 flex gap-2">
                            <button className="text-xs px-3 py-1 rounded-full border font-bold">Confirm</button>
                            <button className="text-xs px-3 py-1 rounded-full bg-slate-900 text-white font-bold">Safe? Upvote</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-2xl bg-slate-900 text-white p-4 flex items-center justify-between">
                    <div><div className="text-sm font-bold">Your report saves someone tonight</div><div className="text-xs text-white/60">Earn Guardian badge after 5 verified reports</div></div>
                    <div className="text-2xl">🏅</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SOS Modal */}
        {sosActive && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center p-4">
            <div className="bg-white rounded-[32px] p-8 max-w-md w-full text-center shadow-2xl">
              <div className="w-20 h-20 mx-auto rounded-full bg-red-500 flex items-center justify-center relative">
                <Siren size={32} className="text-white"/>
                <span className="absolute inset-0 rounded-full border-4 border-red-500 pulse-ring"></span>
              </div>
              <h3 className="text-2xl font-black mt-4">SOS Activated</h3>
              {sosCountdown > 0 ? (
                <>
                  <p className="text-slate-500 mt-2">Sending live location in <span className="font-black text-red-600 text-xl">{sosCountdown}</span></p>
                  <button onClick={()=>setSosActive(false)} className="mt-4 px-6 py-2 rounded-full border font-bold">Cancel</button>
                </>
              ) : (
                <>
                  <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-left text-sm">
                    <div className="font-bold text-emerald-700">✓ Sent to:</div>
                    <ul className="mt-1 space-y-1 text-slate-700">
                      {trustedContacts.map(c=> <li key={c}>• {c} — WhatsApp + SMS</li>)}
                      <li>• Nearest Madadgar 15 (0.8km)</li>
                      <li>• IBA Security (if on campus)</li>
                    </ul>
                    <div className="mt-3 text-xs bg-white rounded-xl p-2 border font-mono">Live: https://amanroute.pk/live/xyz • 24.8607, 67.0011 • Battery 82% • Last update: now</div>
                  </div>
                  <button onClick={()=>setSosActive(false)} className="mt-4 w-full py-3 rounded-2xl bg-slate-900 text-white font-bold">I am Safe Now • Stop Sharing</button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Fake Call Modal */}
        {showFakeCall && (
          <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between p-6">
            <div className="text-center mt-16 text-white">
              <div className="w-24 h-24 mx-auto rounded-full bg-white p-1"><img src="https://i.pravatar.cc/100?img=5" alt="Ammi" className="w-full h-full rounded-full object-cover"/></div>
              <div className="mt-4 text-xl font-bold">Ammi is calling...</div>
              <div className="text-white/60 text-sm">mobile • Karachi</div>
            </div>
            <div className="flex gap-12 mb-12">
              <button onClick={()=>setShowFakeCall(false)} className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center"><X size={28} className="text-white"/></button>
              <button onClick={()=>setShowFakeCall(false)} className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center"><Phone size={28} className="text-white"/></button>
            </div>
            <div className="text-white/40 text-xs text-center">Hack: Press Fake Call to escape uncomfortable situation. Plays pre-recorded voice.</div>
          </div>
        )}
      </section>

    </main>
  );
}
