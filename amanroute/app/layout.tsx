import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AmanRoute — Safe Routes for Karachi",
  description: "AI-powered safe commute for women & night commuters in Karachi. Safety Score, Live SOS, Fake Call, Heatmap.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl safe-gradient flex items-center justify-center font-black text-white">A</div>
              <div>
                <div className="font-bold text-white leading-none">AmanRoute</div>
                <div className="text-xs text-white/50 -mt-0.5">Safe Karachi • Genesis Hackathon</div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <a href="#demo" className="text-white/70 hover:text-white">Live Demo</a>
              <a href="#how" className="text-white/70 hover:text-white">How it Works</a>
              <a href="#roadmap" className="text-white/70 hover:text-white">roadmap.sh</a>
              <a href="https://github.com" className="px-4 py-2 rounded-full bg-white text-slate-900 font-semibold text-sm">View GitHub</a>
            </div>
            <a href="#demo" className="md:hidden px-4 py-2 rounded-full bg-white text-slate-900 font-bold text-sm">Try Now</a>
          </div>
        </nav>
        {children}
        <footer className="border-t border-white/10 py-8 mt-12 bg-slate-950">
          <div className="max-w-7xl mx-auto px-6 text-center text-white/50 text-sm">
            <p>Built for CSS IBA Genesis 2025 • Theme: Real World Problem • Powered by roadmap.sh & Gemini AI • Open to IBA Students</p>
            <p className="mt-2">Made with ❤️ for safer Karachi — Team AmanRoute</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
