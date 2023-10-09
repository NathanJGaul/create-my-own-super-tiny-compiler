/**
 * Traverses the Abstract Syntax Tree (AST), visiting each node and applying the methods
 * specified in the provided visitor object. The traverser function is essential for operations
 * like transforming and code generation from the AST.
 *
 * @param {Object} ast - The Abstract Syntax Tree that needs to be traversed. The structure of the
 * AST should align with the expected node types and tree structure for proper traversal.
 *
 * @param {Object} visitor - An object containing methods corresponding to the type of AST nodes.
 * Each key in the object should be a node type (e.g., "Program", "CallExpression"), and the value
 * should be another object containing an 'enter' and/or 'exit' method to be called when entering and/or
 * exiting the respective node during traversal.
 *
 * @example
 * const ast = {
 *   type: 'Program',
 *   body: [ ... ]
 * };
 *
 * const visitor = {
 *   Program: {
 *     enter(node, parent) {
 *       console.log('Entering Program node');
 *     },
 *     exit(node, parent) {
 *       console.log('Exiting Program node');
 *     }
 *   },
 *   // ... other node type handlers
 * };
 *
 * traverser(ast, visitor);  // Calls the enter and exit methods as it traverses the AST
 *
 * @throws {TypeError} Throws an error if it encounters an unsupported node type during traversal,
 * indicating that there's no case handling for that specific node type in the traverser function.
 */
const traverser = (ast, visitor) => {
  const traverseArray = (array, parent) => {
    array.forEach((child) => {
      traverseNode(child, parent);
    });
  };

  const traverseNode = (node, parent) => {
    let methods = visitor[node.type];
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      case "Program":
        traverseArray(node.body, node);
        break;
      case "CallExpression":
        traverseArray(node.params, node);
        break;
      case "NumberLiteral":
      case "StringLiteral":
        break;
      default:
        throw new TypeError(node.type);
    }

    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  };

  traverseNode(ast, null);
};

module.exports = traverser;
