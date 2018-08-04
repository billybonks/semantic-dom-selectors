import config from '../src/config';
import configure from '../src/configure';
import presetDefault from '../src/presets/default';

describe('Configuration Module', () => {
  afterEach(() => {
    config.reset();
  });

  describe('Using presets', () => {
    let selectedPreset;
    let cusatomConfig;
    let result;
    beforeEach(() => {
      selectedPreset = 'default';
    });

    describe('With extra configurations', () => {
      beforeEach(() => {
        cusatomConfig = {
          preset: selectedPreset,
          rules: {
            'something-else': 1,
            'invalid-label-for': 2,
          },
          finders: [
            { key: 'asd', run() {} },
            { key: 'qqq-www', run() {} },
          ],
          actors: [
            { key: 'some-act', type: 'select', run() {} },
            { key: 'some-input-act', type: 'input', run() {} },
          ],
        };
      });
      describe('#_merge', () => {
        beforeEach(() => {
          result = configure._merge(cusatomConfig);
        });

        test('merges actors appropriately', () => {
          expect(result.actors).toEqual([...cusatomConfig.actors]);
        });
        test('merges finders appropriately', () => {
          expect(result.finders).toEqual([...presetDefault.finders, ...cusatomConfig.finders]);
        });
        test('merges rules appropriately', () => {
          expect(result.rules).toEqual({
            'something-else': 1,
            'invalid-label-for': 2,
            'aria-compliant': 1,
            'name-attribute': 1,
          });
        });
      });
    });
  });
  describe('Without using presets', () => {
    let cusatomConfig;
    let result;
    beforeEach(() => {
      cusatomConfig = {
        rules: {
          'something-else': 1,
          'invalid-label-for': 2,
        },
        finders: [
          { key: 'asd', run() {} },
          { key: 'qqq-www', run() {} },
        ],
        actors: [
          { key: 'some-act', type: 'select', run() {} },
          { key: 'some-input-act', type: 'input', run() {} },
        ],
      };
    });

    describe('#configure', () => {
      const originalMerge = configure._merge;
      const orignalRegisterActor = config.registerActor;
      const orignalRegisterFinder = config.registerFinder;
      const orignalSetErrorLevels = config.setErrorLevels;

      beforeEach(() => {
        configure._merge = jest.fn().mockReturnValue(cusatomConfig);
        config.registerActor = jest.fn();
        config.registerFinder = jest.fn();
        config.setErrorLevels = jest.fn();
        configure.configure(cusatomConfig);
      });

      afterEach(() => {
        configure._merge = originalMerge;
        config.registerActor = orignalRegisterActor;
        config.registerFinder = orignalRegisterFinder;
        config.setErrorLevels = orignalSetErrorLevels;
      });

      it('merges the config', () => {
        expect(configure._merge).toHaveBeenCalledTimes(1);
      });

      it('Calls registerActor with all actors', () => {
        expect(config.registerActor).toHaveBeenNthCalledWith(1, cusatomConfig.actors[0]);
        expect(config.registerActor).toHaveBeenNthCalledWith(2, cusatomConfig.actors[1]);
        expect(config.registerActor).toHaveBeenCalledTimes(2);
      });

      it('Calls registerFinder with all finders', () => {
        expect(config.registerFinder).toHaveBeenNthCalledWith(1, cusatomConfig.finders[0]);
        expect(config.registerFinder).toHaveBeenNthCalledWith(2, cusatomConfig.finders[1]);
        expect(config.registerFinder).toHaveBeenCalledTimes(2);
      });

      it('sets ErrorLevels', () => {
        expect(config.setErrorLevels).toHaveBeenCalledWith(cusatomConfig.rules);
        expect(config.setErrorLevels).toHaveBeenCalledTimes(1);
      });
    });

    describe('#_merge', () => {
      beforeEach(() => {
        result = configure._merge(cusatomConfig);
      });
      test('merges actors as is', () => {
        expect(result.actors).toEqual([...cusatomConfig.actors]);
      });
      test('merges finders as is', () => {
        expect(result.finders).toEqual([...cusatomConfig.finders]);
      });
      test('merges rules as is', () => {
        expect(result.rules).toEqual({
          'something-else': 1,
          'invalid-label-for': 2,
        });
      });
    });
  });
});
