import config from '../src/config';
import { _merge } from '../src/configure';
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
          result = _merge(cusatomConfig);
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
    describe('#_merge', () => {
      beforeEach(() => {
        result = _merge(cusatomConfig);
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
