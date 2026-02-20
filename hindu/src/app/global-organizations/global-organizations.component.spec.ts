import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalOrganizationsComponent } from './global-organizations.component';

describe('GlobalOrganizationsComponent', () => {
  let component: GlobalOrganizationsComponent;
  let fixture: ComponentFixture<GlobalOrganizationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalOrganizationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
