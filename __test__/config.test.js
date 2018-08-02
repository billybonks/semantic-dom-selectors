import config  from '../src/config';

describe('Configuration Module', () => {
  afterEach(() => {
    config.reset()
  })
  describe('Finder registraition', () => {

    describe('Registering a finder', () => {
      it('it adds it to registerdFinderArray', () => {
        config.registerFinder({
          key: 'custom-finder'
        })
        expect(config.registeredFinders.length).toEqual(1);
      })

      describe('sets a rule', () => {
        describe('no rule previously set', () => {
          it('adds a default rule with level of 1', () => {
            config.registerFinder({
              key: 'custom-finder'
            })
            expect(config.rules['custom-finder']).toEqual(1);
          })
        })

        describe('rule previously set', () => {
          it('does not override setting', () => {
            config.errorLevelOptions = {
              'custom-finder': 2,
            }
            config.registerFinder({
              key: 'custom-finder'
            })
            expect(config.rules['custom-finder']).toEqual(2);
          })
        })
      })
    })
  })

  describe('Actor registraition', () => {
    describe('if type is specified', () => {
      it('adds it to actor array', () => {
        config.registerActor({
          type:'select',
          run: () => {}
        });
        expect(config.customActors.select.length).toEqual(1);
      });

      test('#getActors returns actors hash', () => {
        config.registerActor({
          type:'select',
          run: () => {}
        });
        expect(config.actors).toEqual(config.customActors);
      });
    });

    describe('if type is not specified', () => {
      it('adds it to actor array', () => {
        expect(() => {
          config.registerActor({
            run: () => {}
          });
        }).toThrowErrorMatchingSnapshot();
      });
    });


    describe('if unkown type is specified', () => {
      it('adds it to actor array', () => {
        expect(() => {
          config.registerActor({
            type:'nonsense',
            run: () => {}
          });
        }).toThrowErrorMatchingSnapshot();
      });
    });
  });

  describe('Rule customisation', () => {
    test('you can whole sale set error levels', () => {
      config.setErrorLevels({
        'custom-finder': 2,
      });
      expect(config.errorLevelOptions).toEqual({
        'custom-finder': 2,
      })
    })
  })
})
