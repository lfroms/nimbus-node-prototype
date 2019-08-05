export default function hourlyWind(obj: any) {
  const {
    wind: { direction, speed, gust, bearing }
  } = obj;

  return {
    direction: direction.value,
    speed: speed.value,
    gust: gust.value,
    bearing: bearing ? bearing.value : null
  };
}
