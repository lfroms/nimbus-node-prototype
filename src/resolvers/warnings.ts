export default function warnings(obj: any) {
  const { warnings } = obj;

  if (!warnings) {
    return null;
  }

  const { url, event } = warnings;

  return {
    url,
    events: event
  };
}
