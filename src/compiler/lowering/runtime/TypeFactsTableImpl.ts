import * as ts from 'typescript'
import { TypeFact, TypeFactsTable } from '../LoweringContext'

export class TypeFactsTableImpl implements TypeFactsTable {
  private readonly facts = new Map<ts.Node, TypeFact>()

  narrow(node: ts.Node, fact: TypeFact): void {
    this.facts.set(node, fact)
  }

  lookup(node: ts.Node): TypeFact | undefined {
    return this.facts.get(node)
  }

  clear(node: ts.Node): void {
    this.facts.delete(node)
  }
}
