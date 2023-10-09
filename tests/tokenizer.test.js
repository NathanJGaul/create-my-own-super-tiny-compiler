const tokenizer = require("../src/tokenizer");

test("tokenizer should tokenize a string correctly", () => {
  const input = '(add 123 "sample string")';
  const expected = [
    { type: "paren", value: "(" },
    { type: "name", value: "add" },
    { type: "number", value: "123" },
    { type: "string", value: "sample string" },
    { type: "paren", value: ")" },
  ];

  expect(tokenizer(input)).toStrictEqual(expected);
});

test("tokenizer should skip white spaces", () => {
  const input = "    (add 1   3)      ";
  const expected = [
    { type: "paren", value: "(" },
    { type: "name", value: "add" },
    { type: "number", value: "1" },
    { type: "number", value: "3" },
    { type: "paren", value: ")" },
  ];

  expect(tokenizer(input)).toStrictEqual(expected);
});

test("tokenizer should throw an error for unknown characters", () => {
  const input = "(add 1$ 2)";
  expect(() => tokenizer(input)).toThrowError(
    /I don't know what this character is: \$/
  );
});
