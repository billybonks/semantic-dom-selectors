import findAll from './helpers/findAll';
import matchLabel from './helpers/matchLabel';

function findByName(selector, text) {
  const elements = selector.split(',');

  if (text instanceof RegExp) {
    // filter by elements with name attribuets
    const elementSelector = elements.map((element) => `${element}[name]`).join(',');
    return findAll(elementSelector).filter((element) => matchLabel(text, element.getAttribute('name')));
  }
  const elementSelector = elements.map((element) => `${element}[name="${text}"]`).join(',');
  return findAll(elementSelector);
}

export default {
  run: findByName,
  key: 'name-attribute',
  errorText(type, labelText) {
    return `Control ${labelText} found through input name attribute`;
  },
};
