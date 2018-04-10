export const def = x => typeof x !== 'undefined';

export const undef = x => !def(x);

export const head = ([x]) => x;

export const tail = ([, ...xs]) => xs

export const copy = array => [...array]
