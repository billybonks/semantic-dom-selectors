import findAll from './helpers/findAll';

function findByName(selector, text) {
  const elements = selector.split(',');
  return findAll(`${elements.join(`[name="${text}"],`)}[name="${text}"]`);
}

export default {
  run: findByName,
  key: 'name-attribute',
  errorText(type, labelText) {
    return `Control ${labelText} found through input name attribute`;
  },
};
