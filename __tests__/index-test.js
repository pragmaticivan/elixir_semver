import Version from '../index';

describe('Version', () => {
  describe('.parse', () => {
    test('valid semver', () => {
      expect(Version.parse("1.2.3")).toEqual({
        major: 1,
        minor: 2,
        patch: 3,
      });
    });

    test('ignored value on semver', () => {
      expect(Version.parse("1.4.5+ignore")).toEqual({
        major: 1,
        minor: 4,
        patch: 5,
      });
    });

    test('ignored value with sha and period on semver', () => {
      expect(Version.parse("0.0.1+sha.0702245")).toEqual({
        major: 0,
        minor: 0,
        patch: 1,
      });
    });
  });
});
