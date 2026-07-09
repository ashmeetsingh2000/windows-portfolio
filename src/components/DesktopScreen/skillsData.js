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
          label: 'JavaScript (ES6+)',
          type: 'technology',
          status: 'core',
          description:
            'Primary language for modern web development. Extensively used for frontend interfaces, backend services, automation scripts, and desktop applications.',
        },
        {
          id: 'python',
          label: 'Python 3',
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
              label: 'React.js',
              type: 'technology',
              status: 'core',
              description:
                'Primary frontend library. Experienced with hooks, context, component architecture, performance optimization, and modern React patterns.',
            },
            {
              id: 'electron',
              label: 'Electron.js',
              type: 'technology',
              status: 'familiar',
              description:
                'Cross-platform desktop application framework using web technologies. Used for building native-feeling desktop apps.',
            },
            {
              id: 'responsive_design',
              label: 'Responsive Design',
              type: 'technology',
              status: 'core',
              description:
                'Building fluid, adaptive layouts that work seamlessly across all device sizes and screen resolutions.',
            },
            {
              id: 'browser_apis',
              label: 'Browser APIs',
              type: 'technology',
              status: 'core',
              description:
                'Web platform APIs including DOM manipulation, Fetch, WebStorage, IntersectionObserver, and more.',
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
              id: 'django',
              label: 'Django',
              type: 'technology',
              status: 'core',
              description:
                'High-level Python framework focused on rapid development and clean architecture.',
            },
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
              label: 'Express.js',
              type: 'technology',
              status: 'familiar',
              description:
                'Minimal and flexible Node.js framework for REST API development.',
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
            {
              id: 'rest_apis',
              label: 'REST APIs',
              type: 'technology',
              status: 'core',
              description:
                'Designing and building RESTful API architectures with proper resource modeling, versioning, and documentation.',
            },
            {
              id: 'jwt',
              label: 'JWT',
              type: 'technology',
              status: 'familiar',
              description:
                'JSON Web Token based authentication for stateless, secure API authorization flows.',
            },
            {
              id: 'oauth2',
              label: 'OAuth2',
              type: 'technology',
              status: 'familiar',
              description:
                'Industry-standard authorization framework for secure delegated access to APIs and third-party integrations.',
            },
            {
              id: 'rbac',
              label: 'RBAC',
              type: 'technology',
              status: 'familiar',
              description:
                'Role-Based Access Control systems for managing user permissions and authorization hierarchies.',
            },
            {
              id: 'celery',
              label: 'Celery',
              type: 'technology',
              status: 'core',
              description:
                'Distributed task queue for asynchronous job processing, scheduled tasks, and background workflows in Python.',
            },
          ],
        },

        {
          id: 'databases',
          label: 'Databases',
          type: 'category',
          description:
            'Relational, non-relational, and vector data storage technologies.',

          children: [
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
              id: 'mongodb',
              label: 'MongoDB',
              type: 'technology',
              status: 'familiar',
              description:
                'Document-oriented NoSQL database used for flexible schema design.',
            },
            {
              id: 'redis',
              label: 'Redis',
              type: 'technology',
              status: 'familiar',
              description:
                'In-memory datastore commonly used for caching, pub/sub messaging, and high-speed data access.',
            },
            {
              id: 'pgvector',
              label: 'pgvector',
              type: 'technology',
              status: 'familiar',
              description:
                'PostgreSQL extension for vector similarity search, enabling AI/ML embedding storage and retrieval.',
            },
            {
              id: 'pinecone',
              label: 'Pinecone',
              type: 'technology',
              status: 'familiar',
              description:
                'Managed vector database purpose-built for high-performance similarity search and AI applications.',
            },
          ],
        },
      ],
    },

    {
      id: 'ai_llm',
      label: 'AI & LLM',
      type: 'group',
      description:
        'Artificial intelligence, large language model integrations, and intelligent search technologies.',

      children: [
        {
          id: 'rag',
          label: 'RAG',
          type: 'technology',
          status: 'familiar',
          description:
            'Retrieval-Augmented Generation — combining LLM capabilities with external knowledge retrieval for accurate, grounded AI responses.',
        },
        {
          id: 'embeddings',
          label: 'Embeddings',
          type: 'technology',
          status: 'familiar',
          description:
            'Vector representation of text and data for semantic understanding, similarity search, and AI-driven retrieval.',
        },
        {
          id: 'semantic_search',
          label: 'Semantic Search',
          type: 'technology',
          status: 'familiar',
          description:
            'Building search systems that understand meaning and context rather than exact keyword matching.',
        },
        {
          id: 'vector_search',
          label: 'Vector Search',
          type: 'technology',
          status: 'familiar',
          description:
            'Efficient nearest-neighbor search across high-dimensional embedding spaces for AI-powered retrieval.',
        },
        {
          id: 'prompt_engineering',
          label: 'Prompt Engineering',
          type: 'technology',
          status: 'familiar',
          description:
            'Designing and optimizing prompts for large language models to achieve reliable, high-quality outputs.',
        },
        {
          id: 'llm_integrations',
          label: 'LLM Integrations',
          type: 'technology',
          status: 'familiar',
          description:
            'Integrating large language models (OpenAI, Anthropic, etc.) into production applications via APIs and SDKs.',
        },
      ],
    },

    {
      id: 'devops_infra',
      label: 'DevOps & Infrastructure',
      type: 'group',
      description:
        'Containerization, cloud infrastructure, real-time systems, and deployment technologies.',

      children: [
        {
          id: 'docker',
          label: 'Docker',
          type: 'technology',
          status: 'familiar',
          description:
            'Containerization platform for building, deploying, and running applications in isolated environments.',
        },
        {
          id: 'redis_streams',
          label: 'Redis Streams',
          type: 'technology',
          status: 'familiar',
          description:
            'Append-only log data structure in Redis for event streaming, message queuing, and real-time data processing.',
        },
        {
          id: 'websockets',
          label: 'WebSockets',
          type: 'technology',
          status: 'familiar',
          description:
            'Full-duplex communication protocol for building real-time features like live updates, chat, and streaming.',
        },
        {
          id: 'linux',
          label: 'Linux',
          type: 'technology',
          status: 'familiar',
          description:
            'Server administration, shell scripting, process management, and production environment management.',
        },
        {
          id: 'monitoring',
          label: 'Monitoring Systems',
          type: 'technology',
          status: 'familiar',
          description:
            'Application monitoring, logging, alerting, and observability for production systems.',
        },
      ],
    },

    {
      id: 'automation_apps',
      label: 'Automation & Applications',
      type: 'group',
      description:
        'Browser automation, desktop applications, data pipelines, and developer tooling.',

      children: [
        {
          id: 'selenium',
          label: 'Selenium',
          type: 'technology',
          status: 'core',
          description:
            'Browser automation framework for testing, web scraping, and automated workflows.',
        },
        {
          id: 'browser_automation',
          label: 'Browser Automation',
          type: 'technology',
          status: 'core',
          description:
            'End-to-end browser automation for testing, data extraction, and workflow automation.',
        },
        {
          id: 'data_pipelines',
          label: 'Data Pipelines',
          type: 'technology',
          status: 'familiar',
          description:
            'Building automated data extraction, transformation, and loading (ETL) workflows.',
        },
        {
          id: 'electron_app',
          label: 'Electron Apps',
          type: 'technology',
          status: 'familiar',
          description:
            'Building cross-platform desktop applications using Electron and web technologies.',
        },
        {
          id: 'chrome_ext',
          label: 'Chrome Extensions',
          type: 'technology',
          status: 'familiar',
          description:
            'Developing Chrome browser extensions with content scripts, background workers, and browser APIs.',
        },
      ],
    },

    {
      id: 'workflow_delivery',
      label: 'Workflow & Delivery',
      type: 'group',
      description:
        'Development tools, collaboration practices, and professional delivery capabilities.',

      children: [
        {
          id: 'git',
          label: 'Git',
          type: 'technology',
          status: 'core',
          description:
            'Version control expertise including branching strategies, rebasing, conflict resolution, and collaborative workflows.',
        },
        {
          id: 'github',
          label: 'GitHub',
          type: 'technology',
          status: 'core',
          description:
            'Platform for code hosting, pull requests, CI/CD workflows, code review.',
        },
        {
          id: 'jira',
          label: 'JIRA',
          type: 'technology',
          status: 'core',
          description:
            'Project management and issue tracking for sprint planning, backlog management, and team coordination.',
        },
        {
          id: 'agile',
          label: 'Agile Development',
          type: 'technology',
          status: 'core',
          description:
            'Agile methodologies including Scrum ceremonies, sprint planning, retrospectives, and iterative delivery.',
        },
      ],
    },
  ],
};