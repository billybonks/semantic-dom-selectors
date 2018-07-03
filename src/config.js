class Config {
  constructor(){
    this.registeredFinders = [];
    this.defaultFinders = [];
    this.errorLevelOptions = {};
    this.customActors = {
      select: [],
      text: [],
      toggle: [],
      button: [],
    }
  }

  trim(text) {
    return text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  }

  registerFinder(finder){
    this.errorLevelOptions[finder.key] = 1;
    this.registeredFinders.push(finder)
  }

  registerActor({type, run}){
    this.customActors[type].push(run);
  }

  setErrorLevels(config) {
    this.errorLevelOptions = config
  }

  get actors(){
    return this.customActors;
  }

  get finders(){
    return this.registeredFinders.concat(this.defaultFinders);
  }

  get rules(){
    let rules = this.finders.reduce((acc,finder) => {
      let config = this.errorLevelOptions[finder.key];
      if(isNaN(config)){
        acc[finder.key] =  1;
      } else {
        acc[finder.key] = config;
      }
      return acc;
    },{});
    return rules;
  }
}

export default new Config();
