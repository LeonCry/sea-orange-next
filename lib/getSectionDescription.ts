export interface SectionType {
  [p: string]: {
    title: string;
    description: string;
  };
}
export const getSectionDescription: SectionType = {
  '/': {
    title: 'home',
    description: 'voidis.me'
  },
  '/blog': {
    title: 'bLoG',
    description: 'Learning notes and reflections.',
  },
  '/project': {
    title: 'ProJecT',
    description: 'Completed and ongoing projects.'
  },
  '/camera': {
    title: 'CamErA',
    description: 'Stunning photographs I\'ve captured.'
  },
  '/funny': {
    title: 'FuNnY',
    description: 'Interesting demos that I have implemented.'
  },
  '/gossip': {
    title: 'GoSsiP',
    description: 'Speak out freely, all in the pursuit of supervised democracy!'
  },
  '/about': {
    title: 'AbOuT',
    description: 'void is me.'
  },
};