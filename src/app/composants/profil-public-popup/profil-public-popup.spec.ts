import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilPublicPopup } from './profil-public-popup';

describe('ProfilPublicPopup', () => {
  let component: ProfilPublicPopup;
  let fixture: ComponentFixture<ProfilPublicPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilPublicPopup],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilPublicPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
