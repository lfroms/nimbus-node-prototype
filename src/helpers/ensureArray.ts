export default function ensureArray(object: any) {
  if (!object) {
    return [];
  }

  if (!Array.isArray(object)) {
    return [object];
  }

  return object;
}
