export class FunctionDef {}

export function createNewEmptyFunctionDef(filename: string) {
  return createNewFunctionDef(null, filename)
}

export function createNewFunctionDef(
  parent: FunctionDef | null,
  filename: string
) {
  return new FunctionDef()
}