export default function yesterday(obj: any) {
  const { yesterdayConditions, units } = obj;

  if (!yesterdayConditions) {
    return null;
  }

  const { temperature, precip } = yesterdayConditions;

  return {
    temperature,
    precip: precip.value,
    units
  };
}
