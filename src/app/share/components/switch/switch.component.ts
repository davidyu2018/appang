import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {
  isOn: boolean = false
  @Input() 
  set switchState(bol: boolean) {
    this.isOn = bol
    this.switchHandler(true)
  }
  @Output() onSwitch = new EventEmitter<boolean>()
  constructor() {}
  switchHandler(isInit = false) {
    isInit && this.onSwitch.emit(this.isOn)
    !isInit && (this.isOn = !this.isOn)
    !isInit && this.onSwitch.emit(this.isOn)
  }
}
