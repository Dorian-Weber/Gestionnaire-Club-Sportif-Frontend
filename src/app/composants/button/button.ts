import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html'
})
export class Button {
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() size: 'sm' | 'md' |'sm_full' |'md_full'  = 'sm';

  get classes() {
    const base =
      'font-semibold rounded-md hover:opacity-90 transition cursor-pointer';

    const variants = {
      primary: `bg-(--color-primary) text-black hover:opacity-90 transition`,
      secondary: `border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary)/10  transition`
    };
    const sizes = {
      sm: 'px-4 py-2 ',
      md: 'px-8 py-3',
      sm_full: 'px-4 py-2 w-full',
      md_full: 'px-8 py-3 w-full',
    };

    return `${base} ${variants[this.variant]} ${sizes[this.size]}`;
  }
}
