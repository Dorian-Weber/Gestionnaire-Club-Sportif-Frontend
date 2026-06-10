import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Votes } from './votes';

describe('Votes', () => {
  let component: Votes;
  let fixture: ComponentFixture<Votes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Votes],
    }).compileComponents();

    fixture = TestBed.createComponent(Votes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
