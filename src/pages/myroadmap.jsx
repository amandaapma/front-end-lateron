import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Sesuaikan dengan path file logo kamu
import l2 from "../assets/logo2.jpg";  // Sesuaikan dengan path file logo footer kamu

// ================= DATA MASTER SILABUS AKAN DIMUAT BERDASARKAN STATE TARGETTEST =================

// ================= DATA MASTER SILABUS 4 MINGGU (6 JENIS TES) =================
const ROADMAP_DICTIONARY = {
  IELTS: [
    {
      "title": "Grammar Foundation & Sentence Structures",
      "weekLabel": "Minggu 1",
      "desc": "Membangun fondasi tata bahasa dasar yang kokoh, berfokus pada keselarasan kalimat tunggal dan struktur dasar penulisan akademik.",
      "progress": 100,
      "days": [
        {
          "id": 1, "label": "Hari 1", "title": "Subject-Verb Agreement",
          "description": "Memastikan kata kerja selalu searas dengan subjek tunggal atau jamak dalam kalimat.",
          "points": ["Memahami subjek tunggal & jamak", "Menghindari kesalahan dasar S-V di Writing Task 2"],
          "formula": "Singular Subject + Verb(s/es) / Plural Subject + Verb 1",
          "examples": ["The government plays a crucial role.", "Local authorities disagree on the policy."]
        },
        {
          id: 2, label: "Hari 2", title: "Subject & Verb Basics",
          description: "Kunci utama dari Present Tense adalah kesesuaian antara subjek dan kata kerja (Subject-Verb Agreement). Hari ini kita membedakan perlakuan kata kerja untuk subjek tunggal dan jamak.",
          points: ["Mengidentifikasi subjek tunggal (Singular) dan jamak (Plural)", "Aturan dasar kata kerja dasar (Base Form Verb) tanpa imbuhan", "Kapan kata kerja tidak perlu ditambahkan akhiran s/es", "Menghindari error mendasar pada IELTS Speaking Section"],
          formula: "I / You / We / They + Verb 1 (Tanpa s/es)",
          examples: ["They study English grammar together.", "We write essays every week to improve our score.", "Many students choose IELTS over TOEFL nowadays."]
        },
        {
          id: 3, label: "Hari 3", title: "He / She / It (IMPORTANT)",
          description: "Bagian paling krusial yang sering menjadi jebakan nilai. Subjek orang ketiga tunggal membutuhkan perubahan akhiran kata kerja yang spesifik.",
          points: ["Aturan penambahan akhiran -s, -es, atau -ies pada kata kerja", "Perubahan kata kerja berakhiran huruf 'y' (study -> studies, play -> plays)", "Pengecualian kata kerja ireguler khusus seperti 'have' menjadi 'has'", "Latihan ketelitian tulisan untuk menghindari pengurangan skor di Writing Task 2"],
          formula: "He / She / It + Verb 1 (+s/es/ies)",
          examples: ["She speaks English fluently in the interview.", "The university offers a great scholarship program.", "He goes to the library to practice listening sections."]
        },
        {
          id: 4, label: "Hari 4", title: "Negative Sentences",
          description: "Hari ini kita belajar bagaimana menyangkal atau membuat kalimat negatif. Kita akan mulai menggunakan kata kerja bantu (auxiliary verb) 'do' dan 'does'.",
          points: ["Memahami fungsi kata bantu 'Do Not' (Don't) dan 'Does Not' (Doesn't)", "Aturan penting: Kata kerja kembali ke bentuk dasar setelah 'does not'", "Membuat kalimat sanggahan formal untuk kebutuhan akademis", "Strategi merespon pertanyaan negatif pada wawancara Speaking"],
          formula: "Subjek + Do / Does + NOT + Verb 1 (Bentuk Dasar)",
          examples: ["I do not agree with the government's education policy.", "She does not live in London at the moment.", "The research does not support the initial hypothesis."]
        },
        {
          id: 5, label: "Hari 5", title: "Questions (Interrogative)",
          description: "Bagian ini sangat berguna untuk menghadapi IELTS Speaking Part 3, di mana kita harus memahami struktur kalimat tanya dengan benar, baik Yes/No Questions maupun WH- Questions.",
          points: ["Menyusun kalimat tanya Yes/No menggunakan Do dan Does di depan kalimat", "Mempelajari struktur kalimat tanya menggunakan 5W+1H (What, Where, Why, etc.)", "Intonasi yang benar saat melontarkan pertanyaan dalam bahasa Inggris", "Cara menjawab pertanyaan interviewer dengan struktur gramatikal yang tepat"],
          formula: "Do / Does + Subject + Verb 1 + ? atau Wh- Word + Do/Does + Subject + Verb 1 + ?",
          examples: ["Do you practice listening sections every day?", "Where does the examiner usually conduct the test?", "Why do many candidates fail to get band 7?"]
        },
        {
          id: 6, label: "Hari 6", title: "Adverbs of Frequency",
          description: "Untuk memperkaya variasi kalimat (Lexical Resource) di IELTS, kita perlu menambahkan kata keterangan seberapa sering sebuah aktivitas dilakukan.",
          points: ["Mengenal tingkatan Adverbs of Frequency (Always, Usually, Often, Sometimes, Seldom, Never)", "Aturan posisi penempatan Adverb sebelum kata kerja utama (Verb)", "Aturan posisi penempatan Adverb setelah kata kerja bantu 'To Be' (am/is/are)", "Meningkatkan variasi kosakata agar struktur kalimat tidak membosankan"],
          formula: "Subject + Adverb of Frequency + Verb 1 atau Subject + To Be + Adverb",
          examples: ["I always review my vocabulary list before sleeping.", "She is often nervous during the speaking simulator.", "They seldom make grammatical errors in writing."]
        },
        {
          id: 7, label: "Hari 7", title: "Practice Lesson",
          description: "Hari terakhir adalah waktu untuk menguji pemahaman totalmu. Materi hari ini menggabungkan semua aturan dari Hari 1 hingga Hari 6 sebelum kamu mengambil kuis evaluasi.",
          points: ["Review komprehensif seluruh materi Simple Present Tense", "Mendeteksi kesalahan penulisan (error correction exercise)", "Simulasi penggabungan kalimat positif, negatif, dan tanya secara lisan", "Persiapan mental dan pemantapan materi sebelum menekan tombol 'Start Quiz'"],
          formula: "Review Komprehensif: Gabungan Semua Rumus Hari 1 - Hari 6",
          examples: ["Positive: He scores band 8.0.", "Negative: He does not score band 8.0.", "Interrogative: Does he score band 8.0?"]
        }
      ]
    },
    {
      id: 2,
      title: "Simple Past Tense & Narrating Experiences",
      weekLabel: "Minggu 2",
      desc: "Membahas tuntas menceritakan kejadian masa lampau untuk kebutuhan performa prima di IELTS Speaking Part 2 dan penulisan laporan data historis.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Regular vs Irregular Past Verbs",
          description: "Memahami perubahan bentuk kata kerja lampau baik yang berakhiran -ed maupun yang berubah total (irregular).",
          points: ["Menguasai perubahan kata kerja reguler", "Menghafal irregular verbs krusial untuk ujian", "Menghindari pencampuran tenses masa kini dan lampau"],
          formula: "Subject + Verb 2 + Object / Complement",
          examples: ["The government increased the budget last year.", "I took my first mock test two weeks ago."]
        },
        {
          id: 2, label: "Hari 2", title: "Past Continuous Interruption",
          description: "Menyusun struktur kalimat kompleks yang menggabungkan aktivitas yang sedang berlangsung di masa lalu dengan interupsi mendadak.",
          points: ["Penggunaan was/were sesuai subjek", "Menghubungkan dua klausa menggunakan 'when' atau 'while'"],
          formula: "Subject + Was/Were + Verb-ing + when + Subject + Verb 2",
          examples: ["I was writing the essay when the alarm went off.", "While they were discussing the prompt, the examiner walked in."]
        }
      ]
    },
    {
      id: 3,
      title: "Reading Comprehension - Skimming & Scanning",
      weekLabel: "Minggu 3",
      desc: "Fokus mengasah teknik membaca cepat tanpa kehilangan poin gagasan utama untuk mengatasi batasan waktu ketat teks akademik.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Skimming for Main Ideas",
          description: "Membaca teks secara sekilas dalam hitungan detik untuk menangkap inti dari sebuah paragraf tanpa membaca kata demi kata.",
          points: ["Membaca kalimat pertama dan terakhir paragraf", "Mengabaikan detail teknis dan berfokus pada topik besar"],
          formula: "Skimming Strategy == Reading Header + First Sentence + Last Sentence",
          examples: ["Paragraph A discusses climate shifts; detailed dates can be skipped initially."]
        },
        {
          id: 2, label: "Hari 2", title: "Scanning for Specific Keywords",
          description: "Teknik mencari kata kunci spesifik seperti angka, nama orang, lokasi, atau istilah ilmiah dalam teks bacaan panjang.",
          points: ["Menggerakkan mata secara zigzag mencari pola huruf kapital atau angka", "Menandai kata kunci penunjuk soal"],
          formula: "Scanning Target == Scan for Numbers, Capital Letters, or Italics",
          examples: ["Finding '1984' or 'Professor Smith' instantly within a 500-word page."]
        }
      ]
    },
    {
      id: 4,
      title: "Listening Section - Core Signal Words",
      weekLabel: "Minggu 4",
      desc: "Melatih kepekaan pendengaran menangkap kata kunci penting dan perubahan opini di tengah-tengah percakapan audio.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Identifying Synonyms in Audio",
          description: "Mendeteksi jebakan di mana kata di kertas soal sering kali diucapkan menggunakan sinonim yang berbeda pada audio.",
          points: ["Membiasakan diri dengan parafrase penutur asli", "Mencatat kata kunci sebelum audio diputar"],
          formula: "Audio Text (Synonym) == Question Keyword (Target Match)",
          examples: ["Audio says 'highly sophisticated', Question says 'advanced technology'."]
        },
        {
          id: 2, label: "Hari 2", title: "Tracking Contrast Signpost Words",
          description: "Waspada terhadap kata peralihan yang membatalkan pernyataan sebelumnya secara mendadak.",
          points: ["Mengenali kata transisi (However, But, Although, On the other hand)", "Menentukan jawaban final setelah kontras diucapkan"],
          formula: "Statement A + BUT + Statement B (Statement B is usually the answer)",
          examples: ["'I wanted to block out Thursday, but Friday is much better.' -> Answer: Friday."]
        }
      ]
    }
  ],
  TOEFL: [
    {
      id: 1,
      title: "Structure & Written Expression - Sentence Core",
      weekLabel: "Minggu 1",
      desc: "Mengasah kemampuan mengenali pondasi kalimat bahasa Inggris baku yang lengkap secara struktural untuk TOEFL ITP Section 2.",
      progress: 100,
      days: [
        {
          id: 1, label: "Hari 1", title: "Missing Subject and Verb Mechanics",
          description: "Memastikan setiap kalimat mandiri memiliki komponen subjek dan kata kerja utama yang valid.",
          points: ["Mendeteksi kalimat rumpang tanpa subjek", "Menemukan kata kerja utama tersembunyi"],
          formula: "1 Independent Clause == 1 Subject + 1 Verb",
          examples: ["____ was backed up for miles on the freeway. (A) Yesterday (B) Traffic [Benar: B]"]
        },
        {
          id: 2, label: "Hari 2", title: "Objects of Prepositions Pitfalls",
          description: "Menghindari jebakan kata benda yang mengekor setelah preposisi dan sering mengecoh sebagai subjek utama.",
          points: ["Mengisolasi frase preposisi (in, at, under, behind)", "Mencari subjek asli di luar lingkaran preposisi"],
          formula: "Preposition + Noun == Object of Preposition (Not a Subject)",
          examples: ["To the graduate students ____ offered a grant. (A) the dean (B) was [Benar: A]"]
        }
      ]
    },
    {
      id: 2,
      title: "Structure - Multiple Clauses & Connectors",
      weekLabel: "Minggu 2",
      desc: "Menguasai penggabungan beberapa klausa menggunakan kata hubung koordinatif dan adverbial dengan tepat.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Coordinate Connectors Alignment",
          description: "Menggunakan kata hubung and, but, or, so, yet untuk merangkai dua klausa setara.",
          points: ["Menempatkan tanda koma sebelum kata hubung", "Memastikan keseimbangan struktur klausa"],
          formula: "Subject + Verb , [and/but/or/so] + Subject + Verb",
          examples: ["The power went out, so the computer shut down unexpectedly."]
        },
        {
          id: 2, label: "Hari 2", title: "Adverb Time & Cause Connectors",
          description: "Memahami pemindahan posisi connector waktu di awal atau di tengah kalimat majemuk.",
          points: ["Pemberian koma jika connector di awal kalimat", "Mengenali kata hubung (before, since, because, although)"],
          formula: "Connector + Subject + Verb , Subject + Verb",
          examples: ["Because the report was late, the director requested a meeting."]
        }
      ]
    },
    {
      id: 3,
      title: "Listening - Short Dialogues & Inferences",
      weekLabel: "Minggu 3",
      desc: "Mempelajari strategi mendengarkan baris kedua pada dialog pendek untuk menarik kesimpulan makna tersirat.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Focusing on the Second Line",
          description: "Kunci utama dialog pendek TOEFL hampir selalu berada pada respons pembicara kedua.",
          points: ["Menaruh perhatian penuh pada pembicara terakhir", "Mengabaikan repetisi di pembicara pertama"],
          formula: "Speaker 1 + SPEAKER 2 (Main Focus) == Location of Answer Key",
          examples: ["Man: 'Are you ready?' Woman: 'I haven't even started yet.' -> Meaning: She is not ready."]
        }
      ]
    },
    {
      id: 4,
      title: "Reading Comprehension - Vocabulary in Context",
      weekLabel: "Minggu 4",
      desc: "Menembak arti kosakata asing dalam bacaan menggunakan petunjuk kontekstual di sekitarnya.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Structural Context Clues",
          description: "Melihat tanda baca khusus seperti koma, tanda kurung, atau dashes sebagai indikator definisi kata.",
          points: ["Mendeteksi appositive penjelas arti", "Membaca jeli kalimat pendukung kosakata terkait"],
          formula: "Unknown Word , [Definition/Synonym] , or (Definition)",
          examples: ["The appraisal, or valuation, of the property took three business days."]
        }
      ]
    }
  ],
  JLPT: [
    {
      id: 1,
      title: "Gengo Chishiki - Tata Bahasa & Partikel N5",
      weekLabel: "Minggu 1",
      desc: "Penguasaan susunan kalimat dasar bahasa Jepang, penanda topik, subjek, serta objek partikel.",
      progress: 100,
      days: [
        {
          id: 1, label: "Hari 1", title: "Partikel Wa (は) & Ga (が) Mastery",
          description: "Membedakan penekanan topik pembicaraan umum dengan penegasan subjek spesifik.",
          points: ["Menggunakan Wa untuk subjek utama", "Menggunakan Ga untuk keberadaan benda atau kata sifat"],
          formula: "[Topik] + は + [Predikat] です  /  [Subjek] + が + います/あります",
          examples: ["わたしは アマンダ です。", "つくえの上に 本が あります。"]
        }
      ]
    },
    {
      id: 2,
      title: "Katakana & Huruf Kanji Dasar N5",
      weekLabel: "Minggu 2",
      desc: "Mengenali kosakata serapan asing serta simbol kanji alam dan angka yang kerap muncul di lembar ujian.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Katakana Loanwords Identification",
          description: "Melatih pelafalan kata serapan barat ke fonetik Jepang agar mudah ditebak maknanya.",
          points: ["Membaca kombinasi huruf Katakana panjang", "Menghubungkan arti kata dengan bahasa Inggris asli"],
          formula: "Katakana Characters == Foreign Words Translation",
          examples: ["トイレ (Toire) = Toilet", "コンピューター (Konpyuutaroo) = Computer"]
        }
      ]
    },
    {
      id: 3,
      title: "Dokkai - Membaca Pola Kalimat Pendek",
      weekLabel: "Minggu 3",
      desc: "Strategi membaca memo, pengumuman, dan cerita pendek dalam aksara Hiragana serta Kanji dasar.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Finding the Core Verb at the End",
          description: "Memahami struktur bahasa Jepang di mana kata kerja utama selalu diletakkan di akhir kalimat.",
          points: ["Memotong kalimat per partikel", "Langsung melompat ke akhir kalimat untuk mengetahui tindakan"],
          formula: "Subject + Object + VERB (At the very end)",
          examples: ["kore wa kinou gakkou de kaimashita (Ini kemarin dibeli di sekolah)."]
        }
      ]
    },
    {
      id: 4,
      title: "Choukai - Ujian Mendengarkan Respon Cepat",
      weekLabel: "Minggu 4",
      desc: "Melatih pendengaran untuk menangkap instruksi arah, waktu, dan jam dalam situasi sehari-hari.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Time and Counting Units Listen",
          description: "Menyaring angka penunjuk jam, hari, dan jumlah barang yang sering dimanipulasi di pilihan jawaban.",
          points: ["Menghafal pengecualian hitungan (Yokka, Itsuandtsu)", "Fokus pada perubahan keputusan pembicara"],
          formula: "Number + Counter Suffix (Ji, Fun, Nin, Mai)",
          examples: ["Sannin (3 orang), Gatsu (Bulan), Nanji (Jam berapa)."]
        }
      ]
    }
  ],
  HSK: [
    {
      id: 1,
      title: "Pinyin Phonetics & Sentence Structure 1",
      weekLabel: "Minggu 1",
      desc: "Mempelajari intonasi nada mandarin, inisial, final, serta urutan struktur subjek-predikat-objek standar.",
      progress: 100,
      days: [
        {
          id: 1, label: "Hari 1", title: "Four Core Tones & SVO Order",
          description: "Penguasaan mutlak 4 nada dasar vokal agar tidak keliru arti saat tes lisan maupun mendengar.",
          points: ["Melatih intonasi datar, naik, ayun, dan turun", "Menyusun klausa dasar mandarin"],
          formula: "Subject + Verb + Object (No Verb Tense Changes)",
          examples: ["我爱汉语 (Wǒ ài Hànyǔ - Saya cinta bahasa Mandarin)."]
        }
      ]
    },
    {
      id: 2,
      title: "Time Expressions & Modifiers Position",
      weekLabel: "Minggu 2",
      desc: "Meletakkan penunjuk waktu dan kata keterangan sebelum kata kerja sesuai tata bahasa Mandarin baku.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Time-When Placement Rule",
          description: "Aturan ketat penempatan keterangan waktu yang dilarang keras ditaruh di akhir kalimat.",
          points: ["Menaruh keterangan waktu tepat sebelum/sesudah subjek", "Membedakan durasi waktu dengan titik waktu"],
          formula: "Subject + Time When + Verb + Object",
          examples: ["我明天去学校 (Wǒ míngtiān qù xuéxiào - Saya besok pergi ke sekolah)."]
        }
      ]
    },
    {
      id: 3,
      title: "Listening - Image Matching Validation",
      weekLabel: "Minggu 3",
      desc: "Taktik mencocokkan dialog pendek audio HSK dengan gambar visual petunjuk yang tersedia secara akurat.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Action Verbs Matching Focus",
          description: "Menjaring kata kerja aksi utama dari rekaman suara untuk mencocokkan objek gambar.",
          points: ["Menandai kata benda dominan", "Menghubungkan kata kerja seperti Xie, Chi, Kan dengan visual"],
          formula: "Audio Key Action == Image Representation",
          examples: ["Hearing 'Xie zi' (Menulis kata) -> Match image of a person writing."]
        }
      ]
    },
    {
      id: 4,
      title: "Reading - Sentence Completion Patterns",
      weekLabel: "Minggu 4",
      desc: "Mengisi kekosongan teks menggunakan pilihan kata benda, sifat, atau tugas yang tepat berdasarkan kategori gramatikal.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Measure Words Selection Track",
          description: "Memilih kata bantu bilangan yang cocok berpasangan dengan kata benda target.",
          points: ["Mengenal kata bantu umum Ge, Ben, Zhi", "Menganalisis jenis benda setelah ruang kosong"],
          formula: "Number / Demonstrative + MEASURE WORD + Noun",
          examples: ["一本书 (Yì běn shū - Sebuah buku), 这个人 (Zhè ge rén)."]
        }
      ]
    }
  ],
  TOPIK: [
    {
      id: 1,
      title: "Korean Sentence Structure & Subject Particles",
      weekLabel: "Minggu 1",
      desc: "Transisi alur berpikir ke pola kalimat SOV (Subjek-Objek-Predikat) dan penempelan partikel vokal/konsonan.",
      progress: 100,
      days: [
        {
          id: 1, label: "Hari 1", title: "SOV Realignment & Eun/Neun",
          description: "Memahami struktur dasar kalimat Korea di mana kata kerja wajib ditaruh di bagian paling belakang.",
          points: ["Menempelkan Eun/Neun pada subjek utama/topik", "Memastikan objek mendahului kata kerja"],
          formula: "Subject +은/는 + Object + 을/를 + Verb/Adjective",
          examples: ["저는 한국어를 공부합니다 (Saya belajar bahasa Korea)."]
        }
      ]
    },
    {
      id: 2,
      title: "Honorifics & Formal Ending Conjugation",
      weekLabel: "Minggu 2",
      desc: "Mengubah kata kerja dasar ke bentuk formal sopan (Ayo/Oyo dan Sumnida) yang mutlak dipakai dalam teks ujian TOPIK.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "De-stemming Verbs & Sumnida Fitting",
          description: "Menghilangkan akhiran 'Da' pada kata kerja dasar dan menggantinya dengan akhiran formal resmi.",
          points: ["Mendeteksi batchim (konsonan bawah) kata kerja", "Memilih akhiran -sumnida atau -bni-da"],
          formula: "Verb Stem (With Batchim) + 습니다  /  (No Batchim) + ㅂ니다",
          examples: ["먹다 -> 먹습니다 (Makan)", "가다 -> 갑니다 (Pergi)"]
        }
      ]
    },
    {
      id: 3,
      title: "Listening - Situational Dialogue Tracking",
      weekLabel: "Minggu 3",
      desc: "Menganalisis lokasi, topik pembicaraan, dan hubungan antar pembicara di dalam rekaman audio pendek.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Identifying Common Place Vocab",
          description: "Menangkap kata penunjuk lokasi umum melalui kosa kata aktivitas penunjang di percakapan.",
          points: ["Mendengar kata kunci seperti gyeolje (bayar), chaek (buku)", "Menyimpulkan lokasi toko atau perpustakaan"],
          formula: "Activity Clues == Spatial Location Inference",
          examples: ["Hearing 'Upyo' (Perangko) and 'Pyeonji' (Surat) -> Location: Ucheguk (Kantor Pos)."]
        }
      ]
    },
    {
      id: 4,
      title: "Reading - Contextual Adverbs & Connectors",
      weekLabel: "Minggu 4",
      desc: "Menghubungkan dua buah kalimat terpisah menggunakan kata sambung sebab-akibat atau pertentangan yang serasi.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Geureona vs Geurigo Context Analysis",
          description: "Memilih konjungsi awal kalimat yang tepat sesuai dengan korelasi logika kalimat satu dan dua.",
          points: ["Mendeteksi kontradiksi makna antar kalimat", "Mengenali fungsi Geureona, Geureomyon, Geurigo"],
          formula: "Sentence 1. + [Adverb Connector] + Sentence 2.",
          examples: ["비가 오다. (Geureona) berselancar tetap menyenangkan."]
        }
      ]
    }
  ],
  CAE: [
    {
      id: 1,
      title: "Use of English - Key Word Transformation",
      weekLabel: "Minggu 1",
      desc: "Melatih ketajaman gramatikal tingkat C1 melalui metode merombak struktur sintaks tanpa mengubah esensi makna asli.",
      progress: 100,
      days: [
        {
          id: 1, label: "Hari 1", title: "Inversion & Phrasal Verbs Constraints",
          description: "Menulis ulang kalimat target menggunakan kata kunci wajib berkisar antara 3 sampai 6 kata saja.",
          points: ["Menguasai struktur inversi formal penekanan", "Mempertahankan keselarasan tenses asal"],
          formula: "Original Sentence -> [Given Keyword (Unchanged)] -> New Identical Sentence",
          examples: ["'Joan found it difficult to decide.' -> CHOSEN -> 'Joan had difficulty in choosing what to do.'"]
        }
      ]
    },
    {
      id: 2,
      title: "Reading - Multiple Matching Strategies",
      weekLabel: "Minggu 2",
      desc: "Mencocokkan sekumpulan pertanyaan opini dengan cuplikan teks artikel opini dari beberapa penulis berbeda.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Identifying Paraphrased Opinions",
          description: "Mendeteksi parafrase kalimat abstrak tingkat tinggi untuk menemukan kesamaan pandangan antar komentator.",
          points: ["Mengisolasi kata kunci emosi/argumen teks", "Menghindari jebakan kecocokan kata verbal semu"],
          formula: "Abstract Prompt Statement == Highly Parafrased Text Chunk",
          examples: ["Prompt: 'Shares writer's skeptical view.' -> Text: 'He is deeply unconvinced about the outcome.'"]
        }
      ]
    },
    {
      id: 3,
      title: "Writing - Formal Essay & Proposal Cohesion",
      weekLabel: "Minggu 3",
      desc: "Menyusun teks proposal atau esai ekspositori C1 dengan tingkat kejelasan argumen dan struktur tata bahasa tingkat tinggi.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Advanced Inversion for Impact",
          description: "Mengaplikasikan pola kalimat inversi negatif di awal paragraf untuk mendongkrak penilaian kriteria fleksibilitas struktur.",
          points: ["Memindahkan adverb negatif ke depan", "Membalik susunan subjek dan kata kerja bantu"],
          formula: "Rarely / Seldom / Not only + Auxiliary + Subject + Main Verb",
          examples: ["Seldom have I witnessed such an outstanding display of academic excellence."]
        }
      ]
    },
    {
      id: 4,
      title: "Listening - Multiple Choice Nuances",
      weekLabel: "Minggu 4",
      desc: "Menguraikan makna monolog panjang tentang topik sosiologi atau profesional yang sarat akan metafora penutur asli.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Decoding Speaker Nuance & Attitude",
          description: "Menangkap sikap asli, perasaan terselubung, atau kesepakatan tersirat dari dua pembicara profesional.",
          points: ["Menganalisis intonasi sarkasme atau keraguan", "Melihat kesimpulan besar di akhir diskusi"],
          formula: "Literal Speech Verbalizing != Underlying Speaker Stance",
          examples: ["Speaker says 'Right, as if that would ever work' -> Meaning: He thinks it will fail."]
        }
      ]
    }
  ]
};

const ROADMAP_TEMPLATES = {
  IELTS: {
    1: [
      "Introduction to Simple Present",
      "Subject-Verb Agreement in Present",
      "He/She/It Rules for Present",
      "Negative Sentences with Do/Does",
      "Questions & WH-Forms",
      "Adverbs of Frequency",
      "Present Tense Mixed Practice"
    ],
    2: [
      "Regular vs Irregular Past Verbs",
      "Past Continuous Interruptions",
      "Past Simple Storytelling",
      "Sequence of Past Events",
      "Reported Speech Basics",
      "Historical Reading Practice",
      "Past Tense Mixed Review"
    ],
    3: [
      "Skimming for Main Ideas",
      "Scanning for Keywords",
      "Paraphrase and MCQ Practice",
      "False vs Not Given Questions",
      "Inference from Academic Texts",
      "Longer Reading Comprehension",
      "Reading Strategy Evaluation"
    ],
    4: [
      "Graph Vocabulary and Trends",
      "Essay Structure and Cohesion",
      "Comparing Data in Writing",
      "Formal Linking Words",
      "Argument and Opinion Writing",
      "Review of Academic Lexis",
      "Writing and Cohesion Mixed Practice"
    ]
  },
  TOEFL: {
    1: [
      "Subject + Verb Core Patterns",
      "Object of Preposition Pitfalls",
      "Missing Verb Identification",
      "Missing Subject Identification",
      "Gerund vs Infinitive Patterns",
      "Dialogue Sentence Completion",
      "Sentence Structure Accuracy Review"
    ],
    2: [
      "Coordinate Connectors",
      "Adverb Clause Connectors",
      "Appositive Identification",
      "Subjunctive and Agreement",
      "Noun Clause Practice",
      "Combined Clause Reading",
      "Connector Strategy Review"
    ],
    3: [
      "Short Dialogue Focus",
      "Second Speaker Clues",
      "Inference from Speech",
      "Listening for Detail",
      "Summary from Dialogue",
      "Rapid Response Practice",
      "Listening Strategy Review"
    ],
    4: [
      "Literal Detail Reading",
      "Vocabulary in Context",
      "Pronoun Reference Tracking",
      "Paraphrase Recognition",
      "Implied Information Practice",
      "Paragraph Location Reading",
      "Reading Comprehension Review"
    ]
  },
  JLPT: {
    1: [
      "Partikel Wa vs Ga",
      "Partikel Wo / No / Ni / E",
      "Desu dan Arimasu Form",
      "Object Particle Practice",
      "De / Method Particles",
      "Jikoshoukai Reading",
      "JLPT N5 Review"
    ],
    2: [
      "Katakana Loanwords",
      "Kanji Numbers and Directions",
      "Basic Verb Kanji",
      "Adjective Kanji Practice",
      "Compound N5 Vocabulary",
      "Simple Sentence Reading",
      "Kanji and Vocab Review"
    ],
    3: [
      "Finding the Core Verb",
      "Memo Reading Basics",
      "Notice and Announcement Reading",
      "Simple Email Reading",
      "Inference in Short Texts",
      "Sentence Structure Review",
      "Dokkai Strategy Review"
    ],
    4: [
      "Time and Counting Words",
      "Listening Simple Commands",
      "Location Vocabulary in Speech",
      "Question Particle Practice",
      "Listening Detail Focus",
      "Short Dialogue Inference",
      "Choukai Review"
    ]
  },
  HSK: {
    1: [
      "Four Tones and SVO Order",
      "Shì and Basic Copula",
      "Time Expressions and Zài",
      "Measure Words Basics",
      "Basic Sentence Patterns",
      "Pinyin Reading Practice",
      "HSK 1 Review"
    ],
    2: [
      "Time Expression Placement",
      "Xiǎng, Yào, Huì Practice",
      "Measure Word Challenges",
      "Modal Verb Sentence Patterns",
      "Dialogue Completion Practice",
      "Grammar in Context Reading",
      "HSK 2 Review"
    ],
    3: [
      "Shì...de Past Focus",
      "Bǐ Comparison Patterns",
      "De Complement of Degree",
      "Narrative Reading Practice",
      "Character Recognition Practice",
      "Sentence Pattern Review",
      "HSK 3 Review"
    ],
    4: [
      "Question Words and Negation",
      "Méi Past Negation",
      "Zhe Continuous Aspect",
      "Reduplication Practice",
      "Short Dialogue Reading",
      "Audio Context Matching",
      "Reading and Listening Review"
    ]
  },
  TOPIK: {
    1: [
      "SOV Structure and Eun/Neun",
      "Object Particle Eul/Reul",
      "Location Particle E",
      "Subject-Object Practice",
      "Sentence Ending Forms",
      "Particle Reading Practice",
      "TOPIK 1 Review"
    ],
    2: [
      "Formal Ending Sumnida",
      "Informal Ending Ayo/Oyo",
      "Past Tense Forms",
      "Honorific Forms",
      "Sentence Composition Practice",
      "Politeness Reading",
      "TOPIK 2 Review"
    ],
    3: [
      "Sino-Korean Numbers",
      "Native Korean Numbers",
      "Counter Word Practice",
      "Situational Vocabulary",
      "Passive and Causative Patterns",
      "Idiomatic Phrase Practice",
      "Vocabulary Review"
    ],
    4: [
      "Pamphlet and Info Reading",
      "Dialogue Matching Practice",
      "Time and Price Detail Reading",
      "Paragraph Order Strategy",
      "Blank Filling Practice",
      "Implied Meaning Questions",
      "TOPIK Test Review"
    ]
  },
  CAE: {
    1: [
      "Advanced Passive Structures",
      "Phrasal Verb Transformation",
      "Word Formation Practice",
      "Key Word Transformation",
      "Article Reading Practice",
      "Sentence Restructuring",
      "Use of English Review"
    ],
    2: [
      "Fiction Paragraph Analysis",
      "Multiple Matching Practice",
      "Gapped Text Strategy",
      "Vocabulary in Context",
      "Paraphrase Identification",
      "Text Comparison Review",
      "Advanced Reading Review"
    ],
    3: [
      "Formal Transition Vocabulary",
      "Proposal and Report Style",
      "Cohesive Device Practice",
      "Argument Structure",
      "Essay Writing Review",
      "Discourse Marker Practice",
      "CAE Writing Review"
    ],
    4: [
      "Agreement in Listening",
      "Monologue Analysis",
      "Speaker Attitude Detection",
      "Irony and Nuance",
      "Panel Discussion Comprehension",
      "Rapid Response Practice",
      "Listening Strategy Review"
    ]
  }
};

const getDayGroupInfo = (dayIndex) => {
  if (dayIndex <= 2) return { label: "Pilihan Ganda", note: "Latihan dasar pilihan ganda untuk materi inti." };
  if (dayIndex <= 4) return { label: "Pilihan Ganda & Isian", note: "Kombinasi soal pilihan ganda dan isian untuk memperdalam konsep." };
  if (dayIndex <= 6) return { label: "Isian & Reading", note: "Soal isian dan bacaan untuk melatih pemahaman konteks." };
  return { label: "Campuran - 10 Soal", note: "Evaluasi campuran untuk mengukur penguasaan materi minggu ini." };
};

const getDefaultDayTemplate = (testType, weekId, dayIndex, week) => {
  const titlesByWeek = ROADMAP_TEMPLATES[testType]?.[weekId] || [];
  const title = titlesByWeek[dayIndex - 1] || `${week.title} - Materi Hari ${dayIndex}`;
  const group = getDayGroupInfo(dayIndex);
  const description = `Kisi-kisi ${testType} hari ${dayIndex}: ${group.note} Fokus pada topik '${title}'.`;
  const points = [
    `Memahami konsep inti ${title}.`,
    `Latihan ${group.label.toLowerCase()} sesuai kebutuhan tes ${testType}.`,
    `Menghubungkan teori dengan soal ujian.`
  ];
  const formula = `Praktik ${group.label} untuk materi ${title}.`;
  const examples = [`Contoh penerapan materi '${title}' dalam konteks ujian ${testType}.`];

  return {
    id: dayIndex,
    label: `Hari ${dayIndex}`,
    title,
    description,
    points,
    formula,
    examples,
    completed: false,
  };
};

export default function MyRoadmap() {
  const navigate = useNavigate();

  // 1. VIEW STATE CONTROL
  const [viewMode, setViewMode] = useState("list"); // "list" atau "detail"
  const [selectedWeek, setSelectedWeek] = useState(null);
  const getUserEmail = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      return user?.email || "";
    } catch {
      return "";
    }
  };

  const emailKey = getUserEmail() ? encodeURIComponent(getUserEmail()) : "guest";

  const getRoadmapMetaKey = () => `roadmap_meta_${emailKey}`;
  const getRoadmapKey = (testType) => `roadmap_${emailKey}_${testType}`;

  const [targetTestType, setTargetTestType] = useState(() => {
    const savedRoadmap = JSON.parse(localStorage.getItem(getRoadmapMetaKey()) || "{}");
    return savedRoadmap.testType || "IELTS";
  });

  const ensureSevenDays = (testType, week) => {
    const days = week.days?.map((day) => ({ ...day, completed: day.completed ?? false })) || [];
    const maxDays = 7;
    if (days.length >= maxDays) return days;

    const extraDays = Array.from({ length: maxDays - days.length }, (_, index) => {
      const dayIndex = days.length + index + 1;
      return getDefaultDayTemplate(testType, week.id, dayIndex, week);
    });

    return [...days, ...extraDays];
  };

  const initializeWeeksData = (source, testType) => {
    return source.map((week) => ({
      ...week,
      days: ensureSevenDays(testType, week),
    }));
  };

  // 2. STATE UTAMA DATA ROADMAP - OTOMATIS BERUBAH TOTAL SESUAI TARGET TES DARI PROFILE
  const [weeksData, setWeeksData] = useState(() => {
    const saved = localStorage.getItem(getRoadmapKey(targetTestType));

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    if (!parsed || parsed.length === 0) {
      return [];
    }

    return initializeWeeksData(parsed, targetTestType);
  });

  // 3. SINKRONISASI TEST TYPE DAN RELOAD DATA JIKA TEST TYPE BERUBAH
  useEffect(() => {
    const savedRoadmap = JSON.parse(localStorage.getItem(getRoadmapMetaKey()) || "{}");
    const newTestType = savedRoadmap.testType || "IELTS";

    if (newTestType !== targetTestType) {
      setTargetTestType(newTestType);
      const saved = localStorage.getItem(getRoadmapKey(newTestType));
      if (!saved) {
        setWeeksData([]);
      } else {
        const parsed = JSON.parse(saved);

        if (!parsed || parsed.length === 0) {
          setWeeksData([]);
        } else {
          setWeeksData(initializeWeeksData(parsed, newTestType));
        }
      }
      setSelectedWeek(null);
      setViewMode("list");
    }
  }, []);

  // 4. SIMPAN DATA KE LOCALSTORAGE SETIAP KALI WEEKSDATA BERUBAH
  useEffect(() => {
    localStorage.setItem(getRoadmapKey(targetTestType), JSON.stringify(weeksData));
  }, [weeksData, targetTestType]);

  // 5. INTERNAL NAVIGATION STATE
  const [activeDay, setActiveDay] = useState(1);

  const getWeekProgress = (week) => {
    const completedDays = week.days?.filter((day) => day.completed).length || 0;
    const totalDays = week.days?.length || 1;
    return Math.round((completedDays / totalDays) * 100);
  };

  const totalWeeks = weeksData.length;
  const totalDays = weeksData.reduce((sum, item) => sum + (item.days?.length || 0), 0);
  const totalCompletedDays = weeksData.reduce(
    (sum, item) => sum + (item.days?.filter((day) => day.completed).length || 0),
    0
  );
  const overallPercentage = totalDays > 0 ? Math.round((totalCompletedDays / totalDays) * 100) : 0;

  // 5. ACTION HANDLER MASUK KE DETAIL
  const handleOpenDetail = (week) => {
    if (!week.days || week.days.length === 0) {
      alert(`Materi detail untuk ${week.weekLabel} sedang disiapkan!`);
      return;
    }
    setSelectedWeek(week);
    setActiveDay(1); 
    setViewMode("detail");
  };

  // 6. ACTION HANDLER START QUIZ
  const handleStartQuiz = () => {
    if (!selectedWeek) return;

    const currentDay = selectedWeek.days.find((day) => day.id === activeDay);
    if (!currentDay) return;
    if (currentDay.completed) {
      alert(`Hari ${activeDay} sudah selesai. Jika ingin mengulang, buka kembali materi dari roadmap.`);
      return;
    }

    const quizContext = {
      testType: targetTestType,
      weekId: selectedWeek.id,
      dayId: activeDay,
    };
    localStorage.setItem("roadmap_quiz_context", JSON.stringify(quizContext));
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen bg-white antialiased flex flex-col justify-between">
      
      {/* ================= NAVBAR GLOBAL ================= */}
      <nav className="bg-[#2471A3] flex items-center justify-between px-16 py-4 sticky top-0 z-50 shadow-sm text-white">
        <div className="shrink-0 cursor-pointer" onClick={() => { setViewMode("list"); navigate("/dashboard"); }}>
          <img src={logo} alt="Lateron" className="w-[100px] h-auto object-contain brightness-0 invert" />
        </div>
        
        <div className="flex items-center gap-8 text-[15px] opacity-90">
          <Link to="/dashboard" className="hover:underline">Home</Link>
          <Link to="/generate" className="hover:underline">Generate</Link>
          <button onClick={() => setViewMode("list")} className="font-bold border-b-2 border-white pb-1 bg-transparent text-white cursor-pointer">My Roadmap</button>
          <Link to="/profile" className="hover:underline">Profile</Link>
        </div>
      </nav>

      {/* ================= CONTENT AREA ================= */}
      
      {viewMode === "list" ? (
        /* ---------------- TAMPILAN 1: UTAMA / LIST MINGGUAN ---------------- */
        <main className="max-w-6xl w-full mx-auto px-8 py-12 flex-grow">
          
          {weeksData.length === 0 ? (
            /* ================= KONDISI: BELUM GENERATE (EMPTY STATE) ================= */
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl p-16 text-center bg-gray-50/50 my-12 min-h-[400px]">
              <svg className="w-20 h-20 text-[#5A92B5]/50 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>

              <h2 className="text-[22px] font-bold text-[#143F5E] mb-2">
                Belum Ada Roadmap yang Dibuat
              </h2>
              
              <p className="text-[14px] text-gray-400 max-w-md mb-8 leading-relaxed">
                Kamu belum menentukan atau membuat jalur pembelajaran mandiri. Silakan generate target persiapan tes pilihanmu terlebih dahulu untuk melihat materi mingguan.
              </p>

              <button
                onClick={() => navigate("/generate")}
                className="px-8 py-3.5 bg-[#2471A3] hover:bg-[#1C5D86] text-white font-semibold text-[14px] rounded-full shadow-md transition-all cursor-pointer"
              >
                Mulai Generate Roadmap
              </button>
            </div>
          ) : (
            /* ================= KONDISI: SUDAH GENERATE (TAMPILKAN DETAIL) ================= */
            <>
              {/* Header Ringkasan */}
              <div className="flex justify-between items-start border-b border-gray-100 pb-8 mb-12">
                <div>
                  <h1 className="text-[32px] font-bold text-[#143F5E] mb-1">My Learning Roadmap</h1>
                  <p className="text-[14px] text-gray-400 font-medium tracking-wide uppercase">
                    Kategori Target: <span className="text-[#2471A3] font-bold">{targetTestType} Preparation</span> &bull; {totalWeeks} Weeks Plan
                  </p>
                </div>
                <div className="text-right">
                  <h2 className="text-[40px] font-bold text-[#76D7C4] leading-none mb-1">{overallPercentage}%</h2>
                  <p className="text-[16px] font-bold text-[#76D7C4] mb-1">Completed</p>
                  <p className="text-[13px] text-[#2471A3] italic font-medium">You are getting closer to your goal.</p>
                </div>
              </div>

              {/* Timeline Wrapper */}
              <div className="relative pl-4">
                {weeksData.map((item, index) => {
                  const itemProgress = getWeekProgress(item);
                  const isCompleted = itemProgress === 100;
                  const isOngoing = itemProgress > 0 && itemProgress < 100;
                  const isLocked = itemProgress === 0;
                  const isUnlocked = weeksData
                    .slice(0, index)
                    .every((prevWeek) => getWeekProgress(prevWeek) === 100);

                  return (
                    <div key={item.id} className="flex items-start gap-12 relative pb-16 last:pb-0">
                      {index !== weeksData.length - 1 && (
                        <div className="absolute left-[15px] top-8 bottom-0 w-[1.5px] bg-gray-200 z-0" />
                      )}

                      <div className="relative z-10 flex items-center gap-6 w-[130px] shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                          isCompleted ? "bg-[#2471A3] border-[#2471A3]" : "bg-[#EAF2F8] border-white"
                        }`}>
                          {isCompleted ? (
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <div className={`w-2.5 h-2.5 rounded-full ${isOngoing ? "bg-[#2471A3]" : "bg-white"}`} />
                          )}
                        </div>
                        <span className={`text-[16px] font-bold ${isLocked ? "text-gray-400" : "text-[#143F5E]"}`}>
                          {item.weekLabel}
                        </span>
                      </div>

                      <div className="flex-1">
                        <h3 className={`text-[18px] font-bold mb-2 ${isLocked ? "text-gray-400" : "text-[#143F5E]"}`}>
                          {item.title}
                        </h3>
                        <p className="text-[13px] text-gray-400 leading-relaxed mb-4 text-justify">
                          {item.desc}
                        </p>
                        
                        <div className="flex items-center gap-4">
                          <span className="text-[13px] font-bold text-gray-400 w-8">{itemProgress}%</span>
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#76D7C4] rounded-full transition-all duration-500" 
                              style={{ width: `${itemProgress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="w-[140px] shrink-0 text-right pt-2">
                        <button
                          onClick={() => {
                            if (!isUnlocked) {
                              alert("Selesaikan minggu sebelumnya terlebih dahulu sebelum membuka yang berikutnya.");
                              return;
                            }
                            handleOpenDetail(item);
                          }}
                          disabled={!isUnlocked}
                          className={`w-full text-[14px] font-semibold py-2.5 px-6 rounded-full transition-all ${
                            !isUnlocked
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : isLocked
                              ? "bg-[#9FB5C4] text-white hover:bg-gray-400"
                              : "bg-[#2471A3] text-white hover:bg-[#1C5D86]"
                          }`}
                        >
                          {!isUnlocked ? "Terkunci" : isLocked ? "Mulai" : "Tinjau Ulang"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </main>
      ) : (
        /* ---------------- TAMPILAN 2: DETAIL HARIAN ---------------- */
        <main className="max-w-7xl w-full mx-auto px-16 py-10 flex-grow flex gap-16">
          
          {/* Sidebar Navigasi Hari */}
          <div className="w-[26%] shrink-0 border-r border-gray-100 pr-10">
            <button 
              onClick={() => setViewMode("list")}
              className="flex items-center gap-2 text-[14px] text-gray-700 font-semibold hover:text-[#2471A3] transition-colors mb-8 bg-transparent border-none cursor-pointer"
            >
              <span>&larr;</span> Kembali ke roadmap
            </button>

            <h2 className="text-[20px] font-bold text-[#143F5E] mb-1">Rencana Belajar</h2>
            <p className="text-[13px] text-gray-400 mb-8">{selectedWeek?.days.length} materi aktif siap dipelajari</p>

            <div className="flex flex-col gap-1.5">
              {selectedWeek?.days.map((day) => {
                const isActive = activeDay === day.id;
                return (
                  <div
                    key={day.id}
                    onClick={() => setActiveDay(day.id)}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      isActive ? "bg-[#D6EAF8] text-[#143F5E]" : "bg-white hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    <p className={`text-[11px] font-semibold mb-1 ${isActive ? "text-[#2471A3]" : "text-gray-400"}`}>
                      {day.label}
                    </p>
                    <p className="text-[14px] font-bold leading-snug">{day.title}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Area Konten Kanan Dinamis */}
          {(() => {
            const currentDayData = selectedWeek?.days.find(d => d.id === activeDay);
            return (
              <div className="flex-1 pl-4 pt-10">
                <p className="text-[13px] text-gray-400 font-semibold mb-1">
                  {selectedWeek?.weekLabel} &bull; Hari {activeDay}
                </p>
                <h1 className="text-[24px] font-bold text-[#143F5E] mb-2">
                  {currentDayData?.title}
                </h1>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-8 text-justify">
                  {currentDayData?.description}
                </p>

                {/* Section: What You Will Learn */}
                <div className="mb-8">
                  <h3 className="text-[15px] font-bold text-[#143F5E] mb-3">What You Will Learn</h3>
                  <ul className="list-disc list-inside text-[13px] text-gray-600 space-y-2 pl-1">
                    {currentDayData?.points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>

                {/* Section: Learning Material */}
                <div className="mb-8">
                  <h3 className="text-[15px] font-bold text-[#143F5E] mb-3">Learning Material</h3>
                  <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
                    Pelajari dan ingat pola struktur rumus penting di bawah ini dengan seksama.
                  </p>
                  <div className="w-full bg-[#D6EAF8] text-[#143F5E] font-bold text-[15px] py-4 rounded-xl text-center shadow-xs select-all">
                    {currentDayData?.formula}
                  </div>
                </div>

                {/* Section: Example Sentences */}
                <div className="mb-12">
                  <h3 className="text-[15px] font-bold text-[#143F5E] mb-3">Example Sentences</h3>
                  <ul className="list-disc list-inside text-[13px] text-gray-600 space-y-2.5 pl-1">
                    {currentDayData?.examples.map((ex, index) => (
                      <li key={index} className="italic text-gray-700">"{ex}"</li>
                    ))}
                  </ul>
                </div>

                {/* Tombol Start Quiz */}
                <div className="flex justify-end">
                  <button 
                    onClick={handleStartQuiz}
                    disabled={currentDayData?.completed}
                    className={`text-white text-[14px] font-semibold px-8 py-3 rounded-full transition-colors shadow-md cursor-pointer ${currentDayData?.completed ? "bg-gray-300 text-gray-700 cursor-not-allowed" : "bg-[#2471A3] hover:bg-[#1C5D86]"}`}
                  >
                    {currentDayData?.completed ? "Finish Quiz" : "Start Quiz"}
                  </button>
                </div>
              </div>
            );
          })()}
        </main>
      )}

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

    </div>
  );
}