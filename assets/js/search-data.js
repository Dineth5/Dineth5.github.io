// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "Projects",
          description: "These projects showcase my curiosity and drive to tackle engineering and biomedical challenges, combining computational modelling, simulation, and hands-on design to solve real-world problems.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "Peer-reviewed research in computational fluid dynamics, haemodynamics, and physics-informed machine learning.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-gallery",
          title: "Gallery",
          description: "35mm film photography — Olympus OM10 &amp; Yashica 635.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/gallery/";
          },
        },{id: "nav-contact",
          title: "Contact",
          description: "Get in touch.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/contact/";
          },
        },{id: "news-i-began-my-undergraduate-studies-in-mechanical-engineering-at-the-university-of-manchester",
          title: 'I began my undergraduate studies in Mechanical Engineering at the University of Manchester....',
          description: "",
          section: "News",},{id: "news-launched-and-coordinated-the-peer-mentoring-program-for-foundation-year-students-in-the-faculty-of-science-and-engineering-at-the-university-of-manchester",
          title: 'Launched and coordinated the Peer Mentoring program for foundation year students in the...',
          description: "",
          section: "News",},{id: "news-the-peer-mentoring-scheme-was-honoured-as-a-recipient-of-the-peer-support-awards-2024",
          title: 'The Peer Mentoring scheme was honoured as a recipient of the Peer Support...',
          description: "",
          section: "News",},{id: "news-completed-an-internship-as-a-research-and-design-engineer-at-naffco",
          title: 'Completed an internship as a Research and Design Engineer at NAFFCO.',
          description: "",
          section: "News",},{id: "news-completed-an-internship-as-a-research-and-design-engineer-at-danway",
          title: 'Completed an internship as a Research and Design Engineer at DANWAY.',
          description: "",
          section: "News",},{id: "news-defended-my-undergraduate-dissertation-computational-fluid-dynamics-for-intracranial-aneurysms-at-the-university-of-manchester-viva-awarded-91",
          title: 'Defended my undergraduate dissertation, Computational Fluid Dynamics for Intracranial Aneurysms, at the University...',
          description: "",
          section: "News",},{id: "news-graduated-from-the-university-of-manchester-with-an-80-average-and-was-a-recipient-of-the-stellify-award",
          title: 'Graduated from the University of Manchester with an 80% average and was a...',
          description: "",
          section: "News",},{id: "news-submitted-my-undergraduate-thesis-computational-fluid-dynamics-of-intracranial-aneurysms-and-rupture-prediction-to-the-journal-scientific-reports",
          title: 'Submitted my undergraduate thesis, “Computational Fluid Dynamics of Intracranial Aneurysms and Rupture Prediction,”...',
          description: "",
          section: "News",},{id: "news-began-my-msc-in-computational-biomedical-engineering-at-imperial-college-london",
          title: 'Began my MSc in Computational Biomedical Engineering at Imperial College London.',
          description: "",
          section: "News",},{id: "news-commenced-imperial-msc-dissertation-on-physics-informed-neural-networks-pinns-for-real-time-intracranial-haemodynamics-running-training-on-imperial-s-hpc-cluster-cx3",
          title: 'Commenced Imperial MSc dissertation on physics-informed neural networks (PINNs) for real-time intracranial haemodynamics,...',
          description: "",
          section: "News",},{id: "projects-cfd-of-aneurysms",
          title: 'CFD of Aneurysms',
          description: "CFD to predict rupture risk in intracranial aneurysms",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Aneurysms/";
            },},{id: "projects-2-axes-cnc-lathe",
          title: '2-Axes CNC Lathe',
          description: "Mechanical design project for a compact classroom CNC lathe",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Lathe/";
            },},{id: "projects-vima",
          title: 'VIMA',
          description: "Visual Impairment Motion Assistant",
          section: "Projects",handler: () => {
              window.location.href = "/projects/VIMA/";
            },},{id: "projects-fire-hose-advancer",
          title: 'Fire Hose Advancer',
          description: "Design project focused on enhancing fire safety equipment",
          section: "Projects",handler: () => {
              window.location.href = "/projects/firehose/";
            },},{id: "projects-hydro-pede",
          title: 'Hydro-pede',
          description: "Concept design for fire hose advancer",
          section: "Projects",handler: () => {
              window.location.href = "/projects/hydropede/";
            },},{id: "projects-hyperloop-manchester",
          title: 'Hyperloop Manchester',
          description: "Vacuum capsule structural lead — airlock design, FEA, fabrication",
          section: "Projects",handler: () => {
              window.location.href = "/projects/hyperloop/";
            },},{id: "projects-pinns-ai-accelerated-cfd",
          title: 'PINNs — AI-Accelerated CFD',
          description: "Physics-Informed Neural Networks for real-time intracranial haemodynamics (Imperial MSc Dissertation)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/pinns/";
            },},{id: "projects-internal-pipe-climber",
          title: 'Internal Pipe Climber',
          description: "IMechE Design Challenge 2022 – Internal Pipe Climber",
          section: "Projects",handler: () => {
              window.location.href = "/projects/pipeclimber/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%64%69%6E%65%74%68.%69%6C%61%70%70%65%72%75%6D%61@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/Dineth5", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/ilapperuma", "_blank");
        },
      },{
        id: 'social-youtube',
        title: 'YouTube',
        section: 'Socials',
        handler: () => {
          window.open("https://youtube.com/@dineth.ilapperuma", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
