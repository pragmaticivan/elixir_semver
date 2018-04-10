import Version from '../index';

describe('Version', () => {
  describe('.parse', () => {
    test('valid semver', () => {
      expect(Version.parse('1.2.3')).toEqual({
        major: 1,
        minor: 2,
        patch: 3,
      });
    });

    test('ignored value on semver', () => {
      expect(Version.parse('1.4.5+ignore')).toEqual({
        major: 1,
        minor: 4,
        patch: 5,
      });
    });

    test('ignored value with sha and period on semver', () => {
      expect(Version.parse('0.0.1+sha.0702245')).toEqual({
        major: 0,
        minor: 0,
        patch: 1,
      });
    });

    test('invalid version', () => {
      expect(() => {
        Version.parse("foobar")
      }).toThrow();
      expect(() => {
        Version.parse("2")
      }).toThrow();
      expect(() => {
        Version.parse("2.3")
      }).toThrow();
      expect(() => {
        Version.parse("2.03.0")
      }).toThrow();
    });

    test('lexer', () => {
      expect(Version.parseRequirement("== != > >= < <= ~>")).toEqual(['==', '!=', '>', '>=', '<', '<=', '~>']);
      expect(Version.parseRequirement("2.3.0")).toEqual(['==', '2.3.0']);
      expect(Version.parseRequirement("!2.3.0")).toEqual(['!=', '2.3.0']);
      expect(Version.parseRequirement(">>=")).toEqual(['>', '>=']);
      expect(Version.parseRequirement(">2.4.0")).toEqual([ '>', '2.4.0' ]);
      expect(Version.parseRequirement("> 2.4.0")).toEqual([ '>', '2.4.0' ]);
      expect(Version.parseRequirement("    >     2.4.0")).toEqual([ '>', '2.4.0' ]);
    })
  });
});
