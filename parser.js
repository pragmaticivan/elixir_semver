// @flow

export default class Parser {
  static parseVersion(versionValue: string, approximate: ?boolean) {
    const [versionWithPre, build] = versionValue.split('+', 2);
    const [version, pre]  = versionWithPre.split('-', 2);
    const [major, minor, patch, next] = version.split('.');

  }

  static _requireDigits(value: string): string {
    return 'foo';
  }

  static _isLeadingZero(value: string): boolean {
    return value.startsWith('0');
  }

  // defp parse_digits(<<char, rest::binary>>, acc) when char in ?0..?9,
  //  do: parse_digits(rest, <<acc::binary, char>>)
  // defp parse_digits(<<>>, acc) when byte_size(acc) > 0, do: {:ok, String.to_integer(acc)}
  // defp parse_digits(_, _acc), do: :error
  static _parseDigits(value: string): number {
    return 1;
  }

  // defp maybe_patch(patch, approximate?)
  // defp maybe_patch(nil, true), do: {:ok, nil}
  // defp maybe_patch(patch, _), do: require_digits(patch)
  static _maybePatch(value: string) : boolean {
    return false;
  }

  static _optionalDotSeparated(value: string) : any {

  }

  static _convertPartsToInteger(value: string) :  number {
    return 1;
  }

  static _isValidIdentifier(value: string) : boolean {
    return false;
  }
}
