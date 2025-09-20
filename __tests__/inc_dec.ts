// minimal tests for ++/-- prefix and postfix
export {}

let incDecA = 1
let incDecB = 2

// postfix -- in statement
incDecB--

// prefix ++ in expression
let incDecC = ++incDecA

// postfix ++ in expression
let incDecD = incDecB++

// prefix -- in expression
let incDecE = --incDecC
