import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _OrdersService = inject(OrdersService)

  checkoutForm!:FormGroup;
  cartId:string = '';
  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }

  initForm():void
  {
     this.checkoutForm = this.formBuilder.group({
      details:[null,[Validators.required]],
      phone:[null, [Validators.required]], 
      city:[null,[Validators.required]]
    })
  }

  getCartId():void
  {
    this._ActivatedRoute.paramMap.subscribe({
      next: (res) => {
        console.log(res);
        this.cartId = res.get('cart')!;
        console.log()
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  submitForm(){
    this._OrdersService.checkoutPayment(this.cartId, this.checkoutForm.value).subscribe({
      next: (res) => {
        console.log(res);
        open(res.session.url, '_self') 
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
