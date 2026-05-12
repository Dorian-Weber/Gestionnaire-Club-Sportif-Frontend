import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
})
export class Button {
  @Input() variant: 'primary' | 'secondary' | 'toggle' = 'primary';
  @Input() size: 'sm' | 'md' | 'sm_full' | 'md_full' | 'md_larger_full' = 'sm';
  @Input() margin: 'mt6' | 'none' = 'none';
  @Input() active: boolean = false;
  @Input() disabled: boolean = false;

  get classes() {
    const base = 'font-semibold rounded-md hover:opacity-90 transition';

    const variants = {
      primary: `bg-(--color-primary) text-black hover:opacity-90 transition cursor-pointer`,
      secondary: `border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary)/10  transition cursor-pointer`,
      toggle_inactive:
        'bg-black/40 hover:bg-black/60 transition p-4 rounded-lg border border-white/10 text-center cursor-pointer',

      toggle_active:
        'bg-(--color-secondary) text-(--color-primary) transition p-4 rounded-lg border border-(--color-primary) shadow-lg text-center hover:bg-(--color-primary)/10 cursor-pointer',
    };
    const sizes = {
      sm: 'px-4 py-2 ',
      md: 'px-8 py-3',
      sm_full: 'px-4 py-2 w-full',
      md_full: 'px-8 py-3 w-full',
      md_larger_full: 'px-8 py-4 w-full',
    };
    const margins = {
      mt6: 'mt-6',
      none: '',
    };
    const toggleClass =
      this.variant === 'toggle'
        ? this.active
          ? variants.toggle_active
          : variants.toggle_inactive
        : variants[this.variant];


    if (this.disabled) {
      return `${base} ${margins[this.margin]} ${sizes[this.size]} opacity-40 cursor-not-allowed`;
    } else {
      return `${base} ${margins[this.margin]} ${toggleClass} ${sizes[this.size]}`;
    }
  }
}
