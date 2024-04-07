import { startWithUpperCaseLetter } from '../src/utils/string';

describe('startWithUpperCaseLetter', () => {
  it('capitalizes the first letter of a single word', () => {
    expect(startWithUpperCaseLetter('hello world')).toBe('Hello world');
  });

  it('handles multiple words correctly, capitalizing the first word and lowercasing the rest', () => {
    expect(startWithUpperCaseLetter('helloWorld')).toBe('Hello world');
    expect(startWithUpperCaseLetter('helloWorldAgain')).toBe(
      'Hello world again',
    );
  });

  it('returns an empty string when provided with an empty string', () => {
    expect(startWithUpperCaseLetter('')).toBe('');
  });

  it('maintains the capitalization of initialisms', () => {
    expect(startWithUpperCaseLetter('idNumber')).toBe('Id number');
  });
});
