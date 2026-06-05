const basicRoadmap = {
  IELTS: [],
  TOEFL: [],
  JLPT: [],
  HSK: [],
  TOPIK: [],
  CAE: [],
};

// helper generator pola 28 hari
const generateBasic = (test) => [
  { week: 1, day: 1, title: `${test} - Basic Grammar: Sentence Structure`, skill: "Grammar", level: "Basic" },
  { week: 1, day: 2, title: `${test} - Parts of Speech`, skill: "Grammar", level: "Basic" },
  { week: 1, day: 3, title: `${test} - Basic Vocabulary 1`, skill: "Vocabulary", level: "Basic" },
  { week: 1, day: 4, title: `${test} - Basic Reading Comprehension`, skill: "Reading", level: "Basic" },
  { week: 1, day: 5, title: `${test} - Present Tense`, skill: "Grammar", level: "Basic" },
  { week: 1, day: 6, title: `${test} - Simple Writing Sentence`, skill: "Writing", level: "Basic" },
  { week: 1, day: 7, title: `${test} - Mini Review Week 1`, skill: "Review", level: "Basic" },

  { week: 2, day: 1, title: `${test} - Past Tense`, skill: "Grammar", level: "Basic" },
  { week: 2, day: 2, title: `${test} - Vocabulary Builder 2`, skill: "Vocabulary", level: "Basic" },
  { week: 2, day: 3, title: `${test} - Reading Simple Text`, skill: "Reading", level: "Basic" },
  { week: 2, day: 4, title: `${test} - Articles (a, an, the)`, skill: "Grammar", level: "Basic" },
  { week: 2, day: 5, title: `${test} - Prepositions`, skill: "Grammar", level: "Basic" },
  { week: 2, day: 6, title: `${test} - Writing Paragraph Basic`, skill: "Writing", level: "Basic" },
  { week: 2, day: 7, title: `${test} - Review Week 2`, skill: "Review", level: "Basic" },

  { week: 3, day: 1, title: `${test} - Future Tense`, skill: "Grammar", level: "Basic" },
  { week: 3, day: 2, title: `${test} - Vocabulary Topic Daily Life`, skill: "Vocabulary", level: "Basic" },
  { week: 3, day: 3, title: `${test} - Reading Short Passage`, skill: "Reading", level: "Basic" },
  { week: 3, day: 4, title: `${test} - Conjunctions`, skill: "Grammar", level: "Basic" },
  { week: 3, day: 5, title: `${test} - Writing Simple Essay`, skill: "Writing", level: "Basic" },
  { week: 3, day: 6, title: `${test} - Error Correction`, skill: "Grammar", level: "Basic" },
  { week: 3, day: 7, title: `${test} - Review Week 3`, skill: "Review", level: "Basic" },

  { week: 4, day: 1, title: `${test} - Mixed Grammar`, skill: "Grammar", level: "Basic" },
  { week: 4, day: 2, title: `${test} - Vocabulary Review`, skill: "Vocabulary", level: "Basic" },
  { week: 4, day: 3, title: `${test} - Reading Practice`, skill: "Reading", level: "Basic" },
  { week: 4, day: 4, title: `${test} - Writing Practice`, skill: "Writing", level: "Basic" },
  { week: 4, day: 5, title: `${test} - Sentence Improvement`, skill: "Grammar", level: "Basic" },
  { week: 4, day: 6, title: `${test} - Mini Mock Test`, skill: "Exam", level: "Basic" },
  { week: 4, day: 7, title: `${test} - Final Review`, skill: "Review", level: "Basic" },
];

basicRoadmap.IELTS = generateBasic("IELTS");
basicRoadmap.TOEFL = generateBasic("TOEFL ITP");
basicRoadmap.JLPT = generateBasic("JLPT");
basicRoadmap.HSK = generateBasic("HSK");
basicRoadmap.TOPIK = generateBasic("TOPIK");
basicRoadmap.CAE = generateBasic("CAE");

export default basicRoadmap;