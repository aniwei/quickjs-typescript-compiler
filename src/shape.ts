import * as ts from 'typescript'

type Ordered = { 
  name: string
  init?: ts.Expression 
}

export type CanonicalShape = {
  orderedKeys: string[]      // required first (alpha), then optional
  required: Set<string>
  optional: Set<string>
}

export class ShapePolicy {
  constructor(private checker: ts.TypeChecker) {}

  getCanonicalShape(type: ts.Type): CanonicalShape | null {
    const props = this.checker.getPropertiesOfType(type)
    if (!props || props.length === 0) {
      return null
    }

    const required: string[] = []
    const optional: string[] = []
    for (const s of props) {
      const name = s.name
      let isOptional = false
      for (const d of s.getDeclarations() ?? []) {
        if (ts.isPropertySignature(d) || ts.isPropertyDeclaration(d) || ts.isParameter(d)) {
          if (d.questionToken) { 
            isOptional = true 
            break
          }
        }
      }

      (isOptional ? optional : required).push(name)
    }
    required.sort()
    optional.sort()
    return {
      orderedKeys: [...required, ...optional],
      required: new Set(required),
      optional: new Set(optional),
    }
  }

  reorderAndFillObjectLiteral(node: ts.ObjectLiteralExpression, shape: CanonicalShape) {
    const present = new Map<string, ts.Expression>()
    for (const p of node.properties) {
      if (ts.isPropertyAssignment(p)) {
        const key = this.getPropName(p.name)
        if (key) {
          present.set(key, p.initializer)
        }
      }
    }
    const ordered: Array<Ordered> = []
    for (const k of shape.orderedKeys) {
      ordered.push({ name: k, init: present.get(k) })
    }

    const missing = shape.orderedKeys.filter(k => !present.has(k))
    return { ordered, missing }
  }

  private getPropName(name: ts.PropertyName): string | null {
    if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
      return name.text
    }

    return null
  }
}