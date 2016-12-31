import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {
    transform(posts: any[], filter: string): any[] {
        if (filter === '') {
            return posts;
        }

        return posts.filter(post => {
            if ((post.title.indexOf(filter)>= 0) ||(post.description.indexOf(filter) >= 0) || (post.category.indexOf(filter) >= 0)) {
                return true;
            }
            return false;
        });
    }
};