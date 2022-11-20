import { ElementRef, Injectable } from '@angular/core';
import * as M from 'materialize-css';

export interface MaterialInstance {
  open(): void;
  close(): void;
  destroy(): void;
}

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  static toast(message: string) {
    M.toast({ html: message });
  }

  // static updateInputs() {
  //   M.updateTextInputs();
  // }

  static modalInit(ref: ElementRef): MaterialInstance {
    return M.Modal.init(ref.nativeElement);
  }
  constructor() {}
}
