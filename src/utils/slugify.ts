import { slug as slugger } from 'github-slugger';

export const slugifyStr = (str: string) => {
  if (!str || typeof str !== 'string') {
    console.warn('slugifyStr received invalid input:', str);
    return '';
  }
  return slugger(str);
};

export const slugifyAll = (arr: string[]) => arr.map(str => slugifyStr(str));
