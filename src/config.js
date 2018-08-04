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
    this._rootElement = document.documentElement;
  }

  trim(text) {
    return text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  }


  get rootElement() {
    return this._rootElement;
  }

  set rootElement(element) {
    if (element instanceof Element) {
      this._rootElement = element;
    } else {
      throw new Error(`rootElement Error: You tried to set root element to ${element}`);
    }
  }

  registerFinder(finder) {
    if (!this.errorLevelOptions[finder.key]) {
      this.errorLevelOptions[finder.key] = 1;
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

  setErrorLevels(config) {
    this.errorLevelOptions = config;
  }

  get actors() {
    return this.customActors;
  }

  get finders() {
    return this.registeredFinders.concat(this.defaultFinders);
  }

  get rules() {
    const rules = this.finders.reduce((acc, finder) => {
      const config = this.errorLevelOptions[finder.key];
      if (isNaN(config)) {
        acc[finder.key] = 1;
      } else {
        acc[finder.key] = config;
      }
      return acc;
    }, {});
    return rules;
  }
}

export default new Config();
