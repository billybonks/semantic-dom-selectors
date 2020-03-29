import config from './config';
import mergePresets from './config/merge-presets';

/**
 * Configures the library to behave in a certain way
 *
 *
 * @param {object} configuration
 *
 * @example
 * let config = {
 *  preset: 'aria-compliant',
 *  rules: {
 *    'something-else': 1,
 *    'invalid-label-for': 2,
 *  },
 *  finders: [
 *    { key: 'asd', run() {} },
 *    { key: 'qqq-www', run() {} },
 *  ],
 *  actors: [
 *    { key: 'some-act', type: 'select', run() {} },
 *    { key: 'some-input-act', type: 'input', run() {} },
 *  ],
 * };
 *
 * configure(config)
 */
export default function (configuration) {
  const normalizedConfig = mergePresets(configuration);
  config.reset();
  normalizedConfig.finders.forEach((finder) => {
    config.registerFinder(finder);
  });
  normalizedConfig.actors.forEach((actor) => {
    config.registerActor(actor);
  });
  config.setErrorLevels(normalizedConfig.rules);
  if (configuration.rootElementSelector) {
    config.rootElementSelector = configuration.rootElementSelector;
  }
}
