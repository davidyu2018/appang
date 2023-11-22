import { Component } from '@angular/core';
import { Product } from '../sports/product.model';
import { ProductRepository } from '../sports/product.repository';
import { CellClickedEvent, GridReadyEvent ,ColDef} from 'ag-grid-community';
import { Observable, fromEvent, merge, map, Subject} from 'rxjs';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ["./admin.component.scss"]
})
export class ProductTableComponent {
  newProductcCtegory: string = '';
  products: any[] = []
  columnDefs: any[] = [
    {
      field: 'title',
      colId: 'Title'
    },
    {
      field: 'price',
      colId: 'Price'
    },
    {
      field: 'stock',
      colId: 'Store'
    },
    {
      field: 'category',
      colId: 'Category'
    }
  ]
  constructor(private repository: ProductRepository) {

  }
  getProducts(): Product[] {
    return this.repository.getProducts()
  }
  deleteProduct(id: string) {
    this.repository.deleteProduct(id)
  }
  onCellClicked(e: any): void {
    console.log(e)
  }
  onGridReady(params: GridReadyEvent) {
    // this.rowData$ = this.mockServer.getAgGridData().pipe(tap(r => console.log('rrr', r)))
  }
}
