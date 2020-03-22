import { findControl, findObject } from '../src/find-functions';
import configure from '../src/configure';
import config from '../src/config';

describe('Sanity Checks', () => {
  beforeEach(() => {
    configure({ preset: 'default', rules: { 'invalid-label-for': 0 } });
  });

  afterEach(() => {
    document.body.innerHTML = '';
    config.reset();
  });
  // discussing at https://github.com/xi/aria-api/issues/4
  test.skip('should not find alt on non altable elements', () => {
    document.body.innerHTML = `
      <input id="control" alt="this is my input" type="text" name="text" />
    `;
    const foundInput = findControl('this is my input');
    expect(foundInput).toEqual(null);
  });


  test('should not find summary on non random elements', () => {
    document.body.innerHTML = `
      <input id="control" summary="this is my input" type="text" name="text" />
    `;
    const foundInput = findControl('this is my input');
    expect(foundInput).toEqual(null);
  });

  test('should not find placeholder on placeholdable elements', () => {
    document.body.innerHTML = `
      <img id="control" placeholder="this is my input"/>
    `;
    const foundInput = findObject('img', 'this is my input', 'image');
    expect(foundInput).toEqual(null);
  });
});
