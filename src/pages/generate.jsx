import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logoLateron from '../assets/logo2.jpg'; // Mengimpor gambar logo dari folder assets kamu

import basicRoadmap from '../data/roadmap/basic';
import intermediateRoadmap from '../data/roadmap/intermediate';
import expertRoadmap from '../data/roadmap/expert';

const normalizeTestType = (raw) => {
  const v = (raw || '').toString().trim();
  if (!v) return v;
  // Samakan key dengan yang dipakai MyRoadmap/Quiz
  // Saat ini DI generate kamu pilih "TOEFL ITP" tapi file roadmap key-nya "TOEFL"
  if (v.toUpperCase() === 'TOEFL ITP' || v.toUpperCase() === 'TOEFL') return 'TOEFL';
  return v.toUpperCase() === 'IELTS' ? 'IELTS' : v;
};

const getWeekLabel = (weekNumber) => `Minggu ${weekNumber}`;

const Generate = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);

  const [formData, setFormData] = useState({
    testType: 'IELTS',
    currentLevel: 'Basic',
    targetScore: '7.0',
    targetPurpose: 'For Education',
    startDate: '2026-05-06',
    testDate: '2026-07-06',
    dailyStudyTime: '1 Jam',
    studyDaysPerWeek: '5 days'
  });

  // Helper untuk mengubah string date format HTML '2026-05-06' menjadi tulisan indah di UI
  const formatReadableDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleNext = () => {
    if (activeStep < 5) setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  const getUserEmail = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      return user?.email || "";
    } catch {
      return "";
    }
  };

  const emailKey = getUserEmail() ? encodeURIComponent(getUserEmail()) : "guest";

  const getRoadmapKey = (testType) => `roadmap_${emailKey}_${testType}`;
  const getRoadmapMetaKey = () => `roadmap_meta_${emailKey}`;

  const computeDuration = () => {
    if (!formData.startDate || !formData.testDate) return "–";
    const start = new Date(formData.startDate);
    const end = new Date(formData.testDate);
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return "–";
    if (diffDays < 7) return `${diffDays} Hari`;
    const weeks = Math.round(diffDays / 7);
    if (weeks < 5) return `${weeks} Minggu`;
    const months = Math.round(diffDays / 30);
    return `${months} Bulan`;
  };

const getRoadmapByLevel = (level, testType) => {
  const key = normalizeTestType(testType);
  switch (level) {
    case "Basic":
      return basicRoadmap[key] || [];
    case "Intermediate":
      return intermediateRoadmap[key] || [];
    case "Expert":
      return expertRoadmap[key] || [];
    default:
      return [];
  }
};

  const handleGenerateRoadmap = () => {
    const userEmail = getUserEmail();
    if (!userEmail) {
      alert("Silakan login dulu");
      return;
    }

    const normalizedTestType = normalizeTestType(formData.testType);

    const meta = {
      testType: normalizedTestType,
      currentLevel: formData.currentLevel,
      targetScore: formData.targetScore,
      targetPurpose: formData.targetPurpose,
      startDate: formData.startDate,
      testDate: formData.testDate,
      dailyStudyTime: formData.dailyStudyTime,
      studyDaysPerWeek: formData.studyDaysPerWeek,
    };

    // simpan metadata roadmap per user
    localStorage.setItem(getRoadmapMetaKey(), JSON.stringify(meta));

    // juga simpan versi global (dipakai UI dashboard/profile yang masih baca key "roadmap")
    localStorage.setItem("roadmap", JSON.stringify(meta));

    // Bangun roadmap sesuai struktur yang dibaca MyRoadmap/Quiz:
    // [{ id, weekLabel, title, desc, progress, days: [{id,label,title,description,points,formula,examples,completed}] }]
    const roadmapFlat = getRoadmapByLevel(formData.currentLevel, normalizedTestType);
    if (!roadmapFlat || roadmapFlat.length === 0) {
      alert('Roadmap template tidak ditemukan untuk test type/level ini');
      return;
    }

    const weeksMap = new Map();
    for (const item of roadmapFlat) {
      const weekId = item.week;
      if (!weeksMap.has(weekId)) {
        weeksMap.set(weekId, {
          id: weekId,
          weekLabel: getWeekLabel(weekId),
          title: `${normalizedTestType} - Week ${weekId}`,
          desc: `Rangkuman materi ${normalizedTestType} untuk ${getWeekLabel(weekId)} (${formData.currentLevel}).`,
          progress: 0,
          days: [],
        });
      }
      const weekObj = weeksMap.get(weekId);
      weekObj.days.push({
        id: item.day,
        label: `Hari ${item.day}`,
        title: item.title,
        description: `Kamu akan mempelajari materi: ${item.title}.`,
        points: [
          `Fokus materi: ${item.skill} (${item.level}).`,
          `Praktik konsep dengan soal sesuai jenis harian.`,
          `Cek pemahaman untuk siap quiz hari ini.`,
        ],
        formula: `Gunakan rumus/konsep dari materi harian: ${item.title}.`,
        examples: [`Contoh penerapan: ${item.title} dalam konteks latihan ${normalizedTestType}.`],
        completed: false,
      });
    }

    const roadmapWeeks = Array.from(weeksMap.values())
      .sort((a, b) => a.id - b.id)
      .map((w) => ({
        ...w,
        days: w.days.sort((a, b) => a.id - b.id),
      }));

    const existingRoadmap = localStorage.getItem(getRoadmapKey(normalizedTestType));

    // Kalau roadmap lama kosong (array), refresh dengan hasil generate baru.
    // Ini mencegah kasus "sudah pernah generate tapi isinya []".
    let shouldPersist = !existingRoadmap;
    try {
      const parsedExisting = existingRoadmap ? JSON.parse(existingRoadmap) : null;
      shouldPersist = !parsedExisting || (Array.isArray(parsedExisting) && parsedExisting.length === 0);
    } catch {
      shouldPersist = true;
    }

    if (shouldPersist) {
      localStorage.setItem(getRoadmapKey(normalizedTestType), JSON.stringify(roadmapWeeks));
    }

    navigate('/my-roadmap');
  };

  const steps = [
    { id: 1, label: 'Language Test' },
    { id: 2, label: 'Target Score' },
    { id: 3, label: 'Study Timeline' },
    { id: 4, label: 'Study Preferences' },
    { id: 5, label: 'Generate Roadmap' },
  ];

  return (
    <div className="h-screen w-screen bg-white font-sans flex flex-col justify-between overflow-hidden text-[#1F384C]">
      
      {/* NAVBAR (KINI BAGIAN KANAN DIISI UTK BUTTON NAVBAR, TENGAH KOSONG) */}
      <nav className="w-full bg-white border-b border-gray-100 px-16 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <img 
            src={logoLateron} 
            alt="Lateron Logo" 
            className="h-9 object-contain" 
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.insertAdjacentHTML('afterend', '<div class="text-[#2979BA] font-bold text-xl flex items-center gap-1"><span class="text-2xl">⌊</span>Lateron</div>');
            }}
          />
        </div>

        {/* Tengah dikosongkan total */}
        <div></div>

        {/* Menu Navigasi ditaruh rapat di kanan menggantikan Login / Get Started */}
        <div className="flex items-center gap-7 text-sm font-medium text-gray-500">
          <Link to="/dashboard" className="hover:text-[#2979BA] transition-colors">Home</Link>
          <span className="text-gray-300">•</span>
          <span className="text-[#2979BA] font-semibold">Generate</span>
          <span className="text-gray-300">•</span>
          <Link to="/my-roadmap" className="hover:text-[#2979BA] transition-colors">My Roadmap</Link>
          <span className="text-gray-300">•</span>
          <Link to="/profile" className="hover:text-[#2979BA] transition-colors">Profile</Link>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <div className="max-w-6xl w-full mx-auto px-16 py-6 flex flex-col flex-grow justify-start overflow-hidden">
        <div>
          <h1 className="text-[26px] font-bold text-[#1F384C] tracking-tight">Set Up Your Learning Roadmap</h1>
          <p className="text-gray-400 text-[14px] mt-1">Tell us your goals and schedule so we can create the best study plan for your language test.</p>
        </div>

        {/* WORKSPACE AREA */}
        <div className="flex mt-8 gap-16 items-stretch flex-grow overflow-hidden mb-4">
          
          {/* SIDEBAR NAVIGATION (KIRI) */}
          <div className="w-1/4 flex flex-col gap-1 border-r border-gray-100 pr-8 justify-start pt-2 shrink-0">
            {steps.map((step) => {
              const isActive = activeStep === step.id;
              const isPast = step.id < activeStep;
              return (
                <button
                  key={step.id}
                  disabled={step.id > activeStep}
                  onClick={() => setActiveStep(step.id)}
                  className={`text-left py-3 px-5 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#2979BA] text-white shadow-sm font-semibold' 
                      : isPast 
                        ? 'text-gray-400 hover:bg-slate-50' 
                        : 'text-gray-300 cursor-not-allowed'
                  }`}
                >
                  {step.label}
                </button>
              );
            })}
          </div>

          {/* COMPONENT FORM (KANAN) */}
          <div className="w-3/4 flex flex-col justify-start pl-4 py-2 overflow-hidden">
            
            <div className="space-y-6 flex-grow">
              {/* STEP 1: Language Test */}
              {activeStep === 1 && (
                <div className="flex flex-col gap-5">
                  <div>
                    <label className="block text-[14px] font-bold text-gray-700 mb-2">Select Test Type</label>
                    <div className="relative">
                      <select 
                        value={formData.testType}
                        onChange={(e) => setFormData({...formData, testType: e.target.value})}
                        className="w-full p-3.5 border border-gray-200 rounded-2xl bg-[#EDF4FF]/40 text-[#1F384C] font-medium appearance-none focus:outline-none focus:border-[#2979BA] text-[15px]"
                      >
                        <option value="IELTS">IELTS</option>
                        <option value="TOEFL ITP">TOEFL ITP</option>
                        <option value="JLPT">JLPT</option>
                        <option value="HSK">HSK</option>
                        <option value="TOPIK">TOPIK</option>
                        <option value="CAE">CAE</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#2979BA]">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                    <span className="text-[12px] text-gray-400 mt-1.5 block">Choose your language proficiency test</span>
                  </div>

                  <div>
                    <label className="block text-[14px] font-bold text-gray-700 mb-2">Current Skill Level</label>
                    <div className="relative">
                      <select 
                        value={formData.currentLevel}
                        onChange={(e) => setFormData({...formData, currentLevel: e.target.value})}
                        className="w-full p-3.5 border border-[#2979BA]/40 rounded-2xl bg-[#EDF4FF]/50 text-[#1F384C] font-medium appearance-none focus:outline-none focus:border-[#2979BA] text-[15px]"
                      >
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Expert</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#2979BA]">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                    <span className="text-[12px] text-gray-400 mt-1.5 block">Tell us your current language level.</span>
                  </div>
                </div>
              )}

              {/* STEP 2: Target Score */}
              {activeStep === 2 && (
                <div className="flex flex-col gap-5">
                  <div>
                    <label className="block text-[14px] font-bold text-gray-700 mb-2">Target Score</label>
                    <input 
                      type="text" 
                      value={formData.targetScore}
                      onChange={(e) => setFormData({...formData, targetScore: e.target.value})}
                      className="w-full p-3.5 border border-gray-200 rounded-2xl bg-[#EDF4FF]/40 text-[#1F384C] font-medium focus:outline-none focus:border-[#2979BA] text-[15px]"
                      placeholder="e.g. 7.0"
                    />
                    <span className="text-[12px] text-gray-400 mt-1.5 block">Set the score or level you want to achieve</span>
                  </div>
                  <div>
                    <label className="block text-[14px] font-bold text-gray-700 mb-2">Target / Purpose</label>
                    <div className="relative">
                      <select 
                        value={formData.targetPurpose}
                        onChange={(e) => setFormData({...formData, targetPurpose: e.target.value})}
                        className="w-full p-3.5 border border-[#2979BA]/40 rounded-2xl bg-[#EDF4FF]/50 text-[#1F384C] font-medium appearance-none focus:outline-none focus:border-[#2979BA] text-[15px]"
                      >
                        <option value="For Education">For Education</option>
                        <option value="For Work">For Work</option>
                        <option value="Personal Growth">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#2979BA]">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                    <span className="text-[12px] text-gray-400 mt-1.5 block">Tell us why you need this test</span>
                  </div>
                </div>
              )}

              {/* STEP 3: Study Timeline */}
              {activeStep === 3 && (
                <div className="flex flex-col gap-5">

                  {/* Start Learning Date */}
                  <div>
                    <label className="block text-[14px] font-bold text-gray-700 mb-2">
                      Start Learning Date
                    </label>

                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          startDate: e.target.value,
                        })
                      }
                      className="w-full p-3.5 border border-gray-200 rounded-2xl bg-[#EDF4FF]/40 text-[#1F384C] font-semibold focus:outline-none focus:border-[#2979BA] text-[15px]"
                    />

                    <span className="text-[12px] text-gray-400 mt-1.5 block">
                      Choose when you want to start studying
                    </span>
                  </div>

                  {/* Test Date */}
                  <div>
                    <label className="block text-[14px] font-bold text-gray-700 mb-2">
                      Test Date
                    </label>

                    <input
                      type="date"
                      value={formData.testDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          testDate: e.target.value,
                        })
                      }
                      className="w-full p-3.5 border border-[#2979BA]/40 rounded-2xl bg-[#EDF4FF]/50 text-[#1F384C] font-semibold focus:outline-none focus:border-[#2979BA] text-[15px]"
                    />

                    <span className="text-[12px] text-gray-400 mt-1.5 block">
                      Choose your official exam date
                    </span>
                  </div>

                </div>
              )}

              {/* STEP 4: Study Preferences */}
              {activeStep === 4 && (
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="block text-[14px] font-bold text-gray-700 mb-1">Daily Study Time</label>
                    <p className="text-[12px] text-gray-400 mb-3">How much time can you study each day?</p>
                    <div className="flex gap-4">
                      {['30 Menit', '1 Jam', '2 Jam', '3 Jam'].map((time) => (
                        <button 
                          key={time}
                          type="button"
                          onClick={() => setFormData({...formData, dailyStudyTime: time})}
                          className={`py-2 px-6 rounded-full text-sm font-medium transition-all duration-150 ${
                            formData.dailyStudyTime === time 
                              ? 'bg-[#2979BA] text-white shadow-sm font-semibold' 
                              : 'bg-[#EDF4FF]/60 text-[#2979BA] hover:bg-blue-100/80'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[14px] font-bold text-gray-700 mb-1">Study Days Per Week</label>
                    <p className="text-[12px] text-gray-400 mb-3">How often will you study each week?</p>
                    <div className="flex gap-4">
                      {['3 days', '5 days', 'Everyday'].map((day) => (
                        <button 
                          key={day}
                          type="button"
                          onClick={() => setFormData({...formData, studyDaysPerWeek: day})}
                          className={`py-2 px-6 rounded-full text-sm font-medium transition-all duration-150 ${
                            formData.studyDaysPerWeek === day 
                              ? 'bg-[#2979BA] text-white shadow-sm font-semibold' 
                              : 'bg-[#EDF4FF]/60 text-[#2979BA] hover:bg-blue-100/80'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Summary */}
              {activeStep === 5 && (
                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap gap-4">
                    <div className="py-2.5 px-6 bg-[#EDF4FF]/60 text-[#2979BA] rounded-full font-semibold text-sm">
                      {formData.testType}
                    </div>
                    <div className="py-2.5 px-6 bg-[#EDF4FF]/60 text-[#2979BA] rounded-full font-semibold text-sm">
                      Band {formData.targetScore}
                    </div>
                    <div className="py-2.5 px-6 bg-[#EDF4FF]/60 text-[#2979BA] rounded-full font-semibold text-sm">
                      {computeDuration()}
                    </div>
                    <div className="py-2.5 px-6 bg-[#EDF4FF]/60 text-[#2979BA] rounded-full font-semibold text-sm">
                      {formData.dailyStudyTime}
                    </div>
                  </div>
                  
                  <div className="bg-[#D1E2FF]/70 text-[#1F384C] p-3 px-4 rounded-xl text-[13px] flex items-center gap-2.5 max-w-xl">
                    <span className="text-blue-600 text-base">✦</span> 
                    <p className="font-medium text-slate-600">Sistem akan membuat roadmap personal sesuai target dan waktu belajarmu.</p>
                  </div>
                </div>
              )}
            </div>

            {/* ACTION FOOTER BUTTONS */}
            <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 shrink-0">
              <button
                type="button"
                onClick={handleBack}
                className={`py-2 px-4 rounded-xl text-[14px] font-bold transition-all ${
                  activeStep > 1 
                    ? 'text-gray-500 hover:text-[#2979BA] hover:bg-slate-50' 
                    : 'text-slate-300 cursor-not-allowed opacity-0'
                }`}
              >
                Back
              </button>

              {activeStep < 5 ? (
                <button 
                  onClick={handleNext}
                  className="bg-[#2979BA] text-white py-2 px-6 rounded-xl font-medium text-[15px] hover:bg-blue-600 transition-all duration-150 shadow-sm"
                >
                  Next
                </button>
              ) : (
                <button 
                  onClick={handleGenerateRoadmap}
                  className="bg-[#2979BA] text-white py-2.5 px-6 rounded-xl font-medium text-[15px] hover:bg-blue-600 transition-all duration-150 shadow-sm"
                >
                  Generate My Roadmap
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="w-full bg-[#EDF4FF]/30 border-t border-gray-100 px-16 pt-6 pb-4 shrink-0">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-12 gap-8 items-start mb-4">
          
          <div className="col-span-5 flex flex-col gap-3">
            <img 
              src={logoLateron} 
              alt="Lateron Logo" 
              className="h-7 object-contain self-start" 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.insertAdjacentHTML('afterend', '<div class="text-[#2979BA] font-bold text-lg flex items-center gap-1"><span class="text-xl">⌊</span>Lateron</div>');
              }}
            />
            <p className="text-gray-400 text-[12px] leading-relaxed max-w-xs">
              Helping learners achieve their language goals with personalized roadmaps and smarter preparation.
            </p>
          </div>

          <div className="col-span-3 flex flex-col gap-2">
            <h4 className="font-bold text-[13px] text-gray-700">Quick Links</h4>
            <div className="flex flex-col gap-1 text-[12px] text-gray-400">
              <span className="opacity-70 cursor-default">Home</span>
              <span className="opacity-70 cursor-default">About Us</span>
              <span className="opacity-70 cursor-default">Roadmap</span>
              <span className="opacity-70 cursor-default">Dashboard</span>
            </div>
          </div>

          <div className="col-span-4 flex flex-col gap-2">
            <h4 className="font-bold text-[13px] text-gray-700">Support</h4>
            <div className="flex flex-col gap-1 text-[12px] text-gray-400">
              <span className="opacity-70 cursor-default">Language Test</span>
              <span className="opacity-70 cursor-default">Progress Tracker</span>
              <span className="opacity-70 cursor-default">Contact</span>
              <span className="opacity-70 cursor-default">FAQ</span>
            </div>
          </div>
        </div>

        <div className="w-full text-center border-t border-slate-200/60 pt-3 text-[12px] text-gray-400 font-medium">
          © 2026 Lateron. All Rights Reserved. Your Language Learning Partner.
        </div>
      </footer>

    </div>
  );
};

export default Generate;