export interface ScopeOptions {
  parent?: number;
  first?: number;
}

export class Scope {
  parent: number;
  first: number;

  constructor(options: ScopeOptions = {}) {
    this.parent = options.parent ?? -1;
    this.first = options.first ?? -1;
  }
}
