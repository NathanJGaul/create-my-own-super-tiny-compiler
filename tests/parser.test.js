const parser = require("../src/parser");

test("parser should parse an array of tokens into an AST", () => {
  const tokens = [
    { type: "paren", value: "(" },
    { type: "name", value: "add" },
    { type: "number", value: "2" },
    { type: "number", value: "3" },
    { type: "paren", value: ")" },
  ];

  const expectedAst = {
    type: "Program",
    body: [
      {
        type: "CallExpression",
        name: "add",
        params: [
          { type: "NumberLiteral", value: "2" },
          { type: "NumberLiteral", value: "3" },
        ],
      },
    ],
  };

  expect(parser(tokens)).toEqual(expectedAst);
});

test("parser should throw an error for unsupported token types", () => {
  const tokens = [{ type: "unknown", value: "x" }];
  expect(() => parser(tokens)).toThrowError(TypeError);
});

test("parser should handle nested expressions", () => {
  const tokens = [
    { type: "paren", value: "(" },
    { type: "name", value: "add" },
    { type: "number", value: "2" },
    { type: "paren", value: "(" },
    { type: "name", value: "multiply" },
    { type: "number", value: "4" },
    { type: "number", value: "3" },
    { type: "paren", value: ")" },
    { type: "paren", value: ")" },
  ];

  const expectedAst = {
    type: "Program",
    body: [
      {
        type: "CallExpression",
        name: "add",
        params: [
          { type: "NumberLiteral", value: "2" },
          {
            type: "CallExpression",
            name: "multiply",
            params: [
              { type: "NumberLiteral", value: "4" },
              { type: "NumberLiteral", value: "3" },
            ],
          },
        ],
      },
    ],
  };

  expect(parser(tokens)).toEqual(expectedAst);
});
