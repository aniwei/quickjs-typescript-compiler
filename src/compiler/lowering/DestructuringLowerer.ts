import * as ts from 'typescript';
import {
  BindingInfo,
  BindingKind,
  LoweringContext,
  OperandRef,
  TypeFact,
} from './LoweringContext';
import { LValueBuilder } from './LValueBuilder';

export interface DestructuringOptions {
  readonly bindingKind: BindingKind;
  readonly allowInitializer: boolean;
  readonly isArgument: boolean;
  readonly bindingLookup?: (name: ts.Identifier) => BindingInfo | undefined;
}

export class DestructuringLowerer {
  constructor(
    private readonly ctx: LoweringContext,
    private readonly lvalue: LValueBuilder,
  ) {}

  /** Mirrors QuickJS js_parse_destructuring_element/js_parse_destructuring_var. */
  emitBinding(
    pattern: ts.BindingName,
    source: OperandRef,
    options: DestructuringOptions,
  ): void {
    const materialised = this.materialiseSource(pattern, source);
    this.bindPattern(pattern, materialised, options);
  }

  narrowFromPattern(pattern: ts.BindingName): TypeFact | undefined {
    void pattern;
    return undefined;
  }

    private bindPattern(
      pattern: ts.BindingName,
      value: OperandRef,
      options: DestructuringOptions,
    ): void {
      if (ts.isIdentifier(pattern)) {
        this.bindIdentifier(pattern, value, options);
        return;
      }

      if (ts.isObjectBindingPattern(pattern)) {
        this.bindObjectPattern(pattern, value, options);
        return;
      }

      if (ts.isArrayBindingPattern(pattern)) {
        this.bindArrayPattern(pattern, value, options);
        return;
      }

      throw new Error('Unsupported binding pattern');
    }

    private bindIdentifier(
      identifier: ts.Identifier,
      value: OperandRef,
      options: DestructuringOptions,
    ): void {
      const binding = options.bindingLookup?.(identifier);
      if (!binding) {
        throw new Error(`Missing binding info for ${identifier.text}`);
      }
      const mode = this.ctx.scope.getStoreMode(binding);
      this.ctx.bytecode.storeBinding(binding, mode, value, identifier);
    }

    private bindObjectPattern(
      pattern: ts.ObjectBindingPattern,
      value: OperandRef,
      options: DestructuringOptions,
    ): void {
      const base = this.ensureTemporary(value, pattern);
      for (const element of pattern.elements) {
        if (ts.isBindingElement(element)) {
          if (element.dotDotDotToken) {
            throw new Error('Object rest binding not implemented yet');
          }
          const propertyValue = this.extractObjectProperty(base, element, options);
          this.bindPattern(element.name, propertyValue, options);
        }
      }
    }

    private bindArrayPattern(
      pattern: ts.ArrayBindingPattern,
      value: OperandRef,
      options: DestructuringOptions,
    ): void {
      const base = this.ensureTemporary(value, pattern);
      let index = 0;
      for (const element of pattern.elements) {
        if (ts.isOmittedExpression(element)) {
          index += 1;
          continue;
        }
        if (ts.isBindingElement(element) && element.dotDotDotToken) {
          throw new Error('Array rest binding not implemented yet');
        }
        const bindingElement = element as ts.BindingElement;
        const elementValue = this.extractArrayElement(base, index, bindingElement, options);
        this.bindPattern(bindingElement.name, elementValue, options);
        index += 1;
      }
    }

    private materialiseSource(pattern: ts.BindingName, source: OperandRef): OperandRef {
      if (ts.isIdentifier(pattern)) {
        return source;
      }
      return this.ensureTemporary(source, pattern);
    }

    private ensureTemporary(value: OperandRef, node: ts.Node): OperandRef {
      if (value.kind === 'temp') {
        return value;
      }
      return this.ctx.bytecode.emitOpWithResult('OP_dup', [value], node);
    }

    private extractObjectProperty(
      objectRef: OperandRef,
      element: ts.BindingElement,
      options: DestructuringOptions,
    ): OperandRef {
      if (element.initializer) {
        throw new Error('Binding initializers in object patterns not implemented yet');
      }
    const property = element.propertyName ?? this.assertIdentifierProperty(element);
    const keyOperand = this.createPropertyKey(property);
      return this.ctx.bytecode.emitOpWithResult('OP_get_prop', [objectRef, keyOperand], element);
    }

    private extractArrayElement(
      arrayRef: OperandRef,
      index: number,
      element: ts.BindingElement,
      options: DestructuringOptions,
    ): OperandRef {
      if (element.initializer) {
        throw new Error('Binding initializers in array patterns not implemented yet');
      }
      const indexOperand = this.ctx.bytecode.pushConst(index, element);
      return this.ctx.bytecode.emitOpWithResult('OP_get_array_el', [arrayRef, indexOperand], element);
    }

    private createPropertyKey(name: ts.PropertyName): OperandRef {
      if (ts.isIdentifier(name)) {
        return this.ctx.bytecode.pushConst(name.text, name);
      }
      if (ts.isStringLiteralLike(name) || ts.isNumericLiteral(name)) {
        return this.ctx.bytecode.pushConst(name.text, name);
      }
      throw new Error('Computed property names in binding patterns not implemented yet');
    }

    private assertIdentifierProperty(element: ts.BindingElement): ts.Identifier {
      if (ts.isIdentifier(element.name)) {
        return element.name;
      }
      throw new Error('Non-identifier shorthand properties are not supported yet');
    }
}
