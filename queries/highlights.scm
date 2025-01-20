"return" @keyword.return

; Expressions
(literal ["do"] @keyword)
(for_loop ["for" "in"] @keyword.repeat)
(while_loop ["while"] @keyword.repeat)
(function_literal ["function"] @keyword.function)
(if_expression ["if" "else"] @keyword.conditional)
(declaration ["let"] @keyword)

; Brackets
["(" ")" "[" "]" "{" "}"] @punctuation.bracket
[";" ":" "," "."] @punctuation.delimiter
["and" "not" "or"] @keyword.operator
["+" "-" "*" "/" "^" "==" "!=" "<=" ">=" "<" ">" "=" "|"] @operator

; Reserved identifiers
((identifier) @boolean (#any-of? @boolean "true" "false"))
((identifier) @function.builtin (#any-of? @function.builtin "print" "input"))
((identifier) @variable (#not-any-of? @variable "true" "false" "print" "input" "null"))
((identifier) @constant.builtin (#eq? @constant.builtin "null"))

; Tokens
(number) @number
(string) @string
