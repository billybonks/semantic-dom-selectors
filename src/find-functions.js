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

export function findObjects(selector, labelText, type = 'object', index = 0) {
  const finders = config.finders;
  if (finders.length === index) {
    return;
  }
  const finder = finders[index];
  const key = finder.key;
  const strategy = finder.run;

  let objects = strategy(selector, labelText);
  if (!objects || objects.length === 0) {
    objects = findObjects(selector, labelText, type, index + 1);
    if (index === finders.length - 1) {
      return;
    }
  } else if (key !== 'not-aria-compliant') {
    notify(key, type, labelText, finder.errorText);
  }
  return objects || [];
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
  if (type === 'button') {
    return this.findButton(labelText);
  }
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
