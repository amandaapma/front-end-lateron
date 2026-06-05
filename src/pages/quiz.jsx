import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import l2 from "../assets/logo2.jpg";

const normalize = (value) =>
  (value || "").toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, " ");

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const createMcq = (question, answer, options) => ({
  type: "mcq",
  question,
  options: shuffle([answer, ...options]).slice(0, 4),
  answer,
});

const createFill = (question, answer) => ({
  type: "fill",
  question,
  answer,
});

const createReadingQuestion = (question, answer, passage, mode = "fill", options = []) => ({
  type: "reading",
  mode,
  question,
  passage,
  answer,
  options: mode === "mcq" ? shuffle([answer, ...options]).slice(0, 4) : [],
});

const getTopicKeyword = (day) => {
  const title = (day?.title || "").toLowerCase();
  const patterns = [
    { regex: /simple present|present tense|present/i, label: "present tense" },
    { regex: /past tense|past|lampau/i, label: "past tense" },
    { regex: /reading|dokkai|membaca/i, label: "reading comprehension" },
    { regex: /listening|choukai|mendengarkan|audio/i, label: "listening" },
    { regex: /writing|essay|proposal/i, label: "writing" },
    { regex: /grammar|struktur|sentence/i, label: "grammar" },
    { regex: /particle|partikel/i, label: "particle" },
    { regex: /kanji|katakana|hiragana/i, label: "kanji" },
    { regex: /pinyin|mandarin|hsk/i, label: "pinyin" },
    { regex: /vocabulary|kosakata|words/i, label: "vocabulary" },
  ];
  const found = patterns.find(({ regex }) => regex.test(title));
  return found ? found.label : day?.title?.split(" ")[0] || "materi";
};

const getCoreConcept = (day) => {
  const title = (day?.title || "").toLowerCase();
  if (/simple present|present tense|present/i.test(title)) return "present";
  if (/past tense|past|lampau/i.test(title)) return "past";
  if (/reading|dokkai|membaca/i.test(title)) return "reading";
  if (/listening|choukai|mendengarkan|audio/i.test(title)) return "listening";
  if (/writing|essay|proposal/i.test(title)) return "writing";
  if (/grammar|struktur|sentence/i.test(title)) return "grammar";
  if (/particle|partikel/i.test(title)) return "particle";
  if (/kanji|katakana|hiragana/i.test(title)) return "kanji";
  if (/pinyin|mandarin|hsk/i.test(title)) return "pinyin";
  if (/vocabulary|kosakata|words/i.test(title)) return "vocabulary";
  return title.split(" ")[0] || "materi";
};

const buildQuestions = (day, weekTitle) => {
  const title = day?.title || "Materi Belajar";
  const description = day?.description || "Materi ini menyiapkan kamu untuk latihan ujian.";
  const topic = getTopicKeyword(day);
  const concept = getCoreConcept(day);
  const formula = day?.formula || "Gunakan materi ini untuk meningkatkan pemahaman.";

  const mcqQuestions = [
    createMcq(
      `Apa fokus utama dari materi hari ini: "${title}"?`,
      title,
      [
        "Penggunaan kata kerja",
        "Menerjemahkan kalimat panjang",
        "Menebak arti kosakata baru"
      ]
    ),
    createMcq(
      `Manakah pernyataan yang paling sesuai dengan tujuan pembelajaran ini?`,
      `Memahami ${topic} dan aplikasinya dalam ujian`,
      [
        "Menghafal semua contoh tanpa memahami",
        "Mendengarkan audio tanpa catatan",
        "Mengulang materi lain terlebih dahulu"
      ]
    ),
    createMcq(
      `Dalam konteks ${weekTitle}, kegiatan mana yang paling tepat?`,
      `Melakukan latihan ${topic} secara terstruktur`,
      [
        "Mengerjakan soal secara acak",
        "Membaca teks tanpa menganalisis",
        "Mengabaikan rumus dasar"
      ]
    ),
    createMcq(
      `Apa yang harus ditingkatkan setelah mempelajari topik ini?`,
      `Kemampuan ${topic} dalam soal ujian`,
      [
        "Hanya menghafal jawaban",
        "Fokus pada kecepatan menulis saja",
        "Membaca materi lain secara cepat"
      ]
    ),
    createMcq(
      `Pernyataan mana yang paling menggambarkan materi ini?`,
      description,
      [
        "Menjelaskan semua variasi kosakata saja",
        "Hanya praktik mendengar tanpa membaca",
        "Mengabaikan struktur kalimat"
      ]
    ),
  ];

  const fillQuestions = [
    createFill(
      `Lengkapi: "Topik utama hari ini adalah ____."`,
      topic
    ),
    createFill(
      `Lengkapi: "Fokus latihan ini adalah meningkatkan kemampuan ____."`,
      concept
    ),
    createFill(
      `Tuliskan kata kunci materi: "${title}" -> ____`,
      concept
    ),
    createFill(
      `Lengkapi: "Dalam soal ujian, kamu harus memperhatikan ____."`,
      topic
    ),
    createFill(
      `Fokus utama rumus ini adalah ____.`,
      formula.split(" ").slice(0, 3).join(" ")
    ),
  ];

  const readingQuestions = [
    createReadingQuestion(
      `Baca teks berikut dan jawab: apa topik utama dari bacaan tersebut?`,
      topic,
      description,
      "mcq",
      [
        "Metode pembelajaran acak",
        "Latihan tanpa konteks",
        "Latihan kecepatan saja"
      ]
    ),
    createReadingQuestion(
      `Menurut teks, hal apa yang perlu ditingkatkan?`,
      `Kemampuan ${topic}`,
      description,
      "fill"
    ),
    createReadingQuestion(
      `Apa yang paling penting untuk dilakukan setelah mempelajari materi ini?`,
      `Menggunakan ${topic} dalam latihan ujian`,
      description,
      "mcq",
      [
        "Mengingat seluruh kalimat",
        "Mencari jawaban cepat tanpa memahami",
        "Mengabaikan aturan dasar"
      ]
    ),
    createReadingQuestion(
      `Tema bacaan ini berkaitan dengan ____`,
      topic,
      description,
      "fill"
    ),
  ];

  if (day.id <= 2) {
    return mcqQuestions.slice(0, 5);
  }

  if (day.id <= 4) {
    return [
      ...mcqQuestions.slice(0, 3),
      ...fillQuestions.slice(0, 2),
    ];
  }

  if (day.id <= 6) {
    return [
      ...fillQuestions.slice(0, 2),
      ...readingQuestions.slice(0, 3),
    ];
  }

  const mixedQuestions = [
    ...mcqQuestions.slice(0, 3),
    ...fillQuestions.slice(0, 3),
    ...readingQuestions.slice(0, 4),
  ];

  return mixedQuestions.slice(0, 10);
};

export default function Quiz() {
  const navigate = useNavigate();
  const [quizContext, setQuizContext] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const [needsFix, setNeedsFix] = useState(false);
  const [lockedQuestions, setLockedQuestions] = useState({});
  const [quizError, setQuizError] = useState(null);

  useEffect(() => { 
    setQuizError(null);

    const savedContextRaw = localStorage.getItem("roadmap_quiz_context");
    const savedContext = savedContextRaw ? JSON.parse(savedContextRaw) : null;
    if (!savedContext) {
      setQuizError('roadmap_quiz_context tidak ditemukan. Jalankan Quiz lewat tombol "Start Quiz" dari My Roadmap.');
      setCurrentDay(null);
      return;
    }

    const testTypeKey = (() => {
      const t = (savedContext.testType || '').toString().trim();
      if (t.toUpperCase() === 'TOEFL ITP' || t.toUpperCase() === 'TOEFL') return 'TOEFL';
      if (t.toUpperCase() === 'IELTS') return 'IELTS';
      return t;
    })();

    const roadmapData = JSON.parse(localStorage.getItem(`roadmap_${testTypeKey}`) || "[]");
    
    // PERBAIKAN 1: Membungkus ID dengan Number() untuk menghindari error perbedaan tipe data (string vs number)
    const week = roadmapData.find((item) => Number(item.id) === Number(savedContext.weekId));
    const day = week?.days?.find((item) => Number(item.id) === Number(savedContext.dayId));

    if (!week || !day) {
      navigate("/my-roadmap");
      return;
    }

    setQuizContext(savedContext);
    setCurrentDay({ ...day, weekTitle: week.weekLabel, weekTitleFull: week.title });
  }, [navigate]);

  useEffect(() => {
    if (currentDay && quizContext) {
      setQuestions(buildQuestions(currentDay, currentDay.weekTitleFull));
    }
  }, [currentDay, quizContext]);

  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleFixAnswers = () => {
    setSubmitted(false);
    setNeedsFix(false);
    setFeedback([]);
  };

  const handleSubmit = () => {
    const feedbackResult = questions.map((question, index) => {
      const answer = answers[index] || "";
      const isCorrect = question.type === "mcq"
        ? answer === question.answer
        : normalize(answer) === normalize(question.answer);

      return {
        questionText: question.question,
        selectedAnswer: answer,
        correctAnswer: question.answer,
        isCorrect,
      };
    });

    const calculated = feedbackResult.filter((item) => item.isCorrect).length;
    const wrongCount = feedbackResult.filter((item) => !item.isCorrect).length;
    const locked = feedbackResult.reduce((acc, item, index) => {
      if (item.isCorrect) acc[index] = true;
      return acc;
    }, {});
    const persistedAnswers = feedbackResult.reduce((acc, item, index) => {
      if (item.isCorrect) acc[index] = item.selectedAnswer;
      return acc;
    }, {});

    setScore(calculated);
    setFeedback(feedbackResult);
    setSubmitted(true);
    setLockedQuestions(locked);
    setAnswers(persistedAnswers);
    setNeedsFix(wrongCount > 0);

    if (wrongCount > 0) {
      return;
    }

    if (quizContext) {
      const roadmapData = JSON.parse(localStorage.getItem(`roadmap_${quizContext.testType}`) || "[]");
      const updatedRoadmap = roadmapData.map((week) => {
        if (week.id !== quizContext.weekId) return week;
        return {
          ...week,
          days: week.days.map((day) =>
            day.id === quizContext.dayId ? { ...day, completed: true } : day
          ),
        };
      });
      localStorage.setItem(`roadmap_${quizContext.testType}`, JSON.stringify(updatedRoadmap));
    }
    localStorage.removeItem("roadmap_quiz_context");
  };

  const totalQuestions = questions.length;
  const finished = submitted;
  const wrongCount = feedback.filter((item) => !item.isCorrect).length;

  return (
    <div className="min-h-screen bg-white antialiased flex flex-col justify-between">
      <nav className="bg-[#2471A3] flex items-center justify-between px-16 py-4 sticky top-0 z-50 shadow-sm text-white">
        <div className="shrink-0 cursor-pointer" onClick={() => navigate("/dashboard")}> 
          {/* PERBAIKAN 2: Mengganti variabel logo menjadi l2 sesuai import di atas */}
          <img src={l2} alt="Lateron" className="w-[100px] h-auto object-contain brightness-0 invert" />
        </div>
        <div className="flex items-center gap-8 text-[15px] opacity-90">
          <Link to="/dashboard" className="hover:underline">Home</Link>
          <Link to="/generate" className="hover:underline">Generate</Link>
          <Link to="/my-roadmap" className="hover:underline">My Roadmap</Link>
          <Link to="/profile" className="hover:underline">Profile</Link>
        </div>
      </nav>

      <main className="max-w-6xl w-full mx-auto px-8 py-12 flex-grow">
        <div className="flex justify-between items-start border-b border-gray-100 pb-8 mb-10">
          <div>
            <h1 className="text-[32px] font-bold text-[#143F5E] mb-2">Quiz Hari {currentDay?.id || "?"}</h1>
            <p className="text-[14px] text-gray-500 max-w-2xl">
              {currentDay?.weekTitle} - {currentDay?.title}
            </p>
            <p className="mt-2 text-[13px] text-[#2471A3] font-semibold">{currentDay?.description}</p>
          </div>
          <div className="text-right">
            <p className="text-[14px] text-gray-300">Total Soal</p>
            <p className="text-[36px] font-bold text-[#76D7C4]">{totalQuestions}</p>
          </div>
        </div>

        {!currentDay && quizError ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8">
            <h2 className="text-[18px] font-bold text-red-700 mb-3">Quiz Error</h2>
            <p className="text-[14px] text-red-600 leading-relaxed">{quizError}</p>
            <div className="mt-6">
              <Link
                to="/my-roadmap"
                className="text-[#2471A3] font-semibold hover:underline"
              >
                Kembali ke My Roadmap
              </Link>
            </div>
          </div>
        ) : currentDay ? (
          <div>
            {finished ? (
              <div className="rounded-3xl border border-[#D0E9F4] bg-[#EBF7FB] p-8 shadow-sm">
                <h2 className="text-[22px] font-bold text-[#143F5E] mb-4">Hasil Quiz</h2>
                <p className="text-[16px] text-[#2471A3] mb-3">Skor kamu: <span className="font-bold">{score} / {totalQuestions}</span></p>
                <p className="text-[14px] text-gray-600 mb-6">
                  {wrongCount > 0
                    ? "Jawabanmu disimpan tetapi masih ada yang perlu diperbaiki. Perbaiki jawaban yang salah untuk menyelesaikan quiz."
                    : "Semua jawaban benar. Materi hari ini berhasil diselesaikan."
                  }
                </p>
                {wrongCount > 0 && (
                  <div className="rounded-2xl bg-white border border-red-100 p-5 mb-6">
                    <h3 className="text-[15px] font-semibold text-red-700 mb-3">Koreksi Jawaban</h3>
                    <p className="text-[14px] text-[#B45309] mb-3">Terdapat {wrongCount} jawaban yang salah. Perbaiki jawaban yang salah untuk menyelesaikan quiz.</p>
                    <div className="space-y-4">
                      {feedback.filter((item) => !item.isCorrect).map((item, idx) => (
                        <div key={idx} className="rounded-2xl bg-[#FEF3F2] border border-red-200 p-4">
                          <p className="text-[14px] text-[#981B1B] mb-2"><span className="font-semibold">Soal:</span> {item.questionText}</p>
                          <p className="text-[14px] text-[#1F2937]"><span className="font-semibold">Jawabanmu:</span> {item.selectedAnswer || "Tidak terisi"}</p>
                          <p className="text-[14px] text-[#047857]"><span className="font-semibold">Jawaban benar:</span> {item.correctAnswer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {needsFix ? (
                  <button
                    type="button"
                    onClick={handleFixAnswers}
                    className="bg-[#2471A3] text-white px-8 py-3 rounded-full hover:bg-[#1C5D86] transition-colors"
                  >
                    Perbaiki Jawaban
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/my-roadmap")}
                    className="bg-[#2471A3] text-white px-8 py-3 rounded-full hover:bg-[#1C5D86] transition-colors"
                  >
                    Kembali ke Roadmap
                  </button>
                )}
              </div>
            ) : (
              <form className="space-y-8" onSubmit={(event) => { event.preventDefault(); handleSubmit(); }}>
                {questions.map((item, index) => (
                  <div key={index} className="rounded-3xl border border-gray-200 p-6 shadow-sm">
                    <div className="mb-4">
                      <p className="text-[15px] font-semibold text-[#143F5E]">Soal {index + 1}</p>
                      <p className="text-[14px] text-gray-600 mt-2">{item.question}</p>
                    </div>

                    {item.type === "mcq" && (
                      <div className="space-y-3">
                      {lockedQuestions[index] ? (
                        <div className="rounded-2xl bg-[#ECFDF5] border border-[#BBF7D0] p-4 text-[14px] text-[#166534]">
                          Jawaban sudah benar: <span className="font-semibold">{answers[index]}</span>
                        </div>
                      ) : (
                        item.options.map((option, idx) => (
                          <label key={idx} className="flex items-center gap-3 rounded-2xl border border-slate-200 p-3 hover:border-[#2471A3] cursor-pointer">
                            <input
                              type="radio"
                              name={`answer-${index}`}
                              value={option}
                              checked={answers[index] === option}
                              onChange={(event) => handleAnswerChange(index, event.target.value)}
                              className="form-radio text-[#2471A3]"
                            />
                            <span className="text-[14px] text-gray-700">{option}</span>
                          </label>
                        ))
                      )}
                    </div>
                  )}

                    {item.type === "fill" && (
                      lockedQuestions[index] ? (
                        <div className="rounded-2xl bg-[#ECFDF5] border border-[#BBF7D0] p-4 text-[14px] text-[#166534]">
                          Jawaban sudah benar: <span className="font-semibold">{answers[index]}</span>
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={answers[index] || ""}
                          onChange={(event) => handleAnswerChange(index, event.target.value)}
                          placeholder="Tuliskan jawaban kamu di sini"
                          className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-[14px] text-gray-700 focus:border-[#2471A3] outline-none"
                        />
                      )
                    )}

                    {item.type === "reading" && (
                      <div className="space-y-4">
                        <div className="rounded-2xl bg-[#F5FBFF] border border-[#D6EFF9] p-4 text-[14px] text-gray-700">
                          <p>{item.passage}</p>
                        </div>
                        {item.mode === "mcq" ? (
                          <div className="space-y-3">
                            {lockedQuestions[index] ? (
                              <div className="rounded-2xl bg-[#ECFDF5] border border-[#BBF7D0] p-4 text-[14px] text-[#166534]">
                                Jawaban sudah benar: <span className="font-semibold">{answers[index]}</span>
                              </div>
                            ) : (
                              item.options.map((option, idx) => (
                                <label key={idx} className="flex items-center gap-3 rounded-2xl border border-slate-200 p-3 hover:border-[#2471A3] cursor-pointer">
                                  <input
                                    type="radio"
                                    name={`answer-${index}`}
                                    value={option}
                                    checked={answers[index] === option}
                                    onChange={(event) => handleAnswerChange(index, event.target.value)}
                                    className="form-radio text-[#2471A3]"
                                  />
                                  <span className="text-[14px] text-gray-700">{option}</span>
                                </label>
                              ))
                            )}
                          </div>
                        ) : (
                          lockedQuestions[index] ? (
                            <div className="rounded-2xl bg-[#ECFDF5] border border-[#BBF7D0] p-4 text-[14px] text-[#166534]">
                              Jawaban sudah benar: <span className="font-semibold">{answers[index]}</span>
                            </div>
                          ) : (
                            <input
                              type="text"
                              value={answers[index] || ""}
                              onChange={(event) => handleAnswerChange(index, event.target.value)}
                              placeholder="Tuliskan jawaban kamu di sini"
                              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-[14px] text-gray-700 focus:border-[#2471A3] outline-none"
                            />
                          )
                        )}
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex justify-between items-center">
                  <Link to="/my-roadmap" className="text-[#2471A3] font-semibold hover:underline">Batal dan kembali</Link>
                  <button
                    type="submit"
                    className="bg-[#2471A3] text-white px-8 py-3 rounded-full hover:bg-[#1C5D86] transition-colors"
                  >
                    Kirim Jawaban
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="rounded-3xl border border-[#D0E9F4] bg-[#EBF7FB] p-8 shadow-sm">
            <p className="text-[16px] text-[#143F5E]">Sedang memuat quiz... Jika tidak otomatis, kembali ke <Link className="text-[#2471A3] underline" to="/my-roadmap">My Roadmap</Link>.</p>
          </div>
        )}
      </main>

      <footer className="px-16 pt-14 pb-8 bg-[#EBF2F7] w-full">
        <div className="flex justify-between mb-10 max-w-6xl mx-auto">
          <div className="w-[30%]">
            <img src={l2} alt="Lateron" className="w-[90px] h-auto object-contain mb-4" />
            <p className="text-[13px] text-[#5A92B5] leading-relaxed">Belajar dengan lebih terstruktur dan cek progress setiap harinya.</p>
          </div>
          <div>
            <p className="text-[14px] font-bold text-[#143F5E] mb-4">Quick Links</p>
            {['Home', 'About Us', 'Roadmap', 'Dashboard'].map((l) => (
              <span key={l} className="block text-[13px] text-[#5A92B5] mb-2.5 transition-colors opacity-70 cursor-default">{l}</span>
            ))}
          </div>
          <div>
            <p className="text-[14px] font-bold text-[#143F5E] mb-4">Support</p>
            {['Language Test', 'Progress Tracker', 'Contact', 'FAQ'].map((l) => (
              <span key={l} className="block text-[13px] text-[#5A92B5] mb-2.5 transition-colors opacity-70 cursor-default">{l}</span>
            ))}
          </div>
        </div>
        <div className="border-t border-slate-300/40 pt-6">
          <p className="text-center text-[12px] text-[#5A92B5]">© 2026 Lateron. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}