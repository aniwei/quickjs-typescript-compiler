export class TemplateObjectConst {
  readonly elements: Array<unknown>
  readonly raw: TemplateObjectConst | undefined

  constructor(elements: Array<unknown>, raw: TemplateObjectConst | undefined) {
    this.elements = elements
    this.raw = raw
  }
}
