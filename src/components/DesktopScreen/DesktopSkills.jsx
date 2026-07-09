import React, { useState, useMemo, useCallback } from 'react';
import styles from './DesktopSkills.module.css';
import { SKILLS_TREE } from './skillsData';

/* ────────────────────────────────────────────
   Helper: flatten all technology nodes
   ──────────────────────────────────────────── */
const flattenTechnologies = (node) => {
  const techs = [];
  const walk = (n) => {
    if (n.type === 'technology') techs.push(n);
    if (n.children) n.children.forEach(walk);
  };
  walk(node);
  return techs;
};

/* Count technologies inside a node (including nested) */
const countTechnologies = (node) => {
  let count = 0;
  const walk = (n) => {
    if (n.type === 'technology') count++;
    if (n.children) n.children.forEach(walk);
  };
  walk(node);
  return count;
};

/* ────────────────────────────────────────────
   Status rendering helpers
   ──────────────────────────────────────────── */
const STATUS_CONFIG = {
  core: {
    label: 'Running',
    dotClass: 'statusRunning',
    labelClass: 'statusRunningLabel',
  },
  familiar: {
    label: 'Standby',
    dotClass: 'statusStandby',
    labelClass: 'statusStandbyLabel',
  },
};

const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.familiar;
  return (
    <span className={styles.statusIndicator}>
      <span className={`${styles.statusDot} ${styles[config.dotClass]}`} />
      <span className={styles[config.labelClass]}>{config.label}</span>
    </span>
  );
};

/* ────────────────────────────────────────────
   Bar color assignments per domain
   ──────────────────────────────────────────── */
const BAR_COLORS = [
  'perfBarFillCyan',
  'perfBarFillPurple',
  'perfBarFillGreen',
  'perfBarFillAmber',
  'perfBarFillRose',
  'perfBarFillBlue',
  'perfBarFillTeal',
  'perfBarFillOrange',
];

/* ════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════ */
const DesktopSkills = () => {
  const [activeTab, setActiveTab] = useState('processes');
  const [expandedGroups, setExpandedGroups] = useState(new Set());
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [selectedSkill, setSelectedSkill] = useState(null);

  /* ── Derived Data ── */
  const allTechs = useMemo(() => flattenTechnologies(SKILLS_TREE), []);
  const domains = SKILLS_TREE.children;

  const stats = useMemo(() => {
    const coreCount = allTechs.filter((t) => t.status === 'core').length;
    const familiarCount = allTechs.filter((t) => t.status === 'familiar').length;
    const learningCount = allTechs.filter((t) => t.status === 'learning').length;
    return {
      domains: domains.length,
      technologies: allTechs.length,
      core: coreCount,
      familiar: familiarCount,
      learning: learningCount,
    };
  }, [allTechs, domains.length]);

  /* Max tech count across domains for bar chart scaling */
  const maxDomainTechCount = useMemo(
    () => Math.max(...domains.map((d) => countTechnologies(d))),
    [domains]
  );

  /* ── Toggle handlers ── */
  const toggleGroup = useCallback((id) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleCategory = useCallback((id) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectSkill = useCallback((skill) => {
    setSelectedSkill((prev) => (prev?.id === skill.id ? null : skill));
  }, []);

  const closeDetail = useCallback(() => setSelectedSkill(null), []);

  /* ── Key handler for rows ── */
  const handleRowKeyDown = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  /* ════════════════════════════
     RENDER: Stats Bar
     ════════════════════════════ */
  const renderStatsBar = () => (
    <div className={styles.statsBar}>
      <div className={styles.statCard}>
        <span className={styles.statValue}>{stats.domains}</span>
        <span className={styles.statLabel}>Domains Active</span>
      </div>
      <div className={styles.statCard}>
        <span className={styles.statValue}>{stats.technologies}</span>
        <span className={styles.statLabel}>Technologies</span>
      </div>
      <div className={styles.statCard}>
        <span className={styles.statValue}>{stats.core}</span>
        <span className={styles.statLabel}>Core (Running)</span>
      </div>
    </div>
  );

  /* ════════════════════════════
     RENDER: Tab Bar
     ════════════════════════════ */
  const tabs = [
    { id: 'processes', label: 'Processes' },
    { id: 'services', label: 'Services' },
    { id: 'performance', label: 'Performance' },
  ];

  const renderTabBar = () => (
    <div className={styles.tabBar} role="tablist" aria-label="Skills view tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tabButton} ${activeTab === tab.id ? styles.tabButtonActive : ''}`}
          onClick={() => {
            setActiveTab(tab.id);
            setSelectedSkill(null);
          }}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`panel-${tab.id}`}
          id={`tab-${tab.id}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );

  /* ════════════════════════════
     RENDER: Technology Row
     ════════════════════════════ */
  const renderTechRow = (tech, domainLabel, index, isDirect = false) => {
    const isSelected = selectedSkill?.id === tech.id;
    return (
      <div
        key={tech.id}
        className={`${styles.techRow} ${isDirect ? styles.techRowDirect : ''} ${isSelected ? styles.techRowSelected : ''
          } ${styles.rowEnter}`}
        style={{ animationDelay: `${index * 30}ms` }}
        onClick={() => selectSkill(tech)}
        onKeyDown={(e) => handleRowKeyDown(e, () => selectSkill(tech))}
        tabIndex={0}
        role="row"
        aria-selected={isSelected}
      >
        <span className={styles.techName} role="gridcell">{tech.label}</span>
        <span className={styles.techType} role="gridcell">Technology</span>
        <span role="gridcell">
          <StatusBadge status={tech.status} />
        </span>
        <span className={styles.techDomain} role="gridcell">{domainLabel}</span>
      </div>
    );
  };

  /* ════════════════════════════
     RENDER: Process Group
     ════════════════════════════ */
  const renderProcessGroup = (group) => {
    const isExpanded = expandedGroups.has(group.id);
    const techCount = countTechnologies(group);

    /* Determine if children are categories or direct technologies */
    const hasCategories = group.children?.some((c) => c.type === 'category');

    return (
      <div key={group.id}>
        {/* Group header row */}
        <div
          className={`${styles.groupRow} ${isExpanded ? styles.groupRowExpanded : ''}`}
          onClick={() => toggleGroup(group.id)}
          onKeyDown={(e) => handleRowKeyDown(e, () => toggleGroup(group.id))}
          tabIndex={0}
          role="row"
          aria-expanded={isExpanded}
        >
          <span className={styles.groupName} role="gridcell">
            <span className={`${styles.chevron} ${isExpanded ? styles.chevronExpanded : ''}`}>
              ▶
            </span>
            {group.label}
          </span>
          <span className={styles.groupType} role="gridcell">Process Group</span>
          <span className={styles.groupStatus} role="gridcell">
            {techCount} {techCount === 1 ? 'service' : 'services'}
          </span>
          <span className={styles.groupDomain} role="gridcell">System</span>
        </div>

        {/* Expanded children */}
        <div
          className={`${styles.childrenContainer} ${isExpanded ? styles.childrenContainerExpanded : styles.childrenContainerCollapsed
            }`}
        >
          {isExpanded && hasCategories
            ? group.children.map((child) =>
              child.type === 'category'
                ? renderCategoryRow(child, group.label)
                : renderTechRow(child, group.label, 0, true)
            )
            : isExpanded &&
            group.children?.map((tech, i) => renderTechRow(tech, group.label, i, true))}
        </div>
      </div>
    );
  };

  /* ════════════════════════════
     RENDER: Category Row
     ════════════════════════════ */
  const renderCategoryRow = (category, domainLabel) => {
    const isExpanded = expandedCategories.has(category.id);
    const techCount = category.children?.length || 0;

    return (
      <div key={category.id}>
        <div
          className={styles.categoryRow}
          onClick={() => toggleCategory(category.id)}
          onKeyDown={(e) => handleRowKeyDown(e, () => toggleCategory(category.id))}
          tabIndex={0}
          role="row"
          aria-expanded={isExpanded}
        >
          <span className={styles.categoryName} role="gridcell">
            <span className={`${styles.chevron} ${isExpanded ? styles.chevronExpanded : ''}`}>
              ▶
            </span>
            {category.label}
          </span>
          <span className={styles.categoryType} role="gridcell">Category</span>
          <span className={styles.categoryStatus} role="gridcell">
            {techCount} {techCount === 1 ? 'item' : 'items'}
          </span>
          <span className={styles.categoryDomain} role="gridcell">{domainLabel}</span>
        </div>

        <div
          className={`${styles.childrenContainer} ${isExpanded ? styles.childrenContainerExpanded : styles.childrenContainerCollapsed
            }`}
        >
          {isExpanded &&
            category.children?.map((tech, i) => renderTechRow(tech, domainLabel, i))}
        </div>
      </div>
    );
  };

  /* ════════════════════════════
     RENDER: Detail Panel
     ════════════════════════════ */
  const renderDetailPanel = () => {
    if (!selectedSkill) return null;
    const config = STATUS_CONFIG[selectedSkill.status] || STATUS_CONFIG.familiar;

    return (
      <div className={styles.detailPanel} role="complementary" aria-label="Skill details">
        <div className={styles.detailHeader}>
          <h3 className={styles.detailTitle}>{selectedSkill.label}</h3>
          <button
            className={styles.detailCloseBtn}
            onClick={closeDetail}
            aria-label="Close detail panel"
          >
            ✕
          </button>
        </div>

        <div className={styles.detailMeta}>
          <span className={styles.detailBadge}>
            <span className={`${styles.statusDot} ${styles[config.dotClass]}`} />
            {config.label}
          </span>
          <span className={styles.detailBadge}>Technology</span>
        </div>

        <hr className={styles.detailDivider} />

        {selectedSkill.description && (
          <p className={styles.detailDescription}>{selectedSkill.description}</p>
        )}
      </div>
    );
  };

  /* ════════════════════════════
     RENDER: Processes Tab
     ════════════════════════════ */
  const renderProcessesTab = () => (
    <div className={styles.processesLayout}>
      <div className={styles.tableArea}>
        <div className={styles.tableHeader} role="row">
          <span className={styles.columnLabel} role="columnheader">Name</span>
          <span className={styles.columnLabel} role="columnheader">Type</span>
          <span className={styles.columnLabel} role="columnheader">Status</span>
          <span className={styles.columnLabel} role="columnheader">Domain</span>
        </div>
        <div role="treegrid" aria-label="Skills process tree">
          {domains.map((group) => renderProcessGroup(group))}
        </div>
      </div>
      {renderDetailPanel()}
    </div>
  );

  /* ════════════════════════════
     RENDER: Services Tab
     ════════════════════════════ */
  const renderServicesTab = () => (
    <div className={styles.servicesContainer}>
      {domains.map((group) => {
        /* Collect all technologies from this domain (flat) */
        const techs = flattenTechnologies(group);

        return (
          <div key={group.id} className={styles.serviceGroup}>
            <div className={styles.serviceGroupTitle}>{group.label}</div>
            <div className={styles.serviceGrid}>
              {techs.map((tech) => {
                const config = STATUS_CONFIG[tech.status] || STATUS_CONFIG.familiar;
                const isSelected = selectedSkill?.id === tech.id;
                return (
                  <div
                    key={tech.id}
                    className={`${styles.serviceCard} ${isSelected ? styles.serviceCardSelected : ''}`}
                    onClick={() => selectSkill(tech)}
                    tabIndex={0}
                    onKeyDown={(e) => handleRowKeyDown(e, () => selectSkill(tech))}
                    role="button"
                    aria-pressed={isSelected}
                  >
                    <span className={`${styles.serviceDot} ${styles[config.dotClass]}`} />
                    <div className={styles.serviceInfo}>
                      <span className={styles.serviceName}>{tech.label}</span>
                      <span className={styles.serviceStatus}>{config.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );

  /* ════════════════════════════
     RENDER: Performance Tab
     ════════════════════════════ */
  const renderPerformanceTab = () => {
    const coreCount = allTechs.filter((t) => t.status === 'core').length;
    const familiarCount = allTechs.filter((t) => t.status === 'familiar').length;
    const learningCount = allTechs.filter((t) => t.status === 'learning').length;

    return (
      <div className={styles.performanceContainer}>
        <div className={styles.perfSummary}>
          <div className={styles.perfCard}>
            <span className={styles.perfCardValue}>{coreCount}</span>
            <span className={styles.perfCardLabel}>Core (Running)</span>
          </div>
          <div className={styles.perfCard}>
            <span className={styles.perfCardValue}>{familiarCount}</span>
            <span className={styles.perfCardLabel}>Familiar (Standby)</span>
          </div>
        </div>

        <div className={styles.perfDomains}>
          {domains.map((group, i) => {
            const techCount = countTechnologies(group);
            const techs = flattenTechnologies(group);
            const pct = maxDomainTechCount > 0 ? (techCount / maxDomainTechCount) * 100 : 0;
            const colorClass = BAR_COLORS[i % BAR_COLORS.length];

            return (
              <div key={group.id} className={styles.perfDomainRow}>
                <div className={styles.perfDomainHeader}>
                  <span className={styles.perfDomainName}>{group.label}</span>
                  <span className={styles.perfDomainCount}>
                    {techCount} {techCount === 1 ? 'technology' : 'technologies'}
                  </span>
                </div>
                <div className={styles.perfBarTrack}>
                  <div
                    className={`${styles.perfBarFill} ${styles[colorClass]} ${styles.perfBarFillAnimate}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className={styles.perfTechTags}>
                  {techs.map((t) => (
                    <span key={t.id} className={styles.perfTechTag}>
                      {t.label}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  /* ════════════════════════════
     MAIN RENDER
     ════════════════════════════ */
  return (
    <div className={styles.container}>
      {renderStatsBar()}
      {renderTabBar()}
      <div
        className={styles.mainContent}
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {activeTab === 'processes' && renderProcessesTab()}
        {activeTab === 'services' && renderServicesTab()}
        {activeTab === 'performance' && renderPerformanceTab()}
      </div>
    </div>
  );
};

export default DesktopSkills;
