import { Directive, HostBinding, HostListener, Input } from '@angular/core';

enum ButtonColor{
  primary = 'btn-primary',
  secondary= 'btn-secondary',
  success = 'btn-success',
  danger = 'btn-danger',
  warning = 'btn-warning',
  info = 'btn-info'
}

enum ButtonSize{
  lg= 'btn-lg',
  md = '',
  sm= 'btn-sm'
}

@Directive({
  selector: '[appBsButton]'
})
export class BsButtonDirective {

  @Input() color: 'primary'|'success'|'warning'|'danger'|'info'|'secondary' = 'primary';
  @Input() size: 'lg'|'md'|'sm'= 'md'
  constructor() { }


  @HostBinding('class')
  get applyStyles():string{
    const buttonColor: ButtonColor = ButtonColor[this.color];
    const buttonSize: ButtonSize = ButtonSize[this.size];

    return `btn ${buttonColor} ${buttonSize}`
  }
}
