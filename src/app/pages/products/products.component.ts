import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { IProduct } from 'src/app/shared/interfaces/iproduct';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService);
  products: WritableSignal<IProduct[]> = signal([]);

  text: string = '';

  ngOnInit(): void {
    this.getProductsData()

  }

  getProductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products.set(res.data);
        console.log(res.data);
      }
    })
  }

  trackByProductId(index: number, prod: IProduct): string {
    return prod._id; // Ensure this is the unique identifier for each product
  }
}
