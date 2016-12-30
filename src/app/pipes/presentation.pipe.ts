import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'presentationPipe' })
export class PresentationPipe implements PipeTransform {
    transform(items: any[], count: number): any {
        if (items === undefined) {
            return [];
        }
        let arr = [];
       arr =  items.map(p => {
           if (p.description.length >= count)
           {
               p.description = p.description.substr(0, count);
           }

           return p;
       });

       return arr;
    }
}