export default function wind(obj: any) {
  const {
    wind: { direction, speed, gust, bearing }
  } = obj;

  return {
    direction: direction,
    speed: speed.value,
    gust: gust.value,
    bearing: bearing.value
  };
}
