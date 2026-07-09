import React, { useState } from 'react';
import experienceData from './experienceData';
import styles from './DesktopExperience.module.css';

const DesktopExperience = () => {
  const [activeTab, setActiveTab] = useState(1); // 'overview' or experience id

  const activeExperience = experienceData.find((exp) => exp.id === activeTab);

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Work Experience</h1>

        <div className={styles.layoutGrid}>
          {/* Left Navigation Panel */}
          <div className={styles.sidebar} role="navigation" aria-label="Work Experience Roles">
            {experienceData.map((exp) => (
              <button
                key={exp.id}
                className={`${styles.navItem} ${activeTab === exp.id ? styles.activeNavItem : ''}`}
                onClick={() => setActiveTab(exp.id)}
                aria-current={activeTab === exp.id ? "true" : "false"}
              >
                <span className={styles.navDuration}>{exp.duration}</span>
                <span className={styles.navRole}>{exp.role}</span>
                {exp.company && <span className={styles.navCompany}>{exp.company}</span>}
              </button>
            ))}
          </div>

          {/* Right Content Area */}
          <div className={styles.detailArea}>
            {(
              activeExperience && (
                <div className={styles.roleCard}>
                  <div className={styles.roleHeader}>
                    <div>
                      <h2 className={styles.roleTitle}>{activeExperience.role}</h2>
                      {activeExperience.company && (
                        <h3 className={styles.companyName}>{activeExperience.company}</h3>
                      )}
                    </div>
                    <div className={styles.metaInfo}>
                      <span className={styles.duration}>{activeExperience.duration}</span>
                      <span className={styles.location}>{activeExperience.location}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className={styles.sectionTitle}>Professional Summary</h3>
                    <p className={styles.summaryParagraph}>{activeExperience.summary}</p>
                  </div>

                  <div>
                    <h3 className={styles.sectionTitle}>Responsibilities</h3>
                    <ul className={styles.responsibilitiesList}>
                      {activeExperience.responsibilities.map((resp, index) => (
                        <li key={index} className={styles.responsibilityItem}>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {activeExperience.projects && activeExperience.projects.length > 0 && (
                    <div className={styles.projectsSection}>
                      <h3 className={styles.sectionTitle}>Key Projects</h3>
                      <div className={styles.projectsGrid}>
                        {activeExperience.projects.map((proj, index) => (
                          <div key={index} className={styles.projectItem}>
                            <span className={styles.folderIcon}>📁</span>
                            <div className={styles.projectMeta}>
                              <span className={styles.projectName}>{proj.name}</span>
                              <span className={styles.projectSub}>{proj.subtitle}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopExperience;
