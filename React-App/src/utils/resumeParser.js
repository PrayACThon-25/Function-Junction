export function parseResume(text) {
  const sampleSkills = ['JavaScript', 'Python', 'React', 'Node.js', 'Data Analysis'];
  const suggestions = [];

  const foundSkills = sampleSkills.filter(skill => text.toLowerCase().includes(skill.toLowerCase()));
  const matchPercentage = Math.round((foundSkills.length / sampleSkills.length) * 100);

  if (matchPercentage < 100) {
    suggestions.push('Consider adding more relevant skills.');
  }
  if (!text.toLowerCase().includes('project')) {
    suggestions.push('Mention some projects to showcase your experience.');
  }

  return {
    skills: foundSkills,
    matchPercentage,
    suggestions
  };
}
