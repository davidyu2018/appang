import { Component, Inject } from '@angular/core';
import { ToastData, TOAST_CONFIG_TOKEN, ToastConfig } from './toast-config';
import { toastAnimations, ToastAnimationState } from './toast-animation';
import { ToastRef } from './toast-ref';
import { AnimationEvent } from '@angular/animations';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  animationState: ToastAnimationState = 'default';
  iconType: string;
  private intervalId: any;

  constructor(readonly data: ToastData, readonly ref: ToastRef, @Inject(TOAST_CONFIG_TOKEN) private toastConfig: ToastConfig) {
    this.iconType = data.type === 'success' ? 'done' : data.type;
  }

  ngOnInit() {
    this.intervalId = setTimeout(() => this.animationState = 'closing', 5000)
  }
  ngOnDestroy() {
    clearTimeout(this.intervalId)
  }
  close() {
    this.ref.close()
  }
  onFadeFinished(event: AnimationEvent) {
    const { toState } = event;
    const isFadeOut = (toState as ToastAnimationState) === 'closing';
    const itFinished = this.animationState === 'closing';

    if (isFadeOut && itFinished) {
      this.close()
    }
  }
}
