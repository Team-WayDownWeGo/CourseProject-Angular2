import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'sort'
})
export class SortPipe implements PipeTransform {
    transform(items: any[], sortBy?: string) {

        if (sortBy) {
                return items.sort(
                    (x, y) =>
                        y[sortBy].toString()
                            .localeCompare(x[sortBy].toString()));
            } else {
                sortBy = 'date';
                return items.sort(function(a,b){
                    a = new Date(b.date);
                    b = new Date(a.date);
                 return  b - a;
                });
        } 
    }
}
