import findAll from './helpers/findAll';

export default {
  run: findByName,
  key: 'perceivedByName',
  errorText(type, labelText) {
    return `Control ${labelText} found through input name attribute`;
  },
};

function findByName(selector, text) {
  const elements = selector.split(',');
  return findAll(`${elements.join(`[name="${text}"],`)}[name="${text}"]`);
}
