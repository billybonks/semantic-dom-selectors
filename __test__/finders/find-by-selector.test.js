import findBySelector from '../../src/finders/find-by-selector';

describe('Find by selector', () => {
  describe('when dom is semantic', () => {
    beforeEach(() => {
      const markup = `
        <div class="parent">
          <button id="ni" class="child" />
        </div>
      `;
      document.body.innerHTML = markup;
    });

    afterEach(() => {
      document.body.innerHTML = '';
    });

    it('finds the child button', () => {
      const expectedButton = document.querySelector('#ni');
      const foundButton = findBySelector.run('button', '.child');
      expect(foundButton.length).toEqual(1);
      expect(foundButton[0]).toEqual(expectedButton);
    });

    it('finds the child button via parent', () => {
      const expectedButton = document.querySelector('#ni');
      const foundButton = findBySelector.run('.parent', '> .child');
      expect(foundButton.length).toEqual(1);
      expect(foundButton[0]).toEqual(expectedButton);
    });
  });

  describe('when dom is not semantic', () => {
    beforeEach(() => {
      const markup = `
        <div class="parent">
          <span id="ni" class="child" />
        </div>
      `;
      document.body.innerHTML = markup;
    });

    afterEach(() => {
      document.body.innerHTML = '';
    });

    it('finds the child button', () => {
      try {
        findBySelector.run('button', '.child');
      } catch (e) {
        expect(e.message).toEqual('Element found with invalid role');
      }
    });
  });
});
