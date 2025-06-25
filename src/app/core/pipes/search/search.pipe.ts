import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfProduct:any[], tersmToSearch:string): any[] {
    return arrayOfProduct.filter((item) => item.title.toLowerCase().includes(tersmToSearch.toLowerCase() ) );
  }

}
