import React from 'react';
import styles from './DesktopAbout.module.css';

const DesktopAbout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.imageContainer}>
          <img
            src={`${import.meta.env.BASE_URL}profile2.jpg`}
            alt="Ashmeet Singh"
            className={styles.profileImage}
          />
        </div>
        <div className={styles.profileInfo}>
          <h1 className={styles.name}>Ashmeet Singh</h1>
          <h2 className={styles.title}>Software Developer</h2>
          <p className={styles.intro}>
            Building full-stack applications, backend systems, and polished user experiences.
          </p>
        </div>
      </div>

      <div className={styles.aboutSection}>
        <h3 className={styles.sectionHeader}>Profile</h3>
        <div className={styles.textContent}>
          <p className={styles.paragraph}>
            Software Developer with 5+ years of experience building full-stack web applications, backend systems, and interactive user interfaces using JavaScript and modern web technologies.
          </p>
          <p className={styles.paragraph}>
            Experienced across frontend, backend, and automation-focused development, with a strong focus on writing clean, maintainable code and building scalable application architecture. Worked on web platforms, desktop applications, REST APIs, QA automation tools, and AI-supported systems across multiple domains and product environments.
          </p>
          <p className={styles.paragraph}>
            Enjoy building systems end-to-end — from backend logic and APIs to polished frontend experiences and interaction-heavy interfaces. Particularly interested in performance-focused applications, modern UI architecture, automation systems, and developer-centric tooling.
          </p>
        </div>
      </div>

      <div className={styles.aboutSection}>
        <h3 className={styles.sectionHeader}>Focus Areas</h3>
        <div className={styles.tagGrid}>
          <span className={styles.tag}>Full-Stack Applications</span>
          <span className={styles.tag}>REST API Systems</span>
          <span className={styles.tag}>Interactive Frontend UI</span>
          <span className={styles.tag}>Automation Tools</span>
          <span className={styles.tag}>Cross-Platform Development</span>
          <span className={styles.tag}>Backend Architecture</span>
        </div>
      </div>

      <div className={styles.aboutSection}>
        <h3 className={styles.sectionHeader}>Currently Exploring</h3>
        <div className={styles.tagGrid}>
          <span className={styles.tag}>AI Tooling</span>
          <span className={styles.tag}>Machine Learning</span>
          <span className={styles.tag}>System Design</span>
          <span className={styles.tag}>Performance-Focused Interfaces</span>
          <span className={styles.tag}>Modern Web Architecture</span>
        </div>
      </div>

      <div className={styles.aboutSection}>
        <h3 className={styles.sectionHeader}>Preferred Stack</h3>
        <div className={styles.tagGrid}>
          <span className={styles.tag}>JavaScript</span>
          <span className={styles.tag}>React</span>
          <span className={styles.tag}>Node.js</span>
          <span className={styles.tag}>Express</span>
          <span className={styles.tag}>MongoDB</span>
          <span className={styles.tag}>Python</span>
          <span className={styles.tag}>REST APIs</span>
          <span className={styles.tag}>Automation</span>
        </div>
      </div>
    </div>
  );
};

export default DesktopAbout;
