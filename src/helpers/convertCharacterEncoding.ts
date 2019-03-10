import Iconv from 'iconv-lite';

export default function convertCharacterEncoding(input: Buffer): string {
  const string = Iconv.decode(input, 'win1252');
  return string;
}
