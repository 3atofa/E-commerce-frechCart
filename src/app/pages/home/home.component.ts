import { CartService } from './../../services/Cart/cart.service';
import { ICategory, IProduct } from 'src/app/shared/interfaces/iproduct';
import { ProductsService } from './../../services/products/products.service';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { Category } from 'src/app/shared/interfaces/category';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);


  products:WritableSignal<IProduct[]> = signal([]);
  category:WritableSignal<ICategory[]> = signal([]);
  // For the current date   
  currentdate = new Date
  // For the text in the slider
  text:string ='';
  // For the text in the slider                                                              
  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    rtl:true,
    autoplay:true,
    autoplayHoverPause:true,
    autoplayTimeout: 3000,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  }
  // For the categories slider
  customOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    rtl:true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: [],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  // For the products slider
  getCategoriesData(){
    this._NgxSpinnerService.show('loading-2')
    this.categoriesService.getAllCategories().subscribe({
      next:(res) => {
        console.log(res.data)
        this.category.set(res.data);
        this._NgxSpinnerService.hide('loading-2')
      }, error: ()=>{
        this._NgxSpinnerService.hide('loading-2')
      }
    })
  }
  // For the products data
  getProductsData():void {
    this.productsService.getAllProducts().subscribe({
      next:(res) =>{
        this.products.set(res.data);
        console.log(res.data);
      }
    })
  }
  // For the products slider
  trackByProductId(index: number, prod: IProduct): string {
    return prod._id; // Ensure this is the unique identifier for each product
  }
  
  ngOnInit(): void {
    this.getProductsData()
    this.getCategoriesData()
  }

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
