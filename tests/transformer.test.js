const transformer = require("../src/transformer");

test("transformer should transform an AST correctly", () => {
  const ast = {
    type: "Program",
    body: [
      {
        type: "CallExpression",
        name: "add",
        params: [
          { type: "NumberLiteral", value: "2" },
          { type: "NumberLiteral", value: "3" },
        ],
        _context: [],
      },
    ],
    _context: [],
  };

  const expectedNewAst = {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "add",
          },
          arguments: [
            { type: "NumberLiteral", value: "2" },
            { type: "NumberLiteral", value: "3" },
          ],
        },
      },
    ],
  };

  const newAst = transformer(ast);
  expect(newAst).toEqual(expectedNewAst);
});

test("transformer should handle different types of expressions", () => {
  const ast = {
    type: "Program",
    body: [
      {
        type: "CallExpression",
        name: "concat",
        params: [
          { type: "StringLiteral", value: "Hello" },
          { type: "StringLiteral", value: " World" },
        ],
        _context: [],
      },
    ],
    _context: [],
  };

  const expectedNewAst = {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "concat",
          },
          arguments: [
            { type: "StringLiteral", value: "Hello" },
            { type: "StringLiteral", value: " World" },
          ],
        },
      },
    ],
  };

  const newAst = transformer(ast);
  expect(newAst).toEqual(expectedNewAst);
});
