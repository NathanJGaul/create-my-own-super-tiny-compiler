const traverser = require("../src/traverser");

test("traverser should call visitor methods on entering and exiting nodes", () => {
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
      },
    ],
  };

  const visitor = {
    Program: {
      enter: jest.fn(),
      exit: jest.fn(),
    },
    CallExpression: {
      enter: jest.fn(),
      exit: jest.fn(),
    },
    NumberLiteral: {
      enter: jest.fn(),
      exit: jest.fn(),
    },
  };

  traverser(ast, visitor);

  expect(visitor.Program.enter).toHaveBeenCalled();
  expect(visitor.Program.exit).toHaveBeenCalled();
  expect(visitor.CallExpression.enter).toHaveBeenCalled();
  expect(visitor.CallExpression.exit).toHaveBeenCalled();
  expect(visitor.NumberLiteral.enter).toHaveBeenCalledTimes(2);
  expect(visitor.NumberLiteral.exit).toHaveBeenCalledTimes(2);
});

test("traverser should throw an error for unsupported node types", () => {
  const ast = {
    type: "UnsupportedType",
    body: [],
  };

  expect(() => traverser(ast, {})).toThrowError(TypeError);
});
