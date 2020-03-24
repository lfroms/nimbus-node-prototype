import { ensureArray, titleCase } from '../helpers';

export default function events(obj: any) {
  const { events } = obj;

  if (!events) {
    return [];
  }

  return ensureArray(events).map(({ type, priority, description, dateTime }) => {
    return {
      type,
      priority,
      summary: titleCase(description),
      time: dateTime
    };
  });
}
