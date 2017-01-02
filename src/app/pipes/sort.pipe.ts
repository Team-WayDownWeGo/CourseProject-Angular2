import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'sort'
})
export class SortPipe implements PipeTransform {
    transform(items: any[], sortBy?: string) {

        if (items === undefined) {
            return null;
        }

        if (sortBy) {
                return items.sort(
                    (x, y) =>
                        y[sortBy].toString()
                            .localeCompare(x[sortBy].toString()));
            } else {
                return items.sort(function(a,b){
                    a = new Date(a.date);
                    b = new Date(b.date);
                   
                 return  b - a;
                });
        } 
    }
}