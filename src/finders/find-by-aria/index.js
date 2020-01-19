import computeAria from './compute-aria';
import findAll from '../helpers/findAll';
import matchLabel from '../helpers/matchLabel';

export default function findByAria(selector, labelText) {
  return findAll(selector).filter(element => matchLabel(labelText, computeAria(element)));
}
