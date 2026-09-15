export function rgbCase(value: string): string {
  return value
    .toLowerCase()
    .replace(/r/g, "R")
    .replace(/g/g, "G")
    .replace(/b/g, "B");
}
