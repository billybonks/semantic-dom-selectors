import config from './config';
import mergePresets from './config/merge-presets';

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
  if (config.rootElementSelector) {
    config.rootElementSelector = configuration.rootElementSelector;
  }
}
