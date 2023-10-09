/**
 * Tokenizes the input string into an array of tokens. It recognizes parentheses,
 * numbers, strings, names, and whitespaces. This tokenizer will throw a TypeError
 * if it encounters a character that it doesn't know how to handle.
 *
 * @param {string} input - The input string to tokenize.
 * @returns {Object[]} An array of token objects. Each token object has a 'type' and 'value' property.
 * The 'type' property indicates the type of the token ("paren", "number", "string", "name").
 * The 'value' property indicates the actual value of the token.
 *
 * @throws {TypeError} Throws an error if an unknown character is encountered.
 *
 * @example
 * // returns [{ type: 'paren', value: '(' }, { type: 'name', value: 'add' }, { type: 'number', value: '123' }, { type: 'string', value: 'sample string' }, { type: 'paren', value: ')' }]
 * tokenizer('(add 123 "sample string")');
 */
const tokenizer = (input) => {
  let current = 0;
  let tokens = [];

  while (current < input.length) {
    let char = input[current];

    if (char === "(") {
      tokens.push({ type: "paren", value: "(" });
      current++;
      continue;
    }

    if (char === ")") {
      tokens.push({ type: "paren", value: ")" });
      current++;
      continue;
    }

    const WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    const NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = "";
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: "number", value });
      continue;
    }

    if (char === '"') {
      let value = "";
      char = input[++current];
      while (char !== '"') {
        value += char;
        char = input[++current];
      }

      char = input[++current];
      tokens.push({ type: "string", value });
      continue;
    }

    const LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = "";
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: "name", value });
      continue;
    }

    throw new TypeError(`I don't know what this character is: ${char}`);
  }

  return tokens;
};

module.exports = tokenizer;
