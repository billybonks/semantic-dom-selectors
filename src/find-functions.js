import { buttonQuery, textQuery, toggleQuery, selectQuery, formControlQuery} from './definitions/selectors';
import config from './config';
import notify from './notify';

let queryHash = {
  text: textQuery,
  toggle: toggleQuery,
  select: selectQuery,
  form: formControlQuery,
  button: buttonQuery,
}


let _findControl = function (method, labelText, { type = 'form', within } = {}){
  return method(queryHash[type], labelText, { type, within })
}

export function findButton(labelText, { within } = {}){
  return findControl(labelText, { type: 'button', within });
}

export function findButtons(labelText, { within } = {}){
  return findControls(labelText, { type: 'button', within });
}

export function findControl(labelText, { type, within } = {}) {
  return _findControl(findObject, labelText, { type, within })
}

export function findControls(labelText, { type, within } = {}) {
  return _findControl(findObjects, labelText, { type, within })
}

export function findObject(selector, labelText, { type, within } = {}) {
  let objects = findObjects(selector, labelText, { type, within })
  if(objects.length > 1){
    notify('ambiguousLabel', type, labelText);
  }
  return objects[0];
}

export function findObjects(selector, labelText, { type='object', within, index = 0 } = {}) {
  let finders = config.finders;
  if(finders.length === index) {
    return
  }
  let finder = finders[index]
  let key = finder.key
  let strategy = finder.run

  let objects = strategy(selector, labelText, { within })
  if(!objects || objects.length == 0){
    objects = findObjects(selector, labelText, { type, within, index: index + 1 })
    if(index == finders.length-1){
      return
    }
  } else if (key !== 'ariaNotFound') {
    notify(key, type, labelText, finder.errorText);
  }
  return objects || [];
}
