import {Component, Input, ContentChild, AfterContentInit, HostBinding} from '@angular/core';
import {InputRefDirective} from "../../directives/input-ref.directive";

@Component({
    selector: 'aweso-input',
    templateUrl: './awesoment-input.component.html',
    styleUrls: ['./awesoment-input.component.css']
})
export class AuFaInputComponent implements AfterContentInit {
    @Input() icon: string;
    @Input() label: string;

    @ContentChild(InputRefDirective)
    input: InputRefDirective;
    ngAfterContentInit() {
        // console.log('inputtt', this.input)
        if (!this.input) {
            // console.error('the au-fa-input needs an input inside its content');
        }
    }

    @HostBinding('class.focus')
    get focus() {
        return this.input ? this.input.focus : false;
    }


    get classes() {

        const cssClasses:any = {};

        if (this.icon) {
            cssClasses['fa-' + this.icon] = true;
        }

        return cssClasses;
    }

}