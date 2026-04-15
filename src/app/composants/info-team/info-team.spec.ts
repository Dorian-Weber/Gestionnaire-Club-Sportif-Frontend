import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTeam } from './info-team';

describe('InfoTeam', () => {
  let component: InfoTeam;
  let fixture: ComponentFixture<InfoTeam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoTeam],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoTeam);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
