import findByName from '../../src/finders/find-by-name';
import { textQuery } from '../../src/definitions/selectors';

describe('Find by name', () => {
  beforeEach(() => {
    const markup = `
      <input id="ni" name="hello" />
      <div id="hen" name="hello"><div>
      <span id="bu" name="hello"><span>
      <input id="hao" name="world" />
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
});
