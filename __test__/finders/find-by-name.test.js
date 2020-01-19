import findByName from '../../src/finders/find-by-name';
import { textQuery } from '../../src/definitions/selectors';

describe('Find by name', () => {
  beforeEach(() => {
    const markup = `
      <input id="ni" name="hello" />
      <div id="hen" name="hello"><div>
      <span id="bu" name="hello"><span>
      <input id="hao" name="world" />
      <input id="regexz" name="herloo /^[$A-Za-z_][0-9A-Za-z_$-:]*$/<div>i did bad thing </div>" />
    `;
    document.body.innerHTML = markup;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('finds the right input', () => {
    const expectedInput = document.querySelector('#hao');
    const foundInput = findByName.run(textQuery, 'world');
    expect(foundInput.length).toEqual(1);
    expect(foundInput[0]).toEqual(expectedInput);
  });

  it('finds an input that is regexp', () => {
    const expectedInput = document.querySelector('#regexz');
    const foundInput = findByName.run(textQuery, /^herloo/);
    expect(foundInput.length).toEqual(1);
    expect(foundInput[0]).toEqual(expectedInput);
  });
});
