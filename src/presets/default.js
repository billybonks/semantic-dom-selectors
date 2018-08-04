import findByAria from '../finders/find-by-aria/rule';
import findByLabel from '../finders/find-by-label';
import findByName from '../finders/find-by-name';

export default {
  finders: [
    findByAria,
    findByLabel,
    findByName,
  ],
  rules: {
    'aria-compliant': 1,
    'invalid-label-for': 1,
    'name-attribute': 1,
  },
};
