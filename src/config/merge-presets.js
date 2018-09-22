import defaultPreset from '../presets/default';
import ariaPreset from '../presets/aria-compliant';

function uniq(array) {
  return Array.from(new Set(array));
}

const presets = {
  default: defaultPreset,
  'aria-compliant': ariaPreset,
};

export default function merge(config) {
  const empty = {
    finders: [],
    actors: [],
    rules: {},
  };

  let preset;
  if (config.preset) {
    preset = presets[config.preset];
    if (!preset) {
      throw new Error('unkown preset set for semantic-dom-selectors configuration');
    }
  } else {
    preset = {};
  }
  const normalizedPreset = Object.assign({}, empty, preset);
  const normalizedConfig = Object.assign({}, empty, config);
  const finders = uniq(normalizedPreset.finders.concat(normalizedConfig.finders));
  const actors = uniq(normalizedPreset.actors.concat(normalizedConfig.actors));
  const rules = Object.assign({}, normalizedPreset.rules, normalizedConfig.rules);
  return {
    finders,
    actors,
    rules,
  };
}
