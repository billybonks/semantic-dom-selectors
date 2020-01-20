import {
  buttonQuery, textQuery, toggleQuery, selectQuery, formControlQuery,
} from './definitions/selectors';
import config from './config';
import notify from './notify';

const queryHash = {
  text: textQuery,
  toggle: toggleQuery,
  select: selectQuery,
  form: formControlQuery,
  button: buttonQuery,
};

export function findObjects(selector, labelText, type = 'object') {
  const finders = config.finders;

  for (let i = 0; i < finders.length; i += 1) {
    const finder = finders[i];
    const key = finder.key;
    const strategy = finder.run;

    const objects = strategy(selector, labelText);
    if (objects && objects.length > 0) {
      if (key !== 'not-aria-compliant') {
        notify(key, type, labelText, finder.errorText);
      }
      return objects;
    }
  }
  return null;
}

export function findObject(selector, labelText, type) {
  const objects = findObjects(selector, labelText, type);
  if (objects.length > 1) {
    notify('ambiguousLabel', type, labelText);
  }
  return objects[0];
}

const _findControl = function (method, labelText, type = 'form') {
  return method(queryHash[type], labelText, type);
};

export function findControl(labelText, type) {
  return _findControl(findObject, labelText, type);
}

export function findControls(labelText, type) {
  return _findControl(findObjects, labelText, type);
}

export function findButton(labelText) {
  return findControl(labelText, 'button');
}

export function findButtons(labelText) {
  return findControls(labelText, 'button');
}
