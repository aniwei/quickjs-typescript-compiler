import ts from 'typescript'
import { ControlFlowBuilder } from '../src/controlFlow'

describe('ControlFlowBuilder', () => {
  test('emits break for the nearest loop when unlabeled', () => {
    const jumps: string[] = []
    const builder = new ControlFlowBuilder({ emitGoto: (label) => jumps.push(label) })

    builder.pushLoop('outer-break', 'outer-continue')
    builder.pushLoop('inner-break', 'inner-continue')
    builder.emitBreak()

    expect(jumps).toEqual(['inner-break'])
  })

  test('uses labeled loop for break statements with labels', () => {
    const jumps: string[] = []
    const builder = new ControlFlowBuilder({ emitGoto: (label) => jumps.push(label) })

    builder.pushLoop('outer-break', 'outer-continue', { labelName: 'outer' })
    builder.pushLoop('inner-break', 'inner-continue', { labelName: 'inner' })

    const breakNode = ts.factory.createBreakStatement(ts.factory.createIdentifier('outer'))
    builder.emitBreak(breakNode)

    expect(jumps).toEqual(['outer-break'])
  })

  test('emits continue for labeled outer loop', () => {
    const jumps: string[] = []
    const builder = new ControlFlowBuilder({ emitGoto: (label) => jumps.push(label) })

    builder.pushLoop('outer-break', 'outer-continue', { labelName: 'outer' })
    builder.pushLoop('inner-break', 'inner-continue', { labelName: 'inner' })

    const continueNode = ts.factory.createContinueStatement(ts.factory.createIdentifier('outer'))
    builder.emitContinue(continueNode)

    expect(jumps).toEqual(['outer-continue'])
  })

  test('labeled break on generic block uses pushed label target', () => {
    const jumps: string[] = []
    const builder = new ControlFlowBuilder({ emitGoto: (label) => jumps.push(label) })

    builder.pushLabel('exit', 'exit-target')
    const breakNode = ts.factory.createBreakStatement(ts.factory.createIdentifier('exit'))
    builder.emitBreak(breakNode)

    expect(jumps).toEqual(['exit-target'])
  })

  test('throws descriptive error for unknown labels', () => {
    const builder = new ControlFlowBuilder({ emitGoto: () => undefined })
    builder.pushLoop('loop-break', 'loop-continue')

    const breakNode = ts.factory.createBreakStatement(ts.factory.createIdentifier('missing'))
    expect(() => builder.emitBreak(breakNode)).toThrow("Unknown break label 'missing'")
  })
})
