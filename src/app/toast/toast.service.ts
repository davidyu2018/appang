import { Injectable, Injector, Inject, InjectionToken } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { ToastComponent } from './toast.component';
import { ToastData, TOAST_CONFIG_TOKEN, ToastConfig } from './toast-config';
import { ToastRef } from './toast-ref';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private lastToast: ToastRef;

  constructor(
    private overlay: Overlay) { }

  show(data: any) {
   const config = new OverlayConfig();
   const positionSttategy = this.overlay.position().global().centerVertically().centerHorizontally();
   config.positionStrategy = positionSttategy;
   let overlayRef = this.overlay.create(config);
   const inject = Injector.create({
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
   let partal = new ComponentPortal(ToastComponent, null, inject);
   overlayRef.attach(partal)
   setTimeout(() => {
    overlayRef.detach()
    overlayRef.dispose()
   }, 2000)
  }
}
export const Toast_Ref = new InjectionToken<{}>('Toast_Ref');
export const Toast_Msg = new InjectionToken<{}>('Toast_Msg')