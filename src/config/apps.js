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
    iconPath: 'linkedin.png',
    icon: '🔗',
    action: () => window.open('https://www.linkedin.com/in/ashmeet-singh-907460163/', '_blank'),
  },
  {
    id: 'gmail',
    title: 'Gmail',
    type: 'link',
    iconPath: 'gmail.png',
    action: () => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=singhashmeet75@gmail.com&su=Hello%20Ashmeet', '_blank'),
  }
];
