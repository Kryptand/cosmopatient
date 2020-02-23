export const COS_KEYS = '__cos_keys';
export const COS_KEY_NAMES = '__cos_key_names';

export function Key(target, keyName: string | symbol): void {
  console.debug(target);
  console.debug(keyName);
  target[COS_KEY_NAMES] = target[COS_KEY_NAMES]
      ? [...target[COS_KEY_NAMES], keyName]
      : [keyName];
  if (!target[COS_KEYS]) {
    Object.defineProperty(target, COS_KEYS, {
      get: () => target[COS_KEY_NAMES]
    });
  }
}

export function checkKeyName(type: any, modelName: string): boolean {
  const keys = type.prototype[COS_KEYS];
  if (keys === undefined) {
    console.error(`Entity model '${modelName}' does not have a key specified!`);
    return false;
  }
  return true;
}

export function getKeyNamesFromModel<TModel>(type: new () => TModel): string[] {
  const keys = type && type.prototype[COS_KEYS];
  return keys;
}
