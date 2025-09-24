import { Atom } from './atoms';

export class Var {
  name: Atom;
  isConst: boolean;

  constructor(name: Atom, isConst: boolean = false) {
    this.name = name;
    this.isConst = isConst;
  }
}


