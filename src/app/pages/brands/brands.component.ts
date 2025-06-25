import { Component, inject, signal, WritableSignal } from '@angular/core';
import { BrandService } from 'src/app/services/brand/brand.service';
import { Brand } from 'src/app/shared/interfaces/brand/brand';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
  private readonly _BrandService = inject(BrandService);
  BrandsData:WritableSignal<Brand[]> = signal([]);
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllBrands();
  }

  getAllBrands():void {
    this._BrandService.getAllBrands().subscribe({
      next: (res:any) => {
        this.BrandsData.set(res.data);
        console.log('Brands fetched successfully:', this.BrandsData());
      },
      error: (error) => {
        console.error('Error fetching brands:', error);
      }
    });
  }
}
