import config from './config';
import configure from './configure';
import notify from './notify';

import {
  findButton, findButtons, findControl, findControls, findObject, findObjects,
} from './find-functions';
import {
  buttonQuery, textQuery, toggleQuery, selectQuery, formControlQuery,
} from './definitions/selectors';
import * as types from './definitions/types';

import findByAria from './finders/find-by-aria/rule';
import findByLabel from './finders/find-by-label';
import findByName from './finders/find-by-name';

config.defaultFinders = [findByAria, findByLabel, findByName];

export default {
  findButton,
  findButtons,
  findControl,
  findControls,
  findObject,
  findObjects,
  configure,
  config,
  notify,
  findByLabel,
  findByName,
  findByAria,
  buttonQuery,
  textQuery,
  toggleQuery,
  selectQuery,
  formControlQuery,
  types,
};
