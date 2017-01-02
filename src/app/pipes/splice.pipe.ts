import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'splice'
})
export class SplicePipe implements PipeTransform {
    transform(items: any[], take?: number) {

         if (items === null) {
            return null;
        }

            return items.splice(0, take);
        } 
    }