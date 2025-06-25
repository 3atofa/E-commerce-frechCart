import { Component, inject } from '@angular/core';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { CartService } from 'src/app/services/Cart/cart.service';
import { ICart } from 'src/app/shared/interfaces/icart';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  private readonly _CartService = inject(CartService);
  private readonly Swal = inject(SwalPortalTargets);
  cartDetails:ICart = {} as ICart;
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCartData();
  }

  getCartData():void{
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res);   // total price and product
        this.cartDetails = res.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // ~ remove item 
  removeItem(id:string){
    this._CartService.removeItemCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getCartData()
        this._CartService.cartNumber.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  updateProductCount(id:string, count:number)
  {
    this._CartService.updateProductQuantity(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.getCartData();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  



  clearCart(){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
            this._CartService.ClearCart().subscribe({
      next: (res) => {
        console.log(res);
       if(res.message == 'success'){
         this.getCartData()
         this._CartService.cartNumber.set(res.numOfCartItems);
       }
      },
      error: (err) => {
        console.log(err);
      }
    })
        
        
        Swal.fire({
          title: "Cart Deleted!",
          text: "Your cart has been deleted.",
          icon: "success"
        });


      }
    });



  }

}
