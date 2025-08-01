const patterns = [
  {
    name: 'Vague Language',
    regex: /\\b(some|maybe|possibly|often|usually)\\b/gi,
    suggestion: 'Can you make this more specific to sharpen insight?',
  },
  {
    name: 'Presupposition',
    regex: /\\b(when you .* you will|since you .* you should)\\b/gi,
    suggestion: 'What if that assumption isn’t true? How would you reframe it?',
  },
  {
    name: 'Embedded Command',
    regex: /\\b(you need to|you should|try to)\\b/gi,
    suggestion: 'Is this self-imposed pressure? Could you phrase it as a choice?',
  },
];

export function analyzeEntry(text) {
  const insights = [];
  patterns.forEach((p) => {
    const m = p.regex.exec(text);
    if (m) {
      insights.push({
        patternName: p.name,
        exampleMatch: m[0],
        suggestion: p.suggestion,
      });
    }
    p.regex.lastIndex = 0; // reset for global regex
  });
  return insights;
}
