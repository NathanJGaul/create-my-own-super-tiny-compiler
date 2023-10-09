const codeGenerator = require("../src/codeGenerator");

test("codeGenerator should generate code for a Program node", () => {
  const node = {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: { type: "Identifier", name: "print" },
          arguments: [{ type: "StringLiteral", value: "Hello, world!" }],
        },
      },
    ],
  };

  const expectedCode = 'print("Hello, world!");';
  expect(codeGenerator(node)).toBe(expectedCode);
});

test("codeGenerator should generate code for a CallExpression node", () => {
  const node = {
    type: "CallExpression",
    callee: { type: "Identifier", name: "add" },
    arguments: [
      { type: "NumberLiteral", value: "2" },
      { type: "NumberLiteral", value: "3" },
    ],
  };

  const expectedCode = "add(2, 3)";
  expect(codeGenerator(node)).toBe(expectedCode);
});

test("codeGenerator should generate code for a NumberLiteral node", () => {
  const node = {
    type: "NumberLiteral",
    value: "5",
  };

  expect(codeGenerator(node)).toBe("5");
});

test("codeGenerator should throw an error for unsupported node types", () => {
  const node = { type: "UnsupportedType" };

  expect(() => codeGenerator(node)).toThrowError(TypeError);
});

test("codeGenerator should handle complex nested expressions", () => {
  const ast = {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: { type: "Identifier", name: "add" },
          arguments: [
            { type: "NumberLiteral", value: "5" },
            {
              type: "CallExpression",
              callee: { type: "Identifier", name: "subtract" },
              arguments: [
                { type: "NumberLiteral", value: "8" },
                { type: "NumberLiteral", value: "3" },
              ],
            },
          ],
        },
      },
      {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: { type: "Identifier", name: "print" },
          arguments: [{ type: "StringLiteral", value: "Hello, world!" }],
        },
      },
    ],
  };

  const expectedCode = "add(5, subtract(8, 3));\n" + 'print("Hello, world!");';

  expect(codeGenerator(ast)).toBe(expectedCode);
});
