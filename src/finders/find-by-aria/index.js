import computeAria from './compute-aria';
import findAll from './../helpers/findAll';

export default function findByAria(selector, labelText, { within } = {}) {
  return findAll(selector, { within }).filter( (element) => {
    return computeAria(element) === labelText.toLowerCase()
  });
}
