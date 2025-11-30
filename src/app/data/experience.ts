import { signal } from '@angular/core';

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string[];
  technologies: string[];
  logo?: string;
}

export const experienceData = signal<Experience[]>([
  {
    company: 'Retransform (An Apex Group Company)',
    role: 'Associate Software Developer',
    duration: 'Jan 2024 - Oct 2025',
    location: 'Mumbai, India',
    description: [
      'Developed and optimized Angular-based SPA modules, improving UI responsiveness by ~25%.',
      'Integrated RESTful APIs to enable dynamic, data-driven functionality across modules.',
      'Automated internal workflows and small tooling using Python, saving 10+ manual hours per week.',
      'Tuned SQL queries for performance gains (~30–40%) and improved database access patterns.',
      'Participated in CI/CD processes and assisted with deployments to ensure reliable releases.',
      'Collaborated with cross-functional teams for feature delivery, testing, and issue resolution.'
    ],
    technologies: [
      'Angular',
      'TypeScript',
      'Python',
      'PostgreSQL',
      'RESTful APIs',
      'Jenkins',
      'Docker',
      'Git'
    ],
    logo: '/assets/images/companies/retransform.jpg'
  },
  {
    company: 'Freelance / Self-Employed',
    role: 'Freelance Software Developer',
    duration: 'Sep 2023 - Dec 2023',
    location: 'Remote',
    description: [
      'Delivered UI enhancements, bug fixes, and reusable components using React and Angular.',
      'Built backend APIs with Python and PostgreSQL to support CRUD operations and integrations.',
      'Improved user experience via optimized UI flows and responsive designs across devices.',
      'Worked closely with clients to gather requirements and deliver timely solutions.'
    ],
    technologies: [
      'Angular',
      'React',
      'Python',
      'PostgreSQL',
      'HTML5',
      'CSS3',
      'Git'
    ],
    logo: '/assets/images/companies/freelance.jpg'
  }
]);