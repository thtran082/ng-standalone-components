export class SharedStringUtils {
  static toCamelCase(value: string) {
    let arr = value.split(' ');
    let [first, ...res] = arr;
    res = res.map((rs) => {
      return rs.charAt(0).toUpperCase() + rs.slice(1);
    });
    return first.toLowerCase() + res.join('');
  }
}
