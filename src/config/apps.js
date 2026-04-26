export const appRegistry = [
  {
    id: 'about',
    title: 'About',
    type: 'window',
    icon: '👤',
    component: null, // Placeholder for future React components
  },
  {
    id: 'experience',
    title: 'Work Experience',
    type: 'window',
    icon: '💼',
    component: null,
  },
  {
    id: 'skills',
    title: 'Skills',
    type: 'window',
    icon: '🛠️',
    component: null,
  },
  {
    id: 'certifications',
    title: 'Certifications',
    type: 'window',
    icon: '📜',
    component: null,
  },
  {
    id: 'projects',
    title: 'Projects',
    type: 'window',
    icon: '🚀',
    component: null,
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    type: 'link',
    icon: '🔗',
    action: () => window.open('https://www.linkedin.com/in/ashmeet-singh-907460163/', '_blank'),
  },
  {
    id: 'gmail',
    title: 'Gmail',
    type: 'link',
    icon: '📧',
    action: () => window.open('mailto:singhashmeet75@gmail.com?subject=Hello%20Ashmeet', '_blank'),
  }
];
