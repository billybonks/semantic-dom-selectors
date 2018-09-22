import config from './config';
import mergePresets from './config/merge-presets';

export default {
  configure(configuration) {
    const normalizedConfig = this._merge(configuration);
    config.reset();
    normalizedConfig.finders.forEach((finder) => {
      config.registerFinder(finder);
    });
    normalizedConfig.actors.forEach((actor) => {
      config.registerActor(actor);
    });
    config.setErrorLevels(normalizedConfig.rules);
  },

  _merge(config) {
    return mergePresets(config);
  },
};
