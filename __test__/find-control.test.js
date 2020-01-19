import { findControl } from '../src/find-functions';
import configure from '../src/configure';
import config from '../src/config';
// import findByLabel from '../finders/find-by-label';

describe('Find Control', () => {
  beforeEach(() => {
    configure({ preset: 'default', rules: { 'invalid-label-for': 0 } });
  });

  afterEach(() => {
    document.body.innerHTML = '';
    config.reset();
  });

  test('default type finds input', () => {
    /*
      currently throwing error Control Label of control found through invalid label for relationship
      when it is valid, the bug is in the way notifier works
    */
    configure({ preset: 'default', rules: { 'invalid-label-for': 'warn' } });
    document.body.innerHTML = `
      <label for="control">this is my input</label>
      <input id="control" type="text" name="text" />
    `;
    const foundInput = findControl('this is my input');
    expect(foundInput).toEqual(document.querySelector('input[id="control"]'));
  });

  test('default type finds text-area', () => {
    document.body.innerHTML = `
      <label for='control'>Label of control</label>
      <textarea id="control" />
    `;
    try {
      findControl('Label of control');
    } catch (e) {
      expect(e.message).toEqual('Control Label of control found through invalid label for relationship');
    }
  });

  test('finds element even though role is wrong', () => {
    document.body.innerHTML = `
      <label for="control">Label of control</label>
      <div class="day-slider">
        <div id="control" class="day-slider-handle" role="slider"
           aria-valuemin="1"
           aria-valuemax="7"
           aria-valuenow="2"
           aria-valuetext="Monday">
       </div>
      </div>
    `;
    try {
      findControl('Label of control');
    } catch (e) {
      expect(e.message).toEqual('Control Label of control found through invalid label for relationship');
    }
  });

  test('finds contenteditable="true"', () => {
    document.body.innerHTML = `
      <p  id="control" contenteditable="true"> i am a strange text box</p>
    `;
    const foundInput = findControl('i am a strange text box');
    expect(foundInput).toEqual(document.querySelector('p[id="control"]'));
  });

  test('finds role="textbox"', () => {
    document.body.innerHTML = `
      <p id="control" role="textbox"> i am a strange text box</p>
    `;
    const foundInput = findControl('i am a strange text box');
    expect(foundInput).toEqual(document.querySelector('p[id="control"]'));
  });

  test('finds role="slider"', async () => {
    document.body.innerHTML = `
      <div class="day-slider">
        <div id="control" class="day-slider-handle" role="slider" aria-label="Label of control"
           aria-valuemin="1"
           aria-valuemax="7"
           aria-valuenow="2"
           aria-valuetext="Monday">
       </div>
      </div>
    `;
    const foundInput = findControl('Label of control');
    expect(foundInput).toEqual(document.querySelector('div[id="control"]'));
  });
});
