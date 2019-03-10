export default function warningEvent(obj: any) {
  if (!obj.event) {
    return [];
  }

  if (!Array.isArray(obj.event)) {
    return [obj.event];
  }

  return obj.event;
}
