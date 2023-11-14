import { Directive, HostListener } from "@angular/core";
import { NavigationService } from "../../core/navigation.service";
 
@Directive({
  selector: "[backButton]",
})
export class BackButtonDirective {
  constructor(private navigation: NavigationService) {}
 
  @HostListener("click")
  onClick(): void {
    this.navigation.back();
  }
}