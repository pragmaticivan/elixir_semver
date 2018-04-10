import { throws } from "assert";
import {head, tail, copy} from './util';

// @flow

export default class Parser {
  major: number;
  minor: number;
  patch: ?number;

  static OPERATORS;

  constructor() {
  }

  parseVersion(versionValue: string, approximate: ?boolean) {
    const [versionWithPre, build] = versionValue.split('+', 2);
    const [version, pre]  = versionWithPre.split('-', 2);
    const [major, minor, patch, next] = version.split('.');
    this.major = this._requireDigits(major);
    this.minor = this._requireDigits(minor);
    this.patch = this._maybePatch(patch, approximate);
    return {major: this.major, minor: this.minor, patch: this.patch};
  }

  parseRequirement(source: string): any {
    return this._lexer(source);
  }

  _lexer(pChars: string, pAcc: Array<string> = []) : ?Array<string> {
    const chars = `${pChars}`;
    const acc = copy(pAcc);

    if (chars.length === 0 && acc.length === 0) {
      return [];
    }

    if(chars.length === 0 && acc.length > 0) {
      return acc.reverse();
    }

    if (chars.charAt(0) == ' ') {
      return this._lexer(chars.substr(1), acc);
    }

    for (const op of Object.keys(Parser.OPERATORS)) {
      if (chars.startsWith(op)) {
        return this._lexer(chars.replace(op, ''), [Parser.OPERATORS[op], ...acc]);
      }
    }

    if (chars.length !== 0 && acc.length === 0) {
      return this._lexer('', [chars, '==']);
    }

    const accHead = head(acc);
    const accTail = tail(acc);

    if (!Object.keys(Parser.OPERATORS).includes(accHead)) {
      return this._lexer('', [accHead, chars, ...accTail]);
    }

    const splittedChars = chars.split('');

    if (['||', '&&'].includes(accHead)) {
      return this._lexer('', [chars, '==', accHead, ...accTail])
    }

    return this._lexer('', [chars, accHead, ...accTail]);
  }

  _requireDigits(value: ?string): number {
    if (!value) {
      throw Error('value must be provided');
    }
    if (this._isLeadingZero(value)) {
      throw Error('digit must not start with zero');
    }
    return this._parseDigits(value);
  }

  _isLeadingZero(value: string): boolean {
    return value.length > 1 && value.startsWith('0');
  }

  _parseDigits(value: string): number {
    return parseInt(value);
  }

  _maybePatch(value: ?string, approximate: ?boolean) : ?number {
    if (!value && approximate) {
      return null;
    }
    return this._requireDigits(value);
  }

  _optionalDotSeparated(value: ?string) : ?Array<string> {
    if (!value) {
      return [];
    }
    const parts = value.split('.');

    const validParts = parts.filter((el) => {
      return el !== '' && this._isValidIdentifier(el);
    });

    if (parts.length !== validParts.length) {
      throw Error('the optional part has invalid characters.');
    }

    return parts;
  }

  _isValidIdentifier(value: string) : boolean {
    const parts = [...value]
    const invalidChars = parts.filter((char) => {
      return !char.match(/[A-Z|a-z|0-9]/i) && char !== '-';
    })
    return invalidChars.length > 0 ? false : true;
  }
}

Parser.OPERATORS = {
  ">=": '>=',
  "<=": '<=',
  "~>": '~>',
  ">": '>',
  "<": '<',
  "==": '==',
  "!=": '!=',
  "!": '!=',
  " or ": '||',
  " and ": '&&'
};
