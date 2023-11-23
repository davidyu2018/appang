import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../sports/product.model';
import { ProductRepository } from '../sports/product.repository';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
})
export class ProductEditorComponent {
  mode: string = '';
  product: Product = {
    price: 0,
    id: '', 
    title: '',
     rating: 0, 
     category: '', 
     brand: '', 
     description:'',
     stock: 0
    };
    categorys: string[];

  constructor(public repository: ProductRepository, private router: Router, activeRoute: ActivatedRoute) {
    activeRoute.params.subscribe(params => {
      this.mode = params['mode'];
      let id = params['id'];
      id && (this.product = Object.assign({}, this.product, repository.getProduct(id)))
    })
    this.categorys = this.repository.getCategories()
  }
  onChange(e: any) {

  }
  save(form: NgForm) {
    // console.log('form', form)
    // this.repository.saveProduct(this.product);
    // this.router.navigateByUrl('/landing/sports/admin')
  }

}
