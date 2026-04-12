import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag',
  imports: [],
  templateUrl: './tag.html',
  host: {
    class: 'inline-block',
  },
})
export class Tag {
  @Input() variant: 'card' | 'none' = 'none';

  get classes() {
    const base =
      'bottom-2 left-2 text-(--color-primary) font-semibold bg-(--color-neutral)/60 backdrop-blur-sm px-2 pb-1 rounded-full ';

    const variants = {
      card : 'absolute',
      none: '',
    }
    return `${variants[this.variant]} ${base}`;
  }
}
