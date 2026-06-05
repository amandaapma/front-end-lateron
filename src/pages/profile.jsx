import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Sesuaikan path logo kamu
import l2 from "../assets/logo2.jpg";  // Sesuaikan path logo footer kamu

export default function Profile() {
  const navigate = useNavigate();

  // 1. STATE UNTUK KONTROL SUB-MENU (Dashboard vs Setting Profile)
  const [activeTab, setActiveTab] = useState("dashboard"); // "dashboard" atau "setting"

  // 2. Ambil data user dari localStorage
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const savedProfile = JSON.parse(localStorage.getItem("profile") || "{}");
  const savedRoadmap = JSON.parse(localStorage.getItem("roadmap") || "{}");

  const selectedTestType = savedRoadmap.testType || "IELTS";
  const getUserEmail = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      return user?.email || "";
    } catch {
      return "";
    }
  };
  const emailKey = getUserEmail() ? encodeURIComponent(getUserEmail()) : "guest";
  const roadmapStorageKey = `roadmap_${emailKey}_${selectedTestType}`;
  const userRoadmapData = JSON.parse(localStorage.getItem(roadmapStorageKey) || "[]");
  const userRoadmapWeeks = Array.isArray(userRoadmapData) ? userRoadmapData : [];

  const totalStudyDays = userRoadmapWeeks.reduce(
    (sum, week) => sum + (week.days?.length || 0),
    0
  );

  const completedStudyDays = userRoadmapWeeks.reduce(
    (sum, week) => sum + (week.days?.filter((day) => day.completed).length || 0),
    0
  );

  const currentProgress = totalStudyDays > 0 ? Math.round((completedStudyDays / totalStudyDays) * 100) : 0;
  const sessionsCompleted = completedStudyDays;

  const computeDaysUntil = (dateString) => {
    if (!dateString) return "-";
    const targetDate = new Date(dateString);
    const now = new Date();
    const diffMs = targetDate.setHours(0,0,0,0) - now.setHours(0,0,0,0);
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const formatDate = (iso) => {
    if (!iso) return "-";
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    } catch (e) {
      return iso;
    }
  };

  const daysUntilTest = computeDaysUntil(savedRoadmap.testDate || savedProfile.testDate);

  const normalizeText = (value) => (value || "").toString().toLowerCase();

  const calculateSkillProgress = (keywords) => {
    const matchingDays = userRoadmapWeeks.flatMap((week) =>
      (week.days || []).filter((day) => {
        const text = normalizeText(`${day.title} ${day.description} ${day.points?.join(" ")}`);
        return keywords.some((keyword) => text.includes(keyword));
      })
    );

    if (matchingDays.length === 0) {
      return currentProgress;
    }

    const completed = matchingDays.filter((day) => day.completed).length;
    return Math.round((completed / matchingDays.length) * 100);
  };

  const readingProgress = calculateSkillProgress([
    "reading",
    "skimming",
    "scanning",
    "vocabulary",
    "comprehension",
    "contextual",
    "sentence completion",
    "reading practice",
  ]);

  const writingProgress = calculateSkillProgress([
    "writing",
    "essay",
    "proposal",
    "formal essay",
    "written expression",
    "structure",
    "grammar",
    "key word transformation",
  ]);

  // 3. STATE DATA INPUT FORM (Untuk Setting Profile)
  const [formData, setFormData] = useState({
    fullName: savedProfile.fullName || "",
    username: savedProfile.username || "",
    email: savedUser.email || "",
    phone: savedProfile.phone || "",
    pekerjaan: savedProfile.pekerjaan || "",
    password: savedUser.password || "",
    testDate: savedRoadmap.testDate || savedProfile.testDate || "",
    targetScore: savedRoadmap.targetScore || savedProfile.targetScore || ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [passwordForm, setPasswordForm] = useState({ current: "", newPass: "", confirm: "" });
  const [streakNotif, setStreakNotif] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem("usernames") || "[]");
      if (savedProfile.username && !list.includes(savedProfile.username)) {
        list.push(savedProfile.username);
        localStorage.setItem("usernames", JSON.stringify(list));
      }
    } catch (e) {
      localStorage.setItem("usernames", JSON.stringify([]));
    }
  }, []);

  const [profilePhoto, setProfilePhoto] = useState(() => {
    return localStorage.getItem("profilePhoto") || "";
  });

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setProfilePhoto(base64String);
      localStorage.setItem("profilePhoto", base64String);
    };
    reader.readAsDataURL(file);
  };

  const [reminder, setReminder] = useState(false);

  const handleSave = () => {
    const uname = (formData.username || "").toString().trim();
    if (!uname) {
      alert("Username tidak boleh kosong");
      return;
    }

    const usernames = JSON.parse(localStorage.getItem("usernames") || "[]");
    const original = savedProfile.username || "";
    if (usernames.includes(uname) && uname !== original) {
      alert("Username sudah digunakan, pilih username lain.");
      return;
    }

    const updated = usernames.filter((u) => u !== original);
    if (!updated.includes(uname)) updated.push(uname);
    localStorage.setItem("usernames", JSON.stringify(updated));

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const storedPassword = storedUser.password || "";

    if (passwordForm.newPass) {
      if (passwordForm.current !== storedPassword) {
        alert("Password saat ini tidak cocok.");
        return;
      }
      if (passwordForm.newPass !== passwordForm.confirm) {
        alert("Password baru dan konfirmasi tidak cocok.");
        return;
      }
      storedUser.password = passwordForm.newPass;
      localStorage.setItem("user", JSON.stringify(storedUser));
    }

    const persisted = {
      fullName: formData.fullName || "",
      username: uname,
      phone: formData.phone || "",
      pekerjaan: formData.pekerjaan || "",
      testDate: formData.testDate || "",
      targetScore: formData.targetScore || ""
    };

    if (passwordForm.newPass) {
      persisted.lastPasswordChanged = new Date().toISOString();
    } else if (savedProfile.lastPasswordChanged) {
      persisted.lastPasswordChanged = savedProfile.lastPasswordChanged;
    }

    localStorage.setItem("profile", JSON.stringify(persisted));

    setPasswordForm({ current: "", newPass: "", confirm: "" });
    alert("Profil berhasil disimpan!");
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-white antialiased flex flex-col justify-between font-sans">
      
      {/* ================= NAVBAR GLOBAL ================= */}
      <nav className="bg-[#2471A3] flex items-center justify-between px-16 py-4 sticky top-0 z-50 shadow-xs text-white">
        <div className="shrink-0 cursor-pointer" onClick={() => navigate("/dashboard")}>
          <img src={logo} alt="Lateron" className="w-[100px] h-auto object-contain brightness-0 invert" />
        </div>
        
        <div className="flex items-center gap-8 text-[15px] opacity-90">
          <Link to="/dashboard" className="hover:underline">Home</Link>
          <Link to="/generate" className="hover:underline">Generate</Link>
          <Link to="/my-roadmap" className="hover:underline">My Roadmap</Link>
          <button className="font-bold border-b-2 border-white pb-1 bg-transparent text-white cursor-pointer">Profile</button>
        </div>
      </nav>

      {/* ================= LAYOUT UTAMA PROFILE ================= */}
      <main className="max-w-7xl w-full mx-auto px-16 py-10 flex-grow flex gap-16">
        
        {/* SIDEBAR NAVIGATION (KIRI) */}
        <div className="w-[22%] shrink-0 flex flex-col justify-between border-r border-gray-100 pr-8 min-h-[500px]">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full text-left px-6 py-3.5 rounded-2xl font-semibold text-[14px] transition-all cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-[#2471A3] text-white shadow-xs"
                  : "bg-transparent text-gray-400 hover:bg-gray-50"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("setting")}
              className={`w-full text-left px-6 py-3.5 rounded-2xl font-semibold text-[14px] transition-all cursor-pointer ${
                activeTab === "setting"
                  ? "bg-[#2471A3] text-white shadow-xs"
                  : "bg-transparent text-gray-400 hover:bg-gray-50"
              }`}
            >
              Setting Profile
            </button>
          </div>

          <button 
            onClick={() => setShowLogoutModal(true)}
            className="w-full border border-gray-300 text-gray-400 hover:text-red-500 hover:border-red-500 text-[14px] py-2.5 rounded-full bg-transparent transition-all cursor-pointer text-center"
          >
            Log Out
          </button>
        </div>

        {/* AREA KONTEN UTAMA (KANAN) */}
        <div className="flex-1 pl-4">
          
          {/* USER PROFILE HEADER CARD */}
          <div className="flex items-center gap-5 mb-8">
            <label className="relative group cursor-pointer">
              <img 
                src={profilePhoto || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"}
                alt="Avatar" 
                className="w-20 h-20 rounded-full object-cover border border-gray-100 group-hover:opacity-70 transition-opacity"
              />
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-[12px] font-semibold">
                Edit
              </div>
            </label>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[26px] font-bold text-[#143F5E]">{formData.username || formData.email || "User"}</h2>
              </div>
              <p className="text-[14px] text-gray-400 font-medium">{formData.pekerjaan || "Mahasiswa"} &bull; {savedRoadmap.testType || "IELTS"}</p>
            </div>
          </div>

          {/* KONDISIONAL VIEW TABS */}
          {activeTab === "dashboard" ? (
            /* ================= VIEW 1: DASHBOARD ================= */
            <div>
              <h3 className="text-[20px] font-bold text-[#143F5E] mb-1">Progress Review</h3>
              <p className="text-[13px] text-gray-400 mb-6">
                Track your study progress, monitor your performance, and stay on the right path toward your target language test score.
              </p>

              <div className="grid grid-cols-4 gap-4 mb-10">
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                  <p className="text-[13px] text-gray-500 font-semibold mb-3">Current Progress</p>
                  <p className="text-[36px] font-bold text-[#2ECC71]">{currentProgress}%</p>
                </div>
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                  <p className="text-[13px] text-gray-500 font-semibold mb-3">Study Streak</p>
                  <p className="text-[36px] font-bold text-[#E74C3C]">
                    {savedProfile.studyStreak || 7} <span className="text-[16px] font-semibold text-gray-500">Hari</span>
                  </p>
                </div>
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                  <p className="text-[13px] text-gray-500 font-semibold mb-3">Sesi Selesai</p>
                  <p className="text-[36px] font-bold text-[#3498DB]">
                    {sessionsCompleted} <span className="text-[16px] font-semibold text-gray-500">Sesi</span>
                  </p>
                </div>
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                  <p className="text-[13px] text-gray-500 font-semibold mb-3">Hari Menuju Test</p>
                  <p className="text-[36px] font-bold text-[#E67E22]">
                    {daysUntilTest} <span className="text-[16px] font-semibold text-gray-500">Hari</span>
                  </p>
                </div>
              </div>

              <h4 className="text-[16px] font-bold text-[#143F5E] mb-1">This Week's Progress</h4>
              <p className="text-[13px] text-gray-400 mb-6">See how much you've completed this week.</p>

              <div className="space-y-4 max-w-3xl mb-10">
                {[
                  { skill: "Reading Practice", val: readingProgress, color: "bg-[#E67E22]" },
                  { skill: "Writing Practice", val: writingProgress, color: "bg-[#F1C40F]" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="w-32 text-[13px] font-medium text-gray-500">{item.skill}</span>
                    <span className="text-[13px] font-bold text-gray-400 w-8">{item.val}%</span>
                    <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => navigate("/my-roadmap")} className="bg-[#2471A3] text-white text-[14px] font-semibold px-8 py-3 rounded-full hover:bg-[#1C5D86] transition-colors shadow-md cursor-pointer">
                Continue Learning
              </button>
            </div>
          ) : (
            /* ================= VIEW 2: SETTING PROFILE ================= */
            <div>
              <h3 className="text-[18px] font-bold text-[#143F5E] border-b border-gray-100 pb-3 mb-6">Informasi pribadi</h3>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-5 max-w-4xl mb-8">
                <div>
                  <label className="block text-[13px] font-bold text-[#143F5E] mb-2">Nama Lengkap</label>
                  {isEditing ? (
                    <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full border border-gray-200 rounded-2xl px-5 py-3 text-[14px] focus:outline-none focus:border-[#2471A3] text-gray-700 font-medium" />
                  ) : (
                    <input type="text" value={formData.fullName || "-"} disabled className="w-full border border-gray-100 rounded-2xl px-5 py-3 text-[14px] bg-gray-50 text-gray-400 font-medium" />
                  )}
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#143F5E] mb-2">Username</label>
                  <div className="relative">
                    {isEditing ? (
                      <>
                        <input 
                          type="text" value={formData.username}
                          onChange={(e) => { setFormData({...formData, username: e.target.value});
                            const uname = (e.target.value||"").toString().trim();
                            const list = JSON.parse(localStorage.getItem('usernames')||'[]');
                            setUsernameAvailable(!list.includes(uname) || uname === (savedProfile.username||""));
                          }}
                          className="w-full border border-gray-200 rounded-2xl px-5 py-3 text-[14px] text-gray-700 pr-24 focus:outline-none font-medium"
                        />
                        <span className={`absolute right-5 top-1/2 -translate-y-1/2 text-[13px] font-medium ${usernameAvailable ? 'text-emerald-500' : 'text-red-600'}`}>{usernameAvailable ? 'Tersedia' : 'Tidak tersedia'}</span>
                      </>
                    ) : (
                      <input type="text" value={formData.username || "-"} disabled className="w-full border border-gray-100 rounded-2xl px-5 py-3 text-[14px] bg-gray-50 text-gray-400 font-medium" />
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#143F5E] mb-2">Pekerjaan</label>
                  {isEditing ? (
                    <input type="text" placeholder="Masukkan pekerjaan" value={formData.pekerjaan} onChange={(e) => setFormData({...formData, pekerjaan: e.target.value})} className="w-full border border-gray-200 rounded-2xl px-5 py-3 text-[14px] focus:outline-none focus:border-[#2471A3] text-gray-700 font-medium placeholder-gray-300" />
                  ) : (
                    <input type="text" value={formData.pekerjaan || "-"} disabled className="w-full border border-gray-100 rounded-2xl px-5 py-3 text-[14px] bg-gray-50 text-gray-400 font-medium" />
                  )}
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#143F5E] mb-2">Email</label>
                  <input type="email" value={formData.email} disabled className="w-full border border-gray-100 rounded-2xl px-5 py-3 text-[14px] bg-gray-50 text-gray-400 font-medium" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#143F5E] mb-2">Nomor Handphone</label>
                  {isEditing ? (
                    <input type="text" placeholder="081x - xxxx - xxxx" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full border border-gray-200 rounded-2xl px-5 py-3 text-[14px] focus:outline-none focus:border-[#2471A3] text-gray-700 font-medium placeholder-gray-300" />
                  ) : (
                    <input type="text" value={(function(){ const p=formData.phone||""; if(!p) return "-"; if(p.length<=6) return p; const start=p.slice(0,4); const end=p.slice(-3); return `${start} **** ${end}` })()} disabled className="w-full border border-gray-100 rounded-2xl px-5 py-3 text-[14px] bg-gray-50 text-gray-400 font-medium" />
                  )}
                </div>
              </div>

              {/* Target Belajar Section */}
              <h3 className="text-[18px] font-bold text-[#143F5E] border-b border-gray-100 pb-3 mb-4">Target Belajar</h3>
              <p className="text-[14px] font-bold text-[#76D7C4] mb-4">{savedRoadmap.testType || "-"}</p>
              
              <div className="grid grid-cols-2 gap-8 max-w-4xl mb-8">
                <div>
                  <label className="block text-[13px] font-bold text-gray-400 mb-2">Tanggal tes</label>
                  <input type="text" value={formData.testDate} onChange={(e) => setFormData({...formData, testDate: e.target.value})} className="w-full bg-[#EBF5FB] border-none rounded-2xl px-5 py-3.5 text-[14px] font-semibold text-[#143F5E] text-center focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-400 mb-2">Target score</label>
                  <input type="text" value={formData.targetScore} onChange={(e) => setFormData({...formData, targetScore: e.target.value})} className="w-full bg-[#EBF5FB] border-none rounded-2xl px-5 py-3.5 text-[14px] font-semibold text-[#143F5E] text-center focus:outline-none" />
                </div>
              </div>

              {/* Toggle Switch Preferences */}
              <div className="max-w-4xl space-y-5 mb-10">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[14px] font-bold text-[#143F5E]">Reminder belajar</p>
                    <p className="text-[12px] text-gray-400">Setiap hari 19.00 WIB</p>
                  </div>
                  <button onClick={() => setReminder(!reminder)} className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${reminder ? "bg-[#143F5E]" : "bg-black"}`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${reminder ? "translate-x-6" : "translate-x-0"}`} />
                  </button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[14px] font-bold text-[#143F5E]">Notifikasi streak</p>
                    <p className="text-[12px] text-gray-400">Ingatkan jika streak akan putus</p>
                  </div>
                  <button onClick={() => setStreakNotif(!streakNotif)} className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${streakNotif ? "bg-[#143F5E]" : "bg-black"}`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${streakNotif ? "translate-x-6" : "translate-x-0"}`} />
                  </button>
                </div>
              </div>

              {/* Keamanan Akun */}
              <h3 className="text-[18px] font-bold text-[#143F5E] border-b border-gray-100 pb-3 mb-6">Keamanan akun</h3>
              <div className="max-w-4xl space-y-5">
                <div>
                  <label className="block text-[13px] font-bold text-[#143F5E] mb-2">Ganti password</label>
                  {isEditing ? (
                    <div className="grid grid-cols-3 gap-3">
                      <input type="password" placeholder="Password saat ini" value={passwordForm.current} onChange={(e) => setPasswordForm({...passwordForm, current: e.target.value})} className="w-full border border-gray-200 rounded-2xl px-4 py-2 text-[14px] focus:outline-none focus:border-[#2471A3] text-gray-700 font-medium" />
                      <input type="password" placeholder="Password baru" value={passwordForm.newPass} onChange={(e) => setPasswordForm({...passwordForm, newPass: e.target.value})} className="w-full border border-gray-200 rounded-2xl px-4 py-2 text-[14px] focus:outline-none focus:border-[#2471A3] text-gray-700 font-medium" />
                      <input type="password" placeholder="Ulangi password baru" value={passwordForm.confirm} onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})} className="w-full border border-gray-200 rounded-2xl px-4 py-2 text-[14px] focus:outline-none focus:border-[#2471A3] text-gray-700 font-medium" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <input type="password" value={"•".repeat(8)} disabled className="w-1/2 border border-gray-100 rounded-2xl px-5 py-3 text-[14px] bg-gray-50 text-gray-400 font-medium" />
                      <span className="text-[13px] text-gray-400">Terakhir diganti: {savedProfile.lastPasswordChanged ? new Date(savedProfile.lastPasswordChanged).toLocaleDateString() : "-"}</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[14px] font-bold text-[#143F5E]">Verifikasi email</p>
                    <p className="text-[12px] text-emerald-500 font-medium">Email sudah terverifikasi</p>
                  </div>
                  <span className="text-emerald-500 font-bold text-xl mr-1">✓</span>
                </div>
              </div>

              {/* Tombol Action Edit/Save */}
              <div className="mt-8">
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className="bg-[#2471A3] text-white text-[14px] font-semibold px-10 py-3 rounded-full hover:bg-[#1C5D86] transition-colors shadow-md cursor-pointer">
                    Edit
                  </button>
                ) : (
                  <button onClick={handleSave} className="bg-[#2471A3] text-white text-[14px] font-semibold px-10 py-3 rounded-full hover:bg-[#1C5D86] transition-colors shadow-md cursor-pointer">
                    Simpan Perubahan
                  </button>
                )}
              </div>

            </div>
          )}

        </div>
      </main>

      {/* ================= GLOBAL FOOTER ================= */}
      <footer className="px-16 pt-14 pb-8 bg-[#EBF2F7] w-full">
        <div className="flex justify-between mb-10 max-w-6xl mx-auto">
          <div className="w-[30%]">
            <img src={l2} alt="Lateron" className="w-[90px] h-auto object-contain mb-4" />
            <p className="text-[13px] text-[#5A92B5] leading-relaxed">
              Helping learners achieve their language goals with personalized roadmaps and smarter preparation.
            </p>
          </div>
          <div>
            <p className="text-[14px] font-bold text-[#143F5E] mb-4">Quick Links</p>
            {["Home", "About Us", "Roadmap", "Dashboard"].map((l) => (
              <button key={l} disabled className="block text-[13px] text-[#5A92B5] mb-2.5 bg-transparent p-0 border-none transition-colors cursor-default opacity-70">{l}</button>
            ))}
          </div>
          <div>
            <p className="text-[14px] font-bold text-[#143F5E] mb-4">Support</p>
            {["Language Test", "Progress Tracker", "Contact", "FAQ"].map((l) => (
              <span key={l} className="block text-[13px] text-[#5A92B5] mb-2.5 transition-colors opacity-70 cursor-default">{l}</span>
            ))}
          </div>
        </div>
        <div className="border-t border-slate-300/40 pt-6">
          <p className="text-center text-[12px] text-[#5A92B5]">
            © 2026 Lateron. All Rights Reserved. Your Language Learning Partner.
          </p>
        </div>
      </footer>

      {/* ================= MODAL LOGOUT ================= */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[320px] shadow-lg text-center">
            <h2 className="text-[16px] font-bold text-[#143F5E] mb-2">Konfirmasi Logout</h2>
            <p className="text-[13px] text-gray-500 mb-6">Apakah kamu yakin ingin logout?</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setShowLogoutModal(false)} className="px-5 py-2 rounded-full border border-gray-300 text-gray-500 text-[13px] hover:bg-gray-100">
                Cancel
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("isLoggedIn");
                  setShowLogoutModal(false);
                  navigate("/");
                }}
                className="px-5 py-2 rounded-full bg-red-500 text-white text-[13px] hover:bg-red-600"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}