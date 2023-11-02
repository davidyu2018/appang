import { Component, Input } from '@angular/core';
import { Quote } from '../../services/model';
@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent {
  @Input() quoteTitle = '佳句';
  @Input() quote: Quote | null = {en: '', cn: '', imgUrl:''};
}
