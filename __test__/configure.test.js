import config from '../src/config';
import configure from '../src/configure';
import presetDefault from '../src/presets/default';
import mergePresets from '../src/config/merge-presets';

describe('Configuration Module', () => {
  afterEach(() => {
    config.reset();
  });

  describe('Using presets', () => {
    let selectedPreset;
    let customConfig;
    let result;
    beforeEach(() => {
      selectedPreset = 'default';
    });

    describe('With extra configurations', () => {
      beforeEach(() => {
        customConfig = {
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
      describe('#mergePresets', () => {
        beforeEach(() => {
          result = mergePresets(customConfig);
        });

        test('merges actors appropriately', () => {
          expect(result.actors).toEqual([...customConfig.actors]);
        });
        test('merges finders appropriately', () => {
          expect(result.finders).toEqual([...presetDefault.finders, ...customConfig.finders]);
        });
        test('merges rules appropriately', () => {
          expect(result.rules).toEqual({
            'something-else': 1,
            'invalid-label-for': 2,
            'not-aria-compliant': 'warn',
            'name-attribute': 'warn',
          });
        });
      });
    });
  });
  describe('Without using presets', () => {
    let customConfig;
    let result;
    beforeEach(() => {
      customConfig = {
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
      const orignalRegisterActor = config.registerActor;
      const orignalRegisterFinder = config.registerFinder;
      const orignalSetErrorLevels = config.setErrorLevels;

      beforeEach(() => {
        config.registerActor = jest.fn();
        config.registerFinder = jest.fn();
        config.setErrorLevels = jest.fn();
        configure(customConfig);
      });

      afterEach(() => {
        config.registerActor = orignalRegisterActor;
        config.registerFinder = orignalRegisterFinder;
        config.setErrorLevels = orignalSetErrorLevels;
      });

      it('Calls registerActor with all actors', () => {
        expect(config.registerActor).toHaveBeenNthCalledWith(1, customConfig.actors[0]);
        expect(config.registerActor).toHaveBeenNthCalledWith(2, customConfig.actors[1]);
        expect(config.registerActor).toHaveBeenCalledTimes(2);
      });

      it('Calls registerFinder with all finders', () => {
        expect(config.registerFinder).toHaveBeenNthCalledWith(1, customConfig.finders[0]);
        expect(config.registerFinder).toHaveBeenNthCalledWith(2, customConfig.finders[1]);
        expect(config.registerFinder).toHaveBeenCalledTimes(2);
      });

      it('sets ErrorLevels', () => {
        expect(config.setErrorLevels).toHaveBeenCalledWith(customConfig.rules);
        expect(config.setErrorLevels).toHaveBeenCalledTimes(1);
      });
    });

    describe('#_merge', () => {
      beforeEach(() => {
        result = mergePresets(customConfig);
      });
      test('merges actors as is', () => {
        expect(result.actors).toEqual([...customConfig.actors]);
      });
      test('merges finders as is', () => {
        expect(result.finders).toEqual([...customConfig.finders]);
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
