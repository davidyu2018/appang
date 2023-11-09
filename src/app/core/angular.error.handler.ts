import { ErrorHandler, Injectable, NgZone } from "@angular/core";

@Injectable()
export class MessageErrorHandler implements ErrorHandler {
  constructor(private ngZone: NgZone) { }
  handleError(error: Error) {
    let msg = error.message ? error.message : error;
    this.ngZone.run(() => {
      console.log('Angular Reset Error: ' + msg)
    })
  }
}