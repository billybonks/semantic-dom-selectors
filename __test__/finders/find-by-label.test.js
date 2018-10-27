import findByLabel from '../../src/finders/find-by-label';
import { textQuery } from '../../src/definitions/selectors';

describe('Find by label', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Label exists', () => {
    afterEach(() => {
      document.body.innerHTML = '';
    });

    describe('with "for" attribute targetting input', () => {
      beforeEach(() => {
        const markup = `
          <label for="proper">Hello!</label>
          <label for="notproper">Another Hello!</label>
          <div id="proper">
            <input name="proper" value="happy" />
          </div>
          <input name="notproper" value="sad"/>
        `;
        document.body.innerHTML = markup;
      });

      it('finds the right input', () => {
        const expectedInput = document.querySelector('input[value="happy"]');
        const foundInput = findByLabel.run(textQuery, 'Hello!');
        expect(foundInput.length).toEqual(1);
        expect(foundInput[0]).toEqual(expectedInput);
      });
    });

    describe('with "for" attribute targetting div', () => {
      beforeEach(() => {
        const markup = `
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
        document.body.innerHTML = markup;
      });

      it('finds the right input', () => {
        const expectedInput = document.querySelector('#control');
        const foundInput = findByLabel.run(textQuery, 'Label of control');
        expect(foundInput.length).toEqual(1);
        expect(foundInput[0]).toEqual(expectedInput);
      });
    });

    describe('without "for" attribute', () => {
      beforeEach(() => {
        const markup = `
          <label>Hello!</label>
        `;
        document.body.innerHTML = markup;
      });

      it('throws error', async () => {
        expect(() => {
          findByLabel.run(textQuery, 'Hello!');
        }).toThrowErrorMatchingSnapshot();
      });
    });
  });

  describe('Label does not exist', () => {
    beforeEach(() => {
      const markup = `
        <div for="trickery">Hello!</div>
        <input name="trickery"/>
      `;
      document.body.innerHTML = markup;
    });

    it('returns null', () => {
      expect(findByLabel.run(textQuery, 'Hello!')).toEqual(null);
    });
  });
});
