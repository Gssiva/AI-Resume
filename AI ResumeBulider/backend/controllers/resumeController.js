import expressAsyncHandler from 'express-async-handler';

// Mock resume data storage (in production, this would be in a database)
let resumeData = {
  personalInfo: {
    fullName: 'Test User',
    email: 'test@example.com',
    phone: '+1234567890',
    location: 'City, State',
    summary: 'Experienced professional with a background in...'
  },
  skills: [
    { name: 'JavaScript', level: 'Advanced' },
    { name: 'React', level: 'Advanced' },
    { name: 'Node.js', level: 'Intermediate' }
  ],
  education: [
    {
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      school: 'University Name',
      graduationYear: '2020'
    }
  ],
  experience: [
    {
      title: 'Software Developer',
      company: 'Tech Company',
      duration: '2020-Present',
      description: 'Developed web applications using React and Node.js'
    }
  ],
  projects: [
    {
      name: 'Resume Builder',
      description: 'A web application for creating professional resumes',
      technologies: 'React, Node.js, MongoDB'
    }
  ]
};

// @desc    Get resume data
// @route   GET /api/resume
// @access  Private
const getResume = expressAsyncHandler(async (req, res) => {
  res.json(resumeData);
});

// @desc    Update resume data
// @route   PUT /api/resume
// @access  Private
const updateResume = expressAsyncHandler(async (req, res) => {
  console.log('Resume update request received:', req.body);
  
  const { section, data } = req.body;
  
  if (!section) {
    console.log('Missing section parameter');
    res.status(400);
    throw new Error('Section parameter is required');
  }
  
  if (data === undefined || data === null) {
    console.log('Missing or null data parameter');
    res.status(400);
    throw new Error('Data parameter is required');
  }
  
  // Validate section name
  const validSections = ['personalInfo', 'skills', 'education', 'experience', 'projects'];
  if (!validSections.includes(section)) {
    console.log('Invalid section:', section);
    res.status(400);
    throw new Error(`Invalid section. Valid sections are: ${validSections.join(', ')}`);
  }
  
  console.log('Updating section:', section, 'with data:', data);
  resumeData[section] = data;
  res.json({ message: 'Resume updated successfully', data: resumeData });
});

// @desc    Generate resume PDF
// @route   POST /api/resume/generate-pdf
// @access  Private
const generateResumePDF = expressAsyncHandler(async (req, res) => {
  try {
    // For now, return a simple HTML file that can be saved as PDF
    // In production, you would use a proper PDF library
    const html = generateResumeHTML(resumeData);
    
    // Set headers for HTML download (user can save as PDF from browser)
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.html');
    res.send(html);
  } catch (error) {
    console.error('Resume generation error:', error);
    res.status(500);
    throw new Error('Failed to generate resume');
  }
});

// Helper function to generate HTML for resume
function generateResumeHTML(data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Resume</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { margin: 0; font-size: 28px; }
        .header p { margin: 5px 0; color: #666; }
        .section { margin-bottom: 30px; }
        .section h2 { color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
        .item { margin-bottom: 15px; }
        .item h3 { margin: 0 0 5px 0; }
        .item p { margin: 0; color: #666; }
        ul { margin: 10px 0; padding-left: 20px; }
        li { margin-bottom: 5px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${data.personalInfo.fullName}</h1>
        <p>${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}</p>
        <p>${data.personalInfo.summary}</p>
      </div>
      
      <div class="section">
        <h2>Skills</h2>
        <ul>
          ${data.skills.map(skill => `<li>${skill.name} - ${skill.level}</li>`).join('')}
        </ul>
      </div>
      
      <div class="section">
        <h2>Education</h2>
        ${data.education.map(edu => `
          <div class="item">
            <h3>${edu.degree} in ${edu.field}</h3>
            <p>${edu.school} - Class of ${edu.graduationYear}</p>
          </div>
        `).join('')}
      </div>
      
      <div class="section">
        <h2>Experience</h2>
        ${data.experience.map(exp => `
          <div class="item">
            <h3>${exp.title} at ${exp.company}</h3>
            <p>${exp.duration}</p>
            <p>${exp.description}</p>
          </div>
        `).join('')}
      </div>
      
      <div class="section">
        <h2>Projects</h2>
        ${data.projects.map(project => `
          <div class="item">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <p><strong>Technologies:</strong> ${project.technologies}</p>
          </div>
        `).join('')}
      </div>
    </body>
    </html>
  `;
}

export { getResume, updateResume, generateResumePDF };
