import { JSAtom as JSAtomEnum, ATOM_STRINGS } from './env';

export type JSAtom = number;
export { JSAtomEnum };
export const JS_ATOM_NULL = 0;

// Helper to convert raw atom name (from C definition) to actual string value
function getAtomStringValue(rawName: string): string {
  switch (rawName) {
    case "empty_string": return "";
    case "_eval_": return "<eval>";
    case "_ret_": return "<ret>";
    case "_var_": return "<var>";
    case "_arg_var_": return "<arg_var>";
    case "_with_": return "<with>";
    case "this_active_func": return "this.active_func";
    case "new_target": return "new.target";
    case "home_object": return "<home_object>";
    case "computed_field": return "<computed_field>";
    case "static_computed_field": return "<static_computed_field>";
    case "class_fields_init": return "<class_fields_init>";
    case "brand": return "<brand>";
    case "hash_constructor": return "#constructor";
    case "_default_": return "*default*";
    case "_star_": return "*";
    case "minus_zero": return "-0";
    case "minus_Infinity": return "-Infinity";
    case "not_equal": return "not-equal";
    case "timed_out": return "timed-out";
    case "Map_Iterator": return "Map Iterator";
    case "Set_Iterator": return "Set Iterator";
    case "Array_Iterator": return "Array Iterator";
    case "String_Iterator": return "String Iterator";
    case "RegExp_String_Iterator": return "RegExp String Iterator";
    case "Private_brand": return "<brand>";
    case "Symbol_toPrimitive": return "Symbol.toPrimitive";
    case "Symbol_iterator": return "Symbol.iterator";
    case "Symbol_match": return "Symbol.match";
    case "Symbol_matchAll": return "Symbol.matchAll";
    case "Symbol_replace": return "Symbol.replace";
    case "Symbol_search": return "Symbol.search";
    case "Symbol_split": return "Symbol.split";
    case "Symbol_toStringTag": return "Symbol.toStringTag";
    case "Symbol_isConcatSpreadable": return "Symbol.isConcatSpreadable";
    case "Symbol_hasInstance": return "Symbol.hasInstance";
    case "Symbol_species": return "Symbol.species";
    case "Symbol_unscopables": return "Symbol.unscopables";
    case "Symbol_asyncIterator": return "Symbol.asyncIterator";
    default: return rawName;
  }
}

export class AtomManager {
  private atomToName: string[] = ["<null>"]; // 0 is null
  private nameToAtom: Map<string, number> = new Map();

  constructor() {
    // Initialize standard atoms from env.ts
    // ATOM_STRINGS is a map of ID -> RawName
    
    // Find max ID to ensure we cover all
    let maxId = 0;
    for (const key in ATOM_STRINGS) {
      const id = Number(key);
      if (id > maxId) maxId = id;
    }

    for (let i = 1; i <= maxId; i++) {
      const rawName = ATOM_STRINGS[i];
      if (rawName) {
        const name = getAtomStringValue(rawName);
        // Force add to preserve ID mapping, even if duplicate
        const id = this.atomToName.length;
        this.atomToName.push(name);
        if (!this.nameToAtom.has(name)) {
          this.nameToAtom.set(name, id);
        }
      } else {
        // Should not happen if contiguous
        const id = this.atomToName.length;
        this.atomToName.push(`<unknown_${i}>`);
      }
    }
  }

  add(name: string): JSAtom {
    if (this.nameToAtom.has(name)) {
      return this.nameToAtom.get(name)!;
    }
    const id = this.atomToName.length;
    // console.log(`AtomManager: adding ${name} at ${id}`);
    this.atomToName.push(name);
    this.nameToAtom.set(name, id);
    return id;
  }

  get(name: string): JSAtom {
    return this.nameToAtom.get(name) || JS_ATOM_NULL;
  }

  getString(atom: JSAtom): string {
    return this.atomToName[atom] || "";
  }

  dump(): string[] {
    return this.atomToName;
  }
}