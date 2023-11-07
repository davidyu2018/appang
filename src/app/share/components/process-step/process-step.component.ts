import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-process-step',
  templateUrl: './process-step.component.html',
  styleUrls: ['./process-step.component.scss']
})
export class ProcessStepComponent {
  active: number;
  @Input() steps: any[] = []
  @Input()
  set currStep(n: number) {
    this.active = n
    this.updateProcess()
  }

  constructor() {

  }
  updateProcess() {
    console.log('sss', this.active)
  }
}
