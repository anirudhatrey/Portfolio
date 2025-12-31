import type { Testimonial } from '@/types';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Aakash Sharma',
    role: 'Digital Specialist Engineer',
    company: 'Infosys Pvt Ltd.',
    relationship: 'Managed Anirudh directly',
    date: 'October 2021',
    quote: 'His constant quest to learn, adapt and apply professional lessons proves out Anirudh\'s ability to be an active individual contributor and participant on any team. He is very pleasant and easy to work with. He does what he says and his work is always top notch. I have appreciated his organized approach to problem solving, and I look forward to working with him in the future. If Anirudh is not on your team, then you\'re missing out.',
    highlightQuote: 'If Anirudh is not on your team, then you\'re missing out.',
    linkedinUrl: 'https://www.linkedin.com/in/aakash-sharma05',
  },
  {
    id: '2',
    name: 'Manasvi Gandhi',
    role: 'Business Analyst',
    company: 'Gartner',
    relationship: 'Managed Anirudh directly',
    date: 'February 2023',
    quote: 'In order to be successful as a web developer, it is important to have strong collaboration, communication, and innovation skills. Anirudh Kumar Atrey has demonstrated these skills through his work on various projects. He is always strict to deadlines, shares innovative ideas, and believes in teamwork. This demonstrates his commitment to collaborating with others, communicating effectively, and being a problem solver. As a result of these skills, he has been able to exceed expectations and deliver high-quality work.',
    highlightQuote: 'He has been able to exceed expectations and deliver high-quality work.',
    linkedinUrl: 'https://www.linkedin.com/in/manasvigandhi',
  },
  {
    id: '3',
    name: 'Maharsh Shah',
    role: 'Co-Founder & CEO',
    company: 'MealPe',
    relationship: 'Managed Anirudh directly',
    date: 'September 2021',
    quote: 'A dedicated worker, and works really well in team collaborating with all. Getting things done is a quality of Anirudh you can bet on.',
    highlightQuote: 'Getting things done is a quality of Anirudh you can bet on.',
    linkedinUrl: 'https://www.linkedin.com/in/maharshshah',
  },
  {
    id: '4',
    name: 'Janmejay Shastri',
    role: 'Software Engineer 2',
    company: 'Infocusp Innovations',
    relationship: 'Worked together on same team',
    date: 'September 2021',
    quote: 'Anirudh has been a hard working, focused person and a team player. Working with him was really good. The most important thing is, apart from just technical skills, his communication skills are nice and he works really well in a team.',
    highlightQuote: 'Apart from technical skills, his communication skills are nice.',
    linkedinUrl: 'https://www.linkedin.com/in/janmejay-shastri',
  },
  {
    id: '5',
    name: 'Kopal Kamboj',
    role: 'Technical Business Analyst',
    company: 'TCS',
    relationship: 'Worked together',
    date: 'September 2021',
    quote: 'I\'ve worked with Anirudh and his skills are great as he\'s extremely hardworking, a really talented person who will be a gem to the company who will be hiring him. He\'s also good in leadership and good communication.',
    highlightQuote: 'A gem to the company who will be hiring him.',
    linkedinUrl: 'https://www.linkedin.com/in/kopal-kamboj-0a3b65188',
  },
];

// Get featured testimonials (top 3)
export const getFeaturedTestimonials = () => testimonials.slice(0, 3);



