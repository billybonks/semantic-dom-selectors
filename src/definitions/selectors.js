import {
  button, text, toggle, select,
} from './types';

export const buttonQuery = button.join(',');
export const textQuery = text.join(',');
export const toggleQuery = toggle.join(',');
export const selectQuery = select.join(',');
export const formControlQuery = [textQuery, toggleQuery, selectQuery].join(',');
