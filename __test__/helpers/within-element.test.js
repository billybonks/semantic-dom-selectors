import { findControl } from '../../src/find-functions';
import withinElement from '../../src/helpers/within-element';
import configure from '../../src/configure';

describe('within-element', () => {
  beforeEach(() => {
    /*
      TODO:invalid-for-relationship-bug
      currently throwing error Control Label of control found through invalid label for relationship
      when it is valid, the bug is in the way notifier works
    */
    configure({ preset: 'default', rules: { 'invalid-label-for': 0 } });
    document.body.innerHTML = `
      <div id="section-one">
        <label for="control">this is my input</label>
        <input id="control" type="text" name="text" />
      </div>
      <div id="section-two">
        <label for="control">this is my input</label>
        <input id="control" type="text" name="text" />
      </div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('if mutliple elements scopes to within section', () => {
    withinElement(document.querySelector('#section-one'), () => {
      const foundInput = findControl('this is my input');
      expect(foundInput).toEqual(document.querySelector('input[id="control"]'));
    });
  });

  test('if no within throws error', () => {
    expect(() => {
      findControl('this is my input');
    }).toThrowErrorMatchingSnapshot();
  });
});
