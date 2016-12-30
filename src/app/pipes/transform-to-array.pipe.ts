import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'toNumberArray' })
export class ToNumberArrayPaginationPipe implements PipeTransform {
    transform(value, args: string[]): any {
   
        let res = [];
        for (let i = 1; i <= value ; i++) {
            res.push(i);
        }
        return res;
    }
}