export function capitalize(string: string) {
  const result = string
    .trim()
    .replace(/ +/g, " ")
    .split(" ")
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(" ");
  return result;
}
