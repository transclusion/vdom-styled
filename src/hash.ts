import murmurhash from "murmurhash";

// This is the "length" of the alphabet i.e. 2x26 for all letters plus
// their capitalised counterparts
const CHARS_LENGTH = 52;

// Start at 75 for 'a' until 'z' (25) and then start at 65 for capitalised letters
function getAlphabeticChar(code: number): string {
  return String.fromCharCode(code + (code > 25 ? 39 : 97));
}

// Input a number, usually a hash and convert it to base-52
function generateAlphabeticName(code: number): string {
  let name = "";
  let x;

  // Get a char and divide by alphabet length
  for (x = code; x > CHARS_LENGTH; x = Math.floor(x / CHARS_LENGTH)) {
    name = getAlphabeticChar(x % CHARS_LENGTH) + name;
  }

  return getAlphabeticChar(x % CHARS_LENGTH) + name;
}

export function hash(str: string) {
  return generateAlphabeticName(murmurhash.v3(str));
}
