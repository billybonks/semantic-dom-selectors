import config from './config';
import notify from './notify';

import { findButton, findButtons, findControl, findControls, findObject, findObjects} from './find-functions';
import { buttonQuery, textQuery, toggleQuery, selectQuery, formControlQuery } from './definitions/selectors';


import findByAria from './finders/find-by-aria/index';
import findByLabel from './finders/find-by-label';
import findByName from './finders/find-by-name';

let baseFinder = {
  key:'ariaNotFound',
  run: findByAria
}

config.defaultFinders = [baseFinder,findByLabel,findByName];

export {
  findButton,
  findButtons,
  findControl,
  findControls,
  findObject,
  findObjects,
  config,
  notify,
  findByLabel,
  findByName,
  buttonQuery,
  textQuery,
  toggleQuery,
  selectQuery,
  formControlQuery
}
