import findAll from './helpers/findAll';
import notify from '../notify';

function findBySelector(selector, text) {
  const elements = selector.split(',');
  let objects;

  const childElementSelector = elements.map(element => `${element} ${text}`).join(',');
  objects = findAll(childElementSelector);

  if (!objects || objects.length === 0) {
    objects = findAll(text);

    if (objects) {
      objects.forEach((object) => {
        if (!object.matches(selector)) {
          notify('query-selector-invalid-role', 'object', text, () => 'Element found with invalid role');
        }
      });
    }
  }

  return objects;
}

export default {
  run: findBySelector,
  key: 'query-selector',
};
