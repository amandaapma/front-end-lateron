const expertRoadmap = {
  IELTS: [],
  TOEFL: [],
  JLPT: [],
  HSK: [],
  TOPIK: [],
  CAE: [],
};

const generateExpert = (test) => [
  { week: 1, day: 1, title: `${test} - Advanced Grammar Mastery`, skill: "Grammar", level: "Expert" },
  { week: 1, day: 2, title: `${test} - Academic Writing Style`, skill: "Writing", level: "Expert" },
  { week: 1, day: 3, title: `${test} - High-Level Vocabulary`, skill: "Vocabulary", level: "Expert" },
  { week: 1, day: 4, title: `${test} - Critical Reading`, skill: "Reading", level: "Expert" },
  { week: 1, day: 5, title: `${test} - Essay Argumentation`, skill: "Writing", level: "Expert" },
  { week: 1, day: 6, title: `${test} - Cohesion Mastery`, skill: "Writing", level: "Expert" },
  { week: 1, day: 7, title: `${test} - Weekly Analysis`, skill: "Review", level: "Expert" },

  { week: 2, day: 1, title: `${test} - Complex Essay Writing`, skill: "Writing", level: "Expert" },
  { week: 2, day: 2, title: `${test} - Advanced Reading Logic`, skill: "Reading", level: "Expert" },
  { week: 2, day: 3, title: `${test} - Error-Free Grammar`, skill: "Grammar", level: "Expert" },
  { week: 2, day: 4, title: `${test} - Formal Register`, skill: "Writing", level: "Expert" },
  { week: 2, day: 5, title: `${test} - Precision Vocabulary`, skill: "Vocabulary", level: "Expert" },
  { week: 2, day: 6, title: `${test} - Band Score Strategy`, skill: "Exam", level: "Expert" },
  { week: 2, day: 7, title: `${test} - Review`, skill: "Review", level: "Expert" },

  { week: 3, day: 1, title: `${test} - Timed Writing`, skill: "Writing", level: "Expert" },
  { week: 3, day: 2, title: `${test} - Analytical Reading`, skill: "Reading", level: "Expert" },
  { week: 3, day: 3, title: `${test} - Grammar Perfection`, skill: "Grammar", level: "Expert" },
  { week: 3, day: 4, title: `${test} - Advanced Paraphrasing`, skill: "Vocabulary", level: "Expert" },
  { week: 3, day: 5, title: `${test} - Essay Optimization`, skill: "Writing", level: "Expert" },
  { week: 3, day: 6, title: `${test} - Full Mock Test`, skill: "Exam", level: "Expert" },
  { week: 3, day: 7, title: `${test} - Review`, skill: "Review", level: "Expert" },

  { week: 4, day: 1, title: `${test} - Final Grammar Fix`, skill: "Grammar", level: "Expert" },
  { week: 4, day: 2, title: `${test} - Final Vocabulary Boost`, skill: "Vocabulary", level: "Expert" },
  { week: 4, day: 3, title: `${test} - Final Writing Drill`, skill: "Writing", level: "Expert" },
  { week: 4, day: 4, title: `${test} - Final Reading Drill`, skill: "Reading", level: "Expert" },
  { week: 4, day: 5, title: `${test} - Band Simulation`, skill: "Exam", level: "Expert" },
  { week: 4, day: 6, title: `${test} - Final Mock Test`, skill: "Exam", level: "Expert" },
  { week: 4, day: 7, title: `${test} - Final Evaluation`, skill: "Review", level: "Expert" },
];

expertRoadmap.IELTS = generateExpert("IELTS");
expertRoadmap.TOEFL = generateExpert("TOEFL ITP");
expertRoadmap.JLPT = generateExpert("JLPT");
expertRoadmap.HSK = generateExpert("HSK");
expertRoadmap.TOPIK = generateExpert("TOPIK");
expertRoadmap.CAE = generateExpert("CAE");

export default expertRoadmap;