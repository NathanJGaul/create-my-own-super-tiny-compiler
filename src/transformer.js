/**
 * A visitor object containing methods to be invoked by the traverser when encountering
 * specific types of AST nodes during traversal. The methods are responsible for transforming
 * the original AST nodes and populating a new AST with the transformed nodes.
 *
 * @typedef {Object} Visitor
 *
 * @property {Object} NumberLiteral - Handles the transformation of NumberLiteral nodes.
 * @property {Function} NumberLiteral.enter - Invoked when entering a NumberLiteral node.
 *
 * @property {Object} StringLiteral - Handles the transformation of StringLiteral nodes.
 * @property {Function} StringLiteral.enter - Invoked when entering a StringLiteral node.
 *
 * @property {Object} CallExpression - Handles the transformation of CallExpression nodes.
 * @property {Function} CallExpression.enter - Invoked when entering a CallExpression node.
 */

/**
 * A function that transforms an Abstract Syntax Tree (AST) based on the visitor methods
 * provided. It initially creates a new AST structure and populates it by traversing the
 * original AST and applying the visitor methods for transformation.
 *
 * @function
 *
 * @param {Object} ast - The original AST to be transformed.
 *
 * @returns {Object} A new AST that results from applying the transformations specified
 * in the visitor methods to the nodes of the original AST.
 *
 * @example
 * const originalAst = {
 *   type: 'Program',
 *   body: [ ... ]
 * };
 *
 * const transformedAst = transformer(originalAst);
 *
 * @see {@link Visitor} for the structure of the visitor object and its methods.
 */
const traverser = require("./traverser");

const visitor = {
  NumberLiteral: {
    enter(node, parent) {
      parent._context.push({
        type: "NumberLiteral",
        value: node.value,
      });
    },
  },

  StringLiteral: {
    enter(node, parent) {
      parent._context.push({
        type: "StringLiteral",
        value: node.value,
      });
    },
  },

  CallExpression: {
    enter(node, parent) {
      let expression = {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          name: node.name,
        },
        arguments: [],
      };

      node._context = expression.arguments;

      if (parent.type !== "CallExpression") {
        expression = {
          type: "ExpressionStatement",
          expression: expression,
        };
      }

      parent._context.push(expression);
    },
  },
};

const transformer = (ast) => {
  let newAst = {
    type: "Program",
    body: [],
  };

  ast._context = newAst.body;

  traverser(ast, visitor);

  return newAst;
};

module.exports = transformer;
