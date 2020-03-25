export default function titleCase(str: string): string {
  return str
    .replace(/\w\S*/g, text => {
      return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
    })
    .trim();
}
