interface ResponseUnits {
  type: 'metric' | 'imperial';
  temperature: string;
  speed: string;
  pressure: string;
  distance: string;
}

export default function units(obj: any): ResponseUnits {
  const { units: type } = obj;

  if (obj.units === 'metric') {
    return {
      type,
      temperature: 'C',
      speed: 'km/h',
      pressure: 'kPa',
      distance: 'km'
    };
  }

  return {
    type,
    temperature: 'F',
    speed: 'mph',
    pressure: 'in',
    distance: 'mi'
  };
}
