import { Directive, HostListener, Renderer, ElementRef } from '@angular/core';

@Directive({
    selector: '[biggerFont]'
})
export class BiggerFontDirective{

    constructor(
        private renderer: Renderer,
        private el: ElementRef
    ){}
    // Event listeners for element hosting
    // the directive
    @HostListener('mouseenter') onMouseEnter() {
        this.hover(true);
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.hover(false);
    }
    // Event method to be called on mouse enter and on mouse leave
    hover(biggerFont: boolean){
        if(biggerFont){
        this.renderer.setElementStyle(this.el.nativeElement, 'font-size', '30px');
        } else {
        this.renderer.setElementStyle(this.el.nativeElement, 'font-size', '14px');
        }
    }
}