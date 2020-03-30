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

/**
 * Finds an element of a provided type with the provided label, if multiple elements are found,
 * throws an error.
 *
 * @param {string} labelText
 *
 * @example
 * findControl('button','Click Me')
 */
export function findControl(labelText, type) {
  return _findControl(findObject, labelText, type);
}

/**
 * Finds multiple elements of a provided type with the provided label.
 *
 * @param {string} labelText
 *
 * @example
 * findControls('button','Click Me')
 */
export function findControls(labelText, type) {
  return _findControl(findObjects, labelText, type);
}

/**
 * Finds a button with the provided label, if multiple buttons are found, throws an error.
 *
 * @param {string} labelText
 *
 * @example
 * findButton('Click Me')
 */
export function findButton(labelText) {
  return findControl(labelText, 'button');
}

/**
 * Finds multiple buttons with the provided label.
 *
 * @param {string} labelText
 *
 * @example
 * findButtons('Click Me')
 */
export function findButtons(labelText) {
  return findControls(labelText, 'button');
}
