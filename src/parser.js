/**
 * Parses an array of tokens and converts them into an Abstract Syntax Tree (AST) following
 * the specific structure of expressions, literals, and call expressions.
 *
 * @param {Object[]} tokens - An array of token objects where each token object has a
 * 'type' and 'value' property. The 'type' can be "paren", "number", "string", or "name".
 * The 'value' contains the actual value of the token.
 *
 * @returns {Object} An Abstract Syntax Tree (AST) representing the structure of the code
 * contained in the tokens. The AST has a root type of "Program" and contains a body of
 * expressions, which can be "CallExpression", "NumberLiteral", or "StringLiteral".
 *
 * @throws {TypeError} Throws an error if a token type is encountered that is not supported
 * by the parser, to indicate that the parser cannot handle that specific token type.
 *
 * @example
 * // returns
 * // {
 * //   type: "Program",
 * //   body: [
 * //     {
 * //       type: "CallExpression",
 * //       name: "add",
 * //       params: [
 * //         { type: "NumberLiteral", value: "2" },
 * //         { type: "NumberLiteral", value: "3" }
 * //       ]
 * //     }
 * //   ]
 * // }
 * parser([
 *   { type: "paren", value: "(" },
 *   { type: "name", value: "add" },
 *   { type: "number", value: "2" },
 *   { type: "number", value: "3" },
 *   { type: "paren", value: ")" }
 * ]);
 */
const parser = (tokens) => {
  let current = 0;

  const walk = () => {
    let token = tokens[current];

    if (token.type === "number") {
      current++;
      return {
        type: "NumberLiteral",
        value: token.value,
      };
    }

    if (token.type === "string") {
      current++;
      return {
        type: "StringLiteral",
        value: token.value,
      };
    }

    if (token.type === "paren" && token.value === "(") {
      token = tokens[++current];

      let node = {
        type: "CallExpression",
        name: token.value,
        params: [],
      };

      token = tokens[++current];

      while (
        token.type !== "paren" ||
        (token.type === "paren" && token.value !== ")")
      ) {
        node.params.push(walk());
        token = tokens[current];
      }

      current++;
      return node;
    }

    throw new TypeError(token.type);
  };

  let ast = {
    type: "Program",
    body: [],
  };

  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
};

module.exports = parser;
