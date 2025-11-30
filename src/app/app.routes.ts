import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'education',
        loadComponent: () => import('./pages/education.component').then(m => m.EducationComponent)
    },
    { 
        path: 'home', 
        loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent)
    },
    { 
        path: 'about', 
        loadComponent: () => import('./pages/about.component').then(m => m.AboutComponent)
    },
    { 
        path: 'skills', 
        loadComponent: () => import('./pages/skills.component').then(m => m.SkillsComponent)
    },
    { 
        path: 'experience', 
        loadComponent: () => import('./pages/experience.component').then(m => m.ExperienceComponent)
    },
    { 
        path: 'projects', 
        loadComponent: () => import('./pages/projects.component').then(m => m.ProjectsComponent)
    },
    { 
        path: 'contact', 
        loadComponent: () => import('./pages/contact.component').then(m => m.ContactComponent)
    },
    { 
        path: 'dashboard', 
        loadComponent: () => import('./pages/dashboard.component').then(m => m.DashboardComponent)
    },
    { 
        path: 'terms', 
        loadComponent: () => import('./pages/terms.component').then(m => m.TermsComponent)
    },
    { 
        path: 'privacy', 
        loadComponent: () => import('./pages/privacy.component').then(m => m.PrivacyComponent)
    },
    { path: '**', redirectTo: 'home' }
];
