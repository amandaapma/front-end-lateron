import { useNavigate, Link } from "react-router-dom";
import React from 'react';
import logo2 from "../assets/logo2.jpg";
import fotoSiswa from "../assets/cebu.png";
import fotoLaptop from "../assets/celap.png";
import fotoWisuda from "../assets/cewi.png";
import lt from "../assets/lt.png";
import la from "../assets/la.png";
import lb from "../assets/lb.png";
import l2 from "../assets/logo2.jpg";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white antialiased selection:bg-[#2471A3]/20">
      <div 
        className="w-full relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #A8D3EE 0%, #DCEFFB 30%, #FFFFFF 70%)" }}>
        <div className="absolute top-[-60px] right-[-60px] w-[400px] h-[400px] rounded-full bg-[#56AEE5]/40 blur-[90px] pointer-events-none z-0" />
        <Navbar bgTransparent={true} />
        <HeroSectionContent />
      </div>

      <AboutSection />
      <WhySection />
      <SupportedTestsSection />
      <TestimonialSection />
      <CTAFooter />
    </div>
  );
}

function Navbar({ bgTransparent }) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <nav className={`flex items-center px-16 py-5 sticky top-0 z-50 transition-all ${bgTransparent ? 'bg-transparent' : 'bg-white/90 backdrop-blur-md border-b border-gray-100'}`}>
      <div className="shrink-0">
        <img 
          src={logo2} 
          alt="Lateron" 
          className="w-[100px] h-auto object-contain" 
          style={{ imageRendering: "auto" }}
        />
      </div>

      <div className="flex-1 flex items-center justify-end gap-6 text-[15px] text-[#7A9EB5] mr-14">
        <Link to="/dashboard" className="text-[#1B4F72] font-semibold">Home</Link>
        <span className="w-1 h-1 rounded-full bg-[#2571A3]" />
        <Link to="/generate" className="hover:text-[#1B4F72] transition-colors">Generate</Link>
        <span className="w-1 h-1 rounded-full bg-[#2571A3]/40" />
        <Link to="/my-roadmap" className="hover:text-[#1B4F72] transition-colors">My Roadmap</Link>
        <span className="w-1 h-1 rounded-full bg-[#2571A3]/40" />
        <Link to="/profile" className="hover:text-[#1B4F72] transition-colors">Profile</Link>
      </div>
    </nav>
  );
}

function HeroSectionContent() {
  const navigate = useNavigate();
  const roadmap = JSON.parse(localStorage.getItem("roadmap") || "{}");

  const stats = [
    { val: roadmap.targetScore || "-", label: "Target\nScore" },
    { val: roadmap.testType || "-", label: "Jenis\nTes" },
    { val: roadmap.testDate ? roadmap.testDate.split("-").reverse().join("/") : "-", label: "Tanggal\nTes" },
  ];

  return (
    <div className="px-16 pt-12 pb-24 flex justify-between items-center relative z-10 max-w-7xl mx-auto">
      {/* LEFT */}
      <div className="w-[44%]">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-white text-[14px] font-medium text-[#1B4F72] mb-6 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          Welcome to Lateron
        </div>
        <h1 className="text-[52px] font-bold text-[#1B4F72] leading-[1.15] mb-5 tracking-tight">
          Generate Roadmap<br />
          Belajar untuk Tes<br />
          Bahasa
        </h1>
        <p className="text-[15px] text-[#4A7A9B] mb-8 max-w-[400px] leading-relaxed">
          Atur targetmu kami buatkan roadmap belajarmu dan ukur progresmu.
        </p>
        <button
          onClick={() => navigate("/generate")}
          className="bg-[#1B4F72] text-white px-7 py-3 rounded-full text-[15px] font-semibold hover:bg-[#163f5c] transition-colors shadow-sm">
          Atur Target Sekarang
        </button>

        <div className="flex gap-12 mt-20">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-[30px] font-bold text-[#1B4F72] mb-1">{s.val}</p>
              <p className="text-[12px] text-[#4A7A9B] leading-snug whitespace-pre-line">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-[52%] relative h-[540px]">
        <div className="absolute top-[100px] left-0 w-[240px] h-[160px] rounded-[24px] overflow-hidden shadow-md z-10 bg-slate-100">
          <img 
            src={fotoSiswa} 
            alt="Mahasiswa" 
            className="w-full h-full object-cover" 
            style={{ imageRendering: "-webkit-optimize-contrast" }} 
          />
        </div>
        <div className="absolute top-[75px] left-[-15px] bg-white/80 backdrop-blur-md rounded-full border border-white/60 px-4 py-1.5 text-[#1B4F72] font-semibold text-[14px] z-20 shadow-sm">
          Set target
        </div>

        <div className="absolute top-0 right-0 w-[290px] h-[400px] rounded-[32px] overflow-hidden shadow-lg z-10 bg-slate-100">
          <img 
            src={fotoLaptop} 
            alt="Wanita Laptop" 
            className="w-full h-full object-cover" 
            style={{ imageRendering: "-webkit-optimize-contrast" }} 
          />
        </div>
        <div className="absolute top-[-15px] right-[40px] bg-white/80 backdrop-blur-md rounded-full border border-white/60 px-5 py-2 text-[#1B4F72] font-bold text-[16px] z-20 shadow-sm">
          Score Up+
        </div>

        <div className="absolute bottom-0 left-[80px] w-[250px] h-[270px] rounded-[32px] overflow-hidden shadow-xl z-20 bg-slate-100 border-4 border-white/40">
          <img 
            src={fotoWisuda} 
            alt="Wisudawati" 
            className="w-full h-full object-cover object-top" 
            style={{ imageRendering: "-webkit-optimize-contrast" }} 
          />
        </div>

        <div className="absolute bottom-[80px] left-[-30px] bg-white/40 backdrop-blur-md rounded-[20px] border border-white/50 p-4 z-30 shadow-lg">
          <p className="text-[#1B4F72] font-bold text-[12px] mb-2">Add your Skill</p>
          <div className="flex gap-1.5">
            <span className="bg-white/70 border border-white/60 text-[#1B4F72] text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs">Reading +</span>
            <span className="bg-white/70 border border-white/60 text-[#1B4F72] text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs">Speaking +</span>
          </div>
        </div>

        <div className="absolute bottom-[-10px] right-[60px] bg-white/70 backdrop-blur-md rounded-full border border-white/60 px-6 py-2 text-[#1B4F72] font-bold text-[15px] z-30 shadow-md">
          Learn Today
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <section className="w-full bg-white py-20 px-16 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto mb-20 select-none">
        <div className="flex items-center justify-between text-[22px] font-bold text-[#143F5E]/20 tracking-wide">
          <span className="opacity-40">TOEFL ITP</span>
          <span>IELTS</span>
          <span>CAE</span>
          <span>JLPT</span>
          <span>HSK</span>
          <span>TOPIK</span>
          <span>DELF</span>
          <span className="opacity-40">Goethe</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col items-start space-y-5">
          <span className="text-[14px] font-bold text-[#3498DB] tracking-wider uppercase">
            About Lateron
          </span>
          <h2 className="text-[36px] font-bold text-[#143F5E] leading-[1.25] max-w-md">
            Your Smarter Way to Prepare for<br />Language Tests
          </h2>
          <div className="space-y-4 text-[#5A92B5] text-[14px] leading-relaxed max-w-xl text-justify">
            <p>
              Lateron helps learners build personalized study roadmaps for
              language proficiency tests. We combine goal setting, placement
              tests, and progress tracking to create a more effective and
              structured learning experience.
            </p>
            <p>
              Whether you're preparing for IELTS, TOEFL, JLPT, TOPIK, or other
              language exams, Lateron helps you stay focused, consistent, and
              confident on your journey.
            </p>
          </div>
          {/* Learn More About Us button removed per request */}
        </div>

        <div className="relative w-full h-[400px] flex items-center justify-center">
          <div className="absolute w-[240px] h-[240px] bg-[#3498DB]/30 rounded-full blur-[50px] pointer-events-none z-0 right-[20%] top-[35%]" />

          <div className="absolute left-6 top-[35%] z-10 bg-white/70 backdrop-blur-md border border-white/60 shadow-lg shadow-blue-900/5 rounded-[22px] p-6 w-[210px] h-[100px] flex items-center">
            <h3 className="text-[18px] font-bold text-[#2471A3] leading-snug">
              Personalized Learning
            </h3>
          </div>

          <div className="absolute right-12 top-[12%] z-10 bg-white/60 backdrop-blur-md border border-white/50 shadow-md shadow-blue-900/5 rounded-[22px] p-6 w-[210px] h-[100px] flex items-center">
            <h3 className="text-[18px] font-bold text-[#2471A3]/80 leading-snug">
              Structured Progress
            </h3>
          </div>

          <div className="absolute right-8 bottom-[15%] z-20 bg-white/75 backdrop-blur-lg border border-white/70 shadow-xl shadow-blue-900/10 rounded-[22px] p-6 w-[230px] h-[110px] flex items-center">
            <h3 className="text-[18px] font-bold text-[#143F5E] leading-snug">
              Test-Focused Preparation
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  const features = [
    { title: "Personalized Learning Path", desc: "A roadmap based on your goals and level." },
    { title: "Accurate Placement Test", desc: "Know your current language level quickly." },
    { title: "Progress Tracking", desc: "Track your learning progress easily." },
    { title: "Test-Focused Preparation", desc: "Focused preparation for your language test." },
  ];
  const steps = [
    "Select the language test you want to prepare for.",
    "Decide the score or level you want to achieve for your exam.",
    "Choose your start date and your test date to create a realistic study plan.",
    "Follow your personalized roadmap and study step by step.",
    "Monitor your improvement and stay on track until test day.",
  ];

  return (
    <section className="px-16 py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        <p className="text-[#3498DB] font-bold text-[13px] uppercase tracking-wider mb-2">Why Choose Us</p>
        <h2 className="text-[34px] font-bold text-[#143F5E] mb-10">Why Learn With Us?</h2>
        <div className="grid grid-cols-4 gap-5 mb-20">
          {features.map((f, i) => (
            <div key={i} className="bg-[#EBF3F9] rounded-[22px] p-7">
              <div className="w-9 h-9 rounded-full border border-[#5A92B5] flex items-center justify-center mb-8 bg-white/60">
                <svg className="w-4 h-4 text-[#1A4D74]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-[16px] font-bold text-[#143F5E] mb-2 leading-snug">{f.title}</h3>
              <p className="text-[13px] text-[#5A92B5]">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-14 items-center">
          <div className="w-[50%] h-[340px] rounded-[28px] bg-gradient-to-br from-[#1E293B] to-[#0F172A] flex items-center justify-center relative overflow-hidden shadow-xl">
            <div className="w-14 h-14 rounded-full bg-[#2471A3] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform z-10">
              <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <div className="w-[46%]">
            <p className="text-[#3498DB] font-bold text-[13px] uppercase tracking-wider mb-2">How It Works</p>
            <h2 className="text-[32px] font-bold text-[#143F5E] mb-7">Simple Steps to Get Started</h2>
            <div className="flex flex-col gap-4">
              {steps.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#2471A3] flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-[14px] text-[#5A92B5]">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SupportedTestsSection() {
  return (
    <section className="px-16 py-12 bg-white">
      <div
        className="rounded-[40px] overflow-hidden relative flex items-center max-w-7xl mx-auto"
        style={{
          background: "linear-gradient(135deg, #BCE1F4 0%, #54A3CE 55%, #1B5E8C 100%)",
          minHeight: "440px",
        }}
      >
        <div className="w-[40%] px-14 py-14">
          <h2 className="text-[38px] font-bold text-[#143F5E] leading-[1.2] mb-4">
            Supported<br />Language Tests
          </h2>
          <p className="text-[14px] text-[#143F5E]/80 font-medium leading-relaxed max-w-[260px]">
            Prepare for popular international language proficiency tests with confidence.
          </p>
        </div>

        <div className="w-[60%] relative h-[440px]">
          <div className="absolute top-6 right-14 w-[300px] h-[150px] rounded-[22px] overflow-hidden shadow-lg bg-slate-100">
            <img 
              src={lt} 
              alt="Study 1" 
              className="w-full h-full object-cover object-center" 
              style={{ imageRendering: "-webkit-optimize-contrast" }}
            />
          </div>
          <div className="absolute top-[120px] right-4 w-[400px] h-[220px] rounded-[28px] overflow-hidden shadow-xl border border-white/20 bg-slate-100">
            <img 
              src={la} 
              alt="Study 2" 
              className="w-full h-full object-cover object-center" 
              style={{ imageRendering: "-webkit-optimize-contrast" }}
            />
          </div>
          <div className="absolute bottom-6 right-20 w-[300px] h-[150px] rounded-[22px] overflow-hidden shadow-lg bg-slate-100">
            <img 
              src={lb} 
              alt="Study 3" 
              className="w-full h-full object-cover object-center" 
              style={{ imageRendering: "-webkit-optimize-contrast" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  return (
    <section className="px-16 py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[34px] font-bold text-[#143F5E] text-center mb-3">What Our Learners Say</h2>
        <p className="text-[14px] text-[#5A92B5] text-center max-w-[580px] mx-auto mb-14 leading-relaxed">
          Hear from learners who successfully improved their language test preparation with Lateron. Their journeys show how structured roadmaps can make learning more effective and less overwhelming
        </p>

        <div className="bg-[#F1F6F9] rounded-[32px] p-8 flex gap-6 max-w-[880px] mx-auto">
          <div className="flex-1 bg-white rounded-[22px] p-7 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-[20px]">★</span>)}
              </div>
              <p className="text-[14px] text-[#5A92B5] italic mb-6 leading-relaxed">
                "The roadmap made my study plan much clearer. I knew exactly what to focus on each week, and I finally reached my target IELTS score."
              </p>
            </div>
            <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
              <div className="w-10 h-10 rounded-full bg-[#BFD9EA]" />
              <div>
                <p className="text-[14px] font-bold text-[#143F5E]">Sarah</p>
                <p className="text-[12px] text-[#5A92B5]">IELTS Candidate</p>
              </div>
            </div>
          </div>

          <div className="w-[200px] bg-[#E5EEF4] rounded-[22px] p-7 flex flex-col justify-center gap-6">
            <div>
              <p className="text-[40px] font-black text-[#143F5E] leading-none mb-1">92%</p>
              <p className="text-[12px] text-[#5A92B5] font-semibold">User Satisfaction</p>
            </div>
            <div>
              <p className="text-[40px] font-black text-[#143F5E] leading-none mb-1">85%</p>
              <p className="text-[12px] text-[#5A92B5] font-semibold">Learning Efficiency Improvement</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          <span className="w-2 h-2 rounded-full bg-[#2471A3]" />
          <span className="w-2 h-2 rounded-full bg-gray-300" />
          <span className="w-2 h-2 rounded-full bg-gray-300" />
        </div>
      </div>
    </section>
  );
}

function CTAFooter() {
  const navigate = useNavigate();

  // Mapping string nama rute untuk konversi otomatis pada bagian footer links
  const routeMapping = {
    "Home": "/",
    "About Us": "/about",
    "Roadmap": "/my-roadmap",
    "Dashboard": "/dashboard",
    "Language Test": "/test-info",
    "Progress Tracker": "/tracker",
    "Contact": "/contact",
    "FAQ": "/faq"
  };

  return (
    <>
      <section className="px-16 py-10 bg-white">
        <div
          className="rounded-[32px] py-20 text-center max-w-7xl mx-auto"
          style={{ background: "linear-gradient(135deg, #E2F1FA 0%, #A9D5EF 100%)" }}
        >
          <h2 className="text-[36px] font-bold text-[#143F5E] mb-3">Start Preparing Smarter Today</h2>
          <p className="text-[14px] text-[#5A92B5] mb-8 max-w-[440px] mx-auto">
            Your target score is closer than you think. Let us help you build the right roadmap.
          </p>
        <button
          onClick={() => navigate("/generate")}
          className="bg-[#2471A3] text-white px-8 py-3.5 rounded-full text-[14px] font-semibold hover:bg-[#1F618D] transition-colors shadow-md">
          Generate My Roadmap
        </button>
        </div>
      </section>

      <footer className="px-16 pt-14 pb-8 bg-[#EBF2F7]">
        <div className="flex justify-between mb-10 max-w-7xl mx-auto">
          <div className="w-[30%]">
            <img 
              src={l2} 
              alt="Lateron" 
              className="w-[90px] h-auto object-contain mb-4" 
              style={{ imageRendering: "auto" }}
            />
            <p className="text-[13px] text-[#5A92B5] leading-relaxed">
              Helping learners achieve their language goals with personalized roadmaps and smarter preparation.
            </p>
          </div>
          <div>
            <p className="text-[14px] font-bold text-[#143F5E] mb-4">Quick Links</p>
            {["Home", "About Us", "Roadmap", "Dashboard"].map((l) => (
              <span key={l} className="block text-[13px] text-[#5A92B5] mb-2.5 opacity-70 cursor-default">{l}</span>
            ))}
          </div>
          <div>
            <p className="text-[14px] font-bold text-[#143F5E] mb-4">Support</p>
            {["Language Test", "Progress Tracker", "Contact", "FAQ"].map((l) => (
              <span key={l} className="block text-[13px] text-[#5A92B5] mb-2.5 opacity-70 cursor-default">{l}</span>
            ))}
          </div>
        </div>
        <div className="border-t border-slate-300/40 pt-6">
          <p className="text-center text-[12px] text-[#5A92B5]">
            © 2026 Lateron. All Rights Reserved. Your Language Learning Partner.
          </p>
        </div>
      </footer>
    </>
  );
}