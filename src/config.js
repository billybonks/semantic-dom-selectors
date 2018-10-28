const deprecatedMappings = {
  ariaNotFound: 'not-aria-compliant',
  invalidFor: 'invalid-label-for',
  perceivedByName: 'name-attribute',
};

class Config {
  constructor() {
    this.reset();
  }

  reset() {
    this.registeredFinders = [];
    this.defaultFinders = [];
    this.errorLevelOptions = {};
    this.customActors = {
      select: [],
      text: [],
      toggle: [],
      button: [],
    };
    this._rootElementSelector = null;
  }

  trim(text) {
    return text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  }

  set rootElementSelector(selector) {
    if (typeof selector === 'string' || selector instanceof String) {
      try {
        document.querySelector(selector);
      } catch (e) {
        throw new Error(`You Tried to set rootElementSelector to ${selector}, but the selector is invalid`);
      }
      this._rootElementSelector = selector;
    } else {
      throw new Error(`You Tried to set rootElementSelector to ${selector}, but it was not a string`);
    }
  }

  get rootElementSelector() {
    return this._rootElementSelector;
  }

  get rootElement() {
    if (this._rootElement) {
      return this._rootElement;
    }
    if (this.rootElementSelector) {
      const element = document.querySelector(this.rootElementSelector);
      if (element) {
        return element;
      }
    }
    return document.documentElement;
  }

  set rootElement(element) {
    if (element instanceof Element || element == null) {
      this._rootElement = element;
    } else {
      throw new Error(`rootElement Error: You tried to set root element to ${element}`);
    }
  }

  registerFinder(finder) {
    if (!this.errorLevelOptions[finder.key]) {
      this.setErrorLevels({
        [finder.key]: 1,
      });
    }
    this.registeredFinders.push(finder);
  }

  registerActor({ type, run }) {
    if (!type) {
      throw new Error('You must specify the type of attribute of actor object');
    }
    if (!Object.keys(this.customActors).includes(type)) {
      throw new Error(`Unkown actor type ${type}`);
    }
    this.customActors[type].push(run);
  }

  remapDeprecatedRules(rules) {
    return Object.keys(rules).reduce((acc, key) => {
      const remappedDeprecation = deprecatedMappings[key];
      if (remappedDeprecation) {
        console.warn(`DEPRECATION: rule ${key} name is deprecated please use ${remappedDeprecation}`);
        acc[remappedDeprecation] = rules[key];
      } else {
        acc[key] = rules[key];
      }
      return acc;
    }, {});
  }

  setErrorLevels(config) {
    this.errorLevelOptions = Object.assign(
      this.errorLevelOptions,
      this.remapDeprecatedRules(config),
    );
  }

  get actors() {
    return this.customActors;
  }

  get finders() {
    return this.registeredFinders.concat(this.defaultFinders);
  }

  get rules() {
    return this.errorLevelOptions;
  }
}

export default new Config();
