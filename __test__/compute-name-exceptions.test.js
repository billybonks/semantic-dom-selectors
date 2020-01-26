import { findControl, findObject, findButton } from '../src/find-functions';
import configure from '../src/configure';
import config from '../src/config';

describe('compute name exceptions', () => {
  // implements test descrbied here https://www.w3.org/TR/html-aapi/#accessible-name-and-description-calculation
  beforeEach(() => {
    configure({ preset: 'default', rules: { 'invalid-label-for': 0 } });
  });

  afterEach(() => {
    document.body.innerHTML = '';
    config.reset();
  });

  // no way to know if it used label first
  test('6.1 should use label before title', () => {
    document.body.innerHTML = `
      <label for="control">real label</label>
      <input id="control" title="this is my input" type="text" name="text" />
    `;
    const foundInput = findControl('real label');
    expect(foundInput).toEqual(document.getElementById('control'));
  });


  describe('6.2 button input should behave like buttons', () => {
    test('it uses value', () => {
      document.body.innerHTML = `
        <input id="el" type="button" value="the world! dog!"/>
      `;
      const foundInput = findControl('the world! dog!');
      expect(foundInput).toEqual(document.getElementById('el'));
    });

    test('deafults submit if no content', () => {
      document.body.innerHTML = `
        <input id="el" type="submit"></input>
      `;
      const foundInput = findControl('submit');
      expect(foundInput).toEqual(document.getElementById('el'));
    });

    test('deafults reset if no content', () => {
      document.body.innerHTML = `
        <input id="el" type="reset"></input>
      `;
      const foundInput = findControl('reset');
      expect(foundInput).toEqual(document.getElementById('el'));
    });
  });

  test('6.3 input images can use alt', () => {
    document.body.innerHTML = `
      <input id="control" alt="this is my input" type="image" />
    `;
    const foundInput = findControl('this is my input');
    expect(foundInput).toEqual(document.getElementById('control'));
  });

  // no way to know if it used subtree first first
  test('6.4 should use subtree before title', () => {
    document.body.innerHTML = `
      <button id="buttable" title="this is my input" >
        subtree datas
      </button>
    `;
    const foundInput = findButton('subtree datas');
    expect(foundInput).toEqual(document.getElementById('buttable'));
  });


  // need to check difference of 6.1
  test.skip('6.5 ...', () => {
    document.body.innerHTML = `
      <button id="buttable" title="this is my input" >
        subtree datas
      </button>
    `;
    const foundInput = findButton('subtree datas');
    expect(foundInput).toEqual(document.getElementById('buttable'));
  });


  // also dunno if uses title first in theory
  describe('6.6 summary', () => {
    test('it uses subtree', () => {
      document.body.innerHTML = `
        <summary id="summms" title="this is my input" >
          this is a great big summary
        </summary>
      `;
      const element = findObject('summary', 'this is a great big summary', 'summary');
      expect(element).toEqual(document.getElementById('summms'));
    });

    test('defaults to details', () => {
      document.body.innerHTML = `
        <summary id="summms">
        </summary>
      `;
      const element = findObject('summary', 'details', 'summary');
      expect(element).toEqual(document.getElementById('summms'));
    });
  });


  describe('6.7 figure', () => {
    // also dunno if uses title first in theory
    test('uses figcaption', () => {
      document.body.innerHTML = `
        <figure id="fig" title="this is my input" >
          <figcaption>i am caption</figcaption>
        </figure>
      `;
      const element = findObject('figure', 'i am caption', 'figure');
      expect(element).toEqual(document.getElementById('fig'));
    });

    // also dunno if uses title first in theory
    test('does not use content', () => {
      document.body.innerHTML = `
        <figure id="fig" title="this is my input" >
          i am caption
        </figure>
      `;
      const element = findObject('figure', 'i am caption', 'figure');
      expect(element).toEqual(null);
    });
  });

  // also dunno if uses title first in theory
  test('6.8 iamge uses alt', () => {
    document.body.innerHTML = `
      <img id="control" alt="this is imag" type="image" />
    `;
    const element = findObject('img', 'this is imag', 'image');
    expect(element).toEqual(document.getElementById('control'));
  });


  // order no idea amg
  describe('6.9 table', () => {
    test('uses caption', () => {
      document.body.innerHTML = `
        <table id='el'>
          <caption>awesome table</caption>
        </table>
      `;
      const element = findObject('table', 'awesome table', 'table');
      expect(element).toEqual(document.getElementById('el'));
    });

    test('uses summary', () => {
      document.body.innerHTML = `
        <table id='el' summary="some info about this table">
          <caption>awesome table</caption>
        </table>
      `;
      const element = findObject('table', 'some info about this table', 'table');
      expect(element).toEqual(document.getElementById('el'));
    });


    test('does not use inner text', () => {
      document.body.innerHTML = `
        <table id='el'>
          awesome table
        </table>
      `;
      const element = findObject('table', 'awesome table', 'table');
      expect(element).toEqual(null);
    });
  });

  // also dunno if uses title first in theory
  test('6.10 a supports summary', () => {
    document.body.innerHTML = `
      <a id="control" summary="this is a cool link highly recommend"/> />
    `;
    const element = findObject('a', 'this is a cool link highly recommend', 'a');
    expect(element).toEqual(document.getElementById('control'));
  });
});
