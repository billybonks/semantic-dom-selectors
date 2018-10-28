import config from '../../src/config';
import configure from '../../src/configure';
import defaultPreset from '../../src/presets/default';

let customConfig;
describe('Configuration Integration test', () => {
  beforeEach(() => {
    customConfig = {
      preset: 'default',
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
        { key: 'some-input-act', type: 'text', run() {} },
      ],
    };
  });

  it('configures addon correctly', () => {
    configure(customConfig);
    expect(config.rules).toEqual({
      'not-aria-compliant': 1,
      'invalid-label-for': 2,
      'name-attribute': 1,
      asd: 1,
      'something-else': 1,
      'qqq-www': 1,
    });
    expect(config.finders).toEqual([...defaultPreset.finders, ...customConfig.finders]);
    expect(config.actors).toEqual(
      {
        button: [],
        select: [customConfig.actors[0].run],
        text: [customConfig.actors[1].run],
        toggle: [],
      },
    );
  });
});
