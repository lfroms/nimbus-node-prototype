export default function uv(obj: any) {
  const { uv } = obj;

  if (!uv) {
    return null;
  }

  const { category, index, textSummary } = uv;

  return {
    index,
    category,
    description: textSummary
  };
}
