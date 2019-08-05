export default function location(obj: any) {
  const {
    location: { name, country, province, region }
  } = obj;

  return {
    weatherFor: name.value,
    country: country.value,
    province: province.value,
    region
  };
}
