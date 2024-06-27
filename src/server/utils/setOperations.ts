function isInArray<Type>(obj: Type, arr: Type[], key: keyof Type): boolean {
  return arr.some((item) => item[key] === obj[key]);
}

export function intersection<Type>(
  arr1: Type[],
  arr2: Type[],
  key: keyof Type
): Type[] {
  return arr1.filter((obj) => isInArray(obj, arr2, key));
}

export function union<Type>(
  arr1: Type[],
  arr2: Type[],
  key: keyof Type
): Type[] {
  return [...arr1, ...arr2.filter((obj) => !isInArray(obj, arr1, key))];
}

export function difference<Type>(
  arr1: Type[],
  arr2: Type[],
  key: keyof Type
): Type[] {
  return arr1.filter((obj) => !isInArray(obj, arr2, key));
}
