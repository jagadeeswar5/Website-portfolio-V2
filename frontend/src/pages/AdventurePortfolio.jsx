import React, { useEffect, useState } from 'react';
import { ChevronDown, Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';
import '../styles/AdventurePortfolio.css';

const AdventurePortfolio = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Determine current section
      const sections = document.querySelectorAll('.adventure-section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setCurrentSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { name: 'Intro', icon: '🏂', activity: 'Snowboarding' },
    { name: 'About', icon: '🧗', activity: 'Climbing' },
    { name: 'Skills', icon: '🚣', activity: 'Rafting' },
    { name: 'Experience', icon: '🪂', activity: 'Skydiving' },
    { name: 'Projects', icon: '🤿', activity: 'Diving' },
    { name: 'Education', icon: '🪂', activity: 'Paragliding' },
    { name: 'Contact', icon: '⛺', activity: 'Base Camp' }
  ];

  return (
    <div className="adventure-portfolio">
      {/* Progress Bar */}
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }}></div>

      {/* Navigation Dots */}
      <div className="nav-dots">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`nav-dot ${currentSection === index ? 'active' : ''}`}
            title={section.activity}
          >
            <span className="dot-icon">{section.icon}</span>
            <span className="dot-label">{section.name}</span>
          </div>
        ))}
      </div>

      {/* Hero Section - Snowboarding */}
      <section className="adventure-section hero-section" id="hero">
        <div className="hero-content">
          <div className="hero-character snowboarding">
            <div className="character-silhouette">🏂</div>
          </div>
          <h1 className="hero-title animate-slide-up">K. Jagadeeswar Reddy</h1>
          <p className="hero-subtitle animate-slide-up delay-1">Software Developer | AI Enthusiast | Full-Stack Engineer</p>
          <div className="hero-location animate-slide-up delay-2">
            <MapPin size={20} />
            <span>Sacramento, CA</span>
          </div>
          <div className="scroll-indicator">
            <ChevronDown size={32} className="bounce" />
            <span>Scroll to begin the adventure</span>
          </div>
        </div>
        <div className="hero-background">
          <div className="mountain-layer layer-1"></div>
          <div className="mountain-layer layer-2"></div>
          <div className="mountain-layer layer-3"></div>
        </div>
      </section>

      {/* About Section - Mountain Climbing */}
      <section className="adventure-section about-section" id="about">
        <div className="section-content">
          <div className="section-character climbing">
            <div className="character-silhouette">🧗</div>
          </div>
          <div className="content-card">
            <h2 className="section-title">About the Journey</h2>
            <p className="about-text">
              Software Developer specializing in AI, Web Development, and Data Analytics. 
              Proficient in scalable applications, ML, and cloud computing. Passionate about 
              solving complex challenges through technology. Experienced in building full-stack 
              web applications, AI-based automation tools, and cloud-integrated systems. Strong 
              background in optimizing workflows and developing robust data-driven solutions.
            </p>
            <div className="contact-links">
              <a href="mailto:kamireddy.jagadeeswar@gmail.com" className="contact-link">
                <Mail size={20} />
                <span>kamireddy.jagadeeswar@gmail.com</span>
              </a>
              <a href="tel:+17373425993" className="contact-link">
                <Phone size={20} />
                <span>+1 737-342-5993</span>
              </a>
              <a href="https://linkedin.com/in/jkamireddy" target="_blank" rel="noopener noreferrer" className="contact-link">
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/jkamireddy" target="_blank" rel="noopener noreferrer" className="contact-link">
                <Github size={20} />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Rafting */}
      <section className="adventure-section skills-section" id="skills">
        <div className="section-content">
          <div className="section-character rafting">
            <div className="character-silhouette">🚣</div>
          </div>
          <h2 className="section-title">Navigating the Rapids</h2>
          <p className="section-subtitle">Technical Skills & Tools</p>
          <div className="skills-grid">
            <div className="skill-category">
              <h3 className="skill-category-title">Languages</h3>
              <div className="skill-tags">
                {['Python', 'JavaScript', 'TypeScript', 'C++', 'R', 'SQL', 'Bash'].map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h3 className="skill-category-title">Frameworks</h3>
              <div className="skill-tags">
                {['React.js', 'Next.js', 'Node.js', 'Flask', 'TensorFlow', 'PyTorch', 'OpenCV', 'Pandas'].map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h3 className="skill-category-title">Databases</h3>
              <div className="skill-tags">
                {['MySQL', 'MongoDB', 'PostgreSQL', 'Firebase'].map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h3 className="skill-category-title">Cloud & DevOps</h3>
              <div className="skill-tags">
                {['AWS Lambda', 'S3', 'EC2', 'Google Cloud', 'Docker', 'Kubernetes', 'Git', 'CI/CD'].map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section - Skydiving */}
      <section className="adventure-section experience-section" id="experience">
        <div className="section-content">
          <div className="section-character skydiving">
            <div className="character-silhouette">🪂</div>
          </div>
          <h2 className="section-title">The Freefall Journey</h2>
          <p className="section-subtitle">Professional Experience</p>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">Research Assistant</h3>
                <p className="timeline-company">California State University, Sacramento</p>
                <p className="timeline-date">2024 - Present</p>
                <ul className="timeline-description">
                  <li>Conducting research in HLB disease modeling using C++ models and RStudio</li>
                  <li>Developed ML models for predictive analysis and automation</li>
                  <li>Built scalable data pipelines for large datasets</li>
                  <li>Optimized computational efficiency using parallel processing</li>
                </ul>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">Teaching Assistant</h3>
                <p className="timeline-company">California State University, Sacramento</p>
                <p className="timeline-date">2024 - Present</p>
                <ul className="timeline-description">
                  <li>Taught Java and algorithms to undergraduate students</li>
                  <li>Assisted students in core programming concepts</li>
                  <li>Conducted lab sessions and developed supplementary materials</li>
                </ul>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">Web Development Intern</h3>
                <p className="timeline-company">Manach Tech Info</p>
                <p className="timeline-date">2023</p>
                <ul className="timeline-description">
                  <li>Developed e-commerce platforms using React.js and Node.js</li>
                  <li>Integrated REST APIs, reducing page load times by 40%</li>
                  <li>Created automated product recommendation engine using ML</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Scuba Diving */}
      <section className="adventure-section projects-section" id="projects">
        <div className="section-content">
          <div className="section-character diving">
            <div className="character-silhouette">🤿</div>
          </div>
          <h2 className="section-title">Deep Dive Projects</h2>
          <p className="section-subtitle">Exploring the Depths of Innovation</p>
          <div className="projects-grid">
            {[
              {
                title: 'AR-Based Interior Design System',
                description: 'AI-driven furniture placement with AR visualization using Flask, OpenCV, and TensorFlow',
                tags: ['AI', 'AR', 'Computer Vision']
              },
              {
                title: 'GDP Prediction System',
                description: 'ML-powered economic forecasting for India and the US supporting sustainable planning',
                tags: ['Machine Learning', 'Economics', 'Data Science']
              },
              {
                title: 'AI-Powered Resume Analyzer',
                description: 'NLP algorithms to analyze resumes and match with job descriptions using GPT',
                tags: ['NLP', 'AI', 'Flask']
              },
              {
                title: 'AI Branding Generator',
                description: 'Generate logos, color palettes using GPT and Stable Diffusion',
                tags: ['AI', 'GPT', 'Design']
              },
              {
                title: 'License Plate Detection',
                description: 'Real-time detection using YOLOv5 and OpenCV for traffic monitoring',
                tags: ['YOLO', 'OpenCV', 'Real-time']
              },
              {
                title: 'AI Code Explainer',
                description: 'Multilingual code explanation using GPT and NLP models',
                tags: ['NLP', 'GPT', 'Education']
              }
            ].map((project, index) => (
              <div key={index} className="project-card">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section - Paragliding */}
      <section className="adventure-section education-section" id="education">
        <div className="section-content">
          <div className="section-character paragliding">
            <div className="character-silhouette">🪂</div>
          </div>
          <h2 className="section-title">Soaring Through Knowledge</h2>
          <p className="section-subtitle">Education & Certifications</p>
          <div className="education-grid">
            <div className="education-card">
              <h3 className="education-title">MS in Computer Science</h3>
              <p className="education-school">California State University, Sacramento</p>
              <p className="education-date">Expected 2025</p>
              <p className="education-courses">AI • ML • Advanced Databases • Data Structures • Cloud Computing • Computer Vision</p>
            </div>
            <div className="education-card">
              <h3 className="education-title">Bachelor's in Computer Science</h3>
              <p className="education-school">Gitam University</p>
              <p className="education-date">2019 - 2023</p>
            </div>
          </div>
          <div className="certifications">
            <h3 className="certifications-title">Certifications</h3>
            <div className="cert-list">
              <div className="cert-item">🏆 AWS AI Practitioner Certification (2025)</div>
              <div className="cert-item">🏆 Operations Research: Models and Applications - Coursera</div>
              <div className="cert-item">🏆 Web Application Security Testing with OWASP ZAP - Coursera</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Base Camp */}
      <section className="adventure-section contact-section" id="contact">
        <div className="section-content">
          <div className="section-character basecamp">
            <div className="character-silhouette">⛺</div>
          </div>
          <h2 className="section-title">Base Camp</h2>
          <p className="section-subtitle">Let's Start the Next Adventure Together</p>
          <div className="contact-container">
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <p>Ready to embark on an exciting project? Let's connect!</p>
              <div className="contact-details">
                <div className="contact-detail-item">
                  <Mail size={24} />
                  <span>kamireddy.jagadeeswar@gmail.com</span>
                </div>
                <div className="contact-detail-item">
                  <Phone size={24} />
                  <span>+1 737-342-5993</span>
                </div>
                <div className="contact-detail-item">
                  <MapPin size={24} />
                  <span>Sacramento, CA</span>
                </div>
              </div>
              <div className="social-links">
                <a href="https://linkedin.com/in/jkamireddy" target="_blank" rel="noopener noreferrer" className="social-link">
                  <Linkedin size={28} />
                </a>
                <a href="https://github.com/jkamireddy" target="_blank" rel="noopener noreferrer" className="social-link">
                  <Github size={28} />
                </a>
                <a href="#" className="social-link">
                  <Globe size={28} />
                </a>
              </div>
            </div>
            <form className="contact-form">
              <input type="text" placeholder="Your Name" className="form-input" />
              <input type="email" placeholder="Your Email" className="form-input" />
              <textarea placeholder="Your Message" rows="5" className="form-textarea"></textarea>
              <button type="submit" className="form-button">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="portfolio-footer">
        <p>© 2025 K. Jagadeeswar Reddy. Adventure awaits at every scroll.</p>
      </footer>
    </div>
  );
};

export default AdventurePortfolio;