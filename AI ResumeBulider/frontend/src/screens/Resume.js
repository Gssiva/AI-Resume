import React, { useState, useEffect } from 'react';
import { Container, Tab, Tabs, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getResumeData, updateResumeData, generateResumePDF } from '../features/actions/resumeAction';
import Loader from '../components/Loader';
import Message from '../components/Message';

function Resume() {
  const [key, setKey] = useState('Personal Info');
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    skills: [],
    education: [],
    experience: [],
    projects: []
  });

  const dispatch = useDispatch();
  const { resumeData, isLoading, error, pdfGenerating } = useSelector((state) => state.resume);

  useEffect(() => {
    dispatch(getResumeData());
  }, [dispatch]);

  useEffect(() => {
    if (resumeData) {
      setFormData(prev => ({
        ...prev,
        ...resumeData
      }));
    }
  }, [resumeData]);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayItemChange = (section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (section) => {
    const newItem = section === 'skills' 
      ? { name: '', level: '' }
      : section === 'education'
      ? { degree: '', field: '', school: '', graduationYear: '' }
      : section === 'experience'
      ? { title: '', company: '', duration: '', description: '' }
      : { name: '', description: '', technologies: '' };

    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const removeArrayItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    // Map tab keys to correct section names
    const sectionMap = {
      'personalInfo': 'personalInfo',
      'skills': 'skills', 
      'education': 'education',
      'experience': 'experience',
      'projects': 'projects'
    };
    
    const section = sectionMap[key] || key;
    const data = formData[section];
    
    console.log('Saving section:', section, 'with data:', data);
    
    // For array sections, ensure we're not sending empty arrays
    let dataToSend = data;
    if (Array.isArray(data) && data.length === 0) {
      console.log('Empty array detected, not saving');
      return; // Don't save empty arrays
    }
    
    // For personalInfo, ensure at least one field has data
    if (section === 'personalInfo') {
      const hasData = data && Object.values(data).some(value => value && value.trim() !== '');
      if (!hasData) {
        console.log('No personal info data to save');
        return;
      }
    }
    
    console.log('Final data to send:', dataToSend);
    dispatch(updateResumeData({ section, data: dataToSend }));
  };

  const handleGeneratePDF = () => {
    dispatch(generateResumePDF());
  };

  const renderPersonalInfo = () => (
    <Form>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.personalInfo.fullName}
              onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={formData.personalInfo.email}
              onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={formData.personalInfo.phone}
              onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              value={formData.personalInfo.location}
              onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3" controlId="summary">
        <Form.Label>Professional Summary</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={formData.personalInfo.summary}
          onChange={(e) => handleInputChange('personalInfo', 'summary', e.target.value)}
        />
      </Form.Group>
    </Form>
  );

  const renderSkills = () => (
    <div>
      {formData.skills.map((skill, index) => (
        <Card key={index} className="mb-3">
          <Card.Body>
            <Row>
              <Col md={6}>
                <Form.Group controlId={`skill-name-${index}`}>
                  <Form.Label>Skill Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={skill.name}
                    onChange={(e) => handleArrayItemChange('skills', index, 'name', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId={`skill-level-${index}`}>
                  <Form.Label>Level</Form.Label>
                  <Form.Select
                    value={skill.level}
                    onChange={(e) => handleArrayItemChange('skills', index, 'level', e.target.value)}
                  >
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2} className="d-flex align-items-end">
                <Button variant="danger" onClick={() => removeArrayItem('skills', index)}>
                  Remove
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
      <Button variant="primary" onClick={() => addArrayItem('skills')}>
        Add Skill
      </Button>
    </div>
  );

  const renderEducation = () => (
    <div>
      {formData.education.map((edu, index) => (
        <Card key={index} className="mb-3">
          <Card.Body>
            <Row>
              <Col md={6}>
                <Form.Group controlId={`edu-degree-${index}`}>
                  <Form.Label>Degree</Form.Label>
                  <Form.Control
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleArrayItemChange('education', index, 'degree', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId={`edu-field-${index}`}>
                  <Form.Label>Field of Study</Form.Label>
                  <Form.Control
                    type="text"
                    value={edu.field}
                    onChange={(e) => handleArrayItemChange('education', index, 'field', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}>
                <Form.Group controlId={`edu-school-${index}`}>
                  <Form.Label>School</Form.Label>
                  <Form.Control
                    type="text"
                    value={edu.school}
                    onChange={(e) => handleArrayItemChange('education', index, 'school', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId={`edu-year-${index}`}>
                  <Form.Label>Graduation Year</Form.Label>
                  <Form.Control
                    type="text"
                    value={edu.graduationYear}
                    onChange={(e) => handleArrayItemChange('education', index, 'graduationYear', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={2} className="d-flex align-items-end">
                <Button variant="danger" onClick={() => removeArrayItem('education', index)}>
                  Remove
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
      <Button variant="primary" onClick={() => addArrayItem('education')}>
        Add Education
      </Button>
    </div>
  );

  const renderExperiences = () => (
    <div>
      {formData.experience.map((exp, index) => (
        <Card key={index} className="mb-3">
          <Card.Body>
            <Row>
              <Col md={6}>
                <Form.Group controlId={`exp-title-${index}`}>
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={exp.title}
                    onChange={(e) => handleArrayItemChange('experience', index, 'title', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId={`exp-company-${index}`}>
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleArrayItemChange('experience', index, 'company', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}>
                <Form.Group controlId={`exp-duration-${index}`}>
                  <Form.Label>Duration</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., 2020-Present"
                    value={exp.duration}
                    onChange={(e) => handleArrayItemChange('experience', index, 'duration', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId={`exp-description-${index}`}>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={exp.description}
                    onChange={(e) => handleArrayItemChange('experience', index, 'description', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={2} className="d-flex align-items-start">
                <Button variant="danger" onClick={() => removeArrayItem('experience', index)}>
                  Remove
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
      <Button variant="primary" onClick={() => addArrayItem('experience')}>
        Add Experience
      </Button>
    </div>
  );

  const renderProjects = () => (
    <div>
      {formData.projects.map((project, index) => (
        <Card key={index} className="mb-3">
          <Card.Body>
            <Row>
              <Col md={6}>
                <Form.Group controlId={`project-name-${index}`}>
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={project.name}
                    onChange={(e) => handleArrayItemChange('projects', index, 'name', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId={`project-tech-${index}`}>
                  <Form.Label>Technologies</Form.Label>
                  <Form.Control
                    type="text"
                    value={project.technologies}
                    onChange={(e) => handleArrayItemChange('projects', index, 'technologies', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={10}>
                <Form.Group controlId={`project-desc-${index}`}>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={project.description}
                    onChange={(e) => handleArrayItemChange('projects', index, 'description', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={2} className="d-flex align-items-start">
                <Button variant="danger" onClick={() => removeArrayItem('projects', index)}>
                  Remove
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
      <Button variant="primary" onClick={() => addArrayItem('projects')}>
        Add Project
      </Button>
    </div>
  );

  return (
    <Container className='mt-4 px-0'>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Update Resume</h2>
        <Button 
          variant="success" 
          onClick={handleGeneratePDF}
          disabled={pdfGenerating}
        >
          {pdfGenerating ? 'Generating...' : 'Download Resume (HTML)'}
        </Button>
      </div>

      {error && <Message variant="danger">{error}</Message>}
      {isLoading && <Loader />}

      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className='mb-3'>
        <Tab eventKey='personalInfo' title='Personal Info'>
          {renderPersonalInfo()}
        </Tab>
        <Tab eventKey='skills' title='Skills'>
          {renderSkills()}
        </Tab>
        <Tab eventKey='education' title='Education'>
          {renderEducation()}
        </Tab>
        <Tab eventKey='experience' title='Experience'>
          {renderExperiences()}
        </Tab>
        <Tab eventKey='projects' title='Projects'>
          {renderProjects()}
        </Tab>
      </Tabs>

      <div className="mt-4">
        <Button variant="primary" onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </Container>
  );
}

export default Resume;
