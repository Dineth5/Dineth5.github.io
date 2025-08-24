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
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-contact",
          title: "Contact",
          description: "📬 Get in touch with me",
          section: "Navigation",
          handler: () => {
            window.location.href = "/contact/";
          },
        },{id: "post-sri-lanka-2025",
        
          title: "Sri Lanka 2025",
        
        description: "Work in progress, more of a side quest",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/sri-lanka/";
          
        },
      },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
        
          title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
        section: "Posts",
        handler: () => {
          
            window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
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
          section: "News",},{id: "news-graduated-from-the-university-of-manchester-with-an-80-average-and-was-a-recipient-of-the-stellify-award",
          title: 'Graduated from the University of Manchester with an 80% average and was a...',
          description: "",
          section: "News",},{id: "news-submitted-my-undergraduate-thesis-computational-fluid-dynamics-of-intracranial-aneurysms-and-rupture-prediction-to-the-journal-scientific-reports",
          title: 'Submitted my undergraduate thesis, “Computational Fluid Dynamics of Intracranial Aneurysms and Rupture Prediction,”...',
          description: "",
          section: "News",},{id: "news-scheduled-to-begin-my-msc-in-computational-biomedical-engineering-at-imperial-college-london",
          title: 'Scheduled to begin my MSc in Computational Biomedical Engineering at Imperial College London....',
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
        id: 'social-instagram',
        title: 'Instagram',
        section: 'Socials',
        handler: () => {
          window.open("https://instagram.com/dineth.ilapperuma", "_blank");
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
          window.open("https://youtube.com/@dinethilapperuma3451", "_blank");
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
