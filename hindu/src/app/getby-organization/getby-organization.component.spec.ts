import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetbyOrganizationComponent } from './getby-organization.component';

describe('GetbyOrganizationComponent', () => {
  let component: GetbyOrganizationComponent;
  let fixture: ComponentFixture<GetbyOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetbyOrganizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetbyOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
