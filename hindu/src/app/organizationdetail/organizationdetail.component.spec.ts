import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationdetailComponent } from './organizationdetail.component';

describe('OrganizationdetailComponent', () => {
  let component: OrganizationdetailComponent;
  let fixture: ComponentFixture<OrganizationdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationdetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
