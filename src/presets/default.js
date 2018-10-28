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
    'not-aria-compliant': 'warn',
    'invalid-label-for': 'warn',
    'name-attribute': 'warn',
  },
};
