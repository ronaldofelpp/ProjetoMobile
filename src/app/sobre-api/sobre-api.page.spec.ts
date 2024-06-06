import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SobreAPIPage } from './sobre-api.page';

describe('SobreAPIPage', () => {
  let component: SobreAPIPage;
  let fixture: ComponentFixture<SobreAPIPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SobreAPIPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
