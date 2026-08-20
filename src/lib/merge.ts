type PlainObject = Record<string, unknown>;

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Merges saved content on top of the default content, one level deep per field.
 * Arrays and primitives from `saved` fully replace the default; objects are merged
 * key by key so newly-added content fields keep working for older saved data.
 */
export function mergeWithDefaults<T extends object>(defaults: T, saved: unknown): T {
  if (!isPlainObject(saved)) return defaults;

  const defaultsObj = defaults as PlainObject;
  const result: PlainObject = { ...defaultsObj };
  for (const key of Object.keys(defaultsObj)) {
    const defaultValue = defaultsObj[key];
    const savedValue = saved[key];
    if (savedValue === undefined) continue;

    if (isPlainObject(defaultValue) && isPlainObject(savedValue)) {
      result[key] = mergeWithDefaults(defaultValue, savedValue);
    } else {
      result[key] = savedValue;
    }
  }
  return result as T;
}
