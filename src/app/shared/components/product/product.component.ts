import { Component, inject, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/Cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: any;
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  addToCart(id:string):void{  
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if(res.status == 'success'){
          this._ToastrService.success(res.message, 'FreshCart')
          this._CartService.cartNumber.set(res.numOfCartItems);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
