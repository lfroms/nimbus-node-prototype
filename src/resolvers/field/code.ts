export default function code({ code }: { code: string }) {
  const withoutLetterPrefix = code.slice(1);
  return parseInt(withoutLetterPrefix);
}
