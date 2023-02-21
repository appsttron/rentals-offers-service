import { validateApiKey } from './validate-api-key';

const callbackMock = jest.fn();

describe('validateApiKey()', () => {
  it('If api-key is undefined throw Forbidden Exception', () => {
    try {
      validateApiKey(undefined, 'api-key', callbackMock);
    } catch (e) {
      expect(e.message).toBe('Forbidden');
    }
  });

  it('If api-key is null throw Forbidden Exception', () => {
    try {
      validateApiKey(null, 'api-key', callbackMock);
    } catch (e) {
      expect(e.message).toBe('Forbidden');
    }
  });

  it('If headers contain wrong API_KEY throw Forbidden Exception', () => {
    try {
      validateApiKey('wrong', 'api-key', callbackMock);
    } catch (e) {
      expect(e.message).toBe('Forbidden');
    }
  });

  it('If headers contain right API_KEY call callback', () => {
    validateApiKey('api-key', 'api-key', callbackMock);
    expect(callbackMock).toBeCalled();
  });
});
