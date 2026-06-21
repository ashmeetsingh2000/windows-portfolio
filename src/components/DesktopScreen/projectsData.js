const projectsData = [
  {
    company: "Soforix",
    projects: [
      {
        id: "velemni-backend",
        title: "VELMENI Platform",
        type: "Healthcare AI Platform",
        duration: "2024 - Present",

        overview:
          "Contributed to the ongoing evolution of a production healthcare AI platform by delivering backend features, workflow automation, data synchronization solutions, and operational support while collaborating with stakeholders, engineers, and cross-functional teams.",

        technologies: [
          "Python",
          "Django",
          "PostgreSQL",
          "Celery",
          "Apache Airflow"
        ],

        responsibilities: [
          "Developed and maintained backend APIs supporting platform functionality and client-facing workflows.",
          "Implemented new features and enhancements based on requirements gathered through product, platform, and client discussions.",
          "Participated in technical planning sessions, evaluating implementation approaches and contributing to solution design decisions.",
          "Maintained Celery-based background processing tasks and operational workflows.",
          "Designed and developed Airflow DAGs for data synchronization and automation processes.",
          "Collaborated with frontend engineers and other teams to support feature delivery and clarify backend integration requirements.",
          "Assisted with deployment, onboarding, and monitoring of supporting client-side services during initial rollout phases."
        ],

        contributions:
          "Contributed to the ongoing evolution of a production healthcare AI platform by delivering backend features, workflow automation, data synchronization solutions, and operational support while working directly with platform leadership and cross-functional teams.",

        links: [
          {
            label: "VELMENI",
            url: "https://www.velmeni.ai/"
          }
        ]
      },
      {
        id: "ame-project",
        title: "AME Automation Platform",
        type: "Desktop Automation & QA Platform",
        duration: "2024 - Present",

        overview:
          "A browser automation platform designed for QA teams and business users to record, manage, and replay website workflows. The system supports regression testing for web applications as well as automation of repetitive browser-based tasks such as bulk form submissions and operational workflows.",

        technologies: [
          "React",
          "TypeScript",
          "Electron.js",
          "Node.js",
          "GraphQL",
          "PostgreSQL",
          "Chrome Extension Development",
          "Python",
          "Selenium"
        ],

        responsibilities: [
          "Owned development of the customer-facing Electron desktop application used to create and manage automation workflows.",
          "Maintained and enhanced the Node.js GraphQL backend responsible for workflow management and execution orchestration.",
          "Developed a Chrome Extension for recording browser actions and synchronizing recorded sessions with backend services.",
          "Collaborated on Selenium-based automation services responsible for replaying recorded browser sessions.",
          "Integrated communication between the desktop application, backend services, browser extension, and automation engine.",
          "Participated in packaging and delivering the complete platform as a production-ready Windows application."
        ],

        contributions:
          "Worked across all major platform components including the Electron desktop application, GraphQL backend, browser recording extension, and automation ecosystem, enabling users to record workflows once and execute them repeatedly for testing and operational automation.",

        links: []
      }
    ]
  },
  {
    company: "WhiteLint Global",
    projects: [
      {
        id: "wafer-auth-service",
        title: "WAFER Authentication Gateway",
        type: "Internal Authentication Service",
        duration: "2023 - 2024",

        overview:
          "Developed and maintained an internal authentication service used to control access across multiple industrial web applications. Implemented credential validation, session management, and centralized login workflows for company-operated systems.",

        technologies: [
          "Node.js",
          "Express.js",
          "Redis",
          "JavaScript"
        ],

        responsibilities: [
          "Built authentication APIs for validating user credentials and controlling application access.",
          "Implemented centralized login workflows used across multiple internal tools.",
          "Designed error handling and response structures for authentication-related operations.",
          "Integrated Redis-based caching to reduce repetitive validation lookups.",
          "Maintained authentication logic and access-control workflows across evolving business requirements."
        ],

        contributions:
          "Provided a centralized authentication layer that simplified access management for multiple internal applications."
      },
      {
        id: "ip-intelligence-platform",
        title: "IP Intelligence & Enrichment Platform",
        type: "Data Processing Pipeline",
        duration: "2023",

        overview:
          "Designed a real-time IP enrichment pipeline that processed incoming network records, gathered intelligence from external providers, and maintained a centralized Redis datastore containing over 13 million unique IP profiles.",

        technologies: [
          "Python",
          "Node.js",
          "Express.js",
          "Redis",
          "REST APIs"
        ],

        responsibilities: [
          "Developed a file-watching service that monitored continuously generated CSV records from edge devices.",
          "Built automated ingestion workflows that transmitted new network events to backend processing services.",
          "Implemented Redis-based lookup strategies to avoid duplicate enrichment requests.",
          "Integrated multiple third-party IP intelligence providers to collect geographic and network metadata.",
          "Designed Redis storage structures for millions of enriched IP records and associated metadata.",
          "Exposed centralized IP information services consumed by multiple internal applications."
        ],

        contributions:
          "Built and scaled a centralized IP intelligence datastore containing approximately 13 million unique records, significantly reducing external API usage and accelerating IP information retrieval across company systems."
      },
      {
        id: "wafer-desktop-app",
        title: "WAFER Device Management Console",
        type: "Cross-Platform Desktop Application",
        duration: "2022 - 2024",

        overview:
          "Developed a cross-platform Electron-based desktop application used to remotely manage Raspberry Pi edge devices, configure operational settings, control security services, and monitor device activity across industrial deployments.",

        technologies: [
          "Electron",
          "React",
          "Node.js",
          "SSH",
          "Chart.js",
          "Raspberry Pi"
        ],

        responsibilities: [
          "Built desktop distributions for Windows, Linux, and macOS using Electron.",
          "Implemented secure SSH-based communication with Raspberry Pi edge devices.",
          "Developed remote management capabilities for device configuration and network settings.",
          "Created controls for starting, stopping, and monitoring security services running on remote devices.",
          "Built real-time dashboards to display incoming network and security event data.",
          "Integrated backend APIs to retrieve enriched IP intelligence and detailed network information.",
          "Designed responsive operator interfaces for monitoring and troubleshooting deployed devices."
        ],

        contributions:
          "Delivered a unified management platform that simplified remote administration and monitoring of distributed edge devices across multiple operating systems."
      },
      {
        id: "wafer-cloud-admin-panel",
        title: "WAFER Activity Monitoring Dashboard",
        type: "Real-Time Monitoring Platform",
        duration: "2023",

        overview:
          "Developed a web-based monitoring platform for viewing near real-time network and security activity generated by distributed edge devices. The platform provided operators with centralized event visibility, enriched IP intelligence, filtering capabilities, and investigation workflows.",

        technologies: [
          "React",
          "Node.js",
          "Express.js",
          "Redis",
          "Python",
          "REST APIs"
        ],

        responsibilities: [
          "Developed interactive dashboards for monitoring incoming network activity in near real time.",
          "Built backend services to ingest events generated from remote Raspberry Pi devices.",
          "Implemented polling-based data synchronization between frontend and backend services.",
          "Integrated IP intelligence services to enrich network records with geographic and provider information.",
          "Designed efficient temporary storage strategies for high-frequency activity streams.",
          "Created filtering and search capabilities for investigating individual network events."
        ],

        contributions:
          "Provided centralized visibility into live network activity and enriched IP intelligence, enabling operators to investigate events through a single web interface."
      },
      {
        id: "report-generation-desktop",
        title: "Network Intelligence Report Generator",
        type: "Data Processing & Reporting Tool",
        duration: "2022",

        overview:
          "Built a desktop-based reporting engine that transformed raw network activity logs into structured intelligence reports by aggregating events, enriching IP metadata, and generating analysis-ready datasets.",

        technologies: [
          "Electron",
          "Node.js",
          "Redis",
          "JavaScript",
          "CSV Processing",
          "JSON"
        ],

        responsibilities: [
          "Processed raw network activity logs collected from edge devices and monitoring services.",
          "Aggregated and normalized large event datasets into structured reporting formats.",
          "Integrated centralized IP intelligence services to enrich records with geographic and network metadata.",
          "Generated comprehensive CSV and JSON datasets for downstream analytics workflows.",
          "Implemented data transformation pipelines to identify trends and summarize network activity.",
          "Automated report generation workflows to reduce manual analysis effort."
        ],

        contributions:
          "Created a reusable reporting pipeline that transformed raw network events into analysis-ready datasets consumed across multiple monitoring and investigation tools."
      },
      {
        id: "discover-analytics-desktop",
        title: "Discover Analytics Platform",
        type: "Network Intelligence & Analytics Suite",
        duration: "2022",

        overview:
          "Developed a desktop analytics platform for investigating network activity, identifying suspicious behavior patterns, and analyzing large-scale IP intelligence datasets through advanced visualizations and interactive filtering tools.",

        technologies: [
          "Electron",
          "React",
          "Chart.js",
          "D3.js",
          "SVG",
          "JavaScript"
        ],

        responsibilities: [
          "Designed interactive dashboards for exploring large network intelligence datasets.",
          "Built advanced filtering systems to investigate activity across multiple dimensions and categories.",
          "Developed custom SVG-based visualizations to highlight relationships and behavioral patterns.",
          "Created dynamic charts and statistical views for network health analysis.",
          "Implemented drill-down workflows for investigating individual IP addresses and related activity.",
          "Optimized rendering performance for large analytical datasets within desktop environments."
        ],

        contributions:
          "Enabled analysts to rapidly identify network anomalies, investigate suspicious activity patterns, and visualize large-scale IP intelligence data through a single desktop application."
      }
    ]
  },
  {
    company: "SSRA Consulting",
    projects: [
      {
        id: "finango-website",
        title: "Finango Website",
        type: "Corporate Financial Portal",
        duration: "2022",
        overview: "Marketing and customer onboarding website for Finango, an online financial advisory service.",
        technologies: ["React", "Next.js", "CSS Modules", "Framer Motion"],
        responsibilities: [
          "Developed interactive financial calculators and landing pages.",
          "Optimized assets, images, and bundles to achieve 98+ Lighthouse scores.",
          "Implemented clean and smooth page transitions with Framer Motion."
        ],
        contributions: "Delivered responsive, performance-optimized user experiences for financial services applications while improving usability, accessibility, and page load performance.",
        links: []
      },
      {
        id: "finango-crm-dashboard",
        title: "Finango CRM Dashboard",
        type: "CRM Admin Panel",
        duration: "2021 - 2022",
        overview: "Internal CRM portal for financial advisors to track client portfolios, meetings, and conversion rates.",
        technologies: ["React", "Tailwind CSS", "Node.js", "Express", "PostgreSQL"],
        responsibilities: [
          "Created modular table widgets supporting sorting, filtering, and pagination.",
          "Integrated calendar invite APIs to coordinate appointments between advisors and clients.",
          "Implemented audit logs to track sensitive customer portfolio edits."
        ],
        contributions: "Improved internal operational efficiency by centralizing customer management, appointment tracking, and advisor workflows within a unified dashboard experience.",
        links: []
      },
      {
        id: "ssra-website",
        title: "SSRA Website",
        type: "Consulting Firm Website",
        duration: "2021",
        overview: "The official corporate website for SSRA Consulting showcasing their advisory and management services.",
        technologies: ["HTML5", "CSS3", "JavaScript", "WordPress API"],
        responsibilities: [
          "Developed clean, structured HTML templates based on design mockups.",
          "Configured headless WordPress backend integration to fetch and display dynamic articles.",
          "Tested cross-browser compatibility to ensure uniform experiences."
        ],
        contributions: "Delivered responsive and maintainable website experiences by modernizing frontend implementation and simplifying content management workflows."
      }
    ]
  },
  {
    company: "Freelance",
    projects: [
      {
        id: "client-web-platforms",
        title: "Multi-Platform Client Websites",
        type: "Freelance Web Development",

        duration: "2020 - 2022",

        overview:
          "Contributed to the development, customization, maintenance, and enhancement of multiple client websites across React, WordPress, Shopify, PHP, and static website ecosystems. Worked on UI improvements, feature additions, bug resolution, responsive layouts, content management workflows, and platform-specific customizations.",

        technologies: [
          "React",
          "JavaScript",
          "WordPress",
          "Shopify",
          "PHP",
          "HTML",
          "CSS",
          "Bootstrap",
          "jQuery"
        ],

        responsibilities: [
          "Implemented new UI sections and client-requested features across multiple web platforms.",
          "Resolved frontend and backend issues in production websites.",
          "Customized WordPress themes and page-builder driven websites.",
          "Modified Shopify storefront layouts and e-commerce components.",
          "Worked within existing codebases to deliver enhancements without disrupting production environments.",
          "Improved responsive behavior across desktop, tablet, and mobile devices.",
          "Integrated third-party forms, tracking scripts, and business tools where required.",
          "Collaborated directly with clients to understand requirements and deliver iterative improvements."
        ],

        contributions:
          "Successfully delivered enhancements and maintenance work across multiple client websites built on different technology stacks, demonstrating adaptability to unfamiliar codebases and platforms.",
        links: [
          {
            name: "Webberstop",
            url: "https://webberstop.com"
          },
          {
            name: "Webshot",
            url: "https://webshot.in"
          },
          {
            name: "Trip Beetles",
            url: "https://tripbeetles.com"
          },
          {
            name: "Cakra Collective",
            url: "https://cakracollective.com"
          },
          {
            name: "CurioCart",
            url: "http://curiocart.com"
          },
          {
            name: "MyCuteStickons",
            url: "https://mycutestickons.com"
          },
          {
            name: "Chetali Chadha",
            url: "https://chetalichadha.com"
          },
          {
            name: "Lever Bridge",
            url: "https://lever-bridge.com"
          }
        ]
      }]
  },
  {
    company: "Personal Projects",
    projects: [
      {
        id: "furniture-rag-pipeline",
        title: "Furniture Intelligence Search Platform",
        type: "Retrieval-Augmented Generation (RAG) System",
        duration: "2024",
        overview:
          "Designed and developed a large-scale AI-powered furniture search and recommendation platform capable of understanding natural language queries, performing semantic similarity search across millions of products, and generating context-aware recommendations using Retrieval-Augmented Generation (RAG) techniques.",

        technologies: [
          "Python",
          "FastAPI",
          "PostgreSQL",
          "pgvector",
          "SentenceTransformers",
          "Google Gemini",
          "Ollama",
          "HuggingFace"
        ],

        responsibilities: [
          "Built automated data generation pipelines to create and manage a furniture catalog containing hundreds of thousands to millions of product records.",
          "Generated vector embeddings using transformer-based models for semantic search and recommendation workflows.",
          "Implemented PostgreSQL pgvector storage and similarity search using IVFFLAT indexing strategies.",
          "Designed retrieval pipelines capable of identifying contextually relevant products from large-scale datasets.",
          "Developed FastAPI services exposing semantic search and AI recommendation endpoints.",
          "Integrated LLMs to generate natural-language recommendations based on user requirements, style preferences, and product context.",
          "Optimized embedding generation, indexing, and retrieval performance for large-volume datasets.",
          "Evaluated multiple model providers and local inference solutions to balance response quality, latency, and operating costs."
        ],

        contributions:
          "Created a scalable AI search platform capable of performing semantic retrieval across millions of furniture records while delivering context-aware recommendations through a production-ready RAG architecture."
      },
      {
        id: "system-monitoring-dashboard",
        title: "Real-Time Infrastructure Monitoring Platform",
        type: "Distributed Metrics Streaming System",
        duration: "2025",

        overview:
          "Designed and developed a real-time infrastructure monitoring platform that ingests, processes, aggregates, and visualizes operational metrics from distributed systems using event-driven architecture and Redis Streams.",

        technologies: [
          "Node.js",
          "Redis Streams",
          "WebSocket",
          "Docker",
          "Chart.js",
          "JavaScript"
        ],

        responsibilities: [
          "Simulated telemetry generation across multiple virtual servers producing CPU, memory, disk, network, latency, and request metrics.",
          "Designed event-streaming pipelines using Redis Streams for reliable metric ingestion and processing.",
          "Built aggregation services to compute rolling system-health metrics from high-frequency telemetry events.",
          "Implemented real-time WebSocket broadcasting for live dashboard updates.",
          "Created interactive monitoring dashboards with filtering and historical trend visualization.",
          "Optimized stream retention and processing strategies to handle sustained metric throughput."
        ],

        contributions:
          "Demonstrated a scalable event-driven monitoring architecture by combining telemetry generation, stream processing, metric aggregation, and real-time visualization within a unified platform."
      }
    ]
  }
];

export default projectsData;
