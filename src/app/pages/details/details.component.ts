import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
import { IProduct } from 'src/app/shared/interfaces/iproduct';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  private readonly _Route = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  
  detailsProduct:IProduct | null = null;
  
  ngOnInit(): void {
    this._Route.paramMap.subscribe({
      next: (res) => {
        // ^ get Id
        let idProduct = res.get('id');
        // ~ get product details 
        this._ProductsService.getSpecificProducts(idProduct).subscribe({
          next: (res) => {
            console.log(res.data);
            this.detailsProduct = res.data;
          },
          error: (err) => {
            console.log(err);
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
