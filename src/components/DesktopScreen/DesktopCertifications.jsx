import React from 'react';
import styles from './DesktopCertifications.module.css';

const certificates = [
  {
    title: 'Responsive Web Design',
    provider: 'freeCodeCamp',
    issued: 'September 2021',
    description: 'Focused on building responsive and accessible web interfaces using modern HTML and CSS. Covered semantic markup, Flexbox, CSS Grid, form design, responsive layouts, accessibility principles, mobile-first design techniques, and web development best practices for creating user-friendly experiences across different screen sizes.',
    tags: ['HTML', 'CSS', 'Responsive Design', 'Flexbox', 'CSS Grid', 'Accessibility'],
    url: 'https://www.freecodecamp.org/certification/fcc3b24b26e-346f-4c30-97d4-8236828440fd/responsive-web-design'
  },
  {
    title: 'JavaScript Algorithms and Data Structures',
    provider: 'freeCodeCamp',
    issued: 'October 2021',
    description: 'Focused on core JavaScript programming concepts including ES6, functional programming, object-oriented programming, debugging, regular expressions, algorithms, and data structures. Emphasized problem-solving techniques, logical thinking, code optimization, and writing maintainable JavaScript applications through hands-on coding exercises.',
    tags: ['JavaScript', 'ES6', 'Algorithms', 'Data Structures', 'Functional Programming', 'Problem Solving'],
    url: 'https://www.freecodecamp.org/certification/fcc3b24b26e-346f-4c30-97d4-8236828440fd/javascript-algorithms-and-data-structures'
  },
  {
    title: 'Front End Development Libraries',
    provider: 'freeCodeCamp',
    issued: 'November 2021',
    description: 'Focused on modern frontend development using component-based architecture and frontend libraries. Covered React, Redux, state management concepts, reusable UI composition, application structure, and best practices for building scalable, maintainable, and interactive frontend applications.',
    tags: ['React', 'Redux', 'Frontend Architecture', 'State Management', 'UI Development'],
    url: 'https://www.freecodecamp.org/certification/fcc3b24b26e-346f-4c30-97d4-8236828440fd/front-end-development-libraries'
  },
  {
    title: 'Data Visualization',
    provider: 'freeCodeCamp',
    issued: 'December 2022',
    description: 'Focused on transforming data into interactive visual experiences using modern visualization techniques. Covered data-driven interfaces, chart rendering, SVG concepts, D3.js fundamentals, interactive dashboards, and visual communication through effective data representation and storytelling.',
    tags: ['D3.js', 'Data Visualization', 'Charts', 'SVG', 'Interactive Data'],
    url: 'https://www.freecodecamp.org/certification/fcc3b24b26e-346f-4c30-97d4-8236828440fd/data-visualization'
  },
  {
    title: 'The Ultimate Job Ready Data Science Course',
    provider: 'CodeWithHarry',
    issued: 'October 2025',
    description: 'Comprehensive data science training focused on Python-based data analysis, data preprocessing, statistics, machine learning fundamentals, exploratory data analysis, SQL workflows, data visualization techniques, and practical project-driven learning. The course provided hands-on exposure to industry-standard data science workflows, including working with datasets, extracting insights, preparing data for machine learning, and building a strong foundation for AI and ML-oriented development.',
    tags: ['Python', 'Data Science', 'Machine Learning', 'Pandas', 'NumPy', 'Statistics', 'SQL', 'Data Visualization'],
    url: 'Data-Science-Course-Certificate.pdf'
  }
];


const DesktopCertifications = () => {
  const handleViewCertificate = (url) => {
    if (url.startsWith('http')) {
      window.open(url, '_blank');
    } else {
      window.open(`${import.meta.env.BASE_URL}${url}`, '_blank');
    }
  };

  const sortedCertificates = [...certificates].sort((a, b) => new Date(b.issued) - new Date(a.issued));

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.headerSection}>
          <h1 className={styles.title}>Professional Certifications</h1>
          <p className={styles.introParagraph}>
            Selected certifications completed across different stages of my learning journey, covering web development fundamentals, JavaScript engineering, frontend architecture, data visualization, and data science concepts.
          </p>
          <p className={styles.subIntro}>
            These certifications helped establish strong technical foundations while also supporting continued exploration into data-focused and AI-adjacent domains.
          </p>
        </div>

        <div className={styles.grid}>
          {sortedCertificates.map((cert, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{cert.title}</h3>
                  <span className={styles.badge}>{cert.provider}</span>
                </div>
                <p className={styles.issueDate}>Issued {cert.issued}</p>
                <p className={styles.description}>{cert.description}</p>
                <div className={styles.tagContainer}>
                  {cert.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button
                className={styles.button}
                onClick={() => handleViewCertificate(cert.url)}
              >
                View Certificate
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesktopCertifications;
