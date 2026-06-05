const intermediateRoadmap = {
  IELTS: [],
  TOEFL: [],
  JLPT: [],
  HSK: [],
  TOPIK: [],
  CAE: [],
};

const generateIntermediate = (test) => [
  { week: 1, day: 1, title: `${test} - Complex Sentences`, skill: "Grammar", level: "Intermediate" },
  { week: 1, day: 2, title: `${test} - Academic Vocabulary`, skill: "Vocabulary", level: "Intermediate" },
  { week: 1, day: 3, title: `${test} - Reading Inference`, skill: "Reading", level: "Intermediate" },
  { week: 1, day: 4, title: `${test} - Paragraph Structure`, skill: "Writing", level: "Intermediate" },
  { week: 1, day: 5, title: `${test} - Tenses Review`, skill: "Grammar", level: "Intermediate" },
  { week: 1, day: 6, title: `${test} - Cohesion Words`, skill: "Writing", level: "Intermediate" },
  { week: 1, day: 7, title: `${test} - Weekly Review`, skill: "Review", level: "Intermediate" },

  { week: 2, day: 1, title: `${test} - Passive Voice`, skill: "Grammar", level: "Intermediate" },
  { week: 2, day: 2, title: `${test} - Essay Writing`, skill: "Writing", level: "Intermediate" },
  { week: 2, day: 3, title: `${test} - Reading Detail Questions`, skill: "Reading", level: "Intermediate" },
  { week: 2, day: 4, title: `${test} - Synonyms & Paraphrasing`, skill: "Vocabulary", level: "Intermediate" },
  { week: 2, day: 5, title: `${test} - Conditional Sentences`, skill: "Grammar", level: "Intermediate" },
  { week: 2, day: 6, title: `${test} - Writing Structure`, skill: "Writing", level: "Intermediate" },
  { week: 2, day: 7, title: `${test} - Review`, skill: "Review", level: "Intermediate" },

  { week: 3, day: 1, title: `${test} - Argument Essay`, skill: "Writing", level: "Intermediate" },
  { week: 3, day: 2, title: `${test} - Reading Analysis`, skill: "Reading", level: "Intermediate" },
  { week: 3, day: 3, title: `${test} - Advanced Grammar`, skill: "Grammar", level: "Intermediate" },
  { week: 3, day: 4, title: `${test} - Formal Vocabulary`, skill: "Vocabulary", level: "Intermediate" },
  { week: 3, day: 5, title: `${test} - Essay Cohesion`, skill: "Writing", level: "Intermediate" },
  { week: 3, day: 6, title: `${test} - Practice Test`, skill: "Exam", level: "Intermediate" },
  { week: 3, day: 7, title: `${test} - Review`, skill: "Review", level: "Intermediate" },

  { week: 4, day: 1, title: `${test} - Mock Reading`, skill: "Reading", level: "Intermediate" },
  { week: 4, day: 2, title: `${test} - Mock Writing`, skill: "Writing", level: "Intermediate" },
  { week: 4, day: 3, title: `${test} - Grammar Drill`, skill: "Grammar", level: "Intermediate" },
  { week: 4, day: 4, title: `${test} - Vocabulary Drill`, skill: "Vocabulary", level: "Intermediate" },
  { week: 4, day: 5, title: `${test} - Timed Essay`, skill: "Writing", level: "Intermediate" },
  { week: 4, day: 6, title: `${test} - Full Mock Test`, skill: "Exam", level: "Intermediate" },
  { week: 4, day: 7, title: `${test} - Final Review`, skill: "Review", level: "Intermediate" },
];

intermediateRoadmap.IELTS = generateIntermediate("IELTS");
intermediateRoadmap.TOEFL = generateIntermediate("TOEFL ITP");
intermediateRoadmap.JLPT = generateIntermediate("JLPT");
intermediateRoadmap.HSK = generateIntermediate("HSK");
intermediateRoadmap.TOPIK = generateIntermediate("TOPIK");
intermediateRoadmap.CAE = generateIntermediate("CAE");

export default intermediateRoadmap;