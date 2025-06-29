import React, { useEffect, useState } from 'react';
import { Brain, Zap, BarChart3, Cpu, Workflow, Bot, Database, Sparkles, ArrowRight, X, Menu, Home, Briefcase, Users, Phone, Info } from 'lucide-react';

const FloatingCard = ({ 
  icon: Icon, 
  title, 
  description, 
  className,
  delay = 0,
  onClick,
  index,
  isHovered
}: {
  icon: any;
  title: string;
  description: string;
  className: string;
  delay?: number;
  onClick: () => void;
  index: number;
  isHovered: boolean;
}) => (
  <div 
    className={`floating-card ${className} ${isHovered ? 'card-fanned' : 'card-stacked'}`}
    style={{ 
      animationDelay: `${delay}s`,
      '--card-index': index
    } as React.CSSProperties}
    onClick={onClick}
  >
    <div className="card-content">
      <div className="card-icon">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  </div>
);

const FullscreenModal = ({ 
  isOpen, 
  onClose, 
  service 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  service: any;
}) => {
  if (!isOpen || !service) return null;

  const Icon = service.icon;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
        
        <div className="modal-header">
          <div className="modal-icon">
            <Icon className="w-12 h-12" />
          </div>
          <h2 className="modal-title">{service.title}</h2>
        </div>
        
        <div className="modal-body">
          <p className="modal-description">{service.description}</p>
          
          <div className="modal-details">
            <h3>Capabilities</h3>
            <ul className="feature-list">
              {service.features?.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              )) || [
                "Advanced algorithms",
                "Real-time processing", 
                "Scalable solutions",
                "24/7 monitoring"
              ]}
            </ul>
          </div>
          
          <div className="modal-actions">
            <button className="modal-cta-primary">
              Learn More
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="modal-cta-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <div className="nav-item" onClick={onClick}>
    {children}
  </div>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCardStackHovered, setIsCardStackHovered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Close menu when clicking outside or on nav items
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMenuOpen && !target.closest('.nav-toggle') && !target.closest('.nav-menu') && !target.closest('.nav-logo')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleCardClick = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    console.log('Scrolling to:', sectionId); // Debug log
    const element = document.getElementById(sectionId);
    console.log('Element found:', element); // Debug log
    
    if (element) {
      // Close menu first
      setIsMenuOpen(false);
      
      // Small delay to ensure menu closes before scrolling
      setTimeout(() => {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } else {
      console.error('Element not found:', sectionId);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const services = [
    {
      icon: Brain,
      title: "Machine Learning",
      description: "Advanced ML algorithms",
      className: "card-1",
      delay: 0,
      features: [
        "Deep learning networks",
        "Supervised learning",
        "Real-time training",
        "Custom algorithms"
      ]
    },
    {
      icon: Zap,
      title: "AI Automation",
      description: "Intelligent automation",
      className: "card-2",
      delay: 0,
      features: [
        "Workflow optimization",
        "Decision systems",
        "Process mining",
        "RPA integration"
      ]
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description: "Deep insights",
      className: "card-3",
      delay: 0,
      features: [
        "Big data processing",
        "Predictive analytics",
        "Real-time dashboards",
        "Statistical modeling"
      ]
    },
    {
      icon: Cpu,
      title: "Neural Networks",
      description: "Custom architectures",
      className: "card-4",
      delay: 0,
      features: [
        "CNNs and RNNs",
        "Transformer models",
        "Network optimization",
        "Custom design"
      ]
    },
    {
      icon: Workflow,
      title: "AI Integration",
      description: "Seamless implementation",
      className: "card-5",
      delay: 0,
      features: [
        "API development",
        "Cloud deployment",
        "System modernization",
        "Microservices"
      ]
    },
    {
      icon: Bot,
      title: "Intelligent Agents",
      description: "Autonomous assistants",
      className: "card-6",
      delay: 0,
      features: [
        "Conversational AI",
        "Multi-agent systems",
        "NLP processing",
        "Autonomous decisions"
      ]
    },
    {
      icon: Database,
      title: "Data Engineering",
      description: "Scalable infrastructure",
      className: "card-7",
      delay: 0,
      features: [
        "Pipeline optimization",
        "ETL automation",
        "Data architecture",
        "Real-time streaming"
      ]
    },
    {
      icon: Sparkles,
      title: "Research",
      description: "Cutting-edge innovation",
      className: "card-8",
      delay: 0,
      features: [
        "Experimental models",
        "Academic collaboration",
        "Patent development",
        "Innovation labs"
      ]
    }
  ];

  const detailedServices = [
    {
      icon: Brain,
      title: "Custom AI Solutions",
      description: "Tailored artificial intelligence systems designed to solve your specific business challenges and automate complex processes.",
      features: [
        "Machine Learning Models",
        "Natural Language Processing",
        "Computer Vision",
        "Predictive Analytics",
        "Recommendation Systems"
      ]
    },
    {
      icon: Zap,
      title: "AI Automation",
      description: "Intelligent automation solutions that streamline workflows and eliminate repetitive tasks.",
      features: [
        "Process Automation",
        "Workflow Optimization",
        "Decision Systems",
        "RPA Integration",
        "Smart Scheduling"
      ]
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description: "Transform your data into actionable insights with advanced analytics and visualization.",
      features: [
        "Big Data Processing",
        "Real-time Analytics",
        "Business Intelligence",
        "Data Visualization",
        "Statistical Modeling"
      ]
    },
    {
      icon: Cpu,
      title: "Neural Networks",
      description: "Custom neural network architectures designed for your specific use cases.",
      features: [
        "Deep Learning",
        "Convolutional Networks",
        "Recurrent Networks",
        "Transformer Models",
        "Custom Architectures"
      ]
    },
    {
      icon: Workflow,
      title: "AI Integration",
      description: "Seamlessly integrate AI capabilities into your existing systems and workflows.",
      features: [
        "API Development",
        "Cloud Deployment",
        "System Integration",
        "Microservices",
        "Legacy Modernization"
      ]
    },
    {
      icon: Bot,
      title: "Intelligent Agents",
      description: "Autonomous AI agents that can understand, reason, and act on your behalf.",
      features: [
        "Conversational AI",
        "Virtual Assistants",
        "Multi-agent Systems",
        "Autonomous Decision Making",
        "Context Understanding"
      ]
    }
  ];

  const projects = [
    {
      number: "01",
      title: "HireAI",
      year: "2024",
      description: "A recruitment automation platform that streamlines the hiring process using AI-powered candidate screening and matching algorithms. Built with React, Node.js, and TensorFlow, resulting in 70% faster hiring cycles.",
      technologies: ["React", "Node.js", "TensorFlow", "MongoDB"],
      impact: "70% faster hiring cycles"
    },
    {
      number: "02",
      title: "RAG Report Generator",
      year: "2024",
      description: "An intelligent document analysis system using Retrieval-Augmented Generation to automatically generate comprehensive reports from complex data sources. Reduced report generation time by 85%.",
      technologies: ["Python", "LangChain", "OpenAI", "Vector DB"],
      impact: "85% time reduction"
    },
    {
      number: "03",
      title: "Smart Analytics Dashboard",
      year: "2024",
      description: "Real-time business intelligence platform with predictive analytics capabilities. Features interactive visualizations and automated insights generation, improving decision-making speed by 60%.",
      technologies: ["Vue.js", "D3.js", "Python", "PostgreSQL"],
      impact: "60% faster decisions"
    },
    {
      number: "04",
      title: "Voice Assistant Integration",
      year: "2024",
      description: "Custom voice-enabled interface for enterprise applications using natural language processing. Integrated with existing workflows to provide hands-free operation and accessibility improvements.",
      technologies: ["Speech API", "NLP", "WebRTC", "AWS"],
      impact: "100% accessibility improvement"
    },
    {
      number: "05",
      title: "Automated Content Pipeline",
      year: "2024",
      description: "AI-powered content generation and distribution system that creates, optimizes, and schedules content across multiple platforms. Increased content output by 300% while maintaining quality.",
      technologies: ["GPT-4", "Automation", "CMS", "Analytics"],
      impact: "300% content increase"
    },
    {
      number: "06",
      title: "Predictive Maintenance System",
      year: "2024",
      description: "IoT-enabled predictive maintenance platform using machine learning to forecast equipment failures. Reduced downtime by 45% and maintenance costs by 30% for manufacturing clients.",
      technologies: ["IoT", "ML", "Time Series", "Edge Computing"],
      impact: "45% downtime reduction"
    }
  ];

  const processSteps = [
    {
      icon: "🔍",
      title: "(Step 1) Discovery",
      description: "Together, we dive into your world. A brainstorming session where your challenges meet our creative thinking",
      points: [
        "We learn from you",
        "Identify painpoints",
        "Uncover opportunities",
        "Flag inefficiencies"
      ]
    },
    {
      icon: "📊",
      title: "(Step 2) Analysis",
      description: "We craft a tailored action plan that aligns with your budget and requirements – no guesswork, just solutions",
      points: [
        "We build for you",
        "Compatible with your stack",
        "Designed for the end user",
        "Future ready & modular"
      ]
    },
    {
      icon: "🚀",
      title: "(Step 3) Execution",
      description: "It's go time. Our team gets to work, setting plans into motion, turning ideas into real-world impact",
      points: [
        "We keep you looped",
        "Regular status calls",
        "Open line of communication",
        "Documentation & support"
      ]
    }
  ];

  return (
    <div className="aeos-container">
      {/* Background Effects */}
      <div className="background-effects">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* Mouse Follower */}
      <div 
        className="mouse-follower"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      ></div>

      {/* Navigation */}
      <nav className="main-nav">
        <div className="nav-container">
          <div className="nav-logo" onClick={() => scrollToSection('home')}>
            <img 
              src="/20250628_2207_Jin-AI Labs Logo_remix_01jyvp69nfewmam3rdkfjj88yk.png" 
              alt="Jin-AI Labs Logo" 
              className="logo-image"
            />
          </div>
          
          <button className="nav-toggle" onClick={toggleMenu}>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
        <button className="menu-close-btn" onClick={closeMenu}>
          <X className="w-8 h-8" />
        </button>
        
        <div className="menu-content">
          <div className="menu-items">
            <NavItem onClick={() => scrollToSection('home')}>
              <Home className="w-6 h-6" />
              Home
            </NavItem>
            <NavItem onClick={() => scrollToSection('services')}>
              <Briefcase className="w-6 h-6" />
              What we do
            </NavItem>
            <NavItem onClick={() => scrollToSection('portfolio')}>
              <BarChart3 className="w-6 h-6" />
              How we do it
            </NavItem>
            <NavItem onClick={() => scrollToSection('about')}>
              <Users className="w-6 h-6" />
              Why choose us
            </NavItem>
            <NavItem onClick={() => scrollToSection('contact')}>
              <Phone className="w-6 h-6" />
              Talk to us
            </NavItem>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">AI Lab</span>
          </div>
          
          <h1 className="hero-title">
            <span className="title-line">magic</span>
            <span className="title-line title-gradient">as a service</span>
          </h1>
          
          <p className="hero-description">
            We are Jin-AI Labs, an engineering team that designs and builds GenAI integration and AI automation solutions and experiences
          </p>
          
          <p className="hero-location">
            Based in Bangalore, India. Tinkering since 2025.
          </p>
          
          <div className="hero-actions">
            <button className="cta-primary" onClick={() => scrollToSection('contact')}>
              <span>Talk to us</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="cta-secondary" onClick={() => scrollToSection('portfolio')}>
              Projects
            </button>
          </div>
        </div>

        {/* Flirty Title Above Cards */}
        <div className="cards-flirty-title">
          <span className="flirty-text">Hover to see what we're</span>
          <span className="flirty-highlight">really good at</span>
          <div className="flirty-arrow">↗</div>
        </div>

        {/* Card Stack Container */}
        <div 
          className="card-stack-container"
          onMouseEnter={() => setIsCardStackHovered(true)}
          onMouseLeave={() => setIsCardStackHovered(false)}
        >
          {services.map((service, index) => (
            <FloatingCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              className={service.className}
              delay={service.delay}
              onClick={() => handleCardClick(service)}
              index={index}
              isHovered={isCardStackHovered}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Models</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100M+</div>
            <div className="stat-label">Data Points</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Accuracy</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Uptime</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-page">
        <div className="container">
          <div className="page-header">
            <h2 className="section-title">What we do</h2>
            <p className="section-subtitle">
              We bring GenAI integration & engineering expertise
            </p>
            <p className="section-description">
              Each problem is looked at from a fresh lens to provide you with a solution that solves your specific requirements and integrates with your existing infrastructure
            </p>
          </div>

          <div className="services-grid">
            {detailedServices.map((service, index) => (
              <div key={index} className="service-card-detailed">
                <div className="service-icon-large">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="service-title-large">{service.title}</h3>
                <p className="service-description-large">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <button className="service-cta">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="feature-box">
            <h3 className="feature-title">Magical user experiences</h3>
            <p className="feature-description">We create personalized experiences that engage users and drive meaningful interactions through innovative design and advanced technology integration.</p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio-page">
        <div className="container">
          <div className="page-header">
            <h2 className="section-title">Our Work</h2>
            <p className="section-subtitle">
              Showcasing innovative AI solutions that drive real business impact
            </p>
          </div>

          <div className="portfolio-grid-detailed">
            {projects.map((project, index) => (
              <div key={index} className="project-card-detailed">
                <div className="project-number-large">{project.number}</div>
                <div className="project-content">
                  <h3 className="project-title-large">{project.title}</h3>
                  <p className="project-year">Built in {project.year}</p>
                  <p className="project-description-large">{project.description}</p>
                  
                  <div className="project-technologies">
                    <h4>Technologies Used:</h4>
                    <div className="tech-tags">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="project-impact">
                    <strong>Impact: {project.impact}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-page">
        <div className="container">
          <div className="page-header">
            <h2 className="section-title">How we work</h2>
            <p className="section-subtitle">
              Our proven process for delivering exceptional AI solutions
            </p>
          </div>

          <div className="about-content">
            <div className="process-section">
              <div className="process-grid">
                {processSteps.map((step, index) => (
                  <div key={index} className="process-step">
                    <div className="step-icon">{step.icon}</div>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-description">{step.description}</p>
                    <ul className="step-points">
                      {step.points.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-section">
              <h3 className="feature-title">Why Choose Us</h3>
              <div className="why-choose-grid">
                <div className="why-choose-item">
                  <h4>Expertise</h4>
                  <p>Deep knowledge in AI, machine learning, and automation technologies</p>
                </div>
                <div className="why-choose-item">
                  <h4>Custom Solutions</h4>
                  <p>Tailored approaches that fit your specific business needs and constraints</p>
                </div>
                <div className="why-choose-item">
                  <h4>Proven Results</h4>
                  <p>Track record of delivering measurable business impact and ROI</p>
                </div>
                <div className="why-choose-item">
                  <h4>Future-Ready</h4>
                  <p>Solutions designed to scale and evolve with your business</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-page">
        <div className="container">
          <div className="page-header">
            <h2 className="section-title">Ready to Upgrade?</h2>
            <p className="section-subtitle">
              Dive into the future with Jin-AI Labs. Get in touch and build out a smarter, more automated org.
            </p>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <h3>Let's Talk</h3>
              <p>
                Ready to transform your business with AI? We're here to help you build something amazing.
              </p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <h4>Location</h4>
                  <p>Bangalore, India</p>
                </div>
                <div className="contact-item">
                  <h4>Email</h4>
                  <p>hello@jin-ai-labs.com</p>
                </div>
                <div className="contact-item">
                  <h4>Founded</h4>
                  <p>Tinkering since 2025</p>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input 
                  type="text" 
                  name="name"
                  className="form-input" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  name="email"
                  className="form-input" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Company</label>
                <input 
                  type="text" 
                  name="company"
                  className="form-input" 
                  value={formData.company}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Project Description</label>
                <textarea 
                  name="message"
                  className="form-textarea" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img 
              src="/20250628_2207_Jin-AI Labs Logo_remix_01jyvp69nfewmam3rdkfjj88yk.png" 
              alt="Jin-AI Labs Logo" 
              className="footer-logo-image"
            />
          </div>
          <p className="footer-text">
            Building the future of AI.
          </p>
          <div className="footer-nav">
            <a onClick={() => scrollToSection('home')}>Home</a>
            <a onClick={() => scrollToSection('services')}>Services</a>
            <a onClick={() => scrollToSection('portfolio')}>Portfolio</a>
            <a onClick={() => scrollToSection('about')}>About</a>
            <a onClick={() => scrollToSection('contact')}>Contact</a>
          </div>
          <p className="copyright">&copy; 2025 Jin-AI Labs. All rights reserved.</p>
        </div>
      </footer>

      {/* Fullscreen Modal */}
      <FullscreenModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        service={selectedService}
      />
    </div>
  );
}

export default App;