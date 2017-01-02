import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'sort'
})
export class SortPipe implements PipeTransform {
    transform(items: any[], sortBy?: string, take?: number) {

        if (items === undefined) {
            return [];
        }

        console.log('---------');
        console.log(items);
        console.log('---------');
        
        if (sortBy !== 'date') {
                let result = items.sort(
                    (x, y) =>
                        y[sortBy].toString()
                            .localeCompare(x[sortBy].toString()));

                        if (take) {
                            return result.splice(0, take);
                        } else {
                            return result;
                        }
            } else {
                let result =  items.sort(function(a,b){
                    a = new Date(a.date);
                    b = new Date(b.date);
                   
                 return  b - a;
                });
                
                 if (take) {
                            return result.splice(0, take);
                        } else {
                            return result;
                        }

        } 
    }
}
