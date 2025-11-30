import { signal } from '@angular/core';

export interface Education {
  school: string;
  degree: string;
  field: string;
  score: string;
  duration: string;
  logo?: string;
}

export const educationData = signal<Education[]>([
  {
    school: 'Government College of Engineering, Yavatmal',
    degree: 'Bachelor of Technology',
    field: 'Computer Engineering',
    score: 'CGPA: 9.18',
    duration: '2019-2023',
    logo: '/assets/images/education/gcoey.jpg'
  },
  {
    school: 'GRWP Yavatmal',
    degree: 'Diploma in Computer Engineering',
    field: 'Computer Engineering',
    score: 'PCT: 90.06%',
    duration: '2017-2020',
    logo: '/assets/images/education/grwp.jpg'
  },
  {
    school: 'Babasaheb Deshmukh Vidyalay',
    degree: 'SSC',
    field: 'General',
    score: 'PCT: 80.60%',
    duration: '2016-2017',
    logo: '/assets/images/education/bdv.jpg'
  }
]);