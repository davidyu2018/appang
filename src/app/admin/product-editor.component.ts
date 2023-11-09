import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../sports/product.model';
import { ProductRepository } from '../sports/product.repository';
@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
})
export class ProductEditorComponent {
  editing: boolean = false;
  viewing: boolean = false;
  mode: string = ''
  product: Product = { name: '', id: '', category: '', price: 0, description: '' };
  originalProduct: Product = { name: '', id: '', category: '', price: 0, description: '' };

  products: Product[] = [];
  constructor(public repository: ProductRepository, private router: Router, activeRoute: ActivatedRoute) {
    // this.mode = activeRoute.snapshot.params['mode']
    // this.mode !== 'create' && Object.assign(this.product, repository.getProduct(activeRoute.snapshot.params['id']))
    activeRoute.params.subscribe(params => {
      this.mode = params['mode'];
      let id = params['id'];
      id && (Object.assign(this.product, repository.getProduct(id)))
    })
  }
  save(form: NgForm) {
    // console.log('form', form)
    // this.repository.saveProduct(this.product);
    // this.router.navigateByUrl('/landing/sports/admin')
  }

}
