const skillToJobMap = {
  'python': ['Data Scientist', 'Machine Learning Engineer', 'Backend Developer'],
  'javascript': ['Frontend Developer', 'Full Stack Developer', 'React Developer'],
  'react': ['React Developer', 'Frontend Engineer'],
  'ui design': ['UI/UX Designer', 'Product Designer'],
  'communication': ['Marketing Specialist', 'Sales Representative', 'Customer Success Manager'],
  'data analysis': ['Data Analyst', 'Business Analyst'],
  'project management': ['Project Manager', 'Scrum Master'],
  'writing': ['Content Writer', 'Technical Writer'],
  'sql': ['Database Administrator', 'Data Analyst'],
  'html': ['Frontend Developer', 'Web Designer'],
  'css': ['Frontend Developer', 'UI Designer'],
};

function getRecommendations(skills) {
  const recommendedJobs = new Set();

  skills.forEach(skill => {
    const normalizedSkill = skill.trim().toLowerCase();
    const jobs = skillToJobMap[normalizedSkill];
    if (jobs) {
      jobs.forEach(job => recommendedJobs.add(job));
    }
  });

  return Array.from(recommendedJobs);
}

export default getRecommendations;
