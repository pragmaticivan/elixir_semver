// @flow
import Parser from './parser';

export default class Version {
  static parse(version: string): Object {
    return new Parser().parseVersion(version);
  }

  static parseRequirement(source: string): Array<string> {
    return new Parser().parseRequirement(source);
  }
};
