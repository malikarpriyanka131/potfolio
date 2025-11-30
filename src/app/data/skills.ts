import { signal } from '@angular/core';

export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
  color?: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  description: string;
  skills: Skill[];
}

export const skillsData = signal<SkillCategory[]>([
  {
    category: 'Languages',
    icon: '💻',
    description: 'Programming and markup languages',
    skills: [
      { name: 'JavaScript', level: 90, color: '#f7df1e' },
      { name: 'TypeScript', level: 90, color: '#007acc' },
      { name: 'Python', level: 85, color: '#3572A5' },
      { name: 'HTML5', level: 90, color: '#e34f26' },
      { name: 'CSS3', level: 85, color: '#264de4' }
    ]
  },
  {
    category: 'Frameworks',
    icon: '🎨',
    description: 'Frontend frameworks and UI libraries',
    skills: [
      { name: 'Angular', level: 90, color: '#dd0031' },
      { name: 'Bootstrap', level: 85, color: '#563d7c' },
      { name: 'Tailwind', level: 85, color: '#06b6d4' }
    ]
  },
  {
    category: 'Frontend',
    icon: '🖥️',
    description: 'Frontend development expertise',
    skills: [
      { name: 'Component Development', level: 90 },
      { name: 'SPA', level: 90 },
      { name: 'State Management', level: 85 },
      { name: 'API Integration', level: 90 }
    ]
  },
  {
    category: 'Backend',
    icon: '⚙️',
    description: 'Backend technologies and operations',
    skills: [
      { name: 'Python APIs', level: 80 },
      { name: 'CRUD Operations', level: 85 },
      { name: 'SQL', level: 85 },
      { name: 'SQL Procedures', level: 80 }
    ]
  },
  {
    category: 'Tools',
    icon: '🛠️',
    description: 'Development and version control tools',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'GitHub', level: 90 },
      { name: 'GitLab', level: 85 },
      { name: 'Postman', level: 85 },
      { name: 'VS Code', level: 95 }
    ]
  },
  {
    category: 'Databases',
    icon: '🗄️',
    description: 'Database technologies and SQL',
    skills: [
      { name: 'SQL Server', level: 80 },
      { name: 'PostgreSQL', level: 80 }
    ]
  },
  {
    category: 'DevOps',
    icon: '🚀',
    description: 'DevOps and deployment technologies',
    skills: [
      { name: 'Jenkins', level: 75 },
      { name: 'Docker', level: 75 },
      { name: 'Kubernetes (Basic)', level: 60 },
      { name: 'CI/CD Pipelines', level: 80 },
      { name: 'Nginx', level: 70 }
    ]
  },
  {
    category: 'Cloud',
    icon: '☁️',
    description: 'Cloud services and fundamentals',
    skills: [
      { name: 'AWS (Basics)', level: 60 }
    ]
  },
  {
    category: 'Methodologies',
    icon: '📋',
    description: 'Development methodologies and practices',
    skills: [
      { name: 'Agile', level: 85 },
      { name: 'Scrum', level: 80 },
      { name: 'SDLC', level: 85 }
    ]
  }
]);