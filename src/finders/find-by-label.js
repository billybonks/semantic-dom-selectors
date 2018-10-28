import findByAria from './find-by-aria/index';
import config from '../config';

function findByLabel(selector, text) {
  let label = findByAria('label', text);
  if (label.length) {
    label = label[0];
    const target = label.attributes.for;
    if (target && target.value) {
      let elements = selector.split(',');
      const id = target.value;
      selector = elements.map((element) => {
        if (element[0] === '[') {
          return `#${id} ${element},#${id}${element} `;
        }
        return `#${id} ${element}`;
      }).join(',');
      elements = config.rootElement.querySelectorAll(selector);
      if (elements && elements.length) {
        return elements;
      }
      return [document.getElementById(id)];
    }
    throw new Error(`Label was found for ${text} but it did not have a for attribute`);
  }
  return null;
}

export default {
  run: findByLabel,
  key: 'invalid-label-for',
  errorText(type, labelText) {
    return `Control ${labelText} found through invalid label for relationship`;
  },
};
