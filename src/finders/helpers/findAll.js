import config from '../../config';

export default function(selector, { within = config.rootElement } = {}) {
  return [...within.querySelectorAll(selector)];
}
