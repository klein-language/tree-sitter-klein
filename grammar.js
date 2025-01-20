/// <reference types="tree-sitter-cli/dsl" />
//@ts-check

module.exports = grammar({
	name: "klein",

	rules: {
		source_file: $ => $.program,
		program: $ => repeat1($.statement),

		// Statements

		statement: $ => seq(choice($.declaration, $.return_statement, $.expression), ";"),

		declaration: $ => seq(
			"let",
			$.identifier,
			optional(seq(":", $.type)),
			"=",
			$.expression
		),

		return_statement: $ => seq("return", $.expression),

		// Expressions

		expression: $ => choice(
			$.binary_expression,
			$.prefix
		),

		binary_expression: $ => choice(
			prec.left(7, seq($.prefix, ".", $.identifier)),
			prec.right(6, seq($.prefix, "^", $.prefix)),
			prec.left(5, seq($.prefix, choice("*", "/"), $.prefix)),
			prec.left(4, seq($.prefix, choice("+", "-"), $.prefix)),
			prec.left(3, seq($.prefix, choice("<", ">", "==", "<=", ">=", "!="), $.prefix)),
			prec.left(2, seq($.prefix, choice("or", "and"), $.prefix)),
			prec.left(1, seq($.prefix, "=", $.prefix)),
		),

		prefix: $ => choice(
			seq("not", $.postfix),
			$.postfix
		),

		postfix: $ => seq($.literal, optional(seq("(", list($.expression), ")"))),

		// Literals

		literal: $ => choice(
			$.identifier,
			$.number,
			$.string,
			seq("do", $.block),
			$.function_literal,
			$.object,
			$.for_loop,
			$.while_loop,
			$.if_expression,
			$.list
		),

		list: $ => seq("[", list($.expression), "]"),

		for_loop: $ => seq(
			"for", $.identifier, "in", $.expression, $.block,
		),

		while_loop: $ => seq(
			"while", $.expression, $.block,
		),

		if_expression: $ => seq(
			"if", $.expression, $.block,
			repeat(seq("else", "if", $.expression, $.block)),
			optional(seq("else", $.block))
		),

		block: $ => seq(
			"{",
			repeat($.statement),
			"}"
		),

		function_literal: $ => seq(
			"function",
			"(",
			list(seq($.identifier, ":", $.type)),
			")",
			":",
			$.type,
			$.block
		),

		object: $ => seq(
			"{",
			list(seq($.identifier, "=", $.expression)),
			"}"
		),

		// Types

		type: $ => choice(
			$.union_type,
			$.type_literal,
		),

		union_type: $ => seq($.type_literal, repeat1(seq("|", $.type_literal))),

		type_literal: $ => choice(
			$.string,
			$.number,
			$.identifier,
		),

		// Tokens

		identifier: _$ => /[a-zA-Z_]\w*/,
		number: _$ => /-?\d+(\.\d+)?/,
		string: _$ => /"[^"]*"/
	}
});

/**
 * @param {RuleOrLiteral} rule
 */
function list(rule) {
	return optional(seq(rule, repeat(seq(",", rule)), optional(",")));
}
