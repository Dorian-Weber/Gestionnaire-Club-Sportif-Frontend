import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-seat',
  imports: [],
  templateUrl: './seat.html',
  styleUrl: './seat.css',
})
export class Seat {
  @Input() id?: number;
  @Input() seatName?: string;
  @Input() status: 'free' | 'reserved' | 'friend' = 'free';
  @Input() selected: boolean = false;
  @Input() disabled = false;
  @Output() seatClick = new EventEmitter<number>();
  @Input() tooltip: string | null = null;

  get classes() {
    const base = 'w-10 h-10 rounded-md';

    const status = {
      free: 'bg-gray-500',
      reserved: 'bg-gray-700',
      friend: 'bg-gray-300',
      selected: 'bg-(--color-primary)',
    };

    const toggleClass =
      this.status === 'free'
        ? this.selected
          ? status.selected
          : status.free
        : status[this.status];

    return `${base} ${toggleClass}`;
  }

  onClick() {
    if (this.status !== 'free') {
      return;
    } else if (this.disabled && !this.selected) {
      return;
    } else {
      this.seatClick.emit(this.id);
    }
  }
}
