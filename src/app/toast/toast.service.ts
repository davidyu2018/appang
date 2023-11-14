import { Injectable, Injector, Inject, InjectionToken } from '@angular/core';
import {  Overlay, OverlayConfig, OverlayRef ,GlobalPositionStrategy} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { ToastComponent } from './toast.component';
import { ToastData, TOAST_CONFIG_TOKEN, ToastConfig } from './toast-config';
import { ToastRef } from './toast-ref';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private lastToast: ToastRef;

  constructor(private overlay: Overlay, @Inject(TOAST_CONFIG_TOKEN) private toastConfig: ToastConfig) {}

  show(data: ToastData) {
   const positionStrategy: any = this.getPositionStrategy()
   const overlayRef: OverlayRef = this.overlay.create(positionStrategy);

   const toastRef = new ToastRef(overlayRef)
    this.lastToast = toastRef

   const injector = Injector.create({
    providers: [
      {
        provide: Toast_Ref,
        useValue: overlayRef
      },
      {
        provide: Toast_Msg,
        useValue: data
      }
    ]
   })
   const toastPortal = new ComponentPortal(ToastComponent, null, injector);
   overlayRef.attach(toastPortal)
  //  setTimeout(() => {
  //   overlayRef.detach()
  //   overlayRef.dispose()
  //  }, 2000)
   return toastRef
  }
  getPositionStrategy(): GlobalPositionStrategy {
    return this.overlay.position()
      .global()
      .top(this.getPosition())
      .right(this.toastConfig.position.right  + 'px');
  }
  getPosition() {
    const lastToastIsVisible = this.lastToast && this.lastToast.isVisible();
    const position = lastToastIsVisible 
      ? this.lastToast.getPosition().bottom
      : this.toastConfig.position.top;
    return position + 'px';
  }
}
export const Toast_Ref = new InjectionToken<{}>('Toast_Ref');
export const Toast_Msg = new InjectionToken<{}>('Toast_Msg')