import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';
import '../styles/AdventurePortfolio.css';

const AdventurePortfolio = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const touchStartY = useRef(0);

  const pages = [
    { id: 0, name: 'Hero', activity: 'snowboarding' },
    { id: 1, name: 'About', activity: 'climbing' },
    { id: 2, name: 'Skills', activity: 'rafting' },
    { id: 3, name: 'Experience', activity: 'skydiving' },
    { id: 4, name: 'Projects', activity: 'diving' },
    { id: 5, name: 'Education', activity: 'paragliding' },
    { id: 6, name: 'Contact', activity: 'basecamp' }
  ];

  useEffect(() => {
    const handleWheel = (e) => {
      if (isTransitioning) return;
      
      e.preventDefault();
      
      if (e.deltaY > 50 && currentPage < pages.length - 1) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentPage(prev => prev + 1);
          setTimeout(() => setIsTransitioning(false), 1500);
        }, 100);
      } else if (e.deltaY < -50 && currentPage > 0) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentPage(prev => prev - 1);
          setTimeout(() => setIsTransitioning(false), 1500);
        }, 100);
      }
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (isTransitioning) return;
      
      const touchEndY = e.touches[0].clientY;
      const diff = touchStartY.current - touchEndY;

      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentPage < pages.length - 1) {
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentPage(prev => prev + 1);
            setTimeout(() => setIsTransitioning(false), 1500);
          }, 100);
        } else if (diff < 0 && currentPage > 0) {
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentPage(prev => prev - 1);
            setTimeout(() => setIsTransitioning(false), 1500);
          }, 100);
        }
      }
    };

    const container = containerRef.current;
    container?.addEventListener('wheel', handleWheel, { passive: false });
    container?.addEventListener('touchstart', handleTouchStart);
    container?.addEventListener('touchmove', handleTouchMove);

    return () => {
      container?.removeEventListener('wheel', handleWheel);
      container?.removeEventListener('touchstart', handleTouchStart);
      container?.removeEventListener('touchmove', handleTouchMove);
    };
  }, [currentPage, isTransitioning, pages.length]);

  const getTransitionAnimation = () => {
    const activity = pages[currentPage]?.activity;
    
    switch (activity) {
      case 'snowboarding':
        return 'snowboard-jump';
      case 'climbing':
        return 'climb-up';
      case 'rafting':
        return 'raft-wave';
      case 'skydiving':
        return 'skydive-fall';
      case 'diving':
        return 'dive-deep';
      case 'paragliding':
        return 'glide-soar';
      case 'basecamp':
        return 'land-camp';
      default:
        return 'default';
    }
  };

  return (
    <div className="adventure-container" ref={containerRef}>
      {/* Progress Indicator */}
      <div className="page-progress">
        <div className="progress-fill" style={{ height: `${((currentPage + 1) / pages.length) * 100}%` }}></div>
      </div>

      {/* Navigation Dots */}
      <div className="nav-indicators">
        {pages.map((page, index) => (
          <button
            key={page.id}
            className={`nav-dot ${currentPage === index ? 'active' : ''}`}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentPage(index);
                  setTimeout(() => setIsTransitioning(false), 1500);
                }, 100);
              }
            }}
            aria-label={`Go to ${page.name}`}
          >
            <span className="dot-inner"></span>
            <span className="dot-label">{page.name}</span>
          </button>
        ))}
      </div>

      {/* Transition Character Animation */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className={`transition-character ${getTransitionAnimation()}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            {pages[currentPage]?.activity === 'snowboarding' && <div className="char-transition">🏂</div>}
            {pages[currentPage]?.activity === 'climbing' && <div className="char-transition">🧗</div>}
            {pages[currentPage]?.activity === 'rafting' && <div className="char-transition">🚣</div>}
            {pages[currentPage]?.activity === 'skydiving' && <div className="char-transition">🪂</div>}
            {pages[currentPage]?.activity === 'diving' && <div className="char-transition">🤿</div>}
            {pages[currentPage]?.activity === 'paragliding' && <div className="char-transition">🪂</div>}
            {pages[currentPage]?.activity === 'basecamp' && <div className="char-transition">⛺</div>}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pages */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          className="page-wrapper"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {currentPage === 0 && <HeroPage />}
          {currentPage === 1 && <AboutPage />}
          {currentPage === 2 && <SkillsPage />}
          {currentPage === 3 && <ExperiencePage />}
          {currentPage === 4 && <ProjectsPage />}
          {currentPage === 5 && <EducationPage />}
          {currentPage === 6 && <ContactPage />}
        </motion.div>
      </AnimatePresence>

      {/* Scroll Hint */}
      {currentPage < pages.length - 1 && (
        <motion.div
          className="scroll-hint"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <ChevronDown className="scroll-icon" />
          <span>Scroll to continue</span>
        </motion.div>
      )}
    </div>
  );
};

// Hero Page
const HeroPage = () => (
  <div className="page hero-page">
    <motion.div
      className="hero-character-large"
      initial={{ y: -200, rotate: -45, scale: 0.5 }}
      animate={{ y: 0, rotate: 0, scale: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      🏂
    </motion.div>
    <div className="mountain-scene">
      <div className="mountain-bg layer-1"></div>
      <div className="mountain-bg layer-2"></div>
      <div className="mountain-bg layer-3"></div>
    </div>
    <motion.div
      className="hero-content-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      <h1 className="name-title">K. Jagadeeswar Reddy</h1>
      <p className="role-subtitle">Software Developer | AI Enthusiast | Full-Stack Engineer</p>
      <div className="location-tag">
        <MapPin size={18} />
        <span>Dublin, CA</span>
      </div>
    </motion.div>
  </div>
);

// About Page
const AboutPage = () => (
  <div className="page about-page">
    <motion.div
      className="page-character"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      🧗
    </motion.div>
    <motion.div
      className="content-box"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      <h2 className="page-title">About the Journey</h2>
      <p className="page-description">
        Software Developer specializing in AI, Web Development, and Data Analytics. 
        Proficient in scalable applications, ML, and cloud computing. Passionate about 
        solving complex challenges through technology. Experienced in building full-stack 
        web applications, AI-based automation tools, and cloud-integrated systems.
      </p>
      <div className="quick-links">
        <a href="mailto:kamireddy.jagadeeswar@gmail.com" className="quick-link">
          <Mail size={20} />
          <span>Email</span>
        </a>
        <a href="tel:+17373425993" className="quick-link">
          <Phone size={20} />
          <span>Phone</span>
        </a>
        <a href="https://linkedin.com/in/jkamireddy" target="_blank" rel="noopener noreferrer" className="quick-link">
          <Linkedin size={20} />
          <span>LinkedIn</span>
        </a>
        <a href="https://github.com/jkamireddy" target="_blank" rel="noopener noreferrer" className="quick-link">
          <Github size={20} />
          <span>GitHub</span>
        </a>
      </div>
    </motion.div>
  </div>
);

// Skills Page
const SkillsPage = () => (
  <div className="page skills-page">
    <motion.div
      className="page-character"
      initial={{ x: -200, y: -100, rotate: -30 }}
      animate={{ x: 0, y: 0, rotate: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      🚣
    </motion.div>
    <motion.div
      className="content-box-wide"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
    >
      <h2 className="page-title">Navigating the Rapids</h2>
      <p className="page-subtitle">Technical Skills & Tools</p>
      <div className="skills-container">
        <motion.div className="skill-group" initial={{ x: -100 }} animate={{ x: 0 }} transition={{ delay: 0.5 }}>
          <h3>Languages</h3>
          <div className="skill-pills">
            {['Python', 'JavaScript', 'TypeScript', 'C++', 'R', 'SQL', 'Bash'].map((skill, i) => (
              <span key={i} className="skill-pill">{skill}</span>
            ))}
          </div>
        </motion.div>
        <motion.div className="skill-group" initial={{ x: -100 }} animate={{ x: 0 }} transition={{ delay: 0.6 }}>
          <h3>Frameworks</h3>
          <div className="skill-pills">
            {['React.js', 'Next.js', 'Node.js', 'Flask', 'TensorFlow', 'PyTorch'].map((skill, i) => (
              <span key={i} className="skill-pill">{skill}</span>
            ))}
          </div>
        </motion.div>
        <motion.div className="skill-group" initial={{ x: -100 }} animate={{ x: 0 }} transition={{ delay: 0.7 }}>
          <h3>Cloud & DevOps</h3>
          <div className="skill-pills">
            {['AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL'].map((skill, i) => (
              <span key={i} className="skill-pill">{skill}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  </div>
);

// Experience Page
const ExperiencePage = () => (
  <div className="page experience-page">
    <motion.div
      className="page-character"
      initial={{ y: -300, scale: 0.3 }}
      animate={{ y: 0, scale: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      🪂
    </motion.div>
    <motion.div
      className="content-box-wide"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <h2 className="page-title">The Freefall Journey</h2>
      <p className="page-subtitle">Professional Experience</p>
      <div className="experience-timeline">
        <motion.div className="exp-item" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
          <div className="exp-marker"></div>
          <div className="exp-content">
            <h3>Software Dev Associate</h3>
            <p className="exp-company">Critical River Inc</p>
            <p className="exp-date">Dec 2024 - Present</p>
            <ul>
              <li>Promoted to full-time position, continuing development of enterprise microservices</li>
              <li><strong>Templates Manager Service:</strong> Developed FastAPI microservice for template management with async PostgreSQL, improving performance and scalability</li>
              <li>Built cloud storage integration and data processing capabilities for handling large datasets</li>
              <li>Implemented background task processing to optimize API response times</li>
              <li><strong>P2P Dashboard Backend:</strong> Built FastAPI microservice integrating multiple procurement systems with dual-database architecture supporting high concurrency</li>
              <li>Implemented OAuth 2.0 authentication with JWT and RBAC, plus search functionality with caching for fast response times</li>
              <li>Developed notification system and analytics APIs for real-time financial metrics and transaction tracking</li>
              <li><strong>Jira Dashboard API Service:</strong> Developed FastAPI service for issue analytics processing large datasets from data warehouse, with optimized filtering architecture</li>
              <li>Upgraded service infrastructure and implemented robust query service with fault tolerance patterns for high availability</li>
            </ul>
          </div>
        </motion.div>
        <motion.div className="exp-item" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.65 }}>
          <div className="exp-marker"></div>
          <div className="exp-content">
            <h3>Software Dev Intern</h3>
            <p className="exp-company">Critical River Inc</p>
            <p className="exp-date">Jul - Dec 2024</p>
            <ul>
              <li>Developed FastAPI microservices for enterprise template management and procurement systems</li>
              <li>Built cloud storage integration and implemented async PostgreSQL operations</li>
              <li>Contributed to P2P Dashboard Backend with OAuth 2.0 authentication and JWT implementation</li>
              <li>Developed analytics APIs and notification systems for real-time financial tracking</li>
              <li>Successfully converted to full-time position in December 2024</li>
            </ul>
          </div>
        </motion.div>
        <motion.div className="exp-item" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
          <div className="exp-marker"></div>
          <div className="exp-content">
            <h3>Research Assistant</h3>
            <p className="exp-company">California State University, Sacramento</p>
            <p className="exp-date">2024 - Present</p>
            <ul>
              <li>Conducting research in HLB disease modeling using C++ models and RStudio</li>
              <li>Developed ML models for predictive analysis and automation</li>
              <li>Built scalable data pipelines for large datasets</li>
              <li>Optimized computational efficiency using parallel processing</li>
            </ul>
          </div>
        </motion.div>
        <motion.div className="exp-item" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
          <div className="exp-marker"></div>
          <div className="exp-content">
            <h3>Teaching Assistant</h3>
            <p className="exp-company">California State University, Sacramento</p>
            <p className="exp-date">2024 - Present</p>
            <ul>
              <li>Taught Java and algorithms to undergraduate students</li>
              <li>Assisted students in core programming concepts</li>
              <li>Conducted lab sessions and developed supplementary teaching materials</li>
            </ul>
          </div>
        </motion.div>
        <motion.div className="exp-item" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
          <div className="exp-marker"></div>
          <div className="exp-content">
            <h3>Web Development Intern</h3>
            <p className="exp-company">Manach Tech Info</p>
            <p className="exp-date">2023</p>
            <ul>
              <li>Developed e-commerce platforms using React.js and Node.js</li>
              <li>Integrated REST APIs, reducing page load times by 40%</li>
              <li>Created automated product recommendation engine using ML algorithms</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </div>
);

// Projects Page
const ProjectsPage = () => (
  <div className="page projects-page">
    <motion.div
      className="page-character"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 100, opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      🤿
    </motion.div>
    <motion.div
      className="content-box-wide"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
    >
      <h2 className="page-title">Deep Dive Projects</h2>
      <p className="page-subtitle">Exploring Innovation</p>
      <div className="projects-grid">
        {[
          { title: 'AR Interior Design', desc: 'AI-driven furniture placement with AR visualization', tags: ['AI', 'AR', 'OpenCV'] },
          { title: 'GDP Prediction System', desc: 'ML-powered economic forecasting for policy planning', tags: ['ML', 'Economics'] },
          { title: 'AI Resume Analyzer', desc: 'NLP algorithms for resume-job matching', tags: ['NLP', 'GPT'] },
          { title: 'AI Branding Generator', desc: 'Generate logos and branding using Stable Diffusion', tags: ['AI', 'Design'] },
          { title: 'License Plate Detection', desc: 'Real-time detection using YOLOv5', tags: ['YOLO', 'OpenCV'] },
          { title: 'AI Code Explainer', desc: 'Multilingual code explanation tool', tags: ['NLP', 'Education'] }
        ].map((project, i) => (
          <motion.div
            key={i}
            className="project-item"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
            <div className="tag-list">
              {project.tags.map((tag, j) => (
                <span key={j} className="tag">{tag}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

// Education Page
const EducationPage = () => (
  <div className="page education-page">
    <motion.div
      className="page-character"
      initial={{ x: -300, y: -100 }}
      animate={{ x: 0, y: 0 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      🪂
    </motion.div>
    <motion.div
      className="content-box"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <h2 className="page-title">Soaring Through Knowledge</h2>
      <p className="page-subtitle">Education & Certifications</p>
      <div className="education-list">
        <motion.div className="edu-item" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <h3>MS in Computer Science</h3>
          <p className="edu-school">California State University, Sacramento</p>
          <p className="edu-date">2023 - 2025</p>
        </motion.div>
        <motion.div className="edu-item" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <h3>Bachelor's in Computer Science</h3>
          <p className="edu-school">Gitam University</p>
          <p className="edu-date">2019 - 2023</p>
        </motion.div>
      </div>
      <div className="cert-list">
        <h3 className="cert-heading">Certifications</h3>
        {['AWS AI Practitioner (2025)', 'Operations Research - Coursera', 'Web Security Testing - Coursera'].map((cert, i) => (
          <motion.div
            key={i}
            className="cert-badge"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
          >
            🏆 {cert}
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

// Contact Page
const ContactPage = () => (
  <div className="page contact-page">
    <div className="campfire-glow"></div>
    <motion.div
      className="page-character-camp"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      ⛺
    </motion.div>
    <motion.div
      className="content-box-contact"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
    >
      <motion.h2 
        className="page-title"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        🏕️ Journey's End - Base Camp
      </motion.h2>
      <motion.p 
        className="page-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        The adventure was incredible! Let's connect for the next expedition
      </motion.p>
      <div className="contact-info-center">
        <motion.div 
          className="contact-detail-large"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
        >
          <Mail size={32} />
          <a href="mailto:kamireddy.jagadeeswar@gmail.com">kamireddy.jagadeeswar@gmail.com</a>
        </motion.div>
        <motion.div 
          className="contact-detail-large"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
        >
          <Phone size={32} />
          <a href="tel:+17373425993">+1 737-342-5993</a>
        </motion.div>
        <motion.div 
          className="contact-detail-large"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
          whileHover={{ scale: 1.05 }}
        >
          <MapPin size={32} />
          <span>Dublin, CA</span>
        </motion.div>
      </div>
      <motion.div 
        className="social-links-large"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        <motion.a 
          href="https://linkedin.com/in/jkamireddy" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-button"
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Linkedin size={32} />
          <span>LinkedIn</span>
        </motion.a>
        <motion.a 
          href="https://github.com/jkamireddy" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-button"
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github size={32} />
          <span>GitHub</span>
        </motion.a>
      </motion.div>
      <motion.div 
        className="journey-complete"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <div className="completion-badge">
          <span className="badge-icon">🎯</span>
          <span className="badge-text">Portfolio Journey Complete</span>
        </div>
        <p className="thank-you-text">Thank you for exploring my adventure! Looking forward to connecting.</p>
      </motion.div>
    </motion.div>
  </div>
);

export default AdventurePortfolio;