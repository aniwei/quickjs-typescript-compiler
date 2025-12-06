import { JSFunctionDef } from './jsFunctionDef';
import { AtomManager } from './atomManager';

export class ParseState {
  cur_func: JSFunctionDef | null = null
  is_module: boolean = false
  allow_html_comments: boolean = false
  ext_json: boolean = false
  filename: string = ''
  atomManager: AtomManager
  
  constructor(firstAtomId?: number) {
    this.atomManager = new AtomManager(firstAtomId)
  }
}
