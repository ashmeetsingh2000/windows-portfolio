import React, { useState } from 'react';
import projectsData from './projectsData';
import styles from './DesktopProjects.module.css';

const DesktopProjects = () => {
  const [expandedCompany, setExpandedCompany] = useState(projectsData[0]?.company);
  const [activeProjectId, setActiveProjectId] = useState(projectsData[0]?.projects[0]?.id);

  // Find the selected project across all groups
  let activeProject = null;
  for (const group of projectsData) {
    const found = group.projects.find(p => p.id === activeProjectId);
    if (found) {
      activeProject = found;
      break;
    }
  }

  const handleCompanyHeaderClick = (companyName) => {
    // Prevent collapsing if it's already the expanded company (Requirement 4)
    if (expandedCompany === companyName) {
      return;
    }

    // Switch expanded group
    setExpandedCompany(companyName);

    // Auto-select first project in the newly expanded group (Requirement 5)
    const targetGroup = projectsData.find(group => group.company === companyName);
    if (targetGroup && targetGroup.projects.length > 0) {
      setActiveProjectId(targetGroup.projects[0].id);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Projects</h1>

        <div className={styles.layoutGrid}>
          {/* Left Explorer Navigation Panel */}
          <div className={styles.sidebar} role="navigation" aria-label="Projects Explorer">
            {projectsData.map((group) => {
              const isExpanded = expandedCompany === group.company;
              const groupId = `projects-group-${group.company.replace(/\s+/g, '-')}`;
              return (
                <div key={group.company} className={styles.groupContainer}>
                  <button
                    className={styles.groupHeader}
                    onClick={() => handleCompanyHeaderClick(group.company)}
                    aria-expanded={isExpanded}
                    aria-controls={groupId}
                  >
                    <span className={`${styles.chevron} ${isExpanded ? styles.chevronExpanded : ''}`}>
                      ▶
                    </span>
                    <span className={styles.groupTitle}>{group.company}</span>
                  </button>
 
                  <div 
                    id={groupId}
                    className={`${styles.projectList} ${isExpanded ? styles.expanded : styles.collapsed}`}
                    aria-hidden={!isExpanded}
                  >
                    {group.projects.map((proj) => (
                      <button
                        key={proj.id}
                        className={`${styles.projectNavItem} ${activeProjectId === proj.id ? styles.activeProjectNavItem : ''}`}
                        onClick={() => setActiveProjectId(proj.id)}
                        aria-current={activeProjectId === proj.id ? "true" : "false"}
                      >
                        <span className={styles.projectBullet}>•</span>
                        <span className={styles.projectNameLink}>{proj.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Content Area */}
          <div className={styles.detailArea}>
            {activeProject && (
              <div className={styles.roleCard}>
                <div className={styles.roleHeader}>
                  <div>
                    <h2 className={styles.roleTitle}>{activeProject.title}</h2>
                    <h3 className={styles.companyName}>
                      {activeProject.type}
                    </h3>
                  </div>
                  <div className={styles.metaInfo}>
                    {activeProject.duration && (
                      <span className={styles.duration}>{activeProject.duration}</span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className={styles.sectionTitle}>Project Overview</h3>
                  <p className={styles.summaryParagraph}>{activeProject.overview}</p>
                </div>

                {activeProject.technologies && activeProject.technologies.length > 0 && (
                  <div>
                    <h3 className={styles.sectionTitle}>Technologies</h3>
                    <div className={styles.techContainer}>
                      {activeProject.technologies.map((tech, index) => (
                        <span key={index} className={styles.techTag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeProject.responsibilities && activeProject.responsibilities.length > 0 && (
                  <div>
                    <h3 className={styles.sectionTitle}>Key Contributions</h3>
                    <ul className={styles.responsibilitiesList}>
                      {activeProject.responsibilities.map((resp, index) => (
                        <li key={index} className={styles.responsibilityItem}>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeProject.contributions && (
                  <div>
                    <h3 className={styles.sectionTitle}>Impact</h3>
                    <p className={styles.summaryParagraph}>{activeProject.contributions}</p>
                  </div>
                )}

                {activeProject.links && Array.isArray(activeProject.links) && activeProject.links.length > 0 && (
                  <div>
                    <h3 className={styles.sectionTitle}>Links</h3>
                    <div className={styles.linksContainer}>
                      {activeProject.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.linkPill}
                        >
                          {link.name || link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopProjects;
