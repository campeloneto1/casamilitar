
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(data: any, type: string, colum: string): any {
    for (let a = 0; a < data.length; a++) {
      for (let b = 0; b < data.length; b++) {
        if(type == 'asc'){
          if(data[a][colum] > data[b][colum] ){
            var temp = data[b];
            data[b] = data[a];
            data[a] = temp;
          }
        }else if(type == 'desc'){
          if(data[a][colum]  < data[b][colum] ){
            var temp = data[b];
            data[b] = data[a];
            data[a] = temp;
          }
        }
        
      }
    }

    return data;
  }

}
