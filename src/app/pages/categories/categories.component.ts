import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { ICategory } from 'src/app/shared/interfaces/iproduct';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  private readonly categoriesService = inject(CategoriesService);
  categories: WritableSignal<any[]> = signal([]);
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (response) => {
        this.categories.set(response.data);
        console.log(response);
      },    
    })
  }  
  
  text:string = ""
  counter:WritableSignal<number> = signal(0);

  trackByCategoryId(index: number, cat: ICategory): string {
      return cat._id; // Ensure this is the unique identifier for each product
    }


  changCounter():void
  {
    this.counter.update((num) => num = num + 1);
  }
}
