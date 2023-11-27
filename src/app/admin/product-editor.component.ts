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
  categories: string[]
  product: Product = {
    price: 0,
    id: -1, 
    title: '',
    rating: 0, 
    category: '', 
    brand: '', 
    description:'',
    stock: 0
  };
  prevId:number = -1;
  nextId:number = -1
  constructor(public repository: ProductRepository, private router: Router, activeRoute: ActivatedRoute) {
    activeRoute.params.subscribe(params => {
      this.mode = params['mode'];
      let id = Number(params['id']);
      repository.getProduct(id).subscribe(p => this.product = {...p})
      this.prevId = repository.getPreviousProductId(id)
      this.nextId = repository.getNextProductId(id)
    })
    repository.getCategories()
    repository.categories$.subscribe(cats => this.categories = cats)
  }
  ngOnInit() {
  }
  onChange(e: any) {

  }
  save(form: NgForm) {
    // console.log('form', form)
    // this.repository.saveProduct(this.product);
    // this.router.navigateByUrl('/landing/sports/admin')
  }

}
