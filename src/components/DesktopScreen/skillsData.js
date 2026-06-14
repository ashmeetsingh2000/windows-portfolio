export const SKILLS_TREE = {
  id: 'root',
  label: 'Full Stack Developer',
  type: 'root',
  description:
    'Full-Stack Software Developer focusing on building end-to-end web applications, robust backend APIs, and polished user experiences.',

  children: [
    {
      id: 'foundation',
      label: 'Foundation',
      type: 'group',
      description:
        'Core programming languages and web fundamentals that form the foundation of modern software development.',

      children: [
        {
          id: 'javascript',
          label: 'JavaScript',
          type: 'technology',
          status: 'core',
          description:
            'Primary language for modern web development. Extensively used for frontend interfaces, backend services, automation scripts, and desktop applications.',
        },
        {
          id: 'python',
          label: 'Python',
          type: 'technology',
          status: 'core',
          description:
            'Used for backend development, automation, data processing, and machine learning workflows.',
        },
        {
          id: 'html5',
          label: 'HTML5',
          type: 'technology',
          status: 'core',
          description:
            'Standard markup language used for semantic, accessible, and structured web applications.',
        },
        {
          id: 'css3',
          label: 'CSS3',
          type: 'technology',
          status: 'core',
          description:
            'Used for responsive layouts, animations, transitions, and polished user interface design.',
        },
      ],
    },

    {
      id: 'engineering_stack',
      label: 'Engineering Stack',
      type: 'group',
      description:
        'Frontend, backend, and data technologies used to design and build complete software systems.',

      children: [
        {
          id: 'frontend',
          label: 'Frontend Development',
          type: 'category',
          description:
            'Libraries and frameworks used to build responsive and interactive user interfaces.',

          children: [
            {
              id: 'react',
              label: 'React',
              type: 'technology',
              status: 'core',
              description:
                'Primary frontend library. Experienced with hooks, context, component architecture, performance optimization, and modern React patterns.',
            },
          ],
        },

        {
          id: 'backend',
          label: 'Backend Development',
          type: 'category',
          description:
            'Server-side frameworks, runtimes, and API technologies.',

          children: [
            {
              id: 'nodejs',
              label: 'Node.js',
              type: 'technology',
              status: 'core',
              description:
                'Primary backend runtime used for APIs, services, integrations, and automation.',
            },
            {
              id: 'express',
              label: 'Express',
              type: 'technology',
              status: 'core',
              description:
                'Minimal and flexible Node.js framework for REST API development.',
            },
            {
              id: 'django',
              label: 'Django',
              type: 'technology',
              status: 'familiar',
              description:
                'High-level Python framework focused on rapid development and clean architecture.',
            },
            {
              id: 'fastapi',
              label: 'FastAPI',
              type: 'technology',
              status: 'familiar',
              description:
                'Modern Python API framework known for speed, typing support, and developer experience.',
            },
            {
              id: 'graphql',
              label: 'GraphQL',
              type: 'technology',
              status: 'familiar',
              description:
                'API query language that allows clients to request exactly the data they need.',
            },
          ],
        },

        {
          id: 'databases',
          label: 'Databases',
          type: 'category',
          description:
            'Relational and non-relational data storage technologies.',

          children: [
            {
              id: 'mongodb',
              label: 'MongoDB',
              type: 'technology',
              status: 'core',
              description:
                'Document-oriented NoSQL database used for flexible schema design.',
            },
            {
              id: 'postgresql',
              label: 'PostgreSQL',
              type: 'technology',
              status: 'core',
              description:
                'Powerful relational database focused on integrity and advanced querying.',
            },
            {
              id: 'mysql',
              label: 'MySQL',
              type: 'technology',
              status: 'familiar',
              description:
                'Widely adopted relational database used in many production web applications.',
            },
            {
              id: 'redis',
              label: 'Redis',
              type: 'technology',
              status: 'familiar',
              description:
                'In-memory datastore commonly used for caching and high-speed data access.',
            },
          ],
        },
      ],
    },

    {
      id: 'workflow_delivery',
      label: 'Workflow & Delivery',
      type: 'group',
      description:
        'Tools, automation systems, and professional capabilities used to deliver software effectively.',

      children: [
        {
          id: 'tools_automation',
          label: 'Tools & Automation',
          type: 'category',
          description:
            'Development tools, automation frameworks, and productivity systems.',

          children: [
            {
              id: 'git',
              label: 'Git',
              type: 'technology',
              status: 'core',
            },
            {
              id: 'jira',
              label: 'JIRA',
              type: 'technology',
              status: 'core',
            },
            {
              id: 'selenium',
              label: 'Selenium',
              type: 'technology',
              status: 'core',
            },
            {
              id: 'electron',
              label: 'Electron',
              type: 'technology',
              status: 'familiar',
            },
            {
              id: 'chrome_ext',
              label: 'Chrome Extension Development',
              type: 'technology',
              status: 'familiar',
            },
          ],
        },

        {
          id: 'professional_skills',
          label: 'Professional Skills',
          type: 'category',
          description:
            'Soft skills and working practices used in real-world software teams.',

          children: [
            {
              id: 'teamwork',
              label: 'Team Collaboration',
              type: 'technology',
              status: 'core',
            },
            {
              id: 'solving',
              label: 'Problem Solving',
              type: 'technology',
              status: 'core',
            },
            {
              id: 'rapid_tech',
              label: 'Rapid Technology Adoption',
              type: 'technology',
              status: 'core',
            },
            {
              id: 'agile',
              label: 'Agile Development',
              type: 'technology',
              status: 'core',
            },
          ],
        },
      ],
    },

    {
      id: 'exploring',
      label: 'Currently Exploring',
      type: 'group',
      description:
        'Technologies and domains currently being explored and studied.',

      children: [
        {
          id: 'machine_learning',
          label: 'Machine Learning',
          type: 'technology',
          status: 'learning',
          description:
            'Studying machine learning concepts, model development, and practical ML workflows.',
        },
        {
          id: 'numpy',
          label: 'NumPy',
          type: 'technology',
          status: 'learning',
          description:
            'Learning numerical computing and array-based data processing in Python.',
        },
        {
          id: 'data_analysis',
          label: 'Data Analysis',
          type: 'technology',
          status: 'learning',
          description:
            'Exploring techniques for cleaning, transforming, and extracting insights from data.',
        },
      ],
    },
  ],
};