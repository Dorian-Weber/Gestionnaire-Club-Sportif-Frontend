import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Detail_event } from './detail_event';

describe('Detail_event', () => {
  let component: Detail_event;
  let fixture: ComponentFixture<Detail_event>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Detail_event],
    }).compileComponents();

    fixture = TestBed.createComponent(Detail_event);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
