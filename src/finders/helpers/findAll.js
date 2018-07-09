import config from '../../config';

export default function(selector) {
  return [...config.rootElement.querySelectorAll(selector)];
}
