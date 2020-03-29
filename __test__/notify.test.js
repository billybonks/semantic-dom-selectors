import notify from '../src/notify';
import config from '../src/config';

function setALevel(rule, level) {
  config.registerFinder({
    key: rule,
  });
  config.errorLevelOptions = {
    [rule]: level,
  };
}

function resetConfig() {
  config.errorLevelOptions = {};
  config.registeredFinders = [];
}

describe('Notification module', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn');
  });

  afterEach(() => {
    jest.restoreAllMocks();
    resetConfig();
  });

  describe('Defaults', () => {
    test('throws error by default', () => {
      expect(notify).toThrowErrorMatchingSnapshot();
    });

    test('Uses term element by default', () => {
      setALevel('test-rule', 1);
      notify('test-rule');
      expect(console.warn).toHaveBeenCalledWith("Custom rule test-rule found Element labelled 'undefined'");
    });
  });

  describe('Customisng the message', () => {
    beforeEach(() => {
      setALevel('test-rule', 1);
    });

    describe('Specifining type', () => {
      test('Type is uppercased and control is appended', () => {
        notify('test-rule', 'button');
        expect(console.warn).toHaveBeenCalledWith("Custom rule test-rule found Button Control labelled 'undefined'");
      });
    });

    describe('generateMessage', () => {
      test('it uses return of function instead', () => {
        notify('test-rule', 'button', 'blank', () => 'troll');
        expect(console.warn).toHaveBeenCalledWith('troll');
      });
    });

    describe('labelText', () => {
      test('it includes labelText in message as is', () => {
        notify('test-rule', 'button', 'save');
        expect(console.warn).toHaveBeenCalledWith("Custom rule test-rule found Button Control labelled 'save'");
      });
    });
  });

  describe('Notification levels', () => {
    describe('level is 0', () => {
      it('throws an error', () => {
        setALevel('test-rule', 0);
        expect(() => {
          notify('test-rule');
        }).toThrow();
      });
    });

    describe('level is 1', () => {
      it('logs to console.warn', () => {
        setALevel('test-rule', 1);
        notify('test-rule');
        expect(console.warn).toHaveBeenCalled();
      });
    });

    describe('level is 2', () => {
      it('does nothing', () => {
        setALevel('test-rule', 2);
        expect(console.warn).not.toHaveBeenCalled();
      });
    });
  });
});
