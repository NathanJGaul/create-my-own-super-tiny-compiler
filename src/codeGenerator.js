/**
 * Generates JavaScript code from an AST (Abstract Syntax Tree) node. It recursively processes the
 * nodes based on their type, converting each node into the corresponding JavaScript syntax.
 *
 * @param {Object} node - An AST node. The node object should have a 'type' property that identifies
 * the type of the AST node (e.g., "Program", "ExpressionStatement", "CallExpression", etc.). Depending
 * on the type, the node may also have additional properties like 'body', 'expression', 'callee', 'arguments',
 * 'name', or 'value' that provide more details about the node.
 *
 * @returns {string} A string of JavaScript code that represents the given AST node. For a "Program" node,
 * it will return the generated code for all the statements in the program. For other node types, it will
 * return the code for that specific node.
 *
 * @throws {TypeError} Throws an error if the node type is not supported, indicating that the `codeGenerator`
 * cannot generate code for that specific node type.
 *
 * @example
 * const ast = {
 *   type: 'CallExpression',
 *   callee: { type: 'Identifier', name: 'print' },
 *   arguments: [{ type: 'StringLiteral', value: 'Hello, world!' }]
 * };
 *
 * // Returns 'print("Hello, world!")'
 * codeGenerator(ast);
 */
function codeGenerator(node) {
  switch (node.type) {
    case "Program":
      return node.body.map(codeGenerator).join("\n");

    case "ExpressionStatement":
      return codeGenerator(node.expression) + ";";

    case "CallExpression":
      return (
        codeGenerator(node.callee) +
        "(" +
        node.arguments.map(codeGenerator).join(", ") +
        ")"
      );

    case "Identifier":
      return node.name;

    case "NumberLiteral":
      return node.value;

    case "StringLiteral":
      return '"' + node.value + '"';

    default:
      throw new TypeError(node.type);
  }
}

module.exports = codeGenerator;
