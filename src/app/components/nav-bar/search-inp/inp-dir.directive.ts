import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "app-search-inp input"
})
export class InpDirDirective {
  focus = false;
  @HostListener("focus")
  isFocus() {
    this.focus = true;
  }
  @HostListener("blur")
  isBlur() {
    this.focus = false;
  }
}
