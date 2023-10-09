const compiler = require("../src/compiler");

test("compiler should process input string into the correct output code", () => {
  const input = "(add 2 3)";
  const expectedOutput = "add(2, 3);";

  const output = compiler(input);

  expect(output).toBe(expectedOutput);
});

test("compiler should handle nested expressions", () => {
  const input = "(add 2 (subtract 4 2))";
  const expectedOutput = "add(2, subtract(4, 2));";

  const output = compiler(input);

  expect(output).toBe(expectedOutput);
});

test("compiler should handle complex input", () => {
  const input = "(add (multiply 2 3) (subtract 5 2))";
  const expectedOutput = "add(multiply(2, 3), subtract(5, 2));";

  const output = compiler(input);

  expect(output).toBe(expectedOutput);
});

test("compiler should throw error for invalid input", () => {
  const input = '(add 2 "invalid))'; // Here's an example of invalid input, you can adjust as per your implementation

  expect(() => compiler(input)).toThrow();
});
