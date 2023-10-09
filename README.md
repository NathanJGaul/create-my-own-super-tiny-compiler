# My Super Tiny Compiler

A highly readable, simplified, and annotated version of a compiler inspired by [The Super Tiny Compiler by Jamie Builds](https://github.com/jamiebuilds/the-super-tiny-compiler).

This project breaks down the core parts of a real compiler and simplifies them to make it easy to understand how compilers work at a high level.

## Introduction

This compiler takes input code written in a lisp-like syntax and compiles it into simplified JavaScript code. It's composed of various modules, each handling different phases of the compilation process, including tokenization, parsing, transformation, and code generation.

## Example

### Input

```lisp
(add 2 (subtract 4 2))
```

### Output

```js
add(2, subtract(4, 2));
```

## Tests

Run tests using Jest with the following command:

```sh
yarn run test
```

## Modules

Here are the core modules in this compiler, with examples of their input and output for the sample code (add 2 3).

### 1. Tokenizer

Converts a string of code into an array of tokens.

#### Input
```lisp
(add 2 3)
```

#### Output
```js
[
  { type: 'paren', value: '(' },
  { type: 'name', value: 'add' },
  { type: 'number', value: '2' },
  { type: 'number', value: '3' },
  { type: 'paren', value: ')' }
]
```

### 2. Parser

Takes an array of tokens and turns it into an Abstract Syntax Tree (AST).

### 3. Transformer

Takes an AST and applies transformations to it, returning a new AST.

### 4. Code Generator

Takes a transformed AST and converts it into a string of code.