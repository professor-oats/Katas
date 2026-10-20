/* Description
How can you tell an extrovert from an introvert at NSA?
Va gur ryringbef, gur rkgebireg ybbxf ng gur BGURE thl'f fubrf.

I found this joke on USENET, but the punchline is scrambled. Maybe you can decipher it?
According to Wikipedia, ROT13 is frequently used to obfuscate jokes on USENET.

For this task you're only supposed to substitute characters. Not spaces, punctuation, numbers, etc.

Test examples:

"EBG13 rknzcyr." -> "ROT13 example."

"This is my first ROT13 excercise!" -> "Guvf vf zl svefg EBG13 rkprepvfr!"

 */

/* Because there are 26 letters in the basic Latin alphabet and 26 = 2 × 13, the ROT13 function is its own inverse:[2]

    ROT 13 ( ROT 13 ( x ) ) = x {\displaystyle {\mbox{ROT}}_{13}({\mbox{ROT}}_{13}(x))=x} for any basic Latin-alphabet text x {\displaystyle x}.

In other words, two successive applications of ROT13 restore the original text (in mathematics, this is sometimes called an involution; in cryptography, a reciprocal cipher).

*/

export function rot13(str: string): string {
  const UPPER_CASE: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const LOWER_CASE: string[] = "abcdefghijklmnopqrstuvwxyz".split("");

  let result: string = "";

  for (let i: number = 0; i < str.length; i++) {
    const char: string = str[i];

    if (UPPER_CASE.includes(char)) {
      let index: number = UPPER_CASE.indexOf(char);
      let rotated_Index: number = (index + 13) % 26;
      result += UPPER_CASE[rotated_Index];
    }
    else if (LOWER_CASE.includes(char)) {
      let index = LOWER_CASE.indexOf(char);
      let rotated_Index: number = (index + 13) % 26;
      result += LOWER_CASE[rotated_Index];
    }
    // If it's not a letter, append it as it is
    else {
      result += char;
    }
  }

  return result;
}
